export interface Attendance {
    id: number;
    name: string;
    unit: string;
    price: number;
    category: 'material' | 'transport';
}

export type AttendanceCategory = 'material' | 'transport';