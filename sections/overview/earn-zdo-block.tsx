import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  UserPlus,
  ShieldCheck,
  Wallet,
  BarChart2,
  Percent
} from 'lucide-react';

type EarnAction = {
  icon: React.ReactNode;
  title: string;
  reward: string;
  progress: number;
};

const earnActions: EarnAction[] = [
  {
    icon: <UserPlus className="h-6 w-6" />,
    title: 'Registration Bonus',
    reward: '$100 ZDO',
    progress: 100
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'KYC Completion',
    reward: '$50 ZDO',
    progress: 0
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'First Deposit',
    reward: '$75 ZDO',
    progress: 0
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: 'First Trade',
    reward: '$25 ZDO',
    progress: 0
  },
  {
    icon: <Percent className="h-6 w-6" />,
    title: 'Monthly Loss Coverage',
    reward: 'Up to $500 ZDO',
    progress: 0
  }
];

export function EarnZdoBlock() {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Start Earning ZDO Today
        </CardTitle>
        <CardDescription>Complete actions to earn ZDO rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {earnActions.map((action, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0 text-primary">{action.icon}</div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.reward}</p>
              <Progress value={action.progress} className="mt-2" />
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={action.progress === 100}
            >
              {action.progress === 100 ? 'Completed' : 'Start'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
