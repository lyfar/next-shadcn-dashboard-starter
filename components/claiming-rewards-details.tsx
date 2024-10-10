import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, Info } from 'lucide-react';
import { ConfettiEffect } from './confetti-effect';

interface ClaimingRewardsDetailsProps {
  daysLeft: number;
  rzdsAmount: number;
  onClaimClick: (amount: number) => void;
}

export function ClaimingRewardsDetails({ daysLeft, rzdsAmount, onClaimClick }: ClaimingRewardsDetailsProps) {
  const [claimed, setClaimed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClaim = () => {
    onClaimClick(rzdsAmount);
    setClaimed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {showConfetti && <ConfettiEffect containerRef={containerRef} />}
      <div className="space-y-6 h-full overflow-y-auto p-6 pt-12">
        <h2 className="text-2xl font-bold mb-6">Don&apos;t Miss Out on Your Rewards!</h2>
        
        <div className="bg-secondary/10 p-6 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Time Remaining</h3>
          </div>
          {!claimed ? (
            <>
              <p className="text-3xl font-bold text-primary mb-2">{daysLeft} days left</p>
              <p className="text-sm text-muted-foreground mb-4">to claim {rzdsAmount.toLocaleString()} RZDS</p>
              
              <div className="flex items-start space-x-2 mb-4">
                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">RZDS expire 30 days after being earned. Don&apos;t let them go to waste!</p>
              </div>
              
              <Button onClick={handleClaim} className="w-full mb-4">Claim My Rewards</Button>
            </>
          ) : (
            <p className="text-lg font-semibold text-primary mb-4">Congratulations! You&apos;ve claimed {rzdsAmount.toLocaleString()} RZDS.</p>
          )}
        </div>
        
        <div className="bg-background/50 p-6 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Info className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Why Claim Regularly?</h3>
          </div>
          <p className="text-sm">
            Users who regularly claim their RZDS have seen their ZDS balances grow by{' '}
            <Badge variant="secondary" className="text-sm">50% more</Badge> than those who don&apos;t.
            Convert your RZDS to ZDS to maximize your rewards!
          </p>
        </div>
      </div>
    </div>
  );
}