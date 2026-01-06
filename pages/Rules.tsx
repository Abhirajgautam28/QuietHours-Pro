import React, { useState } from 'react';
import { MapPin, Wifi, Calendar, Clock, Plus, Trash2, Edit2, ChevronDown, MoreHorizontal } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Rule } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const RuleIcon = ({ type, isActive }: { type: Rule['type'], isActive: boolean }) => {
  const colors = {
    LOCATION: isActive ? "text-emerald-400" : "text-zinc-500",
    WIFI: isActive ? "text-sky-400" : "text-zinc-500",
    CALENDAR: isActive ? "text-rose-400" : "text-zinc-500",
    TIME: isActive ? "text-amber-400" : "text-zinc-500",
  };
  
  switch (type) {
    case 'LOCATION': return <MapPin size={24} className={colors.LOCATION} strokeWidth={1.5} />;
    case 'WIFI': return <Wifi size={24} className={colors.WIFI} strokeWidth={1.5} />;
    case 'CALENDAR': return <Calendar size={24} className={colors.CALENDAR} strokeWidth={1.5} />;
    case 'TIME': return <Clock size={24} className={colors.TIME} strokeWidth={1.5} />;
  }
};

const Rules: React.FC = () => {
  const { rules, toggleRule, isPro } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    // Prevent expanding if clicking the toggle switch
    if ((e.target as HTMLElement).closest('button[role="switch"]')) return;
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="px-5 pt-4 pb-32 h-full overflow-y-auto no-scrollbar relative bg-black">
      
      {/* Promo Card */}
      <AnimatePresence>
      {!isPro && (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
        >
            <div className="p-6 bg-[#121212] rounded-[32px] border border-indigo-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/20">
                            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Pro Feature</span>
                        </div>
                    </div>
                    <h3 className="text-white font-medium text-lg mb-1">Smart Automation</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5 max-w-[260px]">
                        Automatically activate Quiet Mode when you arrive at work or connect to specific WiFi networks.
                    </p>
                    <button className="text-xs font-semibold text-black bg-white px-5 py-2.5 rounded-full shadow-lg active:scale-95 transition-transform">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </motion.div>
      )}
      </AnimatePresence>

      <div className="flex items-center justify-between px-2 mb-5">
        <h2 className="text-white text-xl font-light tracking-tight">Your Rules</h2>
        <div className="text-[11px] font-medium text-zinc-500 bg-[#121212] px-3 py-1.5 rounded-full border border-white/5">
            {rules.filter(r => r.isActive).length} Active
        </div>
      </div>

      <motion.div layout className="space-y-4">
        {rules.map((rule, index) => {
            const isExpanded = expandedId === rule.id;
            
            return (
              <motion.div 
                key={rule.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={(e) => handleCardClick(rule.id, e)}
                className={`group relative overflow-hidden rounded-[32px] transition-all duration-500 border cursor-pointer ${
                    rule.isActive 
                        ? 'bg-[#101010] border-white/10' 
                        : 'bg-black border-zinc-900'
                } ${isExpanded ? 'ring-1 ring-indigo-500/30' : ''}`}
              >
                {/* Main Card Content */}
                <div className="p-5 flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-[24px] flex items-center justify-center transition-colors duration-300 ${
                      rule.isActive ? 'bg-[#1C1C1E]' : 'bg-[#0a0a0a] border border-white/5'
                  }`}>
                    <RuleIcon type={rule.type} isActive={rule.isActive} />
                  </div>
                  
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className={`font-medium text-[16px] mb-0.5 transition-colors ${rule.isActive ? 'text-white' : 'text-zinc-500'}`}>
                        {rule.name}
                    </h3>
                    <p className="text-xs text-zinc-600 truncate">{rule.description}</p>
                  </div>

                  {/* Custom Switch */}
                  <button 
                    role="switch"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleRule(rule.id);
                    }}
                    className={`relative w-12 h-7 rounded-full transition-colors duration-300 ease-out flex items-center px-1 border ${
                      rule.isActive ? 'bg-indigo-600 border-indigo-500' : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    <motion.div 
                        layout
                        animate={{ x: rule.isActive ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-[#151515] border-t border-white/5"
                        >
                            <div className="p-5 pt-4 space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                        <div>
                                            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">Condition</span>
                                            <span className="text-sm text-zinc-300">{rule.description}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                        <div>
                                            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">Action</span>
                                            <span className="text-sm text-zinc-300">Enable Quiet Mode, Allow Favorites</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button className="flex-1 h-10 bg-[#1C1C1E] rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-white hover:bg-[#252525] transition-colors border border-white/5">
                                        <Edit2 size={14} className="text-zinc-400" />
                                        Edit
                                    </button>
                                    <button className="flex-1 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors border border-rose-500/10">
                                        <Trash2 size={14} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>
            );
        })}
      </motion.div>

      {/* Morphing FAB */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-28 right-6 w-16 h-16 bg-white rounded-[24px] text-black shadow-2xl flex items-center justify-center z-30 group"
      >
        <motion.div
            animate={{ rotate: 0 }}
            whileTap={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
             <Plus size={30} strokeWidth={2} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default Rules;