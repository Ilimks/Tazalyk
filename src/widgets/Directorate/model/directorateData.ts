export interface DirectorateMember {
    id: number;
    name: string;
    // ключ должности в сообщениях Directorate.positions
    position: 'director' | 'mainEngineer' | 'deputy';
    photo?: string;
    order?: number;
}

export const directorateData: DirectorateMember[] = [
    {
        id: 1,
        name: 'Осмоналиев Женишбек Анарбекович',
        position: 'director',
        order: 1
    },
    {
        id: 3,
        name: 'Иманакунова Бааркан Мелисовна',
        position: 'deputy',
        photo: '/assets/images/Deputydirector1.webp',
        order: 3
    },
    {
        id: 4,
        name: 'Ибраев Кубанычбек Жумалиевич',
        position: 'deputy',
        photo: '/assets/images/deputy2.jpg',
        order: 4
    },
    {
        id: 5,
        name: 'Иманакунов Улан Маратович',
        position: 'deputy',
        photo: '/assets/images/deputy3.jpg',
        order: 5
    }
];