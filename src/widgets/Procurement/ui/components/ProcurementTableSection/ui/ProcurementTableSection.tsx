'use client';
import { useEffect } from 'react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { InfoCard } from '@/shared/ui/InfoCard';
import { ErrorState } from '@/shared/ui/ErrorState';
import { useCopyProtection } from '@/shared/lib/hooks/useCopyProtection';
import { useProcurements } from '@/features/procurement/model/useProcurements';
import { TableHeader } from './components/TableHeader/TableHeader';
import { TableBody } from './components/TableBody/TableBody';
import styles from './ProcurementTableSection.module.scss';
import mobileStyles from './ProcurementTableSectionMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';

interface ProcurementTableSectionProps {
    itemsPerPage?: number;
}

export const ProcurementTableSection: React.FC<ProcurementTableSectionProps> = ({ 
    itemsPerPage = 10 
}) => {
    const { procurements, isLoading, error, loadProcurements } = useProcurements();
    const { handleCopy, handleContextMenu, handleKeyDown } = useCopyProtection();

    // Загружаем данные при монтировании
    useEffect(() => {
        if (procurements.length === 0) {
            loadProcurements();
        }
    }, [loadProcurements, procurements.length]);

    const renderContent = () => {
        if (isLoading && procurements.length === 0) {
            return <LoadingState />;
        }
        
        if (error && procurements.length === 0) {
            let errorTitle = "Ошибка загрузки данных о закупках";
            let errorMessage = error;
            
            if (error.includes("404")) {
                errorTitle = "Данные не найдены";
                errorMessage = "Информация о закупках временно недоступна. Пожалуйста, попробуйте позже.";
            } else if (error.includes("network") || error.includes("fetch")) {
                errorTitle = "Проблема с соединением";
                errorMessage = "Не удается загрузить данные о закупках. Проверьте подключение к интернету.";
            } else if (error.includes("403") || error.includes("forbidden")) {
                errorTitle = "Доступ ограничен";
                errorMessage = "У вас нет прав для просмотра данных о закупках. Обратитесь к администратору.";
            } else if (error.includes("timeout")) {
                errorTitle = "Превышено время ожидания";
                errorMessage = "Сервер долго не отвечает. Пожалуйста, попробуйте позже.";
            }
            
            return (
                <div className={styles.errorWrapper}>
                    <ErrorState 
                        error={errorMessage} 
                        onRetry={loadProcurements}
                        title={errorTitle}
                        variant="compact"
                    />
                </div>
            );
        }
        
        return (
            <>
                <TableHeader totalCount={procurements.length} isLoading={isLoading} />
                <TableBody data={procurements} itemsPerPage={itemsPerPage} />
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