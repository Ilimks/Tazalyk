import fs from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const NEXT_BIN = require.resolve('next/dist/bin/next');
const PATCH_SCRIPT = path.join(ROOT, 'scripts', 'patch-next-image.mjs');
const PAGES_DIR = path.join(ROOT, 'src', 'app', '[locale]', '(main)');
const ROUTING_FILE = path.join(ROOT, 'src', 'i18n', 'routing.ts');
const MESSAGES_DIR = path.join(ROOT, 'src', 'i18n', 'messages');
const BUILD_ID_FILE = path.join(ROOT, '.next', 'BUILD_ID');
const BUILD_MARK_FILE = path.join(ROOT, '.next', 'smoke-build.json');
const FETCH_CACHE_DIR = path.join(ROOT, '.next', 'cache', 'fetch-cache');
const ENV_FILES = ['.env', '.env.local', '.env.production', '.env.production.local'];

const HOST = '127.0.0.1';
const API_PREFIX = '/api';
const RESERVED_PORTS = new Set([80, 3000, 5432, 8000, 8090]);
const BUILD_TIMEOUT_MS = 20 * 60 * 1000;
const START_TIMEOUT_MS = 90 * 1000;
const REQUEST_TIMEOUT_MS = 60 * 1000;
const STOP_TIMEOUT_MS = 10 * 1000;
const RETRY_MS = 250;
const LOG_SETTLE_MS = 100;
const MAX_LOG_LINES = 15;
const TIMED_OUT = Symbol('timed-out');

const MISSING_PAGE = 'smoke-no-such-page';
const MISSING_NEWS_ID = '00000000-0000-4000-8000-000000000000';
const NEXT_ERROR_TEXTS = ['Application error', 'Internal Server Error'];
const ALLOWED_DIGESTS = new Set(['BAILOUT_TO_CLIENT_SIDE_RENDERING']);
const ERROR_SHELL_ID = '__next_error__';
const BROKEN_NEWS_ID = 'not-a-news-id';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36 TazalykSmoke/1.0';

const SMOKE_NEWS = {
    id: '5f0c3e4a-8b1d-4c2e-9a7f-3d6b2e1c0a94',
    title_ru: 'Проверочная новость',
    title_ky: 'Текшерүү жаңылыгы',
    description_ru: 'Первый абзац проверочной новости.\nВторой абзац проверочной новости.',
    description_ky: 'Текшерүү жаңылыгынын биринчи абзацы.\nТекшерүү жаңылыгынын экинчи абзацы.',
    date: '2026-11-20',
    created_at: '2026-11-20T09:00:00+06:00',
    updated_at: '2026-11-20T09:00:00+06:00',
};

const EMPTY_PAGE = { count: 0, next: null, previous: null, results: [] };

const LIST_ENDPOINTS = new Set([
    '/news/',
    '/photos/',
    '/videos/',
    '/procurements/',
    '/legislation/',
    '/local-acts/',
    '/vacancies/',
    '/shop/products/',
]);

const SINGLE_ENDPOINTS = {
    '/site-settings/': (data) => data.siteSettings,
    '/shop/products/filters/': (data) => data.productFilters,
    '/search/': () => ({ results: [] }),
};

const DYNAMIC_PAGES = {
    'news/[id]': {
        path: SMOKE_NEWS.id,
        title: (messages, locale) =>
            `${(locale === 'ky' && SMOKE_NEWS.title_ky) || SMOKE_NEWS.title_ru} | ${messages.Metadata.siteName}`,
    },
};

class SmokeError extends Error {}

