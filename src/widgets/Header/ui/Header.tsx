import styles from "./Header.module.scss";
import mobile from "./HeaderMobile.module.scss";
import { HeaderBottomNav } from "./HeaderBottomNav";
import { HeaderTop } from "./HeaderTop/HeaderTop";
import { HeaderUp } from "./HeaderUp/HeaderUp";

export const Header: React.FC = () => {

    return (
        <header className={`${styles.header} ${mobile.header}`}>
            <HeaderTop/>
            <div className={styles.header__main}>
                <div className="container">
                    <div className={`${styles.header__box} ${mobile.header__box}`}>
                        <HeaderUp/>
                    </div>
                </div>
            </div>
            <HeaderBottomNav/>
        </header>
    )
}
