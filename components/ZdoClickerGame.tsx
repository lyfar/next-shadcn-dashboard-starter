import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CustomCursor } from './CustomCursor';

interface ZdoClickerGameProps {
  onEarnZdo: (amount: number) => void;
}

export function ZdoClickerGame({ onEarnZdo }: ZdoClickerGameProps) {
  const [clickCount, setClickCount] = useState(0);
  const [zdoEarned, setZdoEarned] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    setZdoEarned(prev => prev + 1);
    onEarnZdo(1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (clickCount > 0) {
        setClickCount(prev => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clickCount]);

  return (
    <div ref={gameAreaRef} className="flex flex-col items-center justify-center h-full space-y-6 relative cursor-none">
      <CustomCursor containerRef={gameAreaRef} />
      <h2 className="text-2xl font-bold">ZDO Clicker Game</h2>
      <p className="text-lg">Clicks: {clickCount}</p>
      <p className="text-lg">ZDO Earned: {zdoEarned}</p>
      <Button size="lg" onClick={handleClick} className="cursor-none z-10 relative">Click to Earn ZDO!</Button>
      <p className="text-sm text-muted-foreground">Click fast to earn more ZDO!</p>
      <style jsx global>{`
        .cursor-none,
        .cursor-none * {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
}