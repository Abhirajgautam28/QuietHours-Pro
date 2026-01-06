import React, { useState } from 'react';
import { MapPin, Wifi, Calendar, Clock, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
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
  const { rules, toggleRule, addRule, updateRule, deleteRule, isPro } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<Rule['type']>('TIME');
  const [description, setDescription] = useState('');

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button[role="switch"]')) return;
    setExpandedId(expandedId === id ? null : id);
  };

  const openAddModal = () => {
    setEditingRule(null);
    setName('');
    setType('TIME');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (rule: Rule) => {
    setEditingRule(rule);
    setName(rule.name);
    setType(rule.type);
    setDescription(rule.description);
    setIsModalOpen(true);
    setExpandedId(null); // Close the expansion
  };

  const handleSave = () => {
    if (!name || !description) return;
    
    if (editingRule) {
      updateRule({
        ...editingRule,
        name,
        type,
        description
      });
    } else {
      addRule({
        id: Date.now().toString(),
        name,
        type,
        isActive: true,
        description
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteRule(id);
    setExpandedId(null);
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
                                    <button 
                                      onClick={() => openEditModal(rule)}
                                      className="flex-1 h-10 bg-[#1C1C1E] rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-white hover:bg-[#252525] transition-colors border border-white/5"
                                    >
                                        <Edit2 size={14} className="text-zinc-400" />
                                        Edit
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(rule.id)}
                                      className="flex-1 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors border border-rose-500/10"
                                    >
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
        onClick={() => {
            if (isModalOpen) setIsModalOpen(false);
            else openAddModal();
        }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-28 right-6 w-16 h-16 bg-white rounded-[24px] text-black shadow-2xl flex items-center justify-center z-30 group overflow-hidden"
      >
        <motion.div
            animate={{ rotate: isModalOpen ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
             <Plus size={30} strokeWidth={2} />
        </motion.div>
      </motion.button>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsModalOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                    className="w-full max-w-sm bg-[#121212] border border-white/10 rounded-[32px] p-6 shadow-2xl"
                >
                    <h3 className="text-xl font-light text-white mb-6">
                        {editingRule ? 'Edit Rule' : 'New Automation'}
                    </h3>
                    
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Rule Name</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#1C1C1E] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-zinc-600"
                                placeholder="e.g. Work Mode"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Trigger Type</label>
                            <div className="grid grid-cols-4 gap-2">
                                {(['TIME', 'LOCATION', 'WIFI', 'CALENDAR'] as const).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setType(t)}
                                        className={`h-10 rounded-xl flex items-center justify-center border transition-colors ${
                                            type === t 
                                            ? 'bg-indigo-500 border-indigo-500 text-white' 
                                            : 'bg-[#1C1C1E] border-white/5 text-zinc-400 hover:bg-[#252525]'
                                        }`}
                                    >
                                        <RuleIcon type={t} isActive={type === t} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Description</label>
                            <input 
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-[#1C1C1E] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-zinc-600"
                                placeholder="e.g. 9:00 AM - 5:00 PM"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 rounded-full text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="flex-1 py-3 rounded-full bg-white text-black text-sm font-bold shadow-lg hover:bg-zinc-200 transition-colors"
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