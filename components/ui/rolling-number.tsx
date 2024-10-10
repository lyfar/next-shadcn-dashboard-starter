'use client';

import React, { useState, useEffect, useRef } from 'react';

interface RollingNumberProps {
  endValue: number;
  duration?: number;
}

export function RollingNumber({ endValue, duration = 500 }: RollingNumberProps) {
  const [displayValue, setDisplayValue] = useState(endValue);
  const startValueRef = useRef(endValue);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = startValueRef.current;
    const difference = Math.abs(endValue - startValue);
    const actualDuration = Math.min(duration, Math.max(200, difference * 10)); // Dynamic duration

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < actualDuration) {
        const percentage = progress / actualDuration;
        setDisplayValue(Math.round(startValue + (endValue - startValue) * percentage));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        startValueRef.current = endValue;
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}