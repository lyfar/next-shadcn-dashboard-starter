import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Gift } from 'lucide-react';

interface ClaimingRewardsWidgetProps {
  daysLeft: number;
  rzdsAmount: number;
  onClaimClick: () => void;
}

export function ClaimingRewardsWidget({ daysLeft, rzdsAmount, onClaimClick }: ClaimingRewardsWidgetProps) {
  return (
    <Card className="cursor-pointer" onClick={onClaimClick}>
      <CardContent className="p-4">
        {rzdsAmount > 0 ? (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold">Claim Your Rewards</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              You have <span className="font-bold text-primary">{daysLeft} days</span> left to claim{' '}
              <span className="font-bold text-primary">{rzdsAmount.toLocaleString()} RZDS</span>.
            </p>
            <p className="text-xs text-muted-foreground">Don&apos;t let them expire—claim now!</p>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <Gift className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Earn More Rewards</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              You&apos;ve claimed all your rewards. Great job!
            </p>
            <p className="text-xs text-muted-foreground">Click to explore ways to earn more RZDS.</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}