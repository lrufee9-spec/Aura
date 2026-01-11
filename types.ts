export type AppId = 'terminal' | 'chat' | 'gps' | 'vault' | 'settings';

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Peer {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
}

export interface Reminder {
  id: string;
  text: string;
  time: string;
  completed: boolean;
}
