// ──────────────────────────────────────────────────────────────────────────────
// Mapbox Provider (WGS84)
// Alternative to Google Maps
// ──────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react';
import type { MapViewProps } from '../index';

declare global {
  interface Window {
    mapboxgl: any;
  }
}

export default function MapboxMap({
  center,
  zoom = 12,
  markers = [],
  className = '',
  style
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const markersRef = useRef<any[]>([]);

  // Load Mapbox script
  useEffect(() => {
    if (window.mapboxgl) {
      setIsLoaded(true);
      return;
    }

    const token = process.env.REACT_APP_MAPS_MAPBOX_TOKEN;

    if (!token) {
      console.error('Mapbox token not found');
      return;
    }

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.async = true;

    script.onload = () => {
      window.mapboxgl.accessToken = token;
      setIsLoaded(true);
    };

    document.head.appendChild(script);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const newMap = new window.mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [center.lng, center.lat],
      zoom
    });

    newMap.addControl(new window.mapboxgl.NavigationControl());

    setMap(newMap);
  }, [isLoaded, center, zoom]);

  // Update markers
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const popup = markerData.description
        ? new window.mapboxgl.Popup().setHTML(
            `<div><strong>${markerData.title || ''}</strong><p>${markerData.description}</p></div>`
          )
        : null;

      const marker = new window.mapboxgl.Marker()
        .setLngLat([markerData.lng, markerData.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [map, markers, isLoaded]);

  // Update center
  useEffect(() => {
    if (map) {
      map.setCenter([center.lng, center.lat]);
    }
  }, [map, center]);

  if (!isLoaded) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={style || { width: '100%', height: 360 }}
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return <div ref={mapRef} className={className} style={style || { width: '100%', height: 360 }} />;
}
