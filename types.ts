import { LucideIcon } from 'lucide-react';

export enum AppRoute {
  HOME = 'home',
  RULES = 'rules',
  BYPASS = 'bypass',
  DIGEST = 'digest',
  PRO = 'pro',
  SETTINGS = 'settings'
}

export interface Rule {
  id: string;
  name: string;
  type: 'LOCATION' | 'WIFI' | 'CALENDAR' | 'TIME';
  isActive: boolean;
  description: string;
}

export interface NotificationGroup {
  id: string;
  appName: string;
  count: number;
  timestamp: string;
  icon: LucideIcon;
  items: string[];
}

export interface Contact {
  id: string;
  name: string;
  isStarred: boolean;
  allowRepeated: boolean;
}
