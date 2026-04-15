import React from 'react';
import styles from './Loading.module.scss';

export interface LoadingProps {
  size?: number | string;
  color?: string;
  speed?: number;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 60,
  color = "green",
  speed = 3,
  className = "",
}) => {
  const sizePx = typeof size === 'number' ? `${size}px` : size;

  const customStyle = {
    width: sizePx,
    height: sizePx,
  } as React.CSSProperties;

  return (
    <div className={`${styles.loadingContainer} ${className}`} style={customStyle}>
      <svg 
        className={styles.pl} 
        viewBox="0 0 128 128" 
        width="100%" 
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <circle 
          className={styles.pl__ring} 
          r="56" 
          cx="64" 
          cy="64" 
          fill="none" 
          stroke="hsla(0,10%,10%,0.1)" 
          strokeWidth="16" 
          strokeLinecap="round" 
        />
        <path 
          className={styles.pl__worm} 
          d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z" 
          fill="none" 
          stroke={color === "green" ? "url(#pl-grad)" : color}
          strokeWidth="16" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeDasharray="44 1111" 
          strokeDashoffset="10" 
        />
      </svg>
    </div>
  );
};

export default Loading;