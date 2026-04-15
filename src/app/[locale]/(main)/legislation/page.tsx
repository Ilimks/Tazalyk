import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { LegislationList } from "@/widgets/Legislation/LegislationList/ui/LegislationList";

export default function LocalActsPage() {
    return (
        <main>
            <BreadcrumbsWidget />
            <LegislationList />
        </main>
    );
}