const resources = { api: null, processes: new Set() };

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const withTimeout = (promise, ms) => {
    let timer;
    const timeout = new Promise((resolve) => {
        timer = setTimeout(() => resolve(TIMED_OUT), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

const createApiData = (origin) => ({
    news: { ...SMOKE_NEWS, image: `${origin}/media/news/smoke.jpg` },
    siteSettings: { winter_effects: true, updated_at: SMOKE_NEWS.updated_at },
    productFilters: { volumes: [], materials: [], price: { min: null, max: null } },
});

const reply = (status, body, known = true) => ({ status, body, known });

const answerApi = (method, url, data) => {
    if (method !== 'GET' && method !== 'HEAD') {
        return reply(405, { detail: `Method "${method}" not allowed.` }, false);
    }
    if (!url.pathname.startsWith(`${API_PREFIX}/`)) return reply(404, { detail: 'Not found.' }, false);

    const endpoint = url.pathname.slice(API_PREFIX.length).replace(/\/?$/, '/');
    if (LIST_ENDPOINTS.has(endpoint)) {
        const page = url.searchParams.get('page') || '1';
        return page === '1' ? reply(200, EMPTY_PAGE) : reply(404, { detail: 'Invalid page.' });
    }
    if (SINGLE_ENDPOINTS[endpoint]) return reply(200, SINGLE_ENDPOINTS[endpoint](data));

    const newsId = endpoint.match(/^\/news\/([^/]+)\/$/)?.[1];
    if (newsId) {
        return newsId === data.news.id
            ? reply(200, data.news)
            : reply(404, { detail: 'No News matches the given query.' });
    }
    return reply(404, { detail: 'Not found.' }, false);
};

const listenOnce = (server, port) =>
    new Promise((resolve, reject) => {
        const onError = (error) => {
            server.off('listening', onListening);
            reject(error);
        };
        const onListening = () => {
            server.off('error', onError);
            resolve(server.address().port);
        };
        server.once('error', onError);
        server.once('listening', onListening);
        server.listen(port, HOST);
    });

const closeServer = (server) =>
    new Promise((resolve) => {
        server.closeAllConnections?.();
        server.close(() => resolve());
    });

const listenOnFreePort = async (server) => {
    for (let attempt = 0; attempt < 10; attempt += 1) {
        const port = await listenOnce(server, 0);
        if (!RESERVED_PORTS.has(port)) return port;
        await closeServer(server);
    }
    throw new SmokeError('Не удалось найти свободный порт.');
};

const findFreePort = async () => {
    const server = net.createServer();
    const port = await listenOnFreePort(server);
    await closeServer(server);
    return port;
};

const startFakeApi = async (port) => {
    const requests = [];
    let data = null;
    const server = http.createServer((request, response) => {
        let result;
        let pathname = request.url;
        try {
            const url = new URL(request.url, `http://${HOST}`);
            pathname = url.pathname;
            result = answerApi(request.method, url, data);
        } catch (error) {
            result = reply(500, { detail: String(error) }, false);
        }
        requests.push({ method: request.method, url: request.url, pathname, status: result.status, known: result.known });
        const payload = JSON.stringify(result.body);
        response.writeHead(result.status, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
        });
        response.end(request.method === 'HEAD' ? undefined : payload);
    });

    let actualPort;
    try {
        actualPort = port ? await listenOnce(server, port) : await listenOnFreePort(server);
    } catch (error) {
        throw new SmokeError(`Поддельный API не смог занять порт ${port || ''}: ${error.message}`);
    }
    const origin = `http://${HOST}:${actualPort}`;
    data = createApiData(origin);
    return { url: `${origin}${API_PREFIX}`, requests, close: () => closeServer(server) };
};

const envFileKeys = () => {
    const keys = new Set();
    for (const name of ENV_FILES) {
        const file = path.join(ROOT, name);
        if (!fs.existsSync(file)) continue;
        const text = fs.readFileSync(file, 'utf8');
        for (const [, key] of text.matchAll(/^\s*(?:export\s+)?([\w.-]+)\s*(?:=|:\s)/gm)) keys.add(key);
    }
    return keys;
};

const createSiteEnv = (apiUrl) => {
    const env = { ...process.env };
    for (const key of envFileKeys()) env[key] = '';
    return Object.assign(env, {
        NODE_ENV: 'production',
        NEXT_TELEMETRY_DISABLED: '1',
        NEXT_PUBLIC_API_URL: apiUrl,
        NEXT_PUBLIC_API_TIMEOUT: '10000',
        NEXT_PUBLIC_SITE_URL: '',
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: 'smoke-test-not-a-real-key',
        RECAPTCHA_SECRET_KEY: '',
        COMPLAINTS_API_URL: '',
        COMPLAINTS_INTAKE_TOKEN: '',
        SMTP_HOST: '',
        SMTP_PORT: '',
        SMTP_USER: '',
        SMTP_PASSWORD: '',
        ADMIN_EMAIL: '',
        TRUST_PROXY: '',
    });
};

const startProcess = (args, env, capture) => {
    const child = spawn(process.execPath, args, {
        cwd: ROOT,
        env,
        stdio: capture ? ['ignore', 'pipe', 'pipe'] : ['ignore', 'inherit', 'inherit'],
        windowsHide: true,
        detached: process.platform !== 'win32',
    });
    const exited = new Promise((resolve) => {
        child.once('error', (error) => resolve({ code: null, signal: null, error }));
        child.once('exit', (code, signal) => resolve({ code, signal }));
    });
    const proc = { child, exited };
    resources.processes.add(proc);
    exited.then(() => resources.processes.delete(proc));
    return proc;
};

const isRunning = ({ child }) => child.pid !== undefined && child.exitCode === null && child.signalCode === null;

const killTree = (pid, signal) => {
    if (process.platform === 'win32') {
        spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true });
        return;
    }
    for (const target of [-pid, pid]) {
        try {
            process.kill(target, signal);
            return;
        } catch {
            continue;
        }
    }
};

const stopProcess = async (proc) => {
    if (!isRunning(proc)) return;
    killTree(proc.child.pid, 'SIGTERM');
    if ((await withTimeout(proc.exited, STOP_TIMEOUT_MS)) === TIMED_OUT) {
        killTree(proc.child.pid, 'SIGKILL');
        await withTimeout(proc.exited, STOP_TIMEOUT_MS);
    }
};

const cleanup = async () => {
    await Promise.all([...resources.processes].map(stopProcess));
    if (resources.api) {
        const api = resources.api;
        resources.api = null;
        await api.close();
    }
};

const captureLines = (stream, name, sink) => {
    let rest = '';
    stream.setEncoding('utf8');
    stream.on('data', (chunk) => {
        const lines = (rest + chunk).split(/\r?\n/);
        rest = lines.pop();
        for (const line of lines) if (line.trim()) sink.push({ stream: name, text: line });
    });
    stream.on('end', () => {
        if (rest.trim()) sink.push({ stream: name, text: rest });
    });
};

const httpGet = (url) =>
    new Promise((resolve, reject) => {
        const request = http.get(url, { agent: false, headers: { 'User-Agent': USER_AGENT, Accept: 'text/html' } }, (response) => {
            const chunks = [];
            response.on('data', (chunk) => chunks.push(chunk));
            response.on('error', reject);
            response.on('end', () =>
                resolve({
                    status: response.statusCode,
                    headers: response.headers,
                    body: Buffer.concat(chunks).toString('utf8'),
                })
            );
        });
        request.setTimeout(REQUEST_TIMEOUT_MS, () =>
            request.destroy(new Error(`нет ответа за ${REQUEST_TIMEOUT_MS / 1000} с`))
        );
        request.on('error', reject);
    });

const readLocales = () => {
    const source = fs.readFileSync(ROUTING_FILE, 'utf8');
    const list = source.match(/locales:\s*\[([^\]]*)\]/)?.[1];
    const defaultLocale = source.match(/defaultLocale:\s*["']([^"']+)["']/)?.[1];
    const locales = list ? [...list.matchAll(/["']([^"']+)["']/g)].map(([, locale]) => locale) : [];
    if (!locales.length || !defaultLocale) throw new SmokeError(`Не удалось прочитать языки сайта из ${ROUTING_FILE}.`);
    return { locales, defaultLocale };
};

