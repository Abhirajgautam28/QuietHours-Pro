import React from 'react';
import { Moon, Clock, ChevronRight, Power, Zap, Wind, Timer } from 'lucide-react';
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
    <div className="flex flex-col h-full px-6 pt-8 pb-32 overflow-y-auto no-scrollbar bg-black">
      
      {/* Main Status & Toggle */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[420px] relative">
        
        {/* Background Atmosphere */}
        <AnimatePresence>
            {isDndActive && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="w-[340px] h-[340px] bg-gradient-to-tr from-indigo-900/10 via-purple-900/5 to-transparent rounded-full blur-[80px]" />
                </motion.div>
            )}
        </AnimatePresence>

        {/* The Monolith Button */}
        <motion.button
          onClick={handleToggle}
          whileTap={{ scale: 0.96 }}
          className="relative group outline-none z-10"
        >
            <motion.div 
                animate={{
                    background: isDndActive 
                        ? 'linear-gradient(145deg, #101012, #000000)' 
                        : 'linear-gradient(145deg, #0a0a0a, #000000)',
                    boxShadow: isDndActive 
                        ? '0px 20px 60px -15px rgba(0,0,0,1), inset 0px 1px 1px rgba(255,255,255,0.08)' 
                        : '0px 20px 40px -10px rgba(0,0,0,0.8), inset 0px 1px 1px rgba(255,255,255,0.05)',
                    borderWidth: '1px',
                    borderColor: isDndActive ? '#1C1C1E' : '#121212'
                }}
                className="w-64 h-64 rounded-full flex flex-col items-center justify-center relative transition-all duration-700"
            >
                {/* Active Indicator Ring */}
                <motion.div 
                    animate={{ 
                        opacity: isDndActive ? 1 : 0,
                        rotate: isDndActive ? 180 : 0
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border border-indigo-500/20" 
                    style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
                />
                
                {/* Icon Container */}
                <motion.div
                    animate={{ 
                        scale: isDndActive ? 1.05 : 1,
                        y: isDndActive ? -4 : 0
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="mb-5 relative"
                >
                    {isDndActive ? (
                        <div className="relative">
                            <Moon size={56} strokeWidth={1} fill="#818cf8" className="text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.4)]" />
                            <motion.div 
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 bg-indigo-400 blur-2xl opacity-20"
                            />
                        </div>
                    ) : (
                        <Power size={56} strokeWidth={1} className="text-zinc-700" />
                    )}
                </motion.div>
                
                <motion.div 
                    layout
                    className="flex flex-col items-center gap-1"
                >
                    <motion.span 
                        animate={{ 
                            color: isDndActive ? '#ffffff' : '#52525b'
                        }}
                        className="text-xs font-semibold tracking-[0.2em] uppercase"
                    >
                        {isDndActive ? 'Quiet Mode' : 'Off'}
                    </motion.span>
                </motion.div>
            </motion.div>
        </motion.button>

        <div className="mt-14 text-center z-10 h-20">
            <motion.h2 
                key={isDndActive ? "active" : "inactive"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-3xl font-light tracking-tight mb-2 ${isDndActive ? 'text-white' : 'text-zinc-600'}`}
            >
                {isDndActive ? 'Silence is Golden' : 'Ready to Focus?'}
            </motion.h2>
            
            <AnimatePresence mode="wait">
                {isDndActive ? (
                    <motion.div 
                        key="timer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 text-indigo-400/80 bg-indigo-900/10 px-4 py-1.5 rounded-full border border-indigo-500/10"
                    >
                        <Timer size={14} />
                        <span className="text-sm font-medium tabular-nums">until 10:00 AM</span>
                    </motion.div>
                ) : (
                    <motion.p 
                        key="prompt"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-zinc-600 font-medium"
                    >
                        Tap to reclaim your attention
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Widgets Grid */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="space-y-3"
      >
        <AnimatePresence>
            {isDndActive && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="bg-[#121212] border border-white/5 rounded-[28px] flex items-center justify-between p-2 pl-5 mb-1">
                        <div className="flex items-center gap-3">
                            <Wind size={18} className="text-zinc-400" />
                            <span className="text-sm text-zinc-300 font-medium">Extend session?</span>
                        </div>
                        <div className="flex gap-2">
                             <button className="h-10 px-5 bg-[#1C1C1E] rounded-[20px] text-xs font-semibold text-white hover:bg-[#252525] transition-colors border border-white/5">
                                +15m
                            </button>
                            <button className="h-10 px-5 bg-white text-black rounded-[20px] text-xs font-semibold hover:bg-zinc-200 transition-colors">
                                +1h
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="bg-[#121212] border border-white/5 p-6 rounded-[32px] active:scale-[0.99] transition-transform duration-200 group cursor-pointer hover:bg-[#151515]">
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2.5 items-center">
                    <div className="w-6 h-6 rounded-full bg-[#2C2C2E] flex items-center justify-center">
                         <Zap size={10} className="text-amber-400 fill-amber-400" />
                    </div>
                    <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Scheduled</span>
                </div>
                <ChevronRight size={18} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
            </div>
            
            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-light text-white tracking-tighter">10:00</span>
                <span className="text-lg text-zinc-600 font-medium">PM</span>
            </div>
            <p className="text-sm text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors">Daily Sleeping Schedule</p>
        </div>
      </motion.div>

    </div>
  );
};

export default Home;