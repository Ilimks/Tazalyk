'use client'
import { ServiceZoneHeader, InfoBlock, pageHeader, infoBlock } from '@/entities/service';
import { ServiceZoneMap } from '@/features/services';
import styles from './ServiceZonePage.module.scss';

export const ServiceZonePage: React.FC = () => (
    <section className={styles.serviceZone}>
        <div className="container">
            <ServiceZoneHeader 
                title={pageHeader.title}
                description={pageHeader.description}
            />

            <ServiceZoneMap />

            <InfoBlock text={infoBlock.text} />
        </div>
    </section>
);