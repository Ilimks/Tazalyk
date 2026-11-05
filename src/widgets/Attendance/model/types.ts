export interface Attendance {
    id: number;
    unit: AttendanceUnit;
    price: number;
    category: 'material' | 'transport';
}

export type AttendanceCategory = 'material' | 'transport';

export type AttendanceUnit = 'pcs' | 'sqm' | 'set' | 'trip' | 'hour';