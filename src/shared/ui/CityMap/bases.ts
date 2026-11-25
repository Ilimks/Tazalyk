// Базы предприятия на карте. Точки сверены 25.11.2026: Ростовская — въезд у здания 19б,
// Ала-Арчинская — внутри геозоны «База 2» системы слежения за техникой.
// Названия и адреса — в переводах, раздел CityMap.
export type BaseId = 1 | 2;

export interface CityBase {
  id: BaseId;
  lat: number;
  lon: number;
}

export const BASES: CityBase[] = [
  { id: 1, lat: 42.88697, lon: 74.5653 },
  { id: 2, lat: 42.88567, lon: 74.57351 },
];
