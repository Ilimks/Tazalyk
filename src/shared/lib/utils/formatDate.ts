export interface FormatDateOptions {
  format?: 'full' | 'long' | 'medium' | 'short' | 'time' | 'relative';
  locale?: string;
  timeZone?: string;
}

const monthsKy = [
  'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
];

const monthsKyShort = [
  'янв', 'фев', 'мар', 'апр', 'май', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
];

const weekdaysKy = [
  'жекшемби', 'дүйшөмбү', 'шейшемби', 'шаршемби', 'бейшемби', 'жума', 'ишемби'
];

/**
 * @param date
 * @param options
 * @returns
 */

export function formatDate(
  date: string | number | Date,
  options: FormatDateOptions = {}
): string {
  const {
    format = 'medium',
    locale = 'ru-RU',
    timeZone = 'Asia/Bishkek'
  } = options;

  const dateObj = new Date(date);
  const isKy = locale === 'ky-KG' || locale === 'ky';

  if (isNaN(dateObj.getTime())) {
    console.warn('Некорректная дата:', date);
    return isKy ? 'Туура эмес дата' : 'Некорректная дата';
  }

  switch (format) {
    case 'relative':
      return getRelativeTime(dateObj, locale);
    
    case 'time':
      return formatTime(dateObj, locale, timeZone);
    
    case 'short':
      return formatShort(dateObj);
    
    case 'medium':
      return formatMedium(dateObj, locale, timeZone, isKy);
    
    case 'long':
      return formatLong(dateObj, locale, timeZone, isKy);
    
    case 'full':
      return formatFull(dateObj, locale, timeZone, isKy);
    
    default:
      return formatMedium(dateObj, locale, timeZone, isKy);
  }
}

function getRelativeTime(date: Date, locale: string): string {
  const isKy = locale === 'ky-KG' || locale === 'ky';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (isKy) {
    if (diffDay === 0) {
      if (diffHour === 0) {
        if (diffMin === 0) return 'азыр';
        if (diffMin === 1) return '1 мүнөт мурун';
        if (diffMin < 5) return `${diffMin} мүнөт мурун`;
        if (diffMin < 60) return `${diffMin} мүнөт мурун`;
      }
      if (diffHour === 1) return '1 саат мурун';
      if (diffHour < 5) return `${diffHour} саат мурун`;
      if (diffHour < 24) return `${diffHour} саат мурун`;
    }
    if (diffDay === 1) return 'кечээ';
    if (diffDay < 5) return `${diffDay} күн мурун`;
    if (diffDay < 7) return `${diffDay} күн мурун`;
    return formatShort(date);
  }

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

  if (diffDay === 1) return 'вчера';
  if (diffDay < 5) return `${diffDay} дня назад`;
  if (diffDay < 7) return `${diffDay} дней назад`;

  return formatShort(date);
}

function formatTime(date: Date, locale: string, timeZone: string): string {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone
  });
}

function formatShort(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function formatMedium(date: Date, locale: string, timeZone: string, isKy: boolean): string {
  if (isKy) {
    const day = date.getDate();
    const month = monthsKyShort[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone
  });
}

function formatLong(date: Date, locale: string, timeZone: string, isKy: boolean): string {
  if (isKy) {
    const day = date.getDate();
    const month = monthsKy[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone
  });
}

function formatFull(date: Date, locale: string, timeZone: string, isKy: boolean): string {
  if (isKy) {
    const day = date.getDate();
    const month = monthsKy[date.getMonth()];
    const year = date.getFullYear();
    const weekday = weekdaysKy[date.getDay()];
    return `${day} ${month} ${year}, ${weekday}`;
  }
  
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone
  });
}

export function formatDateRange(
  startDate: string | number | Date,
  endDate: string | number | Date,
  options: Omit<FormatDateOptions, 'format'> = {}
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const { locale = 'ru-RU', timeZone = 'Asia/Bishkek' } = options;
  const isKy = locale === 'ky-KG' || locale === 'ky';

  if (start.toDateString() === end.toDateString()) {
    return formatDate(start, { format: 'long', locale, timeZone });
  }

  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    if (isKy) {
      const month = monthsKy[start.getMonth()];
      const year = start.getFullYear();
      return `${start.getDate()}–${end.getDate()} ${month} ${year}`;
    }
    const monthYear = start.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric',
      timeZone
    });
    return `${start.getDate()}–${end.getDate()} ${monthYear}`;
  }

  if (start.getFullYear() === end.getFullYear()) {
    if (isKy) {
      const startStr = `${start.getDate()} ${monthsKyShort[start.getMonth()]}`;
      const endStr = `${end.getDate()} ${monthsKyShort[end.getMonth()]} ${end.getFullYear()}`;
      return `${startStr}–${endStr}`;
    }
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

  const startStr = formatDate(start, { format: 'short' });
  const endStr = formatDate(end, { format: 'short' });
  return `${startStr}–${endStr}`;
}

export const formatDateSimple = (dateString: string, locale: string = 'ru-RU'): string => {
  return formatDate(dateString, { format: 'long', locale });
};