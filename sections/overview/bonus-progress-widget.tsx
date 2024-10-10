'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type BonusProgressProps = {
  lotsTradedSoFar: number;
  lotsRequired: number;
  profitEarned: number;
};

export function BonusProgressWidget({ lotsTradedSoFar, lotsRequired, profitEarned }: BonusProgressProps) {
  const progressPercentage = (lotsTradedSoFar / lotsRequired) * 100;
  const bonusRZDS = (profitEarned * 0.2).toFixed(2);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="space-y-6 h-full overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Bonus Progress</h2>
        
        <div className="bg-secondary/10 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">How It Works</h3>
          <p className="text-sm mb-1">Earn an extra 20% of your monthly profits in RZDS</p>
          <p className="text-sm">Meet the trading volume requirement: Profit / 20</p>
        </div>

        <div className="bg-secondary/10 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Your Progress</h3>
          <Progress value={progressPercentage} className="mb-2" />
          <p className="text-sm mb-1">
            You&apos;ve traded {lotsTradedSoFar} out of {lotsRequired} lots needed to unlock your bonus
          </p>
          <p className="font-semibold">{progressPercentage.toFixed(0)}% Complete</p>
        </div>

        <div className="bg-secondary/10 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Bonus Breakdown</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Profit Earned</TableCell>
                <TableCell>${profitEarned}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Required Trading Volume</TableCell>
                <TableCell>{lotsRequired} lots</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Your Current Volume</TableCell>
                <TableCell>{lotsTradedSoFar} lots</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Potential RZDS Bonus</TableCell>
                <TableCell>{Number(bonusRZDS) * 10} RZDS</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-background/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Business Impact</h3>
          <p className="text-sm">
            Traders who meet their volume targets receive an average bonus of{" "}
            <Badge variant="secondary">3,000 RZDS</Badge> monthly.
          </p>
        </div>
      </div>
    </div>
  );
}