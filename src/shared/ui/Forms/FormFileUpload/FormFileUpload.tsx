import React, { useState } from 'react';
import styles from './FormFileUpload.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

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
    accept = "image/*", // Только изображения
    hint = "Максимальный размер файла: 5MB. Поддерживаемые форматы: JPG, PNG, GIF, WEBP",
    error,
    multiple = true,
}) => {
    const t = useTranslations("Complaints");
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length !== files.length) {
            alert('Можно загружать только изображения!');
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
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                    />
                    <span>📷 {t('fileUpload') || 'Выберите фото'}</span>
                </label>
                <p className={styles.hint}>{hint}</p>
                
                {attachments.length > 0 && (
                    <div className={styles.attachments}>
                        {attachments.map((file, idx) => (
                            <div key={idx} className={styles.attachment}>
                                <div className={styles.previewImage}>
                                    {file.type.startsWith('image/') && (
                                        <img 
                                            src={file.data} 
                                            alt={file.name}
                                            className={styles.thumbnail}
                                        />
                                    )}
                                </div>
                                <div className={styles.attachmentInfo}>
                                    <span className={styles.fileName}>📷 {file.name}</span>
                                    <span className={styles.fileSize}>
                                        {(file.size / 1024).toFixed(0)} KB
                                    </span>
                                </div>
                                <button type="button" onClick={() => onRemove(idx)} className={styles.removeBtn}>
                                    ✕
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