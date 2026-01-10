import React, { useState, useEffect } from 'react';

interface PadState {
  connected: boolean;
  id: string;
  battery: number;
}

const ControllerApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'pad' | 'tv' | 'settings'>('pad');
  const [pad, setPad] = useState<PadState>({ connected: false, id: '', battery: 0 });
  const [isScanning, setIsScanning] = useState(false);
  const [connectedTV, setConnectedTV] = useState<string | null>(null);

  useEffect(() => {
    const handleGamepadConnected = (e: GamepadEvent) => {
      setPad({
        connected: true,
        id: e.gamepad.id,
        battery: 85 // Mock battery for visualization
      });
    };

    const handleGamepadDisconnected = () => {
      setPad({ connected: false, id: '', battery: 0 });
    };

    window.addEventListener("gamepadconnected", handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

    // Initial check
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
      setPad({ connected: true, id: gamepads[0]!.id, battery: 85 });
    }

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected);
      window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
    };
  }, []);

  const scanForTVs = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      alert("Nexus Hub: Found 'Living Room OLED' and 'Gaming Monitor X'.");
    }, 2000);
  };

  const connectTV = (name: string) => {
    setConnectedTV(name);
    alert(`Success: NexusOS is now mirrored to ${name}.`);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative font-inter">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-[-20%] left-[-10%] w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent blur-[120px]" />
      </div>

      {/* Navigation Sidebar */}
      <aside className="w-16 md:w-72 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-5">
          <button onClick={onBackToHome} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group active:scale-95 shadow-lg">
            <svg className="w-6 h-6 text-violet-500 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="hidden md:block">
             <span className="text-[10px] font-black text-violet-500 uppercase tracking-[0.4em]">Hardware</span>
             <h2 className="text-sm font-black text-white uppercase tracking-widest">Controller</h2>
          </div>
        </div>

        <nav className="flex-1 p-4 md:p-6 space-y-3 mt-4">
          {[
            { id: 'pad', label: 'Pad Sync', icon: '🎮' },
            { id: 'tv', label: 'TV Bridge', icon: '📺' },
            { id: 'settings', label: 'Gaming Env', icon: '⚙️' },
          ].map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === cat.id ? 'bg-violet-600 text-white shadow-xl shadow-violet-600/30' : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="hidden md:block">{cat.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
           <div className={`glass p-6 rounded-3xl border transition-all ${pad.connected ? 'border-emerald-500/30' : 'border-white/5'}`}>
              <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pad Signal</span>
                 <span className={`text-[10px] font-black ${pad.connected ? 'text-emerald-400' : 'text-rose-500'}`}>
                    {pad.connected ? 'CONNECTED' : 'STANDBY'}
                 </span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className={`h-full transition-all duration-1000 ${pad.connected ? 'bg-emerald-500 w-full' : 'bg-gray-700 w-0'}`} />
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-24 flex items-center justify-between px-10 glass-dark border-b border-white/5 shrink-0">
           <div className="flex flex-col">
              <h3 className="text-2xl font-black uppercase tracking-tight">System Control</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Cross-Device Synchronization Active</p>
           </div>
           <div className="flex items-center gap-4">
              {connectedTV && (
                 <div className="bg-emerald-600/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase">Beaming: {connectedTV}</span>
                 </div>
              )}
           </div>
        </header>

        <main className="flex-1 overflow-auto p-10">
           {activeTab === 'pad' && (
             <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in duration-500">
                <div className="text-center">
                   <div className="w-32 h-32 bg-violet-600/10 rounded-[3rem] border border-violet-500/30 flex items-center justify-center text-7xl mx-auto mb-8 shadow-2xl animate-pulse">
                      🎮
                   </div>
                   <h2 className="text-3xl font-black mb-4">Wireless Pad Sync</h2>
                   <p className="text-gray-400 text-sm max-w-md mx-auto">Pair your PlayStation, Xbox, or Nexus controller via Bluetooth to play synced content games.</p>
                </div>

                {pad.connected ? (
                  <div className="glass-dark p-10 rounded-[4rem] border border-emerald-500/20 space-y-8">
                     <div className="flex justify-between items-center">
                        <div>
                           <h4 className="font-black text-emerald-400 uppercase text-xs tracking-widest">Active Device</h4>
                           <p className="text-lg font-bold text-white mt-1">{pad.id.split('(')[0]}</p>
                        </div>
                        <div className="text-right">
                           <h4 className="font-black text-gray-500 uppercase text-xs tracking-widest">Battery</h4>
                           <p className="text-lg font-bold text-white mt-1">{pad.battery}%</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Left Stick', 'Right Stick', 'Triggers', 'Vibration'].map(mod => (
                          <div key={mod} className="glass p-4 rounded-2xl border border-white/5 text-center">
                             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{mod}</p>
                             <p className="text-xs font-bold text-emerald-400 mt-2">OPTIMAL</p>
                          </div>
                        ))}
                     </div>
                     <button onClick={() => alert("Controller calibration started...")} className="w-full py-4 bg-violet-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-violet-500 transition-all active:scale-95 shadow-xl shadow-violet-600/20">Calibrate Controls</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                     <button onClick={() => { setIsScanning(true); setTimeout(() => setIsScanning(false), 3000); }} className="px-12 py-5 bg-white/5 border border-white/10 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-violet-600 transition-all group active:scale-95">
                        {isScanning ? 'Scanning for Pad...' : 'Start Wireless Pairing'}
                     </button>
                     {isScanning && (
                       <div className="mt-8 flex gap-2">
                          <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                       </div>
                     )}
                  </div>
                )}
             </div>
           )}

           {activeTab === 'tv' && (
             <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-500">
                <div className="flex justify-between items-end">
                   <div>
                      <h2 className="text-3xl font-black">Display Bridge</h2>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Beam NexusOS to Smart TVs and External Displays</p>
                   </div>
                   <button onClick={scanForTVs} className="px-6 py-2 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10">Scan for Devices</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { name: 'Living Room OLED', id: 'tv1', type: '4K TV', status: 'Available' },
                     { name: 'Gaming Monitor X', id: 'tv2', type: 'Nexus Display', status: 'Available' },
                     { name: 'Bedroom Projector', id: 'tv3', type: 'Smart Projector', status: 'Offline' },
                   ].map(tv => (
                     <div key={tv.id} className={`glass p-8 rounded-[3rem] border border-white/5 flex items-center justify-between group hover:border-violet-500/40 transition-all ${tv.status === 'Offline' ? 'opacity-40' : ''}`}>
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">📺</div>
                           <div>
                              <h4 className="font-bold text-lg">{tv.name}</h4>
                              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{tv.type}</p>
                           </div>
                        </div>
                        {tv.status !== 'Offline' && (
                          <button 
                            onClick={() => connectTV(tv.name)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                              connectedTV === tv.name ? 'bg-emerald-600 text-white' : 'bg-violet-600/10 text-violet-400 border border-violet-500/20 hover:bg-violet-600 hover:text-white'
                            }`}
                          >
                             {connectedTV === tv.name ? 'Connected' : 'Sync'}
                          </button>
                        )}
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'settings' && (
             <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
                <h2 className="text-3xl font-black">Gaming Environment</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="glass-dark p-10 rounded-[4rem] border border-white/5 space-y-8">
                      <h4 className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Performance Sync</h4>
                      {[
                        { label: 'Low Latency Mode', active: true },
                        { label: 'HDR10+ Graphics', active: true },
                        { label: 'Cloud Save Sync', active: false },
                        { label: 'Auto-Display Scale', active: true }
                      ].map((opt, i) => (
                        <div key={i} className="flex justify-between items-center">
                           <span className="text-sm font-bold text-gray-300">{opt.label}</span>
                           <div className={`w-10 h-5 rounded-full flex items-center px-1 border border-white/10 ${opt.active ? 'bg-violet-600 justify-end' : 'bg-white/5 justify-start'}`}>
                              <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="glass-dark p-10 rounded-[4rem] border border-white/5 space-y-8">
                      <h4 className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Audio Profile</h4>
                      <div className="space-y-4">
                         {['Nexus Surround', 'Direct Passthrough', 'Pad Headphones'].map(prof => (
                           <button key={prof} className="w-full p-5 glass border-white/5 rounded-2xl text-left text-xs font-bold hover:bg-violet-600 transition-all group">
                              <span className="group-hover:text-white transition-colors">{prof}</span>
                           </button>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="bg-violet-600/10 border border-violet-500/20 p-8 rounded-[3rem] text-center">
                   <h3 className="text-lg font-black mb-2">Content App Bridge</h3>
                   <p className="text-xs text-gray-500 font-medium mb-6">NexusOS automatically synchronizes your controller settings with the Gaming tab in your Content app.</p>
                   <button className="px-10 py-3 bg-violet-600 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">Update Content Prefs</button>
                </div>
             </div>
           )}
        </main>
      </div>

      {/* Controller Mapping Animation CSS */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default ControllerApp;