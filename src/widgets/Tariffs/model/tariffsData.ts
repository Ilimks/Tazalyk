export const getIndividualTariffs = (t: (key: string) => string) => [
    {
        id: 1,
        title: t('TariffsIndividualCardPopulation'),
        icon: 'user',
        baseTariff: 41.00,
        nsp: { rate: 3, amount: 1.23 },
        total: 42.23,
        unit: '1 человек в месяц',
        note: t('TariffsIndividualCardPeople')
    },
    {
        id: 2,
        title: t('TariffsIndividualCardPensioners'),
        icon: 'star',
        baseTariff: 22.50,
        nsp: { rate: 3, amount: 0.68 },
        total: 23.18,
        unit: '1 человек в месяц',
        note: t('TariffsIndividualCardPreferential')
    }
];

export const getLegalTariff = (t: (key: string) => string) => ({
    title: t('TariffsIndLegalCardTitle'),
    icon: 'building',
    baseTariff: 361.00,
    vat: { rate: 12, amount: 43.32 },
    nsp: { rate: 2, amount: 7.22 },
    total: 411.54,
    unit: '1 м³ ТБО',
    note: t('TariffsIndLegalCardWaste')
});

export const getSummaryTable = (t: (key: string) => string) => ({
    title: t('TariffsTableTitle'),
    columns: [t('TariffsTableCardCategory'), t('TariffsTableCardUnit'), t('TariffsTableCardBase'), t('TariffsTableCardFees'), t('TariffsTableCardTotal')],
    rows: [
        {
            category: t('TariffsTableCardPopulation'),
            unit: t('TariffsTableCardPeople'),
            baseTariff: '41.00 сом',
            taxes: 'НСП 3%: 1.23 сом',
            total: '42.23 сом'
        },
        {
            category: t('TariffsTableCardPensioners'),
            unit: t('TariffsTableCardPeople'),
            baseTariff: '22.50 сом',
            taxes: 'НСП 3%: 0.68 сом',
            total: '23.18 сом'
        },
        {
            category: t('TariffsTableCardLegal'),
            unit: '1 м³ ТБО',
            baseTariff: '361.00 сом',
            taxes: 'НДС 12%: 43.32 сом<br/>НСП 2%: 7.22 сом',
            total: '411.54 сом'
        }
    ]
});

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