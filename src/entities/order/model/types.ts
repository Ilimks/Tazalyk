export type DeliveryMethod = 'pickup' | 'delivery';

export type ContactMethod = 'whatsapp' | 'telegram';

export interface OrderItemPayload {
    product: string;
    quantity: number;
}

export interface OrderPayload {
    customer_name: string;
    phone: string;
    contact_method: ContactMethod;
    delivery_method: DeliveryMethod;
    address: string;
    comment: string;
    items: OrderItemPayload[];
    website: string;
}

export interface OrderCreated {
    number: number;
    total: string;
    contact_method: ContactMethod;
    whatsapp_url: string | null;
    telegram_url: string | null;
}
