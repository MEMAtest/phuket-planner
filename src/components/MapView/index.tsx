// ──────────────────────────────────────────────────────────────────────────────
// MapView - Provider-agnostic map component
// Switches between Google Maps, Mapbox, AMap, or Baidu based on country config
// ──────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useCountry } from '../../state/CountryContext';
import GoogleMap from './providers/GoogleMap';
import AmapMap from './providers/AmapMap';
import MapboxMap from './providers/MapboxMap';
import BaiduMap from './providers/BaiduMap';

export type Marker = {
  id: string;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
};

export type MapViewProps = {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Marker[];
  className?: string;
  style?: React.CSSProperties;
};

export default function MapView(props: MapViewProps) {
  const { country } = useCountry();

  // Select provider based on country configuration
  switch (country.map.provider) {
    case 'google':
      return <GoogleMap {...props} />;
    case 'amap':
      return <AmapMap {...props} />;
    case 'mapbox':
      return <MapboxMap {...props} />;
    case 'baidu':
      return <BaiduMap {...props} />;
    default:
      return <GoogleMap {...props} />;
  }
}
