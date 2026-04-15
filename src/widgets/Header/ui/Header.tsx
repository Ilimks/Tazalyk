import styles from "./Header.module.scss";
import mobile from "./HeaderMobile.module.scss";
import { HeaderBottomNav } from "./HeaderBottomNav";
import { HeaderUp } from "./HeaderUp/HeaderUp";

export const Header: React.FC = () => {

    return (
        <header className={`${styles.header} ${mobile.header}`}>
            <div className="container">
                <div className={`${styles.header__box} ${mobile.header__box}`}>
                    <HeaderUp/>
                </div>
            </div>
            <HeaderBottomNav/>
        </header>
    )
}