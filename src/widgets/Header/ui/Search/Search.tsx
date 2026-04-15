'use client';
import styles from "./Search.module.scss";
import mobile from "./SearchMobile.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

interface SearchResult {
  id: string;
  title: string;
  type: 'news' | 'page' | 'service';
  url: string;
}

interface HeaderInputSearchProps {
  onSearch?: (query: string) => void;
}

// Данные для поиска
const searchData: SearchResult[] = [
  { id: '1', title: 'История предприятия', type: 'page', url: '/history' },
  { id: '2', title: 'Руководство', type: 'page', url: '/directorate' },
  { id: '3', title: 'Структура и деятельность', type: 'page', url: '/structure' },
  { id: '4', title: 'Зона обслуживания', type: 'page', url: '/service-zone' },
  { id: '5', title: 'Итоги работы', type: 'page', url: '/results' },
  { id: '6', title: 'Вакансии', type: 'page', url: '/vacancies' },
  { id: '7', title: 'Тарифы', type: 'page', url: '/tariffs' },
  { id: '8', title: 'Контакты', type: 'page', url: '/contacts' },
  { id: '9', title: 'Закупки', type: 'page', url: '/procurement' },
  { id: '10', title: 'Законодательство КР', type: 'page', url: '/legislation' },
  { id: '11', title: 'Локальные акты', type: 'page', url: '/local-acts' },
  { id: '12', title: 'Новые тарифы на вывоз мусора', type: 'news', url: '/news' },
  { id: '13', title: 'График уборки улиц в праздничные дни', type: 'news', url: '/news' },
  { id: '14', title: 'Модернизация автопарка Тазалык', type: 'news', url: '/news' },
  { id: '15', title: 'Экологическая акция в Бишкеке', type: 'news', url: '/news' },
  { id: '16', title: 'Новый график приема граждан', type: 'news', url: '/news' },
  { id: '17', title: 'Вывоз ТБО', type: 'service', url: '/services' },
  { id: '18', title: 'Уборка улиц', type: 'service', url: '/services' },
  { id: '19', title: 'Вывоз жидких отходов', type: 'service', url: '/services' },
];

export const HeaderInputSearch: React.FC<HeaderInputSearchProps> = ({ onSearch }) => {
  const t = useTranslations("Header");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 6));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  const handleResultClick = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'news': return t('typeNews');
      case 'page': return t('typePage');
      case 'service': return t('typeService');
      default: return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'news': return '#22c55e';
      case 'page': return '#3b82f6';
      case 'service': return '#f59e0b';
      default: return '#64748b';
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <form onSubmit={handleSubmit} className={`${styles.header__search} ${mobile.header__search}`}>
        <input 
          type="text" 
          placeholder={t('header__search')} 
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

      {isOpen && results.length > 0 && (
        <div className={styles.suggestions}>
          <div className={styles.suggestionsList}>
            {results.map((result) => (
              <Link 
                key={result.id} 
                href={result.url} 
                onClick={handleResultClick}
                className={styles.suggestionItem}
              >
                <span 
                  className={styles.suggestionType}
                  style={{ backgroundColor: getTypeColor(result.type) }}
                >
                  {getTypeLabel(result.type)}
                </span>
                <span className={styles.suggestionTitle}>{result.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};