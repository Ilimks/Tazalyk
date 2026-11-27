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
