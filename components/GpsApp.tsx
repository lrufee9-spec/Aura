import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

// Define the interface to accept the prop from AppContent router
interface GpsAppProps {
  onBackToHome?: () => void;
}

const GpsApp: React.FC<GpsAppProps> = ({ onBackToHome }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        console.log("AuraOS: Position Locked");
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setError(null);
      },
      (err) => {
        console.warn(`GPS Warning (${err.code}): ${err.message}`);
        
        // Error Code 1 = Permission Denied
        // Error Code 3 = Timeout
        if (err.code === 3 || err.code === 1) {
          // Fallback to standard accuracy if High Accuracy fails
          navigator.geolocation.getCurrentPosition(
            (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
            (e) => setError("Could not acquire signal"),
            { enableHighAccuracy: false }
          );
        }
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, // 10 second timeout 
        maximumAge: 0 
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="h-full w-full bg-[#050505] overflow-hidden rounded-lg flex flex-col">
      {/* OS Header Bar */}
      <div className="p-4 glass-dark flex justify-between items-center border-b border-white/10 shrink-0">
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
           <span className="text-[10px] text-white/50 uppercase tracking-tighter">
             {position ? 'Satellite Link Active' : 'Acquiring Signal...'}
           </span>
        </div>
      </div>
      
      {/* Map or Loading State */}
      <div className="flex-1 relative">
        {position ? (
          <MapContainer 
            center={position} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap'
            />
            <Marker position={position}>
              <Popup className="terminal-text">
                <span className="text-blue-500 font-bold">AuraOS NODE</span><br/>
                Lat: {position[0].toFixed(4)}<br/>
                Lon: {position[1].toFixed(4)}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]">
             <div className="w-12 h-12 border-2 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
             <div className="text-center">
               <p className="terminal-text text-[10px] text-blue-400 tracking-[0.3em] animate-pulse">SYNCHRONIZING...</p>
               {error && <p className="text-[9px] text-red-500/60 mt-2 uppercase">{error}</p>}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GpsApp;
