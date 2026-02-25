import styles from "./HeaderIcons.module.scss"
import mobile from "./HeaderIconsMobile.module.scss"
import { socialIcons } from "../../model/headerMenu";
import Image from "next/image";

export const HeaderIcons: React.FC = () => {
    return (
        <div className={`${styles.header__up__box__icons} ${mobile.header__up__box__icons}`}>
          {socialIcons.map((icon, index) => (
            <div
              key={index}
              className={`${styles.header__up__icons} ${mobile.header__up__icons}`}
            >
              <Image
                className={`${styles[`header__up__${icon.key}`]} ${
                  mobile[`header__up__${icon.key}`]
                }`}
                src={icon.src}
                alt={icon.alt}
                width={32}
                height={32}
                priority
              />

            </div>
          ))}
        </div>
    )
}