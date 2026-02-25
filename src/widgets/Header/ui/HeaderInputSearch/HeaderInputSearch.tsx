import styles from "./HeaderInputSearch.module.scss";
import mobile from "./HeaderInputSearchMobile.module.scss";
import Image from "next/image";

export const HeaderInputSearch: React.FC = () => {
    return (
        <div className={`${styles.header__search} ${styles.header__search}`}>
            <input type="text" placeholder="Найти на сайте" />
            <Image
                className={styles.icon}
                src="/assets/icons/search.svg"
                alt="Header Search"
                width={16}
                height={16}
                priority
            />

            
        </div>

    )
}