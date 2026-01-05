import React from 'react';
import { Star, PhoneCall, BellRing, Plus, MoreHorizontal } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';

const Bypass: React.FC = () => {
  const { contacts, isPro } = useApp();

  return (
    <div className="px-4 pt-2 pb-24 h-full overflow-y-auto no-scrollbar">
      
      {/* Toggles */}
      <div className="space-y-2 mb-8">
        {[
            { icon: PhoneCall, title: "Repeat Callers", sub: "Second call within 5 min rings", color: "text-rose-300", bg: "bg-rose-500/10" },
            { icon: BellRing, title: "Media & Alarms", sub: "Always play media sounds", color: "text-amber-300", bg: "bg-amber-500/10" }
        ].map((item, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1e2432] rounded-[24px] p-5 flex items-center justify-between"
             >
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                        <item.icon size={20} className={item.color} />
                    </div>
                    <div>
                        <h3 className="text-slate-200 font-medium text-[15px]">{item.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                </div>
                {/* Switch Mockup */}
                <div className={`w-10 h-6 rounded-full flex items-center px-1 ${isPro ? 'bg-indigo-500 justify-end' : 'bg-slate-700 justify-start'}`}>
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
            </motion.div>
        ))}
      </div>

      {/* Starred Contacts */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-slate-200 text-sm font-medium">Starred Contacts</h2>
          <MoreHorizontal size={20} className="text-slate-500" />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 px-2 no-scrollbar">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 min-w-[72px]"
          >
            <div className="w-16 h-16 rounded-full bg-[#1e2432] border border-slate-700 border-dashed flex items-center justify-center text-slate-500">
              <Plus size={24} />
            </div>
            <span className="text-xs text-slate-500 font-medium">Add</span>
          </motion.button>
          
          {contacts.map((contact, i) => (
            <motion.div 
                key={contact.id} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-2 min-w-[72px]"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-slate-200 text-xl font-medium">
                  {contact.name.charAt(0)}
                </div>
                {contact.isStarred && (
                    <div className="absolute -bottom-0 -right-0 bg-[#0b0f19] rounded-full p-1.5 border border-[#1e2432]">
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                    </div>
                )}
              </div>
              <span className="text-xs text-slate-300 font-medium truncate w-full text-center">{contact.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

       {/* Priority Apps */}
       <div>
        <h2 className="text-slate-200 text-sm font-medium mb-4 px-2">Apps that can interrupt</h2>
        
        <div className="bg-[#1e2432] rounded-[28px] overflow-hidden">
            {['Bank of America', 'Home Security', 'Calendar'].map((app, i) => (
                <div key={i} className="p-5 flex items-center justify-between border-b border-slate-800/50 last:border-0">
                    <span className="text-sm text-slate-300 font-medium">{app}</span>
                    <button className="text-xs text-indigo-300 font-medium">Allow</button>
                </div>
            ))}
             <div className="p-4 bg-slate-800/30 text-center">
                <span className="text-xs text-slate-500">+ Add Apps</span>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Bypass;