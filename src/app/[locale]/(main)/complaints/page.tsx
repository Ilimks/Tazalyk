import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { ComplaintsPage } from "@/widgets/Complaints/ui";

export default function Complaints() {
    return (
        <main>
            <BreadcrumbsWidget />
            <ComplaintsPage />
        </main>
    );
}