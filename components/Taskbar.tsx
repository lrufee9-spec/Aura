
import React, { useState, useEffect } from 'react';
import { AppId } from '../types';
import { APPS } from './Desktop';

interface TaskbarProps {
  onAppClick: (id: AppId) => void;
  activeApp: AppId | null;
}

const Taskbar: React.FC<TaskbarProps> = ({ onAppClick, activeApp }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-between px-4 glass-dark border-t border-white/10 z-[1000]">
      {/* Start Button */}
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-transform">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
      </div>

      {/* Running Apps (Pinned) */}
      <div className="flex items-center gap-1 overflow-x-auto px-4">
        {APPS.slice(0, 6).map(app => (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all hover:bg-white/10 ${activeApp === app.id ? 'bg-white/20 scale-110' : ''}`}
            title={app.name}
          >
            {app.icon}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4 text-xs font-medium text-gray-300">
        <div className="hidden sm:flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </div>
        <div className="text-right leading-none">
          <div className="text-sm text-white mb-0.5">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-[10px] text-gray-400">
            {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
