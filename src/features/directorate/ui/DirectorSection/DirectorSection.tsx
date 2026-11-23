'use client'
import { CalendarClock, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { DirectorCard, DirectorBio } from '@/entities/director'
import { Link } from '@/i18n/navigation'
import buttonStyles from '@/shared/ui/Buttons/Button/Button.module.scss'
import styles from './DirectorSection.module.scss'

interface DirectorSectionProps {
    name: string;
    position: string;
    photoUrl?: string;
    bio: string;
}

export const DirectorSection: React.FC<DirectorSectionProps> = ({ 
    name, 
    position, 
    photoUrl, 
    bio 
}) => {
    const t = useTranslations('HeaderMenu')

    return (
        <section data-reveal suppressHydrationWarning className={styles.directorSection}>
            <DirectorCard name={name} photoUrl={photoUrl} />
            <div className={styles.directorSection__right}>
                <p className={styles.directorSection__position}>{position}</p>
                <h2 className={styles.directorSection__name}>{name}</h2>
                <DirectorBio bio={bio} />
                <div className={styles.directorSection__links}>
                    <Link href="/employee" className={buttonStyles.button}>
                        <CalendarClock size={18} aria-hidden />
                        {t('subscribersEmployee')}
                    </Link>
                    <Link href="/directorate" className={buttonStyles.button}>
                        <Users size={18} aria-hidden />
                        {t('aboutDirectorate')}
                    </Link>
                </div>
            </div>
        </section>
    )
}
