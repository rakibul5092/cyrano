export interface MapMarkerModel {
  id: string;
  position: google.maps.LatLngLiteral;
  radius: number;
  icon: string | google.maps.Icon | google.maps.Symbol;
}
