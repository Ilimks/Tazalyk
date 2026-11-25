"use client";
import { Link } from '@/i18n/navigation';
import Image from "next/image";
import { ChevronDown, Headset, X } from "lucide-react";
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
  const { menuRef, openSubmenu, toggleSubmenu, handleKeyDown } = useMobileMenu(isOpen, onClose);
  const t = useTranslations("HeaderMenu");
  const tCommon = useTranslations("Common");
  const tMain = useTranslations("Main");

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        onClick={onClose}
      />

      <nav
        ref={menuRef}
        className={`${styles.menu} ${isOpen ? styles.open : ""}`}
        aria-label={t('menuLabel')}
        aria-hidden={!isOpen}
        onKeyDown={handleKeyDown}
      >
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

        <div className={styles.search}>
          <MobileSearch onResultClick={onClose} />
        </div>

        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/" onClick={onClose} className={styles.menuLink}>
              <span>{t('home')}</span>
            </Link>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <button
              type="button"
              className={styles.submenuTrigger}
              aria-expanded={openSubmenu === "about"}
              aria-controls="mobile-menu-about"
              onClick={() => toggleSubmenu("about")}
            >
              <span className={styles.triggerText}>{t('about')}</span>
              <ChevronDown size={16} className={`${styles.arrow} ${openSubmenu === "about" ? styles.rotated : ""}`} aria-hidden />
            </button>
            <div id="mobile-menu-about" className={`${styles.submenu} ${openSubmenu === "about" ? styles.submenuOpen : ""}`}>
              <ul className={styles.submenuList}>
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
            </div>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <button
              type="button"
              className={styles.submenuTrigger}
              aria-expanded={openSubmenu === "abonents"}
              aria-controls="mobile-menu-abonents"
              onClick={() => toggleSubmenu("abonents")}
            >
              <span className={styles.triggerText}>{t('subscribers')}</span>
              <ChevronDown size={16} className={`${styles.arrow} ${openSubmenu === "abonents" ? styles.rotated : ""}`} aria-hidden />
            </button>
            <div id="mobile-menu-abonents" className={`${styles.submenu} ${openSubmenu === "abonents" ? styles.submenuOpen : ""}`}>
              <ul className={styles.submenuList}>
                <li className={styles.submenuItem}>
                  <Link href="/tariffs" onClick={onClose} className={styles.submenuLink}>{t('subscribersTariffs')}</Link>
                  <Link href="/attendance" onClick={onClose} className={styles.submenuLink}>{t('subscribersServices')}</Link>
                  <Link href="/complaints" onClick={onClose} className={styles.submenuLink}>{t('subscribersComplaints')}</Link>
                  <Link href="/employee" onClick={onClose} className={styles.submenuLink}>{t('subscribersEmployee')}</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <button
              type="button"
              className={styles.submenuTrigger}
              aria-expanded={openSubmenu === "press"}
              aria-controls="mobile-menu-press"
              onClick={() => toggleSubmenu("press")}
            >
              <span className={styles.triggerText}>{t('pressCenter')}</span>
              <ChevronDown size={16} className={`${styles.arrow} ${openSubmenu === "press" ? styles.rotated : ""}`} aria-hidden />
            </button>
            <div id="mobile-menu-press" className={`${styles.submenu} ${openSubmenu === "press" ? styles.submenuOpen : ""}`}>
              <ul className={styles.submenuList}>
                <li className={styles.submenuItem}>
                  <Link href="/news" onClick={onClose} className={styles.submenuLink}>{t('pressCenterNews')}</Link>
                </li>
                <li className={styles.submenuItem}>
                  <Link href="/media" onClick={onClose} className={styles.submenuLink}>{t('pressCenterMedia')}</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className={styles.menuItem}>
            <Link href="/procurement" onClick={onClose} className={styles.menuLink}>
              <span>{t('procurement')}</span>
            </Link>
          </li>

          <li className={styles.menuItem}>
            <Link href="/shop" onClick={onClose} className={styles.menuLink}>
              <span>{t('shop')}</span>
            </Link>
          </li>

          <li className={`${styles.menuItem} ${styles.hasSubmenu}`}>
            <button
              type="button"
              className={styles.submenuTrigger}
              aria-expanded={openSubmenu === "legal"}
              aria-controls="mobile-menu-legal"
              onClick={() => toggleSubmenu("legal")}
            >
              <span className={styles.triggerText}>{t('regulatoryFramework')}</span>
              <ChevronDown size={16} className={`${styles.arrow} ${openSubmenu === "legal" ? styles.rotated : ""}`} aria-hidden />
            </button>
            <div id="mobile-menu-legal" className={`${styles.submenu} ${openSubmenu === "legal" ? styles.submenuOpen : ""}`}>
              <ul className={styles.submenuList}>
                <li className={styles.submenuItem}>
                  <Link href="/legislation" onClick={onClose} className={styles.submenuLink}>{t('regulatoryFrameworkLegislation')}</Link>
                </li>
                <li className={styles.submenuItem}>
                  <Link href="/acts" onClick={onClose} className={styles.submenuLink}>{t('regulatoryFrameworkActs')}</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className={styles.menuItem}>
            <Link href="/contacts" onClick={onClose} className={styles.menuLink}>
              <span>{t('contacts')}</span>
            </Link>
          </li>
        </ul>

        <div className={styles.socialFooter}>
          {/* верхней полосы с номером на телефоне нет */}
          <a className={styles.call} href="tel:1400">
            <Headset size={20} aria-hidden />
            <span>{tMain('MainReceptionCallCenter')}</span>
            <b>1400</b>
          </a>
          <MobileHeaderIcons />
        </div>
      </nav>
    </>
  );
};