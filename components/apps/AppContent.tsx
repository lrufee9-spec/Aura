import React from 'react';
import { AppId } from '../../constants'; // Importing from constants, not types
import AIChatApp from './AIChatApp';
import GpsApp from './GpsApp';
// Add other imports here as needed

interface AppContentProps {
  appId: string;
  internalView?: string;
  onNavigate?: (view: string) => void;
}

const AppContent: React.FC<AppContentProps> = ({ appId, internalView, onNavigate }) => {
  
  // Logic for special sub-views (like DJ Music inside Storage)
  if (appId === AppId.STORAGE && internalView === 'dj_music') {
    return <div className="p-10 text-white text-center">DJ Music Module Loading...</div>;
  }

  // Main Switchboard
  switch (appId) {
    case AppId.AI_CHAT:
      return <AIChatApp onBackToHome={() => {}} />;
    
    case AppId.GPS:
      return <GpsApp onBackToHome={() => {}} />;

    case AppId.TERMINAL:
      return <div className="bg-black p-4 font-mono text-green-500 h-full">Nexus Terminal v1.0.4...</div>;

    case AppId.FILES:
      return <div className="p-10 text-white">Files System Accessing...</div>;

    case AppId.CHAT:
      return <div className="p-10 text-white">Secure Messages Loading...</div>;

    case AppId.DASHBOARD:
      return <div className="p-10 text-white">Command Center Active</div>;

    default:
      return (
        <div className="flex flex-col items-center justify-center h-full bg-zinc-950 text-white p-6 text-center">
          <div className="w-16 h-16 border-2 border-white/10 rounded-2xl flex items-center justify-center mb-4 text-2xl">
            💠
          </div>
          <h2 className="text-sm font-bold tracking-widest uppercase opacity-40">{appId}</h2>
          <p className="text-[10px] mt-2 text-zinc-500 uppercase">Module initialization in progress...</p>
        </div>
      );
  }
};

export default AppContent;
