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
  // tile — главная: на телефоне две карточки в ряд, без описания
  variant?: "compact" | "tile";
  // главная на компьютере: крупная карточка или строка «фото слева»
  layout?: "lead" | "row";
}

export const NewsCard = ({ news, variant, layout }: NewsCardProps) => {
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

  const isTile = variant === "tile";
  const dateLocale = locale === 'ky' ? 'ky-KG' : 'ru-RU';

  return (
    <Link
      href={`/news/${news.id}`}
      className={styles.cardLink}
      data-reveal suppressHydrationWarning
    >
      <article
        className={`${styles.card} ${mobile.card} ${isTile ? styles.tile : ''} ${layout ? styles[layout] : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${styles.card__imageContainer} ${mobile.card__imageContainer}`}>
          <Image
            src={imageUrl}
            alt={title}
            className={`${styles.card__image} ${mobile.card__image} ${isHovered ? styles.card__imageZoomed : ''}`}
            width={600}
            height={400}
            sizes={layout === "lead" ? "(max-width: 1000px) 46vw, 660px" : layout === "row" ? "(max-width: 1000px) 46vw, 210px" : isTile ? "(max-width: 1000px) 46vw, 300px" : "(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 300px"}
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
            {title}
          </h3>
          <p className={`${styles.card__content__description} ${mobile.card__content__description}`}>
            {description}
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
