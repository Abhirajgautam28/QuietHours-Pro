import React from 'react';
import { Home, Shield, List, Zap, Settings } from 'lucide-react';
import { AppRoute } from '../types';
import { motion } from 'framer-motion';

interface BottomNavProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const navItems = [
    { route: AppRoute.HOME, icon: Home, label: 'Home' },
    { route: AppRoute.RULES, icon: Zap, label: 'Rules' },
    { route: AppRoute.BYPASS, icon: Shield, label: 'Bypass' },
    { route: AppRoute.DIGEST, icon: List, label: 'Digest' },
  ];

  return (
    <div className="bg-[#121723] pt-2 pb-6 px-4">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        {navItems.map((item) => {
          const isActive = currentRoute === item.route;
          return (
            <button
              key={item.route}
              onClick={() => onNavigate(item.route)}
              className="flex flex-col items-center gap-1 w-16 group"
            >
              <div className="relative flex items-center justify-center w-16 h-8">
                {isActive && (
                    <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-indigo-500/20 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                )}
                <item.icon 
                    size={24} 
                    className={`z-10 transition-colors duration-200 ${isActive ? 'text-indigo-200' : 'text-slate-500 group-hover:text-slate-400'}`} 
                    strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={`text-[11px] font-medium transition-colors duration-200 ${
                isActive ? 'text-indigo-200' : 'text-slate-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;