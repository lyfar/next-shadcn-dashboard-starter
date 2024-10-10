'use client';

import React, { ReactNode, useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import styles from './page-container.module.css';

type PageContainerProps = {
  children: ReactNode;
  scrollable?: boolean;
  sidebar?: ReactNode;
};

export default function PageContainer({ children, scrollable = false, sidebar }: PageContainerProps) {
  const [sidebarSize, setSidebarSize] = useState(25);

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
        {sidebar && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel 
              defaultSize={25} 
              minSize={20} 
              maxSize={40} 
              onResize={setSidebarSize}
            >
              <aside className={`h-screen ${styles.sidebarGradient} flex items-center justify-center`}>
                <div className={styles.phoneFrame}>
                  <div className={styles.phoneContent}>
                    {sidebar}
                  </div>
                </div>
              </aside>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
