export const getTariffs = (t: (key: string) => string) => [
    {
        id: 1,
        icon: 'user',
        title: t('TariffsIndividualCardPopulation'),
        caption: t('TariffsIndividualCaption'),
        rows: [
            { label: t('TariffsTableCardBase'), amount: 41.00 },
            { label: `${t('TariffsNsp')} 3%`, amount: 1.23 },
        ],
        totalLabel: t('TariffsIndividualCardTotal'),
        total: 42.23,
        note: t('TariffsIndividualCardPeople'),
    },
    {
        id: 2,
        icon: 'star',
        title: t('TariffsIndividualCardPensioners'),
        caption: t('TariffsIndividualCaption'),
        rows: [
            { label: t('TariffsTableCardBase'), amount: 22.50 },
            { label: `${t('TariffsNsp')} 3%`, amount: 0.68 },
        ],
        totalLabel: t('TariffsIndividualCardTotal'),
        total: 23.18,
        note: t('TariffsIndividualCardPreferential'),
    },
    {
        id: 3,
        icon: 'building',
        title: t('TariffsIndLegalCardTitle'),
        caption: t('TariffsLegalCaption'),
        rows: [
            { label: t('TariffsTableCardBase'), amount: 361.00 },
            { label: `${t('TariffsVat')} 12%`, amount: 43.32 },
            { label: `${t('TariffsNsp')} 2%`, amount: 7.22 },
        ],
        totalLabel: t('TariffsIndLegalCardTotal'),
        total: 411.54,
        note: t('TariffsIndLegalCardWaste'),
    },
];

export const getAdditionalInfo = (t: (key: string) => string) => ({
    title: t('TariffsNoteTitle'),
    items: [
        t('TariffsNoteCardText1'),
        t('TariffsNoteCardText2'),
        t('TariffsNoteCardText3'),
        t('TariffsNoteCardText4'),
        t('TariffsNoteCardText5'),
    ]
});