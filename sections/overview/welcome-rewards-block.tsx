import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';

export function WelcomeRewardsBlock() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <CardTitle className="mb-2 text-4xl font-bold">
          Welcome to the ZFX Rewards Program!
        </CardTitle>
        <CardDescription className="text-xl text-white">
          Earn RZDS points and convert them into valuable ZDS tokens.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 flex-1 md:mb-0 md:mr-6">
            <h3 className="mb-4 text-2xl font-semibold">
              Start Earning Today!
            </h3>
            <ul className="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                New users can earn up to 4,500 RZDS through initial activities
              </li>
              <li>Convert RZDS to ZDS for real-world value</li>
              <li>Unlock exclusive benefits and trading advantages</li>
            </ul>
            <p className="text-sm italic text-muted-foreground">
              "Join thousands of traders who have already earned over 1,000,000
              RZDS collectively!"
            </p>
          </div>
          <div className="flex flex-1 justify-center">
            <Image
              src="/images/rewards-graphic.png"
              alt="ZFX Rewards Program"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-100 p-6">
        <Button variant="default" size="lg" className="w-full md:w-auto">
          Learn How to Maximize Your Rewards
        </Button>
      </CardFooter>
    </Card>
  );
}
