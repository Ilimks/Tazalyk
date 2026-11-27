import type { Metadata } from "next";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { SearchPage } from "@/widgets/SiteSearch";

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
            <SearchPage key={query} initialQuery={query} />
        </main>
    );
}
