export const MAP_CIRCLE_RADIUS_KMS: number = 100000;
export const MAP_STYLES: google.maps.MapTypeStyle[] | null = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

export const MAP_OPTIONS: google.maps.MapOptions = {
  minZoom: 5,
  zoom: 7,
  styles: MAP_STYLES,
  fullscreenControl: false,
  zoomControl: false,
  keyboardShortcuts: false,
  panControl: false,
  disableDefaultUI: true,
};

export const MARKER_OPTIONS: google.maps.MarkerOptions = {
  draggable: false,
  clickable: true,
  optimized: false,
};

export const MARKER_OPTIONS_UNMATCHER: google.maps.MarkerOptions = {
  draggable: true,
  clickable: true,
  optimized: false,
};

export const CIRCLE_OPTIONS: google.maps.CircleOptions = {
  draggable: false,
  editable: true,
  strokeColor: '#fe3c72',
  fillColor: '#fe3c72',
  fillOpacity: 0.07,
  strokeWeight: 1.5,
};

export const MAP_ZOOM_POSITION = {
  1: 89.6,
  2: 44.8,
  3: 22.4,
  4: 11.2,
  5: 5.6,
  6: 2.8,
  7: 1.4,
  8: 0.7,
  9: 0.35,
  10: 0.175,
  11: 0.0875,
  12: 0.04375,
  13: 0.021875,
  14: 0.0109375,
  15: 0.00546875,
  16: 0.002734375,
  17: 0.0013671875,
  18: 0.00068359375,
  19: 0.000341796875,
  20: 0.0001708984375,
  21: 0.00008544921875,
  22: 0.000042724609375,
};
