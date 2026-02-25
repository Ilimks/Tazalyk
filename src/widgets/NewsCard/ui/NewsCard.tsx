'use client'
import { News } from "../model/types";
import { formatDate } from "@/shared/lib/formatDate/formatDate";
import styles from "./NewsCard.module.scss";
import mobile from "./NewsCardMobile.module.scss";
import Image from "next/image";
import { ButtonCardNews } from "@/shared/ui/ButtonCardNews";
import { useState } from "react";

// interface NewsCardProps {
//   news: News;
//   variant?: "compact" | "detailed";
// }

// export function NewsCard({ news, variant = "compact" }: NewsCardProps) {

//   return (
//     // <article className={`${styles.card} ${mobile.card}`}>
//     //   <Image src={news.image} alt={news.title} className={styles.image} />
//     //   <div className={styles.content}>
//     //     <time className={styles.date}>{formatDate(news.publishedAt)}</time>
//     //     <h3 className={styles.title}>{news.title}</h3>

//     //     {variant === "detailed" && (
//     //       <p className={styles.description}>{news.description}</p>
//     //     )}

//     //     <Button href={`/news/${news.id}`} variant="outline" size="sm">
//     //       Читать далее
//     //     </Button>
//     //   </div>
//     // </article>
//   );
// }

export const NewsCard: React.FC = () => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <article 
            className={`${styles.card} ${mobile.card}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`${styles.card__imageContainer} ${mobile.card__imageContainer}`}>
                <Image 
                   src="/assets/images/NewsPhoto.jpg" 
                   alt="фото" 
                   className={`${styles.card__image} ${mobile.card__image} ${isHovered ? styles.card__imageZoomed : ''}`}
                   width={297}
                   height={224}
                />
            </div>
            <div className={`${styles.card__content} ${mobile.card__content}`}>
                <time className={`${styles.card__content__date} ${mobile.card__content__date}`}>
                    25.12.2023
                </time>
                <h3 className={`${styles.card__content__title} ${mobile.card__content__title} ${isHovered ? styles.card__content__titleHovered : ''}`}>
                    График вывоза мусора в праздничные дни
                </h3>
                <ButtonCardNews
                  className={`${styles.card__content__btn} ${mobile.card__content__btn} ${isHovered ? styles.card__content__btnHovered : ''}`}
                  onClick={() => alert("Кнопка нажата!")}
                >
                  Подробнее
                </ButtonCardNews>
            </div>
        </article>
    )
}
