// ──────────────────────────────────────────────────────────────────────────────
// AMap (Gaode) Provider (GCJ-02)
// Used for mainland China - required by Chinese regulations
// IMPORTANT: Coordinates must be in GCJ-02 format
// ──────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react';
import type { MapViewProps } from '../index';

declare global {
  interface Window {
    AMap: any;
  }
}

export default function AmapMap({
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

  // Load AMap script
  useEffect(() => {
    if (window.AMap) {
      setIsLoaded(true);
      return;
    }

    const apiKey = process.env.REACT_APP_MAPS_AMAP_KEY;

    if (!apiKey) {
      console.error('AMap API key not found');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${apiKey}`;
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load AMap script');
    };

    document.head.appendChild(script);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const newMap = new window.AMap.Map(mapRef.current, {
      center: [center.lng, center.lat], // AMap uses [lng, lat] order
      zoom,
      resizeEnable: true
    });

    setMap(newMap);
  }, [isLoaded, center, zoom]);

  // Update markers
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => map.remove(marker));
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const marker = new window.AMap.Marker({
        position: [markerData.lng, markerData.lat], // [lng, lat] order
        title: markerData.title,
        map
      });

      if (markerData.description) {
        const infoWindow = new window.AMap.InfoWindow({
          content: `<div><strong>${markerData.title || ''}</strong><p>${markerData.description}</p></div>`
        });

        marker.on('click', () => {
          infoWindow.open(map, marker.getPosition());
        });
      }

      markersRef.current.push(marker);
    });
  }, [map, markers, isLoaded]);

  // Update center when prop changes
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
        <p className="text-gray-500">加载地图中... / Loading map...</p>
      </div>
    );
  }

  return <div ref={mapRef} className={className} style={style || { width: '100%', height: 360 }} />;
}
