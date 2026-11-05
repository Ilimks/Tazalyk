'use client'
import { News } from "../model/types";
import { getNewsTitle, getNewsDescription, getNewsDate } from "../lib/localize";
import { formatDate } from "@/shared/lib/utils/formatDate";
import { useLocale, useTranslations } from 'next-intl';
import { Calendar } from "lucide-react";
import styles from "./NewsCard.module.scss";
import mobile from "./NewsCardMobile.module.scss";
import Image from "next/image";
import { ButtonCardNews } from "@/shared/ui/Buttons/ButtonCardNews";
import { useState } from "react";
import { Link } from '@/i18n/navigation';

interface NewsCardProps {
  news: News;
  variant?: "compact";
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const NewsCard = ({ news }: NewsCardProps) => {
  const locale = useLocale();
  const t = useTranslations('News');
  const [isHovered, setIsHovered] = useState(false);

  if (!news) {
    return null;
  }

  const title = getNewsTitle(news, locale);
  const description = getNewsDescription(news, locale);
  const displayDate = getNewsDate(news);
  const imageUrl = news.image || "/assets/images/placeholder-news.svg";

  const dateLocale = locale === 'ky' ? 'ky-KG' : 'ru-RU';

  return (
    <Link
      href={`/news/${news.id}`}
      className={styles.cardLink}
    >
      <article
        className={`${styles.card} ${mobile.card}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${styles.card__imageContainer} ${mobile.card__imageContainer}`}>
          <Image
            src={imageUrl}
            alt={title}
            className={`${styles.card__image} ${mobile.card__image} ${isHovered ? styles.card__imageZoomed : ''}`}
            width={297}
            height={224}
            priority={false}
          />
        </div>
        <div className={`${styles.card__content} ${mobile.card__content}`}>
          <time
            className={`${styles.card__content__date} ${mobile.card__content__date}`}
            dateTime={displayDate}
          >
            <Calendar size={14} aria-hidden />
            {formatDate(displayDate, { format: 'long', locale: dateLocale })}
          </time>
          <h3 className={`${styles.card__content__title} ${mobile.card__content__title} ${isHovered ? styles.card__content__titleHovered : ''}`}>
            {truncateText(title, 45)}
          </h3>
          <p className={`${styles.card__content__description} ${mobile.card__content__description}`}>
            {truncateText(description, 90)}
          </p>
          <ButtonCardNews
            className={`${styles.card__content__btn} ${mobile.card__content__btn} ${isHovered ? styles.card__content__btnHovered : ''}`}
            tabIndex={-1}
          >
            {t('NewsMore')}
          </ButtonCardNews>
        </div>
      </article>
    </Link>
  );
};
