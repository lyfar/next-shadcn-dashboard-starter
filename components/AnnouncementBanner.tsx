import React from 'react';
import { Button } from '@/components/ui/button';

interface AnnouncementBannerProps {
  onDismiss: () => void;
  onLearnMore: () => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onDismiss, onLearnMore }) => {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 rounded-r shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <p className="font-bold text-sm">Important Update!</p>
          <p className="text-xs">
            Starting November 1, 2024, we&apos;ve updated our rewards system from Points to ZDU (Zeal Digital Units).
          </p>
        </div>
        <div className="flex space-x-2 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={onLearnMore}>Learn More</Button>
          <Button variant="ghost" size="sm" onClick={onDismiss}>Dismiss</Button>
        </div>
      </div>
    </div>
  );
};