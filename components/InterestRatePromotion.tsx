import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface InterestRatePromotionProps {
  currentRate: number;
  currentPoints: number;
  nextTierPoints: number;
}

const tiers = [
  { points: 0, rate: 5 },
  { points: 100, rate: 6 },
  { points: 200, rate: 7 },
  { points: 300, rate: 8 },
  { points: 400, rate: 9 },
];

export function InterestRatePromotion({ currentRate, currentPoints, nextTierPoints }: InterestRatePromotionProps) {
  const progress = (currentPoints / nextTierPoints) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interest Rate Promotion</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">Your Current Interest Rate: <span className="font-bold text-primary">{currentRate}%</span></p>
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-1">
            {currentPoints} / {nextTierPoints} Trading Points
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" className="mt-2 p-0">Learn How</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Trade more to unlock higher interest rates!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Trading Points</TableHead>
              <TableHead>Interest Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiers.map((tier, index) => (
              <TableRow key={index}>
                <TableCell>{tier.points}+</TableCell>
                <TableCell>{tier.rate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}