'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function ZdoZdsConversionPanel() {
  const [conversionAmount, setConversionAmount] = useState(0);
  const totalZdoBalance = 1500; // Example balance
  const conversionRate = 0.05; // Example rate: 1 ZDO = 0.05 ZDS

  const handleSliderChange = (value: number[]) => {
    setConversionAmount(value[0]);
  };

  const equivalentZds = conversionAmount * conversionRate;
  const equivalentUsd = equivalentZds; // Assuming 1 ZDS = 1 USD for simplicity

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>ZDO to ZDS Conversion</CardTitle>
        <CardDescription>Convert your ZDO points to ZDS coins</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <CardDescription className="mb-3">
                  Select amount to convert
                </CardDescription>
                <Slider
                  max={totalZdoBalance}
                  step={1}
                  value={[conversionAmount]}
                  onValueChange={handleSliderChange}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Slide to choose how much ZDO you want to convert.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="space-y-2">
          <p>Converting: {conversionAmount} ZDO</p>
          <p>You'll receive: {equivalentZds.toFixed(2)} ZDS</p>
          <p>Equivalent to: ${equivalentUsd.toFixed(2)} USD</p>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Convert Now</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Conversion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Amount to convert: {conversionAmount} ZDO</p>
              <p>You'll receive: {equivalentZds.toFixed(2)} ZDS</p>
              <p>Equivalent to: ${equivalentUsd.toFixed(2)} USD</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Note: Conversion may take up to 24 hours to process.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
