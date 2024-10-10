import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mouse } from 'lucide-react';

interface ZdoClickerWidgetProps {
  onPlayClick: () => void;
}

export function ZdoClickerWidget({ onPlayClick }: ZdoClickerWidgetProps) {
  return (
    <Card className="cursor-pointer" onClick={onPlayClick}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Mouse className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">ZDO Clicker Game</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Click to earn ZDO points! Play now and boost your balance.
        </p>
        <p className="text-xs text-primary">Click to play</p>
      </CardContent>
    </Card>
  );
}