"use client";
import styles from "./BurgerMenu.module.scss";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export const BurgerMenu = ({ isOpen, onClick }: Props) => {
  return (
    <button
      aria-label="Open menu"
      className={styles.burger}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </button>
  );
};