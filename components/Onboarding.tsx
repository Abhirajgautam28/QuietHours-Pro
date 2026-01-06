import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Zap, Shield, List, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../store/AppContext';

const Onboarding: React.FC = () => {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);

  const steps = [
    {
      id: 0,
      icon: Moon,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      title: 'Welcome to QuietHours',
      desc: 'Reclaim your focus. Silence the noise. We manage your interruptions so you can manage your life.'
    },
    {
      id: 1,
      icon: Zap,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      title: 'Smart Automation',
      desc: 'Set it and forget it. QuietHours activates automatically based on your location, WiFi, or calendar.'
    },
    {
      id: 2,
      icon: Shield,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      title: 'Emergency Bypass',
      desc: 'Never miss what matters. Allow specific contacts and repeated calls to break through the silence.'
    },
    {
      id: 3,
      icon: List,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      title: 'Notification Digest',
      desc: 'Catch up on your terms. We summarize missed notifications in a clean, clutter-free timeline.'
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
    <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-between py-12 px-6">
      {/* Skip Button */}
      <div className="w-full flex justify-end">
        <button 
          onClick={completeOnboarding}
          className="text-zinc-500 text-xs font-semibold uppercase tracking-wider p-2"
        >
          Skip
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center max-w-xs"
          >
            {/* Animated Icon Ring */}
            <div className="relative mb-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-zinc-800"
              />
              <div className={`w-24 h-24 rounded-full ${steps[step].bg} flex items-center justify-center border border-white/5 shadow-2xl relative z-10`}>
                {React.createElement(steps[step].icon, { 
                  size: 40, 
                  strokeWidth: 1.5,
                  className: steps[step].color 
                })}
              </div>
              <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl -z-10" />
            </div>

            <h2 className="text-3xl font-light text-white mb-4 tracking-tight">
              {steps[step].title}
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {steps[step].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation & Indicators */}
      <div className="w-full flex flex-col items-center gap-8">
        {/* Dots */}
        <div className="flex gap-2">
          {steps.map((s) => (
            <div 
              key={s.id} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s.id ? 'w-6 bg-white' : 'w-1.5 bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="w-full h-14 bg-white rounded-full flex items-center justify-center gap-2 shadow-xl shadow-white/5 group"
        >
          <span className="text-black font-semibold text-sm">
            {step === steps.length - 1 ? 'Get Started' : 'Next'}
          </span>
          {step === steps.length - 1 ? (
             <Check size={18} className="text-black" />
          ) : (
             <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Onboarding;