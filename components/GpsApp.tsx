import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + React using reliable CDN
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

/**
 * HELPER: ChangeView
 * This component handles the 'Real-Time' movement. 
 * When the position changes, it forces the Leaflet engine to re-center.
 */
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

interface GpsAppProps {
  onBackToHome?: () => void;
}

const GpsApp: React.FC<GpsAppProps> = ({ onBackToHome }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Hardware not detected");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        console.log("AuraOS: Satellite Lock Established");
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setError(null);
      },
      (err) => {
        console.warn(`GPS Warning (${err.code}): ${err.message}`);
        if (err.code === 3 || err.code === 1) {
          // Fallback to lower accuracy if Satellite (GPS) times out
          navigator.geolocation.getCurrentPosition(
            (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
            (e) => setError("Signal acquisition failed"),
            { enableHighAccuracy: false }
          );
        }
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="h-full w-full bg-[#050505] overflow-hidden rounded-lg flex flex-col font-sans">
      {/* Header with AuraOS Branding */}
      <div className="p-4 glass-dark flex justify-between items-center border-b border-white/10 shrink-0 z-[1000]">
        <div className="flex flex-col">
          <h2 className="text-xs font-black uppercase tracking-widest text-blue-400">Neural GPS Signal</h2>
          {onBackToHome && (
             <button 
               onClick={onBackToHome} 
               className="text-[9px] text-white/30 text-left hover:text-white/60 transition-colors uppercase mt-1"
             >
               ← Return to Nexus
             </button>
          )}
        </div>
        <div className="flex items-center gap-2">
           <span className={`w-2 h-2 rounded-full animate-pulse ${position ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
           <span className="text-[10px] text-white/50 uppercase tracking-tighter font-mono">
             {position ? 'LINK_ACTIVE' : 'SEARCHING...'}
           </span>
        </div>
      </div>
      
      {/* Primary Map Interface */}
      <div className="flex-1 relative bg-[#0a0a0a]">
        {position ? (
          <MapContainer 
            center={position} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <ChangeView center={position} />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap'
            />
            <Marker position={position}>
              <Popup className="terminal-text">
                <div className="p-1">
                  <strong className="text-blue-500 uppercase text-[10px]">Active Node</strong><br/>
                  <span className="text-[9px] opacity-70">LAT: {position[0].toFixed(4)}</span><br/>
                  <span className="text-[9px] opacity-70">LON: {position[1].toFixed(4)}</span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-6">
             <div className="relative">
                <div className="w-16 h-16 border-2 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                </div>
             </div>
             <div className="text-center space-y-2">
               <p className="terminal-text text-[10px] text-blue-400 tracking-[0.4em] animate-pulse">ACQUIRING_COORDS</p>
               <p className="text-[9px] text-white/20 uppercase max-w-[200px] leading-relaxed">
                 Waiting for hardware permission to synchronize with local satellite cluster...
               </p>
               {error && <p className="text-[9px] text-red-500/60 font-bold uppercase">{error}</p>}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GpsApp;
