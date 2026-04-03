"use client";
import { Button } from "@/shared/ui/Button";
import styles from "./VideosPhotoHomeSectionUp.module.scss";
import mobile from "./VideosPhotoHomeSectionUpMobile.module.scss";

export const VideosPhotoHomeSectionUp: React.FC = () => {
  return (
    <div className={`${styles.videoGalleryUp} ${mobile.videoGalleryUp}`}>
      <div
        className={`${styles.videoGalleryUp__items} ${mobile.videoGalleryUp__items}`}
      >
        <h2 className={`${styles.videoGalleryUp__name} ${mobile.videoGalleryUp__name}`}>
          Видеогалерея и Фотогалереля
        </h2>
        <div
          className={`${styles.videoGalleryUp__line} ${mobile.videoGalleryUp__line}`}
        ></div>
      </div>
      <Button
        className={`${styles.videoGalleryUp__btn} ${mobile.videoGalleryUp__btn}`}
        onClick={() => alert("Все видео")}
      >
        Все видео и фото
      </Button>
    </div>
  );
};