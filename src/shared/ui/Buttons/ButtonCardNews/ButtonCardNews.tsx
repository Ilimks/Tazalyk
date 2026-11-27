import { ArrowRight } from 'lucide-react';
import styles from './ButtonCardNews.module.scss';

interface ButtonCardNewsProps {
  children: React.ReactNode;
  className?: string;
  tabIndex?: number;
}

export const ButtonCardNews: React.FC<ButtonCardNewsProps> = ({ children, className = '' }) => {
  return (
    <span className={`${styles.buttonCardNews} ${className}`}>
      {children}
      <ArrowRight className={styles.icon} size={16} aria-hidden />
    </span>
  );
};
