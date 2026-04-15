import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { DirectoratePage } from "@/widgets/Directorate";

export default function Directorate() {
    return (
        <main>
            <BreadcrumbsWidget />
            <DirectoratePage />
        </main>
    );
}