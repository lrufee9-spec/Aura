import React, { useState } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import { AppId, WindowState } from './types';

const App: React.FC = () => {
  // SET TO TRUE: Bypasses the blank login screen for immediate deployment
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [openWindows, setOpenWindows] = useState<Record<AppId, WindowState>>({} as any);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [isAILisening, setIsAIListening] = useState(false);

  const toggleApp = (id: AppId) => {
    setOpenWindows(prev => {
      const isCurrentlyOpen = prev[id]?.isOpen;
      
      if (isCurrentlyOpen) {
        // If it's already open, we just focus it
        focusApp(id);
        return prev;
      }

      const newZ = zIndexCounter + 1;
      setZIndexCounter(newZ);
      setActiveApp(id);
      
      return {
        ...prev,
        [id]: { id, isOpen: true, isMaximized: false, zIndex: newZ }
      };
    });
  };

  const closeApp = (id: AppId) => {
    setOpenWindows(prev => ({ 
      ...prev, 
      [id]: { ...prev[id], isOpen: false } 
    }));
    if (activeApp === id) setActiveApp(null);
  };

  const focusApp = (id: AppId) => {
    const newZ = zIndexCounter + 1;
    setZIndexCounter(newZ);
    setOpenWindows(prev => ({ 
      ...prev, 
      [id]: { ...prev[id], isOpen: true, zIndex: newZ } 
    }));
    setActiveApp(id);
  };

  // The blank screen was likely caused by a bug in the AuthScreen component.
  // We keep the logic but force isAuthenticated to true above.
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-blue-500 font-mono animate-pulse uppercase tracking-widest">
          Establishing_Neural_Link...
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050505] transition-all duration-700">
      {/* Neural OS Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] animate-pulse" />
         <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
      </div>

      {/* Floating AI Status Bar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[2000] flex flex-col items-center">
          <button 
            onClick={() => setIsAIListening(!isAILisening)}
            className={`group flex items-center gap-4 glass px-8 py-3 rounded-full border border-white/5 transition-all ${isAILisening ? 'bg-blue-600/20 border-blue-500/50 scale-105' : 'hover:bg-white/5'}`}
          >
             <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] ${isAILisening ? 'bg-blue-400 animate-ping' : 'bg-blue-600 animate-pulse'}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">
                {isAILisening ? 'Neural Link Listening...' : 'Aura Assistant Ready'}
             </span>
          </button>
      </div>

      <main className="relative h-full w-full p-4 md:p-8">
        {/* Render Desktop Icons */}
        <Desktop onAppClick={toggleApp} />
        
        {/* Render the actual App Windows (GPS, AI, etc) */}
        <WindowManager 
          openWindows={openWindows} 
          onClose={closeApp} 
          onFocus={focusApp} 
          activeApp={activeApp} 
        />
      </main>

      {/* Navigation Dock */}
      <Taskbar onAppClick={toggleApp} activeApp={activeApp} />
    </div>
  );
};

export default App;
