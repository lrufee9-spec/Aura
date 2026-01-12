import React from 'react';
import { WindowState } from '../types';
// All apps are now imported from the same subfolder
import GpsApp from './apps/GpsApp'; 
import AIChatApp from './apps/AIChatApp'; 
import AppContent from './apps/AppContent';

interface WindowManagerProps {
  openWindows: Record<string, any>; 
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  activeApp: string | null;
}

const WindowManager: React.FC<WindowManagerProps> = ({ openWindows, onClose, onFocus, activeApp }) => {
  
  return (
    <>
      {Object.values(openWindows).map((window: any) => (
        window.isOpen && (
          <div
            key={window.id}
            onClick={() => onFocus(window.id)}
            style={{ zIndex: window.zIndex }}
            className={`fixed inset-0 md:inset-10 bg-black border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
              activeApp === window.id 
                ? 'ring-2 ring-blue-500/50 scale-100 z-50' 
                : 'scale-95 opacity-40 grayscale pointer-events-none z-0'
            }`}
          >
            {/* Window Header */}
            <div className="h-12 bg-zinc-900/50 flex items-center justify-between px-6 border-b border-white/5 select-none">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${activeApp === window.id ? 'bg-blue-400 animate-pulse' : 'bg-zinc-700'}`} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                  {window.id}_NEXUS_CORE
                </span>
              </div>
              
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onClose(window.id); 
                }}
                className="group w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-500/10 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-red-500 transition-colors" />
              </button>
            </div>

            {/* Application Content Switcher */}
            <div className="flex-1 overflow-hidden relative bg-zinc-950">
              <AppContent 
                appId={window.id} 
                onNavigate={() => {}} 
              />
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default WindowManager;
