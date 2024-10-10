import React, { useState, useEffect, useRef } from 'react';
import { CustomCursor } from './CustomCursor';
import { RollingNumber } from '@/components/ui/rolling-number';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Zap, Award, Clock, Star } from 'lucide-react';
import { ConfettiEffect } from './confetti-effect';

interface ZdoClickerGameProps {
  onEarnZdo: (amount: number) => void;
  initialBalance: number;
}

interface FloatingPoint {
  id: number;
  value: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: () => boolean;
  reward: string;
  unlocked: boolean;
}

export function ZdoClickerGame({ onEarnZdo, initialBalance }: ZdoClickerGameProps) {
  const [clickCount, setClickCount] = useState(0);
  const [zdoEarned, setZdoEarned] = useState(0);
  const [totalBalance, setTotalBalance] = useState(initialBalance || 0);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([]);
  const [clickSpeed, setClickSpeed] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [timePlayed, setTimePlayed] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_steps',
      name: 'First Steps',
      description: 'Achieve 100 total clicks',
      condition: () => clickCount >= 100,
      reward: 'New cursor design',
      unlocked: false,
    },
    {
      id: 'speed_demon',
      name: 'Speed Demon',
      description: 'Reach 15 clicks per second',
      condition: () => clickSpeed >= 15,
      reward: 'Temporary ZDO earning multiplier',
      unlocked: false,
    },
    {
      id: 'wealth_accumulator',
      name: 'Wealth Accumulator',
      description: 'Earn 50,000 total ZDO',
      condition: () => zdoEarned >= 50000,
      reward: 'Special background theme',
      unlocked: false,
    },
    {
      id: 'marathon_gamer',
      name: 'Marathon Gamer',
      description: 'Play for 2 consecutive hours',
      condition: () => timePlayed >= 7200,
      reward: 'Exclusive achievement badge',
      unlocked: false,
    },
  ]);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const lastClickTime = useRef(Date.now());
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now();
    const timeDiff = now - lastClickTime.current;
    lastClickTime.current = now;

    const newClickSpeed = 1000 / timeDiff;
    setClickSpeed(newClickSpeed);

    const newZoomLevel = 1 + Math.min(newClickSpeed / 20, 0.2);
    setZoomLevel(newZoomLevel);

    const earnedAmount = Math.ceil(level * (1 + clickSpeed / 10));
    setClickCount(prev => prev + 1);
    setZdoEarned(prev => prev + earnedAmount);
    setTotalBalance(prev => prev + earnedAmount);
    setXp(prev => {
      const newXp = prev + earnedAmount;
      if (newXp >= level * 100) {
        setLevel(l => l + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        return newXp - level * 100;
      }
      return newXp;
    });
    onEarnZdo(earnedAmount);

    const gameAreaRect = gameAreaRef.current?.getBoundingClientRect();
    
    if (gameAreaRect) {
      const newPoint: FloatingPoint = {
        id: Date.now(),
        value: earnedAmount,
        x: event.clientX - gameAreaRect.left,
        y: event.clientY - gameAreaRect.top,
        rotation: Math.random() * 60 - 30,
        scale: Math.random() * 0.3 + 0.85,
      };

      setFloatingPoints(prev => [...prev, newPoint]);
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    checkAchievements();
  };

  const checkAchievements = () => {
    achievements.forEach(achievement => {
      if (!achievement.unlocked && achievement.condition()) {
        setAchievements(prev => prev.map(a => 
          a.id === achievement.id ? { ...a, unlocked: true } : a
        ));
        setShowAchievement(achievement);
        setTimeout(() => setShowAchievement(null), 3000);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setClickSpeed(prev => Math.max(0, prev - 0.5));
      setZoomLevel(prev => Math.max(1, prev - 0.01));
      setTimePlayed(prev => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={gameAreaRef} className="flex flex-col items-center justify-between h-full p-6 relative cursor-none overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700">
      <CustomCursor containerRef={gameAreaRef} />
      {showConfetti && <ConfettiEffect containerRef={gameAreaRef} />}
      
      {/* Header */}
      <div className="w-full text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2 animate-pulse">ZDO Clicker Game</h2>
        <p className="text-xl text-yellow-300">Tap to earn ZDO!</p>
      </div>

      {/* Main game area */}
      <div className="flex-grow flex flex-col items-center justify-center w-full relative">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm">
            <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300 mb-1">Total ZDO</p>
            <div 
              className="text-2xl font-bold text-white transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <RollingNumber endValue={totalBalance} />
            </div>
          </div>
          <div className="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm">
            <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300 mb-1">Clicks per second</p>
            <p className="text-2xl font-bold text-white">{clickSpeed.toFixed(1)}</p>
          </div>
        </div>

        {/* Level and XP */}
        <div className="w-full mb-8 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">Level {level}</span>
            <Award className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(xp / (level * 100)) * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
          <div className="text-right text-xs text-gray-300 mt-1">
            {xp} / {level * 100} XP
          </div>
        </div>

        {/* Click button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="w-48 h-48 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg hover:shadow-xl cursor-none z-10 relative flex items-center justify-center overflow-hidden"
        >
          <span className="text-3xl font-bold text-white">TAP!</span>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={isAnimating ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0.5 }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>

        {/* Floating points */}
        <AnimatePresence>
          {floatingPoints.map((point) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 1, y: 0, rotate: 0, scale: 0 }}
              animate={{ 
                opacity: 0, 
                y: -50,
                rotate: point.rotation,
                scale: point.scale,
                transition: { 
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }
              }}
              exit={{ opacity: 0 }}
              className="absolute text-3xl font-bold text-yellow-300 pointer-events-none"
              style={{ 
                left: point.x, 
                top: point.y,
                zIndex: 20,
                textShadow: '0 0 10px rgba(255, 255, 0, 0.7), 0 0 20px rgba(255, 255, 0, 0.5), 0 0 30px rgba(255, 255, 0, 0.3)'
              }}
            >
              +{point.value}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Click speed meter */}
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden mb-4 mt-8">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-blue-500"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(clickSpeed * 10, 100)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
        <p className="text-lg text-white font-semibold mb-8">Click faster to fill the meter!</p>
      </div>

      {/* Achievement popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black p-4 rounded-lg shadow-lg"
          >
            <Star className="w-6 h-6 text-yellow-400 mb-2" />
            <h3 className="font-bold">{showAchievement.name} Unlocked!</h3>
            <p className="text-sm">{showAchievement.description}</p>
            <p className="text-sm font-bold mt-2">Reward: {showAchievement.reward}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time played */}
      <div className="absolute top-4 right-4 text-white text-sm">
        <Clock className="w-4 h-4 inline-block mr-1" />
        {Math.floor(timePlayed / 60)}:{(timePlayed % 60).toString().padStart(2, '0')}
      </div>

      <style jsx global>{`
        .cursor-none,
        .cursor-none * {
          cursor: none !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}