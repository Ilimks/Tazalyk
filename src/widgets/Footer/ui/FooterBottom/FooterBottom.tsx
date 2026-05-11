import styles from "./FooterBottom.module.scss";
import mobile from "./FooterBottomMobile.module.scss";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import Link from "next/link";

export const FooterBottom: React.FC = () => {
    const t = useTranslations("Footer");

    const footerIcons = [
        { 
            icon: "/assets/icons/instFooter.svg", 
            alt: "Instagram",
            link: "https://www.instagram.com/mp_tazalyk_bishkek?igsh=MW51dDdvY2tyaHJxYg==",
            target: "_blank"
        },
        { 
            icon: "/assets/icons/facebookFooter.svg", 
            alt: "Facebook",
            link: "https://www.facebook.com/share/18aptKGFMg/",
            target: "_blank"
        },
        { 
            icon: "/assets/icons/youtubeFooter.svg", 
            alt: "YouTube",
            link: "https://youtube.com",
            target: "_blank"
        },
    ];

    return (
        <div className={`${styles.footer__bottom} ${mobile.footer__bottom}`}>
            <p className={`${styles.footer__bottom__text} ${mobile.footer__bottom__text}`}>
                {t('FooterProtected')}
            </p>

            <div className={`${styles.footer__bottom__icons} ${mobile.footer__bottom__icons}`}>
                {footerIcons.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        target={item.target}
                        rel="noopener noreferrer"
                        className={styles.footer__bottom__icon}
                    >
                        <Image
                            src={item.icon}
                            alt={item.alt}
                            width={24}
                            height={24}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};