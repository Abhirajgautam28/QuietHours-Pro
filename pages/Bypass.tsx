import React, { useState } from 'react';
import { Star, PhoneCall, BellRing, Plus, MoreHorizontal, ChevronRight, Settings2, Trash2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Contact } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const Bypass: React.FC = () => {
  const { contacts, isPro, addContact, updateContact, deleteContact, triggerHaptic } = useApp();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [isStarred, setIsStarred] = useState(true);
  const [allowRepeated, setAllowRepeated] = useState(true);

  const openAddModal = () => {
    triggerHaptic();
    setEditingContact(null);
    setName('');
    setIsStarred(true);
    setAllowRepeated(true);
    setIsModalOpen(true);
  };

  const openEditModal = (contact: Contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setIsStarred(contact.isStarred);
    setAllowRepeated(contact.allowRepeated);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    triggerHaptic();
    if (!name) return;
    
    if (editingContact) {
        updateContact({
            ...editingContact,
            name,
            isStarred,
            allowRepeated
        });
    } else {
        addContact({
            id: Date.now().toString(),
            name,
            isStarred,
            allowRepeated
        });
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    triggerHaptic();
    if (editingContact) {
        deleteContact(editingContact.id);
        setIsModalOpen(false);
    }
  };

  return (
    <div className="pt-6 pb-32 h-full overflow-y-auto no-scrollbar scroll-smooth-native bg-zinc-50 dark:bg-black relative transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="px-6 mb-8">
        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">Emergency Override</h2>
        
        {/* Starred Contacts Horizontal Scroll */}
        <div className="relative -mx-6 mb-8">
             <div className="flex gap-5 overflow-x-auto px-6 pb-6 no-scrollbar snap-x">
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={openAddModal}
                    className="flex flex-col items-center gap-3 min-w-[72px] snap-start"
                >
                    <div className="w-[72px] h-[72px] rounded-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 border-dashed flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-[#1C1C1E] transition-all shadow-sm dark:shadow-none">
                        <Plus size={28} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">Add New</span>
                </motion.button>
                
                {contacts.map((contact, i) => (
                    <motion.div 
                        key={contact.id} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex flex-col items-center gap-3 min-w-[72px] snap-start relative group"
                        onClick={() => openEditModal(contact)}
                    >
                        <div className="relative cursor-pointer">
                            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-[#2C2C2E] dark:to-[#1C1C1E] flex items-center justify-center text-zinc-700 dark:text-white text-xl font-medium shadow-sm dark:shadow-lg border border-white dark:border-white/5 group-hover:border-zinc-300 dark:group-hover:border-white/20 transition-colors">
                                {contact.name.charAt(0)}
                            </div>
                            {contact.isStarred && (
                                <div className="absolute -bottom-1 -right-1 bg-zinc-50 dark:bg-black rounded-full p-1.5 border-[3px] border-zinc-50 dark:border-black">
                                    <div className="bg-amber-400 rounded-full p-0.5 shadow-sm">
                                        <Star size={10} className="text-amber-900 fill-amber-900" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium truncate w-full text-center">{contact.name}</span>
                    </motion.div>
                ))}
            </div>
            {/* Fade Effect */}
            <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-zinc-50 dark:from-black to-transparent pointer-events-none" />
        </div>

        {/* Global Settings */}
        <div className="space-y-4">
            {[
                { icon: PhoneCall, title: "Repeat Callers", sub: "Second call within 3 minutes", active: true, color: "text-white", bg: "bg-emerald-500" },
                { icon: BellRing, title: "Media Sounds", sub: "Videos, Music, Games", active: false, color: "text-white", bg: "bg-amber-500" }
            ].map((item, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="bg-white dark:bg-[#121212] rounded-[28px] p-5 flex items-center justify-between border border-zinc-200 dark:border-white/5 active:scale-[0.99] transition-transform shadow-sm dark:shadow-none"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-[18px] ${item.active ? item.bg : 'bg-zinc-100 dark:bg-[#1C1C1E]'} flex items-center justify-center transition-colors duration-300 shadow-inner`}>
                            <item.icon size={22} className={item.active ? 'text-white' : 'text-zinc-400 dark:text-zinc-600'} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-zinc-900 dark:text-white font-medium text-[16px] mb-0.5">{item.title}</h3>
                            <p className="text-xs text-zinc-500">{item.sub}</p>
                        </div>
                    </div>
                    
                    {/* Custom Toggle */}
                    <button 
                        onClick={() => triggerHaptic()}
                        className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${isPro && item.active ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800'}`}
                    >
                        <motion.div 
                            animate={{ x: isPro && item.active ? 20 : 0 }}
                            className={`w-5 h-5 rounded-full shadow-md ${isPro && item.active ? 'bg-white' : 'bg-white dark:bg-zinc-600'}`}
                        />
                    </button>
                </motion.div>
            ))}
        </div>
      </div>

       {/* Apps List */}
       <div className="px-6 mt-10">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Allowed Applications</h2>
            <Settings2 size={16} className="text-zinc-600" />
        </div>
        
        <div className="bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/5 divide-y divide-zinc-100 dark:divide-white/5 shadow-sm dark:shadow-none">
            {['Bank of America', 'Home Security', 'Calendar'].map((app, i) => (
                <div key={i} className="p-5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                    <span className="text-[15px] text-zinc-700 dark:text-zinc-200 font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{app}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-500/80 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">Always</span>
                        <ChevronRight size={16} className="text-zinc-400 dark:text-zinc-700 group-hover:text-zinc-600 dark:group-hover:text-zinc-500 transition-colors" />
                    </div>
                </div>
            ))}
             <button className="w-full p-5 text-center hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">+ Add Application</span>
            </button>
        </div>
      </div>

      {/* Add/Edit Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
                onClick={() => setIsModalOpen(false)}
            >
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                    className="w-full md:max-w-sm bg-white dark:bg-[#121212] border-t md:border border-white/10 rounded-t-[32px] md:rounded-[32px] p-8 shadow-2xl"
                >
                    <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-full mx-auto mb-8 md:hidden" />
                    
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-light text-zinc-900 dark:text-white">
                            {editingContact ? 'Edit Contact' : 'New Contact'}
                        </h3>
                        {editingContact && (
                             <button onClick={handleDelete} className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-full text-rose-500 dark:text-rose-400">
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Contact Name</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-zinc-50 dark:bg-[#1C1C1E] border border-zinc-200 dark:border-white/5 rounded-2xl px-5 py-4 text-zinc-900 dark:text-white text-base focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                placeholder="e.g. Mom"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-[#1C1C1E] rounded-2xl border border-zinc-200 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 dark:bg-amber-500/10 rounded-full text-amber-500 dark:text-amber-400">
                                        <Star size={18} />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">Star Contact</span>
                                </div>
                                <button 
                                    onClick={() => { triggerHaptic(); setIsStarred(!isStarred); }}
                                    className={`w-12 h-7 rounded-full p-1 transition-colors ${isStarred ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-800'}`}
                                >
                                    <motion.div animate={{ x: isStarred ? 20 : 0 }} className="w-5 h-5 bg-white rounded-full shadow-sm" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-[#1C1C1E] rounded-2xl border border-zinc-200 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-full text-emerald-500 dark:text-emerald-400">
                                        <PhoneCall size={18} />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">Repeat Callers</span>
                                </div>
                                <button 
                                    onClick={() => { triggerHaptic(); setAllowRepeated(!allowRepeated); }}
                                    className={`w-12 h-7 rounded-full p-1 transition-colors ${allowRepeated ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-800'}`}
                                >
                                    <motion.div animate={{ x: allowRepeated ? 20 : 0 }} className="w-5 h-5 bg-white rounded-full shadow-sm" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-10">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-4 rounded-full text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="flex-1 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-bold shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bypass;