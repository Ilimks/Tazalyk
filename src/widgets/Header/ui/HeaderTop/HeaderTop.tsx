"use client";
import { Clock, Headset } from "lucide-react";
import { useTranslations } from "next-intl";
import { Language } from "@/shared/ui/language/Language";
import { HeaderIcons } from "../HeaderIcons/HeaderIcons";
import styles from "./HeaderTop.module.scss";

// Верхняя полоса: колл-центр, график работы, соцсети и язык.
// На телефоне её нет — язык стоит в основной строке, соцсети в меню.
export const HeaderTop: React.FC = () => {
  const tFooter = useTranslations("Footer");
  const tMain = useTranslations("Main");

  return (
    <div className={styles.top}>
      <div className="container">
        <div className={styles.top__box}>
          <div className={styles.top__left}>
            <a className={styles.top__call} href="tel:1400">
              <Headset size={18} aria-hidden />
              {tMain("MainReceptionCallCenter")} <b>1400</b>
            </a>
            <p className={styles.top__hours}>
              <Clock size={16} aria-hidden />
              {tFooter("FooterWorkHours")}
            </p>
          </div>
          <div className={styles.top__right}>
            <HeaderIcons />
            <Language />
          </div>
        </div>
      </div>
    </div>
  );
};
