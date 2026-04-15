'use client';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Language.module.scss';

export const Language = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Получаем текущую локаль из URL
  const currentLocale = pathname.split('/')[1] || 'ru';

  const switchLanguage = (newLocale: string) => {
    if (currentLocale === newLocale) return;
    
    // Заменяем локаль в пути
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className={styles.lang}>
      <button 
        className={`${styles.langItem} ${currentLocale === 'ky' ? styles.active : ''}`}
        onClick={() => switchLanguage('ky')}
      >
        Кыр
      </button>
      <span className={styles.divider} />
      <button 
        className={`${styles.langItem} ${currentLocale === 'ru' ? styles.active : ''}`}
        onClick={() => switchLanguage('ru')}
      >
        Рус
      </button>
    </div>
  );
};