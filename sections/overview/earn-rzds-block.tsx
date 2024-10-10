import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gift, ShieldCheck, Wallet, BarChart2, Percent } from 'lucide-react';

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

export function EarnRzdsBlock() {
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
      </CardContent>
    </Card>
  );
}
