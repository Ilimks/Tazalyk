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
