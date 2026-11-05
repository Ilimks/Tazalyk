export { VacancyCard } from './ui/VacancyCard/VacancyCard';
export { vacanciesApi, VACANCIES_REVALIDATE_SECONDS } from './api/vacanciesApi';
// только для серверных компонентов
export { prefetchVacancies } from './api/vacanciesApi';
export { getVacancyText, splitRequirements } from './lib/localize';

export type { Vacancy, PaginatedVacanciesResponse } from './model/types';
