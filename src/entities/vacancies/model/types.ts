export interface Vacancy {
    id: string;
    title: string;
    salary_from: string;
    salary_to: string;
    schedule: string;
    experience: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    conditions: string[];
    status: 'open' | 'closed';
    published_at: string;
}