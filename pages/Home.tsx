import React from 'react';
import { Moon, Clock, ChevronRight, Power, Zap, Wind } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
  const { isDndActive, setDndActive, setDndEndTime } = useApp();

  const handleToggle = () => {
    const newState = !isDndActive;
    setDndActive(newState);
    if (newState) {
        const date = new Date();
        date.setHours(date.getHours() + 1);
        setDndEndTime(date);
    } else {
        setDndEndTime(null);
    }
  };

  return (
    <div className="flex flex-col h-full px-5 pt-6 pb-32 overflow-y-auto no-scrollbar bg-black">
      
      {/* Main Status & Toggle */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[380px] relative">
        
        {/* Background Atmosphere */}
        <AnimatePresence>
            {isDndActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="w-[300px] h-[300px] bg-indigo-900/20 rounded-full blur-[100px]" />
                </motion.div>
            )}
        </AnimatePresence>

        {/* The Monolith Button */}
        <motion.button
          onClick={handleToggle}
          whileTap={{ scale: 0.95 }}
          className="relative group outline-none z-10"
        >
            <motion.div 
                animate={{
                    background: isDndActive 
                        ? 'linear-gradient(135deg, #1e1b4b, #000000)' 
                        : 'linear-gradient(135deg, #0a0a0a, #000000)',
                    borderColor: isDndActive ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)'
                }}
                className="w-60 h-60 rounded-full flex flex-col items-center justify-center relative border transition-colors duration-700 shadow-2xl"
            >
                {/* Inner Ring */}
                <div className="absolute inset-2 rounded-full border border-white/5" />
                
                {/* Icon Container */}
                <motion.div
                    animate={{ 
                        scale: isDndActive ? 1.1 : 1,
                        textShadow: isDndActive ? "0 0 20px rgba(129, 140, 248, 0.5)" : "none"
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="mb-4 relative"
                >
                    {isDndActive ? (
                        <Moon size={48} strokeWidth={1} fill="currentColor" className="text-indigo-400" />
                    ) : (
                        <Power size={48} strokeWidth={1} className="text-zinc-600" />
                    )}
                    
                    {/* Breathing Glow */}
                    {isDndActive && (
                        <motion.div 
                            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-indigo-500/50 blur-xl rounded-full -z-10"
                        />
                    )}
                </motion.div>
                
                <motion.span 
                    animate={{ 
                        opacity: isDndActive ? 1 : 0.4,
                        color: isDndActive ? '#a5b4fc' : '#52525b'
                    }}
                    className="text-[10px] font-bold tracking-[0.2em] uppercase"
                >
                    {isDndActive ? 'Active' : 'Offline'}
                </motion.span>
            </motion.div>
        </motion.button>

        <div className="mt-12 text-center space-y-2 z-10">
            <motion.h2 
                layout
                className={`text-3xl font-light tracking-tight ${isDndActive ? 'text-white' : 'text-zinc-600'}`}
            >
                {isDndActive ? 'Quiet Mode' : 'Focus is Off'}
            </motion.h2>
            <motion.div 
                layout
                className="flex items-center justify-center gap-2 text-sm text-zinc-500 font-medium"
            >
                {isDndActive ? (
                    <>
                        <Clock size={14} />
                        <span>Until 10:00 AM</span>
                    </>
                ) : (
                    <span>Tap to silence the world</span>
                )}
            </motion.div>
        </div>
      </div>

      {/* Widgets Grid */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="space-y-4"
      >
        <AnimatePresence>
            {isDndActive && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="bg-[#0a0a0a] border border-white/5 p-1 rounded-[24px] flex items-center justify-between pl-4 pr-1.5 py-1.5">
                        <div className="flex items-center gap-3">
                            <Wind size={18} className="text-indigo-400" />
                            <span className="text-sm text-zinc-300">Need more time?</span>
                        </div>
                        <button className="h-9 px-4 bg-[#1C1C1E] rounded-[20px] text-xs font-semibold text-white hover:bg-[#2C2C2E] transition-colors border border-white/5">
                            +30m
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[32px] active:scale-[0.99] transition-transform duration-200 group">
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full bg-[#1C1C1E] flex items-center justify-center">
                         <Zap size={10} className="text-amber-400 fill-amber-400" />
                    </div>
                    <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider">Up Next</span>
                </div>
                <ChevronRight size={18} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
            </div>
            
            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-light text-white tracking-tighter">10:00</span>
                <span className="text-lg text-zinc-600 font-medium">PM</span>
            </div>
            <p className="text-sm text-zinc-500 font-medium">Sleeping Schedule</p>
        </div>
      </motion.div>

    </div>
  );
};

export default Home;