'use client';

import { Coins, Award, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export function ZdoPointsCard() {
  const zdoPoints = 1500;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ZDO Points</CardTitle>
        <Award className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {zdoPoints.toLocaleString()} ZDO
        </div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
}

export function ZdsCoinsCard() {
  const zdsCoins = 75;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ZDS Coins</CardTitle>
        <Coins className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {zdsCoins.toLocaleString()} ZDS
        </div>
        <p className="text-xs text-muted-foreground">
          Equivalent to ${zdsCoins}
        </p>
      </CardContent>
    </Card>
  );
}

export function ConversionProgressCard() {
  const conversionProgress = 50; // Example: 50% converted

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Conversion Progress
        </CardTitle>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Progress value={conversionProgress} className="w-full" />
        <p className="mt-2 text-xs text-muted-foreground">
          {conversionProgress}% of ZDO converted to ZDS
        </p>
        <div className="mt-4 flex justify-between">
          <Button variant="ghost" size="sm">
            History
          </Button>
          <Button variant="ghost" size="sm">
            Convert
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
