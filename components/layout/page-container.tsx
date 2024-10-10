'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import styles from './page-container.module.css';
import { CloudBackground } from '../CloudBackground';
import { PhoneLockScreen } from '../PhoneLockScreen';
import { AnimatedPageTransition } from '../AnimatedPageTransition';

type PageContainerProps = {
  children: ReactNode;
  scrollable?: boolean;
  sidebar?: ReactNode;
};

export default function PageContainer({ children, scrollable = false, sidebar }: PageContainerProps) {
  const [currentScreen, setCurrentScreen] = useState<'lock' | 'content'>('lock');
  const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (sidebar) {
      setCurrentScreen('content');
      setSidebarContent(sidebar);
      setKey(prev => prev + 1); // Increment key to force re-render
    } else {
      setCurrentScreen('lock');
      setSidebarContent(null);
    }
  }, [sidebar]);

  return (
    <div className="h-screen overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={75} minSize={60}>
          <main className={`h-screen ${scrollable ? 'overflow-y-auto' : ''}`}>
            <div className="p-6">
              {children}
            </div>
          </main>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel 
          defaultSize={25} 
          minSize={20} 
          maxSize={40}
        >
          <aside className="h-screen relative flex items-center justify-center">
            <CloudBackground />
            <div className={styles.phoneFrame}>
              <div className={styles.phoneContent}>
                <AnimatedPageTransition isVisible={currentScreen === 'lock'} key={`lock-${key}`}>
                  <PhoneLockScreen />
                </AnimatedPageTransition>
                <AnimatedPageTransition isVisible={currentScreen === 'content'} key={`content-${key}`}>
                  <div className="p-4">
                    {sidebarContent}
                  </div>
                </AnimatedPageTransition>
              </div>
            </div>
          </aside>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
