import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { TariffsPage } from "@/widgets/Tariffs";


export default function Tariffs() {
    return (
        <main>
            <BreadcrumbsWidget />
            <TariffsPage />
        </main>
    );
}