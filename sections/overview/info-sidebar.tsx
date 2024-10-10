import React from 'react';
import styles from './info-sidebar.module.css';

type InfoSidebarProps = {
  content: React.ReactNode;
};

export function InfoSidebar({ content }: InfoSidebarProps) {
  return (
    <div className={styles.sidebarContainer}>
      {content || (
        <p className="text-foreground/70">Select an item to view details</p>
      )}
    </div>
  );
}