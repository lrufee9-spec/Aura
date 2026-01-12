
import React, { useState } from 'react';
import { AppId } from '../constants';
import {  } from '../constants';
import {  } from '../../types';
import AIChatApp from './AIChatApp';
import ChatApp from './ChatApp';
import ContentApp from './ContentApp';
import InboxApp from './InboxApp';
import VideoApp from './VideoApp';
import BooksApp from './BooksApp';
import TerminalApp from './TerminalApp';
import FilesApp from './FilesApp';
import CameraApp from './CameraApp';
import MapApp from '../GpsApp';
import StorageApp from './StorageApp';
import ProfileApp from './ProfileApp';
import ControllerApp from './ControllerApp';
import ExtensionsApp from './ExtensionsApp';
import DJMusicApp from './DJMusicApp';
import DashboardApp from './DashboardApp';

// New Mock Components
const SimpleShell: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
  <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-[#050505]">
    <div className="text-7xl mb-6">{icon}</div>
    <h2 className="text-2xl font-black mb-2 text-white">{title}</h2>
    <p className="text-gray-400 max-w-sm mb-8 font-medium">
      Your {title.toLowerCase()} center is being synchronized with your personal cloud.
    </p>
    <button className="px-6 py-2 bg-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">
      Refresh Data
    </button>
  </div>
);

interface AppContentProps {
  appId: AppId;
  onClose: () => void;
}

const AppContent: React.FC<AppContentProps> = ({ appId, onClose }) => {
  const [internalView, setInternalView] = useState<'default' | 'dj_music'>('default');

  // Handle nested app navigation for Storage -> DJ Music
  if (appId === AppId.STORAGE && internalView === 'dj_music') {
    return <DJMusicApp onBackToStorage={() => setInternalView('default')} />;
  }

  switch (appId) {
    case AppId.AI_CHAT:
      return <AIChatApp onBackToHome={onClose} />;
    case AppId.CHAT:
      return <ChatApp onBackToHome={onClose} />;
    case AppId.CONTENT:
      return <ContentApp onBackToHome={onClose} />;
    case AppId.INBOX:
      return <InboxApp onBackToHome={onClose} />;
    case AppId.VIDEO:
      return <VideoApp onBackToHome={onClose} />;
    case AppId.BOOKS:
      return <BooksApp onBackToHome={onClose} />;
    case AppId.TERMINAL:
      return <TerminalApp />;
    case AppId.FILES:
      return <FilesApp onBackToHome={onClose} />;
    case AppId.CAMERA:
      return <CameraApp onBackToHome={onClose} />;
    case AppId.GPS:
      return <MapApp onBackToHome={onClose} />;
    case AppId.STORAGE:
      return <StorageApp onBackToHome={onClose} onOpenDJMusic={() => setInternalView('dj_music')} />;
    case AppId.PROFILE:
      return <ProfileApp onBackToHome={onClose} />;
    case AppId.CONTROLLER:
      return <ControllerApp onBackToHome={onClose} />;
    case AppId.EXTENSIONS:
      return <ExtensionsApp onBackToHome={onClose} />;
    case AppId.DJ_MUSIC:
      return <DJMusicApp onBackToStorage={onClose} />;
    case AppId.DASHBOARD:
      return <DashboardApp onBackToHome={onClose} />;
    default:
      return <SimpleShell title={(appId as string).replace('_', ' ')} icon="🚀" />;
  }
};

export default AppContent;
