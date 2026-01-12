import React from 'react';
import { AppId } from '../../constants';
import DashboardApp from './DashboardApp'; // The Robot Core
import TerminalApp from './TerminalApp';
import CameraApp from './CameraApp'; // For violence/threat detection

interface AppContentProps {
  appId: string;
  onNavigate?: (id: string) => void;
}

const AppContent: React.FC<AppContentProps> = ({ appId }) => {
  switch (appId) {
    case AppId.DASHBOARD:
      return <DashboardApp />;
    case AppId.TERMINAL:
      return <TerminalApp />;
    case AppId.CAMERA:
      return <CameraApp />;
    case AppId.AI_CHAT:
    case AppId.CHAT:
      return <div className="p-10 text-blue-500 animate-pulse">ROBOT_SYNC_IN_PROGRESS...</div>;
    default:
      return (
        <div className="flex items-center justify-center h-full text-zinc-600 font-mono italic">
          MODULE_{appId}_STANDBY
        </div>
      );
  }
};

export default AppContent;
