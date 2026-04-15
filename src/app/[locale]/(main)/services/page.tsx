import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { ServiceZonePage } from "@/widgets/Service";


export default function ServiceZone() {
    return (
        <main>
            <BreadcrumbsWidget />
            <ServiceZonePage />
        </main>
    );
}