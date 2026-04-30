import { VacanciesPage } from "@/widgets/Vacancies/ui";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";

export default function Vacancies() {
  return (
      <main>
        <BreadcrumbsWidget />
        <VacanciesPage />
      </main>
  );
}