import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Rule, NotificationGroup, Contact } from '../types';
import { Mail, MessageSquare, Phone, Calendar } from 'lucide-react';

interface AppState {
  isDndActive: boolean;
  setDndActive: (active: boolean) => void;
  dndEndTime: Date | null;
  setDndEndTime: (date: Date | null) => void;
  rules: Rule[];
  toggleRule: (id: string) => void;
  deleteRule: (id: string) => void;
  addRule: (rule: Rule) => void;
  notifications: NotificationGroup[];
  contacts: Contact[];
  isPro: boolean;
  setPro: (isPro: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const INITIAL_RULES: Rule[] = [
  { id: '1', name: 'Work Office', type: 'LOCATION', isActive: true, description: 'Arriving at 123 Business Rd' },
  { id: '2', name: 'Office WiFi', type: 'WIFI', isActive: false, description: 'Connected to "CorpNet_5G"' },
  { id: '3', name: 'Sleeping', type: 'TIME', isActive: true, description: 'Every day 10:00 PM - 7:00 AM' },
  { id: '4', name: 'Meetings', type: 'CALENDAR', isActive: true, description: 'During events marked "Busy"' },
];

const INITIAL_NOTIFICATIONS: NotificationGroup[] = [
  { 
    id: '1', 
    appName: 'Messages', 
    count: 3, 
    timestamp: '10:05 AM', 
    icon: MessageSquare,
    items: ['Mom: Are you coming for dinner?', 'Mark: Project update', '2FA Code: 123456']
  },
  { 
    id: '2', 
    appName: 'Gmail', 
    count: 5, 
    timestamp: '09:45 AM', 
    icon: Mail,
    items: ['Weekly Newsletter', 'Invoice #9923', 'Meeting Reminder', 'Jira Notification', 'Security Alert']
  },
  { 
    id: '3', 
    appName: 'Phone', 
    count: 1, 
    timestamp: '09:30 AM', 
    icon: Phone,
    items: ['Missed call from Unknown']
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDndActive, setDndActive] = useState(false);
  const [dndEndTime, setDndEndTime] = useState<Date | null>(null);
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [notifications] = useState<NotificationGroup[]>(INITIAL_NOTIFICATIONS);
  const [isPro, setPro] = useState(false);
  const [contacts] = useState<Contact[]>([
    { id: '1', name: 'Mom', isStarred: true, allowRepeated: true },
    { id: '2', name: 'Partner', isStarred: true, allowRepeated: true },
    { id: '3', name: 'Boss', isStarred: false, allowRepeated: true },
    { id: '4', name: 'Gym Buddy', isStarred: false, allowRepeated: false },
    { id: '5', name: 'Doctor', isStarred: true, allowRepeated: true },
  ]);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const addRule = (rule: Rule) => {
    setRules(prev => [...prev, rule]);
  };

  return (
    <AppContext.Provider value={{
      isDndActive,
      setDndActive,
      dndEndTime,
      setDndEndTime,
      rules,
      toggleRule,
      deleteRule,
      addRule,
      notifications,
      contacts,
      isPro,
      setPro
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};