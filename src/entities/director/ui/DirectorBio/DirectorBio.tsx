'use client'
import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import styles from './DirectorBio.module.scss'

interface DirectorBioProps {
    bio: string;
}

export const DirectorBio: React.FC<DirectorBioProps> = ({ bio }) => {
    const t = useTranslations('Common')
    const [isOpen, setIsOpen] = useState(false)
    const id = useId()
    const paragraphs = bio.split('\n\n')

    return (
        <div className={styles.directorBio}>
            <div id={id} className={`${styles.directorBio__body} ${isOpen ? styles.open : ''}`}>
                {paragraphs.map((paragraph) => (
                    <p key={paragraph} className={styles.directorBio__text}>
                        {paragraph}
                    </p>
                ))}
            </div>
            {paragraphs.length > 1 && (
                <button
                    type="button"
                    className={styles.directorBio__more}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? t('less') : t('more')}
                    <ChevronDown size={18} aria-hidden />
                </button>
            )}
        </div>
    )
}
