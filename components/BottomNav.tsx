import React from 'react';
import { Home, Shield, List, Zap } from 'lucide-react';
import { AppRoute } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';

interface BottomNavProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const { notifications, isDndActive, triggerHaptic } = useApp();

  const handleNavigate = (route: AppRoute) => {
    triggerHaptic();
    onNavigate(route);
  };

  const navItems = [
    { route: AppRoute.HOME, icon: Home, label: 'Home' },
    { route: AppRoute.RULES, icon: Zap, label: 'Rules' },
    { route: AppRoute.BYPASS, icon: Shield, label: 'Bypass' },
    { route: AppRoute.DIGEST, icon: List, label: 'Digest' },
  ];

  // Calculate total notifications (simple sum for badge)
  const notificationCount = notifications.reduce((acc, curr) => acc + curr.count, 0);
  const showBadge = !isDndActive && notificationCount > 0;

  return (
    <div className="absolute bottom-6 left-4 right-4 z-40">
      <div className="bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-[32px] p-2 shadow-2xl shadow-black/10 dark:shadow-black/50 transition-colors duration-300">
        <div className="flex justify-between items-center px-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavigate(item.route)}
                className="relative flex flex-col items-center justify-center w-16 h-16 rounded-full group outline-none"
              >
                {isActive && (
                    <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-black/5 dark:bg-[#2C2C2E] rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="relative">
                        <item.icon 
                            size={24} 
                            className={`transition-all duration-300 ${
                                isActive 
                                ? 'text-black dark:text-white' 
                                : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                            }`} 
                            strokeWidth={isActive ? 2.5 : 1.5}
                        />
                        {/* Notification Badge */}
                        {item.route === AppRoute.DIGEST && showBadge && (
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1.5 w-4 h-4 bg-rose-500 rounded-full border-2 border-white dark:border-[#2C2C2E] flex items-center justify-center"
                            >
                                <span className="text-[9px] font-bold text-white leading-none">
                                    {notificationCount > 9 ? '9+' : notificationCount}
                                </span>
                            </motion.div>
                        )}
                    </div>

                    {isActive && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-1 h-1 bg-black dark:bg-white rounded-full mt-1"
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