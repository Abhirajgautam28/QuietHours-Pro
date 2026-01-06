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

  // Handle Hardware Back Button (Android) & Browser History
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If state exists, use it to set the route
      if (event.state && event.state.route) {
        setCurrentRoute(event.state.route);
      } else {
        // Fallback to HOME if we hit the start of history or undefined state
        setCurrentRoute(AppRoute.HOME);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initialize history state if it doesn't exist to ensure we have a base state to return to
    if (!window.history.state) {
      window.history.replaceState({ route: AppRoute.HOME }, '', '');
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Wrapper for navigation that pushes to history stack
  const handleNavigate = (route: AppRoute) => {
    // Only push if different to avoid duplicate history entries
    if (route !== currentRoute) {
      window.history.pushState({ route }, '', '');
      setCurrentRoute(route);
    }
  };

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
    <div className="fixed inset-0 bg-white dark:bg-black overflow-hidden flex flex-col transition-colors duration-300 text-zinc-900 dark:text-zinc-100 font-sans">
      <AnimatePresence>
        {!hasSeenOnboarding && <Onboarding />}
      </AnimatePresence>

      <Header title={getTitle()} onNavigate={handleNavigate} currentRoute={currentRoute} />
        
      <main className="flex-1 overflow-hidden relative bg-white dark:bg-black transition-colors duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav currentRoute={currentRoute} onNavigate={handleNavigate} />
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