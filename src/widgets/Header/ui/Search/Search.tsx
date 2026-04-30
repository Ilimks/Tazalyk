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

const searchData: SearchResult[] = [
  { id: '1', title: 'История предприятия', type: 'page', url: '/history' },
  { id: '2', title: 'История', type: 'page', url: '/history' },

  { id: '3', title: 'Руководство', type: 'page', url: '/directorate' },
  { id: '4', title: 'Директор', type: 'page', url: '/directorate' },
  { id: '5', title: 'Дирекция', type: 'page', url: '/directorate' },

  { id: '6', title: 'Структура и деятельность', type: 'page', url: '/structure' },
  { id: '7', title: 'Организационная структура', type: 'page', url: '/structure' },
  { id: '8', title: 'Деятельность предприятия', type: 'page', url: '/structure' },
  { id: '9', title: 'Вывоз отходов', type: 'page', url: '/structure' },
  { id: '10', title: 'Санитарная очистка', type: 'page', url: '/structure' },
  { id: '11', title: 'Фонтанные комплексы', type: 'page', url: '/structure' },
  { id: '12', title: 'Снос объектов', type: 'page', url: '/structure' },

  { id: '13', title: 'Зона обслуживания', type: 'page', url: '/service' },
  { id: '14', title: 'Зона', type: 'page', url: '/service' },
  { id: '15', title: 'Территория обслуживания', type: 'page', url: '/service' },
  { id: '16', title: 'Территория', type: 'page', url: '/service' },

  { id: '17', title: 'Вакансии', type: 'page', url: '/vacancies' },

  { id: '18', title: 'Тарифы', type: 'page', url: '/tariffs' },
  { id: '19', title: 'Физические лица', type: 'page', url: '/tariffs' },
  { id: '20', title: 'Юридические лица', type: 'page', url: '/tariffs' },
  { id: '21', title: 'Сводная таблица тарифов', type: 'page', url: '/tariffs' },

  { id: '22', title: 'Подать Жалобу', type: 'page', url: '/complaints' },
  { id: '23', title: 'Жалоба', type: 'page', url: '/complaints' },

  { id: '24', title: 'Контакты', type: 'page', url: '/contacts' },
  { id: '25', title: 'Телефон', type: 'page', url: '/contacts' },
  { id: '26', title: 'Социальные сети', type: 'page', url: '/contacts' },
  { id: '27', title: 'Карта', type: 'page', url: '/contacts' },

  { id: '28', title: 'Закупки', type: 'page', url: '/procurement' },
  { id: '29', title: 'Таблица закупок', type: 'page', url: '/procurement' },

  { id: '30', title: 'Законодательство КР', type: 'page', url: '/legislation' },

  { id: '31', title: 'Локальные акты', type: 'page', url: '/acts' },

  { id: '32', title: 'Услуги ассенизатора', type: 'service', url: '/attendance' },
  { id: '33', title: 'Услуги спецтехники', type: 'service', url: '/attendance' },
  { id: '34', title: 'Услуги по вывозу мусора', type: 'service', url: '/attendance' },
  { id: '35', title: 'Услуги по уборке', type: 'service', url: '/attendance' },
  { id: '36', title: 'Аренда оборудования', type: 'service', url: '/attendance' },
  { id: '37', title: 'Установка шатра', type: 'page', url: '/attendance'},
  { id: '38', title: 'Установка подиума', type: 'page', url: '/attendance'},
  { id: '39', title: 'Металлические ограждения (2 метр)', type: 'page', url: '/attendance'},
  { id: '40', title: 'Металлические ограждения (3 метр)', type: 'page', url: '/attendance'},
  { id: '41', title: 'Пластиковые контейнеры', type: 'page', url: '/attendance'},
  { id: '42', title: 'Биотуалеты (от 4 шт)', type: 'page', url: '/attendance'},
  { id: '43', title: 'Биотуалеты (от 10 дней)', type: 'page', url: '/attendance'},
  { id: '44', title: 'Установка МАФ Костер (24 шт флаг)', type: 'page', url: '/attendance'},
  { id: '45', title: 'Установка МАФ Костер (8 шт флаг)', type: 'page', url: '/attendance'},
  { id: '46', title: 'Биотуалет за чертой города (до 30 км)', type: 'page', url: '/attendance'},
  { id: '47', title: 'Ассенизационная машина (8м³) в пределах города', type: 'page', url: '/attendance'},
  { id: '48', title: 'Ассенизационная машина (8м³) за городом до 20 км', type: 'page', url: '/attendance'},
  { id: '49', title: 'Подметалоуборочная машина DONGFENG в городе', type: 'page', url: '/attendance'},
  { id: '50', title: 'Подметалоуборочная машина DONGFENG за городом', type: 'page', url: '/attendance'},
  { id: '51', title: 'Трактор Беларусь-320 (очистка снега/мойка)', type: 'page', url: '/attendance'},
  { id: '52', title: 'Самосвал ХОВО до 7т (мусор без погрузки)', type: 'page', url: '/attendance'},
  { id: '53', title: 'Самосвал ХОВО до 7т (мусор с погрузкой)', type: 'page', url: '/attendance'},
  { id: '54', title: 'Самосвал ГАЗ-53 до 4,5т (без погрузки)', type: 'page', url: '/attendance'},
  { id: '56', title: 'Самосвал ГАЗ-53 до 4,5т (с погрузкой)', type: 'page', url: '/attendance'},
  { id: '57', title: 'Самосвал ЗИЛ-130 до 4,5т (с погрузкой)', type: 'page', url: '/attendance'},
  { id: '58', title: 'Самосвал ХОВО/МАЗ 20т (без погрузки)', type: 'page', url: '/sattendance'},
  { id: '59', title: 'Самосвал ХОВО/МАЗ 20т (с погрузкой)', type: 'page', url: '/attendance'},
  { id: '60', title: 'Самосвал ЗИЛ-130 до 4,5т (без погрузки)', type: 'page', url: '/attendance'},
  { id: '61', title: 'КДМ МАЗ 5912 (подметание) в городе', type: 'page', url: '/attendance',},
  { id: '62', title: 'КДМ МАЗ 5912 (подметание) за городом', type: 'page', url: '/attendance'},
  { id: '63', title: 'Перевозка контейнеров и ограждений', type: 'page', url: '/attendance' },

  { id: '64', title: 'Новости', type: 'page', url: '/news' },
  { id: '65', title: 'Все новости', type: 'page', url: '/news' },
  { id: '66', title: 'Новости и события', type: 'page', url: '/news' },
  { id: '67', title: 'Актуальные новости', type: 'page', url: '/news' },
  { id: '68', title: 'Последние новости', type: 'page', url: '/news' },
  { id: '69', title: 'Новости предприятия', type: 'page', url: '/news' },
  { id: '70', title: 'Свежие новости', type: 'page', url: '/news' },
  { id: '71', title: 'Информация', type: 'page', url: '/news' },

  { id: '72', title: 'Медиа', type: 'page', url: '/media' },
  { id: '73', title: 'Фото', type: 'page', url: '/media' },
  { id: '74', title: 'Видео', type: 'page', url: '/media' },
  { id: '75', title: 'Галерея', type: 'page', url: '/media' },
  { id: '76', title: 'Галерея', type: 'page', url: '/media' },
  { id: '77', title: 'СМИ', type: 'page', url: '/media' },
  { id: '78', title: 'Пресс-релизы', type: 'page', url: '/media' },
  { id: '79', title: 'Фотоотчеты', type: 'page', url: '/media' },
  { id: '80', title: 'Видеоотчеты', type: 'page', url: '/media' },
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
                <span className={styles.suggestionTitle}>{result.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};