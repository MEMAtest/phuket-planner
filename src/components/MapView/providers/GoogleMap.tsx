// ──────────────────────────────────────────────────────────────────────────────
// Google Maps Provider (WGS84)
// Used for most countries outside mainland China
// ──────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react';
import type { MapViewProps } from '../index';

declare global {
  interface Window {
    google: any;
    initGoogleMap: () => void;
  }
}

export default function GoogleMap({
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

  // Load Google Maps script
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    const apiKey = import.meta.env.VITE_MAPS_GOOGLE_KEY || process.env.REACT_APP_MAPS_GOOGLE_KEY;

    if (!apiKey) {
      console.error('Google Maps API key not found');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: center.lat, lng: center.lng },
      zoom,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    });

    setMap(newMap);
  }, [isLoaded, center, zoom]);

  // Update markers
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const marker = new window.google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map,
        title: markerData.title
      });

      if (markerData.description) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${markerData.title || ''}</strong><p>${markerData.description}</p></div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }

      markersRef.current.push(marker);
    });
  }, [map, markers, isLoaded]);

  // Update center when prop changes
  useEffect(() => {
    if (map) {
      map.setCenter({ lat: center.lat, lng: center.lng });
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
