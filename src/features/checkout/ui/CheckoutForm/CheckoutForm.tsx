'use client';
import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CircleAlert, MessageCircle, Send, Store, Truck, Wallet } from 'lucide-react';
import { FormInput, FormTextarea } from '@/shared/ui/Forms';
import { ButtonComplaint } from '@/shared/ui/Buttons/ButtonComplaint';
import {
    createOrder,
    ORDER_RULES,
    type ContactMethod,
    type DeliveryMethod,
    type OrderCreated,
    type OrderItemPayload,
} from '@/entities/order';
import {
    CHECKOUT_FIELDS,
    INITIAL_CHECKOUT_VALUES,
    validateCheckout,
    validateCheckoutField,
    type CheckoutErrorCode,
    type CheckoutField,
    type CheckoutValues,
} from '../../model/validation';
import { parseOrderError } from '../../model/errors';
import styles from './CheckoutForm.module.scss';

interface CheckoutFormProps {
    // товары заказа: id и количество (цены считает сервер)
    lines: OrderItemPayload[];
    onSuccess: (order: OrderCreated) => void;
    // сервер отклонил товары (закончились, сняты с продажи) — виджет корзины покажет «Обновить корзину»
    onItemsError: (messages: string[]) => void;
    // блок над формой, например итог заказа
    summary?: ReactNode;
}

type FieldErrors = Partial<Record<CheckoutField, string>>;

// для кыргызской версии вместо русского текста сервера показываем своё сообщение по полю
const SERVER_FIELD_MESSAGE: Record<CheckoutField, CheckoutErrorCode> = {
    customer_name: 'nameLength',
    phone: 'phoneInvalid',
    contact_method: 'contactRequired',
    delivery_method: 'deliveryRequired',
    address: 'addressRequired',
    comment: 'commentLength',
};

const CONTACT_METHODS: { value: ContactMethod; icon: typeof Store }[] = [
    { value: 'whatsapp', icon: MessageCircle },
    { value: 'telegram', icon: Send },
];

const DELIVERY_METHODS: { value: DeliveryMethod; icon: typeof Store }[] = [
    { value: 'pickup', icon: Store },
    { value: 'delivery', icon: Truck },
];

interface MethodOptionProps {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    icon: typeof Store;
    title: string;
    hint: string;
    onSelect: () => void;
}

