import styles from './WinterHat.module.scss';

interface WinterHatProps {
    inset?: number;
}

export const WinterHat: React.FC<WinterHatProps> = ({ inset = 0 }) => (
    <span className={styles.frame} style={inset ? { inset } : undefined} aria-hidden="true">
        <span className={styles.hat} />
    </span>
);
