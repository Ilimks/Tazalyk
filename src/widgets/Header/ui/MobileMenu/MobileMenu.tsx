// widgets/header/ui/MobileMenu.tsx
"use client";

import styles from "./MobileMenu.module.scss";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        onClick={onClose}
      />

      <nav className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li><Link href="/" onClick={onClose}>Главная</Link></li>
          <li><Link href="/about" onClick={onClose}>О нас</Link></li>
          <li><Link href="/services" onClick={onClose}>Услуги</Link></li>
          <li><Link href="/contacts" onClick={onClose}>Контакты</Link></li>
        </ul>
      </nav>
    </>
  );
};