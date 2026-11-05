'use client';
import styles from "./Search.module.scss";
import mobile from "./SearchMobile.module.scss";
import { Search } from "lucide-react";
import { useTranslations } from 'next-intl';
import { SearchSuggestions, useSiteSearch } from "@/features/site-search";

export const HeaderInputSearch: React.FC = () => {
  const t = useTranslations("Header");
  const {
    query, setQuery, hits, visibleHits, hasQuery, isLoading, isEmpty, isOpen, setIsOpen, clearSearch, goToResults, wrapperRef,
  } = useSiteSearch({ limit: 6 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToResults();
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
          <Search className={styles.icon} size={16} aria-hidden />
        </button>
      </form>

      {isOpen && (
        <SearchSuggestions
          hits={visibleHits}
          total={hits.length}
          isLoading={isLoading}
          isEmpty={isEmpty}
          onResultClick={clearSearch}
          onShowAll={goToResults}
        />
      )}
    </div>
  );
};
