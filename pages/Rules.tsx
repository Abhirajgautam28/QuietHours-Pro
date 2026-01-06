import React, { useState, useEffect } from 'react';
import { MapPin, Wifi, Calendar, Clock, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Rule, RuleConfig } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const RuleIcon = ({ type, isActive }: { type: Rule['type'], isActive: boolean }) => {
  const colors = {
    LOCATION: isActive ? "text-emerald-500 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-600",
    WIFI: isActive ? "text-sky-500 dark:text-sky-400" : "text-zinc-400 dark:text-zinc-600",
    CALENDAR: isActive ? "text-rose-500 dark:text-rose-400" : "text-zinc-400 dark:text-zinc-600",
    TIME: isActive ? "text-amber-500 dark:text-amber-400" : "text-zinc-400 dark:text-zinc-600",
  };
  
  const iconProps = {
    size: 24,
    strokeWidth: isActive ? 2 : 1.5,
  };
  
  switch (type) {
    case 'LOCATION': return <MapPin {...iconProps} className={colors.LOCATION} />;
    case 'WIFI': return <Wifi {...iconProps} className={colors.WIFI} />;
    case 'CALENDAR': return <Calendar {...iconProps} className={colors.CALENDAR} />;
    case 'TIME': return <Clock {...iconProps} className={colors.TIME} />;
  }
};

