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

    const [open, setOpen] = useState<{ index: number; path: string } | null>(null);
    const openIndex = open && open.path === pathname ? open.index : null;

    const path = pathname.replace(/^\/(ru|ky)(?=\/|$)/, '') || '/';
    const isCurrent = (item: (typeof headerMenu)[number]) => {
        const matches = (href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));
        return item.href ? matches(item.href) : Boolean(item.dropdown?.some((sub) => matches(sub.href)));
    };

    const toggle = (index: number) =>
        setOpen(openIndex === index ? null : { index, path: pathname });

    useEffect(() => {
        if (openIndex === null) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!navRef.current?.contains(event.target as Node)) setOpen(null);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            if (navRef.current?.contains(document.activeElement)) {
                navRef.current.querySelector<HTMLElement>('[aria-expanded="true"]')?.focus();
            }
            setOpen(null);
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [openIndex]);

    return (
        <div className={`${styles.header__bottom} ${mobile.header__bottom}`} data-snow-ground>
          <div className="container">
            <nav
              ref={navRef}
              className={`${styles.header__bottom__nav} ${mobile.header__bottom__nav}`}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null);
              }}
            >
              <ul className={`${styles.header__bottom__ul} ${mobile.header__bottom__ul}`}>

                {headerMenu.map((item, index) => (
                  <li
                    key={item.title}
                    className={`${styles.header__bottom__li} ${mobile.header__bottom__li} ${isCurrent(item) ? styles.current : ''} ${openIndex === index ? styles.expanded : ''}`}
                  >
                    {item.href ? (
                      <Link href={item.href} aria-current={isCurrent(item) ? 'page' : undefined} onClick={() => setOpen(null)}>{item.title}</Link>
                    ) : (
                      <button
                        type="button"
                        className={styles.trigger}
                        aria-expanded={openIndex === index}
                        aria-controls={`header-menu-${index}`}
                        onClick={() => toggle(index)}
                      >
                        {item.title}
                        <ChevronDown size={16} aria-hidden />
                      </button>
                    )}

                    {item.dropdown && (
                      <div
                        id={`header-menu-${index}`}
                        className={`${styles.dropdown} ${openIndex === index ? styles.dropdownOpen : ''}`}
                        aria-hidden={openIndex !== index}
                      >
                        <ul>
                          {item.dropdown.map(sub => (
                            <li key={sub.href}>
                              <Link href={sub.href} onClick={() => setOpen(null)}>{sub.label}</Link>
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
