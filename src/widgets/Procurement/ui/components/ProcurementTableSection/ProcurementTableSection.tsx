'use client';
import { useEffect } from 'react';
import { ErrorState } from '@/shared/ui/ErrorState';
import { useCopyProtection } from '@/shared/lib/hooks/useCopyProtection';
import { useProcurements } from '@/features/procurement/model/useProcurements';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';
import styles from './ProcurementTableSection.module.scss';
import mobileStyles from './ProcurementTableSectionMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';
import { useTranslations } from 'next-intl';

interface ProcurementTableSectionProps {
    itemsPerPage?: number;
}

export const ProcurementTableSection: React.FC<ProcurementTableSectionProps> = ({ 
    itemsPerPage = 100
}) => {

    const t = useTranslations("Procurement");

    const { 
        procurements, 
        isLoading, 
        error, 
        loadProcurements,
        totalCount
    } = useProcurements();
    const { handleCopy, handleContextMenu, handleKeyDown } = useCopyProtection();

    useEffect(() => {
        loadProcurements(1, itemsPerPage);
    }, [loadProcurements, itemsPerPage]);

    const renderContent = () => {
        if (isLoading && procurements.length === 0) {
            return <LoadingState />;
        }
        
        if (error && procurements.length === 0) {
            return (
                <div className={styles.errorWrapper}>
                    <ErrorState 
                        error={error} 
                        onRetry={() => loadProcurements(1, itemsPerPage)}
                        title={t('ProcurementErrorData')}
                        variant="compact"
                    />
                </div>
            );
        }
        
        return (
            <>
                <TableHeader totalCount={totalCount} isLoading={isLoading} />
                <TableBody data={procurements} />
            </>
        );
    };

    return (
        <section 
            className={`${styles.procurement} ${mobileStyles.procurement}`}
            onCopy={handleCopy}
            onContextMenu={handleContextMenu}
            onKeyDown={handleKeyDown}
            style={{ userSelect: 'none' }}
        >
            <div className="container">
                <div className={`${styles.procurementBox} ${mobileStyles.procurementBox}`}>
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};