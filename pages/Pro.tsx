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
        staggerChildren: 0.1,
        delayChildren: 0.1
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-10 mt-4 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
        <h2 className="text-3xl font-light text-white mb-2 tracking-tight relative z-10">
          Unlock <span className="font-semibold text-white">Calm</span>
        </h2>
        <p className="text-zinc-500 text-sm max-w-[220px] mx-auto leading-relaxed relative z-10">
          Automate your peace of mind with advanced control.
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
            { icon: Zap, title: "Smart Automation", desc: "Triggers based on your location" },
            { icon: Shield, title: "Precision Bypass", desc: "Allow specific contacts & apps" },
            { icon: Sparkles, title: "Notification Digest", desc: "Summary of missed alerts" },
        ].map((feat, i) => (
            <motion.div 
                key={i} 
                variants={item}
                className="flex items-center gap-4 p-4 rounded-[24px] bg-[#121212] border border-white/5"
            >
                <div className="w-12 h-12 rounded-2xl bg-[#1a1a1a] flex items-center justify-center text-zinc-100 shrink-0 border border-white/5">
                    <feat.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="font-medium text-white text-[15px]">{feat.title}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{feat.desc}</p>
                </div>
            </motion.div>
        ))}
      </motion.div>

      {/* Pricing Toggle & Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
            {/* Monthly Card */}
            <button 
                onClick={() => setSelectedPlan('monthly')}
                className={`relative p-5 rounded-[32px] border transition-all duration-300 text-left h-44 flex flex-col justify-between overflow-hidden group ${
                    selectedPlan === 'monthly' 
                    ? 'bg-[#151515] border-white/20' 
                    : 'bg-black border-zinc-900 hover:border-zinc-800'
                }`}
            >
                <div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Monthly</div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-light text-white tracking-tighter">$4.99</span>
                    </div>
                </div>
                <div className="text-[11px] text-zinc-500 font-medium">7-day free trial</div>
                
                {selectedPlan === 'monthly' && (
                    <motion.div 
                        layoutId="selection-ring"
                        className="absolute inset-0 border-2 border-indigo-500 rounded-[32px] pointer-events-none opacity-50"
                    />
                )}
            </button>

            {/* Yearly Card */}
            <button 
                onClick={() => setSelectedPlan('yearly')}
                className={`relative p-5 rounded-[32px] border transition-all duration-300 text-left h-44 flex flex-col justify-between overflow-hidden group ${
                    selectedPlan === 'yearly' 
                    ? 'bg-[#151515] border-white/20' 
                    : 'bg-black border-zinc-900 hover:border-zinc-800'
                }`}
            >
                <div className="absolute top-0 right-0 bg-white text-black px-3 py-1.5 rounded-bl-[20px]">
                    <span className="text-[9px] font-bold tracking-wide">SAVE 50%</span>
                </div>

                <div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Yearly</div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-light text-white tracking-tighter">$29.99</span>
                    </div>
                </div>
                <div className="text-[11px] text-zinc-500 font-medium">$2.49 / month</div>

                {selectedPlan === 'yearly' && (
                    <motion.div 
                        layoutId="selection-ring"
                        className="absolute inset-0 border-2 border-indigo-500 rounded-[32px] pointer-events-none opacity-50"
                    />
                )}
            </button>
        </div>

        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSubscribe}
            className="w-full py-5 rounded-full bg-white text-black font-bold text-sm shadow-xl shadow-white/5 hover:bg-zinc-200 transition-colors mt-6"
        >
            {isPro ? 'Plan Active' : `Start 7-Day Free Trial`}
        </motion.button>

        <p className="text-center text-[10px] text-zinc-600 mt-6 leading-relaxed px-8">
            Recurring billing. Cancel anytime in Google Play.
        </p>
      </motion.div>
    </div>
  );
};

export default Pro;