import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { EmptyState } from '@/shared/ui/EmptyState';
import buttonStyles from '@/shared/ui/Buttons/Button/Button.module.scss';

// 404 внутри сайта: с шапкой, футером и на языке пользователя
export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <main className="container" style={{ padding: '40px 0' }}>
      <EmptyState title={t('title')} description={t('description')}>
        <Link
          href="/"
          className={buttonStyles.button}
          style={{ display: 'inline-flex', alignItems: 'center', padding: '0 24px' }}
        >
          {t('home')}
        </Link>
      </EmptyState>
    </main>
  );
}
