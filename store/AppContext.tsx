import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Rule, NotificationGroup, Contact } from '../types';
import { Mail, MessageSquare, Phone, Calendar } from 'lucide-react';

export type ThemeOption = 'system' | 'dark' | 'light';

interface AppState {
  isDndActive: boolean;
  setDndActive: (active: boolean) => void;
  dndEndTime: Date | null;
  setDndEndTime: (date: Date | null) => void;
  
  rules: Rule[];
  toggleRule: (id: string) => void;
  deleteRule: (id: string) => void;
  addRule: (rule: Rule) => void;
  updateRule: (rule: Rule) => void;
  
  notifications: NotificationGroup[];
  
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;

  isPro: boolean;
  setPro: (isPro: boolean) => void;

  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;

  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  triggerHaptic: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const INITIAL_RULES: Rule[] = [
  { 
    id: '1', 
    name: 'Work Office', 
    type: 'LOCATION', 
    isActive: true, 
    description: 'Arriving at 123 Business Rd',
    config: { location: '123 Business Rd' }
  },
  { 
    id: '2', 
    name: 'Office WiFi', 
    type: 'WIFI', 
    isActive: false, 
    description: 'Connected to "CorpNet_5G"',
    config: { wifi: 'CorpNet_5G' }
  },
  { 
    id: '3', 
    name: 'Sleeping', 
    type: 'TIME', 
    isActive: true, 
    description: 'Every day 10:00 PM - 7:00 AM',
    config: { timeStart: '22:00', timeEnd: '07:00' }
  },
  { 
    id: '4', 
    name: 'Meetings', 
    type: 'CALENDAR', 
    isActive: true, 
    description: 'During events marked "Busy"',
    config: { calendar: 'Busy' }
  },
  { 
    id: '5', 
    name: 'Gym Mode', 
    type: 'LOCATION', 
    isActive: false, 
    description: 'Arriving at Planet Fitness',
    config: { location: 'Planet Fitness' }
  },
  { 
    id: '6', 
    name: 'Home Network', 
    type: 'WIFI', 
    isActive: true, 
    description: 'Connected to "MyHome_Network"',
    config: { wifi: 'MyHome_Network' }
  },
  { 
    id: '7', 
    name: 'Work Hours', 
    type: 'TIME', 
    isActive: false, 
    description: 'Every day 09:00 AM - 05:00 PM',
    config: { timeStart: '09:00', timeEnd: '17:00' }
  },
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
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [theme, setTheme] = useState<ThemeOption>('system');
  
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Mom', isStarred: true, allowRepeated: true },
    { id: '2', name: 'Partner', isStarred: true, allowRepeated: true },
    { id: '3', name: 'Boss', isStarred: false, allowRepeated: true },
    { id: '4', name: 'Gym Buddy', isStarred: false, allowRepeated: false },
    { id: '5', name: 'Doctor', isStarred: true, allowRepeated: true },
  ]);

  // Simulate checking local storage
  useEffect(() => {
    const seen = localStorage.getItem('quiet_hours_onboarding');
    if (seen === 'true') {
      setHasSeenOnboarding(true);
    }
  }, []);

  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10); // Light tap
    }
  };

  const completeOnboarding = () => {
    setHasSeenOnboarding(true);
    localStorage.setItem('quiet_hours_onboarding', 'true');
  };

  const toggleRule = (id: string) => {
    triggerHaptic();
    setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const deleteRule = (id: string) => {
    triggerHaptic();
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const addRule = (rule: Rule) => {
    setRules(prev => [...prev, rule]);
  };

  const updateRule = (updatedRule: Rule) => {
    setRules(prev => prev.map(r => r.id === updatedRule.id ? updatedRule : r));
  };

  const addContact = (contact: Contact) => {
    setContacts(prev => [...prev, contact]);
  };

  const updateContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
  };

  const deleteContact = (id: string) => {
    triggerHaptic();
    setContacts(prev => prev.filter(c => c.id !== id));
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
      updateRule,
      notifications,
      contacts,
      addContact,
      updateContact,
      deleteContact,
      isPro,
      setPro,
      hasSeenOnboarding,
      completeOnboarding,
      theme,
      setTheme,
      triggerHaptic
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