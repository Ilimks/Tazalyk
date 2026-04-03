'use client'
import { DirectorateCard, DirectorateMember } from '@/entities/directorate';
import styles from './DirectorateGrid.module.scss';

interface DirectorateGridProps {
    members: DirectorateMember[];
}

export const DirectorateGrid: React.FC<DirectorateGridProps> = ({ members }) => {
    // Сортируем по order
    const sortedMembers = [...members].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <div className={styles.directorateGrid}>
            {sortedMembers.map((member, index) => (
                <DirectorateCard key={member.id} member={member} index={index} />
            ))}
        </div>
    );
};