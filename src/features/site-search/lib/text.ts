// Правила запроса: те же, что на сервере в backend/api/search.py
const KYRGYZ_LETTERS: Record<string, string> = { ё: 'е', ө: 'о', ү: 'у', ң: 'н' };
const LATIN_KEYS = "`qwertyuiop[]asdfghjkl;'zxcvbnm,.";
const RUSSIAN_KEYS = 'ёйцукенгшщзхъфывапролджэячсмитьбю';
const WORD_CHARS = 'а-яa-z0-9';
const MAX_TOKENS = 6;
const SNIPPET_LENGTH = 140;
const SNIPPET_LEAD = 40;

export const MIN_QUERY_LENGTH = 2;

// Длина строки не меняется: на этом держится поиск отрывка
export const normalize = (text: string): string =>
    text.toLowerCase().replace(/[ёөүң]/g, (letter) => KYRGYZ_LETTERS[letter]);

// Основа слова: окончания в запросе и в тексте могут отличаться
const stem = (token: string): string => {
    const { length } = token;
    if (/^\d+$/.test(token) || length <= 4) return token;
    if (length === 5) return token.slice(0, -1);
    if (length <= 7) return token.slice(0, -2);
    return token.slice(0, Math.round(length * 0.65));
};

const fromLatinLayout = (text: string): string =>
    text.replace(/./g, (char) => {
        const index = LATIN_KEYS.indexOf(char);
        return index >= 0 ? RUSSIAN_KEYS[index] : char;
    });

// Варианты запроса в виде списков основ: сам запрос и, если он набран латиницей, он же в русской раскладке
export const queryVariants = (query: string): string[][] => {
    const text = normalize(query);
    const variants = [text];
    if (/[a-z]/.test(text) && !/[а-я]/.test(text)) {
        variants.push(normalize(fromLatinLayout(text)));
    }

    return variants
        .map((variant) => (variant.match(new RegExp(`[${WORD_CHARS}]+`, 'g')) ?? []).slice(0, MAX_TOKENS).map(stem))
        .filter((stems) => stems.length > 0);
};

const wordStart = (word: string) => new RegExp(`(?:^|[^${WORD_CHARS}])(${word})`);

// Подходит любой вариант запроса; внутри варианта должны найтись все слова, с начала слова
export const matchesQuery = (normalizedText: string, variants: string[][]): boolean =>
    variants.some((stems) => stems.every((word) => wordStart(word).test(normalizedText)));

// Отрывок вокруг найденного слова; пустая строка, если слова в этом тексте нет
export const makeSnippet = (text: string, variants: string[][]): string => {
    const flat = text.split(/\s+/).join(' ').trim();
    const hay = normalize(flat);
    const found = variants
        .flat()
        .map((word) => {
            const match = wordStart(word).exec(hay);
            return match ? match.index + match[0].length - match[1].length : -1;
        })
        .filter((position) => position >= 0);
    if (found.length === 0) return '';

    let start = Math.max(Math.min(...found) - SNIPPET_LEAD, 0);
    // отрывок начинается с целого слова
    if (start > 0) start = flat.indexOf(' ', start) + 1;
    const end = start + SNIPPET_LENGTH;
    return `${start > 0 ? '…' : ''}${flat.slice(start, end).trimEnd()}${end < flat.length ? '…' : ''}`;
};
