import React from 'react';
import { Star, PhoneCall, BellRing, Plus, MoreHorizontal, ChevronRight, Settings2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';

const Bypass: React.FC = () => {
  const { contacts, isPro } = useApp();

  return (
    <div className="pt-6 pb-32 h-full overflow-y-auto no-scrollbar bg-black">
      
      {/* Hero Section */}
      <div className="px-6 mb-8">
        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">Emergency Override</h2>
        
        {/* Starred Contacts Horizontal Scroll */}
        <div className="relative -mx-6 mb-8">
             <div className="flex gap-5 overflow-x-auto px-6 pb-6 no-scrollbar snap-x">
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-3 min-w-[72px] snap-start"
                >
                    <div className="w-[72px] h-[72px] rounded-full bg-[#121212] border border-zinc-800 border-dashed flex items-center justify-center text-zinc-500 hover:bg-[#1C1C1E] hover:border-zinc-600 transition-all">
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
                    >
                        <div className="relative">
                            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-b from-[#2C2C2E] to-[#1C1C1E] flex items-center justify-center text-white text-xl font-medium shadow-lg border border-white/5 group-hover:border-white/20 transition-colors">
                                {contact.name.charAt(0)}
                            </div>
                            {contact.isStarred && (
                                <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1.5 border-[3px] border-black">
                                    <div className="bg-amber-400 rounded-full p-0.5 shadow-sm">
                                        <Star size={10} className="text-amber-900 fill-amber-900" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <span className="text-xs text-zinc-300 font-medium truncate w-full text-center">{contact.name}</span>
                    </motion.div>
                ))}
            </div>
            {/* Fade Effect */}
            <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />
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
                    className="bg-[#121212] rounded-[28px] p-5 flex items-center justify-between border border-white/5 active:scale-[0.99] transition-transform"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-[18px] ${item.active ? item.bg : 'bg-[#1C1C1E]'} flex items-center justify-center transition-colors duration-300 shadow-inner`}>
                            <item.icon size={22} className={item.active ? 'text-white' : 'text-zinc-600'} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-[16px] mb-0.5">{item.title}</h3>
                            <p className="text-xs text-zinc-500">{item.sub}</p>
                        </div>
                    </div>
                    
                    {/* Custom Toggle */}
                    <button className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${isPro && item.active ? 'bg-indigo-600' : 'bg-zinc-900 border border-zinc-800'}`}>
                        <motion.div 
                            animate={{ x: isPro && item.active ? 20 : 0 }}
                            className={`w-5 h-5 rounded-full shadow-md ${isPro && item.active ? 'bg-white' : 'bg-zinc-600'}`}
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
        
        <div className="bg-[#121212] rounded-[32px] overflow-hidden border border-white/5 divide-y divide-white/5">
            {['Bank of America', 'Home Security', 'Calendar'].map((app, i) => (
                <div key={i} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                    <span className="text-[15px] text-zinc-200 font-medium group-hover:text-white transition-colors">{app}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">Always</span>
                        <ChevronRight size={16} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                    </div>
                </div>
            ))}
             <button className="w-full p-5 text-center hover:bg-white/5 transition-colors group">
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider group-hover:text-indigo-300 transition-colors">+ Add Application</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Bypass;