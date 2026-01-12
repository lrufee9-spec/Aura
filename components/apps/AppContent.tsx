import React from 'react';
import { AppId } from '../../constants';

// Temporary placeholders for apps we will build next
const Placeholder = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-zinc-500 font-mono italic">
    <span className="text-4xl mb-4">🚀</span>
    {name} Module Initializing...
  </div>
);

interface AppContentProps {
  appId: string;
}

const AppContent: React.FC<AppContentProps> = ({ appId }) => {
  switch (appId) {
    case AppId.TERMINAL:
      return <Placeholder name="Terminal" />;
    case AppId.AI_CHAT:
      return <Placeholder name="Neural AI" />;
    case AppId.CHAT:
      return <Placeholder name="Real-time Chat" />;
    case AppId.GPS:
      return <Placeholder name="Satellite Navigation" />;
    case AppId.FILES:
      return <Placeholder name="File System" />;
    case AppId.DASHBOARD:
      return <Placeholder name="Command Center" />;
    default:
      return <Placeholder name="Unknown System" />;
  }
};

export default AppContent;
