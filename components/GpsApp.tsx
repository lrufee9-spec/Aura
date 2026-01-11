import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
L.Marker.prototype.options.icon = DefaultIcon;

// Define the interface to accept the prop from AppContent
interface GpsAppProps {
  onBackToHome?: () => void;
}

const GpsApp: React.FC<GpsAppProps> = ({ onBackToHome }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Real-time tracking logic
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.error("GPS Error:", err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="h-full w-full bg-[#050505] overflow-hidden rounded-lg">
      <div className="p-4 glass-dark flex justify-between items-center border-b border-white/10">
        <div className="flex flex-col">
          <h2 className="text-xs font-black uppercase tracking-widest text-blue-400">Neural GPS Signal</h2>
          {onBackToHome && (
             <button onClick={onBackToHome} className="text-[9px] text-white/30 text-left hover:text-white/60 transition-colors uppercase">
               ← Return to Nexus
             </button>
          )}
        </div>
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
           <span className="text-[10px] text-white/50 uppercase tracking-tighter">Satellite Link Active</span>
        </div>
      </div>
      
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: 'calc(100% - 60px)', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap'
          />
          <Marker position={position}>
            <Popup className="terminal-text">AuraOS Instance Detected</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]">
           <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
           <p className="terminal-text text-[10px] text-blue-400 tracking-[0.2em] animate-pulse">ACQUIRING COORDS...</p>
        </div>
      )}
    </div>
  );
};

export default GpsApp;
