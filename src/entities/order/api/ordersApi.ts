import { baseApi } from '@/shared/api';
import type { OrderCreated, OrderPayload } from '../model/types';

// Таймаут оформления заказа: дольше обычного, сервер ещё отправляет уведомление менеджеру
const CREATE_ORDER_TIMEOUT_MS = 30000;

export const ordersApi = {
    // вызывается из браузера; ошибки 400/429 приходят как ApiError с телом ответа в data
    create: (payload: OrderPayload) =>
        baseApi.post<OrderCreated>('/shop/orders/', payload, {
            signal: AbortSignal.timeout(CREATE_ORDER_TIMEOUT_MS),
        }),
};

export const createOrder = ordersApi.create;
