// ──────────────────────────────────────────────────────────────────────────────
// Baidu Maps Provider (BD-09)
// Alternative for mainland China
// IMPORTANT: Uses BD-09 coordinate system (different from GCJ-02)
// ──────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react';
import type { MapViewProps } from '../index';

declare global {
  interface Window {
    BMap: any;
  }
}

export default function BaiduMap({
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

  // Load Baidu Maps script
  useEffect(() => {
    if (window.BMap) {
      setIsLoaded(true);
      return;
    }

    const apiKey = process.env.REACT_APP_MAPS_BAIDU_AK;

    if (!apiKey) {
      console.error('Baidu Maps API key not found');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${apiKey}`;
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    document.head.appendChild(script);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const newMap = new window.BMap.Map(mapRef.current);
    const point = new window.BMap.Point(center.lng, center.lat);
    newMap.centerAndZoom(point, zoom);
    newMap.enableScrollWheelZoom(true);

    setMap(newMap);
  }, [isLoaded, center, zoom]);

  // Update markers
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeOverlay(marker));
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const point = new window.BMap.Point(markerData.lng, markerData.lat);
      const marker = new window.BMap.Marker(point);
      map.addOverlay(marker);

      if (markerData.title || markerData.description) {
        marker.addEventListener('click', () => {
          const infoWindow = new window.BMap.InfoWindow(
            `<div><strong>${markerData.title || ''}</strong><p>${markerData.description || ''}</p></div>`
          );
          map.openInfoWindow(infoWindow, point);
        });
      }

      markersRef.current.push(marker);
    });
  }, [map, markers, isLoaded]);

  // Update center
  useEffect(() => {
    if (map) {
      const point = new window.BMap.Point(center.lng, center.lat);
      map.setCenter(point);
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
