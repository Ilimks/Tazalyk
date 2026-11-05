import { ImageIcon, ImagePlus, X } from 'lucide-react';
import styles from './FormFileUpload.module.scss';
import { useTranslations } from 'next-intl';

interface Attachment {
    name: string;
    data: string;
    size: number;
    type: string;
}

interface FormFileUploadProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (index: number) => void;
    attachments: Attachment[];
    accept?: string;
    hint?: string;
    error?: string;
    multiple?: boolean;
}

export const FormFileUpload: React.FC<FormFileUploadProps> = ({
    label,
    onChange,
    onRemove,
    attachments,
    accept = "image/*",
    hint,
    error,
    multiple = true,
}) => {
    const t = useTranslations("Complaints");
    const tCommon = useTranslations("Common");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length !== files.length) {
            alert(t('form.onlyImages'));
            return;
        }
        
        onChange(e);
    };

    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>{label}</label>
            <div className={styles.fileUpload}>
                <label className={styles.fileLabel}>
                    <input
                        type="file"
                        multiple={multiple}
                        accept={accept}
                        onChange={handleFileChange}
                        className={styles.fileInput}
                    />
                    <ImagePlus size={18} aria-hidden />
                    <span>{t('fileUpload')}</span>
                </label>
                <p className={styles.hint}>{hint ?? t('form.imageHint')}</p>
                
                {attachments.length > 0 && (
                    <div className={styles.attachments}>
                        {attachments.map((file, idx) => (
                            <div key={idx} className={styles.attachment}>
                                <div className={styles.previewImage}>
                                    {file.type.startsWith('image/') && (
                                        // превью из data URL — next/image здесь не нужен
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img 
                                            src={file.data} 
                                            alt={file.name}
                                            className={styles.thumbnail}
                                        />
                                    )}
                                </div>
                                <div className={styles.attachmentInfo}>
                                    <span className={styles.fileName}>
                                        <ImageIcon size={14} aria-hidden />
                                        {file.name}
                                    </span>
                                    <span className={styles.fileSize}>
                                        {(file.size / 1024).toFixed(0)} KB
                                    </span>
                                </div>
                                <button type="button" onClick={() => onRemove(idx)} className={styles.removeBtn} aria-label={tCommon('delete')}>
                                    <X size={16} aria-hidden />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};