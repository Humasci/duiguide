'use client';
import { useEffect, useRef } from 'react';

interface MapMarker {
  lat: number;
  lng: number;
  name: string;
  type: string;
}

interface SimpleMapProps {
  center: { lat: number; lng: number };
  markers: MapMarker[];
}

export default function SimpleMap({ center, markers }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current || !window.google) {
      console.log('Google Maps not loaded yet');
      return;
    }
    
    try {
      const map = new google.maps.Map(mapRef.current, {
        center: center,
        zoom: 12,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "poi",
            "stylers": [{ "visibility": "off" }]
          }
        ]
      });
      
      markers.forEach(marker => {
        if (marker.lat && marker.lng) {
          const mapMarker = new google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map: map,
            title: marker.name,
            icon: marker.type === 'court' ? {
              url: '/court-icon.png',
              scaledSize: new google.maps.Size(40, 40)
            } : undefined
          });
          
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-bold">${marker.name}</h3>
                <p class="text-sm text-gray-600">${marker.type.replace('_', ' ').toUpperCase()}</p>
              </div>
            `
          });
          
          mapMarker.addListener('click', () => {
            infoWindow.open(map, mapMarker);
          });
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [center, markers]);
  
  // Fallback if Google Maps is not available
  if (typeof window !== 'undefined' && !window.google) {
    return (
      <div className="w-full h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">🗺️</div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={mapRef} 
      className="w-full h-[500px] rounded-lg shadow-lg" 
    />
  );
}