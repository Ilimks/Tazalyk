import styles from "./Footer.module.scss";
import mobile from "./FooterMobile.module.scss";

export const Footer: React.FC = () => {
    return (
        <footer className={`${styles.footer} ${mobile.footer}`}>
            <div className={styles.container}>
                
            </div>
        </footer>
    )
}