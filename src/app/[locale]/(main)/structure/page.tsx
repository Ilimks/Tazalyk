import { StructureActivityPage } from "@/features/structure/ui/StructureActivityPage/StructureActivityPage";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";


export default function Structure() {
    return (
        <main>
            <BreadcrumbsWidget />
            <StructureActivityPage />
        </main>
    );
}