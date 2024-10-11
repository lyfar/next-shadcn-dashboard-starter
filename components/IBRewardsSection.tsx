import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// This is a placeholder for the TreeView component. You'll need to implement or import an actual TreeView component.
const TreeView = () => <div>TreeView Placeholder</div>;

const clientData = [
  { name: "Client A", level: 1, earnings: 500 },
  { name: "Client B", level: 1, earnings: 300 },
  { name: "Client C", level: 2, earnings: 200 },
  { name: "Client D", level: 3, earnings: 100 },
];

export const IBRewardsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const totalEarnings = {
    level1: 1000,
    level2: 500,
    level3: 250,
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>IB Earnings Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Earnings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="space-y-2">
              <p>Level 1 Earnings: <span className="font-bold">{totalEarnings.level1} ZDU</span></p>
              <p>Level 2 Earnings: <span className="font-bold">{totalEarnings.level2} ZDU</span></p>
              <p>Level 3 Earnings: <span className="font-bold">{totalEarnings.level3} ZDU</span></p>
            </div>
            <Button variant="outline" className="mt-4" onClick={() => setActiveTab("detailed")}>
              View Details
            </Button>
          </TabsContent>
          <TabsContent value="detailed">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Earnings (ZDU)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientData.map((client, index) => (
                  <TableRow key={index}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.level}</TableCell>
                    <TableCell>{client.earnings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Client Network</h3>
          <TreeView />
        </div>
      </CardContent>
    </Card>
  );
};