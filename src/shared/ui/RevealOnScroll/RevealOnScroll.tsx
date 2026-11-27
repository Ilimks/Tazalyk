'use client';
import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

const SELECTOR = '[data-reveal]';
const STAGGER_MS = 60;
const STAGGER_MAX = 4;
const STATES = ['wait', 'in', 'done'];

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
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    observer.unobserve(entry.target);
                    show(entry.target as HTMLElement);
                }
            },
            { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
        );

        const prepare = (element: HTMLElement) => {
            if (STATES.includes(element.dataset.reveal ?? '')) return;
            if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
                element.dataset.reveal = 'done';
                return;
            }
            element.dataset.reveal = 'wait';
            observer.observe(element);
        };

        document.querySelectorAll<HTMLElement>(SELECTOR).forEach(prepare);

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
            document.querySelectorAll<HTMLElement>('[data-reveal="wait"]').forEach((element) => {
                element.dataset.reveal = 'done';
            });
        };
    }, [pathname]);

    return null;
};
