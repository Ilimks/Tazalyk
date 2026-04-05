// widgets/header/ui/MobileSocialIcons/MobileSocialIcons.tsx
"use client";
import styles from "./MobileHeaderIcons.module.scss";
import Image from "next/image";
import { socialIcons } from "../../model/headerMenu";

interface SocialIcon {
  key: string;
  src: string;
  alt: string;
  link: string;
}

export const MobileHeaderIcons: React.FC = () => {
  return (
    <div className={styles.socialLinks}>
      {socialIcons.map((icon) => (
        <a
          key={icon.key}
          href={icon.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label={icon.alt}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={22}
            height={22}
          />
        </a>
      ))}
    </div>
  );
};