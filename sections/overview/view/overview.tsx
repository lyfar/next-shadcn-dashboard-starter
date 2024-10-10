'use client';

import { useState } from 'react';
import { AreaGraph } from '../area-graph';
import { BarGraph } from '../bar-graph';
import { PieGraph } from '../pie-graph';
import {
  ZdoPointsCard,
  ZdsCoinsCard,
  ConversionProgressCard
} from '../digital-shares-card';
import { ZdoZdsConversionPanel } from '../zdo-zds-conversion-panel';
import { ZdoZdsInfoSection } from '../zdo-zds-info-section';
import { ConversionHistoryChart } from '../conversion-history-chart';
import { RewardsPerformanceOverview } from '../rewards-performance-overview';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from '../recent-sales';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { WelcomeRewardsBlock } from '../welcome-rewards-block';
import { EarnRzdsBlock } from '../earn-rzds-block';
import { UnderstandingRzdsBlock } from '../understanding-rzds-block';
import { BonusProgressWidget } from '../bonus-progress-widget';
import { InfoSidebar } from '../info-sidebar';
import { Progress } from '@/components/ui/progress';
import { ClaimingRewardsWidget } from '@/components/claiming-rewards-widget';
import { ClaimingRewardsDetails } from '@/components/claiming-rewards-details';
import { ZdoClickerWidget } from '@/components/ZdoClickerWidget';
import { ZdoClickerGame } from '@/components/ZdoClickerGame';

export default function OverviewPageView() {
  const [sidebarContent, setSidebarContent] = useState<React.ReactNode | null>(null);
  const [userData, setUserData] = useState({
    lotsTradedSoFar: 30,
    lotsRequired: 50,
    profitEarned: 1000,
    daysLeftToClaim: 15,
    rzdsAmountToClaim: 9500,
    zdoBalance: 1500,
  });

  const handleBonusProgressClick = () => {
    setSidebarContent(
      <BonusProgressWidget
        lotsTradedSoFar={userData.lotsTradedSoFar}
        lotsRequired={userData.lotsRequired}
        profitEarned={userData.profitEarned}
      />
    );
  };

  const handleClaimRewardsClick = () => {
    setSidebarContent(
      <ClaimingRewardsDetails
        daysLeft={userData.daysLeftToClaim}
        rzdsAmount={userData.rzdsAmountToClaim}
        onClaimClick={(amount) => {
          setUserData(prev => ({
            ...prev,
            zdoBalance: prev.zdoBalance + amount,
            rzdsAmountToClaim: 0,
            daysLeftToClaim: 0,
          }));
          // The component will handle showing the success message and confetti
        }}
      />
    );
  };

  const handleZdoClickerPlay = () => {
    setSidebarContent(
      <ZdoClickerGame
        onEarnZdo={(amount) => {
          setUserData(prev => ({
            ...prev,
            zdoBalance: prev.zdoBalance + amount,
          }));
        }}
      />
    );
  };

  return (
    <PageContainer 
      scrollable={true} 
      sidebar={sidebarContent}
    >
      <div className="space-y-4 pb-6">
        <WelcomeRewardsBlock />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="cursor-pointer" onClick={handleBonusProgressClick}>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Track Your Bonus Progress</h3>
              <Progress value={(userData.lotsTradedSoFar / userData.lotsRequired) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                You&apos;ve traded {userData.lotsTradedSoFar} out of {userData.lotsRequired} lots needed to unlock your RZDS bonus.
              </p>
              <p className="text-sm text-primary mt-2">Click for more details</p>
            </CardContent>
          </Card>
          <ZdoPointsCard balance={userData.zdoBalance} />
          <ZdsCoinsCard />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ClaimingRewardsWidget
            daysLeft={userData.daysLeftToClaim}
            rzdsAmount={userData.rzdsAmountToClaim}
            onClaimClick={handleClaimRewardsClick}
          />
          <ZdoClickerWidget onPlayClick={handleZdoClickerPlay} />
          {/* Add other widgets here if needed */}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EarnRzdsBlock />
          <UnderstandingRzdsBlock />
        </div>

        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              <div className="col-span-4">
                <AreaGraph />
              </div>
              <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          Digital Shares Concepts
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ConversionProgressCard />
          {/* You can add more cards here if needed */}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ZdoZdsConversionPanel />
          <ZdoZdsInfoSection />
        </div>

        <div className="mt-4">
          <ConversionHistoryChart />
        </div>

        <div className="mt-4">
          <RewardsPerformanceOverview />
        </div>
      </div>
    </PageContainer>
  );
}