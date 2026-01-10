
export enum AppId {
  PROFILE = 'PROFILE',
  AI_CHAT = 'AI_CHAT',
  CHAT = 'CHAT',
  CONTENT = 'CONTENT',
  INBOX = 'INBOX',
  VIDEO = 'VIDEO',
  BOOKS = 'BOOKS',
  FILES = 'FILES',
  CONTROLLER = 'CONTROLLER',
  GPS = 'GPS',
  CAMERA = 'CAMERA',
  TERMINAL = 'TERMINAL',
  STORAGE = 'STORAGE',
  EXTENSIONS = 'EXTENSIONS',
  DJ_MUSIC = 'DJ_MUSIC',
  DASHBOARD = 'DASHBOARD'
}

export interface CuePoint {
  id: string;
  time: number;
  label: string;
  color: string;
}

export interface DJTrack {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  duration: string;
  format: 'mp3' | 'wav' | 'aiff' | 'flac' | 'mp4';
  cues: CuePoint[];
  beatgrid: number; // offset in ms
  phraseLength: number;
  isAnalyzed: boolean;
  sourceUrl: string;
}

export interface NexusApp {
  id: AppId;
  name: string;
  icon: string;
  color: string;
}

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface Message {
  id?: string;
  role: 'user' | 'assistant' | 'system' | 'peer';
  content: string;
  timestamp: number;
  type?: 'text' | 'reminder' | 'file' | 'translation' | 'voice' | 'location';
  reactions?: string[];
  meta?: any;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  category: 'document' | 'photo' | 'video' | 'system';
  extension: string;
  size?: string;
  modified: string;
  isPrivate?: boolean;
  previewUrl?: string;
  meta?: {
    isID?: boolean;
    duration?: string;
    resolution?: string;
  };
}

export interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  timestamp: number;
  isRead: boolean;
  attachments: Array<{ name: string, type: string, size: string }>;
  isStarred?: boolean;
}

export interface VideoContent {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  category: 'movie' | 'music' | 'talent' | 'personal' | 'global';
  isPremium: boolean;
  price?: number;
  duration: string;
  likes: number;
  isDownloaded?: boolean;
  isPurchased?: boolean;
  uploadDate: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  category: 'fiction' | 'tech' | 'pdf' | 'newspaper';
  isSubscribed?: boolean;
  isPurchased?: boolean;
}

export interface NewspaperPost {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: number;
  likes: number;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  isBlocked?: boolean;
}

export interface Peer {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy';
}

export interface Reminder {
  id: string;
  title: string;
  time: string;
  active: boolean;
}

export interface ContentPost {
  id: string;
  user: string;
  avatar: string;
  type: 'video' | 'image';
  mediaUrl: string;
  likes: number;
  description: string;
  duration?: string;
}

export interface LiveRoom {
  id: string;
  host: string;
  title: string;
  viewers: number;
  activeSpeaker?: string;
}
