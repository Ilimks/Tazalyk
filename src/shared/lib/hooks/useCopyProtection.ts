// hooks/useCopyProtection.ts
import { ClipboardEvent, MouseEvent, KeyboardEvent } from 'react';

export const useCopyProtection = () => {
    const handleCopy = (e: ClipboardEvent) => {
        e.preventDefault();
        return false;
    };

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X')) {
            e.preventDefault();
            return false;
        }
    };

    return {
        handleCopy,
        handleContextMenu,
        handleKeyDown
    };
};