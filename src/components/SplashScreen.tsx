import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Cpu } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('جاري فحص الاتصال المشفر...');

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // 3 seconds exact specification

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calculatedProgress);

      if (calculatedProgress < 35) {
        setStatusText('جاري تهيئة بروتوكول الحماية...');
      } else if (calculatedProgress < 70) {
        setStatusText('جاري الاتصال بخوادم MR DOLLAR VIP...');
      } else if (calculatedProgress < 95) {
        setStatusText('جاري تحميل بيئة السكربت المتقدمة...');
      } else {
        setStatusText('جاهز للتشغيل والتحقق...');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden select-none px-4">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-yellow-400/15 rounded-full blur-[60px] pointer-events-none" />

      {/* Cyber Grid Background Matrix */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:28px_28px]" 
      />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        
        {/* Prominent Circular Logo Container with Pulsing Glow & Animation */}
        <div className="relative mb-8">
          
          {/* Pulsing Outer Glow Ring */}
          <div className="absolute -inset-4 rounded-full bg-yellow-400/20 blur-xl animate-pulse" />
          
          {/* Rotating decorative dashed orbit ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full border border-dashed border-yellow-400/40 pointer-events-none"
          />

          {/* Logo container with continuous subtle rotation or bounce */}
          <motion.div
            animate={{ 
              y: [-6, 6, -6],
              rotate: [-2, 2, -2]
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-3 border-[#FFD700] shadow-[0_0_35px_rgba(255,215,0,0.5),inset_0_0_20px_rgba(255,215,0,0.2)]"
          >
            {/* Dollar / MR Emblem */}
            <div className="relative flex flex-col items-center justify-center">
              <span className="font-black text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-500 drop-shadow-[0_4px_12px_rgba(255,215,0,0.6)] font-['Outfit',sans-serif] tracking-tight">
                $
              </span>
              <span className="text-[10px] font-extrabold text-[#FFD700] tracking-[0.25em] uppercase -mt-1 font-['Outfit',sans-serif]">
                VIP SCRIPT
              </span>
            </div>

            {/* Subtle light reflection sheen */}
            <div className="absolute top-2 left-5 w-8 h-4 rounded-full bg-white/20 blur-[1px] rotate-[-30deg]" />
          </motion.div>
        </div>

        {/* Site Name directly below logo: MR in white, DOLLAR in yellow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-black tracking-wider font-['Outfit',sans-serif]">
            <span className="text-white">MR </span>
            <span 
              className="text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.55)]"
              style={{ color: '#FFD700' }}
            >
              DOLLAR
            </span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
            منظومة السكربت الذكي والربط المباشر
          </p>
        </motion.div>

        {/* Loading Progress Bar Container (Fills smoothly from 0% to 100% over 3s) */}
        <div className="w-full max-w-xs sm:max-w-sm px-2">
          
          {/* Progress bar background track */}
          <div className="relative h-2.5 w-full bg-neutral-900/90 rounded-full overflow-hidden border border-yellow-500/30 p-0.5 shadow-inner">
            {/* Smooth Fill Bar */}
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-[#FFD700] shadow-[0_0_15px_#FFD700]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Progress Percentage and Status Text */}
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-neutral-400 font-mono flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
              {statusText}
            </span>
            <span className="font-bold text-yellow-400 font-mono font-['Outfit',sans-serif]">
              {progress}%
            </span>
          </div>
        </div>

        {/* Quick Skip button in case user wants instant interaction */}
        <button
          onClick={onComplete}
          className="mt-8 text-xs text-neutral-500 hover:text-yellow-400 transition-colors duration-200 underline underline-offset-4 cursor-pointer"
        >
          تخطي المقدمة (Skip)
        </button>

      </div>
    </div>
  );
};
