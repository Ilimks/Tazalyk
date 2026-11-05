import styles from "./MobileSearch.module.scss";
import mobile from "./MobileSearchMobile.module.scss";
import { Search } from "lucide-react";
import { useTranslations } from 'next-intl';
import { SearchSuggestions, useSiteSearch } from "@/features/site-search";

interface MobileSearchProps {
  // вызывается при переходе к результату: меню нужно закрыть
  onResultClick?: () => void;
}

export const MobileSearch: React.FC<MobileSearchProps> = ({ onResultClick }) => {
  const {
    query, setQuery, hits, visibleHits, hasQuery, isLoading, isEmpty, isOpen, setIsOpen, clearSearch, goToResults, wrapperRef,
  } = useSiteSearch({ limit: 8 });
  const t = useTranslations("HeaderMenu");

  const showAll = () => {
    goToResults();
    onResultClick?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasQuery) showAll();
  };

  const handleResultClick = () => {
    clearSearch();
    onResultClick?.();
  };

  return (
    <div ref={wrapperRef} className={styles.searchWrapper}>
      <form onSubmit={handleSubmit} className={`${styles.header__search} ${mobile.header__search}`}>
        <input
          type="text"
          placeholder={t('header__search')}
          aria-label={t('header__search')}
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => hasQuery && setIsOpen(true)}
        />
        <button type="submit" className={styles.searchButton} aria-label={t('header__search')}>
          <Search size={16} aria-hidden />
        </button>
      </form>

      {isOpen && (
        <SearchSuggestions
          hits={visibleHits}
          total={hits.length}
          isLoading={isLoading}
          isEmpty={isEmpty}
          onResultClick={handleResultClick}
          onShowAll={showAll}
        />
      )}
    </div>
  );
};
