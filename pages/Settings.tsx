import React from 'react';
import { Moon, Sun, Smartphone, Bell, MapPin, RefreshCw, ChevronRight, ShieldCheck, FileText } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const { theme, setTheme, triggerHaptic } = useApp();

  const toggleTheme = () => {
      triggerHaptic();
      if (theme === 'dark') setTheme('light');
      else if (theme === 'light') setTheme('system');
      else setTheme('dark');
  };

  const getThemeIcon = () => {
      if (theme === 'dark') return <Moon size={18} />;
      if (theme === 'light') return <Sun size={18} />;
      return <Smartphone size={18} />;
  };

  const getThemeLabel = () => {
    if (theme === 'dark') return 'Dark Mode';
    if (theme === 'light') return 'Light Mode';
    return 'System Default';
  };

  return (
    <div className="px-6 pt-4 pb-32 h-full overflow-y-auto no-scrollbar scroll-smooth-native bg-zinc-50 dark:bg-black transition-colors duration-300">
      
      {/* Appearance Section */}
      <div className="mb-8">
        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 px-2">Appearance</h2>
        <div className="bg-white dark:bg-[#121212] rounded-[24px] border border-zinc-200 dark:border-white/5 overflow-hidden">
            <button 
                onClick={toggleTheme}
                className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                        {getThemeIcon()}
                    </div>
                    <div className="text-left">
                        <h3 className="text-zinc-900 dark:text-white font-medium text-[15px]">Theme</h3>
                        <p className="text-zinc-500 text-xs">{getThemeLabel()}</p>
                    </div>
                </div>
                <ChevronRight size={18} className="text-zinc-400" />
            </button>
        </div>
      </div>

      {/* Permissions Section */}
      <div className="mb-8">
        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 px-2">Permissions</h2>
        <div className="bg-white dark:bg-[#121212] rounded-[24px] border border-zinc-200 dark:border-white/5 overflow-hidden divide-y divide-zinc-100 dark:divide-white/5">
            {[
                { icon: Bell, title: "Notifications", status: "Enabled", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { icon: MapPin, title: "Location Access", status: "While In Use", color: "text-sky-500", bg: "bg-sky-500/10" },
            ].map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                            <item.icon size={18} />
                        </div>
                        <div>
                            <h3 className="text-zinc-900 dark:text-white font-medium text-[15px]">{item.title}</h3>
                            <p className="text-zinc-500 text-xs">{item.status}</p>
                        </div>
                    </div>
                    <div className="w-12 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 p-1">
                         <div className="w-5 h-5 bg-white dark:bg-zinc-500 rounded-full shadow-sm translate-x-5" />
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Purchases & Legal */}
      <div className="mb-8">
        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 px-2">General</h2>
        <div className="bg-white dark:bg-[#121212] rounded-[24px] border border-zinc-200 dark:border-white/5 overflow-hidden divide-y divide-zinc-100 dark:divide-white/5">
            <button className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                        <RefreshCw size={18} />
                    </div>
                    <span className="text-zinc-900 dark:text-white font-medium text-[15px]">Restore Purchases</span>
                </div>
                <ChevronRight size={18} className="text-zinc-400" />
            </button>
             <button className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                        <ShieldCheck size={18} />
                    </div>
                    <span className="text-zinc-900 dark:text-white font-medium text-[15px]">Privacy Policy</span>
                </div>
                <ChevronRight size={18} className="text-zinc-400" />
            </button>
             <button className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                        <FileText size={18} />
                    </div>
                    <span className="text-zinc-900 dark:text-white font-medium text-[15px]">Terms of Service</span>
                </div>
                <ChevronRight size={18} className="text-zinc-400" />
            </button>
        </div>
      </div>
      
      <div className="text-center">
          <p className="text-[10px] text-zinc-400 dark:text-zinc-600 font-medium">QuietHours Pro v2.4.0 (Build 302)</p>
      </div>
    </div>
  );
};

export default Settings;