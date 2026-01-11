import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Tactical Icons Fix
const iconBlue = new L.Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41] });
const iconRed = new L.Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41] });

// Helper: Auto-centers the map when location changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
    setTimeout(() => map.invalidateSize(), 300);
  }, [center, map]);
  return null;
}

const GpsApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cameras, setCameras] = useState<[number, number][]>([]);
  const [trafficNodes, setTrafficNodes] = useState<[number, number][]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // 1. Core Hardware Sync
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 2. Tactical Scanning (Hidden Cameras & Traffic)
  const runNeuralScan = () => {
    if (!position) return;
    setIsScanning(true);
    // Simulate real-time hardware discovery within 4-5 blocks
    setTimeout(() => {
      const newCameras: [number, number][] = Array(4).fill(0).map(() => [
        position[0] + (Math.random() - 0.5) * 0.01,
        position[1] + (Math.random() - 0.5) * 0.01
      ]);
      const newTraffic: [number, number][] = Array(6).fill(0).map(() => [
        position[0] + (Math.random() - 0.5) * 0.012,
        position[1] + (Math.random() - 0.5) * 0.012
      ]);
      setCameras(newCameras);
      setTrafficNodes(newTraffic);
      setIsScanning(false);
    }, 2000);
  };

  // 3. Sync to CHAT (Simulated)
  const shareLocation = () => {
    if (!position) return;
    const locString = `LAT:${position[0].toFixed(4)} LON:${position[1].toFixed(4)}`;
    alert(`SENT TO CHAT: My current coordinates are ${locString}`);
    // In your real CHAT app, you would push this to your Firebase Messages collection
  };

  if (!position) return <div className="h-full bg-black flex items-center justify-center text-blue-500 font-mono animate-pulse">ESTABLISHING_SATELLITE_LINK...</div>;

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white font-mono">
      {/* Search & UI Overlay */}
      <div className="absolute top-4 left-4 right-4 z-[1000] space-y-2">
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-black/80 border border-blue-500/30 p-2 text-xs rounded shadow-lg backdrop-blur-md"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={onBackToHome} className="bg-red-900/40 p-2 rounded border border-red-500/50 text-[10px]">EXIT</button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button onClick={runNeuralScan} className="bg-blue-600 p-2 rounded text-[10px] whitespace-nowrap shadow-lg uppercase">
            {isScanning ? 'Scanning...' : 'Scan Hidden Cameras'}
          </button>
          <button onClick={shareLocation} className="bg-emerald-600 p-2 rounded text-[10px] whitespace-nowrap shadow-lg uppercase">
            Share to Chat
          </button>
        </div>
      </div>

      {/* The Map Layer */}
      <div className="flex-1 relative">
        <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <MapController center={position} />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          
          {/* User Location */}
          <Marker position={position} icon={iconBlue}>
            <Popup className="custom-popup">YOU ARE HERE</Popup>
          </Marker>

          {/* Hidden Camera Discovery (4 Street Radius) */}
          {cameras.map((cam, i) => (
            <React.Fragment key={`cam-${i}`}>
              <Marker position={cam} icon={iconRed} />
              <Circle center={cam} radius={100} pathOptions={{ color: 'red', fillOpacity: 0.1 }} />
            </React.Fragment>
          ))}

          {/* Traffic Data (5 Street Radius) */}
          {trafficNodes.map((trf, i) => (
            <Circle key={`trf-${i}`} center={trf} radius={200} pathOptions={{ color: 'orange', fillOpacity: 0.3 }} />
          ))}
        </MapContainer>
      </div>

      {/* Footer Data */}
      <div className="p-3 bg-black border-t border-blue-500/20 text-[9px] flex justify-between uppercase">
        <span className="text-blue-400">Nodes: {cameras.length} Cameras Detected</span>
        <span className="text-orange-400">Traffic: High Density (5 Streets)</span>
      </div>
    </div>
  );
};

export default GpsApp;
