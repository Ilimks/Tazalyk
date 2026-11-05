import { makeSnippet, matchesQuery, normalize, queryVariants } from '../lib/text';
import { STATIC_ENTRIES } from './staticEntries';
import type { SearchEntry, SearchHit } from './types';

type Messages = Record<string, unknown>;

// Страницы сайта и их тексты в сообщениях. title — путь к заголовку страницы
const PAGES: { url: string; title: string; sources: string[] }[] = [
    { url: '/', title: 'Breadcrumbs.home', sources: ['Main'] },
    { url: '/history', title: 'History.HistoryTitle', sources: ['History'] },
    { url: '/directorate', title: 'Directorate.DirectorateTitle', sources: ['Directorate'] },
    { url: '/structure', title: 'Structure.title', sources: ['Structure'] },
    { url: '/services', title: 'Service.ServiceTitle', sources: ['Service'] },
    { url: '/tariffs', title: 'Tariffs.TariffsTitle', sources: ['Tariffs'] },
    { url: '/attendance', title: 'Attendance.title', sources: ['Attendance'] },
    { url: '/procurement', title: 'Procurement.ProcurementTitle', sources: ['Procurement'] },
    { url: '/contacts', title: 'Contacts.ContactsTitle', sources: ['Contacts'] },
    { url: '/complaints', title: 'Complaints.title', sources: ['Complaints'] },
    { url: '/vacancies', title: 'Vacancies.VacanciesTitle', sources: ['Vacancies'] },
    { url: '/employee', title: 'Employee.title', sources: ['Employee'] },
    { url: '/acts', title: 'Documents.localActsTitle', sources: ['Documents.localActsTitle', 'Documents.localActsDescription'] },
    { url: '/legislation', title: 'Documents.legislationTitle', sources: ['Documents.legislationTitle', 'Documents.legislationDescription'] },
    { url: '/news', title: 'News.NewsTitle', sources: ['News.NewsTitle', 'News.NewsDescription'] },
    { url: '/media', title: 'MediaGallery.title', sources: ['MediaGallery.title', 'MediaGallery.description'] },
    { url: '/shop', title: 'Shop.title', sources: ['Shop.title', 'Shop.description'] },
];

// служебные подписи форм не описывают содержание страницы
const SKIPPED_KEYS = /error|placeholder|required|invalid|submit|loading|retry|aria|button|hint|form|upload/i;

const pick = (messages: Messages, path: string): unknown =>
    path.split('.').reduce<unknown>(
        (value, key) => (value && typeof value === 'object' ? (value as Messages)[key] : undefined),
        messages
    );

const collectText = (value: unknown): string[] => {
    if (typeof value === 'string') {
        // переменные и разметка в сообщениях — не текст
        return [value.replace(/<[^>]+>/g, ' ').replace(/\{[^{}]*\}/g, ' ')];
    }
    if (value && typeof value === 'object') {
        return Object.entries(value)
            .filter(([key]) => !SKIPPED_KEYS.test(key))
            .flatMap(([, nested]) => collectText(nested));
    }
    return [];
};

const pageText = (messages: Messages, sources: string[]) =>
    sources.flatMap((source) => collectText(pick(messages, source))).join(' ');

let indexPromise: Promise<SearchEntry[]> | null = null;

// Тексты обоих языков загружаются при первом поиске, а не вместе с каждой страницей
export const loadSearchIndex = (): Promise<SearchEntry[]> => {
    indexPromise ??= Promise.all([
        import('@/i18n/messages/ru.json'),
        import('@/i18n/messages/ky.json'),
    ])
        .then(([{ default: ru }, { default: ky }]) => [
            ...STATIC_ENTRIES,
            ...PAGES.map(({ url, title, sources }): SearchEntry => ({
                id: `page:${url}`,
                type: 'page',
                url,
                title: String(pick(ru, title) ?? ''),
                titleKy: String(pick(ky, title) ?? ''),
                text: pageText(ru, sources),
                textKy: pageText(ky, sources),
            })),
        ])
        .catch((error) => {
            // следующий поиск попробует загрузить ещё раз
            indexPromise = null;
            throw error;
        });
    return indexPromise;
};

const SCORE = { exact: 100, titleStart: 80, title: 60, text: 20 } as const;

const titleScore = (titles: string[], query: string): number => {
    const target = normalize(query.trim());
    if (titles.some((title) => normalize(title) === target)) return SCORE.exact;
    if (titles.some((title) => normalize(title).startsWith(target))) return SCORE.titleStart;
    return SCORE.title;
};

export const searchEntries = (entries: SearchEntry[], query: string, locale: string): SearchHit[] => {
    const variants = queryVariants(query);
    if (variants.length === 0) return [];

    const isKy = locale === 'ky';
    const hits: SearchHit[] = [];

    entries.forEach((entry) => {
        const title = isKy ? entry.titleKy : entry.title;
        const inTitle = matchesQuery(normalize(`${entry.title} ${entry.titleKy}`), variants);
        const inText = matchesQuery(normalize(`${entry.text ?? ''} ${entry.textKy ?? ''}`), variants);
        if (!inTitle && !inText) return;

        const localText = (isKy ? entry.textKy : entry.text) ?? '';
        const otherText = (isKy ? entry.text : entry.textKy) ?? '';
        hits.push({
            key: entry.id,
            type: entry.type,
            title,
            snippet: inTitle ? '' : makeSnippet(localText, variants) || makeSnippet(otherText, variants),
            url: entry.url,
            score: inTitle ? titleScore([entry.title, entry.titleKy], query) : SCORE.text,
        });
    });

    // совпадение в тексте страницы лишнее, если эта страница уже нашлась по названию
    const urlsWithTitle = new Set(hits.filter((hit) => hit.score > SCORE.text).map((hit) => hit.url));
    const seen = new Set<string>();
    return hits
        .filter((hit) => hit.score > SCORE.text || !urlsWithTitle.has(hit.url))
        .filter((hit) => {
            const key = `${hit.url}|${normalize(hit.title)}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
};
