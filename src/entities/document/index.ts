export { DocumentsCard } from './ui/DocumentsCard';
export { legislationApi, localActsApi } from './api/documentsApi';
export {
    fetchLocalActs,
    fetchLegislation,
    clearError,
    default as documentReducer,
} from './model/documentSlice';

export type { Document, DocumentsState } from './model/types';
