import type { Metadata } from "next";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { CartPage } from "@/widgets/Cart";

// корзина у каждого своя — поисковикам её индексировать незачем
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
    },
};

export default function Cart() {
    return (
        <main>
            <BreadcrumbsWidget />
            <CartPage />
        </main>
    );
}
