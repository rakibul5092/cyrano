export interface PositionModel {
  lat: number;
  lng: number;
}

export type PositionCallback = (position: PositionModel) => void;
