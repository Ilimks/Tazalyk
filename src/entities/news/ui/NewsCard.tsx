'use client'
import { News } from "../model/types";
import { formatDate } from "@/shared/lib/utils/formatDate";
import styles from "./NewsCard.module.scss";
import mobile from "./NewsCardMobile.module.scss";
import Image from "next/image";
import { ButtonCardNews } from "@/shared/ui/ButtonCardNews";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface NewsCardProps {
  news: News;
  variant?: "compact"; 
}

export const NewsCard = ({ news, variant = "compact" }: NewsCardProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  if (!news) {
    console.error('NewsCard: news is undefined');
    return null;
  }

  const displayDate = news.date || news.created_at;
  const imageUrl = news.image || "/assets/images/placeholder-news.jpg";

  // Функция для обрезания текста
  const truncateText = (text: string, maxLength: number = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Мемоизируем обрезанное описание для оптимизации
  const truncatedDescription = useMemo(() => {
    return truncateText(news.description, 90);
  }, [news.description]);

  // Мемоизируем обрезанный заголовок
  const truncatedTitle = useMemo(() => {
    return truncateText(news.title, 45);
  }, [news.title]);

  return (
    <article 
      className={`${styles.card} ${mobile.card}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/news/${news.id}`)}
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
          {truncatedTitle}
        </h3>
        <p className={`${styles.card__content__description} ${mobile.card__content__description}`}>
          {truncatedDescription}
        </p>
        <ButtonCardNews
          className={`${styles.card__content__btn} ${mobile.card__content__btn} ${isHovered ? styles.card__content__btnHovered : ''}`}
          onClick={() => router.push(`/news/${news.id}`)}
        >
          Подробнее
        </ButtonCardNews>
      </div>
    </article>
  );
};