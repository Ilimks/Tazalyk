"use client";
import { Headset } from "lucide-react";
import { useTranslations } from "next-intl";
import { Language } from "@/shared/ui/language/Language";
import { HeaderIcons } from "../HeaderIcons/HeaderIcons";
import styles from "./HeaderTop.module.scss";

// Верхняя полоса: приветствие, колл-центр, соцсети и язык.
// На телефоне её нет — язык стоит в основной строке, соцсети в меню.
export const HeaderTop: React.FC = () => {
  const t = useTranslations("Header");
  const tMain = useTranslations("Main");

  return (
    <div className={styles.top}>
      <div className="container">
        <div className={styles.top__box}>
          <p className={styles.top__hello}>
            <b>{t("header__text1")}</b> {t("header__text2")}
          </p>
          <div className={styles.top__right}>
            <a className={styles.top__call} href="tel:1400">
              <Headset size={16} aria-hidden />
              {tMain("MainReceptionCallCenter")} <b>1400</b>
            </a>
            <HeaderIcons />
            <Language />
          </div>
        </div>
      </div>
    </div>
  );
};
