"use client";
import { Button } from "@/shared/ui/Button";
import { useRouter } from "next/navigation";
import styles from "./HomeSectionHeader.module.scss";
import mobile from "./HomeSectionHeaderMobile.module.scss";

interface HomeSectionHeaderProps {
    title: string;
    buttonText?: string;
    buttonLink?: string;
    onButtonClick?: () => void;
    className?: string;
}

export const HomeSectionHeader: React.FC<HomeSectionHeaderProps> = ({
    title,
    buttonText,
    buttonLink,
    onButtonClick,
    className = ""
}) => {
    const router = useRouter();

    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick();
        } else if (buttonLink) {
            router.push(buttonLink);
        }
    };

    return (
        <div className={`${styles.sectionHeader} ${mobile.sectionHeader} ${className}`}>
            <div className={`${styles.sectionHeader__items} ${mobile.sectionHeader__items}`}>
                <h2 className={`${styles.sectionHeader__name} ${mobile.sectionHeader__name}`}>{title}</h2>
                <div className={`${styles.sectionHeader__line} ${mobile.sectionHeader__line}`}></div>
            </div>
            {buttonText && (
                <Button 
                    className={`${styles.sectionHeader__btn} ${mobile.sectionHeader__btn}`} 
                    onClick={handleButtonClick}
                >
                    {buttonText}
                </Button>
            )}
        </div>
    );
};