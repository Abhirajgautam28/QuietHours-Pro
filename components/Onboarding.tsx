import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Zap, Shield, List, ChevronRight, Check, Crown } from 'lucide-react';
import { useApp } from '../store/AppContext';

const Onboarding: React.FC = () => {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);

  const steps = [
    {
      id: 0,
      icon: Moon,
      color: 'text-indigo-400',
      glow: 'shadow-indigo-500/50',
      gradient: 'from-indigo-900/40',
      title: 'Master Your Focus',
      desc: 'QuietHours gives you granular control over interruptions. Silence the noise, keep the important stuff.',
      isPro: false
    },
    {
      id: 1,
      icon: Zap,
      color: 'text-amber-400',
      glow: 'shadow-amber-500/50',
      gradient: 'from-amber-900/40',
      title: 'Smart Automation',
      desc: 'Triggers that work for you. Activate Quiet Mode automatically based on location, WiFi, or calendar.',
      isPro: true
    },
    {
      id: 2,
      icon: Shield,
      color: 'text-emerald-400',
      glow: 'shadow-emerald-500/50',
      gradient: 'from-emerald-900/40',
      title: 'Precision Bypass',
      desc: 'Never miss an emergency. Allow specific contacts or repeated calls to break through the silence.',
      isPro: true
    },
    {
      id: 3,
      icon: List,
      color: 'text-rose-400',
      glow: 'shadow-rose-500/50',
      gradient: 'from-rose-900/40',
      title: 'Notification Digest',
      desc: 'Stay informed, not distracted. Review a clean summary of missed alerts when you are ready.',
      isPro: true
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black text-white flex flex-col overflow-hidden font-sans">
      
      {/* Dynamic Background */}
      <motion.div 
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-b ${steps[step].gradient} to-black pointer-events-none`}
      />

      {/* Skip Button */}
      <div className="w-full flex justify-end p-6 z-10 pt-safe">
        <button 
          onClick={completeOnboarding}
          className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 text-xs font-semibold tracking-wide transition-colors backdrop-blur-md border border-white/5 active:scale-95 transform"
        >
          SKIP
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            {/* Icon Ring */}
            <div className="relative mb-12">
               {/* Ambient Glow */}
               <div className={`absolute inset-0 ${steps[step].color.replace('text-', 'bg-')} blur-[60px] opacity-20`} />
               
               <div className="relative w-32 h-32 rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-2xl">
                  {React.createElement(steps[step].icon, { 
                    size: 48, 
                    strokeWidth: 1.5,
                    className: `${steps[step].color} drop-shadow-lg` 
                  })}
               </div>
               
               {steps[step].isPro && (
                   <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -top-3 -right-3 bg-white text-black text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg"
                   >
                       <Crown size={10} fill="currentColor" />
                       PRO
                   </motion.div>
               )}
            </div>

            <h2 className="text-3xl font-light tracking-tight mb-4 text-white">
              {steps[step].title}
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed font-light">
              {steps[step].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="p-8 z-10 w-full max-w-md mx-auto pb-safe">
         <div className="flex items-center justify-between">
            {/* Progress Dots */}
            <div className="flex gap-2.5">
                {steps.map((s, i) => (
                    <motion.div 
                        key={s.id}
                        animate={{ 
                            width: step === i ? 24 : 6,
                            backgroundColor: step === i ? '#ffffff' : '#3f3f46'
                        }}
                        className="h-1.5 rounded-full"
                    />
                ))}
            </div>

            {/* Next Button */}
            <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleNext}
                className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-zinc-200 transition-colors"
            >
                {step === steps.length - 1 ? (
                    <Check size={24} className="text-black" strokeWidth={2.5} />
                ) : (
                    <ChevronRight size={24} className="text-black ml-0.5" strokeWidth={2.5} />
                )}
            </motion.button>
         </div>
      </div>
    </div>
  );
};

export default Onboarding;