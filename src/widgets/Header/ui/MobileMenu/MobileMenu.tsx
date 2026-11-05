"use client";
import { Link } from '@/i18n/navigation';
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
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
  const tCommon = useTranslations("Common");

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
              src="/assets/icons/logo.svg"
              alt="Тазалык"
              width={40}
              height={40}
              priority
            />
          </div>

          <button className={styles.closeButton} onClick={onClose} aria-label={tCommon('closeMenu')}>
            <X size={24} strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        <MobileSearch onResultClick={onClose} />

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
              <ChevronDown size={16} className={`${styles.arrow} ${openSubmenu === "about" ? styles.rotated : ""}`} aria-hidden />
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
                <Link href="/services" onClick={onClose} className={styles.submenuLink}>{t('aboutServiceZone')}</Link>
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
              <ChevronDown size={16} className={`${styles.arrow} ${openSubmenu === "abonents" ? styles.rotated : ""}`} aria-hidden />
            </div>
            <ul className={`${styles.submenu} ${openSubmenu === "abonents" ? styles.submenuOpen : ""}`}>
              <li className={styles.submenuItem}>
                <Link href="/tariffs" onClick={onClose} className={styles.submenuLink}>{t('subscribersTariffs')}</Link>
                <Link href="/complaints" onClick={onClose} className={styles.submenuLink}>{t('subscribersComplaints')}</Link>
                <Link href="/employee" onClick={onClose} className={styles.submenuLink}>{t('subscribersEmployee')}</Link>
              </li>
            </ul>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <div 
              className={styles.submenuTrigger}
              onClick={() => toggleSubmenu("press")}
            >
              <span className={styles.triggerText}>{t('pressCenter')}</span>
              <ChevronDown size={16} className={`${styles.arrow} ${openSubmenu === "press" ? styles.rotated : ""}`} aria-hidden />
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

          <li className={styles.menuItem}>
            <Link href="/attendance" onClick={onClose} className={styles.menuLink}>
              <span>{t('attendance')}</span>
            </Link>
          </li>

          <li className={styles.menuItem}>
            <Link href="/shop" onClick={onClose} className={styles.menuLink}>
              <span>{t('shop')}</span>
            </Link>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <div 
              className={styles.submenuTrigger}
              onClick={() => toggleSubmenu("legal")}
            >
              <span className={styles.triggerText}>{t('regulatoryFramework')}</span>
              <ChevronDown size={16} className={`${styles.arrow} ${openSubmenu === "legal" ? styles.rotated : ""}`} aria-hidden />
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