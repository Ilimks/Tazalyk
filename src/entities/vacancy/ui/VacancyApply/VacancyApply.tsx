'use client';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CircleCheck, Mail, Paperclip, X } from 'lucide-react';
import { ApiError } from '@/shared/api';
import { FormCheckbox, FormInput, FormTextarea } from '@/shared/ui/Forms';
import { vacanciesApi } from '../../api/vacanciesApi';
import styles from './VacancyApply.module.scss';

interface VacancyApplyProps {
    vacancyId: string;
    vacancyTitle: string;
}

// те же правила, что на сервере: ошибка видна сразу, без отправки файла
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const FILE_TYPES = '.pdf,.docx,.jpg,.jpeg,.png';
const FILE_NAME_PATTERN = /\.(pdf|docx|jpe?g|png)$/i;
const PHONE_PATTERN = /^\+?[0-9\s\-()]{7,20}$/;
const MIN_PHONE_DIGITS = 9;
const SERVER_FIELDS = ['full_name', 'phone', 'email', 'comment', 'resume', 'consent', 'vacancy'] as const;

type ServerField = (typeof SERVER_FIELDS)[number];
type Errors = Partial<Record<ServerField | 'form', string>>;

const emptyValues = { full_name: '', phone: '', email: '', comment: '', website: '' };

