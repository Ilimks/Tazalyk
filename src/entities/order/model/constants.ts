export const ORDER_RULES = {
    nameMin: 2,
    nameMax: 150,
    phonePattern: /^\+?[0-9\s\-()]{7,20}$/,
    phoneMinDigits: 9,
    addressMax: 300,
    commentMax: 1000,
    maxLines: 20,
    minQuantity: 1,
    maxQuantity: 100,
} as const;
