export interface DirectorateMember {
    id: number;
    name: string;
    position: string;
    receptionDays: string;
    receptionTime: string;
    phone: string;
    photo?: string;
    email?: string;
    order?: number;
}

export const directorateData: DirectorateMember[] = [
    {
        id: 1,
        name: 'Арынов Максатбек Дуйшенкулович',
        position: 'Директор',
        receptionDays: 'четверг',
        receptionTime: '15:00 - 16:30',
        phone: '0312 56 88 22',
        email: 'director@tazalyk.kg',
        photo: '/assets/images/DirectorPhoto2.jpeg',
        order: 1
    },
    {
        id: 2,
        name: 'Апиев Базарбай Бейшембиевич',
        position: 'Главный инженер',
        receptionDays: 'среда',
        receptionTime: '15:00 - 16:30',
        phone: '0312 56 88 22',
        email: 'engineer@tazalyk.kg',
        photo: '/assets/images/chief-engineer.jpg',
        order: 2
    },
    {
        id: 3,
        name: 'Иманакунова Бааркан Мелисовна',
        position: 'Заместитель директора',
        receptionDays: 'вторник',
        receptionTime: '15:00 - 16:30',
        phone: '0312 56 88 22',
        email: 'deputy1@tazalyk.kg',
        photo: '/assets/images/Deputydirector1.jpeg',
        order: 3
    },
    {
        id: 4,
        name: 'Ибраев Кубанычбек Жумалиевич',
        position: 'Заместитель директора',
        receptionDays: 'понедельник',
        receptionTime: '15:00 - 16:30',
        phone: '0312 56 88 22',
        email: 'deputy2@tazalyk.kg',
        photo: '/assets/images/deputy2.jpg',
        order: 4
    },
    {
        id: 5,
        name: 'Иманакунов Улан Маратович',
        position: 'Заместитель директора',
        receptionDays: 'пятница',
        receptionTime: '15:00 - 16:30',
        phone: '0312 56 88 22',
        email: 'deputy3@tazalyk.kg',
        photo: '/assets/images/deputy3.jpg',
        order: 5
    }
];