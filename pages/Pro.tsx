import React, { useState } from 'react';
import { Star, Shield, Zap, Check, Sparkles } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Pro: React.FC = () => {
  const { setPro, isPro } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleSubscribe = () => {
    setPro(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="px-6 pt-6 pb-32 h-full overflow-y-auto no-scrollbar bg-black">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 mt-2 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] pointer-events-none" />
        <h2 className="text-3xl font-light text-white mb-2 tracking-tight relative z-10">
          Unlock <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Calm</span>
        </h2>
        <p className="text-zinc-500 text-sm max-w-[200px] mx-auto leading-relaxed relative z-10">
          Advanced automation for a distraction-free life.
        </p>
      </motion.div>

      {/* Feature List */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4 mb-10"
      >
        {[
            { icon: Zap, title: "Smart Automation", desc: "Location & WiFi triggers" },
            { icon: Shield, title: "Precision Bypass", desc: "Fine-grained contact control" },
            { icon: Sparkles, title: "Notification Digest", desc: "Timeline summary view" },
        ].map((feat, i) => (
            <motion.div 
                key={i} 
                variants={item}
                className="flex items-center gap-4 p-4 rounded-[24px] bg-[#121212] border border-white/5"
            >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1c1c1e] to-black flex items-center justify-center text-indigo-400 shrink-0 border border-white/5 shadow-inner">
                    <feat.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="font-medium text-white text-[15px]">{feat.title}</h3>
                    <p className="text-xs text-zinc-500">{feat.desc}</p>
                </div>
            </motion.div>
        ))}
      </motion.div>

      {/* Pricing Toggle & Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
            {/* Monthly Card */}
            <button 
                onClick={() => setSelectedPlan('monthly')}
                className={`relative p-5 rounded-[28px] border transition-all duration-300 text-left h-40 flex flex-col justify-between overflow-hidden group ${
                    selectedPlan === 'monthly' 
                    ? 'bg-[#1C1C1E] border-indigo-500/50 shadow-lg shadow-indigo-900/10' 
                    : 'bg-black border-zinc-800 opacity-60 hover:opacity-100'
                }`}
            >
                <div>
                    <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Monthly</div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-light text-white">$4.99</span>
                    </div>
                </div>
                <div className="text-[11px] text-zinc-500">7-day free trial</div>
                
                {selectedPlan === 'monthly' && (
                    <motion.div 
                        layoutId="selection-ring"
                        className="absolute inset-0 border-2 border-indigo-500/30 rounded-[28px] pointer-events-none"
                    />
                )}
            </button>

            {/* Yearly Card */}
            <button 
                onClick={() => setSelectedPlan('yearly')}
                className={`relative p-5 rounded-[28px] border transition-all duration-300 text-left h-40 flex flex-col justify-between overflow-hidden group ${
                    selectedPlan === 'yearly' 
                    ? 'bg-[#1C1C1E] border-indigo-500/50 shadow-lg shadow-indigo-900/10' 
                    : 'bg-black border-zinc-800 opacity-60 hover:opacity-100'
                }`}
            >
                <div className="absolute top-0 right-0 bg-[#1C1C1E] px-3 py-1.5 rounded-bl-[20px] border-l border-b border-white/5">
                    <span className="text-[9px] font-bold text-indigo-400 tracking-wide">SAVE 50%</span>
                </div>

                <div>
                    <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Yearly</div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-light text-white">$29.99</span>
                    </div>
                </div>
                <div className="text-[11px] text-zinc-500">$2.49 / month</div>

                {selectedPlan === 'yearly' && (
                    <motion.div 
                        layoutId="selection-ring"
                        className="absolute inset-0 border-2 border-indigo-500/30 rounded-[28px] pointer-events-none"
                    />
                )}
            </button>
        </div>

        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSubscribe}
            className="w-full py-4 rounded-full bg-white text-black font-semibold text-sm shadow-xl shadow-white/5 hover:bg-zinc-100 transition-colors mt-4"
        >
            {isPro ? 'Plan Active' : `Start 7-Day Free Trial`}
        </motion.button>

        <p className="text-center text-[10px] text-zinc-600 mt-6 leading-relaxed px-8">
            Cancel anytime in Google Play. No questions asked.
        </p>
      </motion.div>
    </div>
  );
};

export default Pro;