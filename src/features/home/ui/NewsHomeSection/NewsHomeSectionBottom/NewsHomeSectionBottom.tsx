import { NewsCard } from '@/widgets/NewsCard/ui/NewsCard'
import styles from './NewsHomeSectionBottom.module.scss'
import mobile from './NewsHomeSectionBottomMobile.module.scss'

export const NewsHomeSectionBottom: React.FC = () => {
    // Если у вас есть данные:
    // const news: News[] = [/* данные */];
    
    // Если данных нет, создаем массив из 4 элементов для рендеринга
    const newsCount = 4;
    
    return (
        <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
            {Array.from({ length: newsCount }).map((_, index) => (
                <NewsCard
                    key={index}
                    // Если есть данные:
                    // news={news[index]}
                    // Если данных нет:
                    // news={null} или пропустить этот проп
                    // variant="compact"
                />
            ))}
        </div>
    )
}