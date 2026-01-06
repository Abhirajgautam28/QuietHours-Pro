import React from 'react';
import { MapPin, Wifi, Calendar, Clock, Plus, ArrowRight } from 'lucide-react';
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
    case 'LOCATION': return <MapPin size={22} className={colors.LOCATION} />;
    case 'WIFI': return <Wifi size={22} className={colors.WIFI} />;
    case 'CALENDAR': return <Calendar size={22} className={colors.CALENDAR} />;
    case 'TIME': return <Clock size={22} className={colors.TIME} />;
  }
};

const Rules: React.FC = () => {
  const { rules, toggleRule, isPro } = useApp();

  return (
    <div className="px-5 pt-4 pb-32 h-full overflow-y-auto no-scrollbar relative bg-black">
      
      {/* Promo Card */}
      <AnimatePresence>
      {!isPro && (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
        >
            <div className="p-6 bg-gradient-to-br from-[#1C1C1E] to-black rounded-[32px] border border-indigo-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                            <Calendar size={14} className="text-indigo-300" />
                        </div>
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Smart Automation</span>
                    </div>
                    <h3 className="text-white font-medium text-lg mb-1">Hands-free focus</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                        Trigger Quiet Mode automatically based on your location or calendar.
                    </p>
                    <button className="text-xs font-semibold text-white bg-indigo-600 px-4 py-2 rounded-full shadow-lg shadow-indigo-900/20">
                        Try Pro Features
                    </button>
                </div>
            </div>
        </motion.div>
      )}
      </AnimatePresence>

      <div className="flex items-center justify-between px-2 mb-4">
        <h2 className="text-white text-lg font-light tracking-tight">Active Rules</h2>
        <span className="text-[10px] font-bold text-zinc-500 bg-[#121212] px-2 py-1 rounded-full border border-white/5 uppercase tracking-wide">
            {rules.filter(r => r.isActive).length} / {rules.length}
        </span>
      </div>

      <motion.div layout className="space-y-3">
        {rules.map((rule, index) => (
          <motion.div 
            key={rule.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`group relative overflow-hidden rounded-[28px] transition-all duration-300 border ${
                rule.isActive 
                    ? 'bg-[#121212] border-white/10' 
                    : 'bg-black border-zinc-900'
            }`}
          >
            <div className="p-5 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center transition-colors duration-300 ${
                  rule.isActive ? 'bg-[#1C1C1E]' : 'bg-[#0a0a0a]'
              }`}>
                <RuleIcon type={rule.type} isActive={rule.isActive} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium text-[16px] mb-0.5 transition-colors ${rule.isActive ? 'text-white' : 'text-zinc-600'}`}>
                    {rule.name}
                </h3>
                <p className="text-xs text-zinc-500 truncate">{rule.description}</p>
              </div>

              {/* Custom Switch */}
              <button 
                onClick={() => toggleRule(rule.id)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ease-out flex items-center px-1 ${
                  rule.isActive ? 'bg-white' : 'bg-zinc-900'
                }`}
              >
                <motion.div 
                    layout
                    animate={{ x: rule.isActive ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`w-6 h-6 rounded-full shadow-md ${rule.isActive ? 'bg-black' : 'bg-zinc-700'}`}
                />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Glass Morphic FAB */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-28 right-6 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] text-white shadow-2xl flex items-center justify-center z-30 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/5" />
        <Plus size={28} strokeWidth={1.5} className="relative z-10" />
      </motion.button>
    </div>
  );
};

export default Rules;