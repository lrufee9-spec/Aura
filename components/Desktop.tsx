
import React from 'react';
import { AppId, NexusApp } from '../types';

export const APPS: NexusApp[] = [
  { id: AppId.DASHBOARD, name: 'Command Center', icon: '🚀', color: 'bg-gradient-to-tr from-blue-600 to-indigo-700' },
  { id: AppId.PROFILE, name: 'Profile', icon: '👤', color: 'bg-blue-600' },
  { id: AppId.AI_CHAT, name: 'AI Assistant', icon: '🤖', color: 'bg-indigo-500' },
  { id: AppId.CHAT, name: 'Messages', icon: '💬', color: 'bg-blue-400' },
  { id: AppId.CONTENT, name: 'Content', icon: '📺', color: 'bg-purple-500' },
  { id: AppId.INBOX, name: 'Inbox', icon: '📩', color: 'bg-emerald-500' },
  { id: AppId.VIDEO, name: 'Video', icon: '🎬', color: 'bg-rose-500' },
  { id: AppId.BOOKS, name: 'Library', icon: '📚', color: 'bg-orange-500' },
  { id: AppId.FILES, name: 'Files', icon: '📁', color: 'bg-amber-500' },
  { id: AppId.CONTROLLER, name: 'Controller', icon: '🎮', color: 'bg-violet-500' },
  { id: AppId.GPS, name: 'GPS', icon: '📍', color: 'bg-sky-500' },
  { id: AppId.CAMERA, name: 'Camera', icon: '📷', color: 'bg-slate-500' },
  { id: AppId.TERMINAL, name: 'Terminal', icon: '💻', color: 'bg-zinc-800' },
  { id: AppId.STORAGE, name: 'Storage', icon: '☁️', color: 'bg-blue-500' },
  { id: AppId.EXTENSIONS, name: 'Extensions', icon: '🧩', color: 'bg-pink-500' },
];

interface DesktopProps {
  onAppClick: (id: AppId) => void;
}

const Desktop: React.FC<DesktopProps> = ({ onAppClick }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-4 gap-y-12 max-w-6xl w-full mx-auto px-4 overflow-y-auto max-h-[calc(100vh-120px)] pb-10 scrollbar-none">
      {APPS.map((app) => (
        <button
          key={app.id}
          onClick={() => onAppClick(app.id)}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className={`${app.color} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg transform transition-all group-hover:scale-110 group-active:scale-95 group-hover:shadow-blue-500/20 group-hover:shadow-2xl`}>
            {app.icon}
          </div>
          <span className="mt-2 text-[11px] sm:text-xs font-bold text-white drop-shadow-md bg-black/40 px-2 py-0.5 rounded-lg border border-white/5 transition-all">
            {app.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Desktop;
