import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { StructurePage } from "@/widgets/Structure/ui";


export default function Structure() {
    return (
        <main>
            <BreadcrumbsWidget />
            <StructurePage />
        </main>
    );
}