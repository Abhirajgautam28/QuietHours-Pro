import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bell, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Digest: React.FC = () => {
  const { notifications, isDndActive, isPro } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isPro) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 text-center pb-24">
             <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-20 h-20 bg-[#1e2432] rounded-[2rem] flex items-center justify-center mb-8"
            >
                <Bell size={32} className="text-slate-400" />
            </motion.div>
            <h2 className="text-2xl font-light text-slate-100 mb-3">Notification Digest</h2>
            <p className="text-slate-500 text-sm mb-10 leading-relaxed">
                We'll catch notifications while you focus and deliver them in a clean summary when you're done.
            </p>
            <button className="w-full py-4 bg-indigo-500 rounded-full font-semibold text-[#0b0f19]">
                Upgrade to Enable
            </button>
        </div>
      );
  }

  return (
    <div className="px-4 pt-2 pb-24 h-full overflow-y-auto no-scrollbar">
        {isDndActive ? (
             <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-indigo-500 text-[#0b0f19] rounded-[24px] p-6 mb-6 text-center"
             >
                <div className="flex justify-center mb-3">
                     <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center animate-pulse">
                        <Clock size={24} />
                     </div>
                </div>
                <h3 className="font-semibold text-lg">Quiet Mode Active</h3>
                <p className="text-indigo-950/70 text-sm mt-1">Collecting notifications for later...</p>
            </motion.div>
        ) : (
             <div className="flex items-center gap-2 mb-6 px-2">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-sm text-slate-400">You're all caught up</span>
            </div>
        )}

        <div className="space-y-2">
            {notifications.map((group, i) => {
            const isExpanded = expandedId === group.id;
            const Icon = group.icon;

            return (
                <motion.div 
                    key={group.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#1e2432] rounded-[24px] overflow-hidden"
                >
                <button 
                    onClick={() => setExpandedId(isExpanded ? null : group.id)}
                    className="w-full p-4 flex items-center gap-4"
                >
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-300">
                            <Icon size={20} />
                        </div>
                        <div className="absolute -top-1 -right-1 bg-indigo-500 text-[#0b0f19] text-[10px] font-bold h-5 min-w-[1.25rem] px-1 rounded-full flex items-center justify-center border-[3px] border-[#1e2432]">
                            {group.count}
                        </div>
                    </div>
                    
                    <div className="flex-1 text-left">
                        <h3 className="font-medium text-slate-200 text-[15px]">{group.appName}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{group.timestamp}</p>
                    </div>

                    {isExpanded ? <ChevronUp size={20} className="text-slate-500"/> : <ChevronDown size={20} className="text-slate-500"/>}
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/20"
                        >
                            <div className="px-4 pb-4 pt-1 space-y-3">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="text-sm text-slate-400 pl-4 py-1 relative">
                                        <div className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                </motion.div>
            );
            })}
        </div>
    </div>
  );
};

export default Digest;