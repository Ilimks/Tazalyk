import { FileText, ScrollText, type LucideIcon } from 'lucide-react';

// Иконки карточек документов по типу: "document" — правила и положения, "order" — приказы
export const DocumentIcons: Record<string, LucideIcon> = {
    document: FileText,
    order: ScrollText,
};
