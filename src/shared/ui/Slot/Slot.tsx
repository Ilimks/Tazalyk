'use client';

import { ReactNode } from 'react';

interface SlotProps {
    children: ReactNode;
}

export const Slot = ({ children }: SlotProps) => <>{children}</>;
