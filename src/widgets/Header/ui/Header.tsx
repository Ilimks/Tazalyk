import styles from "./Header.module.scss";
import mobile from "./HeaderMobile.module.scss";

export const Header: React.FC = () => {
    return (
        <header className={`${styles.header} ${mobile.header}`}>
            <div className={styles.container}>
                
            </div>
        </header>
    )
}