const MethodOption: React.FC<MethodOptionProps> = ({ id, name, value, checked, icon: Icon, title, hint, onSelect }) => (
    <label className={`${styles.method} ${checked ? styles.methodActive : ''}`} htmlFor={id}>
        <input
            id={id}
            className={styles.methodInput}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onSelect}
        />
        <span className={styles.methodIcon} aria-hidden="true">
            <Icon />
        </span>
        <span className={styles.methodText}>
            <span className={styles.methodName}>{title}</span>
            <span className={styles.methodHint}>{hint}</span>
        </span>
    </label>
);

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ lines, onSuccess, onItemsError, summary }) => {
    const t = useTranslations('Checkout');
    const locale = useLocale();
    const id = useId();
    const [values, setValues] = useState<CheckoutValues>(INITIAL_CHECKOUT_VALUES);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [touched, setTouched] = useState<Partial<Record<CheckoutField, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const fieldId = (field: string) => `${id}-${field}`;
    const errorText = (code: CheckoutErrorCode | undefined) => (code ? t(`errors.${code}`) : undefined);

    const focusField = (field: CheckoutField) => {
        const isRadio = field === 'delivery_method' || field === 'contact_method';
        const target = isRadio ? `${field}-${values[field]}` : field;
        document.getElementById(fieldId(target))?.focus();
    };

    const handleChange =
        (field: keyof CheckoutValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const next = { ...values, [field]: event.target.value } as CheckoutValues;
            setValues(next);
            // ошибка пропадает, как только поле исправлено
            if (field !== 'website' && (touched[field] || errors[field])) {
                setErrors((prev) => ({ ...prev, [field]: errorText(validateCheckoutField(field, next)) }));
            }
        };

    const handleBlur = (field: CheckoutField) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        setErrors((prev) => ({ ...prev, [field]: errorText(validateCheckoutField(field, values)) }));
    };

    const handleDeliveryChange = (method: DeliveryMethod) => {
        setValues((prev) => ({ ...prev, delivery_method: method }));
        if (method === 'pickup') setErrors((prev) => ({ ...prev, address: undefined, delivery_method: undefined }));
    };

    const handleContactChange = (method: ContactMethod) => {
        setValues((prev) => ({ ...prev, contact_method: method }));
        setErrors((prev) => ({ ...prev, contact_method: undefined }));
    };

    const showSubmitError = (error: unknown) => {
        const result = parseOrderError(error);
        if (result.kind === 'rateLimit') {
            setFormError(t('errors.rateLimited'));
            return;
        }
        if (result.kind === 'network') {
            setFormError(t('errors.network'));
            return;
        }
        if (result.kind === 'server') {
            setFormError(t('errors.server'));
            return;
        }

        // сообщения сервера на русском — на кыргызской версии показываем свои
        const useServerText = locale === 'ru';
        const fieldErrors: FieldErrors = {};
        (Object.keys(result.fields) as CheckoutField[]).forEach((field) => {
            fieldErrors[field] = useServerText ? result.fields[field] : t(`errors.${SERVER_FIELD_MESSAGE[field]}`);
        });
        setErrors((prev) => ({ ...prev, ...fieldErrors }));

        if (result.items.length > 0) {
            onItemsError(useServerText ? result.items : [t('errors.itemsInvalid')]);
        }

        if (result.general.length > 0) {
            setFormError(useServerText ? result.general[0] : t('errors.generic'));
        } else if (result.items.length > 0) {
            setFormError(t('errors.itemsCheck'));
        } else if (Object.keys(fieldErrors).length > 0) {
            setFormError(t('errors.fixFields'));
        } else {
            setFormError(t('errors.generic'));
        }

        const firstInvalid = CHECKOUT_FIELDS.find((field) => fieldErrors[field]);
        if (firstInvalid) focusField(firstInvalid);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;
        setFormError(null);

        if (lines.length === 0) {
            setFormError(t('errors.emptyCart'));
            return;
        }
        if (lines.length > ORDER_RULES.maxLines) {
            setFormError(t('errors.tooManyLines'));
            return;
        }

        const codes = validateCheckout(values);
        const nextErrors: FieldErrors = {};
        (Object.keys(codes) as CheckoutField[]).forEach((field) => {
            nextErrors[field] = errorText(codes[field]);
        });
        setErrors(nextErrors);
        setTouched(Object.fromEntries(CHECKOUT_FIELDS.map((field) => [field, true])));

        const firstInvalid = CHECKOUT_FIELDS.find((field) => nextErrors[field]);
        if (firstInvalid) {
            setFormError(t('errors.fixFields'));
            focusField(firstInvalid);
            return;
        }

        setIsSubmitting(true);
        try {
            const isDelivery = values.delivery_method === 'delivery';
            const order = await createOrder({
                customer_name: values.customer_name.trim(),
                phone: values.phone.trim(),
                contact_method: values.contact_method,
                delivery_method: values.delivery_method,
                address: isDelivery ? values.address.trim() : '',
                comment: values.comment.trim(),
                items: lines,
                website: values.website,
            });
            onSuccess(order);
        } catch (error) {
            showSubmitError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h2 className={styles.title}>{t('title')}</h2>

            {summary}

            <fieldset className={styles.section}>
                <legend className={styles.legend}>{t('contactsTitle')}</legend>
                <FormInput
                    id={fieldId('customer_name')}
                    label={t('name')}
                    name="customer_name"
                    value={values.customer_name}
                    onChange={handleChange('customer_name')}
                    onBlur={handleBlur('customer_name')}
                    placeholder={t('namePlaceholder')}
                    autoComplete="name"
                    maxLength={ORDER_RULES.nameMax}
                    error={errors.customer_name}
                    required
                />
                <FormInput
                    id={fieldId('phone')}
                    label={t('phone')}
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    placeholder="+996 ___ ___ ___"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={30}
                    hint={t('phoneHint')}
                    error={errors.phone}
                    required
                />
            </fieldset>

            <fieldset className={styles.section}>
                <legend className={styles.legend}>{t('contactMethodTitle')}</legend>
                <div className={styles.methods}>
                    {CONTACT_METHODS.map(({ value, icon }) => (
                        <MethodOption
                            key={value}
                            id={fieldId(`contact_method-${value}`)}
                            name="contact_method"
                            value={value}
                            checked={values.contact_method === value}
                            icon={icon}
                            title={t(value)}
                            hint={t(`${value}Hint`)}
                            onSelect={() => handleContactChange(value)}
                        />
                    ))}
                </div>
                {errors.contact_method && <p className={styles.fieldError}>{errors.contact_method}</p>}
            </fieldset>

            <fieldset className={styles.section}>
                <legend className={styles.legend}>{t('deliveryTitle')}</legend>
                <div className={styles.methods}>
                    {DELIVERY_METHODS.map(({ value, icon }) => (
                        <MethodOption
                            key={value}
                            id={fieldId(`delivery_method-${value}`)}
                            name="delivery_method"
                            value={value}
                            checked={values.delivery_method === value}
                            icon={icon}
                            title={t(value)}
                            hint={t(`${value}Hint`)}
                            onSelect={() => handleDeliveryChange(value)}
                        />
                    ))}
                </div>
                {errors.delivery_method && <p className={styles.fieldError}>{errors.delivery_method}</p>}

                {values.delivery_method === 'delivery' && (
                    <div className={styles.address}>
                        <FormInput
                            id={fieldId('address')}
                            label={t('address')}
                            name="address"
                            value={values.address}
                            onChange={handleChange('address')}
                            onBlur={handleBlur('address')}
                            placeholder={t('addressPlaceholder')}
                            autoComplete="street-address"
                            maxLength={ORDER_RULES.addressMax}
                            error={errors.address}
                            required
                        />
                    </div>
                )}
            </fieldset>

            <div className={styles.sectionPlain}>
                <FormTextarea
                    id={fieldId('comment')}
                    label={t('comment')}
                    name="comment"
                    value={values.comment}
                    onChange={handleChange('comment')}
                    onBlur={handleBlur('comment')}
                    placeholder={t('commentPlaceholder')}
                    maxLength={ORDER_RULES.commentMax}
                    rows={3}
                    error={errors.comment}
                />
            </div>

            {/* ловушка для ботов: человек это поле не видит и не заполняет */}
            <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor={fieldId('website')}>{t('honeypot')}</label>
                <input
                    id={fieldId('website')}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={handleChange('website')}
                />
            </div>

            <div className={styles.payment}>
                <span className={styles.paymentIcon} aria-hidden="true">
                    <Wallet />
                </span>
                <div>
                    <p className={styles.paymentTitle}>{t('paymentTitle')}</p>
                    <p className={styles.paymentText}>{t('paymentNote')}</p>
                </div>
            </div>

            {formError && (
                <div className={styles.formError} role="alert">
                    <CircleAlert aria-hidden />
                    <span>{formError}</span>
                </div>
            )}

            <ButtonComplaint type="submit" isLoading={isSubmitting} disabled={lines.length === 0}>
                {isSubmitting ? t('submitting') : t('submit')}
            </ButtonComplaint>
        </form>
    );
};
