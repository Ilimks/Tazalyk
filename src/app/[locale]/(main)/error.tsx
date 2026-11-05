'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ErrorState } from '@/shared/ui/ErrorState';

// Показывается, если страница упала при загрузке; шапка и футер остаются
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('ErrorPage');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container" style={{ padding: '40px 0' }}>
      <ErrorState title={t('title')} error={t('description')} onRetry={reset} />
    </main>
  );
}
