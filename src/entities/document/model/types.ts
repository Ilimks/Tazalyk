export interface Document {
    id: string;
    title: string;
    file_url: string;
    file_name: string;
    file_size: number;
    date: string;
    created_at: string;
    updated_at: string;
}

export interface DocumentsState {
    items: Document[];
    loading: boolean;
    error: string | null;
    totalCount: number;
    currentPage: number;
    pageSize: number;
}