const Rules: React.FC = () => {
  const { rules, toggleRule, addRule, updateRule, deleteRule, isPro, triggerHaptic } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<Rule['type']>('TIME');
  
  // Dynamic Config State
  const [config, setConfig] = useState<RuleConfig>({
    timeStart: '22:00',
    timeEnd: '07:00',
    location: '',
    wifi: '',
    calendar: ''
  });

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    // Prevent expanding if clicking the toggle or its container
    if ((e.target as HTMLElement).closest('button[role="switch"]')) return;
    triggerHaptic();
    setExpandedId(expandedId === id ? null : id);
  };

  const openAddModal = () => {
    triggerHaptic();
    setEditingRule(null);
    setName('');
    setType('TIME');
    setConfig({
        timeStart: '22:00',
        timeEnd: '07:00',
        location: '',
        wifi: '',
        calendar: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (rule: Rule) => {
    setEditingRule(rule);
    setName(rule.name);
    setType(rule.type);
    
    // Populate config from the structured rule object, falling back to defaults
    setConfig({
        timeStart: rule.config.timeStart || '22:00',
        timeEnd: rule.config.timeEnd || '07:00',
        location: rule.config.location || '',
        wifi: rule.config.wifi || '',
        calendar: rule.config.calendar || ''
    });

    setIsModalOpen(true);
    setExpandedId(null);
  };

  const generateDescription = (currentType: Rule['type'], currentConfig: RuleConfig) => {
      switch(currentType) {
        case 'TIME': return `Every day ${currentConfig.timeStart} - ${currentConfig.timeEnd}`;
        case 'LOCATION': return `Arriving at ${currentConfig.location || 'Selected Location'}`;
        case 'WIFI': return `Connected to "${currentConfig.wifi || 'WiFi Network'}"`;
        case 'CALENDAR': return `During events marked "${currentConfig.calendar || 'Busy'}"`;
        default: return '';
      }
  };

  const handleSave = () => {
    triggerHaptic();
    if (!name) return;
    
    // Extract only relevant config based on type to keep it clean
    const relevantConfig: RuleConfig = {};
    if (type === 'TIME') { relevantConfig.timeStart = config.timeStart; relevantConfig.timeEnd = config.timeEnd; }
    if (type === 'LOCATION') { relevantConfig.location = config.location; }
    if (type === 'WIFI') { relevantConfig.wifi = config.wifi; }
    if (type === 'CALENDAR') { relevantConfig.calendar = config.calendar; }

    const description = generateDescription(type, relevantConfig);

    if (editingRule) {
      updateRule({
        ...editingRule,
        name,
        type,
        description,
        config: relevantConfig
      });
    } else {
      addRule({
        id: Date.now().toString(),
        name,
        type,
        isActive: true,
        description,
        config: relevantConfig
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteRule(id);
    setExpandedId(null);
  };

  return (
    <div className="px-5 pt-4 pb-32 h-full overflow-y-auto no-scrollbar scroll-smooth-native relative bg-white dark:bg-black transition-colors duration-300">
      
      {/* Promo Card */}
      <AnimatePresence>
      {!isPro && (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
        >
            <div className="p-6 bg-indigo-50 dark:bg-[#121212] rounded-[32px] border border-indigo-200 dark:border-indigo-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200/50 dark:bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/20">
                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-wider">Pro Feature</span>
                        </div>
                    </div>
                    <h3 className="text-zinc-900 dark:text-white font-medium text-lg mb-1">Smart Automation</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5 max-w-[260px]">
                        Automatically activate Quiet Mode when you arrive at work or connect to specific WiFi networks.
                    </p>
                    <button className="text-xs font-semibold text-white dark:text-black bg-zinc-900 dark:bg-white px-5 py-2.5 rounded-full shadow-lg active:scale-95 transition-transform">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </motion.div>
      )}
      </AnimatePresence>

      <div className="flex items-center justify-between px-2 mb-5">
        <h2 className="text-zinc-900 dark:text-white text-xl font-light tracking-tight">Your Rules</h2>
        <div className="text-[11px] font-medium text-zinc-500 bg-zinc-100 dark:bg-[#121212] px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/5">
            {rules.filter(r => r.isActive).length} Active
        </div>
      </div>

      <motion.div layout className="space-y-3">
        {rules.map((rule, index) => {
            const isExpanded = expandedId === rule.id;
            
            return (
              <motion.div 
                key={rule.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.99 }}
                transition={{ 
                    layout: { type: "spring", stiffness: 350, damping: 25 },
                    opacity: { duration: 0.2 }
                }}
                onClick={(e) => handleCardClick(rule.id, e)}
                className={`group relative overflow-hidden rounded-[24px] border cursor-pointer transition-colors duration-300 ${
                    rule.isActive 
                        ? 'bg-white dark:bg-[#141414] border-zinc-200 dark:border-white/10 shadow-lg shadow-zinc-200/50 dark:shadow-black/50' 
                        : 'bg-zinc-50 dark:bg-black border-zinc-100 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-[#0a0a0a] hover:border-zinc-200 dark:hover:border-zinc-800'
                } ${isExpanded ? 'ring-1 ring-indigo-500/30 dark:ring-indigo-500/20' : ''}`}
              >
                {/* Header Container - using layout="position" to stay anchored during expansion */}
                <motion.div 
                    layout="position"
                    className="p-4 flex items-center gap-4 relative z-10"
                >
                  {/* Icon Container */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0 ${
                      rule.isActive 
                        ? 'bg-zinc-100 dark:bg-[#1f1f1f]' 
                        : 'bg-white dark:bg-[#0a0a0a] border border-zinc-100 dark:border-white/5'
                  }`}>
                    <RuleIcon type={rule.type} isActive={rule.isActive} />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-[16px] leading-tight mb-0.5 transition-colors ${
                        rule.isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-500'
                    }`}>
                        {rule.name}
                    </h3>
                    <p className={`text-xs font-medium truncate transition-colors ${
                        rule.isActive ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-600'
                    }`}>
                        {rule.description}
                    </p>
                  </div>

                  {/* Toggle */}
                  <button 
                    role="switch"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleRule(rule.id);
                    }}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-out flex items-center px-0.5 border shrink-0 ${
                      rule.isActive ? 'bg-indigo-500 dark:bg-indigo-600 border-indigo-500' : 'bg-zinc-200 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800'
                    }`}
                  >
                    <motion.div 
                        layout
                        animate={{ x: rule.isActive ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </motion.div>

                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="overflow-hidden bg-zinc-50/50 dark:bg-[#18181b]/50 border-t border-zinc-100 dark:border-white/5"
                        >
                            <motion.div 
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                                className="p-4 pt-3 space-y-4"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                        <div>
                                            <span className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Condition</span>
                                            <span className="text-sm text-zinc-600 dark:text-zinc-300">{rule.description}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                        <div>
                                            <span className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Action</span>
                                            <span className="text-sm text-zinc-600 dark:text-zinc-300">Enable Quiet Mode, Allow Favorites</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); openEditModal(rule); }}
                                      className="flex-1 h-10 bg-white dark:bg-[#1C1C1E] rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-[#252525] transition-colors border border-zinc-200 dark:border-white/5 shadow-sm"
                                    >
                                        <Edit2 size={14} className="text-zinc-400" />
                                        Edit
                                    </button>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); handleDelete(rule.id); }}
                                      className="flex-1 h-10 bg-rose-50 dark:bg-rose-500/10 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors border border-rose-100 dark:border-rose-500/10"
                                    >
                                        <Trash2 size={14} />
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>
            );
        })}
      </motion.div>

      {/* Morphing FAB */}
      <motion.button 
        onClick={() => {
            triggerHaptic();
            if (isModalOpen) setIsModalOpen(false);
            else openAddModal();
        }}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        animate={{ 
            backgroundColor: isModalOpen ? '#27272a' : '#18181b',
        }}
        className={`fixed bottom-28 right-6 w-16 h-16 rounded-[24px] shadow-2xl flex items-center justify-center z-30 overflow-hidden transition-colors ${isModalOpen ? 'text-zinc-400' : 'text-white'}`}
      >
        <AnimatePresence initial={false}>
            {isModalOpen ? (
                <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute"
                >
                    <X size={32} strokeWidth={2.5} />
                </motion.div>
            ) : (
                <motion.div
                    key="add"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute"
                >
                    <Plus size={32} strokeWidth={2.5} />
                </motion.div>
            )}
        </AnimatePresence>
      </motion.button>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
                onClick={() => setIsModalOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                    className="w-full max-w-sm bg-white dark:bg-[#121212] border border-white/10 rounded-[32px] p-6 shadow-2xl overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-light text-zinc-900 dark:text-white">
                            {editingRule ? 'Edit Rule' : 'New Automation'}
                        </h3>
                         <button onClick={() => setIsModalOpen(false)} className="p-2 bg-zinc-100 dark:bg-[#1C1C1E] rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                             <X size={18} />
                         </button>
                    </div>
                    
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Rule Name</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-zinc-50 dark:bg-[#1C1C1E] border border-zinc-200 dark:border-white/5 rounded-2xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                placeholder="e.g. Work Mode"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Trigger</label>
                            <div className="grid grid-cols-4 gap-2">
                                {(['TIME', 'LOCATION', 'WIFI', 'CALENDAR'] as const).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => { triggerHaptic(); setType(t); }}
                                        className={`h-12 rounded-2xl flex items-center justify-center border transition-all ${
                                            type === t 
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20' 
                                            : 'bg-zinc-50 dark:bg-[#1C1C1E] border-zinc-200 dark:border-white/5 text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-[#252525] hover:text-zinc-600 dark:hover:text-zinc-300'
                                        }`}
                                    >
                                        <RuleIcon type={t} isActive={type === t} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Configuration Fields */}
                        <div className="space-y-2 p-4 bg-zinc-50 dark:bg-[#1C1C1E] rounded-2xl border border-zinc-200 dark:border-white/5">
                            {type === 'TIME' && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold">Start</label>
                                        <input 
                                            type="time" 
                                            value={config.timeStart}
                                            onChange={(e) => setConfig({...config, timeStart: e.target.value})}
                                            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500/50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold">End</label>
                                        <input 
                                            type="time" 
                                            value={config.timeEnd}
                                            onChange={(e) => setConfig({...config, timeEnd: e.target.value})}
                                            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500/50"
                                        />
                                    </div>
                                </div>
                            )}

                            {type === 'LOCATION' && (
                                <div className="space-y-1">
                                     <label className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold">Address</label>
                                     <div className="relative">
                                        <MapPin size={14} className="absolute left-3 top-3 text-zinc-400 dark:text-zinc-500" />
                                        <input 
                                            type="text" 
                                            value={config.location}
                                            onChange={(e) => setConfig({...config, location: e.target.value})}
                                            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500/50 placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                                            placeholder="Search location..."
                                        />
                                     </div>
                                </div>
                            )}

                            {type === 'WIFI' && (
                                <div className="space-y-1">
                                     <label className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold">Network Name (SSID)</label>
                                     <div className="relative">
                                        <Wifi size={14} className="absolute left-3 top-3 text-zinc-400 dark:text-zinc-500" />
                                        <input 
                                            type="text" 
                                            value={config.wifi}
                                            onChange={(e) => setConfig({...config, wifi: e.target.value})}
                                            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500/50 placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                                            placeholder="e.g. Home_5G"
                                        />
                                     </div>
                                </div>
                            )}

                            {type === 'CALENDAR' && (
                                <div className="space-y-1">
                                     <label className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold">Event Keyword</label>
                                     <div className="relative">
                                        <Calendar size={14} className="absolute left-3 top-3 text-zinc-400 dark:text-zinc-500" />
                                        <input 
                                            type="text" 
                                            value={config.calendar}
                                            onChange={(e) => setConfig({...config, calendar: e.target.value})}
                                            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500/50 placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                                            placeholder="e.g. Meeting"
                                        />
                                     </div>
                                </div>
                            )}
                            
                            <div className="pt-2 pb-1">
                                <p className="text-[11px] text-zinc-500 leading-tight">
                                    Rule will activate: <span className="text-indigo-500 dark:text-indigo-400">{generateDescription(type, config)}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3.5 rounded-full text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors hover:bg-zinc-100 dark:hover:bg-white/5"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="flex-1 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-bold shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                        >
                            Save Rule
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Rules;