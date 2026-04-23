import Image from "next/image";
import styles from "./FooterUp.module.scss";
import mobile from "./FooterUpMobile.module.scss";
import { Link } from '@/i18n/navigation';
import { useFooterNav } from "../../model/footerMenu";
import { useTranslations } from 'next-intl';

export const FooterUp: React.FC = () => {
  const t = useTranslations("Footer");
  const footerNav = useFooterNav(); 

  return (
    <div className={`${styles.footer__up} ${mobile.footer__up}`}>
      <div className={`${styles.footer__up__left} ${mobile.footer__up__left}`}>
        <Link href="/">
          <Image
            className={`${styles.footer__up__left__logo} ${mobile.footer__up__left__logo}`}
            src="/assets/icons/Logo.png"
            alt="Header Logo"
            width={60}
            height={60}   
            priority
          />
        </Link>
        <div className={`${styles.footer__up__left__textBox} ${mobile.footer__up__left__textBox}`}>
          <p className={`${styles.footer__up__left__text} ${mobile.footer__up__left__text}`}>
            {t('FooterDescriptiion')}
          </p>
        </div>
      </div>
      <div className={`${styles.footer__up__right} ${mobile.footer__up__right}`}>
        {footerNav.map((section, index) => (
          <div key={index} className={`${styles.footer__up__right__column} ${mobile.footer__up__right__column}`}>
            <h5 className={`${styles.footer__up__right__name} ${mobile.footer__up__right__name}`}>{section.title}</h5>
            <nav className={`${styles.footer__up__right__nav} ${mobile.footer__up__right__nav}`}>
              <ul className={`${styles.footer__up__right__ul} ${mobile.footer__up__right__ul}`}>
                {section.items.map((item, i) => (
                  <li key={i} className={`${styles.footer__up__right__li} ${mobile.footer__up__right__li}`}>
                    <Link href={item.href || "#"} className={styles.footer__up__right__link}>
                      {item.icon && (
                        <Image
                          className={`${styles.footer__up__right__li__icon} ${mobile.footer__up__right__li__icon}`}
                          src={item.icon}
                          alt=""
                          width={18}
                          height={18}
                        />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
};