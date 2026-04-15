import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { HistoryPage } from "@/widgets/History";

export default function History() {
    return (
        <main>
            <BreadcrumbsWidget />
            <HistoryPage />
        </main>
    );
}