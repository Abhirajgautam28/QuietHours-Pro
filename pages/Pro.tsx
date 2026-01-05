import React from 'react';
import { Check, Star, Shield, Zap } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';

const Pro: React.FC = () => {
  const { setPro, isPro } = useApp();

  const handleSubscribe = () => {
      setPro(true);
  };

  return (
    <div className="px-6 pt-4 pb-24 h-full overflow-y-auto no-scrollbar">
      <div className="text-center mb-10 mt-4">
        <h2 className="text-3xl font-light text-white mb-2">
          QuietHours <span className="font-bold text-indigo-400">Pro</span>
        </h2>
        <p className="text-slate-500 text-sm">Automate your peace of mind.</p>
      </div>

      {/* Feature List */}
      <div className="space-y-6 mb-12">
        {[
            { icon: Zap, title: "Smart Automation", desc: "Geo-fencing & WiFi triggers" },
            { icon: Shield, title: "Emergency Bypass", desc: "Granular control over interruptions" },
            { icon: Star, title: "Notification Digest", desc: "Summary of what you missed" },
        ].map((feat, i) => (
            <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-5"
            >
                <div className="w-12 h-12 rounded-2xl bg-[#1e2432] flex items-center justify-center text-indigo-300 shrink-0">
                    <feat.icon size={22} />
                </div>
                <div>
                    <h3 className="font-medium text-slate-200 text-[15px]">{feat.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{feat.desc}</p>
                </div>
            </motion.div>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={handleSubscribe}
            className={`p-5 rounded-[28px] border-2 text-center transition-all flex flex-col justify-between h-40 ${
                isPro ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-[#1e2432] hover:bg-slate-800'
            }`}
        >
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly</div>
            <div>
                 <div className="text-2xl font-bold text-white">$4.99</div>
                 <div className="text-[10px] text-slate-500 mt-1">7-day free trial</div>
            </div>
        </motion.button>

        <motion.button 
            whileTap={{ scale: 0.98 }}
             onClick={handleSubscribe}
            className="relative p-5 rounded-[28px] bg-indigo-500 text-center flex flex-col justify-between h-40 shadow-xl shadow-indigo-900/40"
        >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b0f19] text-indigo-300 text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap border border-indigo-500/50">
                BEST VALUE
            </div>
            <div className="text-xs font-semibold text-indigo-950 uppercase tracking-wider opacity-60">Yearly</div>
            <div>
                <div className="text-2xl font-bold text-[#0b0f19]">$29.99</div>
                <div className="text-[10px] text-indigo-950 mt-1 font-medium">$2.49 / month</div>
            </div>
        </motion.button>
      </div>

      <p className="text-center text-[10px] text-slate-600 mt-8 leading-relaxed">
        Payment charged to Google Play Account at confirmation of purchase. <br/>
        Subscription automatically renews.
      </p>

    </div>
  );
};

export default Pro;