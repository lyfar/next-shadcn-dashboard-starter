'use client';

import React, { useState, useEffect } from 'react';

interface RollingNumberProps {
  endValue: number;
  duration?: number;
}

export function RollingNumber({ endValue, duration = 2000 }: RollingNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        const percentage = progress / duration;
        setDisplayValue(Math.floor(percentage * endValue));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}