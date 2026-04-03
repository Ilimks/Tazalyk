/**
 * Опции форматирования даты
 */
export interface FormatDateOptions {
  /** 
   * Формат вывода даты
   * - 'full' - "15 января 2024 г., понедельник"
   * - 'long' - "15 января 2024 г."
   * - 'medium' - "15 янв. 2024 г."
   * - 'short' - "15.01.2024"
   * - 'time' - "14:30"
   * - 'relative' - "2 часа назад", "вчера", "5 дней назад"
   */
  format?: 'full' | 'long' | 'medium' | 'short' | 'time' | 'relative';
  
  /** Локализация (по умолчанию русская) */
  locale?: string;
  
  /** Часовой пояс (например, 'Europe/Moscow') */
  timeZone?: string;
}

/**
 * Форматирование даты для русского языка
 * @param date - Дата (строка, число или объект Date)
 * @param options - Опции форматирования
 * @returns Отформатированная строка с датой
 */
export function formatDate(
  date: string | number | Date,
  options: FormatDateOptions = {}
): string {
  const {
    format = 'medium',
    locale = 'ru-RU',
    timeZone = 'Europe/Moscow'
  } = options;

  // Преобразуем входные данные в объект Date
  const dateObj = new Date(date);
  
  // Проверяем валидность даты
  if (isNaN(dateObj.getTime())) {
    console.warn('Некорректная дата:', date);
    return 'Некорректная дата';
  }

  // Форматируем в зависимости от выбранного формата
  switch (format) {
    case 'relative':
      return getRelativeTime(dateObj, locale);
    
    case 'time':
      return formatTime(dateObj, locale, timeZone);
    
    case 'short':
      return formatShort(dateObj);
    
    case 'medium':
      return formatMedium(dateObj, locale, timeZone);
    
    case 'long':
      return formatLong(dateObj, locale, timeZone);
    
    case 'full':
      return formatFull(dateObj, locale, timeZone);
    
    default:
      return formatMedium(dateObj, locale, timeZone);
  }
}

/**
 * Получение относительного времени ("2 часа назад", "вчера" и т.д.)
 */
function getRelativeTime(date: Date, locale: string): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  // Сегодня (время)
  if (diffDay === 0) {
    if (diffHour === 0) {
      if (diffMin === 0) return 'только что';
      if (diffMin === 1) return 'минуту назад';
      if (diffMin < 5) return `${diffMin} минуты назад`;
      if (diffMin < 60) return `${diffMin} минут назад`;
    }
    if (diffHour === 1) return 'час назад';
    if (diffHour < 5) return `${diffHour} часа назад`;
    if (diffHour < 24) return `${diffHour} часов назад`;
  }

  // Вчера
  if (diffDay === 1) return 'вчера';

  // Позавчера и далее
  if (diffDay < 5) return `${diffDay} дня назад`;
  if (diffDay < 7) return `${diffDay} дней назад`;

  // Больше недели - показываем обычную дату
  return formatShort(date);
}

/**
 * Форматирование времени (14:30)
 */
function formatTime(date: Date, locale: string, timeZone: string): string {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone
  });
}

/**
 * Краткий формат (15.01.2024)
 */
function formatShort(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Средний формат (15 янв. 2024 г.)
 */
function formatMedium(date: Date, locale: string, timeZone: string): string {
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone
  });
}

/**
 * Длинный формат (15 января 2024 г.)
 */
function formatLong(date: Date, locale: string, timeZone: string): string {
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone
  });
}

/**
 * Полный формат (15 января 2024 г., понедельник)
 */
function formatFull(date: Date, locale: string, timeZone: string): string {
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone
  });
}

/**
 * Вспомогательная функция для форматирования интервалов
 * (например, "15–18 января 2024 г.")
 */
export function formatDateRange(
  startDate: string | number | Date,
  endDate: string | number | Date,
  options: Omit<FormatDateOptions, 'format'> = {}
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const { locale = 'ru-RU', timeZone = 'Europe/Moscow' } = options;

  // Если даты одинаковые
  if (start.toDateString() === end.toDateString()) {
    return formatDate(start, { format: 'long', locale, timeZone });
  }

  // Если один месяц и год
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    const monthYear = start.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric',
      timeZone
    });
    return `${start.getDate()}–${end.getDate()} ${monthYear}`;
  }

  // Если один год
  if (start.getFullYear() === end.getFullYear()) {
    const startStr = start.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      timeZone
    });
    const endStr = end.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone
    });
    return `${startStr}–${endStr}`;
  }

  // Разные годы
  const startStr = formatDate(start, { format: 'short' });
  const endStr = formatDate(end, { format: 'short' });
  return `${startStr}–${endStr}`;
}