import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Zap, Award, Clock, Star, ArrowUp, Settings, Map, Trophy, Home, Sun, Moon, Sparkles, Castle, Cloud, Lock, Unlock } from 'lucide-react';
import Image from 'next/image';
import { CustomCursor } from './CustomCursor';
import { RollingNumber } from '@/components/ui/rolling-number';
import { ConfettiEffect } from './confetti-effect';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ZdoClickerGameProps {
  onEarnZdo: (amount: number) => void;
  initialBalance: number;
  onAchievementUnlock: (achievement: Achievement) => void;
}

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: number;
  count: number;
}

interface Structure {
  id: string;
  name: string;
  cost: number;
  beautyScore: number;
  count: number;
}

interface Decoration {
  id: string;
  name: string;
  cost: number;
  beautyScore: number;
  active: boolean;
}

interface Realm {
  id: string;
  name: string;
  description: string;
  unlockRequirement: number;
  bonuses: string[];
  unlocked: boolean;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  reward: string;
  unlocked: boolean;
  category: 'clicking' | 'collection' | 'exploration' | 'special' | 'event';
}

interface FlyingPoint {
  id: number;
  value: number;
  x: number;
  y: number;
}

export function ZdoClickerGame({ onEarnZdo, initialBalance, onAchievementUnlock }: ZdoClickerGameProps) {
  const [totalZdo, setTotalZdo] = useState(initialBalance);
  const [zdoPerClick, setZdoPerClick] = useState(1);
  const [zdoPerSecond, setZdoPerSecond] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { id: 'clickUpgrade', name: 'Cloud Boost', description: 'Increase ZDO per click', cost: 10, effect: 1, count: 0 },
    { id: 'autoCollector', name: 'Cloud Sprite', description: 'Collect ZDO automatically', cost: 50, effect: 1, count: 0 },
  ]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('main');

  const [structures, setStructures] = useState<Structure[]>([
    { id: 'floatingIsland', name: 'Floating Island', cost: 100, beautyScore: 10, count: 0 },
    { id: 'skyCastle', name: 'Sky Castle', cost: 500, beautyScore: 50, count: 0 },
    { id: 'cloudGarden', name: 'Cloud Garden', cost: 250, beautyScore: 25, count: 0 },
  ]);

  const [decorations, setDecorations] = useState<Decoration[]>([
    { id: 'customCloudColor', name: 'Custom Cloud Color', cost: 50, beautyScore: 5, active: false },
    { id: 'sunset', name: 'Sunset Effect', cost: 100, beautyScore: 15, active: false },
    { id: 'starryNight', name: 'Starry Night', cost: 150, beautyScore: 20, active: false },
    { id: 'aurora', name: 'Aurora Borealis', cost: 200, beautyScore: 30, active: false },
  ]);

  const [kingdomLevel, setKingdomLevel] = useState(1);
  const [beautyScore, setBeautyScore] = useState(0);

  const [realms, setRealms] = useState<Realm[]>([
    {
      id: 'cumulusFields',
      name: 'Cumulus Fields',
      description: 'Beginner area with basic clouds.',
      unlockRequirement: 0,
      bonuses: ['Basic ZDO earnings'],
      unlocked: true
    },
    {
      id: 'nimbusValley',
      name: 'Nimbus Valley',
      description: 'Higher ZDO rewards, new challenges.',
      unlockRequirement: 1000,
      bonuses: ['2x ZDO earnings', 'New cloud types'],
      unlocked: false
    },
    {
      id: 'stratusPlains',
      name: 'Stratus Plains',
      description: 'Unique visuals, special bonuses.',
      unlockRequirement: 5000,
      bonuses: ['3x ZDO earnings', 'Special events'],
      unlocked: false
    },
    {
      id: 'cirrusPeaks',
      name: 'Cirrus Peaks',
      description: 'Advanced area with rare upgrades.',
      unlockRequirement: 10000,
      bonuses: ['5x ZDO earnings', 'Rare upgrades'],
      unlocked: false
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'firstGust', name: 'First Gust', description: 'Perform your first click.', reward: 'Unlock a special cloud cursor.', unlocked: false, category: 'clicking' },
    { id: 'breezyBeginner', name: 'Breezy Beginner', description: 'Reach 500 total clicks.', reward: 'Increase ZDO per click by 10%.', unlocked: false, category: 'clicking' },
    { id: 'windWarrior', name: 'Wind Warrior', description: 'Achieve 1,000 clicks in a single session.', reward: 'Unlock the "Storm Surge" ability.', unlocked: false, category: 'clicking' },
    { id: 'hurricaneHero', name: 'Hurricane Hero', description: 'Reach 10,000 total clicks.', reward: 'Permanent +1 ZDO per click.', unlocked: false, category: 'clicking' },
    { id: 'cloudCollector', name: 'Cloud Collector', description: 'Collect 10,000 ZDO.', reward: 'Unlock access to Nimbus Valley.', unlocked: false, category: 'collection' },
    { id: 'skysTheLimit', name: "Sky's the Limit", description: 'Accumulate 1,000,000 ZDO.', reward: 'Unlock the Sky Castle structure.', unlocked: false, category: 'collection' },
    { id: 'orbOverlord', name: 'Orb Overlord', description: 'Collect 10,000,000 ZDO.', reward: 'Gain a permanent 5% bonus to all ZDO earnings.', unlocked: false, category: 'collection' },
    { id: 'firstFlight', name: 'First Flight', description: 'Unlock your first new realm.', reward: 'Receive a free Cloud Sprite.', unlocked: false, category: 'exploration' },
    { id: 'realmRoamer', name: 'Realm Roamer', description: 'Explore all basic realms.', reward: 'Unlock access to secret realms.', unlocked: false, category: 'exploration' },
    { id: 'skySovereign', name: 'Sky Sovereign', description: 'Unlock all realms in the game.', reward: 'Obtain the title of Sky Sovereign and a special avatar.', unlocked: false, category: 'exploration' },
    // ... (add more achievements as needed)
  ]);

  const [flyingPoints, setFlyingPoints] = useState<FlyingPoint[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalZdo(prev => prev + zdoPerSecond);
      onEarnZdo(zdoPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [zdoPerSecond, onEarnZdo]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const earnedAmount = zdoPerClick;
    setTotalZdo(prev => prev + earnedAmount);
    setClickCount(prev => prev + 1);
    setXp(prev => {
      const newXp = prev + earnedAmount;
      if (newXp >= level * 100) {
        setLevel(l => l + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        return newXp - level * 100;
      }
      return newXp;
    });
    onEarnZdo(earnedAmount);

    // Generate flying points
    const rect = event.currentTarget.getBoundingClientRect();
    const newFlyingPoints = Array.from({ length: Math.min(earnedAmount, 10) }, (_, index) => ({
      id: Date.now() + index,
      value: earnedAmount > 10 ? 10 : 1,
      x: event.clientX - rect.left + (Math.random() - 0.5) * 40,
      y: event.clientY - rect.top + (Math.random() - 0.5) * 40,
    }));
    setFlyingPoints(prev => [...prev, ...newFlyingPoints]);

    checkAchievements();
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    if (totalZdo >= upgrade.cost) {
      setTotalZdo(prev => prev - upgrade.cost);
      setUpgrades(prevUpgrades =>
        prevUpgrades.map(u =>
          u.id === upgrade.id
            ? { ...u, count: u.count + 1, cost: Math.floor(u.cost * 1.5) }
            : u
        )
      );
      if (upgrade.id === 'clickUpgrade') {
        setZdoPerClick(prev => prev + upgrade.effect);
      } else if (upgrade.id === 'autoCollector') {
        setZdoPerSecond(prev => prev + upgrade.effect);
      }
    }
  };

  const buyStructure = (structure: Structure) => {
    if (totalZdo >= structure.cost) {
      setTotalZdo(prev => prev - structure.cost);
      setStructures(prevStructures =>
        prevStructures.map(s =>
          s.id === structure.id
            ? { ...s, count: s.count + 1, cost: Math.floor(s.cost * 1.2) }
            : s
        )
      );
      updateBeautyScore();
    }
  };

  const toggleDecoration = (decoration: Decoration) => {
    if (!decoration.active && totalZdo >= decoration.cost) {
      setTotalZdo(prev => prev - decoration.cost);
      setDecorations(prevDecorations =>
        prevDecorations.map(d =>
          d.id === decoration.id
            ? { ...d, active: true }
            : d
        )
      );
      updateBeautyScore();
    }
  };

  const updateBeautyScore = () => {
    const structureScore = structures.reduce((total, s) => total + s.beautyScore * s.count, 0);
    const decorationScore = decorations.reduce((total, d) => d.active ? total + d.beautyScore : total, 0);
    const newBeautyScore = structureScore + decorationScore;
    setBeautyScore(newBeautyScore);
    setKingdomLevel(Math.floor(newBeautyScore / 100) + 1);
  };

  const unlockRealm = (realmId: string) => {
    setRealms(prevRealms =>
      prevRealms.map(realm =>
        realm.id === realmId ? { ...realm, unlocked: true } : realm
      )
    );
  };

  const checkAchievements = () => {
    let newAchievements = [...achievements];
    let achievementUnlocked = false;

    if (!newAchievements.find(a => a.id === 'firstGust')?.unlocked) {
      newAchievements = unlockAchievement(newAchievements, 'firstGust');
      achievementUnlocked = true;
    }

    if (clickCount >= 500 && !newAchievements.find(a => a.id === 'breezyBeginner')?.unlocked) {
      newAchievements = unlockAchievement(newAchievements, 'breezyBeginner');
      setZdoPerClick(prev => prev * 1.1); // 10% increase
      achievementUnlocked = true;
    }

    // ... (add more achievement checks)

    if (achievementUnlocked) {
      setAchievements(newAchievements);
    }
  };

  const unlockAchievement = (achievements: Achievement[], id: string) => {
    return achievements.map(achievement => 
      achievement.id === id 
        ? { ...achievement, unlocked: true } 
        : achievement
    );
  };

  useEffect(() => {
    checkAchievements();
  }, [clickCount, totalZdo, realms]); // Add more dependencies as needed

  const renderAchievements = () => (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white mb-4">Achievements</h3>
      {['clicking', 'collection', 'exploration', 'special', 'event'].map(category => (
        <div key={category} className="mb-6">
          <h4 className="text-xl font-semibold text-white mb-2 capitalize">{category} Achievements</h4>
          {achievements
            .filter(a => a.category === category)
            .map(achievement => (
              <div key={achievement.id} className="bg-white/10 p-4 rounded-lg mb-2">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-lg font-semibold text-white">{achievement.name}</h5>
                  {achievement.unlocked ? (
                    <Trophy className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
                <p className="text-sm text-yellow-300">Reward: {achievement.reward}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'upgrades':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Upgrades</h3>
            {upgrades.map(upgrade => (
              <div key={upgrade.id} className="flex justify-between items-center bg-white/10 p-3 rounded-lg">
                <div>
                  <p className="font-semibold text-white">{upgrade.name}</p>
                  <p className="text-sm text-gray-300">{upgrade.description}</p>
                </div>
                <Button
                  onClick={() => buyUpgrade(upgrade)}
                  disabled={totalZdo < upgrade.cost}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Buy ({upgrade.cost} ZDO)
                </Button>
              </div>
            ))}
          </div>
        );
      case 'cloudKingdom':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Cloud Kingdom</h3>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-2">Kingdom Stats</h4>
              <p className="text-sm text-gray-300 mb-1">Kingdom Level: {kingdomLevel}</p>
              <p className="text-sm text-gray-300 mb-2">Beauty Score: {beautyScore}</p>
              <Progress value={(beautyScore % 100)} className="mb-1" />
              <p className="text-xs text-gray-400">Next level: {(kingdomLevel * 100) - beautyScore} points</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-2">Structures</h4>
              {structures.map(structure => (
                <div key={structure.id} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-white">{structure.name}</p>
                    <p className="text-xs text-gray-300">Count: {structure.count}</p>
                  </div>
                  <Button
                    onClick={() => buyStructure(structure)}
                    disabled={totalZdo < structure.cost}
                    className="bg-blue-500 text-white px-2 py-1 text-sm rounded"
                  >
                    Build ({structure.cost} ZDO)
                  </Button>
                </div>
              ))}
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-2">Decorations</h4>
              {decorations.map(decoration => (
                <div key={decoration.id} className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-white">{decoration.name}</p>
                  <Button
                    onClick={() => toggleDecoration(decoration)}
                    disabled={decoration.active || totalZdo < decoration.cost}
                    className={`px-2 py-1 text-sm rounded ${decoration.active ? 'bg-green-500' : 'bg-blue-500'}`}
                  >
                    {decoration.active ? 'Active' : `Activate (${decoration.cost} ZDO)`}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skyMap':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Sky Map</h3>
            <p className="text-sm text-gray-300 mb-4">Explore different realms and unlock new bonuses!</p>
            {realms.map(realm => (
              <div key={realm.id} className="bg-white/10 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-white">{realm.name}</h4>
                  {realm.unlocked ? (
                    <Unlock className="h-5 w-5 text-green-400" />
                  ) : (
                    <Lock className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <p className="text-sm text-gray-300 mb-2">{realm.description}</p>
                <p className="text-sm text-gray-300 mb-2">
                  Unlock Requirement: {realm.unlockRequirement} ZDO
                </p>
                <div className="mb-2">
                  <h5 className="text-sm font-semibold text-white mb-1">Bonuses:</h5>
                  <ul className="list-disc list-inside text-sm text-gray-300">
                    {realm.bonuses.map((bonus, index) => (
                      <li key={index}>{bonus}</li>
                    ))}
                  </ul>
                </div>
                {!realm.unlocked && totalZdo >= realm.unlockRequirement && (
                  <Button
                    onClick={() => unlockRealm(realm.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Unlock Realm
                  </Button>
                )}
              </div>
            ))}
          </div>
        );
      case 'achievements':
        return renderAchievements();
      case 'settings':
        return <div className="text-white">Settings content (to be implemented)</div>;
      default:
        return (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-lg text-center backdrop-blur-md">
                <Coins className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Total ZDO</p>
                <p className="text-2xl font-bold text-white"><RollingNumber endValue={totalZdo} /></p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center backdrop-blur-md">
                <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">ZDO per Click</p>
                <p className="text-2xl font-bold text-white">{zdoPerClick}</p>
              </div>
            </div>

            {/* Main cloud button */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                className="w-64 h-64 mx-auto mb-6 bg-blue-500 rounded-full shadow-lg flex items-center justify-center overflow-hidden relative"
              >
                <Image
                  src="/cloud-g.png"
                  alt="Cloud"
                  width={200}
                  height={200}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
              </motion.button>
              <AnimatePresence>
                {flyingPoints.map((point) => (
                  <motion.div
                    key={point.id}
                    initial={{ opacity: 1, scale: 0.5, x: point.x, y: point.y }}
                    animate={{ 
                      opacity: 0, 
                      scale: 1.5, 
                      y: point.y - 100,
                      transition: { duration: 1, ease: "easeOut" }
                    }}
                    exit={{ opacity: 0 }}
                    className="absolute text-2xl font-bold text-yellow-300 pointer-events-none"
                    style={{ 
                      textShadow: '0 0 10px rgba(255, 255, 0, 0.7), 0 0 20px rgba(255, 255, 0, 0.5), 0 0 30px rgba(255, 255, 0, 0.3)'
                    }}
                  >
                    +{point.value}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer stats */}
            <div className="mt-auto grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-sm text-gray-300">Level</p>
                <p className="text-lg font-bold text-white">{level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">XP</p>
                <p className="text-lg font-bold text-white">{xp} / {level * 100}</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">ZDO/s</p>
                <p className="text-lg font-bold text-white">{zdoPerSecond}</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div ref={gameAreaRef} className="flex flex-col h-full p-6 relative cursor-none overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-70"></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="animated-background absolute inset-0 pointer-events-none"></div>
      
      <CustomCursor containerRef={gameAreaRef} />
      {showConfetti && <ConfettiEffect containerRef={gameAreaRef} />}

      {/* Content wrapper with z-index to appear above the background */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-white mb-2 text-shadow-lg">ZDO Clicker Game</h2>
          <p className="text-xl text-yellow-300 text-shadow-lg">Tap the cloud to earn ZDO!</p>
        </div>

        {/* Main content area */}
        <div className="flex-grow overflow-y-auto mb-4">
          {renderContent()}
        </div>

        {/* Bottom navigation bar */}
        <div className="mt-auto bg-black/70 rounded-lg p-2 backdrop-blur-md">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('main')}
              className={`flex flex-col items-center ${activeTab === 'main' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white hover:bg-blue-500/50'}`}
            >
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('upgrades')}
              className={`flex flex-col items-center ${activeTab === 'upgrades' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white hover:bg-blue-500/50'}`}
            >
              <ArrowUp className="h-5 w-5 mb-1" />
              <span className="text-xs">Upgrades</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('cloudKingdom')}
              className={`flex flex-col items-center ${activeTab === 'cloudKingdom' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white hover:bg-blue-500/50'}`}
            >
              <Cloud className="h-5 w-5 mb-1" />
              <span className="text-xs">Kingdom</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('skyMap')}
              className={`flex flex-col items-center ${activeTab === 'skyMap' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white hover:bg-blue-500/50'}`}
            >
              <Map className="h-5 w-5 mb-1" />
              <span className="text-xs">Sky Map</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('achievements')}
              className={`flex flex-col items-center ${activeTab === 'achievements' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white hover:bg-blue-500/50'}`}
            >
              <Trophy className="h-5 w-5 mb-1" />
              <span className="text-xs">Achievements</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white hover:bg-blue-500/50'}`}
            >
              <Settings className="h-5 w-5 mb-1" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .cursor-none,
        .cursor-none * {
          cursor: none !important;
        }

        .text-shadow-lg {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3);
        }

        .animated-background {
          background: linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.1),
            rgba(173, 216, 230, 0.1),
            rgba(135, 206, 235, 0.1),
            rgba(255, 255, 255, 0.1)
          );
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        .animated-background::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          width: 200%;
          height: 200%;
          background: url('/cloud-pattern.png') repeat;
          animation: cloud-move 60s linear infinite;
          opacity: 0.05;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes cloud-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50%, -50%); }
        }
      `}</style>
    </div>
  );
}