const readMessages = (locales) =>
    Object.fromEntries(
        locales.map((locale) => [
            locale,
            JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, `${locale}.json`), 'utf8')),
        ])
    );

const toRoute = (segments) =>
    segments.filter((segment) => !/^\(.*\)$/.test(segment) && !segment.startsWith('@')).join('/');

const findPageRoutes = (dir, segments = []) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        if (entry.isDirectory()) return findPageRoutes(path.join(dir, entry.name), [...segments, entry.name]);
        return /^page\.[jt]sx?$/.test(entry.name) ? [toRoute(segments)] : [];
    });

const pageTitle = (route, messages, locale) => {
    const metadata = messages[locale].Metadata;
    if (route === '') return metadata.title;
    const title = metadata.pages?.[route.split('/')[0]]?.title;
    return title ? `${title} | ${metadata.siteName}` : null;
};

const planChecks = ({ locales, defaultLocale }, messages) => {
    const routes = [...new Set(findPageRoutes(PAGES_DIR))].sort();
    const pages = [];
    const problems = [];

    for (const route of routes) {
        if (/\[\[?\.\.\./.test(route)) continue;
        const dynamic = route.includes('[');
        const spec = DYNAMIC_PAGES[route];
        if (dynamic && !spec) {
            problems.push(`страница «${route}» не проверяется: добавьте пример адреса в DYNAMIC_PAGES в scripts/smoke.mjs`);
            continue;
        }
        const pathname = dynamic ? route.replace(/\[[^\]]+\]/, spec.path) : route;
        for (const locale of locales) {
            const title = dynamic ? spec.title(messages[locale], locale) : pageTitle(route, messages, locale);
            if (!title) {
                problems.push(`страница «/${route}»: нет заголовка Metadata.pages.${route.split('/')[0]}.title в ${locale}.json`);
                continue;
            }
            pages.push({ path: `/${locale}${pathname ? `/${pathname}` : ''}`, locale, status: 200, title });
        }
    }

    const service = [
        ...locales.flatMap((locale) => [
            { path: `/${locale}/${MISSING_PAGE}`, locale, status: 404 },
            { path: `/${locale}/news/${MISSING_NEWS_ID}`, locale, status: 404 },
            { path: `/${locale}/news/${BROKEN_NEWS_ID}`, locale, status: 404 },
        ]),
        { path: '/', redirect: `/${defaultLocale}` },
    ];

    return { routes, pages, service, problems };
};

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

const normalizeText = (text) =>
    text
        .replace(/<[^>]*>/g, '')
        .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, code) => {
            if (code[0] !== '#') return ENTITIES[code.toLowerCase()] ?? match;
            const point = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : Number(code.slice(1));
            return point <= 0x10ffff ? String.fromCodePoint(point) : match;
        })
        .replace(/\s+/g, ' ')
        .trim();

