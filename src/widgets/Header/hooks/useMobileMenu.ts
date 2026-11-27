import { useState, useEffect, useRef, type KeyboardEvent } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled])';

export const useMobileMenu = (isOpen: boolean, onClose: () => void) => {
  const menuRef = useRef<HTMLElement>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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

  useEffect(() => {
    if (!isOpen) return;
    const menu = menuRef.current;
    const opener = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => menu?.querySelector<HTMLElement>('button')?.focus({ preventScroll: true }), 80);
    return () => {
      clearTimeout(timer);
      if (menu?.contains(document.activeElement)) opener?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !menuRef.current) return;

    const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      .filter((item) => item.checkVisibility?.({ visibilityProperty: true }) ?? item.offsetParent !== null);
    const first = items[0];
    const last = items[items.length - 1];
    if (!first) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return {
    menuRef,
    openSubmenu,
    toggleSubmenu,
    handleKeyDown
  };
};
