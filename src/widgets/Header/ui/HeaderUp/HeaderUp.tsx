"use client";
import styles from "./HeaderUp.module.scss";
import mobile from "./HeaderUpMobile.module.scss";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Clock, Headset, MapPin } from "lucide-react";
import { HeaderInputSearch } from "../Search/Search";
import { HeaderIcons } from "../HeaderIcons/HeaderIcons";
import { Language } from "@/shared/ui/language/Language";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { useBurger } from "../../model/useBurger";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useTranslations } from 'next-intl';
import { CartLink } from "@/features/cart";

export const HeaderUp: React.FC = () => {
  const t = useTranslations("Header");
  const tFooter = useTranslations("Footer");
  const tMain = useTranslations("Main");
  const { isOpen, toggle, close } = useBurger();

  return (
    <div className={`${styles.header__up} ${mobile.header__up}`}>
      <div className={`${styles.header__up__left} ${mobile.header__up__left}`}>
        <Link href="/">
          <Image
            className={`${styles.header__up__logo} ${mobile.header__up__logo}`}
            src="/assets/icons/logo.svg"
            alt="Header Logo"
            width={70}
            height={70}
            priority
          />
        </Link>
        <Link href="/">
          <div
            className={`${styles.header__up__logoName} ${mobile.header__up__logoName}`}
          >
            <h4
              className={`${styles.header__up__logoName1} ${mobile.header__up__logoName1}`}
            >
              <Image
                src="/assets/icons/logo-name.svg"
                alt="ТАЗАЛЫК"
                width={165}
                height={27}
                priority
              />
            </h4>
            {/* textLength растягивает подпись точно по ширине надписи на любом языке */}
            <svg
              className={`${styles.header__up__logoName2} ${mobile.header__up__logoName2}`}
              viewBox="0 0 165 15"
              role="img"
              aria-label={t('header__logo')}
            >
              <text x="0" y="12" textLength="165" lengthAdjust="spacing">
                {t('header__logo')}
              </text>
            </svg>
          </div>
        </Link>
      </div>

      <div
        className={`${styles.header__up__right} ${mobile.header__up__right}`}
      >
        <HeaderInputSearch />
        <div className={styles.header__up__actions}>
          {/* адрес и график — двумя строками, рядом колл-центр, соцсети и язык */}
          <div className={styles.header__up__info}>
            <Link href="/contacts" className={styles.header__up__address}>
              <MapPin size={16} aria-hidden />
              <span>{tFooter('FooterAddress')}</span>
            </Link>
            <p className={styles.header__up__hours}>
              <Clock size={16} aria-hidden />
              <span>{tFooter('FooterWorkHours')}</span>
            </p>
          </div>
          <a className={styles.header__up__call} href="tel:1400">
            <span className={styles.header__up__callIcon}>
              <Headset size={22} aria-hidden />
            </span>
            <span className={styles.header__up__callText}>
              {tMain('MainReceptionCallCenter')}
              <b>1400</b>
            </span>
          </a>
          <div className={styles.header__up__social}>
            <HeaderIcons />
          </div>
          <CartLink />
          <div className={styles.header__up__lang}>
            <Language />
          </div>
          <BurgerMenu isOpen={isOpen} onClick={toggle} />
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={close} />
    </div>
  );
};
