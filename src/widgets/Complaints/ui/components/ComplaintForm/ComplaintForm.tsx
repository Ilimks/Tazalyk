'use client';
import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ReCAPTCHA from 'react-google-recaptcha';
import {
    FormInput,
    FormTextarea,
    FormSelect,
    FormCheckbox,
    FormFileUpload,
} from '@/shared/ui/Forms';
import styles from './ComplaintForm.module.scss';
import { ButtonComplaint } from '@/shared/ui/Buttons/ButtonComplaint';

interface Attachment {
    name: string;
    data: string;
    size: number;
    type: string;
}

export const ComplaintForm: React.FC = () => {
    const t = useTranslations("Complaints");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const captchaRef = useRef<ReCAPTCHA>(null);
    
    // ВРЕМЕННЫЙ ФЛАГ ДЛЯ ТЕСТИРОВАНИЯ
    const SKIP_CAPTCHA = true;
    
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        complaint_type: 'rights_violation',
        subject: '',
        description: '',
        incident_date: '',
        incident_location: '',
        attachments: [] as Attachment[],
        consent: false,
    });

    const complaintTypes = [
        { value: 'rights_violation', label: t('complaintTypes.rights_violation') },
        { value: 'technical_error', label: t('complaintTypes.technical_error') },
        { value: 'employee_complaint', label: t('complaintTypes.employee_complaint') },
        { value: 'service_quality', label: t('complaintTypes.service_quality') },
        { value: 'waste_issue', label: t('complaintTypes.waste_issue') },
        { value: 'other', label: t('complaintTypes.other') },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newAttachments: Attachment[] = [];
        
        for (const file of files) {
            if (file.size > 5 * 1024 * 1024) {
                setError(t('form.fileTooBig'));
                continue;
            }
            
            const reader = new FileReader();
            const data = await new Promise<string>((resolve) => {
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
            
            newAttachments.push({
                name: file.name,
                data: data,
                size: file.size,
                type: file.type,
            });
        }
        
        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...newAttachments]
        }));
        setError(null);
    };

    const removeAttachment = (index: number) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const getComplaintTypeLabel = (value: string) => {
        const type = complaintTypes.find(t => t.value === value);
        return type ? type.label : value;
    };

    const onCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
        if (token) {
            setError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        if (!formData.consent) {
            setError(t('form.consentRequired'));
            setIsSubmitting(false);
            return;
        }
        
        // Проверка капчи только если не в тестовом режиме
        if (!SKIP_CAPTCHA) {
            if (!captchaToken) {
                setError(t('form.captchaRequired'));
                setIsSubmitting(false);
                return;
            }
            
            try {
                const verifyResponse = await fetch('/api/verify-captcha', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: captchaToken }),
                });
                
                const verifyResult = await verifyResponse.json();
                
                if (!verifyResult.success) {
                    setError(t('form.captchaInvalid'));
                    captchaRef.current?.reset();
                    setCaptchaToken(null);
                    setIsSubmitting(false);
                    return;
                }
            } catch (captchaErr) {
                console.error('Captcha error:', captchaErr);
                setError(t('form.captchaError'));
                setIsSubmitting(false);
                return;
            }
        } else {
            console.log('🔓 Капча временно отключена (тестовый режим)');
        }
        
        try {
            const response = await fetch('/api/send-complaint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: formData.full_name,
                    email: formData.email,
                    phone: formData.phone,
                    complaint_type: getComplaintTypeLabel(formData.complaint_type),
                    subject: formData.subject,
                    description: formData.description,
                    incident_date: formData.incident_date,
                    incident_location: formData.incident_location,
                    attachments: formData.attachments,
                }),
            });
            
            const result = await response.json();
            
            if (result.success) {
                setIsSuccess(true);
                setFormData({
                    full_name: '',
                    email: '',
                    phone: '',
                    complaint_type: 'rights_violation',
                    subject: '',
                    description: '',
                    incident_date: '',
                    incident_location: '',
                    attachments: [],
                    consent: false,
                });
                captchaRef.current?.reset();
                setCaptchaToken(null);
            } else {
                setError(result.message || t('form.error'));
                captchaRef.current?.reset();
                setCaptchaToken(null);
            }
        } catch (err) {
            console.error('Error:', err);
            setError(t('form.error'));
            captchaRef.current?.reset();
            setCaptchaToken(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successIcon}>✓</div>
                <h3>{t('form.success')}</h3>
                <p>{t('form.successMessage')}</p>
                <button 
                    className={styles.newComplaintBtn} 
                    onClick={() => {
                        setIsSuccess(false);
                        captchaRef.current?.reset();
                        setCaptchaToken(null);
                    }}
                >
                    {t('form.newComplaint')}
                </button>
            </div>
        );
    }

    return (
        <section className={styles.complaintfForm}>
            <div className="container">
                <form className={styles.form} onSubmit={handleSubmit}>
                    
                    <div className={styles.section}>
                        <h3>{t('form.applicantInfo')}</h3>
                        
                        <div className={styles.row}>
                            <FormInput
                                label={t('form.fullName')}
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                                placeholder={t('form.fullNamePlaceholder')}
                            />
                        </div>
        
                        <div className={styles.row}>
                            <FormInput
                                label={t('form.email')}
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder={t('form.emailPlaceholder')}
                            />
                            
                            <FormInput
                                label={t('form.phone')}
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder={t('form.phonePlaceholder')}
                            />
                        </div>
                    </div>
        
                    <div className={styles.section}>
                        <h3>{t('form.complaintContent')}</h3>
                        
                        <FormSelect
                            label={t('form.complaintType')}
                            name="complaint_type"
                            value={formData.complaint_type}
                            onChange={handleChange}
                            options={complaintTypes}
                            required
                        />
        
                        <FormInput
                            label={t('form.subject')}
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder={t('form.subjectPlaceholder')}
                        />
        
                        <FormTextarea
                            label={t('form.description')}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={6}
                            placeholder={t('form.descriptionPlaceholder')}
                        />
        
                        <div className={styles.row}>
                            <FormInput
                                label={t('form.incidentDate')}
                                name="incident_date"
                                type="date"
                                value={formData.incident_date}
                                onChange={handleChange}
                            />
                            
                            <FormInput
                                label={t('form.incidentLocation')}
                                name="incident_location"
                                value={formData.incident_location}
                                onChange={handleChange}
                                placeholder={t('form.incidentLocationPlaceholder')}
                            />
                        </div>
                    </div>
        
                    <div className={styles.section}>
                        <h3>{t('form.documents')}</h3>
                        
                        <FormFileUpload
                            label={t('form.attachFiles')}
                            onChange={handleFileChange}
                            onRemove={removeAttachment}
                            attachments={formData.attachments}
                            hint={t('form.fileHint')}
                        />
                    </div>
        
                    <div className={styles.section}>
                        <FormCheckbox
                            label={t('form.consent')}
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Капча - будет скрыта или показана в зависимости от флага */}
                    {!SKIP_CAPTCHA && (
                        <div className={styles.section}>
                            <ReCAPTCHA
                                ref={captchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                onChange={onCaptchaChange}
                                onExpired={() => {
                                    setCaptchaToken(null);
                                    setError(t('form.captchaExpired'));
                                }}
                                onErrored={() => {
                                    setCaptchaToken(null);
                                    setError(t('form.captchaError'));
                                }}
                            />
                        </div>
                    )}
                    
                    {/* Опционально: показываем предупреждение, что капча отключена */}
                    {SKIP_CAPTCHA && (
                        <div className={styles.testWarning}>
                            ⚠️ [ТЕСТОВЫЙ РЕЖИМ] Капча временно отключена
                        </div>
                    )}
        
                    {error && <div className={styles.error}>{error}</div>}
        
                    <ButtonComplaint
                        type="submit" 
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? t('form.submitting') : t('form.submit')}
                    </ButtonComplaint>
                </form>
            </div>
        </section>
    );
};