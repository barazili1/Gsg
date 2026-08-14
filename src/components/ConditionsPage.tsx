import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  UserPlus,
  Copy,
  Check,
  DollarSign,
  UserCheck,
  Send,
  UploadCloud,
  Plus,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Globe,
  Bomb,
  Apple,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GameType } from '../types';
import { VerificationDialog } from './VerificationDialog';

interface ConditionsPageProps {
  onBackToLogin: () => void;
}

export const ConditionsPage: React.FC<ConditionsPageProps> = ({ onBackToLogin }) => {
  // State for promo code copied feedback
  const [copiedPromo, setCopiedPromo] = useState(false);

  // Form states
  const [platformId, setPlatformId] = useState('');
  const [telegramUser, setTelegramUser] = useState('');
  const [selectedGame, setSelectedGame] = useState<GameType>('apple');

  // File upload states (Step 8)
  const [depositImg, setDepositImg] = useState<string | null>(null);
  const [depositImgName, setDepositImgName] = useState<string | null>(null);
  const [idImg, setIdImg] = useState<string | null>(null);
  const [idImgName, setIdImgName] = useState<string | null>(null);

  // Drag states
  const [isDraggingDeposit, setIsDraggingDeposit] = useState(false);
  const [isDraggingId, setIsDraggingId] = useState(false);

  // File input refs
  const depositInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Copy Promo
  const handleCopyPromo = () => {
    navigator.clipboard.writeText('MELBG3');
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2500);
  };

  // Image Upload Handlers
  const handleDepositFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDepositImg(e.target?.result as string);
        setDepositImgName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setIdImg(e.target?.result as string);
        setIdImgName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Verification button handler
  const handleGetCode = () => {
    setValidationError(null);

    // Optional user validation feedback
    if (!platformId.trim()) {
      setValidationError('يرجى كتابة الـ ID الخاص بك في منصة MELBET (الخطوة 6)');
      // Smooth scroll to step 6
      const el = document.getElementById('step-6-card');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!telegramUser.trim()) {
      setValidationError('يرجى كتابة يوزر التيليجرام الخاص بك (الخطوة 7)');
      const el = document.getElementById('step-7-card');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Open Verification Dialog
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen pb-24 select-none">
      
      {/* Top Banner / Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        
        {/* Header Breadcrumb navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToLogin}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all text-xs font-bold cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>العودة لصفحة الدخول</span>
          </button>

          <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-950 px-3 py-1 rounded-full border border-yellow-500/20">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
            <span>نظام التحقق الآلي VIP</span>
          </div>
        </div>

        {/* Title: Center bold title "خطوات تفعيل الحساب للسكربت" (Yellow) */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>دليل التفعيل الرسمي والمضمون</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-[#FFD700] drop-shadow-[0_0_25px_rgba(255,215,0,0.45)]">
              خطوات تفعيل الحساب للسكربت
            </h1>
            
            <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
              اتبع الخطوات الثمانية التالية بالترتيب لربط حسابك وتوليد كود الدخول الخاص بك تلقائياً
            </p>
          </motion.div>
        </div>

        {/* Validation Warning Alert */}
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-red-950/80 border-2 border-red-500/60 text-red-200 text-sm flex items-center gap-3 shadow-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="font-semibold">{validationError}</span>
          </motion.div>
        )}

        {/* Styled Steps (Vertical Layout - 8 Numbered Steps) */}
        <div className="space-y-5 sm:space-y-6">

          {/* STEP 1: Melbet Logo inside a luxurious circular frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="relative rounded-3xl bg-neutral-950/90 border border-yellow-500/30 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                {/* Step Number Badge */}
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                  1
                </div>
                
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    المنصة الرسمية المعتمدة
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    السكربت متوافق ومخصص حصرياً للعمل على سيرفرات منصة MELBET
                  </p>
                </div>
              </div>

              {/* Official MELBET Logo inside luxurious circular frame */}
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-3 rounded-full bg-yellow-400/20 blur-md animate-pulse" />
                
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-neutral-900 via-black to-neutral-950 border-3 border-yellow-400 shadow-[0_0_25px_rgba(255,215,0,0.5),inset_0_0_15px_rgba(255,215,0,0.25)] flex flex-col items-center justify-center p-3">
                  
                  {/* Melbet Logo Artwork */}
                  <div className="text-center">
                    <span className="font-black text-xl sm:text-2xl tracking-tighter text-white font-['Outfit',sans-serif] block leading-none">
                      MEL<span className="text-[#FFD700]">BET</span>
                    </span>
                    <div className="mt-1 flex items-center justify-center gap-0.5">
                      <span className="h-0.5 w-3 bg-[#FFD700] rounded-full" />
                      <span className="text-[9px] font-extrabold text-yellow-400 uppercase tracking-widest font-['Outfit',sans-serif]">
                        OFFICIAL
                      </span>
                      <span className="h-0.5 w-3 bg-[#FFD700] rounded-full" />
                    </div>
                  </div>

                  {/* Gold trim highlight */}
                  <div className="absolute bottom-1 w-8 h-1 rounded-full bg-yellow-400/60 blur-[1px]" />
                </div>
              </div>

            </div>
          </motion.div>

          {/* STEP 2: Download MELBET App */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-3xl bg-neutral-950/90 border border-yellow-500/30 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                  2
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    تحميل منصه MELBET الاصلية
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    قم بتحميل التطبيق الرسمي لأجهزة أندرويد أو آيفون لضمان سرعة الاستجابة
                  </p>
                </div>
              </div>

              {/* Styled App Store / Download Button */}
              <a
                href="https://melbet.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-neutral-900 to-black border-2 border-yellow-500/50 hover:border-yellow-400 text-white hover:text-yellow-300 transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.15)] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-neutral-400 uppercase font-mono">App Download</span>
                  <span className="block text-sm font-black text-yellow-400 group-hover:text-yellow-300">تحميل الآن</span>
                </div>
              </a>

            </div>
          </motion.div>

          {/* STEP 3: Register on MELBET */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative rounded-3xl bg-neutral-950/90 border border-yellow-500/30 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                  3
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    التسجيل في الموقع الرسمي لمنصه MELBET
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    افتح حساباً جديداً بالكامل في المنصة باستخدام خيار التسجيل بنقرة واحدة أو بالهاتف
                  </p>
                </div>
              </div>

              {/* Styled Register Button */}
              <a
                href="https://melbet.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-[#FFD700] text-black font-black text-sm shadow-[0_0_20px_rgba(255,215,0,0.35)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 stroke-[2.5]" />
                <span>تسجيل حساب جديد</span>
              </a>

            </div>
          </motion.div>

          {/* STEP 4: Promo Code with Copy Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-3xl bg-neutral-950/90 border-2 border-yellow-500/50 p-5 sm:p-6 shadow-[0_0_25px_rgba(255,215,0,0.15)] backdrop-blur-xl overflow-hidden"
          >
            {/* Background glowing ribbon */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                  4
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      تسجيل الدخول باستخدام البروموكود الخاص بنا
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-400 text-black uppercase">
                      إجباري للربط
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    البروموكود الحصري يتيح لخوارزمية السكربت قراءة ثغرات وتوقعات الحساب بدقة 99.8%
                  </p>
                </div>
              </div>

              {/* Special Box displaying MELBG3 + Copy Button */}
              <div className="flex items-center gap-2 bg-black/90 p-2 rounded-2xl border-2 border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <div className="px-4 py-2 bg-neutral-900/90 rounded-xl font-mono text-xl sm:text-2xl font-black text-[#FFD700] tracking-widest select-all text-center">
                  MELBG3
                </div>

                <button
                  type="button"
                  onClick={handleCopyPromo}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                  title="نسخ البروموكود"
                >
                  {copiedPromo ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3] text-black" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 stroke-[2.5]" />
                      <span>نسخ</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </motion.div>

          {/* STEP 5: Deposit Instruction (Highlighted amounts in yellow) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative rounded-3xl bg-neutral-950/90 border border-yellow-500/30 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                5
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  قم بعمل ايداع لايقل عن{' '}
                  <span className="text-[#FFD700] font-black text-lg sm:text-xl drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
                    1500 دينار
                  </span>{' '}
                  او{' '}
                  <span className="text-[#FFD700] font-black text-lg sm:text-xl drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
                    6 دولار
                  </span>
                </h3>
                
                <p className="text-xs text-neutral-400 leading-relaxed">
                  الإيداع الأولي مطلوب لتنشيط المحفظة وربط الـ API الخاص بالألعاب بسيرفر السكربت. (الأموال تبقى في رصيدك بالكامل للعب بها).
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-yellow-400" />
                  <span>مكافأة ترحيبية 200% تلقائية مع بروموكود MELBG3</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* STEP 6: Enter Platform ID */}
          <motion.div
            id="step-6-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-3xl bg-neutral-950/90 border border-yellow-500/30 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                  6
                </div>
                <div>
                  <label htmlFor="melbet-id-input" className="text-base sm:text-lg font-bold text-white block">
                    ادخال الـ ID الخاص بك في المنصة <span className="text-yellow-400">*</span>
                  </label>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    الـ ID الموجود في صفحتك الشخصية داخل تطبيق MELBET
                  </p>
                </div>
              </div>

              {/* ID Input Field */}
              <div className="w-full sm:w-64">
                <input
                  id="melbet-id-input"
                  type="text"
                  value={platformId}
                  onChange={(e) => setPlatformId(e.target.value)}
                  placeholder="12345678"
                  className="w-full h-12 px-4 rounded-xl bg-neutral-900 border-2 border-yellow-500/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-neutral-600 font-mono text-center text-base font-bold transition-all outline-none"
                  dir="ltr"
                />
              </div>

            </div>
          </motion.div>

          {/* STEP 7: Telegram Username & Target Game Selection */}
          <motion.div
            id="step-7-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="relative rounded-3xl bg-neutral-950/90 border border-yellow-500/30 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                7
              </div>
              
              <div className="w-full space-y-5">
                
                {/* Telegram Input Field */}
                <div>
                  <label htmlFor="telegram-input" className="text-base sm:text-lg font-bold text-white block mb-1">
                    ادخال اليوزر التلجرام الخاص بك <span className="text-yellow-400">*</span>
                  </label>
                  <p className="text-xs text-neutral-400 mb-2">
                    سيتم إرسال كود التفعيل ورسائل التحديثات المباشرة إلى هذا الحساب
                  </p>
                  
                  <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-yellow-400">
                      <Send className="w-4 h-4 -rotate-12" />
                    </div>
                    <input
                      id="telegram-input"
                      type="text"
                      value={telegramUser}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val && !val.startsWith('@')) {
                          val = '@' + val;
                        }
                        setTelegramUser(val);
                      }}
                      placeholder="@username"
                      className="w-full h-12 pr-4 pl-10 rounded-xl bg-neutral-900 border-2 border-yellow-500/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-neutral-600 font-mono text-left text-sm font-semibold transition-all outline-none"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Game Selection */}
                <div className="pt-3 border-t border-neutral-900">
                  <h4 className="text-sm font-bold text-white mb-1">
                    اختر اللعبة المستهدفة <span className="text-yellow-400">*</span>
                  </h4>
                  <p className="text-xs text-neutral-400 mb-3">
                    حدد اللعبة التي ترغب بتشغيل خوارزمية التوقع عليها
                  </p>

                  {/* Two side-by-side selectable cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Game 1: Apple of Fortune */}
                    <div
                      onClick={() => setSelectedGame('apple')}
                      className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                        selectedGame === 'apple'
                          ? 'bg-neutral-900 border-2 border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.35)] scale-[1.02]'
                          : 'bg-neutral-950 border border-neutral-800 hover:border-yellow-500/40 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* Selected Badge */}
                      {selectedGame === 'apple' && (
                        <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Icon Container */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 via-amber-600 to-yellow-500 p-0.5 flex-shrink-0 shadow-md">
                        <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                          <Apple className="w-6 h-6 text-red-400" />
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black text-white font-['Outfit','Cairo',sans-serif]">
                          Apple of Fortune
                        </div>
                        <div className="text-xs text-yellow-400 font-semibold">
                          تفاحة الحظ (دقة 99.4%)
                        </div>
                      </div>
                    </div>

                    {/* Game 2: Gams Mines */}
                    <div
                      onClick={() => setSelectedGame('mines')}
                      className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                        selectedGame === 'mines'
                          ? 'bg-neutral-900 border-2 border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.35)] scale-[1.02]'
                          : 'bg-neutral-950 border border-neutral-800 hover:border-yellow-500/40 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* Selected Badge */}
                      {selectedGame === 'mines' && (
                        <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Icon Container */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 via-amber-400 to-yellow-300 p-0.5 flex-shrink-0 shadow-md">
                        <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                          <Bomb className="w-6 h-6 text-[#FFD700]" />
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black text-white font-['Outfit','Cairo',sans-serif]">
                          Gams Mines
                        </div>
                        <div className="text-xs text-yellow-400 font-semibold">
                          لعبة الألغام (كشف المربعات)
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* STEP 8: Image Uploads (Two side-by-side dashed drop-zones with "+" icons) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative rounded-3xl bg-neutral-950/90 border border-yellow-500/30 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-yellow-400 text-black font-black text-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                8
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  رفع إثباتات الحساب والإيداع
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  ارفع صورة الإيداع وصورة الحساب لتسريع الاعتماد الفوري
                </p>
              </div>
            </div>

            {/* Hidden Inputs */}
            <input
              ref={depositInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleDepositFile(e.target.files[0]);
              }}
            />
            <input
              ref={idInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleIdFile(e.target.files[0]);
              }}
            />

            {/* Two Identical Side-by-Side Dashed Drop-Zones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Drop-Zone 1: صورة الايداع */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingDeposit(true); }}
                onDragLeave={() => setIsDraggingDeposit(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingDeposit(false);
                  if (e.dataTransfer.files?.[0]) handleDepositFile(e.dataTransfer.files[0]);
                }}
                onClick={() => depositInputRef.current?.click()}
                className={`relative min-h-[140px] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer group ${
                  isDraggingDeposit
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : depositImg
                    ? 'border-yellow-500/60 bg-neutral-900/80'
                    : 'border-neutral-700 hover:border-yellow-400/60 bg-neutral-900/40 hover:bg-neutral-900/70'
                }`}
              >
                {depositImg ? (
                  <div className="relative w-full flex items-center gap-3">
                    <img
                      src={depositImg}
                      alt="Deposit Proof"
                      className="w-16 h-16 rounded-xl object-cover border border-yellow-500/40"
                    />
                    <div className="text-right flex-1 min-w-0">
                      <div className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                        <span>تم اختيار صورة الايداع</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {depositImgName || 'deposit_receipt.jpg'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDepositImg(null);
                        setDepositImgName(null);
                      }}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-900/60 text-neutral-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-black transition-all mb-2">
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors">
                      صورة الايداع
                    </span>
                    <span className="text-[11px] text-neutral-500 mt-1">
                      اسحب الصورة هنا أو اضغط للاختيار
                    </span>
                  </>
                )}
              </div>

              {/* Drop-Zone 2: صورة الـ ID والبروموكود */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingId(true); }}
                onDragLeave={() => setIsDraggingId(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingId(false);
                  if (e.dataTransfer.files?.[0]) handleIdFile(e.dataTransfer.files[0]);
                }}
                onClick={() => idInputRef.current?.click()}
                className={`relative min-h-[140px] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer group ${
                  isDraggingId
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : idImg
                    ? 'border-yellow-500/60 bg-neutral-900/80'
                    : 'border-neutral-700 hover:border-yellow-400/60 bg-neutral-900/40 hover:bg-neutral-900/70'
                }`}
              >
                {idImg ? (
                  <div className="relative w-full flex items-center gap-3">
                    <img
                      src={idImg}
                      alt="ID and Promo Proof"
                      className="w-16 h-16 rounded-xl object-cover border border-yellow-500/40"
                    />
                    <div className="text-right flex-1 min-w-0">
                      <div className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                        <span>تم اختيار صورة الـ ID</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {idImgName || 'profile_id.jpg'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIdImg(null);
                        setIdImgName(null);
                      }}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-900/60 text-neutral-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-black transition-all mb-2">
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors">
                      صورة الـ ID والبروموكود
                    </span>
                    <span className="text-[11px] text-neutral-500 mt-1">
                      اسحب الصورة هنا أو اضغط للاختيار
                    </span>
                  </>
                )}
              </div>

            </div>
          </motion.div>

        </div>

        {/* Action Button: Prominent Yellow Button below all steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-10 text-center"
        >
          <button
            type="button"
            onClick={handleGetCode}
            className="relative w-full max-w-md mx-auto h-16 rounded-2xl bg-gradient-to-r from-amber-400 via-[#FFD700] to-yellow-300 text-black font-black text-xl tracking-wide shadow-[0_0_35px_rgba(255,215,0,0.5)] hover:shadow-[0_0_55px_rgba(255,215,0,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group overflow-hidden"
          >
            {/* Ambient Shimmer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

            <Sparkles className="w-6 h-6 text-black animate-pulse" />
            <span>احصل علي الكود</span>
            <Sparkles className="w-6 h-6 text-black animate-pulse" />
          </button>

          <p className="mt-3 text-xs text-neutral-400">
            التحقق فوري عبر الخوادم المشفرة • دعم فني متواصل 24/7
          </p>
        </motion.div>

      </div>

      {/* Verification Modal / Dialog */}
      <VerificationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userId={platformId}
        telegramUser={telegramUser}
        selectedGame={selectedGame}
        depositImage={depositImg}
        idImage={idImg}
      />
    </div>
  );
};
