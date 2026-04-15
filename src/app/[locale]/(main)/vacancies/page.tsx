import { VacanciesPage } from "@/features/vacancies/ui/VacanciesPage/VacanciesPage";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";


export default function Vacancies() {
  return (
      <main>
        <BreadcrumbsWidget />
        <VacanciesPage />
      </main>
  );
}