const withoutBlocks = (html, tags) =>
    tags.reduce((text, tag) => text.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?</${tag}>`, 'gi'), ''), html);

const tagTexts = (markup, tag) =>
    [...markup.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'gi'))].map(([, inner]) => normalizeText(inner));

const renderErrorDigests = (html) => {
    const digests = [
        ...[...html.matchAll(/data-dgst="([^"]*)"/g)].map(([, digest]) => digest),
        ...[...html.matchAll(/[0-9a-f]+:E\{\\?"digest\\?"\s*:\s*\\?"([^"\\]*)/g)].map(([, digest]) => digest),
    ];
    return [...new Set(digests)].filter((digest) => !ALLOWED_DIGESTS.has(digest));
};

const quote = (text) => `«${text}»`;

const inspectResponse = (response, check, messages) => {
    const { status, headers, body } = response;
    const problems = [];
    const notes = [];

    if (check.redirect) {
        if (status !== 307 && status !== 308) problems.push(`код ответа ${status}, ожидалась переадресация 307 или 308`);
        const target = headers.location ? new URL(headers.location, `http://${HOST}`).pathname : 'нет заголовка Location';
        if (target !== check.redirect) problems.push(`переадресация на ${target}, ожидалась на ${check.redirect}`);
        return { problems, notes };
    }

    if (status !== check.status) problems.push(`код ответа ${status}, ожидался ${check.status}`);
    const type = String(headers['content-type'] ?? '');
    if (!type.startsWith('text/html')) problems.push(`тип ответа ${type || 'не указан'}, ожидался text/html`);
    for (const text of NEXT_ERROR_TEXTS) {
        if (body.includes(text)) problems.push(`в HTML есть текст ошибки Next ${quote(text)}`);
    }

    const locale = messages[check.locale];
    const markup = withoutBlocks(body, ['script', 'style', 'svg']);
    if (normalizeText(markup).includes(normalizeText(locale.ErrorPage.title))) {
        problems.push(`показан экран ошибки сайта ${quote(locale.ErrorPage.title)}`);
    }

    const headings = tagTexts(markup, 'h1').filter(Boolean);
    if (check.status === 404) {
        const expected = normalizeText(locale.NotFound.title);
        if (!headings.includes(expected)) {
            problems.push(`в HTML сервера нет экрана 404 с заголовком ${quote(expected)}, найдено: ${headings.map(quote).join(', ') || 'ничего'}`);
        }
        if (body.includes(ERROR_SHELL_ID)) problems.push('сервер отдал пустую заготовку ошибки вместо страницы 404');
        if (!/<header\b/i.test(markup)) problems.push('на странице 404 нет шапки сайта');
        if (!/<footer\b/i.test(markup)) problems.push('на странице 404 нет подвала сайта');
        const titles = tagTexts(markup, 'title');
        const expectedTitle = normalizeText(`${locale.Metadata.notFound.title} | ${locale.Metadata.siteName}`);
        if (titles.length !== 1 || titles[0] !== expectedTitle) {
            problems.push(`<title> ${titles.length ? titles.map(quote).join(', ') : 'не найден'}, ожидался ${quote(expectedTitle)}`);
        }
        return { problems, notes };
    }

    if (!headings.length) problems.push('в HTML нет заголовка h1');
    const titles = tagTexts(markup, 'title');
    const expectedTitle = normalizeText(check.title);
    if (titles.length !== 1 || titles[0] !== expectedTitle) {
        problems.push(`<title> ${titles.length ? titles.map(quote).join(', ') : 'не найден'}, ожидался ${quote(expectedTitle)}`);
    }
    const digests = renderErrorDigests(body);
    if (digests.length) problems.push(`часть страницы упала при серверном рендере, digest: ${digests.join(', ')}`);
    return { problems, notes };
};

