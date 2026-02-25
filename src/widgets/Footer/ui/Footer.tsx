import styles from "./Footer.module.scss";
import { FooterBottom } from "./FooterBottom/FooterBottom";
import mobile from "./FooterMobile.module.scss";
import { FooterUp } from "./FooterUp/FooterUp";

export const Footer: React.FC = () => {
    return (
        <footer className={`${styles.footer} ${mobile.footer}`}>
            <div className="container">
                <div className={`${styles.footer__box} ${mobile.footer__box}`}>
                    <FooterUp/>
                    <FooterBottom/>
                </div>
            </div>
        </footer>
    )
}