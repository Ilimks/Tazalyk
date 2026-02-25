import styles from "./FooterBottom.module.scss";
import mobile from "./FooterBottomMobile.module.scss";
import Image from "next/image";

export const FooterBottom: React.FC = () => {

    const footerIcons = [
        { icon: "/assets/icons/instFooter.svg", alt: "Instagram" },
        { icon: "/assets/icons/facebookFooter.svg", alt: "Facebook" },
        { icon: "/assets/icons/youtubeFooter.svg", alt: "YouTube" },
    ];

    return (
        <div className={`${styles.footer__bottom} ${mobile.footer__bottom}`}>
            <p className={`${styles.footer__bottom__text} ${mobile.footer__bottom__text}`}>
                © 2026 МП "Тазалык". Все права защищены.
            </p>

            <div className={`${styles.footer__bottom__icons} ${mobile.footer__bottom__icons}`}>
                {footerIcons.map((item, index) => (
                    <div
                        key={index}
                        className={styles.footer__bottom__icon}
                    >
                        <Image
                            src={item.icon}
                            alt={item.alt}
                            width={24}
                            height={24}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
