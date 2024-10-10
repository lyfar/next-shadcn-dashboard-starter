import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface UnderstandingZdoZdsWidgetProps {
  onClick: () => void;
}

export function UnderstandingZdoZdsWidget({ onClick }: UnderstandingZdoZdsWidgetProps) {
  return (
    <Card className="cursor-pointer overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-500" onClick={onClick}>
      <CardContent className="p-4 flex items-center h-full">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-4">
          <Info className="h-8 w-8 text-white" />
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-xl text-white mb-1">Understanding ZDO & ZDS</h3>
          <p className="text-sm text-white/80 mb-2">
            Learn about ZDO points and ZDS coins and how they work together.
          </p>
          <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full w-fit">
            <span className="text-sm font-medium text-white">Learn More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}