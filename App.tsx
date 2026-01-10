import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import { AppId, WindowState } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openWindows, setOpenWindows] = useState<Record<AppId, WindowState>>({} as any);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [isAILisening, setIsAIListening] = useState(false);

  const toggleApp = (id: AppId) => {
    setOpenWindows(prev => {
      const isCurrentlyOpen = prev[id]?.isOpen;
      
      if (isCurrentlyOpen) {
        return { ...prev, [id]: { ...prev[id], isOpen: false } };
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
    setOpenWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false } }));
    if (activeApp === id) setActiveApp(null);
  };

  const focusApp = (id: AppId) => {
    const newZ = zIndexCounter + 1;
    setZIndexCounter(newZ);
    setOpenWindows(prev => ({ ...prev, [id]: { ...prev[id], zIndex: newZ } }));
    setActiveApp(id);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050505] transition-all duration-700">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] animate-pulse" />
         <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
      </div>

      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[2000] flex flex-col items-center">
         <button 
           onClick={() => setIsAIListening(!isAILisening)}
           className={`group flex items-center gap-4 glass px-8 py-3 rounded-full border border-white/5 transition-all ${isAILisening ? 'bg-blue-600/20 border-blue-500/50 scale-105' : 'hover:bg-white/5'}`}
         >
            <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] ${isAILisening ? 'bg-blue-400 animate-ping' : 'bg-blue-600 animate-pulse'}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">
               {isAILisening ? 'Neural Link Listening...' : 'Hey Aura Assistant'}
            </span>
         </button>
      </div>

      <main className="relative h-full w-full p-4 md:p-8 flex flex-col items-center justify-center">
        <Desktop onAppClick={toggleApp} />
        <WindowManager openWindows={openWindows} onClose={closeApp} onFocus={focusApp} activeApp={activeApp} />
      </main>

      <Taskbar onAppClick={toggleApp} activeApp={activeApp} />
    </div>
  );
};

export default App;