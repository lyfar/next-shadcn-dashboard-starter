'use client';

import { User, Coins, Award } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export function DigitalSharesCard() {
  const zdoPoints = 1500;
  const zdsCoins = 75;
  const conversionProgress = 50; // Example: 50% converted

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Quick Status Overview</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/path-to-user-image.jpg" alt="User" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardDescription>Your ZDO Points</CardDescription>
            <CardTitle>{zdoPoints.toLocaleString()} ZDO</CardTitle>
          </div>
          <Award className="h-8 w-8 text-primary" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <CardDescription>Your ZDS Coins</CardDescription>
            <CardTitle>{zdsCoins.toLocaleString()} ZDS</CardTitle>
            <CardDescription>Equivalent to ${zdsCoins}</CardDescription>
          </div>
          <Coins className="h-8 w-8 text-primary" />
        </div>
        <div>
          <CardDescription className="mb-2">
            Conversion Progress
          </CardDescription>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Progress value={conversionProgress} className="w-full" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  You've converted {conversionProgress}% of your ZDO into ZDS.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <button className="text-primary hover:underline">History</button>
        <button className="text-primary hover:underline">Convert</button>
      </CardFooter>
    </Card>
  );
}
