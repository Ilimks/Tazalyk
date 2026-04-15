"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import styles from "./MobileMenu.module.scss";
import { useMobileMenu } from "../../hooks/useMobileMenu";
import { MobileSearch } from "../MobileSearch";
import { MobileHeaderIcons } from "../MobileHeaderIcons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: Props) => {
  const { openSubmenu, toggleSubmenu } = useMobileMenu(isOpen, onClose);
  const t = useTranslations("HeaderMenu");

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        onClick={onClose}
      />

      <nav className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.topBar}>
          <div className={styles.logoIcon}>
            <Image
              src="/assets/icons/logo.png"
              alt="Тазалык"
              width={40}
              height={40}
              priority
            />
          </div>

          <button className={styles.closeButton} onClick={onClose}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <MobileSearch onSearch={handleSearch} />

        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/" onClick={onClose} className={styles.menuLink}>
              <span>{t('home')}</span>
            </Link>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <div 
              className={styles.submenuTrigger}
              onClick={() => toggleSubmenu("about")}
            >
              <span className={styles.triggerText}>{t('about')}</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`${styles.arrow} ${openSubmenu === "about" ? styles.rotated : ""}`}
              >
                <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <ul className={`${styles.submenu} ${openSubmenu === "about" ? styles.submenuOpen : ""}`}>
              <li className={styles.submenuItem}>
                <Link href="/history" onClick={onClose} className={styles.submenuLink}>{t('aboutHistory')}</Link>
              </li>
              <li className={styles.submenuItem}>
                <Link href="/directorate" onClick={onClose} className={styles.submenuLink}>{t('aboutDirectorate')}</Link>
              </li>
              <li className={styles.submenuItem}>
                <Link href="/structure" onClick={onClose} className={styles.submenuLink}>{t('aboutStructure')}</Link>
              </li>
              <li className={styles.submenuItem}>
                <Link href="/service-zone" onClick={onClose} className={styles.submenuLink}>{t('aboutServiceZone')}</Link>
              </li>
              <li className={styles.submenuItem}>
                <Link href="/results" onClick={onClose} className={styles.submenuLink}>{t('aboutResults')}</Link>
              </li>
              <li className={styles.submenuItem}>
                <Link href="/vacancies" onClick={onClose} className={styles.submenuLink}>{t('aboutVacancies')}</Link>
              </li>
            </ul>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <div 
              className={styles.submenuTrigger}
              onClick={() => toggleSubmenu("abonents")}
            >
              <span className={styles.triggerText}>{t('subscribers')}</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`${styles.arrow} ${openSubmenu === "abonents" ? styles.rotated : ""}`}
              >
                <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <ul className={`${styles.submenu} ${openSubmenu === "abonents" ? styles.submenuOpen : ""}`}>
              <li className={styles.submenuItem}>
                <Link href="/tariffs" onClick={onClose} className={styles.submenuLink}>{t('subscribersTariffs')}</Link>
              </li>
            </ul>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <div 
              className={styles.submenuTrigger}
              onClick={() => toggleSubmenu("press")}
            >
              <span className={styles.triggerText}>{t('pressCenter')}</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`${styles.arrow} ${openSubmenu === "press" ? styles.rotated : ""}`}
              >
                <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <ul className={`${styles.submenu} ${openSubmenu === "press" ? styles.submenuOpen : ""}`}>
              <li className={styles.submenuItem}>
                <Link href="/news" onClick={onClose} className={styles.submenuLink}>{t('pressCenterNews')}</Link>
              </li>
              <li className={styles.submenuItem}>
                <Link href="/media" onClick={onClose} className={styles.submenuLink}>{t('pressCenterMedia')}</Link>
              </li>
            </ul>
          </li>

          <li className={styles.menuItem}>
            <Link href="/procurement" onClick={onClose} className={styles.menuLink}>
              <span>{t('procurement')}</span>
            </Link>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <div 
              className={styles.submenuTrigger}
              onClick={() => toggleSubmenu("legal")}
            >
              <span className={styles.triggerText}>{t('regulatoryFramework')}</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`${styles.arrow} ${openSubmenu === "legal" ? styles.rotated : ""}`}
              >
                <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <ul className={`${styles.submenu} ${openSubmenu === "legal" ? styles.submenuOpen : ""}`}>
              <li className={styles.submenuItem}>
                <Link href="/legislation" onClick={onClose} className={styles.submenuLink}>{t('regulatoryFrameworkLegislation')}</Link>
              </li>
              <li className={styles.submenuItem}>
                <Link href="/acts" onClick={onClose} className={styles.submenuLink}>{t('regulatoryFrameworkActs')}</Link>
              </li>
            </ul>
          </li>

          <li className={styles.menuItem}>
            <Link href="/contacts" onClick={onClose} className={styles.menuLink}>
              <span>{t('contacts')}</span>
            </Link>
          </li>
        </ul>

        <div className={styles.socialFooter}>
          <MobileHeaderIcons />
        </div>
      </nav>
    </>
  );
};