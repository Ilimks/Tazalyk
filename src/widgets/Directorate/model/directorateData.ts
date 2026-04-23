export interface DirectorateMember {
    id: number;
    name: string;
    position: string;
    photo?: string;
    order?: number;
}

export const directorateData: DirectorateMember[] = [
    {
        id: 1,
        name: 'Арынов Максатбек Дуйшенкулович',
        position: 'Директор',
        photo: '/assets/images/DirectorPhoto2.jpeg',
        order: 1
    },
    {
        id: 2,
        name: 'Апиев Базарбай Бейшембиевич',
        position: 'Главный инженер',
        photo: '/assets/images/chief-engineer.jpg',
        order: 2
    },
    {
        id: 3,
        name: 'Иманакунова Бааркан Мелисовна',
        position: 'Заместитель директора',
        photo: '/assets/images/Deputydirector1.jpeg',
        order: 3
    },
    {
        id: 4,
        name: 'Ибраев Кубанычбек Жумалиевич',
        position: 'Заместитель директора',
        photo: '/assets/images/deputy2.jpg',
        order: 4
    },
    {
        id: 5,
        name: 'Иманакунов Улан Маратович',
        position: 'Заместитель директора',
        photo: '/assets/images/deputy3.jpg',
        order: 5
    }
];