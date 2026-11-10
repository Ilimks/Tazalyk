import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Проверенное вложение: тип определён по содержимому файла, имя задаём сами
interface SafeAttachment {
    filename: string;
    contentType: string;
    content: Buffer;
    size: number;
}

const MAX_ATTACHMENTS = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
// Gmail не принимает письма больше 25 МБ, base64 в письме добавляет треть
const MAX_TOTAL_SIZE = 15 * 1024 * 1024;
// запрос целиком (JSON с фото в base64) — режем до чтения тела
const MAX_BODY_BYTES = 22 * 1024 * 1024;
const EMAIL_REGEX = /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Типы обращений из формы. В письмо и админку идёт русское название,
// даже если жалобу писали на кыргызском: сотрудникам так проще
const COMPLAINT_TYPES: Record<string, string> = {
    waste_issue: 'Проблема с вывозом отходов',
    billing_error: 'Неправильное начисление за вывоз мусора',
    service_quality: 'Качество услуг',
    employee_complaint: 'Жалоба на сотрудника',
    other: 'Другое',
};

// ---------- лимит частоты: не больше 5 жалоб за 10 минут с одного адреса ----------
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const recentRequests = new Map<string, number[]>();

// Адрес клиента для лимита. Заголовкам прокси верим, только если сайт стоит за nginx (TRUST_PROXY=1):
// иначе посетитель сам пришлёт любой X-Forwarded-For и обойдёт лимит.
// Берём последний адрес цепочки — его добавляет сам nginx (proxy_add_x_forwarded_for), подделать нельзя
const clientKey = (request: NextRequest): string => {
    if (process.env.TRUST_PROXY !== '1') return 'direct';
    const forwarded = request.headers.get('x-forwarded-for');
    return forwarded?.split(',').pop()?.trim() || 'unknown';
};

const isRateLimited = (key: string): boolean => {
    const now = Date.now();
    const timestamps = (recentRequests.get(key) || []).filter((time) => now - time < RATE_WINDOW_MS);
    if (timestamps.length >= RATE_LIMIT) {
        recentRequests.set(key, timestamps);
        return true;
    }
    timestamps.push(now);
    recentRequests.set(key, timestamps);
    // не даём карте разрастись от множества адресов
    if (recentRequests.size > 10000) {
        for (const [k, times] of recentRequests) {
            if (times.every((time) => now - time >= RATE_WINDOW_MS)) recentRequests.delete(k);
        }
    }
    return false;
};

// ---------- фото: тип определяем по первым байтам, а не по имени и заявленному типу ----------
const IMAGE_SIGNATURES: { mime: string; ext: string; test: (b: Buffer) => boolean }[] = [
    { mime: 'image/jpeg', ext: 'jpg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
    { mime: 'image/png', ext: 'png', test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
    { mime: 'image/webp', ext: 'webp', test: (b) => b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP' },
    { mime: 'image/heic', ext: 'heic', test: (b) => b.toString('ascii', 4, 8) === 'ftyp' && /^(heic|heix|hevc|mif1|msf1)$/.test(b.toString('ascii', 8, 12)) },
];

// null — вложение не фото или повреждено
const parseAttachment = (att: unknown, index: number): SafeAttachment | null => {
    if (!att || typeof att !== 'object') return null;
    const { data } = att as Record<string, unknown>;
    if (typeof data !== 'string' || data.length > Math.ceil(MAX_FILE_SIZE / 3) * 4 + 200) return null;

    const content = Buffer.from(data.split(';base64,').pop() || '', 'base64');
    if (content.length === 0 || content.length > MAX_FILE_SIZE) return null;

    const type = IMAGE_SIGNATURES.find((signature) => signature.test(content));
    if (!type) return null;

    // имя от пользователя не используем: в нём может быть что угодно, вплоть до «.exe»
    return { filename: `photo-${index + 1}.${type.ext}`, contentType: type.mime, content, size: content.length };
};

// Экранирование пользовательского ввода перед вставкой в HTML письма
const escapeHtml = (value: unknown): string =>
    String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

// Строка без переносов — для темы письма
const toSingleLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

const readString = (value: unknown, maxLength: number): string =>
    typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

// дата из поля type="date": настоящая дата вида 2026-11-09, а не 2026-02-30
const isValidDate = (value: string): boolean => {
    if (!DATE_REGEX.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

const verifyCaptcha = async (token: unknown): Promise<boolean> => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
        console.error('RECAPTCHA_SECRET_KEY не задан');
        return false;
    }
    if (typeof token !== 'string' || !token) {
        return false;
    }

    try {
        const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret, response: token }),
            // Google может не ответить — не держим запрос бесконечно
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) return false;
        const result = await res.json();
        if (result.success !== true) return false;

        // капча должна быть решена на нашем сайте, а не на чужом с тем же ключом
        const siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mptazalyk.kg').hostname;
        const allowedHosts = new Set([siteHost, `www.${siteHost}`]);
        if (process.env.NODE_ENV !== 'production') {
            allowedHosts.add('localhost');
            allowedHosts.add('127.0.0.1');
        }
        return typeof result.hostname === 'string' && allowedHosts.has(result.hostname);
    } catch (error) {
        console.error('reCAPTCHA verification failed:', error instanceof Error ? error.name : error);
        return false;
    }
};

