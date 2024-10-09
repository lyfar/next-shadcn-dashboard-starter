'use client';

import { Award, Coins, ArrowRightLeft, HelpCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export function ZdoZdsInfoSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Understanding ZDO & ZDS</CardTitle>
        <CardDescription>Learn about our digital assets</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                What is ZDO?
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                ZDO (Zero Digital Offering) are points earned through various
                activities on our platform.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Earn ZDO through trading activities
                </p>
                <p className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Earn ZDO by completing your profile
                </p>
                {/* Add more earning activities here */}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                What is ZDS?
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                ZDS (Zero Digital Shares) is a real digital coin that can be
                cashed out. It's the converted form of ZDO.
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Coins className="h-4 w-4" />
                ZDS can be exchanged for real currency
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                How to Convert ZDO to ZDS
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-inside list-decimal space-y-1">
                <li>Go to the conversion panel</li>
                <li>Select the amount of ZDO you want to convert</li>
                <li>Review the conversion details</li>
                <li>Confirm the conversion</li>
              </ol>
              {/* You can add screenshots or illustrations here */}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <dl className="space-y-2">
                <dt className="font-semibold">
                  How often can I convert ZDO to ZDS?
                </dt>
                <dd className="text-sm text-muted-foreground">
                  You can convert ZDO to ZDS once per day.
                </dd>
                <dt className="font-semibold">
                  Is there a minimum conversion amount?
                </dt>
                <dd className="text-sm text-muted-foreground">
                  Yes, the minimum conversion amount is 100 ZDO.
                </dd>
                {/* Add more FAQs as needed */}
              </dl>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
