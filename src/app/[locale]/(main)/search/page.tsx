import type { Metadata } from "next";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { SearchPage } from "@/widgets/SiteSearch";

// страницы результатов не нужны поисковикам
export const metadata: Metadata = {
    robots: { index: false, follow: true },
};

interface SearchProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Search({ searchParams }: SearchProps) {
    const { q } = await searchParams;
    const query = typeof q === "string" ? q.slice(0, 100) : "";

    return (
        <main>
            <BreadcrumbsWidget />
            {/* key: новый запрос из шапки на этой же странице начинает поиск заново */}
            <SearchPage key={query} initialQuery={query} />
        </main>
    );
}
