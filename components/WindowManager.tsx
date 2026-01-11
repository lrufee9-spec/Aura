import React from 'react';
import { AppId, WindowState } from '../types';
// Double check these paths!
import GpsApp from './GpsApp'; 
import AIChatApp from './apps/AIChatApp'; 

interface WindowManagerProps {
  openWindows: Record<string, WindowState>; // Changed AppId to string here for "loose" type safety
  onClose: (id: any) => void;
  onFocus: (id: any) => void;
  activeApp: string | null;
}

// ... rest of the code I gave you previously
const WindowManager: React.FC<WindowManagerProps> = ({ openWindows, onClose, onFocus, activeApp }) => {
  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'gps':
        return <GpsApp onBackToHome={() => onClose('gps')} />;
      case 'chat':
        return <AIChatApp onBackToHome={() => onClose('chat')} />;
      // Add other apps here as we build them
      default:
        return (
          <div className="flex items-center justify-center h-full bg-zinc-900 text-zinc-500 text-xs uppercase tracking-widest">
            App_Module_Not_Found: {id}
          </div>
        );
    }
  };

  return (
    <>
      {Object.values(openWindows).map((window) => (
        window.isOpen && (
          <div
            key={window.id}
            onClick={() => onFocus(window.id)}
            style={{ zIndex: window.zIndex }}
            className={`fixed inset-0 md:inset-10 bg-black border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
              activeApp === window.id ? 'ring-2 ring-blue-500/50 scale-100' : 'scale-95 opacity-80'
            }`}
          >
            {/* Minimal Window Header */}
            <div className="h-12 bg-zinc-900/50 flex items-center justify-between px-6 border-b border-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                {window.id}_SYSTEM_PROTOCAL
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
                className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50 hover:bg-red-500 transition-colors"
              />
            </div>

            {/* Application Content */}
            <div className="flex-1 overflow-hidden">
              {renderAppContent(window.id)}
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default WindowManager;
