import React from 'react';
import { Home, Shield, List, Zap } from 'lucide-react';
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
    <div className="absolute bottom-6 left-4 right-4 z-40">
      <div className="bg-[#1C1C1E]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-2 shadow-2xl shadow-black/50">
        <div className="flex justify-between items-center px-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className="relative flex flex-col items-center justify-center w-16 h-16 rounded-full group outline-none"
              >
                {isActive && (
                    <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[#2C2C2E] rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1">
                    <item.icon 
                        size={24} 
                        className={`transition-all duration-300 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} 
                        strokeWidth={isActive ? 2.5 : 1.5}
                    />
                    {isActive && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-1 h-1 bg-white rounded-full mt-1"
                        />
                    )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;