interface ComplaintFields {
    complaint_type: string;
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    description: string;
    incident_date: string;
    incident_location: string;
}

// Копия жалобы в админку (раздел «Жалобы»): туда приходят все жалобы, любого типа.
// Капчу и частоту уже проверили здесь, поэтому бэкенд принимает жалобы только с общим ключом сайта
const saveToAdmin = async (fields: ComplaintFields, attachments: SafeAttachment[]): Promise<boolean> => {
    const token = process.env.COMPLAINTS_INTAKE_TOKEN;
    // на сервере — адрес API внутри Docker (COMPLAINTS_API_URL), локально — обычный адрес API
    const apiUrl = process.env.COMPLAINTS_API_URL || process.env.NEXT_PUBLIC_API_URL;
    if (!token || !apiUrl) {
        console.error('Жалоба не сохранена в админке: не задан COMPLAINTS_INTAKE_TOKEN или адрес API');
        return false;
    }

    const form = new FormData();
    for (const [key, value] of Object.entries(fields)) {
        if (value) form.append(key, value);
    }
    for (const att of attachments) {
        form.append('photos', new Blob([new Uint8Array(att.content)], { type: att.contentType }), att.filename);
    }

    const headers: Record<string, string> = { 'X-Intake-Token': token };
    // внутри Docker запрос идёт к API напрямую по http, мимо nginx. Без этого заголовка
    // Django за HTTPS-прокси ответил бы перенаправлением на https
    if (apiUrl.startsWith('http://')) headers['X-Forwarded-Proto'] = 'https';

    try {
        const res = await fetch(`${apiUrl.replace(/\/+$/, '')}/complaints/`, {
            method: 'POST',
            headers,
            body: form,
            cache: 'no-store',
            redirect: 'error',
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) {
            console.error('Жалоба не сохранена в админке: ответ API', res.status);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Жалоба не сохранена в админке:', error instanceof Error ? error.name : error);
        return false;
    }
};

export async function POST(request: NextRequest) {
    try {
        // слишком большой запрос отклоняем до чтения тела
        const contentLength = Number(request.headers.get('content-length') || 0);
        if (!contentLength || contentLength > MAX_BODY_BYTES) {
            return NextResponse.json({ success: false, code: 'too_large' }, { status: 413 });
        }
        if (!request.headers.get('content-type')?.includes('application/json')) {
            return NextResponse.json({ success: false, code: 'invalid_data' }, { status: 415 });
        }

        const data = await request.json();
        if (!data || typeof data !== 'object') {
            return NextResponse.json({ success: false, code: 'invalid_data' }, { status: 400 });
        }

        if (!(await verifyCaptcha(data.captchaToken))) {
            return NextResponse.json(
                { success: false, code: 'captcha_invalid' },
                { status: 400 }
            );
        }

        // считаем только запросы с пройденной капчей: иначе пять пустых запросов
        // закрыли бы форму для всех, кто выходит в интернет через тот же адрес
        if (isRateLimited(clientKey(request))) {
            return NextResponse.json({ success: false, code: 'rate_limited' }, { status: 429 });
        }

        const full_name = readString(data.full_name, 200);
        const email = readString(data.email, 200);
        const phone = readString(data.phone, 50);
        // форма присылает код типа. Вкладка, открытая до обновления сайта, присылает название —
        // тогда в админке это «Другое», а в письме остаётся присланное название
        const rawType = readString(data.complaint_type, 200);
        const knownType = Object.hasOwn(COMPLAINT_TYPES, rawType);
        const complaint_type = knownType ? rawType : 'other';
        const typeLabel = knownType ? COMPLAINT_TYPES[rawType] : rawType || COMPLAINT_TYPES.other;
        const subject = readString(data.subject, 300);
        const description = readString(data.description, 10000);
        const incident_date = readString(data.incident_date, 50);
        const incident_location = readString(data.incident_location, 300);
        const rawAttachments: unknown[] = Array.isArray(data.attachments) ? data.attachments : [];
        const attachments = rawAttachments.slice(0, MAX_ATTACHMENTS).map(parseAttachment);
        const totalSize = attachments.reduce((sum, att) => sum + (att?.size || 0), 0);

        if (
            !full_name || !phone || !subject || !description ||
            !EMAIL_REGEX.test(email) ||
            rawAttachments.length > MAX_ATTACHMENTS ||
            totalSize > MAX_TOTAL_SIZE ||
            attachments.some((att) => att === null)
        ) {
            return NextResponse.json(
                { success: false, code: 'invalid_data' },
                { status: 400 }
            );
        }

        const safe = {
            full_name: escapeHtml(full_name),
            email: escapeHtml(email),
            phone: escapeHtml(phone),
            complaint_type: escapeHtml(typeLabel),
            subject: escapeHtml(subject),
            // сохраняем переносы строк из textarea
            description: escapeHtml(description).replace(/\r?\n/g, '<br>'),
            incident_date: escapeHtml(incident_date),
            incident_location: escapeHtml(incident_location),
        };

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        let photosHtml = '';
        const emailAttachments: { filename: string; content: Buffer; contentType: string; cid: string }[] = [];

        if (attachments.length > 0) {
            for (let i = 0; i < attachments.length; i++) {
                const att = attachments[i] as SafeAttachment;
                const cid = `photo_${i}_${Date.now()}`;
                const safeName = escapeHtml(att.filename);

                emailAttachments.push({
                    filename: att.filename,
                    content: att.content,
                    contentType: att.contentType,
                    cid: cid,
                });

                photosHtml += `
                    <div class="photo-item">
                        <div class="photo-label">📷 Фото ${i + 1}: ${safeName}</div>
                        <img src="cid:${cid}" alt="${safeName}" class="photo-image" />
                        <div class="photo-size">Размер: ${(att.size / 1024).toFixed(0)} KB</div>
                    </div>
                `;
            }
        }

        const adminHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Новая жалоба</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        background: #f0f2f5;
                        padding: 20px;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    }
                    .header {
                        background: #102382;
                        color: white;
                        padding: 24px;
                        text-align: center;
                    }
                    .header h2 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 24px;
                    }
                    .field {
                        margin-bottom: 20px;
                        border-bottom: 1px solid #e2e8f0;
                        padding-bottom: 12px;
                    }
                    .label {
                        font-weight: bold;
                        color: #102382;
                        font-size: 14px;
                        margin-bottom: 8px;
                    }
                    .value {
                        color: #333;
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    .photos-section {
                        margin-top: 20px;
                        background: #f8fafc;
                        border-radius: 12px;
                        padding: 16px;
                    }
                    .photos-title {
                        font-weight: bold;
                        color: #102382;
                        font-size: 16px;
                        margin-bottom: 16px;
                        padding-bottom: 8px;
                        border-bottom: 2px solid #3b82f6;
                    }
                    .photo-item {
                        background: white;
                        border-radius: 12px;
                        padding: 16px;
                        margin-bottom: 16px;
                        border: 1px solid #e2e8f0;
                    }
                    .photo-label {
                        font-weight: 600;
                        color: #0f172a;
                        margin-bottom: 12px;
                        font-size: 14px;
                    }
                    .photo-image {
                        max-width: 100%;
                        max-height: 400px;
                        border-radius: 8px;
                        border: 1px solid #e2e8f0;
                        margin-bottom: 8px;
                    }
                    .photo-size {
                        font-size: 12px;
                        color: #64748b;
                        margin-top: 8px;
                    }
                    .footer {
                        background: #f1f5f9;
                        padding: 16px;
                        text-align: center;
                        font-size: 12px;
                        color: #64748b;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>📋 НОВАЯ ЖАЛОБА</h2>
                        <p>Поступило новое обращение от гражданина</p>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">👤 ФИО заявителя:</div>
                            <div class="value">${safe.full_name}</div>
                        </div>
                        <div class="field">
                            <div class="label">📧 Email:</div>
                            <div class="value">${safe.email}</div>
                        </div>
                        <div class="field">
                            <div class="label">📞 Телефон:</div>
                            <div class="value">${safe.phone}</div>
                        </div>
                        <div class="field">
                            <div class="label">📌 Тип жалобы:</div>
                            <div class="value">${safe.complaint_type}</div>
                        </div>
                        <div class="field">
                            <div class="label">📝 Тема:</div>
                            <div class="value">${safe.subject}</div>
                        </div>
                        <div class="field">
                            <div class="label">📄 Суть жалобы:</div>
                            <div class="value">${safe.description}</div>
                        </div>
                        <div class="field">
                            <div class="label">📅 Дата происшествия:</div>
                            <div class="value">${safe.incident_date || 'Не указана'}</div>
                        </div>
                        <div class="field">
                            <div class="label">📍 Место происшествия:</div>
                            <div class="value">${safe.incident_location || 'Не указано'}</div>
                        </div>
                        ${attachments.length > 0 ? `
                        <div class="photos-section">
                            <div class="photos-title">📷 ПРИЛОЖЕННЫЕ ФОТО (${attachments.length} шт.)</div>
                            ${photosHtml}
                        </div>
                        ` : '<div class="field"><div class="label">📷 Фото:</div><div class="value">Нет приложенных фото</div></div>'}
                    </div>
                    <div class="footer">
                        Письмо создано автоматически. Пожалуйста, ответьте на это письмо для связи с заявителем.
                    </div>
                </div>
            </body>
            </html>
        `;

        const sendToStaff = async (): Promise<boolean> => {
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_USER,
                    to: process.env.ADMIN_EMAIL,
                    // адрес объектом: nodemailer не станет разбирать в нём списки и группы получателей
                    replyTo: { name: '', address: email },
                    subject: toSingleLine(`[ЖАЛОБА] ${typeLabel} от ${full_name}`),
                    html: adminHtml,
                    attachments: emailAttachments,
                });
                return true;
            } catch (error) {
                console.error('Письмо с жалобой не отправлено:', error instanceof Error ? error.message : error);
                return false;
            }
        };

        // Админка и почта независимы: жалоба принята, если дошла хотя бы куда-то одно.
        // Иначе при сбое почты человек отправил бы её снова и в админке появились бы копии
        const [savedToAdmin, emailed] = await Promise.all([
            saveToAdmin(
                {
                    complaint_type,
                    full_name,
                    email,
                    phone,
                    subject,
                    description,
                    incident_date: isValidDate(incident_date) ? incident_date : '',
                    incident_location,
                },
                attachments as SafeAttachment[],
            ),
            sendToStaff(),
        ]);
        if (!savedToAdmin && !emailed) {
            return NextResponse.json(
                { success: false, message: 'Ошибка при отправке жалобы' },
                { status: 500 }
            );
        }

        // Подтверждение — без текста пользователя: иначе форму можно использовать,
        // чтобы рассылать с почты предприятия письма с чужим текстом на любые адреса.
        // Жалоба уже принята, поэтому сбой этого письма — не ошибка для посетителя
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: { name: '', address: email },
            subject: 'Ваша жалоба принята | МП "Тазалык"',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Ваша жалоба принята</title>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f2f5; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
                        .header { background: #22c55e; color: white; padding: 24px; text-align: center; }
                        .content { padding: 24px; }
                        .footer { background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>✅ ЖАЛОБА ПРИНЯТА</h2>
                        </div>
                        <div class="content">
                            <h3>Здравствуйте!</h3>
                            <p>Ваша жалоба успешно отправлена и принята в работу.</p>
                            <p><strong>📷 Приложено фото:</strong> ${attachments.length} шт.</p>
                            <p>Мы рассмотрим ваше обращение в течение 14 рабочих дней и свяжемся с вами по указанным контактам.</p>
                            <br>
                            <p>С уважением,<br><strong>МП "Тазалык"</strong></p>
                        </div>
                        <div class="footer">
                            Это автоматическое сообщение, пожалуйста, не отвечайте на него.
                        </div>
                    </div>
                </body>
                </html>
            `,
        }).catch((error) => {
            console.error('Подтверждение заявителю не отправлено:', error instanceof Error ? error.message : error);
        });

        return NextResponse.json({ success: true, message: 'Жалоба успешно отправлена' });
    } catch (error) {
        console.error('Error sending complaint:', error);
        return NextResponse.json(
            { success: false, message: 'Ошибка при отправке жалобы' },
            { status: 500 }
        );
    }
}