'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function PhoneLockScreen() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateTime(); // Set initial time
    const timer = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-primary/20 to-primary/40 text-foreground">
      <Clock className="w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold">{currentTime}</h1>
    </div>
  );
}