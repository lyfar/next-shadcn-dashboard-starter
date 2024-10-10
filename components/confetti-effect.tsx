'use client';

import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiEffectProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ containerRef }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        const { width, height } = containerRef.current!.getBoundingClientRect();
        setDimensions({ width, height });
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);

      const timer = setTimeout(() => setIsActive(false), 5000); // Run for 5 seconds

      return () => {
        window.removeEventListener('resize', updateDimensions);
        clearTimeout(timer);
      };
    }
  }, [containerRef]);

  if (!isActive) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <ReactConfetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={200}
        gravity={0.2}
        colors={['#1e40af', '#3b82f6', '#93c5fd', '#60a5fa', '#2563eb']}
      />
    </div>
  );
};