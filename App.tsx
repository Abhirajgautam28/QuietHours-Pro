import React, { useState } from 'react';
import { AppProvider } from './store/AppContext';
import { AppRoute } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Rules from './pages/Rules';
import Bypass from './pages/Bypass';
import Digest from './pages/Digest';
import Pro from './pages/Pro';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);

  const renderScreen = () => {
    switch (currentRoute) {
      case AppRoute.HOME: return <Home />;
      case AppRoute.RULES: return <Rules />;
      case AppRoute.BYPASS: return <Bypass />;
      case AppRoute.DIGEST: return <Digest />;
      case AppRoute.PRO: return <Pro />;
      case AppRoute.SETTINGS: return <Pro />; // Reuse Pro screen for settings demo
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
    <div className="min-h-screen bg-black flex items-center justify-center p-0 md:p-8 font-sans">
      {/* Phone Frame */}
      <div className="w-full h-screen md:h-[844px] md:w-[390px] bg-[#0b0f19] md:rounded-[40px] md:border-[8px] md:border-[#1e293b] shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Status Bar Area (Visual) */}
        <div className="h-12 w-full flex justify-between items-center px-6 pt-2 z-50">
           <span className="text-xs font-medium text-slate-400">9:41</span>
           <div className="flex gap-1.5">
             <div className="w-4 h-4 rounded-full border border-slate-600/50" />
             <div className="w-4 h-4 rounded-full border border-slate-600/50" />
             <div className="w-4 h-4 rounded-full bg-slate-400/50" />
           </div>
        </div>

        {/* Dynamic Island (Visual) */}
        <div className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-50 pointer-events-none"></div>

        <Header title={getTitle()} onNavigate={setCurrentRoute} currentRoute={currentRoute} />
        
        <main className="flex-1 overflow-hidden relative bg-[#0b0f19]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoute}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full w-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav currentRoute={currentRoute} onNavigate={setCurrentRoute} />
        
        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-700/50 rounded-full z-50"></div>
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