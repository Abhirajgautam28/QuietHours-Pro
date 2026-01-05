import React from 'react';
import { Crown } from 'lucide-react';
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
    <div className="bg-[#0b0f19] px-6 py-4 flex justify-between items-center sticky top-0 z-40">
      <motion.h1 
        key={title}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-[22px] font-normal tracking-tight text-slate-100"
      >
        {title}
      </motion.h1>
      
      {!isPro && currentRoute !== AppRoute.PRO && (
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(AppRoute.PRO)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-full text-xs font-semibold text-indigo-200"
        >
          <Crown size={14} />
          <span>PRO</span>
        </motion.button>
      )}
    </div>
  );
};

export default Header;