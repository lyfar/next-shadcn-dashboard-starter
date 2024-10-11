import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gift, ShieldCheck, Wallet, BarChart2, Percent, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type EarnAction = {
  icon: React.ReactNode;
  title: string;
  reward: string;
  description: string;
  progress: number;
};

const earnActions: EarnAction[] = [
  {
    icon: <Gift className="h-6 w-6" />,
    title: 'Registration Bonus',
    reward: '1,000 RZDS',
    description: "Sign up and instantly receive 1,000 RZDS—it's that simple!",
    progress: 100
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Complete KYC Verification',
    reward: '500 RZDS',
    description:
      'Verify your identity to secure your account and earn 500 RZDS.',
    progress: 0
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'Make Your First Deposit',
    reward: '2,000 RZDS',
    description:
      'Deposit funds to start trading and get 2,000 RZDS added to your balance.',
    progress: 0
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: 'Execute Your First Trade',
    reward: '1,000 RZDS',
    description: 'Place your first trade and earn an extra 1,000 RZDS.',
    progress: 0
  },
  {
    icon: <Percent className="h-6 w-6" />,
    title: 'Monthly Trading Losses Coverage',
    reward: 'Up to 5,000 RZDS',
    description:
      "If you experience a loss of $500 this month, we'll credit you with 5,000 RZDS.",
    progress: 0
  }
];

type ConversionStep = 'method' | 'details' | 'complete';

export function EarnRzdsBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<ConversionStep>('method');
  const [conversionMethod, setConversionMethod] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep('method');
    setConversionMethod(null);
  };

  const nextStep = () => {
    if (currentStep === 'method') setCurrentStep('details');
    else if (currentStep === 'details') setCurrentStep('complete');
  };

  const prevStep = () => {
    if (currentStep === 'details') setCurrentStep('method');
    else if (currentStep === 'complete') setCurrentStep('details');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'method':
        return (
          <RadioGroup onValueChange={setConversionMethod} value={conversionMethod || undefined}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="trading" id="trading" />
              <Label htmlFor="trading">Trading Income</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="interest" id="interest" />
              <Label htmlFor="interest">Interest Income</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="profit" id="profit" />
              <Label htmlFor="profit">Profit Income</Label>
            </div>
          </RadioGroup>
        );
      case 'details':
        return (
          <div>
            <p>Eligible amount: 1000 ZDU</p>
            <p>Conversion rate: 1 ZDU = 1 ZDS</p>
            <p>You will receive: 1000 ZDS</p>
          </div>
        );
      case 'complete':
        return (
          <div>
            <p>Conversion successful!</p>
            <p>Your new ZDS balance: 1000 ZDS</p>
          </div>
        );
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Start Earning RZDS Today
        </CardTitle>
        <CardDescription>
          Complete actions to earn up to 4,500 RZDS through initial activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {earnActions.map((action, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-lg">
            <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full text-primary">
              {action.icon}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold">{action.title}</h3>
                <p className="text-sm font-medium text-primary">{action.reward}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {action.description}
              </p>
              <div className="flex items-center justify-between">
                <Progress value={action.progress} className="w-2/3" />
                <Button
                  variant={action.progress === 100 ? "secondary" : "default"}
                  size="sm"
                  disabled={action.progress === 100}
                >
                  {action.progress === 100 ? 'Completed' : 'Start'}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* New section for ZDU to ZDS conversion */}
        <div className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-lg">
          <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full text-primary">
            <RefreshCw className="h-6 w-6" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold">Convert ZDU to ZDS</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Convert your earned ZDU into valuable ZDS tokens.
            </p>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" onClick={openModal}>
                  Start Conversion
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Convert ZDU to ZDS</DialogTitle>
                  <DialogDescription>
                    Follow the steps to convert your ZDU into ZDS tokens.
                  </DialogDescription>
                </DialogHeader>
                {renderStepContent()}
                <DialogFooter>
                  {currentStep !== 'method' && (
                    <Button variant="outline" onClick={prevStep}>Back</Button>
                  )}
                  <Button onClick={currentStep === 'complete' ? closeModal : nextStep}>
                    {currentStep === 'complete' ? 'Close' : 'Next'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}