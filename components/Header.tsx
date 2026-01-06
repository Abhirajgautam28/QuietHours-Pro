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
    <div className="bg-black px-6 pt-2 pb-2 flex justify-between items-center z-40">
      <motion.h1 
        key={title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-[28px] font-light tracking-tight text-white"
      >
        {title}
      </motion.h1>
      
      {!isPro && currentRoute !== AppRoute.PRO && (
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(AppRoute.PRO)}
          className="flex items-center gap-1.5 pl-3 pr-4 py-2 bg-[#1C1C1E] border border-white/10 rounded-full text-xs font-semibold text-white shadow-lg hover:bg-[#2C2C2E] transition-colors"
        >
          <Crown size={14} className="text-amber-400 fill-amber-400" />
          <span className="opacity-90">PRO</span>
        </motion.button>
      )}
    </div>
  );
};

export default Header;