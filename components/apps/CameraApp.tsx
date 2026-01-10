import React, { useRef, useState, useEffect } from 'react';

interface CapturedPhoto {
  dataUrl: string;
  timestamp: number;
  id: string;
}

const CameraApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeMode, setActiveMode] = useState<'photo' | 'ai' | 'filter' | 'settings'>('photo');
  const [currentFilter, setCurrentFilter] = useState('none');
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [flashActive, setFlashActive] = useState(false);

  const FILTERS = [
    { id: 'none', name: 'Standard', class: '' },
    { id: 'thermal', name: 'Thermal Link', class: 'invert hue-rotate-180 contrast-200' },
    { id: 'night', name: 'Night Ops', class: 'sepia(100%) saturate(300%) brightness(70%) hue-rotate(60deg)' },
    { id: 'cyber', name: 'Cyber Cyan', class: 'saturate-200 contrast-125 brightness-110 sepia(30%) hue-rotate(140deg)' },
    { id: 'noir', name: 'Noir Grid', class: 'grayscale(100%) contrast-150' },
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      setError("Biometric Optic initialization failed. Please verify hardware permissions.");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    // Visual flash effect
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 150);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Apply current filter to canvas
      const filterObj = FILTERS.find(f => f.id === currentFilter);
      ctx.filter = filterObj?.class || 'none';
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedPhoto({
        dataUrl,
        timestamp: Date.now(),
        id: `img-${Math.random().toString(36).substr(2, 9)}`
      });
    }
  };

  const handleEnhance = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Neural Upscale Complete: ISO noise reduced by 42%. Image resolution doubled.");
    }, 2000);
  };

  const saveToVault = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Synchronization Successful: Image stored in Secure Vault.");
      setCapturedPhoto(null);
    }, 1500);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative font-inter">
      {/* HUD Sidebar */}
      <aside className="w-16 md:w-72 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-5">
          <button onClick={onBackToHome} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group active:scale-95 shadow-lg">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="hidden md:block">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Nexus Core</span>
             <h2 className="text-sm font-black text-white uppercase tracking-widest">Imaging Suite</h2>
          </div>
        </div>

        <nav className="flex-1 p-4 md:p-6 space-y-3 mt-4">
          {[
            { id: 'photo', label: 'Optic Mode', icon: '📷' },
            { id: 'ai', label: 'Neural Vision', icon: '🤖' },
            { id: 'filter', label: 'Tactical Filters', icon: '🌈' },
            { id: 'settings', label: 'Optic Config', icon: '⚙️' },
          ].map(mode => (
            <button 
              key={mode.id}
              onClick={() => { setActiveMode(mode.id as any); setCapturedPhoto(null); }}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                activeMode === mode.id ? 'bg-slate-700 text-white shadow-xl shadow-slate-900/50' : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-2xl">{mode.icon}</span>
              <span className="hidden md:block">{mode.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
           <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.02] text-center">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Sensor Temp</p>
              <p className="text-xs font-black text-emerald-400">32°C STABLE</p>
           </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden bg-black">
        {capturedPhoto ? (
          /* REVIEW MODE */
          <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in zoom-in duration-500 relative">
             <div className="max-w-4xl w-full aspect-video glass rounded-[3rem] overflow-hidden border border-white/10 relative shadow-[0_0_80px_rgba(255,255,255,0.05)]">
                <img src={capturedPhoto.dataUrl} className="w-full h-full object-contain" />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-white/5 border-t-white rounded-full animate-spin" />
                  </div>
                )}
             </div>
             
             <div className="mt-12 flex items-center gap-6">
                <button onClick={() => setCapturedPhoto(null)} className="px-10 py-5 glass border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Discard</button>
                <button onClick={handleEnhance} className="px-10 py-5 glass border-cyan-500/20 text-cyan-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500/10 transition-all">Neural Enhance</button>
                <button onClick={saveToVault} className="px-12 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Sync to Vault</button>
             </div>
          </div>
        ) : (
          /* CAMERA LIVE MODE */
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
             {error ? (
                <div className="text-center p-12 glass rounded-[3rem] border-rose-500/20 max-w-sm">
                   <div className="text-6xl mb-6">⚠️</div>
                   <h3 className="text-xl font-black mb-2 text-rose-500">Hardware Error</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">{error}</p>
                </div>
             ) : (
                <div className="w-full h-full relative group">
                   <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className={`w-full h-full object-cover transition-all duration-700 ${FILTERS.find(f => f.id === currentFilter)?.class}`}
                      style={{ transform: `scale(${zoom})` }}
                   />
                   
                   {/* HUD OVERLAYS */}
                   <div className="absolute inset-0 pointer-events-none p-12 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                         <div className="space-y-2">
                            <div className="flex gap-2 items-center">
                               <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Rec Link Active</span>
                            </div>
                            <p className="text-xs font-mono text-white/40">ISO 400 • F/1.8 • 1/120</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Buffer</p>
                            <p className="text-xs font-mono text-emerald-400">98% SECURE</p>
                         </div>
                      </div>

                      {/* AI VISION SIMULATION */}
                      {activeMode === 'ai' && (
                        <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-1000">
                           <div className="w-[30%] h-[30%] border border-cyan-500/40 rounded-xl relative">
                              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                              <div className="absolute -top-10 left-0 bg-cyan-500 text-black px-2 py-0.5 text-[8px] font-black uppercase">Identifying: Humanoid Proxy</div>
                              <div className="absolute -bottom-8 right-0 text-cyan-400 text-[8px] font-mono">CONFIDENCE: 94.8%</div>
                           </div>
                        </div>
                      )}

                      <div className="flex justify-center">
                         <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center opacity-40">
                            <div className="w-1 h-1 bg-white rounded-full" />
                         </div>
                      </div>
                   </div>

                   {/* Flash Overlay */}
                   {flashActive && <div className="absolute inset-0 bg-white z-[50]" />}
                </div>
             )}

             {/* BOTTOM CONTROLS */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 flex items-center justify-between z-30">
                <div className="w-48 glass p-3 rounded-2xl border-white/5 flex gap-2">
                   {['1x', '2x', '5x'].map(z => (
                     <button 
                      key={z} 
                      onClick={() => setZoom(parseInt(z))}
                      className={`flex-1 py-1.5 rounded-lg text-[9px] font-black transition-all ${zoom === parseInt(z) ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                     >
                       {z}
                     </button>
                   ))}
                </div>

                <button 
                   onClick={takePhoto}
                   disabled={!isStreaming}
                   className="w-24 h-24 rounded-full border-8 border-white/10 p-2 group active:scale-90 transition-transform disabled:opacity-20"
                >
                   <div className="w-full h-full bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:bg-slate-200 transition-colors" />
                </button>

                <div className="w-48 flex justify-end">
                   {activeMode === 'filter' && (
                     <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {FILTERS.map(f => (
                          <button 
                            key={f.id}
                            onClick={() => setCurrentFilter(f.id)}
                            className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                              currentFilter === f.id ? 'bg-white text-black border-white' : 'glass border-white/10 text-white/40'
                            }`}
                          >
                            {f.name}
                          </button>
                        ))}
                     </div>
                   )}
                </div>
             </div>
          </div>
        )}
      </div>

      {/* HIDDEN UTILITY CANVAS */}
      <canvas ref={canvasRef} className="hidden" />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CameraApp;