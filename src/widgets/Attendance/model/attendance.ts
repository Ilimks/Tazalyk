import { Attendance } from "./types";

// Названия услуг — в сообщениях Attendance.items.<category>.<id>, единицы — в Attendance.units
export const materialServices: Attendance[] = [
    { id: 1, unit: 'pcs', price: 6050.16, category: 'material' },
    { id: 2, unit: 'sqm', price: 580.0, category: 'material' },
    { id: 3, unit: 'pcs', price: 376.98, category: 'material' },
    { id: 4, unit: 'pcs', price: 536.03, category: 'material' },
    { id: 5, unit: 'pcs', price: 1233.62, category: 'material' },
    { id: 6, unit: 'pcs', price: 4629.75, category: 'material' },
    { id: 7, unit: 'pcs', price: 2319.73, category: 'material' },
    { id: 8, unit: 'set', price: 6373.47, category: 'material' },
    { id: 9, unit: 'set', price: 5078.55, category: 'material' },
    { id: 10, unit: 'pcs', price: 10174.33, category: 'material' },
    { id: 11, unit: 'pcs', price: 8756.49, category: 'material' },
];

export const transportServices: Attendance[] = [
    { id: 1, unit: 'trip', price: 5224.0, category: 'transport' },
    { id: 2, unit: 'trip', price: 6495.94, category: 'transport' },
    { id: 3, unit: 'trip', price: 7810.88, category: 'transport' },
    { id: 4, unit: 'trip', price: 9837.10, category: 'transport' },
    { id: 5, unit: 'hour', price: 2679.80, category: 'transport' },
    { id: 6, unit: 'trip', price: 3396.20, category: 'transport' },
    { id: 7, unit: 'trip', price: 5326.49, category: 'transport' },
    { id: 8, unit: 'trip', price: 3988.31, category: 'transport' },
    { id: 9, unit: 'trip', price: 5884.47, category: 'transport' },
    { id: 10, unit: 'trip', price: 6706.20, category: 'transport' },
    { id: 11, unit: 'trip', price: 6001.0, category: 'transport' },
    { id: 12, unit: 'trip', price: 9044.93, category: 'transport' },
    { id: 13, unit: 'trip', price: 4645.47, category: 'transport' },
    { id: 14, unit: 'trip', price: 6836.13, category: 'transport' },
    { id: 15, unit: 'trip', price: 5265.07, category: 'transport' },
    { id: 16, unit: 'trip', price: 3460.32, category: 'transport' },
    { id: 17, unit: 'hour', price: 700.53, category: 'transport' },
];