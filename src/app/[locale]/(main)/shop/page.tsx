import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { ShopPage } from "@/widgets/Shop";
import { parseShopQuery, searchParamsFromRecord } from "@/features/product-filters";

interface ShopProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Shop({ searchParams }: ShopProps) {
    // фильтры из адреса (?volume=240&ordering=price) — первая страница каталога рисуется на сервере
    const query = parseShopQuery(searchParamsFromRecord(await searchParams));

    return (
        <main>
            <BreadcrumbsWidget />
            <ShopPage query={query} />
        </main>
    );
}
