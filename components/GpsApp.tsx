import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
    // This forces Leaflet to recalculate the container size
    setTimeout(() => {
      map.invalidateSize();
    }, 400);
  }, [center, map]);
  return null;
}

const GpsApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: '#050505', display: 'flex', flexDirection: 'column' }}>
      {/* OS Header */}
      <div className="p-4 flex justify-between items-center border-b border-white/10 shrink-0">
        <h2 className="text-xs font-bold text-blue-400">NEURAL GPS</h2>
        <span className="text-[10px] text-green-500 animate-pulse">● LIVE</span>
      </div>
      
      <div className="flex-1 w-full relative">
        {position ? (
          <MapContainer 
            center={position} 
            zoom={15} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', position: 'absolute' }}
          >
            <ChangeView center={position} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            <Marker position={position}>
              <Popup>You are here.</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-blue-400 text-xs tracking-widest animate-pulse">
            ACQUIRING SATELLITE...
          </div>
        )}
      </div>
    </div>
  );
};

export default GpsApp;
