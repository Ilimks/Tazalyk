// src/providers/StoreProvider.tsx
'use client';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/store';

let store: AppStore | null = null;

function getStore(): AppStore {
    if (!store) {
        store = makeStore();
    }
    return store;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const store = getStore();
    return <Provider store={store}>{children}</Provider>;
}