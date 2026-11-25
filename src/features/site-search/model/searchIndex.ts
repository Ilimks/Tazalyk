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
            ...PAGES.map(({ url, title, sources }): SearchEntry => ({
                id: `page:${url}`,
                type: 'page',
                role: 'page',
                url,
                title: String(pick(ru, title) ?? ''),
                titleKy: String(pick(ky, title) ?? ''),
                text: pageText(ru, sources),
                textKy: pageText(ky, sources),
            })),
            ...STATIC_ENTRIES,
        ])
        .catch((error) => {
            // следующий поиск попробует загрузить ещё раз
            indexPromise = null;
            throw error;
        });
    return indexPromise;
};

interface FoundEntry {
    entry: SearchEntry;
    hit: SearchHit;
}

const SCORE = { exact: 100, titleStart: 80, title: 60, text: 20 } as const;

const titleScore = (titles: string[], query: string): number => {
    const target = normalize(query.trim());
    if (titles.some((title) => normalize(title) === target)) return SCORE.exact;
    if (titles.some((title) => normalize(title).startsWith(target))) return SCORE.titleStart;
    return SCORE.title;
};

// У страницы несколько названий («Новости», «Свежие новости»): оставляем одну строку, по возможности с заголовком страницы.
// Если ближе всего к запросу отдельные записи страницы (например, люди), остаются они
const onePerPage = (found: FoundEntry[]): FoundEntry[] => {
    const groups = new Map<string, FoundEntry[]>();
    found.forEach((item) => {
        // услуги — разные записи, хотя страница у них одна
        const key = item.entry.type === 'page' ? item.entry.url : item.entry.id;
        groups.set(key, [...(groups.get(key) ?? []), item]);
    });

    return [...groups.values()].flatMap((group) => {
        const best = group.reduce((top, item) => (item.hit.score > top.hit.score ? item : top));
        if (best.entry.role === 'item') return group.filter(({ entry }) => entry.role === 'item');
        const page = group.find(({ entry }) => entry.role === 'page') ?? best;
        return [{ entry: page.entry, hit: { ...page.hit, score: best.hit.score } }];
    });
};

export const searchEntries = (entries: SearchEntry[], query: string, locale: string): SearchHit[] => {
    const variants = queryVariants(query);
    if (variants.length === 0) return [];

    const isKy = locale === 'ky';
    const found: FoundEntry[] = [];

    entries.forEach((entry) => {
        const title = isKy ? entry.titleKy : entry.title;
        const inTitle = matchesQuery(normalize(`${entry.title} ${entry.titleKy}`), variants);
        const inText = matchesQuery(normalize(`${entry.text ?? ''} ${entry.textKy ?? ''}`), variants);
        if (!inTitle && !inText) return;

        const localText = (isKy ? entry.textKy : entry.text) ?? '';
        const otherText = (isKy ? entry.text : entry.textKy) ?? '';
        found.push({
            entry,
            hit: {
                key: entry.id,
                type: entry.type,
                title,
                snippet: inTitle ? '' : makeSnippet(localText, variants) || makeSnippet(otherText, variants),
                url: entry.url,
                score: inTitle ? titleScore([entry.title, entry.titleKy], query) : SCORE.text,
            },
        });
    });

    // совпадение в тексте страницы лишнее, если эта страница уже нашлась по названию
    const urlsWithTitle = new Set(found.filter(({ hit }) => hit.score > SCORE.text).map(({ hit }) => hit.url));
    return onePerPage(
        found.filter(({ hit }) => hit.score > SCORE.text || !urlsWithTitle.has(hit.url))
    ).map(({ hit }) => hit);
};
