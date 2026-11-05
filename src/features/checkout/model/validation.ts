import { ORDER_RULES, type ContactMethod, type DeliveryMethod } from '@/entities/order';

export interface CheckoutValues {
    customer_name: string;
    phone: string;
    contact_method: ContactMethod;
    delivery_method: DeliveryMethod;
    address: string;
    comment: string;
    // ловушка для ботов, человек её не видит
    website: string;
}

export type CheckoutField = 'customer_name' | 'phone' | 'contact_method' | 'delivery_method' | 'address' | 'comment';

// порядок полей в форме: к первому полю с ошибкой переводим фокус
export const CHECKOUT_FIELDS: readonly CheckoutField[] = [
    'customer_name',
    'phone',
    'contact_method',
    'delivery_method',
    'address',
    'comment',
];

export const isCheckoutField = (value: string): value is CheckoutField =>
    (CHECKOUT_FIELDS as readonly string[]).includes(value);

// ключи сообщений в messages → Checkout.errors
export type CheckoutErrorCode =
    | 'nameRequired'
    | 'nameLength'
    | 'phoneRequired'
    | 'phoneInvalid'
    | 'contactRequired'
    | 'deliveryRequired'
    | 'addressRequired'
    | 'addressLength'
    | 'commentLength';

export const INITIAL_CHECKOUT_VALUES: CheckoutValues = {
    customer_name: '',
    phone: '',
    contact_method: 'whatsapp',
    delivery_method: 'pickup',
    address: '',
    comment: '',
    website: '',
};

// Те же проверки, что на сервере; пробелы по краям сервер тоже обрезает
export const validateCheckoutField = (
    field: CheckoutField,
    values: CheckoutValues
): CheckoutErrorCode | undefined => {
    switch (field) {
        case 'customer_name': {
            const name = values.customer_name.trim();
            if (!name) return 'nameRequired';
            if (name.length < ORDER_RULES.nameMin || name.length > ORDER_RULES.nameMax) return 'nameLength';
            return undefined;
        }
        case 'phone': {
            const phone = values.phone.trim();
            if (!phone) return 'phoneRequired';
            const digits = phone.replace(/\D/g, '');
            return ORDER_RULES.phonePattern.test(phone) && digits.length >= ORDER_RULES.phoneMinDigits
                ? undefined
                : 'phoneInvalid';
        }
        case 'contact_method':
            return values.contact_method === 'whatsapp' || values.contact_method === 'telegram'
                ? undefined
                : 'contactRequired';
        case 'delivery_method':
            return values.delivery_method === 'pickup' || values.delivery_method === 'delivery'
                ? undefined
                : 'deliveryRequired';
        case 'address': {
            if (values.delivery_method !== 'delivery') return undefined;
            const address = values.address.trim();
            if (!address) return 'addressRequired';
            return address.length > ORDER_RULES.addressMax ? 'addressLength' : undefined;
        }
        case 'comment':
            return values.comment.trim().length > ORDER_RULES.commentMax ? 'commentLength' : undefined;
        default:
            return undefined;
    }
};

export const validateCheckout = (values: CheckoutValues): Partial<Record<CheckoutField, CheckoutErrorCode>> => {
    const errors: Partial<Record<CheckoutField, CheckoutErrorCode>> = {};
    CHECKOUT_FIELDS.forEach((field) => {
        const error = validateCheckoutField(field, values);
        if (error) errors[field] = error;
    });
    return errors;
};
