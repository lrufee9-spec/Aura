export type AppId = string; 

export interface WindowState {
  id: any;
  isOpen: boolean;
  isMaximized: boolean;
  zIndex: number;
  [key: string]: any; 
}

export interface NexusApp {
  id: any;
  name: string;
  icon: string;
  color: string;
  [key: string]: any;
}

export interface Message {
  role: 'user' | 'assistant' | 'peer';
  content: string;
  timestamp: number;
  [key: string]: any;
}

// All other types made flexible to support extra data (price, creator, etc.)
export interface Contact { id: string; name: string; [key: string]: any; }
export interface Book { id: string; title: string; [key: string]: any; }
export interface NewspaperPost { id: string; [key: string]: any; }
export interface Email { id: string; subject: string; [key: string]: any; }
export interface ContentPost { id: string; [key: string]: any; }
export interface LiveRoom { id: string; [key: string]: any; }
export interface DJTrack { id: string; title: string; [key: string]: any; }
export interface CuePoint { id: string; [key: string]: any; }
export interface FileNode { id: string; name: string; type: string; [key: string]: any; }
export interface VideoContent { id: string; title: string; [key: string]: any; }
export interface Peer { id: string; name: string; [key: string]: any; }
export interface Reminder { id: string; text: string; [key: string]: any; }
