// widgets/header/hooks/useMobileMenu.ts
import { useState, useEffect } from "react";

export const useMobileMenu = (isOpen: boolean, onClose: () => void) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Запрещаем скролл страницы при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return {
    openSubmenu,
    toggleSubmenu
  };
};