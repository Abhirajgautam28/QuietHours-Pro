import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store/AppContext';
import { AppRoute } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Rules from './pages/Rules';
import Bypass from './pages/Bypass';
import Digest from './pages/Digest';
import Pro from './pages/Pro';
import Settings from './pages/Settings';
import Onboarding from './components/Onboarding';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const { hasSeenOnboarding, theme } = useApp();

  // Apply Theme Class to Root
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    
    if (theme === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            root.classList.add('dark');
        } else {
             root.classList.add('light');
        }
    } else {
        root.classList.add(theme);
    }
  }, [theme]);

  const renderScreen = () => {
    switch (currentRoute) {
      case AppRoute.HOME: return <Home />;
      case AppRoute.RULES: return <Rules />;
      case AppRoute.BYPASS: return <Bypass />;
      case AppRoute.DIGEST: return <Digest />;
      case AppRoute.PRO: return <Pro />;
      case AppRoute.SETTINGS: return <Settings />;
      default: return <Home />;
    }
  };

  const getTitle = () => {
    switch (currentRoute) {
      case AppRoute.HOME: return 'QuietHours';
      case AppRoute.RULES: return 'Smart Rules';
      case AppRoute.BYPASS: return 'Emergency Bypass';
      case AppRoute.DIGEST: return 'Digest';
      case AppRoute.PRO: return 'Go Pro';
      case AppRoute.SETTINGS: return 'Settings';
      default: return 'QuietHours';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-[#050505] flex items-center justify-center p-0 md:p-8 font-sans selection:bg-indigo-500/30 transition-colors duration-500">
      <AnimatePresence>
        {!hasSeenOnboarding && <Onboarding />}
      </AnimatePresence>

      {/* Phone Frame - High Fidelity */}
      <div className="w-full h-screen md:h-[844px] md:w-[390px] bg-white dark:bg-black md:rounded-[48px] md:border-[6px] md:border-[#1a1a1a] shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-300">
        
        {/* Status Bar */}
        <div className="h-14 w-full flex justify-between items-end px-7 pb-3 z-50 pointer-events-none mix-blend-difference text-white">
           <span className="text-[15px] font-semibold tracking-wide">9:41</span>
           <div className="flex gap-1.5 items-center">
             <div className="h-3 w-3 bg-white rounded-full"></div>
             <div className="h-3 w-3 bg-white rounded-full"></div>
             <div className="w-6 h-3 bg-white rounded-full"></div>
           </div>
        </div>

        <Header title={getTitle()} onNavigate={setCurrentRoute} currentRoute={currentRoute} />
        
        <main className="flex-1 overflow-hidden relative bg-white dark:bg-black transition-colors duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoute}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(2px)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} // iOS/Android ease
              className="h-full w-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav currentRoute={currentRoute} onNavigate={setCurrentRoute} />
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 dark:bg-white/20 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;