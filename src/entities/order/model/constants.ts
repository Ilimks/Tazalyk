// Те же правила, что проверяет сервер (backend/shop/serializers.py, OrderCreateSerializer)
export const ORDER_RULES = {
    nameMin: 2,
    nameMax: 150,
    phonePattern: /^\+?[0-9\s\-()]{7,20}$/,
    // номер без кода страны: 9 цифр, например 555 123 456
    phoneMinDigits: 9,
    addressMax: 300,
    commentMax: 1000,
    // разных товаров в одном заказе
    maxLines: 20,
    // штук одного товара
    minQuantity: 1,
    maxQuantity: 100,
} as const;
