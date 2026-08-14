import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, ShieldCheck, ArrowLeft, Sparkles, Lock, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onGoToConditions: () => void;
  onSuccessfulLogin?: (code: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onGoToConditions }) => {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!accessCode.trim()) {
      setErrorMessage('يرجى إدخال كود الدخول الخاص بك للمتابعة.');
      return;
    }

    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage('كود الدخول غير مفعل حالياً أو لم يتم ربطه بحسابك. يرجى إتمام خطوات إنشاء وتفعيل الحساب أولاً للحصول على الكود.');
    }, 1200);
  };

  const handlePasteCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setAccessCode(text.trim());
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-6 select-none">
      
      {/* Background Ambience and Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-yellow-500/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Luxury Central Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-md rounded-3xl bg-neutral-950/85 border border-yellow-500/30 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,215,0,0.08)] backdrop-blur-2xl z-10"
      >
        
        {/* Top Floating Glow Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
            <span>بوابة الاتصال المشفرة VIP</span>
          </div>
        </div>

        {/* Card Header & Title */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-neutral-900 to-black border-2 border-yellow-400/80 shadow-[0_0_20px_rgba(255,215,0,0.3)] mb-4">
            <Lock className="w-8 h-8 text-[#FFD700] animate-pulse" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            الدخول الآمن
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 font-medium">
            أدخل كود التفعيل المخصص لفتح لوحة تحكم السكربت
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Single Input Field strictly for "كود الدخول" */}
          <div className="space-y-2">
            <label className="block text-right text-xs sm:text-sm font-bold text-neutral-200">
              كود الدخول <span className="text-yellow-400">*</span>
            </label>

            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-yellow-400">
                <KeyRound className="w-5 h-5 opacity-70 group-focus-within:opacity-100 transition-opacity" />
              </div>

              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="أدخل كود الدخول هنا (e.g. VIP-XXXX-XXXX)"
                className="w-full h-13 pr-11 pl-20 bg-neutral-900/90 border border-yellow-500/30 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all font-mono shadow-inner text-right dir-rtl"
                dir="rtl"
              />

              {/* Paste Button Helper */}
              <button
                type="button"
                onClick={handlePasteCode}
                className="absolute inset-y-1.5 left-1.5 px-3 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-yellow-400 text-xs font-semibold border border-yellow-500/20 flex items-center gap-1 transition-all cursor-pointer"
                title="لصق من الحافظة"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>لصق</span>
              </button>
            </div>
          </div>

          {/* Error Message with direct CTA */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs text-right space-y-2"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{errorMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={onGoToConditions}
                  className="w-full py-1.5 px-3 rounded-lg bg-yellow-400/15 hover:bg-yellow-400/25 border border-yellow-400/40 text-yellow-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>اضغط هنا لتفعيل الحساب واستلام الكود</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button: Large Gradient Yellow Button with Hover Glow Effect */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full h-13 rounded-xl bg-gradient-to-r from-amber-400 via-[#FFD700] to-yellow-300 text-black font-extrabold text-base tracking-wide shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group overflow-hidden"
          >
            {/* Shimmer animation light streak */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {isLoading ? (
              <div className="flex items-center gap-2 text-black">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>جاري التحقق من الكود...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>دخول السكربت</span>
                <Sparkles className="w-4 h-4 text-black" />
              </div>
            )}
          </button>
        </form>

        {/* Footer Link: Below the form, elegant text link: "انشاء الحساب !" */}
        <div className="mt-7 pt-6 border-t border-neutral-900 text-center">
          <p className="text-xs text-neutral-400 mb-2">
            ليس لديك كود دخول أو لم تقم بربط حسابك بعد؟
          </p>
          
          <button
            type="button"
            onClick={onGoToConditions}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 text-sm font-black transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(255,215,0,0.25)]"
          >
            <span>انشاء الحساب !</span>
            <span className="text-xs group-hover:-translate-x-1 transition-transform">👈</span>
          </button>
        </div>

        {/* Feature Badges under card */}
        <div className="grid grid-cols-3 gap-2 mt-6 text-center text-[10px] text-neutral-400 font-medium">
          <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
            <span className="text-yellow-400 block font-bold">حماية 100%</span>
            <span>مانع الحظر</span>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
            <span className="text-yellow-400 block font-bold">تفعيل فوري</span>
            <span>ربط بالسيرفر</span>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
            <span className="text-yellow-400 block font-bold">خوارزميات VIP</span>
            <span>دقة فائقة</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
