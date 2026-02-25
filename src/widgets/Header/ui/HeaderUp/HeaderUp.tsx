import styles from "./HeaderUp.module.scss";
import mobile from "./HeaderUpMobile.module.scss";
import Link from "next/link";
import Image from "next/image";
import { HeaderIcons } from "../HeaderIcons/HeaderIcons";
import { HeaderInputSearch } from "../HeaderInputSearch/HeaderInputSearch";
import { Language } from "@/widgets/language/Language";

export const HeaderUp: React.FC = () => {
    return (
        <div className={`${styles.header__up} ${mobile.header__up}`}>
            <div className={`${styles.header__up__left} ${mobile.header__up__left}`}>
                <Link href="/">
                    <Image
                      className={`${styles.header__up__logo} ${mobile.header__up__logo}`}
                      src="/assets/icons/Logo.png"
                      alt="Header Logo"
                      width={70}
                      height={70}
                      priority
                    />
                </Link>
                <div className={`${styles.header__up__logoName} ${mobile.header__up__logoName}`}>
                    <h4 className={`${styles.header__up__logoName1} ${mobile.header__up__logoName1}`}>ТАЗА<span>ЛЫК</span></h4>
                    <p className={`${styles.header__up__logoName2} ${mobile.header__up__logoName2}`}>Муниципальное предприятие</p>
                </div>
            </div>

            <div className={`${styles.header__up__center} ${mobile.header__up__center}`}>
                <p className={`${styles.header__up__tex1} ${mobile.header__up__text1}`}>Сегодня хороший день!</p>
                <p className={`${styles.header__up__tex2} ${mobile.header__up__text2}`}>Добро пожаловать на наш портал</p>
            </div>

            <div className={`${styles.header__up__right} ${mobile.header__up__right}`}>
                <HeaderInputSearch/>
                <HeaderIcons/>
                <Language/>
            </div>
        </div>
    )
}