const describeApiRequests = (requests) => requests.map(({ method, url, status }) => `${method} ${url} → ${status}`);

const runCheck = async (check, site, api, messages) => {
    const logStart = site.log.length;
    const apiStart = api.requests.length;
    const problems = [];
    const notes = [];

    let response = null;
    try {
        response = await httpGet(`${site.baseUrl}${check.path}`);
    } catch (error) {
        problems.push(`сайт не ответил: ${error.message}`);
    }
    await delay(LOG_SETTLE_MS);

    if (response) {
        const result = inspectResponse(response, check, messages);
        problems.push(...result.problems);
        notes.push(...result.notes);
    }

    const serverErrors = site.log.slice(logStart).filter((line) => line.stream === 'stderr');
    if (serverErrors.length) {
        problems.push(
            [
                'сервер сайта записал ошибки:',
                ...serverErrors.slice(0, MAX_LOG_LINES).map((line) => `    ${line.text}`),
            ].join('\n')
        );
    }

    const unknownRequests = api.requests.slice(apiStart).filter((request) => !request.known);
    if (unknownRequests.length) {
        problems.push(
            ['запросы, которых нет в поддельном API:', ...describeApiRequests(unknownRequests).map((line) => `    ${line}`)].join('\n')
        );
    }
    return { problems, notes };
};

