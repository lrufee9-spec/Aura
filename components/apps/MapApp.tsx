import React, { useState, useEffect, useRef } from 'react';
import { AppId } from '../../types';

const MapApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMode, setActiveMode] = useState<'nav' | 'camera' | 'traffic'>('nav');
  const [isScanning, setIsScanning] = useState(false);
  const [detectedCameras, setDetectedCameras] = useState<Array<{x: number, y: number, id: string}>>([]);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation({ lat: 40.7128, lng: -74.0060 }) // Fallback to NYC
      );
    }
  }, []);

  const startNeuralScan = () => {
    setIsScanning(true);
    setDetectedCameras([]);
    setTimeout(() => {
      // Generate mock camera locations within 4-street "radius"
      const cams = Array.from({ length: 4 }).map((_, i) => ({
        id: `cam-${i}`,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      }));
      setDetectedCameras(cams);
      setIsScanning(false);
    }, 3000);
  };

  const handleShareToChat = () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      alert("Current coordinates synchronized and sent to active Nexus Chat sessions.");
    }, 1500);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative font-inter">
      {/* Navigation Sidebar */}
      <aside className="w-16 md:w-72 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-5">
          <button onClick={onBackToHome} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group active:scale-95 shadow-lg">
            <svg className="w-6 h-6 text-sky-500 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="hidden md:block">
             <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em]">Satellite</span>
             <h2 className="text-sm font-black text-white uppercase tracking-widest">Nexus GPS</h2>
          </div>
        </div>

        <nav className="flex-1 p-4 md:p-6 space-y-3 mt-4">
          {[
            { id: 'nav', label: 'Navigation', icon: '📍', color: 'sky' },
            { id: 'camera', label: 'Camera Scan', icon: '👁️', color: 'amber' },
            { id: 'traffic', label: 'Traffic Pulse', icon: '🚦', color: 'rose' },
          ].map(mode => (
            <button 
              key={mode.id}
              onClick={() => setActiveMode(mode.id as any)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                activeMode === mode.id ? 'bg-sky-600 text-white shadow-xl shadow-sky-600/30' : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-2xl">{mode.icon}</span>
              <span className="hidden md:block">{mode.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
           <button 
            onClick={handleShareToChat}
            className="w-full py-4 glass border-sky-500/20 text-sky-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-600 hover:text-white transition-all shadow-xl active:scale-95"
           >
             Sync to Chat
           </button>
        </div>
      </aside>

      {/* Main Map Interface */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-24 flex items-center justify-between px-10 glass-dark border-b border-white/5 shrink-0">
           <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Enter destination or neural coordinate..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 outline-none focus:ring-2 focus:ring-sky-500/50 transition-all font-medium text-sm"
                />
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
           </div>
           
           <div className="flex items-center gap-6 ml-10">
              <div className="text-right">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Satellites</p>
                 <p className="text-xs font-black text-emerald-400">12 SECURE NODES</p>
              </div>
           </div>
        </header>

        <main className="flex-1 relative bg-[#0a0a0a] overflow-hidden">
           {/* Futuristic Grid Map Simulation */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
           
           {/* Map Content Overlays */}
           <div className="absolute inset-0 p-10 flex items-center justify-center">
              <div className="relative w-full h-full border border-white/5 rounded-[4rem] overflow-hidden bg-black/40 backdrop-blur-sm">
                 
                 {/* Current Location Pulse */}
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center border border-sky-500/20 animate-pulse">
                       <div className="w-4 h-4 bg-sky-500 rounded-full shadow-[0_0_20px_rgba(14,165,233,1)]" />
                    </div>
                 </div>

                 {/* Traffic Overlays (5 Streets) */}
                 {activeMode === 'traffic' && (
                   <div className="absolute inset-0 pointer-events-none animate-in fade-in duration-700">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`absolute bg-rose-600/30 blur-xl h-1 rounded-full`} 
                             style={{ 
                               top: `${i * 15}%`, 
                               left: '10%', 
                               right: '10%',
                               opacity: Math.random() * 0.5 + 0.3
                             }} />
                      ))}
                      <div className="absolute top-10 right-10 glass p-4 rounded-2xl border border-rose-500/20">
                         <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Congestion Pulse: High</p>
                      </div>
                   </div>
                 )}

                 {/* Camera Discovery Nodes (4 Street Radius) */}
                 {activeMode === 'camera' && (
                   <div className="absolute inset-0 animate-in fade-in duration-500">
                      {isScanning && (
                         <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/40">
                            <div className="w-64 h-64 border-4 border-amber-500/20 rounded-full flex items-center justify-center relative">
                               <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin" />
                               <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">Neural Scanning...</span>
                            </div>
                         </div>
                      )}
                      
                      {detectedCameras.map(cam => (
                        <div key={cam.id} className="absolute group" style={{ left: `${cam.x}%`, top: `${cam.y}%` }}>
                           <div className="w-8 h-8 bg-amber-600/20 border border-amber-500/50 rounded-lg flex items-center justify-center animate-bounce shadow-lg">
                              👁️
                           </div>
                           <div className="absolute top-10 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-lg text-[8px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                              HIDDEN DEVICE DETECTED
                           </div>
                        </div>
                      ))}

                      <div className="absolute bottom-10 left-10 flex gap-4">
                         <button 
                          onClick={startNeuralScan}
                          disabled={isScanning}
                          className="px-8 py-3 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-amber-600/20 active:scale-95 transition-all"
                         >
                            Deep Security Scan
                         </button>
                      </div>
                   </div>
                 )}

                 {/* Navigation HUD */}
                 {activeMode === 'nav' && (
                   <div className="absolute bottom-10 right-10 w-80 glass-dark p-6 rounded-[2.5rem] border border-sky-500/20 animate-in slide-in-from-right-8 duration-500">
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <h4 className="text-xl font-black text-white">ETA 12m</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Destination: Nexus Tower</p>
                         </div>
                         <div className="text-sky-500 text-2xl font-black">↗</div>
                      </div>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <span>Signal Integrity</span>
                            <span className="text-emerald-400">100%</span>
                         </div>
                         <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-600 w-full" />
                         </div>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </main>
      </div>

      {/* Sharing Transition Overlay */}
      {isSharing && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center animate-in fade-in duration-500">
           <div className="w-20 h-20 border-4 border-white/5 border-t-sky-500 rounded-full animate-spin mb-8 shadow-[0_0_20px_rgba(14,165,233,0.5)]" />
           <p className="text-xl font-black text-white uppercase tracking-widest animate-pulse">Synchronizing Core Coordinates</p>
           <p className="mt-4 text-[9px] text-gray-600 font-black uppercase tracking-[0.4em]">Nexus OS Signal Bridge • Routing v4.2</p>
        </div>
      )}
    </div>
  );
};

export default MapApp;
