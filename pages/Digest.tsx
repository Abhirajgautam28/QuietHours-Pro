import React, { useState } from 'react';
import { ChevronDown, Bell, Clock, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Digest: React.FC = () => {
  const { notifications, isDndActive, isPro } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isPro) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 text-center pb-24 bg-black">
             <motion.div 
                animate={{ 
                    y: [0, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 bg-gradient-to-br from-[#1C1C1E] to-black rounded-[28px] flex items-center justify-center mb-8 border border-white/5 shadow-2xl"
            >
                <Bell size={28} className="text-zinc-400" />
            </motion.div>
            <h2 className="text-2xl font-light text-white mb-3">Focus First</h2>
            <p className="text-zinc-500 text-sm mb-10 leading-relaxed max-w-[240px]">
                We'll catch notifications silently and present them in a clean timeline when you're ready.
            </p>
            <button className="w-full py-4 bg-[#1C1C1E] border border-white/10 rounded-full font-medium text-white shadow-lg active:scale-95 transition-transform">
                Upgrade to Enable
            </button>
        </div>
      );
  }

  return (
    <div className="px-5 pt-4 pb-32 h-full overflow-y-auto no-scrollbar bg-black">
        <AnimatePresence mode="wait">
            {isDndActive ? (
                <motion.div 
                    key="active"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#101010] rounded-[32px] p-6 mb-8 text-center border border-white/5 relative overflow-hidden"
                >
                    <div className="flex flex-col items-center z-10 relative">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mb-3 text-indigo-400 animate-pulse">
                            <Clock size={20} />
                        </div>
                        <h3 className="font-light text-lg text-white">Quiet Mode Active</h3>
                        <p className="text-zinc-500 text-xs mt-1">Notifications are being summarized</p>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    key="inactive"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 mb-8 px-2"
                >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                    <span className="text-sm text-zinc-400 font-medium">You're all caught up</span>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="relative pl-4 space-y-6">
            {/* Global Timeline Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-zinc-800/50" />

            {notifications.map((group, i) => {
            const isExpanded = expandedId === group.id;
            const Icon = group.icon;

            return (
                <motion.div 
                    key={group.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative z-10"
                >
                    {/* Timeline Node */}
                    <div className="absolute left-[-23px] top-6 w-3 h-3 rounded-full bg-black border-2 border-zinc-700 z-20" />

                    <motion.div 
                        layout
                        onClick={() => setExpandedId(isExpanded ? null : group.id)}
                        className={`group rounded-[28px] border transition-all duration-300 overflow-hidden cursor-pointer ${
                            isExpanded ? 'bg-[#1C1C1E] border-white/10' : 'bg-black border-zinc-900 hover:border-zinc-800'
                        }`}
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center gap-4">
                             <div className="relative">
                                <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center transition-colors ${
                                    isExpanded ? 'bg-[#2C2C2E]' : 'bg-[#121212]'
                                }`}>
                                    <Icon size={20} className="text-zinc-400" />
                                </div>
                                <div className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-[3px] border-black">
                                    {group.count}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className="font-medium text-white text-[15px]">{group.appName}</h3>
                                    <span className="text-[11px] text-zinc-600">{group.timestamp}</span>
                                </div>
                                <p className="text-xs text-zinc-500 truncate max-w-[180px]">
                                    {group.items[0]}
                                </p>
                            </div>
                            
                            <motion.div 
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                className="text-zinc-600"
                            >
                                <ChevronDown size={18} />
                            </motion.div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-white/5 bg-black/20"
                                >
                                    <div className="p-4 pt-2 space-y-3">
                                        {group.items.map((item, idx) => (
                                            <motion.div 
                                                key={idx}
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex gap-3 text-sm text-zinc-300"
                                            >
                                                <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 shrink-0" />
                                                <span className="leading-relaxed font-light">{item}</span>
                                            </motion.div>
                                        ))}
                                        <div className="pt-2 flex justify-end gap-2">
                                            <button className="text-[10px] font-semibold text-zinc-500 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors">Clear</button>
                                            <button className="text-[10px] font-semibold text-indigo-400 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors">Open</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            );
            })}
        </div>
    </div>
  );
};

export default Digest;