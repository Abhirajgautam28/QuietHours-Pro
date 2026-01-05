import React from 'react';
import { MapPin, Wifi, Calendar, Clock, Plus, Trash2, MoreVertical } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Rule } from '../types';
import { motion } from 'framer-motion';

const RuleIcon = ({ type }: { type: Rule['type'] }) => {
  switch (type) {
    case 'LOCATION': return <MapPin size={22} className="text-emerald-300" />;
    case 'WIFI': return <Wifi size={22} className="text-sky-300" />;
    case 'CALENDAR': return <Calendar size={22} className="text-rose-300" />;
    case 'TIME': return <Clock size={22} className="text-amber-300" />;
  }
};

const Rules: React.FC = () => {
  const { rules, toggleRule, isPro } = useApp();

  return (
    <div className="px-4 pt-2 pb-24 h-full overflow-y-auto no-scrollbar relative">
      
      {!isPro && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-[24px] border border-indigo-500/20"
        >
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Calendar size={20} className="text-indigo-300" />
            </div>
            <div>
                 <h3 className="text-indigo-100 font-medium text-sm mb-1">Smart Automation</h3>
                <p className="text-indigo-200/60 text-xs leading-relaxed">
                    Automatically trigger Quiet Mode when you arrive at work, connect to office WiFi, or have a meeting.
                </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {rules.map((rule, index) => (
          <motion.div 
            key={rule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-[24px] p-0 transition-all duration-300 ${
                rule.isActive ? 'bg-[#2d3345]' : 'bg-[#1e2432]'
            }`}
          >
            <div className="p-5 flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  rule.isActive ? 'bg-slate-700/50' : 'bg-slate-800'
              }`}>
                <RuleIcon type={rule.type} />
              </div>
              
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-medium text-[15px] ${rule.isActive ? 'text-slate-100' : 'text-slate-400'}`}>
                    {rule.name}
                  </h3>
                  <button 
                    onClick={() => toggleRule(rule.id)}
                    className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                      rule.isActive ? 'bg-indigo-500' : 'bg-slate-700'
                    }`}
                  >
                    <motion.div 
                        animate={{ x: rule.isActive ? 22 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 left-0 w-5 h-5 bg-white rounded-full shadow-sm" 
                    />
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1 truncate pr-8">{rule.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB */}
      <motion.button 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#c4d6f0] rounded-[18px] text-slate-900 shadow-xl shadow-indigo-900/20 flex items-center justify-center z-50"
      >
        <Plus size={24} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
};

export default Rules;