import React from 'react';
import { ActsHeader } from '@/shared/ui/Acts/ActsHeader';
import styles from './DocumentHeader.module.scss';

interface DocumentHeaderProps {
    title: string;
    description: string;
}

export const DocumentHeader: React.FC<DocumentHeaderProps> = ({ title, description }) => {
    return (
        <div className={styles.header}>
            <ActsHeader title={title} description={description} />
        </div>
    );
};