import { VacanciesPage } from "@/widgets/Vacancies/ui";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { prefetchVacancies } from "@/entities/vacancy";

export default async function Vacancies() {
    const vacancies = await prefetchVacancies();

    return (
        <main>
            <BreadcrumbsWidget />
            <VacanciesPage initialVacancies={vacancies} />
        </main>
    );
}