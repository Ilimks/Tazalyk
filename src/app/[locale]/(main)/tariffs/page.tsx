import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { TariffsPage } from "@/widgets/Tariffs/ui";


export default function Tariffs() {
    return (
        <main>
            <BreadcrumbsWidget />
            <TariffsPage />
        </main>
    );
}