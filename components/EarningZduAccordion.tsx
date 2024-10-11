import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UserPlus, ShieldCheck, DollarSign, Activity } from 'lucide-react';

const earningMethods = [
  {
    id: 'registration',
    icon: <UserPlus className="mr-2 h-4 w-4" />,
    title: 'Registration Reward',
    description: 'Receive ZDU equivalent to $100 upon completing registration.'
  },
  {
    id: 'monthlyLoss',
    icon: <Activity className="mr-2 h-4 w-4" />,
    title: 'Monthly Net Loss Conversion',
    description: 'Your total net losses from the previous month will be converted to ZDU.'
  },
  {
    id: 'trading',
    icon: <DollarSign className="mr-2 h-4 w-4" />,
    title: 'Trading Volume',
    description: 'Earn ZDU based on your monthly trading volume.'
  },
  {
    id: 'security',
    icon: <ShieldCheck className="mr-2 h-4 w-4" />,
    title: 'Security Features',
    description: 'Enable 2FA and complete other security measures to earn ZDU.'
  }
];

export const EarningZduAccordion: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {earningMethods.map((method) => (
        <AccordionItem key={method.id} value={method.id}>
          <AccordionTrigger className="flex items-center">
            {method.icon}
            <span>{method.title}</span>
          </AccordionTrigger>
          <AccordionContent>
            {method.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};