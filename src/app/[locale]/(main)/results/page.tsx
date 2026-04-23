import { ResultsPage } from "@/features/results/ui/ResultsPage/ResultsPage";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";

export default function Results() {
    return (
        <main>
            <BreadcrumbsWidget />
            <ResultsPage />
        </main>
    );
}