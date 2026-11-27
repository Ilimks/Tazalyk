import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];

export const isLocale = (value: unknown): value is Locale => hasLocale(routing.locales, value);

export async function currentLocale(): Promise<Locale> {
  const locale = await getLocale();
  return isLocale(locale) ? locale : routing.defaultLocale;
}