const readBuildId = () => {
    try {
        return fs.readFileSync(BUILD_ID_FILE, 'utf8').trim();
    } catch {
        return null;
    }
};

const readBuildMark = () => {
    const rerun = 'Запустите проверку без --no-build: npm run test:smoke';
    let mark;
    try {
        mark = JSON.parse(fs.readFileSync(BUILD_MARK_FILE, 'utf8'));
    } catch {
        throw new SmokeError(`В .next нет сборки для проверки. ${rerun}`);
    }
    if (!mark.buildId || mark.buildId !== readBuildId()) {
        throw new SmokeError(`Сборку в .next с тех пор пересобрали без поддельного API. ${rerun}`);
    }
    return mark;
};

const runPatch = (env) => {
    const result = spawnSync(process.execPath, [PATCH_SCRIPT], { cwd: ROOT, env, stdio: 'inherit', windowsHide: true });
    if (result.status !== 0) throw new SmokeError('Скрипт scripts/patch-next-image.mjs завершился с ошибкой.');
};

const buildSite = async (env, apiUrl) => {
    fs.rmSync(BUILD_MARK_FILE, { force: true });
    runPatch(env);
    const build = startProcess([NEXT_BIN, 'build'], env, false);
    const result = await withTimeout(build.exited, BUILD_TIMEOUT_MS);
    if (result === TIMED_OUT) {
        await stopProcess(build);
        throw new SmokeError(`Сборка не закончилась за ${BUILD_TIMEOUT_MS / 60000} мин.`);
    }
    if (result.code !== 0) {
        throw new SmokeError(`Сборка не удалась (${result.error?.message ?? `код ${result.code ?? result.signal}`}).`);
    }
    fs.writeFileSync(BUILD_MARK_FILE, `${JSON.stringify({ apiUrl, buildId: readBuildId() }, null, 2)}\n`);
};

const tail = (log) => log.slice(-MAX_LOG_LINES).map((line) => `    ${line.text}`).join('\n');

const startSite = async (env) => {
    const port = await findFreePort();
    const baseUrl = `http://${HOST}:${port}`;
    const log = [];
    fs.rmSync(FETCH_CACHE_DIR, { recursive: true, force: true });
    const server = startProcess([NEXT_BIN, 'start', '--port', String(port), '--hostname', HOST], env, true);
    captureLines(server.child.stdout, 'stdout', log);
    captureLines(server.child.stderr, 'stderr', log);

    const deadline = Date.now() + START_TIMEOUT_MS;
    while (Date.now() < deadline) {
        if (!isRunning(server)) {
            const { code, signal, error } = await server.exited;
            throw new SmokeError(`Сервер сайта остановился при запуске (${error?.message ?? `код ${code ?? signal}`}):\n${tail(log)}`);
        }
        const ready = await httpGet(`${baseUrl}/robots.txt`).then(
            ({ status }) => status === 200,
            () => false
        );
        if (ready) return { baseUrl, log };
        await delay(RETRY_MS);
    }
    throw new SmokeError(`Сервер сайта не ответил за ${START_TIMEOUT_MS / 1000} с:\n${tail(log)}`);
};

const parseOptions = (args) => {
    const unknown = args.filter((arg) => arg !== '--no-build');
    if (unknown.length) throw new SmokeError(`Неизвестные параметры: ${unknown.join(' ')}. Поддерживается только --no-build.`);
    return { build: !args.includes('--no-build') };
};

