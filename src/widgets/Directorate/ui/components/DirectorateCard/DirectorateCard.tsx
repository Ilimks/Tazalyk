'use client'
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { DirectorateMember } from '../../../model/directorateData';
import styles from './DirectorateCard.module.scss';

interface DirectorateCardProps {
    member: DirectorateMember;
}

const getInitials = (name: string) =>
    name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('');

export const DirectorateCard: React.FC<DirectorateCardProps> = ({ member }) => {
    const t = useTranslations('Directorate');
    const imageRef = useRef<HTMLImageElement>(null);
    const [photoFailed, setPhotoFailed] = useState(false);

    // ошибка загрузки могла случиться до гидратации, когда onError ещё не был подключён
    useEffect(() => {
        const image = imageRef.current;
        if (image && image.complete && image.naturalWidth === 0) setPhotoFailed(true);
    }, [member.photo]);

    return (
        <article data-reveal suppressHydrationWarning className={styles.card}>
            <div className={styles.photo}>
                {member.photo && !photoFailed ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img ref={imageRef} src={member.photo} alt={member.name} onError={() => setPhotoFailed(true)} />
                ) : (
                    <span className={styles.initials} aria-hidden="true">{getInitials(member.name)}</span>
                )}
            </div>
            <div className={styles.body}>
                <p className={styles.position}>{t(`positions.${member.position}`)}</p>
                <h2 className={styles.name}>{member.name}</h2>
            </div>
        </article>
    );
};
