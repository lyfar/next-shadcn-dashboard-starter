'use client';

import React, { useState, useEffect, useRef } from 'react';

interface RollingNumberProps {
  endValue: number;
  duration?: number;
}

export function RollingNumber({ endValue, duration = 300 }: RollingNumberProps) {
  const [displayValue, setDisplayValue] = useState(endValue);
  const startValueRef = useRef(endValue);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = startValueRef.current;
    const difference = Math.abs(endValue - startValue);
    const actualDuration = Math.min(duration, Math.max(100, difference * 5)); // Faster dynamic duration

    const easeOutQuad = (t: number) => t * (2 - t); // Easing function for smoother animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / actualDuration;

      if (progress < 1) {
        const easedProgress = easeOutQuad(progress);
        setDisplayValue(Math.round(startValue + (endValue - startValue) * easedProgress));
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