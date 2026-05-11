import styles from "./HeaderIcons.module.scss"
import mobile from "./HeaderIconsMobile.module.scss"
import { socialIcons } from "@/widgets/Header/model/headerMenu";
import Image from "next/image";
import Link from "next/link";

export const HeaderIcons: React.FC = () => {
    return (
        <div className={`${styles.header__up__box__icons} ${mobile.header__up__box__icons}`}>
          {socialIcons.map((icon, index) => (
            <Link
              key={index}
              href={icon.link || icon.src || "#"}
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
            </Link>
          ))}
        </div>
    )
}