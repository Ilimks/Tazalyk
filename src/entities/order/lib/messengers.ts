const TELEGRAM_HOSTS = ['t.me', 'telegram.me'];
const WHATSAPP_HOSTS = ['wa.me'];

// Ссылка из ответа API используется, только если она ведёт в нужный мессенджер по https
const getSafeUrl = (value: unknown, hosts: string[]): string | null => {
    if (typeof value !== 'string' || !value.trim()) return null;

    try {
        const url = new URL(value.trim());
        return url.protocol === 'https:' && hosts.includes(url.hostname.toLowerCase()) ? url.toString() : null;
    } catch {
        return null;
    }
};

export const getSafeTelegramUrl = (value: unknown) => getSafeUrl(value, TELEGRAM_HOSTS);

export const getSafeWhatsAppUrl = (value: unknown) => getSafeUrl(value, WHATSAPP_HOSTS);
