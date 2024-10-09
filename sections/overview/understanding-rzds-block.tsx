'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, Info, AlertTriangle } from 'lucide-react';

function CountdownTimer({ expiryDate }: { expiryDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    function calculateTimeLeft() {
      const difference = +expiryDate - +new Date();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
      return "Time's up!";
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div className="flex items-center space-x-2">
      <Clock className="h-5 w-5" />
      <div className="text-lg font-bold">{timeLeft}</div>
    </div>
  );
}

export function UnderstandingRzdsBlock() {
  const [isClient, setIsClient] = useState(false);
  const expiryDate = new Date('2024-12-31T23:59:59'); // Example expiry date

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">What Are RZDS?</CardTitle>
        <CardDescription>
          Understand and manage your Reward ZDS (RZDS)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                RZDS Balance
              </CardTitle>
              <Info className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">500 RZDS</div>
              <p className="text-xs text-muted-foreground">
                Accumulated from trading activities
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiration</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isClient && <CountdownTimer expiryDate={expiryDate} />}
              <p className="text-xs text-muted-foreground">
                Time left to claim your RZDS
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Key Points About RZDS:</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>RZDS are rewards accumulated from your trading activities</li>
            <li>You need to claim RZDS to convert them into valuable ZDS</li>
            <li>RZDS expire if not claimed within the specified timeframe</li>
            <li>
              Claiming RZDS is a simple process that can be done with a few
              clicks
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">Claim Progress</h3>
          <Progress value={60} className="w-full" />
          <p className="mt-1 text-xs text-muted-foreground">
            60% of your RZDS have been claimed
          </p>
        </div>

        <Button className="w-full">Claim Your RZDS Now</Button>
      </CardContent>
    </Card>
  );
}
