import styles from './NewsHomeSection.module.scss'
import { NewsHomeSectionBottom } from './NewsHomeSectionBottom/NewsHomeSectionBottom'
import mobile from './NewsHomeSectionMobile.module.scss'
import { NewsHomeSectionUp } from './NewsHomeSectionUp/NewsHomeSectionUp'

export const NewsHomeSection: React.FC = () => {
    return (
        <section className={`${styles.newsHome} ${mobile.newsHome}`}>
            <div className="container">
                <div className={`${styles.newsHome__box} ${mobile.newsHome__box}`}>
                    <NewsHomeSectionUp/>
                    <NewsHomeSectionBottom/>
                </div>
            </div>
        </section>
    )
}