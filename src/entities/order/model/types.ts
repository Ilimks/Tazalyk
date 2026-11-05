export type DeliveryMethod = 'pickup' | 'delivery';

// где покупателю удобнее общаться с менеджером
export type ContactMethod = 'whatsapp' | 'telegram';

export interface OrderItemPayload {
    // id товара (uuid)
    product: string;
    quantity: number;
}

// Тело POST /shop/orders/. Цены и сумму считает сервер — браузер передаёт только товары и количество
export interface OrderPayload {
    customer_name: string;
    phone: string;
    contact_method: ContactMethod;
    delivery_method: DeliveryMethod;
    address: string;
    comment: string;
    items: OrderItemPayload[];
    // ловушка для ботов: всегда пустая строка
    website: string;
}

// Ответ 201
export interface OrderCreated {
    // номер заказа, его покупатель называет менеджеру
    number: number;
    // сумма строкой, например "32000.00"
    total: string;
    contact_method: ContactMethod;
    // чаты с менеджером с готовым сообщением о заказе; null — этот контакт не настроен
    whatsapp_url: string | null;
    telegram_url: string | null;
}
