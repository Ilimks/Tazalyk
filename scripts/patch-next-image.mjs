import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = path.dirname(require.resolve('next/package.json'));
const { version } = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const file = path.join(root, 'dist', 'server', 'image-optimizer.js');

const MARK = '/* tazalyk: соединение посетителя не используется */';
const FROM = 'socket: _req.socket,';
const TO = [
    `${MARK} socket: Object.assign(new (require("node:events").EventEmitter)(), {`,
    'encrypted: Boolean(_req.socket && _req.socket.encrypted),',
    'remoteAddress: _req.socket ? _req.socket.remoteAddress : undefined,',
    'readable: true, writable: true, destroyed: false }),',
].join(' ');

const source = fs.readFileSync(file, 'utf8');

if (source.includes(MARK)) {
    console.log(`next ${version}: исправление картинок уже внесено`);
} else if (source.split(FROM).length === 2) {
    fs.writeFileSync(file, source.replace(FROM, TO));
    console.log(`next ${version}: исправление картинок внесено`);
} else {
    console.error(
        `next ${version}: код оптимизатора картинок изменился, исправление не внесено.\n` +
        'Проверьте, есть ли ещё зависание картинок, и обновите или удалите scripts/patch-next-image.mjs.'
    );
    process.exit(1);
}