// Заявка уходит в раздел «Отклики» админки, поэтому кандидату не нужна почтовая программа
export const VacancyApply: React.FC<VacancyApplyProps> = ({ vacancyId, vacancyTitle }) => {
    const t = useTranslations('Vacancies');
    const tCommon = useTranslations('Common');
    const dialogRef = useRef<HTMLDialogElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [values, setValues] = useState(emptyValues);
    const [file, setFile] = useState<File | null>(null);
    const [consent, setConsent] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const closeDialog = () => dialogRef.current?.close();

    // после успешной отправки форма снова пустая: можно откликнуться ещё раз
    const handleClosed = () => {
        if (!sent) return;
        setValues(emptyValues);
        setFile(null);
        setConsent(false);
        setSent(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setValues((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: undefined }));
    };

    const validateFile = (candidate: File | null) => {
        if (!candidate) return t('VacanciesApplyErrorFile');
        if (!FILE_NAME_PATTERN.test(candidate.name)) return t('VacanciesApplyErrorFileType');
        if (candidate.size > MAX_FILE_BYTES) return t('VacanciesApplyErrorFileSize');
        return undefined;
    };

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const candidate = event.target.files?.[0] ?? null;
        setFile(candidate);
        setErrors((previous) => ({ ...previous, resume: candidate ? validateFile(candidate) : undefined }));
    };

    const removeFile = () => {
        setFile(null);
        if (fileRef.current) fileRef.current.value = '';
    };

    const validate = (): Errors => {
        const found: Errors = {};
        if (values.full_name.trim().length < 2) found.full_name = t('VacanciesApplyErrorName');

        const phone = values.phone.trim();
        if (!PHONE_PATTERN.test(phone) || phone.replace(/\D/g, '').length < MIN_PHONE_DIGITS) {
            found.phone = t('VacanciesApplyErrorPhone');
        }

        found.resume = validateFile(file);
        if (!consent) found.consent = t('VacanciesApplyErrorConsent');
        return found;
    };

    const showServerError = (error: unknown) => {
        if (error instanceof ApiError && error.status === 429) {
            setErrors({ form: t('VacanciesApplyErrorTooMany') });
            return;
        }
        if (error instanceof ApiError && error.status === 400 && error.data && typeof error.data === 'object') {
            const data = error.data as Record<string, unknown>;
            if ('duplicate' in data) {
                setErrors({ form: t('VacanciesApplyErrorDuplicate') });
                return;
            }
            const fields = SERVER_FIELDS.filter((field) => field in data);
            if (fields.includes('vacancy')) {
                setErrors({ form: t('VacanciesApplyErrorClosed') });
                return;
            }
            if (fields.length > 0) {
                const messages: Record<ServerField, string> = {
                    full_name: t('VacanciesApplyErrorName'),
                    phone: t('VacanciesApplyErrorPhone'),
                    email: t('VacanciesApplyErrorEmail'),
                    comment: t('VacanciesApplyErrorFailed'),
                    resume: t('VacanciesApplyErrorFileType'),
                    consent: t('VacanciesApplyErrorConsent'),
                    vacancy: t('VacanciesApplyErrorClosed'),
                };
                setErrors(Object.fromEntries(fields.map((field) => [field, messages[field]])));
                return;
            }
        }
        setErrors({ form: t('VacanciesApplyErrorFailed') });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const found = validate();
        if (Object.values(found).some(Boolean)) {
            setErrors(found);
            return;
        }

        const body = new FormData();
        body.append('vacancy', vacancyId);
        body.append('full_name', values.full_name.trim());
        body.append('phone', values.phone.trim());
        body.append('email', values.email.trim());
        body.append('comment', values.comment.trim());
        body.append('website', values.website);
        body.append('consent', 'true');
        body.append('resume', file as File);

        setSending(true);
        setErrors({});
        try {
            await vacanciesApi.apply(body);
            setSent(true);
        } catch (error) {
            showServerError(error);
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <button type="button" className={styles.apply} onClick={() => dialogRef.current?.showModal()}>
                <Mail size={16} aria-hidden />
                {t('VacanciesApply')}
            </button>

            <dialog
                ref={dialogRef}
                className={styles.dialog}
                aria-label={t('VacanciesApply')}
                onClose={handleClosed}
                // нажатие на затемнённый фон попадает в сам dialog, а не в его содержимое
                onClick={(event) => event.target === dialogRef.current && closeDialog()}
            >
                <div className={styles.content}>
                    <button
                        type="button"
                        className={styles.close}
                        onClick={closeDialog}
                        aria-label={tCommon('close')}
                    >
                        <X size={20} aria-hidden />
                    </button>

                    {sent ? (
                        <div className={styles.success} role="status">
                            <CircleCheck size={44} aria-hidden />
                            <h3 className={styles.title}>{t('VacanciesApplySentTitle')}</h3>
                            <p className={styles.hint}>{t('VacanciesApplySentText')}</p>
                            <button type="button" className={styles.primary} onClick={closeDialog}>
                                {tCommon('close')}
                            </button>
                        </div>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <h3 className={styles.title}>{t('VacanciesApply')}</h3>
                            <p className={styles.vacancy}>{vacancyTitle}</p>

                            <FormInput
                                id={`apply-name-${vacancyId}`}
                                label={t('VacanciesApplyName')}
                                name="full_name"
                                value={values.full_name}
                                onChange={handleChange}
                                error={errors.full_name}
                                maxLength={150}
                                autoComplete="name"
                                required
                            />
                            <FormInput
                                id={`apply-phone-${vacancyId}`}
                                label={t('VacanciesApplyPhone')}
                                name="phone"
                                type="tel"
                                value={values.phone}
                                onChange={handleChange}
                                error={errors.phone}
                                hint={t('VacanciesApplyPhoneHint')}
                                placeholder="+996 700 123 456"
                                maxLength={30}
                                autoComplete="tel"
                                inputMode="tel"
                                required
                            />
                            <FormInput
                                id={`apply-email-${vacancyId}`}
                                label={t('VacanciesApplyEmail')}
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                error={errors.email}
                                maxLength={254}
                                autoComplete="email"
                                inputMode="email"
                            />

                            <div className={styles.file}>
                                <span className={styles.fileLabel}>
                                    {t('VacanciesApplyFile')} <span aria-hidden>*</span>
                                </span>
                                {file ? (
                                    <div className={styles.fileChosen}>
                                        <Paperclip size={16} aria-hidden />
                                        <span>{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            aria-label={t('VacanciesApplyFileRemove')}
                                        >
                                            <X size={16} aria-hidden />
                                        </button>
                                    </div>
                                ) : (
                                    <label className={styles.fileChoose}>
                                        <Paperclip size={16} aria-hidden />
                                        {t('VacanciesApplyFileChoose')}
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            name="resume"
                                            accept={FILE_TYPES}
                                            onChange={handleFile}
                                        />
                                    </label>
                                )}
                                <span className={styles.fileHint}>{t('VacanciesApplyFileHint')}</span>
                                {errors.resume && <span className={styles.error}>{errors.resume}</span>}
                            </div>

                            <FormTextarea
                                id={`apply-comment-${vacancyId}`}
                                label={t('VacanciesApplyComment')}
                                name="comment"
                                value={values.comment}
                                onChange={handleChange}
                                rows={3}
                                maxLength={1000}
                            />

                            {/* ловушка для ботов: человек этого поля не видит */}
                            <input
                                className={styles.trap}
                                type="text"
                                name="website"
                                value={values.website}
                                onChange={handleChange}
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden
                            />

                            <FormCheckbox
                                label={t('VacanciesApplyConsent')}
                                name="consent"
                                checked={consent}
                                onChange={(event) => {
                                    setConsent(event.target.checked);
                                    setErrors((previous) => ({ ...previous, consent: undefined }));
                                }}
                                error={errors.consent}
                                required
                            />

                            {errors.form && <p className={styles.formError} role="alert">{errors.form}</p>}

                            <button type="submit" className={styles.primary} disabled={sending}>
                                {sending ? t('VacanciesApplySending') : t('VacanciesApplySubmit')}
                            </button>
                        </form>
                    )}
                </div>
            </dialog>
        </>
    );
};
