import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        
        const {
            full_name,
            email,
            phone,
            complaint_type,
            subject,
            description,
            incident_date,
            incident_location,
            attachments,
        } = data;

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

        // Создаем HTML с встроенными фото
        let photosHtml = '';
        const emailAttachments = [];

        if (attachments && attachments.length > 0) {
            for (let i = 0; i < attachments.length; i++) {
                const att = attachments[i];
                const cid = `photo_${i}_${Date.now()}`;
                
                // Добавляем фото как вложение с CID
                emailAttachments.push({
                    filename: att.name,
                    content: att.data.split(';base64,').pop(),
                    encoding: 'base64',
                    cid: cid,
                });
                
                // Добавляем фото в HTML с отображением
                photosHtml += `
                    <div class="photo-item">
                        <div class="photo-label">📷 Фото ${i + 1}: ${att.name}</div>
                        <img src="cid:${cid}" alt="${att.name}" class="photo-image" />
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
                            <div class="value">${full_name}</div>
                        </div>
                        <div class="field">
                            <div class="label">📧 Email:</div>
                            <div class="value">${email}</div>
                        </div>
                        <div class="field">
                            <div class="label">📞 Телефон:</div>
                            <div class="value">${phone}</div>
                        </div>
                        <div class="field">
                            <div class="label">📌 Тип жалобы:</div>
                            <div class="value">${complaint_type}</div>
                        </div>
                        <div class="field">
                            <div class="label">📝 Тема:</div>
                            <div class="value">${subject}</div>
                        </div>
                        <div class="field">
                            <div class="label">📄 Суть жалобы:</div>
                            <div class="value">${description}</div>
                        </div>
                        <div class="field">
                            <div class="label">📅 Дата происшествия:</div>
                            <div class="value">${incident_date || 'Не указана'}</div>
                        </div>
                        <div class="field">
                            <div class="label">📍 Место происшествия:</div>
                            <div class="value">${incident_location || 'Не указано'}</div>
                        </div>
                        ${attachments && attachments.length > 0 ? `
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

        // Отправляем письмо администратору с вложениями
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `[ЖАЛОБА] ${complaint_type} от ${full_name}`,
            html: adminHtml,
            attachments: emailAttachments,
        });

        // Отправляем подтверждение пользователю
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
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
                            <h3>Уважаемый(ая) ${full_name}!</h3>
                            <p>Ваша жалоба успешно отправлена и принята в работу.</p>
                            <p><strong>📌 Тип обращения:</strong> ${complaint_type}</p>
                            <p><strong>📝 Тема:</strong> ${subject}</p>
                            <p><strong>📷 Приложено фото:</strong> ${attachments?.length || 0} шт.</p>
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