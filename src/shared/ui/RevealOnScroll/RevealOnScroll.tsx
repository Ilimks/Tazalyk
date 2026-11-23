'use client';
import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

const SELECTOR = '[data-reveal]';
// соседние карточки появляются волной, но не дольше четверти секунды
const STAGGER_MS = 60;
const STAGGER_MAX = 4;
const STATES = ['wait', 'in', 'done'];

/**
 * Мягкое появление блоков при прокрутке. Ничего не рисует.
 *
 * Без JavaScript и для поисковиков всё видно сразу: прячутся только блоки
 * ниже экрана, и только когда скрипт уже готов их показать.
 * Состояние хранится в data-атрибуте, а не в классе: React его не перетирает.
 */
export const RevealOnScroll: React.FC = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const show = (element: HTMLElement) => {
            const siblings = Array.from(element.parentElement?.children ?? []).filter((node) =>
                (node as HTMLElement).dataset.reveal === 'wait' || node === element
            );
            const order = Math.min(siblings.indexOf(element), STAGGER_MAX);
            element.style.transitionDelay = `${Math.max(order, 0) * STAGGER_MS}ms`;
            element.dataset.reveal = 'in';

            // появилось — убираем следы, чтобы не мешать переходам при наведении
            const clean = (event: TransitionEvent) => {
                if (event.target !== element || event.propertyName !== 'opacity') return;
                element.removeEventListener('transitionend', clean);
                element.style.transitionDelay = '';
                element.dataset.reveal = 'done';
            };
            element.addEventListener('transitionend', clean);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                // все попавшие в кадр одновременно — одной волной, слева направо
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    observer.unobserve(entry.target);
                    show(entry.target as HTMLElement);
                }
            },
            { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
        );

        const prepare = (element: HTMLElement) => {
            // в разметке атрибут пустой (React пишет «true»), дальше здесь только наши состояния
            if (STATES.includes(element.dataset.reveal ?? '')) return;
            // то, что уже на экране, не прячем: иначе страница мигнёт
            if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
                element.dataset.reveal = 'done';
                return;
            }
            element.dataset.reveal = 'wait';
            observer.observe(element);
        };

        document.querySelectorAll<HTMLElement>(SELECTOR).forEach(prepare);

        // карточки, которые догрузились позже (галерея, магазин)
        const mutations = new MutationObserver((records) => {
            for (const record of records) {
                record.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;
                    if (node.matches(SELECTOR)) prepare(node);
                    node.querySelectorAll<HTMLElement>(SELECTOR).forEach(prepare);
                });
            }
        });
        mutations.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutations.disconnect();
            // при переходе на другую страницу ничего не должно остаться спрятанным
            document.querySelectorAll<HTMLElement>('[data-reveal="wait"]').forEach((element) => {
                element.dataset.reveal = 'done';
            });
        };
    }, [pathname]);

    return null;
};
