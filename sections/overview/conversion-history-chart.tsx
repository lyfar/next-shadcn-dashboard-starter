'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Mock data for the chart
const chartData = [
  { date: '2024-01-01', value: 1.0 },
  { date: '2024-01-02', value: 1.02 },
  { date: '2024-01-03', value: 1.01 },
  { date: '2024-01-04', value: 1.03 },
  { date: '2024-01-05', value: 1.05 },
  { date: '2024-01-06', value: 1.04 },
  { date: '2024-01-07', value: 1.06 }
];

// Mock data for the conversion history table
const conversionHistory = [
  { date: '2024-01-07', zdoConverted: 100, zdsReceived: 5, usdValue: 5.3 },
  { date: '2024-01-06', zdoConverted: 200, zdsReceived: 10, usdValue: 10.4 },
  { date: '2024-01-05', zdoConverted: 150, zdsReceived: 7.5, usdValue: 7.88 },
  { date: '2024-01-04', zdoConverted: 300, zdsReceived: 15, usdValue: 15.45 },
  { date: '2024-01-03', zdoConverted: 50, zdsReceived: 2.5, usdValue: 2.53 }
];

export function ConversionHistoryChart() {
  const [dateRange, setDateRange] = useState('last7Days');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Conversion History and ZDS Value</CardTitle>
        <CardDescription>
          Track your conversions and ZDS value over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <CalendarDateRangePicker />
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7Days">Last 7 Days</SelectItem>
              <SelectItem value="last30Days">Last 30 Days</SelectItem>
              <SelectItem value="customRange">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-8 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>ZDO Converted</TableHead>
              <TableHead>ZDS Received</TableHead>
              <TableHead>USD Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversionHistory.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.zdoConverted}</TableCell>
                <TableCell>{row.zdsReceived}</TableCell>
                <TableCell>${row.usdValue.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-end">
          <Button variant="outline">Previous</Button>
          <Button variant="outline" className="ml-2">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
