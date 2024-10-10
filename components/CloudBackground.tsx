'use client';

import dynamic from 'next/dynamic';

const CloudBackgroundInner = dynamic(() => import('./CloudBackgroundInner'), { ssr: false });

export function CloudBackground() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <CloudBackgroundInner />
    </div>
  );
}