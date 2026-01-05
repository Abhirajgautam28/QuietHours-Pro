import React from 'react';
import { Moon, Clock, ChevronRight, Power } from 'lucide-react';
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
    <div className="flex flex-col h-full px-6 pt-4 pb-24 overflow-y-auto no-scrollbar">
      
      {/* Main Toggle Area */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[360px]">
        <motion.button
          onClick={handleToggle}
          whileTap={{ scale: 0.95 }}
          className="relative z-10"
        >
          {/* Animated Background Layers */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <AnimatePresence>
                {isDndActive && (
                    <>
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0.15 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            className="w-64 h-64 rounded-full bg-indigo-500 blur-2xl absolute"
                        />
                         <motion.div 
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 0.1 }}
                            exit={{ scale: 1, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
                            className="w-64 h-64 rounded-full bg-purple-500 blur-3xl absolute"
                        />
                    </>
                )}
             </AnimatePresence>
          </div>

          {/* The Button */}
          <motion.div 
            animate={{
                backgroundColor: isDndActive ? '#312e81' : '#1e293b', // indigo-900 vs slate-800
                boxShadow: isDndActive ? '0 0 0 1px rgba(99, 102, 241, 0.3)' : '0 0 0 0px transparent'
            }}
            className="w-48 h-48 rounded-[3rem] flex items-center justify-center relative shadow-2xl transition-colors duration-500"
          >
             <motion.div
                animate={{ rotate: isDndActive ? 0 : -10, scale: isDndActive ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
             >
                 {isDndActive ? (
                    <Moon size={64} className="text-indigo-200" fill="currentColor" />
                 ) : (
                    <Power size={64} className="text-slate-500" />
                 )}
             </motion.div>
          </motion.div>
        </motion.button>

        <div className="mt-8 text-center space-y-2">
            <motion.h2 
                layout
                className={`text-3xl font-light tracking-tight ${isDndActive ? 'text-indigo-100' : 'text-slate-400'}`}
            >
                {isDndActive ? 'Quiet Mode' : 'Focus Off'}
            </motion.h2>
            <motion.p 
                layout
                className="text-sm text-slate-500 font-medium"
            >
                {isDndActive ? 'Until 11:30 PM' : 'Tap to silence distractions'}
            </motion.p>
        </div>
      </div>

      {/* Action Cards */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {isDndActive && (
            <div className="p-4 bg-[#1e293b] rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                        <Clock size={20} className="text-indigo-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-200">Add 30 mins</span>
                        <span className="text-xs text-slate-500">Extend focus time</span>
                    </div>
                </div>
                <button className="px-4 py-2 bg-slate-700/50 rounded-full text-xs font-medium text-indigo-300">
                    +30m
                </button>
            </div>
        )}

        <div className="p-5 bg-[#1e293b] rounded-[2rem] hover:bg-[#253045] transition-colors cursor-pointer group">
            <div className="flex justify-between items-center mb-4">
                <span className="text-slate-200 font-medium text-sm">Next Schedule</span>
                <ChevronRight size={18} className="text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-slate-100">10:00</span>
                <span className="text-sm text-slate-500 font-medium">PM</span>
                <span className="text-sm text-slate-500 ml-auto">Sleeping</span>
            </div>
            <div className="mt-4 flex gap-1">
                {['S','M','T','W','T','F','S'].map((day, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i > 0 && i < 6 ? 'bg-indigo-500' : 'bg-slate-700'}`} />
                ))}
            </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Home;