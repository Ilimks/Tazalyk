import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { ShopPage } from "@/widgets/Shop";
import { parseShopQuery, searchParamsFromRecord } from "@/features/product-filters";

interface ShopProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Shop({ searchParams }: ShopProps) {
    const query = parseShopQuery(searchParamsFromRecord(await searchParams));

    return (
        <main>
            <BreadcrumbsWidget />
            <ShopPage query={query} />
        </main>
    );
}
