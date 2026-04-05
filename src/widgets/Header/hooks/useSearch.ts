// shared/hooks/useSearch.ts
import { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  title: string;
  type: 'news' | 'page' | 'service';
  url: string; // Полный URL для перехода
}

// Пример данных для поиска
const searchData: SearchResult[] = [
  // Страницы
  { id: '1', title: 'История предприятия', type: 'page', url: '/history' },
  { id: '2', title: 'Руководство', type: 'page', url: '/directorate' },
  { id: '3', title: 'Структура и деятельность', type: 'page', url: '/structure' },
  { id: '4', title: 'Зона обслуживания', type: 'page', url: '/service' },
  { id: '5', title: 'Итоги работы', type: 'page', url: '/results' },
  { id: '6', title: 'Вакансии', type: 'page', url: '/vacancies' },
  { id: '7', title: 'Тарифы', type: 'page', url: '/tariffs' },
  { id: '8', title: 'Контакты', type: 'page', url: '/contacts' },
  { id: '9', title: 'Закупки', type: 'page', url: '/procurement' },
  { id: '10', title: 'Законодательство КР', type: 'page', url: '/legislation' },
  { id: '11', title: 'Локальные акты', type: 'page', url: '/local-acts' },
  
  // Новости (все новости ведут на страницу /news)
  { id: '12', title: 'Новые тарифы на вывоз мусора', type: 'news', url: '/news' },
  { id: '13', title: 'График уборки улиц в праздничные дни', type: 'news', url: '/news' },
  { id: '14', title: 'Модернизация автопарка Тазалык', type: 'news', url: '/news' },
  { id: '15', title: 'Экологическая акция в Бишкеке', type: 'news', url: '/news' },
  { id: '16', title: 'Новый график приема граждан', type: 'news', url: '/news' },
  
  // Услуги
  { id: '17', title: 'Вывоз ТБО', type: 'service', url: '/services' },
  { id: '18', title: 'Уборка улиц', type: 'service', url: '/services' },
  { id: '19', title: 'Вывоз жидких отходов', type: 'service', url: '/services' },
];

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    clearSearch
  };
};