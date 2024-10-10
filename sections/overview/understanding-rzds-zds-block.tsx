import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, Repeat } from 'lucide-react';

export function UnderstandingRzdsZdsBlock() {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Convert Your RZDS into Valuable ZDS Tokens
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">RZDS</div>
            <div className="text-sm text-muted-foreground">Internal Points</div>
          </div>
          <ArrowRight className="h-6 w-6" />
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">ZDS</div>
            <div className="text-sm text-muted-foreground">Crypto Tokens</div>
          </div>
        </div>

        <div className="bg-secondary/10 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">How it works:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>RZDS are internal points earned through activities</li>
            <li>ZDS are cryptocurrency tokens with real, fluctuating value</li>
            <li>Convert RZDS to ZDS at a rate of 10 RZDS = 1 ZDS</li>
          </ul>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Example Conversion:</h3>
          <p>10,000 RZDS <Repeat className="inline h-4 w-4 mx-2" /> 1,000 ZDS</p>
          <p className="text-sm text-muted-foreground mt-2">
            Note: The value of ZDS in USD fluctuates based on market conditions.
          </p>
        </div>

        <div className="bg-secondary/10 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Real-world Value:</h3>
          <p>
            If you have 9,500 RZDS, you can convert them into 950 ZDS. The USD value
            of this ZDS will vary based on the current market price.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Example: If 1 ZDS = $0.10, 950 ZDS would be worth $95. However, this
            value can change as the price of ZDS fluctuates.
          </p>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Start earning RZDS today and convert them to valuable ZDS tokens!
        </div>
      </CardContent>
    </Card>
  );
}