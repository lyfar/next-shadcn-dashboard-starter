import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart2, ArrowUpDown, Info, ChevronUp, ChevronDown, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

const stories: Story[] = [
  {
    id: 1,
    title: "What are ZDO Points?",
    content: "ZDO Points are rewards for your forex trading activity. They represent your engagement and can be converted into valuable ZDS Coins.",
    likes: 1500,
    comments: 250,
    shares: 100
  },
  {
    id: 2,
    title: "ZDS Coins in Forex",
    content: "ZDS Coins are our platform's digital currency. Use them for reduced spreads, access to premium trading tools, or convert to real currency.",
    likes: 1200,
    comments: 180,
    shares: 80
  },
  {
    id: 3,
    title: "Converting ZDO to ZDS",
    content: "Convert your ZDO Points to ZDS Coins to unlock trading benefits. The more you trade, the more value you can generate!",
    likes: 1000,
    comments: 150,
    shares: 70
  },
  {
    id: 4,
    title: "Trading Perks with ZDS",
    content: "Use ZDS Coins for lower fees, higher leverage, or exclusive market analysis. Enhance your forex trading experience with ZDS.",
    likes: 800,
    comments: 120,
    shares: 60
  },
  {
    id: 5,
    title: "Earning More ZDO",
    content: "Increase your ZDO earnings by trading more volume, maintaining consistent activity, and participating in trading challenges.",
    likes: 600,
    comments: 90,
    shares: 50
  }
];

function TopNavbar() {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center bg-black bg-opacity-50 text-white py-2 px-4">
      <TrendingUp className="w-6 h-6" />
      <div className="text-center">
        <span className="font-bold">ZDO</span> | <span className="font-bold">ZDS Guide</span>
      </div>
      <Info className="w-6 h-6" />
    </div>
  );
}

interface FooterLeftProps {
  title: string;
  content: string;
}

function FooterLeft({ title, content }: FooterLeftProps) {
  return (
    <div className="absolute bottom-20 left-4 text-white">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm">{content}</p>
    </div>
  );
}

interface FooterRightProps {
  likes: number;
  comments: number;
  shares: number;
}

function FooterRight({ likes, comments, shares }: FooterRightProps) {
  return (
    <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center">
        <ThumbsUp className="w-8 h-8 text-white" />
        <span className="text-white text-xs">{likes}</span>
      </div>
      <div className="flex flex-col items-center">
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="text-white text-xs">{comments}</span>
      </div>
      <div className="flex flex-col items-center">
        <Share2 className="w-8 h-8 text-white" />
        <span className="text-white text-xs">{shares}</span>
      </div>
    </div>
  );
}

function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-black bg-opacity-50 text-white py-2">
      <div className="flex flex-col items-center">
        <TrendingUp className="w-6 h-6" />
        <span className="text-xs">Markets</span>
      </div>
      <div className="flex flex-col items-center">
        <DollarSign className="w-6 h-6" />
        <span className="text-xs">ZDS</span>
      </div>
      <div className="flex flex-col items-center">
        <ArrowUpDown className="w-8 h-8" />
        <span className="text-xs">Trade</span>
      </div>
      <div className="flex flex-col items-center">
        <BarChart2 className="w-6 h-6" />
        <span className="text-xs">Analysis</span>
      </div>
      <div className="flex flex-col items-center">
        <Info className="w-6 h-6" />
        <span className="text-xs">Learn</span>
      </div>
    </div>
  );
}

export function ZdoZdsStoryView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const constraintsRef = useRef(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.y < -50 && currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-900 to-black text-white overflow-hidden relative" ref={constraintsRef}>
      <TopNavbar />
      <motion.div
        drag="y"
        dragConstraints={constraintsRef}
        onDragEnd={handleDragEnd}
        className="h-full w-full flex flex-col items-center justify-center p-6"
      >
        <h2 className="text-3xl font-bold mb-4">{stories[currentIndex].title}</h2>
        <p className="text-lg text-center mb-8">{stories[currentIndex].content}</p>
      </motion.div>
      <FooterLeft 
        title={stories[currentIndex].title}
        content={stories[currentIndex].content}
      />
      <FooterRight 
        likes={stories[currentIndex].likes}
        comments={stories[currentIndex].comments}
        shares={stories[currentIndex].shares}
      />
      <BottomNavbar />
    </div>
  );
}