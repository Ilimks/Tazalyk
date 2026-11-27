'use client';
import { useEffect } from 'react';

export const HtmlLang = ({ locale }: { locale: string }) => {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
};
