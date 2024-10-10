'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const CloudBackgroundInner = dynamic(() => import('./CloudBackgroundInner'), { ssr: false });

interface AchievementNotification {
  id: string;
  name: string;
}

export function CloudBackground() {
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);

  useEffect(() => {
    const handleAchievementUnlock = (event: CustomEvent) => {
      const { achievement } = event.detail;
      setNotifications(prev => [...prev, achievement]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== achievement.id));
      }, 5000); // Remove notification after 5 seconds
    };

    window.addEventListener('achievementUnlocked' as any, handleAchievementUnlock);

    return () => {
      window.removeEventListener('achievementUnlocked' as any, handleAchievementUnlock);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <CloudBackgroundInner />
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            position: 'absolute',
            top: `${20 + index * 60}px`,
            right: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '5px',
            animation: 'float 5s ease-in-out',
          }}
        >
          <h3>Achievement Unlocked!</h3>
          <p>{notification.name}</p>
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100%); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}