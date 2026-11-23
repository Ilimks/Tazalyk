'use client'
import styles from './DirectorBio.module.scss'

interface DirectorBioProps {
    bio: string;
}

export const DirectorBio: React.FC<DirectorBioProps> = ({ bio }) => (
    <div className={styles.directorBio}>
        {/* абзацы биографии разделены пустой строкой */}
        {bio.split('\n\n').map((paragraph) => (
            <p key={paragraph} className={styles.directorBio__text}>
                {paragraph}
            </p>
        ))}
    </div>
)
