import { Button } from "@/shared/ui/Buttons/Button";
import buttonStyles from "@/shared/ui/Buttons/Button/Button.module.scss";
import { Link } from "@/i18n/navigation";
import styles from "./HomeSectionHeader.module.scss";
import mobile from "./HomeSectionHeaderMobile.module.scss";

interface HomeSectionHeaderProps {
    title: string;
    buttonText?: string;
    // путь без языка, например "/news" — язык подставит Link
    buttonLink?: string;
    onButtonClick?: () => void;
    className?: string;
    // id заголовка, чтобы секция могла сослаться на него через aria-labelledby
    titleId?: string;
}

export const HomeSectionHeader: React.FC<HomeSectionHeaderProps> = ({
    title,
    buttonText,
    buttonLink,
    onButtonClick,
    className = "",
    titleId,
}) => {
    const buttonClassName = `${styles.sectionHeader__btn} ${mobile.sectionHeader__btn}`;

    return (
        <div className={`${styles.sectionHeader} ${mobile.sectionHeader} ${className}`}>
            <div className={`${styles.sectionHeader__items} ${mobile.sectionHeader__items}`}>
                <h2 id={titleId} className={`${styles.sectionHeader__name} ${mobile.sectionHeader__name}`}>{title}</h2>
                <div className={`${styles.sectionHeader__line} ${mobile.sectionHeader__line}`}></div>
            </div>
            {buttonText && buttonLink && !onButtonClick && (
                // настоящая ссылка: её видят поисковики и можно открыть в новой вкладке
                <Link
                    href={buttonLink}
                    className={`${buttonStyles.button} ${styles.sectionHeader__link} ${buttonClassName}`}
                >
                    {buttonText}
                </Link>
            )}
            {buttonText && onButtonClick && (
                <Button className={buttonClassName} onClick={onButtonClick}>
                    {buttonText}
                </Button>
            )}
        </div>
    );
};
