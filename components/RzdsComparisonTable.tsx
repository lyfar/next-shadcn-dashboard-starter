import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const comparisonData = [
  { market: 'Gold', change: '+0.24%', sell: '2,613.61', buy: '2,613.91', low: '2,605.82', high: '2,616.81', current: '2,614.50' },
  { market: 'Crude Oil', change: '+0.59%', sell: '73.348', buy: '73.378', low: '72.823', high: '73.511', current: '73.400' },
  { market: 'Brent Oil', change: '+0.50%', sell: '76.924', buy: '76.956', low: '76.473', high: '77.116', current: '76.950' },
  { market: 'Natural Gas', change: '+0.17%', sell: '2.8660', buy: '2.8710', low: '2.8580', high: '2.8720', current: '2.8690' },
  { market: 'Silver', change: '+0.26%', sell: '30.553', buy: '30.573', low: '30.348', high: '30.646', current: '30.560' },
  { market: 'Copper', change: '+0.02%', sell: '4.43386', buy: '4.43658', low: '4.42329', high: '4.46456', current: '4.43500' },
  { market: 'Crude Oil - Nov 2024', change: '+0.61%', sell: '73.790', buy: '73.820', low: '73.255', high: '73.950', current: '73.810' },
  { market: 'Palladium', change: '+1.48%', sell: '1,053.30', buy: '1,055.60', low: '1,036.00', high: '1,060.60', current: '1,054.50' },
];

function RangeIndicator({ low, high, current }: { low: string; high: string; current: string }) {
  const lowValue = parseFloat(low);
  const highValue = parseFloat(high);
  const currentValue = parseFloat(current);
  const range = highValue - lowValue;
  const position = ((currentValue - lowValue) / range) * 100;

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full relative">
      <div 
        className="absolute top-0 bottom-0 left-0 bg-blue-500 rounded-full" 
        style={{ width: `${position}%` }}
      />
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" 
        style={{ left: `${position}%` }}
      />
    </div>
  );
}

export function RzdsComparisonTable() {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Market</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Sell</TableHead>
                <TableHead>Buy</TableHead>
                <TableHead className="w-[200px]">Low / High</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.market}</TableCell>
                  <TableCell className={row.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                    {row.change}
                  </TableCell>
                  <TableCell>{row.sell}</TableCell>
                  <TableCell>{row.buy}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <RangeIndicator low={row.low} high={row.high} current={row.current} />
                      <div className="flex justify-between text-xs mt-1">
                        <span>{row.low}</span>
                        <span>{row.high}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-between">
                      <button className="text-gray-400 hover:text-gray-600">
                        <ArrowUpDown size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        {row.change.startsWith('+') ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}