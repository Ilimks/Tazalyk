'use client'
import { DirectorateMember } from '@/widgets/Directorate/model';
import styles from './DirectorateGrid.module.scss';
import { DirectorateCard } from '@/shared/ui/Cards';

interface DirectorateGridProps {
    members: DirectorateMember[];
}

export const DirectorateGrid: React.FC<DirectorateGridProps> = ({ members }) => {
    const sortedMembers = [...members].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <section className='directorate'>
            <div className="container">
                <div className={styles.directorateGrid}>
                    {sortedMembers.map((member, index) => (
                        <DirectorateCard key={member.id} member={member} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};