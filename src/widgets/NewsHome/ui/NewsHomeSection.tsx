import styles from './NewsHomeSection.module.scss'
import { NewsHomeSectionBottom } from './components/NewsHomeSectionBottom'
import mobile from './NewsHomeSectionMobile.module.scss'
import { HomeSectionHeader } from '@/shared/ui/HomeSectionHeader'
import { useTranslations } from 'next-intl';

export const NewsHomeSection: React.FC = () => {
    const t = useTranslations("Main");

    return (
        <section className={`${styles.newsHome} ${mobile.newsHome}`}>
            <div className="container">
                <div className={`${styles.newsHome__box} ${mobile.newsHome__box}`}>
                    <HomeSectionHeader
                        title={t('MainNewsTitle')}
                        buttonText={t('MainNewsButton')}
                        buttonLink="/news"
                    />
                    <NewsHomeSectionBottom/>
                </div>
            </div>
        </section>
    )
}