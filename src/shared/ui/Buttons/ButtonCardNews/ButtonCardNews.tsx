import { ArrowRight } from 'lucide-react';
import styles from './ButtonCardNews.module.scss';

interface ButtonCardNewsProps {
  children: React.ReactNode;
  className?: string;
  tabIndex?: number;
}

// Подпись «Подробнее →» внутри карточки-ссылки. Это span, а не button:
// кнопка внутри <a> — невалидный HTML, а кликабельна и так вся карточка
export const ButtonCardNews: React.FC<ButtonCardNewsProps> = ({ children, className = '' }) => {
  return (
    <span className={`${styles.buttonCardNews} ${className}`}>
      {children}
      <ArrowRight className={styles.icon} size={16} aria-hidden />
    </span>
  );
};
