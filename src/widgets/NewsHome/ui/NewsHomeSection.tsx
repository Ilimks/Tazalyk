import styles from './NewsHomeSection.module.scss'
import { NewsHomeSectionBottom } from './components/NewsHomeSectionBottom'
import mobile from './NewsHomeSectionMobile.module.scss'
import { HomeSectionHeader } from '@/shared/ui/HomeSectionHeader'

export const NewsHomeSection: React.FC = () => {
    return (
        <section className={`${styles.newsHome} ${mobile.newsHome}`}>
            <div className="container">
                <div className={`${styles.newsHome__box} ${mobile.newsHome__box}`}>
                    <HomeSectionHeader
                        title="Новости и События"
                        buttonText="Все новости"
                        buttonLink="/news"
                    />
                    <NewsHomeSectionBottom/>
                </div>
            </div>
        </section>
    )
}