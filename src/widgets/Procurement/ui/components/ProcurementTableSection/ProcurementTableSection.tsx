'use client';
import { useEffect } from 'react';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { useCopyProtection } from '@/shared/lib/hooks/useCopyProtection';
import { useProcurements } from '@/features/procurement/model/useProcurements';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';
import styles from './ProcurementTableSection.module.scss';
import mobileStyles from './ProcurementTableSectionMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';
import { useTranslations } from 'next-intl';
import type { PageResult } from '@/shared/api';
import type { ProcurementItem } from '@/entities/procurement';

interface ProcurementTableSectionProps {
    itemsPerPage?: number;
    // первая страница, загруженная на сервере; null — сервер не смог её загрузить, грузим в браузере
    initialData?: PageResult<ProcurementItem> | null;
}

export const ProcurementTableSection: React.FC<ProcurementTableSectionProps> = ({
    itemsPerPage = 100,
    initialData = null
}) => {

    const t = useTranslations("Procurement");

    const {
        procurements: loadedProcurements,
        isLoading: isLoadingProcurements,
        isSuccess,
        error: loadError,
        loadProcurements,
        totalCount: loadedCount
    } = useProcurements();
    const { handleCopy, handleContextMenu, handleKeyDown } = useCopyProtection();
    const loadOnClient = initialData === null;

    useEffect(() => {
        if (loadOnClient) loadProcurements(1, itemsPerPage);
    }, [loadOnClient, loadProcurements, itemsPerPage]);

    // таблица показывает только первую страницу, поэтому данные с сервера заменяют загрузку целиком
    const procurements = initialData ? initialData.items : loadedProcurements;
    const totalCount = initialData ? initialData.totalCount : loadedCount;
    const error = loadOnClient ? loadError : null;
    // до первого ответа в браузере показываем загрузку, а не «закупок нет»
    const isLoading = loadOnClient && (isLoadingProcurements || (!isSuccess && !loadError));

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

        if (procurements.length === 0 && !isLoading) {
            return <EmptyState variant="procurement" />;
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