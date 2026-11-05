import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { DocumentsPage } from "@/widgets/Documents";

export default function Acts() {
    return (
        <main>
            <BreadcrumbsWidget />
            <DocumentsPage kind="localActs" />
        </main>
    );
}
