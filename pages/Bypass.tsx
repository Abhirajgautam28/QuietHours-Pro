import React from 'react';
import { Star, PhoneCall, BellRing, Plus, MoreHorizontal, ChevronRight } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';

const Bypass: React.FC = () => {
  const { contacts, isPro } = useApp();

  return (
    <div className="pt-4 pb-32 h-full overflow-y-auto no-scrollbar bg-black">
      
      {/* Settings Section */}
      <div className="px-5 mb-8">
        <h2 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4 pl-1">Interruption Rules</h2>
        <div className="space-y-3">
            {[
                { icon: PhoneCall, title: "Repeat Callers", sub: "Ring on second attempt (3m)", active: true, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { icon: BellRing, title: "Media & Alarms", sub: "Always play media sounds", active: false, color: "text-amber-400", bg: "bg-amber-500/10" }
            ].map((item, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#121212] rounded-[24px] p-4 flex items-center justify-between border border-white/5 active:scale-[0.98] transition-transform"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                            <item.icon size={18} className={item.color} />
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-[15px]">{item.title}</h3>
                            <p className="text-xs text-zinc-500">{item.sub}</p>
                        </div>
                    </div>
                    
                    {/* Custom Toggle */}
                    <div className={`w-11 h-7 rounded-full p-1 transition-colors duration-300 ${isPro && item.active ? 'bg-indigo-500' : 'bg-zinc-800'}`}>
                        <motion.div 
                            animate={{ x: isPro && item.active ? 16 : 0 }}
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Starred Contacts Horizontal Scroll */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 px-6">
          <h2 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Starred Contacts</h2>
          <button className="text-indigo-400 text-xs font-medium">Edit</button>
        </div>

        <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-2 min-w-[64px]"
          >
            <div className="w-16 h-16 rounded-full bg-[#121212] border border-zinc-800 border-dashed flex items-center justify-center text-zinc-500 hover:bg-[#1C1C1E] transition-colors">
              <Plus size={24} strokeWidth={1.5} />
            </div>
            <span className="text-[11px] text-zinc-500 font-medium">Add</span>
          </motion.button>
          
          {contacts.map((contact, i) => (
            <motion.div 
                key={contact.id} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-2 min-w-[64px]"
            >
              <div className="relative group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white text-lg font-medium shadow-lg border border-white/5">
                  {contact.name.charAt(0)}
                </div>
                {contact.isStarred && (
                    <div className="absolute -bottom-0 -right-0 bg-[#000] rounded-full p-1 border-2 border-black">
                        <div className="bg-amber-400 rounded-full p-0.5">
                            <Star size={8} className="text-black fill-black" />
                        </div>
                    </div>
                )}
              </div>
              <span className="text-[11px] text-zinc-300 font-medium truncate w-full text-center">{contact.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

       {/* Apps List */}
       <div className="px-5">
        <h2 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-4 pl-1">Allowed Apps</h2>
        
        <div className="bg-[#121212] rounded-[28px] overflow-hidden border border-white/5 divide-y divide-white/5">
            {['Bank of America', 'Home Security', 'Calendar'].map((app, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <span className="text-[14px] text-zinc-200 font-medium">{app}</span>
                    <ChevronRight size={16} className="text-zinc-600" />
                </div>
            ))}
             <button className="w-full p-4 text-center hover:bg-white/5 transition-colors">
                <span className="text-xs text-indigo-400 font-medium">+ Add Application</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Bypass;