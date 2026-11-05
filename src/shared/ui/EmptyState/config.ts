import { Briefcase, Container, FileText, Image, Inbox, Newspaper, Video, type LucideIcon } from 'lucide-react';

export type EmptyStateVariant =
  | 'news'
  | 'video'
  | 'photo'
  | 'procurement'
  | 'localActs'
  | 'legislation'
  | 'shop'
  | 'default';

export interface EmptyStateConfig {
  icon: LucideIcon;
}

// Тексты для каждого варианта лежат в messages/*.json → EmptyState.<variant>.title / description
export const variantConfig: Record<EmptyStateVariant, EmptyStateConfig> = {
  news: { icon: Newspaper },
  video: { icon: Video },
  photo: { icon: Image },
  procurement: { icon: Briefcase },
  localActs: { icon: FileText },
  legislation: { icon: FileText },
  shop: { icon: Container },
  default: { icon: Inbox },
};
