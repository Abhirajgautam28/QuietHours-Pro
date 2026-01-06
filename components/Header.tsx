import React from 'react';
import { Crown, Settings as SettingsIcon } from 'lucide-react';
import { AppRoute } from '../types';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  onNavigate: (route: AppRoute) => void;
  currentRoute: AppRoute;
}

const Header: React.FC<HeaderProps> = ({ title, onNavigate, currentRoute }) => {
  const { isPro } = useApp();

  return (
    <div className="bg-white/5 dark:bg-black z-40 transition-colors duration-300 pt-safe">
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <motion.h1 
          key={title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-[28px] font-light tracking-tight text-zinc-900 dark:text-white"
        >
          {title}
        </motion.h1>
        
        <div className="flex items-center gap-3">
          {!isPro && currentRoute !== AppRoute.PRO && (
              <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(AppRoute.PRO)}
              className="flex items-center gap-1.5 pl-3 pr-4 py-2 bg-zinc-100 dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 rounded-full text-xs font-semibold text-zinc-900 dark:text-white shadow-sm dark:shadow-lg hover:bg-zinc-200 dark:hover:bg-[#2C2C2E] transition-colors"
              >
              <Crown size={14} className="text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
              <span className="opacity-90">PRO</span>
              </motion.button>
          )}
          
          <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate(AppRoute.SETTINGS)}
              className={`p-2 rounded-full transition-colors ${
                  currentRoute === AppRoute.SETTINGS 
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
          >
              <SettingsIcon size={20} strokeWidth={2} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Header;