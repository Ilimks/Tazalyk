import styles from "./MobileSearch.module.scss";
import mobile from "./MobileSearchMobile.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "@/widgets/Header/hooks/useSearch";

interface MobileSearchProps {
  onSearch?: (query: string) => void;
  onResultClick?: () => void;
}

export const MobileSearch: React.FC<MobileSearchProps> = ({ 
  onSearch, 
  onResultClick 
}) => {
  const { query, setQuery, results, isOpen, setIsOpen, clearSearch } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  const handleResultClick = () => {
    clearSearch();
    if (onResultClick) onResultClick();
  };

  return (
    <div className={styles.searchWrapper}>
      <form onSubmit={handleSubmit} className={`${styles.header__search} ${mobile.header__search}`}>
        <input 
          type="text" 
          placeholder="Найти на сайте..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        <button type="submit" className={styles.searchButton}>
          <Image
            className={styles.icon}
            src="/assets/icons/search.svg"
            alt="Header Search"
            width={16}
            height={16}
            priority
          />
        </button>
      </form>

      {/* Подсказки */}
      {isOpen && results.length > 0 && (
        <div className={styles.suggestions}>
          <div className={styles.suggestionsHeader}>
            <span>Результаты поиска</span>
            <button onClick={() => setIsOpen(false)} className={styles.closeSuggestions}>
              ✕
            </button>
          </div>
          <ul className={styles.suggestionsList}>
            {results.map((result) => (
              <li key={result.id} className={styles.suggestionItem}>
                <Link 
                  href={result.url} 
                  onClick={handleResultClick}
                  className={styles.suggestionLink}
                >
                  <div className={styles.suggestionContent}>
                    <span className={styles.suggestionTitle}>{result.title}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};