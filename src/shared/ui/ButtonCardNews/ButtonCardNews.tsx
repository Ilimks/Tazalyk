import React from 'react';
import styles from './ButtonCardNews.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ButtonCardNews: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button className={`${styles.buttonCardNews} ${className}`} {...props}>
      {children}
    </button>
  );
};