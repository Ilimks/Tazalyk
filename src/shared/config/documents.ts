import { DocumentCard } from "@/entities/procurement/model/types";
import { useTranslations } from "next-intl";

export const getDocumentsConfig = (t: ReturnType<typeof useTranslations>): DocumentCard[] => [
    {
        id: 'rules',
        title: t('ProcurementFilesCardTitle1'),
        description: t('ProcurementFilesCardDescription1'),
        pdfUrl: '/assets/documents/Правила закупок МП Тазалык от 01-08-24 (1).PDF',
        fileName: 'Правила закупок МП Тазалык от 01-08-24.PDF',
        icon: 'document',
        modalContent: {
            title: t('ProcurementFilesCModalTitle1'),
            sections: [
                {
                    title: t('ProcurementModal.rules.section1Title'),
                    content: t('ProcurementModal.rules.section1Content')
                },
                {
                    title: t('ProcurementModal.rules.section2Title'),
                    content: t.raw('ProcurementModal.rules.section2List')
                },
                {
                    title: t('ProcurementModal.rules.section3Title'),
                    content: t.raw('ProcurementModal.rules.section3List')
                },
                {
                    title: t('ProcurementModal.rules.section4Title'),
                    content: t('ProcurementModal.rules.section4Content')
                },
                {
                    title: t('ProcurementModal.rules.section5Title'),
                    content: t('ProcurementModal.rules.section5Content')
                }
            ],
            footer: t('ProcurementModal.rules.footer')
        }
    },
    {
        id: 'order',
        title: t('ProcurementFilesCardTitle2'),
        description: t('ProcurementFilesCardDescription2'),
        pdfUrl: '/assets/documents/Приказ ГАУГИ КР № 533-П.pdf',
        fileName: 'Приказ ГАУГИ КР № 533-П.pdf',
        icon: 'order',
        modalContent: {
            title: t('ProcurementFilesCModalTitle2'),
            sections: [
                {
                    title: t('ProcurementModal.order.mainTitle'),
                    content: t('ProcurementModal.order.mainContent')
                },
                {
                    title: t('ProcurementModal.order.section1Title'),
                    content: t.raw('ProcurementModal.order.section1List') // ✅ FIX
                },
                {
                    title: t('ProcurementModal.order.section2Title'),
                    content: t.raw('ProcurementModal.order.section2List') // ✅ FIX
                },
                {
                    title: t('ProcurementModal.order.section3Title'),
                    content: t.raw('ProcurementModal.order.section3List') // ✅ FIX
                },
                {
                    title: t('ProcurementModal.order.section4Title'),
                    content: t('ProcurementModal.order.section4Content')
                },
                {
                    title: t('ProcurementModal.order.section5Title'),
                    content: t('ProcurementModal.order.section5Content')
                }
            ],
            footer: t('ProcurementModal.order.footer')
        }
    }
];