const summarizeApi = (requests) => {
    const counts = new Map();
    for (const { pathname } of requests) {
        const endpoint = pathname.replace(new RegExp(`^${API_PREFIX}`), '').replace(/^\/news\/[^/]+\/$/, '/news/<id>/');
        counts.set(endpoint, (counts.get(endpoint) ?? 0) + 1);
    }
    return [...counts].map(([endpoint, count]) => `${endpoint} — ${count}`).join(', ');
};

const main = async () => {
    const options = parseOptions(process.argv.slice(2));
    const routing = readLocales();
    const messages = readMessages(routing.locales);
    const plan = planChecks(routing, messages);
    const failures = [...plan.problems];

    console.log('Проверка страниц сайта МП «Тазалык»');
    const mark = options.build ? null : readBuildMark();
    const apiPort = mark ? Number(new URL(mark.apiUrl).port) : 0;
    const api = await startFakeApi(apiPort);
    resources.api = api;
    console.log(`Поддельный API: ${api.url}`);
    const env = createSiteEnv(api.url);

    if (options.build) {
        console.log('Собираю сайт (next build) с поддельным API…');
        await buildSite(env, api.url);
        const buildUnknown = api.requests.filter((request) => !request.known);
        if (buildUnknown.length) {
            failures.push(`сборка обратилась к адресам, которых нет в поддельном API: ${describeApiRequests(buildUnknown).join('; ')}`);
        }
    } else {
        console.log('Беру готовую сборку из .next (--no-build).');
    }

    const site = await startSite(env);
    console.log(`Сайт запущен: ${site.baseUrl}`);

    const checks = [...plan.pages, ...plan.service];
    const apiStart = api.requests.length;
    console.log(`Проверяю ${checks.length} адресов:`);
    const failed = [];
    const noted = [];
    for (const check of checks) {
        const { problems, notes } = await runCheck(check, site, api, messages);
        if (problems.length) failed.push(check.path);
        if (notes.length) noted.push(check.path);
        console.log(`  ${problems.length ? 'СБОЙ' : 'ок  '}  ${check.path}`);
        for (const problem of problems) console.log(`        - ${problem}`);
        for (const note of notes) console.log(`        заметка: ${note}`);
    }

    const pageCount = plan.routes.filter((route) => !/\[\[?\.\.\./.test(route)).length;
    console.log('');
    console.log(`Поддельный API ответил на ${api.requests.length - apiStart} запросов сайта: ${summarizeApi(api.requests.slice(apiStart)) || 'запросов не было'}.`);
    console.log(
        `Итог: ${pageCount} страниц на ${routing.locales.length} языках (${plan.pages.length} адресов) ` +
        `и ${plan.service.length} служебных адресов (404 и переадресация с /). ` +
        `Всего проверено ${checks.length}: прошло ${checks.length - failed.length}, упало ${failed.length}.`
    );
    if (failed.length) console.log(`Не прошли: ${failed.join(', ')}`);
    if (noted.length) console.log(`С заметками (проверку прошли): ${noted.join(', ')}`);
    for (const failure of failures) console.log(`Ошибка проверки: ${failure}`);

    const ok = !failed.length && !failures.length;
    console.log(ok ? 'Все проверки прошли.' : 'Есть ошибки, проверка не пройдена.');
    return ok ? 0 : 1;
};

let finishing = false;

const finish = async (code) => {
    if (finishing) return;
    finishing = true;
    try {
        await cleanup();
    } catch (error) {
        console.error(`Не удалось всё остановить: ${error.message}`);
        code = 1;
    }
    process.exit(code);
};

for (const [signal, code] of [['SIGINT', 130], ['SIGTERM', 143]]) {
    process.on(signal, () => {
        console.log(`\nПроверка прервана (${signal}), останавливаю сайт и поддельный API…`);
        void finish(code);
    });
}

main().then(
    (code) => finish(code),
    (error) => {
        console.error(error instanceof SmokeError ? `Ошибка: ${error.message}` : error);
        console.log('Есть ошибки, проверка не пройдена.');
        return finish(1);
    }
);
