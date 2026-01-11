import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to handle map centering when coordinates are found
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
    // Fix for gray tiles: force Leaflet to recalculate container size
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [center, map]);
  return null;
}

interface GpsAppProps {
  onBackToHome?: () => void;
}

const GpsApp: React.FC<GpsAppProps> = ({ onBackToHome }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startTracking = () => {
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        setError(err.message);
        console.error("GPS Error:", err);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  useEffect(() => {
    // Initial hardware wake-up
    startTracking();

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.warn(err),
      { enableHighAccuracy: false, timeout: 15000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="h-full w-full bg-[#050505] flex flex-col overflow-hidden rounded-lg">
      {/* OS Header */}
      <div className="p-4 glass-dark flex justify-between items-center border-b border-white/10 shrink-0 z-[1001]">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Neural GPS Link</h2>
          {onBackToHome && (
            <button onClick={onBackToHome} className="text-[9px] text-white/30 text-left hover:text-white/60 transition-colors uppercase mt-1">
              ← Exit to Nexus
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-pulse ${position ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-[9px] text-white/40 font-mono">{position ? 'SATELLITE_LOCK' : 'NO_SIGNAL'}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative w-full h-full bg-[#080808]">
        {position ? (
          <MapContainer 
            center={position} 
            zoom={15} 
            style={{ height: '100%', width: '100%', zIndex: 1 }}
            zoomControl={false}
          >
            <ChangeView center={position} />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap'
            />
            <Marker position={position}>
              <Popup className="terminal-text text-black">AuraOS Node Detected</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center gap-6">
            <div className="relative">
               <div className="w-16 h-16 border-2 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
               </div>
            </div>
            <div className="space-y-2">
              <p className="text-blue-400 text-[10px] tracking-[0.4em] animate-pulse uppercase">Searching for hardware...</p>
              {error && <p className="text-red-500/60 text-[9px] uppercase font-mono">Status: {error}</p>}
            </div>
            <button 
              onClick={startTracking}
              className="px-6 py-2 border border-blue-500/30 text-blue-400 text-[9px] uppercase tracking-widest hover:bg-blue-500/10 transition-all active:scale-95"
            >
              Force Hardware Re-Sync
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GpsApp;
