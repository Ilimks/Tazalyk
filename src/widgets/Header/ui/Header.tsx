import Link from "next/link";
import styles from "./Header.module.scss";
import mobile from "./HeaderMobile.module.scss";
import Image from "next/image";
import { Language } from "@/widgets/language/Language";
import { HeaderBottomNav } from "./HeaderBottomNav/HeaderBottomNav";
import { HeaderIcons } from "./HeaderIcons/HeaderIcons";
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