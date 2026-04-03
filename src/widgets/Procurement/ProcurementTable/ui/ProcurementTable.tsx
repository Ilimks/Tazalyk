'use client';
import React from 'react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { InfoCard } from '@/shared/ui/InfoCard';
import { useCopyProtection } from '@/shared/lib/hooks/useCopyProtection';
import { useProcurement } from '../model/useProcurement';
import { TableHeader } from './components/TableHeader/TableHeader';
import { TableBody } from './components/TableBody/TableBody';
import { LoadingState } from './components/LoadingState/LoadingState';
import { ErrorState } from './components/ErrorState/ErrorState';
import styles from './ProcurementTable.module.scss';
import mobileStyles from './ProcurementTableMobile.module.scss';

export const ProcurementTable: React.FC = () => {
    const { procurementData, loading, error, refetch } = useProcurement();
    const { handleCopy, handleContextMenu, handleKeyDown } = useCopyProtection();

    const renderContent = () => {
        if (loading) return <LoadingState />;
        if (error) return <ErrorState error={error} onRetry={refetch} />;
        
        return (
            <>
                <TableHeader totalCount={procurementData.length} isLoading={loading} />
                <TableBody data={procurementData} />
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
                <PageHeader 
                    title="Закупки"
                    description="Информация о проведенных и планируемых закупках товаров, работ и услуг в соответствии с действующим законодательством Кыргызской Республики"
                />
                
                <InfoCard 
                    title="Реестр закупок"
                    description="В таблице представлен перечень всех проведенных закупок. Данные обновляются автоматически после публикации информации в системе. Новые закупки отображаются в начале списка."
                />

                <div className={`${styles.procurementBox} ${mobileStyles.procurementBox}`}>
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};