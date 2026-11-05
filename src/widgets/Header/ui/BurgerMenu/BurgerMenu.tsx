"use client";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./BurgerMenu.module.scss";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export const BurgerMenu = ({ isOpen, onClick }: Props) => {
  const t = useTranslations("Common");

  return (
    <button
      aria-label={t('openMenu')}
      aria-expanded={isOpen}
      className={styles.burger}
      onClick={onClick}
    >
      <Menu size={28} aria-hidden />
    </button>
  );
};
