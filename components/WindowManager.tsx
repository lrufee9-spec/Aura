
import React from 'react';
import { AppId, WindowState } from '../types';
import { APPS } from './Desktop';
import AppContent from './apps/AppContent';

interface WindowManagerProps {
  openWindows: Record<AppId, WindowState>;
  onClose: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  activeApp: AppId | null;
}

const WindowManager: React.FC<WindowManagerProps> = ({ openWindows, onClose, onFocus, activeApp }) => {
  return (
    <>
      {/* Fix: Cast Object.values to WindowState[] to resolve property access errors on type 'unknown' */}
      {(Object.values(openWindows) as WindowState[]).map((window) => {
        if (!window.isOpen) return null;
        
        const appInfo = APPS.find(a => a.id === window.id);
        const isActive = activeApp === window.id;

        return (
          <div
            key={window.id}
            onMouseDown={() => onFocus(window.id)}
            style={{ zIndex: window.zIndex }}
            className={`absolute flex flex-col transition-all duration-300 ease-out shadow-2xl overflow-hidden
              ${window.isMaximized 
                ? 'inset-0 m-0 rounded-none' 
                : 'top-10 left-4 right-4 bottom-24 md:top-20 md:left-20 md:w-[80%] md:h-[70%] lg:w-[1000px] lg:h-[600px] rounded-2xl border border-white/10'
              }
              ${isActive ? 'ring-2 ring-blue-500/50 scale-[1.002]' : 'opacity-90'}`}
          >
            {/* Window Header */}
            <div className={`h-12 flex items-center justify-between px-4 glass-dark select-none cursor-default
              ${isActive ? 'bg-white/10' : 'bg-black/40'}`}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{appInfo?.icon}</span>
                <span className="font-semibold text-sm tracking-wide text-white/90">{appInfo?.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors group"
                >
                  <svg className="w-4 h-4 text-white/60 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto bg-[#0a0a0a]/95 backdrop-blur-md">
              <AppContent appId={window.id} onClose={() => onClose(window.id)} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default WindowManager;
