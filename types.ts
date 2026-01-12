import { AppId } from './constants';

/**
 * AppIdType creates a union of all possible App IDs 
 * (e.g., 'terminal' | 'ai_chat' | 'gps' | ...)
 */
export type AppIdType = typeof AppId[keyof typeof AppId];

/**
 * Standard interface for App definitions used in 
 * Desktop and Taskbar components.
 */
export interface NexusApp {
  id: AppIdType;
  name: string;
  icon: string;
  color: string;
}

/**
 * State management for the Window Manager
 */
export interface WindowState {
  id: AppIdType;
  isOpen: boolean;
  isMaximized?: boolean;
  zIndex: number;
}

/**
 * Real-time Message structure for Chat and AI apps
 */
export interface Message {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

/**
 * User Profile structure for the ProfileApp
 */
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLogin: number;
}
