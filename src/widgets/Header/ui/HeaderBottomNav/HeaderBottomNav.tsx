'use client'
import Link from "next/link";
import styles from "./HeaderBottomNav.module.scss";
import mobile from "./HeaderBottomNavMobile.module.scss";
import { useState } from "react";
import { useHeaderMenu } from "@/widgets/Header/model/headerMenu";

export const HeaderBottomNav: React.FC = () => {
    const headerMenu = useHeaderMenu();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className={`${styles.header__bottom} ${mobile.header__bottom}`}>
          <div className="container">
            <nav className={`${styles.header__bottom__nav} ${mobile.header__bottom__nav}`}>
              <ul className={`${styles.header__bottom__ul} ${mobile.header__bottom__ul}`}>
    
                {headerMenu.map((item, index) => (
                  <li
                    key={item.title}
                    className={`${styles.header__bottom__li} ${mobile.header__bottom__li}`}
                    onClick={() =>
                      item.dropdown
                        ? setOpenIndex(openIndex === index ? null : index)
                        : null
                    }
                  >
                    {item.href ? (
                      <Link href={item.href}>{item.title}</Link>
                    ) : (
                      item.title
                    )}
    
                    {item.dropdown && openIndex === index && (
                      <div className={`${styles.dropdown} ${mobile.dropdown}`}>
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