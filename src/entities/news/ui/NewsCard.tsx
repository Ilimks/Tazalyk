'use client'
import { News } from "../model/types";
import { formatDate } from "@/shared/lib/utils/formatDate";
import styles from "./NewsCard.module.scss";
import mobile from "./NewsCardMobile.module.scss";
import Image from "next/image";
import { ButtonCardNews } from "@/shared/ui/ButtonCardNews";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Добавьте этот импорт

interface NewsCardProps {
  news: News;
  variant?: "compact" | "detailed";
}

export const NewsCard = ({ news, variant = "compact" }: NewsCardProps) => {
  const router = useRouter(); // Добавьте эту строку
  const [isHovered, setIsHovered] = useState(false);

  if (!news) {
    console.error('NewsCard: news is undefined');
    return null;
  }

  const displayDate = news.date || news.created_at;
  const imageUrl = news.image || "/assets/images/placeholder-news.jpg";

  return (
    <article 
      className={`${styles.card} ${mobile.card}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.card__imageContainer} ${mobile.card__imageContainer}`}>
        <Image 
          src={imageUrl} 
          alt={news.title} 
          className={`${styles.card__image} ${mobile.card__image} ${isHovered ? styles.card__imageZoomed : ''}`}
          width={297}
          height={224}
        />
      </div>
      <div className={`${styles.card__content} ${mobile.card__content}`}>
        <time className={`${styles.card__content__date} ${mobile.card__content__date}`}>
          {formatDate(displayDate)}
        </time>
        <h3 className={`${styles.card__content__title} ${mobile.card__content__title} ${isHovered ? styles.card__content__titleHovered : ''}`}>
          {news.title}
        </h3>
        {variant === "detailed" && (
          <p className={styles.description}>{news.description}</p>
        )}
        <ButtonCardNews
          className={`${styles.card__content__btn} ${mobile.card__content__btn} ${isHovered ? styles.card__content__btnHovered : ''}`}
          onClick={() => router.push(`/news/${news.id}`)} // Используем router.push
        >
          Подробнее
        </ButtonCardNews>
      </div>
    </article>
  );
};