import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, TrendingUp } from 'lucide-react';
import { WinnerNotification } from '../types';

const SAMPLE_WINNERS: WinnerNotification[] = [
  { id: '1', maskedUser: '28*******18', amount: '1,000', currency: 'دينار', game: 'Apple of Fortune', timestamp: 'منذ لحظات' },
  { id: '2', maskedUser: '94*******63', amount: '2,500', currency: 'دينار', game: 'Gams Mines', timestamp: 'الآن' },
  { id: '3', maskedUser: '15*******90', amount: '750', currency: 'دينار', game: 'Apple of Fortune', timestamp: 'منذ ثوانٍ' },
  { id: '4', maskedUser: '77*******41', amount: '3,800', currency: 'دينار', game: 'Gams Mines', timestamp: 'الآن' },
  { id: '5', maskedUser: '52*******12', amount: '1,500', currency: 'دينار', game: 'Apple of Fortune', timestamp: 'منذ دقيقة' },
  { id: '6', maskedUser: '83*******99', amount: '5,000', currency: 'دينار', game: 'VIP Script', timestamp: 'الآن' },
  { id: '7', maskedUser: '31*******54', amount: '850', currency: 'دينار', game: 'Apple of Fortune', timestamp: 'منذ لحظات' },
  { id: '8', maskedUser: '66*******08', amount: '2,200', currency: 'دينار', game: 'Gams Mines', timestamp: 'الآن' },
  { id: '9', maskedUser: '49*******73', amount: '1,200', currency: 'دينار', game: 'Apple of Fortune', timestamp: 'منذ لحظات' },
  { id: '10', maskedUser: '18*******95', amount: '4,100', currency: 'دينار', game: 'Gams Mines', timestamp: 'الآن' },
];

export const LiveWinnerNotifications: React.FC = () => {
  const [currentWinner, setCurrentWinner] = useState<WinnerNotification | null>(SAMPLE_WINNERS[0]);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [winnerIndex, setWinnerIndex] = useState<number>(0);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    if (isVisible) {
      // Stay visible for 1 second as specified in prompt
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    } else {
      // Stay hidden for 3 seconds as specified in prompt, then show next winner
      nextTimer = setTimeout(() => {
        setWinnerIndex((prev) => {
          const nextIdx = (prev + 1) % SAMPLE_WINNERS.length;
          // Randomize or pick from pool
          const randomWinner = SAMPLE_WINNERS[nextIdx];
          setCurrentWinner(randomWinner);
          return nextIdx;
        });
        setIsVisible(true);
      }, 3000);
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible]);

  return (
    <div className="fixed top-24 left-4 sm:left-6 z-50 pointer-events-none font-['Outfit','Cairo',sans-serif] text-left">
      <AnimatePresence mode="wait">
        {isVisible && currentWinner && (
          <motion.div
            key={currentWinner.id + currentWinner.maskedUser + winnerIndex}
            initial={{ opacity: 0, x: -120, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220, duration: 0.35 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-neutral-950/95 border border-yellow-500/50 shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,215,0,0.25)] backdrop-blur-md max-w-xs sm:max-w-sm pointer-events-auto"
            style={{ direction: 'ltr' }}
          >
            {/* Trophy Gold Icon */}
            <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-600 via-yellow-400 to-amber-300 p-0.5 shadow-[0_0_12px_rgba(255,215,0,0.5)]">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <Trophy className="w-4 h-4 text-[#FFD700] animate-bounce" />
              </div>
            </div>

            {/* Notification Details */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <span className="font-mono font-bold text-white tracking-wide">
                  {currentWinner.maskedUser}
                </span>
                <span className="text-yellow-400 font-semibold">• Won</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-extrabold text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                <span>{currentWinner.amount}</span>
                <span className="text-xs text-yellow-300 font-bold">{currentWinner.currency}</span>
              </div>
            </div>

            {/* Pulse Indicator */}
            <div className="ml-auto pl-1 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
