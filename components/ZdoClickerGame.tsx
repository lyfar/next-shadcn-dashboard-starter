import React, { useState, useEffect, useRef } from 'react';
import { CustomCursor } from './CustomCursor';
import { RollingNumber } from '@/components/ui/rolling-number';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Zap, Users, Wallet } from 'lucide-react';
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

export function ZdoClickerGame({ onEarnZdo, initialBalance }: ZdoClickerGameProps) {
  const [clickCount, setClickCount] = useState(0);
  const [zdoEarned, setZdoEarned] = useState(0);
  const [totalBalance, setTotalBalance] = useState(initialBalance || 0);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([]);
  const [clickSpeed, setClickSpeed] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const lastClickTime = useRef(Date.now());
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now();
    const timeDiff = now - lastClickTime.current;
    lastClickTime.current = now;

    const newClickSpeed = 1000 / timeDiff;
    setClickSpeed(newClickSpeed);

    const newZoomLevel = 1 + Math.min(newClickSpeed / 20, 0.2);
    setZoomLevel(newZoomLevel);

    const earnedAmount = 1;
    setClickCount(prev => prev + 1);
    setZdoEarned(prev => prev + earnedAmount);
    setTotalBalance(prev => prev + earnedAmount);
    onEarnZdo(earnedAmount);

    const gameAreaRect = gameAreaRef.current?.getBoundingClientRect();
    
    if (gameAreaRect) {
      const newPoint: FloatingPoint = {
        id: Date.now(),
        value: earnedAmount,
        x: event.clientX - gameAreaRect.left,
        y: event.clientY - gameAreaRect.top,
        rotation: Math.random() * 60 - 30, // Random rotation between -30 and 30 degrees
        scale: Math.random() * 0.3 + 0.85, // Random scale between 0.85 and 1.15
      };

      setFloatingPoints(prev => [...prev, newPoint]);
    }

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setClickSpeed(prev => Math.max(0, prev - 0.5));
      setZoomLevel(prev => Math.max(1, prev - 0.01));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={gameAreaRef} className="flex flex-col items-center justify-between h-full p-6 relative cursor-none overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <CustomCursor containerRef={gameAreaRef} />
      {showConfetti && <ConfettiEffect containerRef={gameAreaRef} />}
      
      {/* Header */}
      <div className="w-full text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">ZDO Clicker Game</h2>
        <p className="text-xl text-yellow-300">Tap to earn ZDO!</p>
      </div>

      {/* Main game area */}
      <div className="flex-grow flex flex-col items-center justify-center w-full relative">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-white/10 p-4 rounded-lg text-center">
            <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300 mb-1">Total ZDO</p>
            <div 
              className="text-2xl font-bold text-white transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <RollingNumber endValue={totalBalance} />
            </div>
          </div>
          <div className="bg-white/10 p-4 rounded-lg text-center">
            <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300 mb-1">Clicks per second</p>
            <p className="text-2xl font-bold text-white">{clickSpeed.toFixed(1)}</p>
          </div>
        </div>

        {/* Click button */}
        <div className="relative mb-8">
          <button
            onClick={handleClick}
            className="w-48 h-48 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-yellow-500 hover:via-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl cursor-none z-10 relative flex items-center justify-center"
          >
            <span className="text-3xl font-bold text-white">TAP!</span>
          </button>
        </div>

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
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-blue-500"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(clickSpeed * 10, 100)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
        <p className="text-lg text-white font-semibold mb-8">Click faster to fill the meter!</p>
      </div>

      {/* Footer */}
      <div className="w-full grid grid-cols-2 gap-4">
        <button className="bg-white/10 p-4 rounded-lg text-center">
          <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <span className="text-sm text-white">Friends</span>
        </button>
        <button className="bg-white/10 p-4 rounded-lg text-center">
          <Wallet className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <span className="text-sm text-white">Earn</span>
        </button>
      </div>

      <style jsx global>{`
        .cursor-none,
        .cursor-none * {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
}