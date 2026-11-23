'use client'
import { ChevronDown } from "lucide-react";
import { Link, usePathname } from '@/i18n/navigation';
import styles from "./HeaderBottomNav.module.scss";
import mobile from "./HeaderBottomNavMobile.module.scss";
import { useEffect, useRef, useState } from "react";
import { useHeaderMenu } from "@/widgets/Header/model/headerMenu";

export const HeaderBottomNav: React.FC = () => {
    const headerMenu = useHeaderMenu();
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);

    // Открытый список запоминается вместе со страницей, на которой его открыли.
    // Шапка при переходе не пересоздаётся, и раньше список оставался открытым
    // на новой странице; теперь на другой странице он считается закрытым.
    const [open, setOpen] = useState<{ index: number; path: string } | null>(null);
    const openIndex = open && open.path === pathname ? open.index : null;

    // раздел, в котором находится посетитель: «/ru/news/5» → «/news»
    const path = pathname.replace(/^\/(ru|ky)(?=\/|$)/, '') || '/';
    const isCurrent = (item: (typeof headerMenu)[number]) => {
        const matches = (href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));
        return item.href ? matches(item.href) : Boolean(item.dropdown?.some((sub) => matches(sub.href)));
    };

    const toggle = (index: number) =>
        setOpen(openIndex === index ? null : { index, path: pathname });

    // клик мимо меню или Esc тоже закрывают список
    useEffect(() => {
        if (openIndex === null) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!navRef.current?.contains(event.target as Node)) setOpen(null);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(null);
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [openIndex]);

    return (
        <div className={`${styles.header__bottom} ${mobile.header__bottom}`}>
          <div className="container">
            <nav ref={navRef} className={`${styles.header__bottom__nav} ${mobile.header__bottom__nav}`}>
              <ul className={`${styles.header__bottom__ul} ${mobile.header__bottom__ul}`}>

                {headerMenu.map((item, index) => (
                  <li
                    key={item.title}
                    className={`${styles.header__bottom__li} ${mobile.header__bottom__li} ${isCurrent(item) ? styles.current : ''} ${openIndex === index ? styles.expanded : ''}`}
                    onClick={() => (item.dropdown ? toggle(index) : setOpen(null))}
                  >
                    {item.href ? (
                      <Link href={item.href}>{item.title}</Link>
                    ) : (
                      <span className={styles.trigger}>
                        {item.title}
                        <ChevronDown size={16} aria-hidden />
                      </span>
                    )}

                    {/* список всегда в разметке: так он может плавно и появляться, и прятаться */}
                    {item.dropdown && (
                      <div
                        className={`${styles.dropdown} ${openIndex === index ? styles.dropdownOpen : ''}`}
                        aria-hidden={openIndex !== index}
                      >
                        <ul>
                          {item.dropdown.map(sub => (
                            <li key={sub.href}>
                              <Link href={sub.href}>{sub.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}

              </ul>
            </nav>
          </div>
        </div>
    );
};
