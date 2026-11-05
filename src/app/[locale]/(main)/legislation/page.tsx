import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { DocumentsPage } from "@/widgets/Documents";

export default function Legislation() {
    return (
        <main>
            <BreadcrumbsWidget />
            <DocumentsPage kind="legislation" />
        </main>
    );
}