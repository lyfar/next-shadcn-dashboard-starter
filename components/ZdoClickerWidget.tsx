import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mouse, Zap } from 'lucide-react';

interface ZdoClickerWidgetProps {
  onPlayClick: () => void;
}

export function ZdoClickerWidget({ onPlayClick }: ZdoClickerWidgetProps) {
  return (
    <Card 
      className="cursor-pointer overflow-hidden" 
      onClick={onPlayClick}
      style={{
        background: 'linear-gradient(135deg, #1e3a8a, #5b21b6, #9d174d)',
        border: 'none',
      }}
    >
      <CardContent className="p-4 flex items-center h-full">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 flex items-center justify-center mr-4 shadow-lg">
          <Mouse className="h-8 w-8 text-white" />
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-xl text-white mb-1">ZDO Clicker Game</h3>
          <p className="text-sm text-yellow-300 mb-2">
            Tap to earn ZDO points! Boost your balance.
          </p>
          <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full w-fit">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Play Now</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}