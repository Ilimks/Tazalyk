"use client";
import { Button } from "@/shared/ui/Button";
import styles from "./NewsHomeSectionUp.module.scss";
import mobile from "./NewsHomeSectionUpMobile.module.scss";
import { useRouter } from "next/navigation";

export const NewsHomeSectionUp: React.FC = () => {

  const router = useRouter();

  return (
    <div className={`${styles.newsHomeUp} ${mobile.newsHomeUp}`}>
      <div className={`${styles.newsHomeUp__items} ${mobile.newsHomeUp__items}`}>
        <h2 className={`${styles.newsHomeUp__name} ${mobile.newsHomeUp__name}`}>Новости и События</h2>
        <div className={`${styles.newsHomeUp__line} ${mobile.newsHomeUp__line}`}></div>
      </div>
      <Button 
        className={`${styles.newsHomeUp__btn} ${mobile.newsHomeUp__btn}`} 
        onClick={() => router.push('/news')}
      >
        Все новости
      </Button>
    </div>
  );
};
