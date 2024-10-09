'use client';

import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// Mock data for the charts and table
const chartData = [
  { month: 'Jan', trades: 1000, referrals: 500, bonuses: 200 },
  { month: 'Feb', trades: 1500, referrals: 700, bonuses: 300 },
  { month: 'Mar', trades: 1200, referrals: 600, bonuses: 250 },
  { month: 'Apr', trades: 1800, referrals: 900, bonuses: 400 },
  { month: 'May', trades: 2000, referrals: 1000, bonuses: 500 },
  { month: 'Jun', trades: 1700, referrals: 800, bonuses: 350 }
];

const tableData = [
  { date: '2024-06-01', activity: 'Trade', zdoEarned: 100, zdsConverted: 5 },
  {
    date: '2024-06-02',
    activity: 'Referral',
    zdoEarned: 50,
    zdsConverted: 2.5
  },
  { date: '2024-06-03', activity: 'Bonus', zdoEarned: 25, zdsConverted: 1.25 },
  { date: '2024-06-04', activity: 'Trade', zdoEarned: 75, zdsConverted: 3.75 },
  { date: '2024-06-05', activity: 'Trade', zdoEarned: 120, zdsConverted: 6 }
];

const chartConfig = {
  trades: {
    label: 'Earnings from Trades',
    color: 'hsl(var(--chart-1))'
  },
  referrals: {
    label: 'Referral Rewards',
    color: 'hsl(var(--chart-2))'
  },
  bonuses: {
    label: 'Bonuses',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig;

export function RewardsPerformanceOverview() {
  const [activeView, setActiveView] =
    useState<keyof typeof chartConfig>('trades');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...tableData].sort((a, b) => {
    if (sortColumn) {
      if (a[sortColumn as keyof typeof a] < b[sortColumn as keyof typeof b]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortColumn as keyof typeof a] > b[sortColumn as keyof typeof b]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const total = useMemo(
    () => ({
      trades: chartData.reduce((acc, curr) => acc + curr.trades, 0),
      referrals: chartData.reduce((acc, curr) => acc + curr.referrals, 0),
      bonuses: chartData.reduce((acc, curr) => acc + curr.bonuses, 0)
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Rewards and Performance Overview</CardTitle>
          <CardDescription>Track your earnings and conversions</CardDescription>
        </div>
        <div className="flex">
          {(Object.keys(chartConfig) as Array<keyof typeof chartConfig>).map(
            (key) => (
              <button
                key={key}
                data-active={activeView === key}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveView(key)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[key].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey={activeView} fill={`var(--color-${activeView})`} />
          </BarChart>
        </ChartContainer>

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              {['Date', 'Activity', 'ZDO Earned', 'ZDS Converted'].map(
                (header) => (
                  <TableHead key={header}>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        handleSort(header.toLowerCase().replace(' ', ''))
                      }
                    >
                      {header}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.activity}</TableCell>
                <TableCell>{row.zdoEarned}</TableCell>
                <TableCell>{row.zdsConverted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
