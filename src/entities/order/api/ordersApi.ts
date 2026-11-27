import { baseApi } from '@/shared/api';
import type { OrderCreated, OrderPayload } from '../model/types';

const CREATE_ORDER_TIMEOUT_MS = 30000;

export const ordersApi = {
    create: (payload: OrderPayload) =>
        baseApi.post<OrderCreated>('/shop/orders/', payload, {
            signal: AbortSignal.timeout(CREATE_ORDER_TIMEOUT_MS),
        }),
};

export const createOrder = ordersApi.create;
