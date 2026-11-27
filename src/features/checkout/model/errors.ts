import { ApiError } from '@/shared/api';
import { isCheckoutField, type CheckoutField } from './validation';

export type OrderSubmitError =
    | {
          kind: 'validation';
          fields: Partial<Record<CheckoutField, string>>;
          items: string[];
          general: string[];
      }
    | { kind: 'rateLimit' }
    | { kind: 'network' }
    | { kind: 'server' };

const MAX_MESSAGE_LENGTH = 300;

const collectMessages = (value: unknown, depth = 0): string[] => {
    if (depth > 4 || value === null || value === undefined) return [];
    if (typeof value === 'string') {
        const message = value.trim();
        return message ? [message.slice(0, MAX_MESSAGE_LENGTH)] : [];
    }
    if (Array.isArray(value)) return value.flatMap((entry) => collectMessages(entry, depth + 1));
    if (typeof value === 'object') {
        return Object.values(value as Record<string, unknown>).flatMap((entry) => collectMessages(entry, depth + 1));
    }
    return [];
};

const unique = (messages: string[]) => Array.from(new Set(messages));

export const parseOrderError = (error: unknown): OrderSubmitError => {
    if (!(error instanceof ApiError)) {
        return { kind: 'network' };
    }
    if (error.status === 429) return { kind: 'rateLimit' };
    if (error.status !== 400) return { kind: 'server' };

    const fields: Partial<Record<CheckoutField, string>> = {};
    const items: string[] = [];
    const general: string[] = [];

    if (error.data && typeof error.data === 'object' && !Array.isArray(error.data)) {
        Object.entries(error.data as Record<string, unknown>).forEach(([key, value]) => {
            const messages = collectMessages(value);
            if (messages.length === 0) return;
            if (isCheckoutField(key)) {
                fields[key] = messages[0];
            } else if (key === 'items') {
                items.push(...messages);
            } else {
                general.push(...messages);
            }
        });
    } else {
        general.push(...collectMessages(error.data));
    }

    return { kind: 'validation', fields, items: unique(items), general: unique(general) };
};
