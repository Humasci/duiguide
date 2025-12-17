'use client';
import { useState } from 'react';

interface ServiceLocation {
  id: number;
  type: 'court' | 'dmv' | 'jail' | 'scram_provider';
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  website?: string;
  hours?: string;
  lat: number;
  lng: number;
  notes?: string;
  cost_info?: string;
}

interface BuildingsServicesListProps {
  locations: ServiceLocation[];
}

export default function BuildingsServicesList({ locations }: BuildingsServicesListProps) {
  const [filter, setFilter] = useState<string>('all');
  
  const filtered = locations.filter(loc => 
    filter === 'all' || loc.type === filter
  );
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'court': return 'bg-red-100 text-red-800 border-red-300';
      case 'dmv': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'jail': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'scram_provider': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'court': return '⚖️';
      case 'dmv': return '🏛️';
      case 'jail': return '🏢';
      case 'scram_provider': return '📱';
      default: return '📍';
    }
  };
  
  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'court', 'dmv', 'scram_provider'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === type 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type === 'all' ? 'All' : type.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>
      
      {/* List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((loc, i) => (
          <div key={i} className={`p-6 rounded-lg border-2 ${getTypeColor(loc.type)}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  <span className="text-xl">{getTypeIcon(loc.type)}</span>
                  {loc.name}
                </h3>
                <span className="text-xs font-bold uppercase tracking-wide">
                  {loc.type.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span>{loc.address}, {loc.city}, {loc.state} {loc.zip}</span>
              </div>
              
              {loc.phone && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href={`tel:${loc.phone}`} className="hover:underline">{loc.phone}</a>
                </div>
              )}
              
              {loc.hours && (
                <div className="text-gray-600 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>
                  Hours: {loc.hours}
                </div>
              )}
              
              {loc.website && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" />
                  </svg>
                  <a 
                    href={loc.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>
            
            {loc.cost_info && loc.type === 'scram_provider' && (
              <div className="p-3 bg-white/50 rounded mb-4 text-sm">
                <strong>Cost:</strong> {loc.cost_info}
              </div>
            )}
            
            {loc.notes && (
              <div className="p-3 bg-white/30 rounded mb-4 text-sm">
                <strong>Note:</strong> {loc.notes}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address + ', ' + loc.city + ', ' + loc.state)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Directions
              </a>
              {loc.phone && (
                <a 
                  href={`tel:${loc.phone}`}
                  className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Call
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <p>No {filter === 'all' ? '' : filter.replace('_', ' ')} locations found.</p>
        </div>
      )}
    </div>
  );
}