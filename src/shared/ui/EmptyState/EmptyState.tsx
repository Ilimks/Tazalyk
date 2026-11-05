'use client';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import type { LucideIcon } from 'lucide-react';
import { EmptyStateVariant, variantConfig } from './config';
import styles from './EmptyState.module.scss';

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  children?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'default',
  title,
  description,
  icon: CustomIcon,
  actionText,
  onAction,
  className = '',
  children,
}) => {
  const t = useTranslations('EmptyState');
  const key = variantConfig[variant] ? variant : 'default';
  const finalTitle = title ?? t(`${key}.title`);
  const finalDescription = description ?? t(`${key}.description`);
  const IconComponent = CustomIcon ?? variantConfig[key].icon;

  return (
    <div className={`${styles.emptyState} ${className}`}>
      <div className={styles.iconWrapper}>
        <IconComponent strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className={styles.title}>{finalTitle}</h3>
      {finalDescription && <p className={styles.description}>{finalDescription}</p>}
      {children && <div className={styles.extraContent}>{children}</div>}
      {actionText && onAction && (
        <button onClick={onAction} className={styles.actionBtn}>
          {actionText}
        </button>
      )}
    </div>
  );
};