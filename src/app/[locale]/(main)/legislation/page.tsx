import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { LegislationPage } from "@/widgets/Documents";

export default function Legislation() {
    return (
        <main>
            <BreadcrumbsWidget />
            <LegislationPage />
        </main>
    );
}