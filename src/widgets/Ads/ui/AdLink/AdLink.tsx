import { ReactNode } from 'react';

interface AdLinkProps {
    href?: string;
    className?: string;
    children: ReactNode;
}

// Ссылка рекламодателя открывается в новой вкладке и помечена как sponsored для поисковиков
export const AdLink: React.FC<AdLinkProps> = ({ href, className, children }) => {
    if (!href) {
        return <div className={className}>{children}</div>;
    }

    return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer sponsored">
            {children}
        </a>
    );
};
