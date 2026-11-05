'use client';
import { useEffect } from 'react';

// Корневой layout не перерисовывается при смене языка без перезагрузки страницы,
// поэтому атрибут lang у <html> обновляем на клиенте
export const HtmlLang = ({ locale }: { locale: string }) => {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
};
