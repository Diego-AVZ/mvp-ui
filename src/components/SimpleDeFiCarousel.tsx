import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown, TrendingUp } from 'lucide-react';

interface ProtocolData {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: 'swap' | 'lending' | 'staking' | 'yield';
  color: string;
}

const SimpleDeFiCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const protocols: ProtocolData[] = [
    {
      id: 'uniswap',
      name: 'Uniswap',
      icon: '💧',
      description: 'Simple liquidity provision',
      type: 'swap',
      color: 'from-pink-500 to-purple-600'
    },
    {
      id: 'aave',
      name: 'Aave',
      icon: '🏦',
      description: 'Easy lending & borrowing',
      type: 'lending',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'compound',
      name: 'Compound',
      icon: '⚡',
      description: 'Simple yield farming',
      type: 'yield',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'curve',
      name: 'Curve',
      icon: '🌊',
      description: 'Stablecoin swapping',
      type: 'swap',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'yearn',
      name: 'Yearn',
      icon: '🎯',
      description: 'Automated yield strategies',
      type: 'yield',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const nextProtocol = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % protocols.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevProtocol = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + protocols.length) % protocols.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToProtocol = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  const getProtocolComponent = (protocol: ProtocolData) => {
    switch (protocol.id) {
      case 'uniswap':
        return <UniswapSimpleInterface />;
      case 'aave':
        return <AaveSimpleInterface />;
      case 'compound':
        return <CompoundSimpleInterface />;
      case 'curve':
        return <CurveSimpleInterface />;
      case 'yearn':
        return <YearnSimpleInterface />;
      default:
        return <DefaultSimpleInterface protocol={protocol} />;
    }
  };

  return (
    <div className="relative h-[800px] overflow-hidden rounded-2xl">
      {/* Background Layers */}
      <div className="absolute inset-0">
        {protocols.map((protocol, index) => {
          const distance = Math.abs(index - currentIndex);
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % protocols.length;
          const isPrev = index === (currentIndex - 1 + protocols.length) % protocols.length;
          
          let transform = '';
          let opacity = 0;
          let scale = 0.8;
          let zIndex = 0;

          if (isActive) {
            transform = 'translateY(0)';
            opacity = 1;
            scale = 1;
            zIndex = 10;
          } else if (isNext) {
            transform = 'translateY(120px)';
            opacity = 0.4;
            scale = 0.85;
            zIndex = 5;
          } else if (isPrev) {
            transform = 'translateY(-120px)';
            opacity = 0.4;
            scale = 0.85;
            zIndex = 5;
          } else {
            transform = distance > 1 ? 'translateY(250px)' : 'translateY(-250px)';
            opacity = 0.05;
            scale = 0.6;
            zIndex = 1;
          }

          return (
            <div
              key={protocol.id}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                isTransitioning ? 'pointer-events-none' : ''
              }`}
              style={{
                transform,
                opacity,
                scale,
                zIndex
              }}
            >
              <div className={`h-full bg-gradient-to-br ${protocol.color} rounded-2xl p-8 shadow-2xl`}>
                <div className="h-full flex flex-col">
                  {/* Protocol Header */}
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3 drop-shadow-lg">{protocol.icon}</div>
                    <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{protocol.name}</h2>
                    <p className="text-white/90 text-sm font-medium">{protocol.description}</p>
                  </div>

                  {/* Protocol Interface */}
                  <div className="flex-1 flex items-center justify-center">
                    {getProtocolComponent(protocol)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-20">
        <button
          onClick={prevProtocol}
          disabled={isTransitioning}
          className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-200 disabled:opacity-50 shadow-lg border border-white/20"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
        <button
          onClick={nextProtocol}
          disabled={isTransitioning}
          className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-200 disabled:opacity-50 shadow-lg border border-white/20"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>

      {/* Protocol Indicators */}
      <div className="absolute right-20 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-3">
          {protocols.map((protocol, index) => (
            <button
              key={protocol.id}
              onClick={() => goToProtocol(index)}
              disabled={isTransitioning}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                index === currentIndex
                  ? 'bg-white scale-125 border-white shadow-lg'
                  : 'bg-white/30 border-white/50 hover:bg-white/50 hover:border-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Protocol Labels */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-3">
          {protocols.map((protocol, index) => (
            <div
              key={protocol.id}
              className={`text-sm font-medium transition-all duration-300 ${
                index === currentIndex
                  ? 'text-white drop-shadow-md'
                  : 'text-white/60'
              }`}
            >
              {protocol.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Uniswap Simple Interface
const UniswapSimpleInterface: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState('ETH-USDC');
  const [amount, setAmount] = useState('');
  const [range, setRange] = useState('medium');
  const [showPoolSelector, setShowPoolSelector] = useState(false);
  const [showRangeSelector, setShowRangeSelector] = useState(false);

  const pools = [
    { id: 'ETH-USDC', name: 'ETH / USDC', apy: '12.5%' },
    { id: 'BTC-USDC', name: 'BTC / USDC', apy: '8.2%' },
    { id: 'SOL-USDC', name: 'SOL / USDC', apy: '15.7%' }
  ];

  const ranges = [
    { id: 'tight', name: 'Tight', range: '±2%' },
    { id: 'medium', name: 'Medium', range: '±5%' },
    { id: 'wide', name: 'Wide', range: '±10%' }
  ];

  const selectedPoolData = pools.find(p => p.id === selectedPool);
  const selectedRangeData = ranges.find(r => r.id === range);

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Add Liquidity</h3>
      
      {/* Pool Selection */}
      <div className="mb-4">
        <label className="block text-white/90 text-sm font-medium mb-2">Pool</label>
        <button
          onClick={() => setShowPoolSelector(!showPoolSelector)}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors flex justify-between items-center"
        >
          <span className="font-medium">{selectedPoolData?.name}</span>
          <span className="text-green-300 text-sm">{selectedPoolData?.apy}</span>
        </button>
        
        {showPoolSelector && (
          <div className="mt-2 space-y-1">
            {pools.map(pool => (
              <button
                key={pool.id}
                onClick={() => {
                  setSelectedPool(pool.id);
                  setShowPoolSelector(false);
                }}
                className="w-full p-2 bg-white/10 border border-white/20 rounded text-white hover:bg-white/20 transition-colors flex justify-between items-center text-sm"
              >
                <span>{pool.name}</span>
                <span className="text-green-300">{pool.apy}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-white/90 text-sm font-medium mb-2">Amount (USDC)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1000"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50"
        />
      </div>

      {/* Range Selection */}
      <div className="mb-6">
        <label className="block text-white/90 text-sm font-medium mb-2">Range</label>
        <button
          onClick={() => setShowRangeSelector(!showRangeSelector)}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors flex justify-between items-center"
        >
          <span className="font-medium">{selectedRangeData?.name}</span>
          <span className="text-white/70 text-sm">{selectedRangeData?.range}</span>
        </button>
        
        {showRangeSelector && (
          <div className="mt-2 space-y-1">
            {ranges.map(rangeOption => (
              <button
                key={rangeOption.id}
                onClick={() => {
                  setRange(rangeOption.id);
                  setShowRangeSelector(false);
                }}
                className="w-full p-2 bg-white/10 border border-white/20 rounded text-white hover:bg-white/20 transition-colors flex justify-between items-center text-sm"
              >
                <span>{rangeOption.name}</span>
                <span className="text-white/70">{rangeOption.range}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Action Button */}
      <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center justify-center space-x-2">
        <ArrowUpDown className="h-5 w-5" />
        <span>Add Liquidity</span>
      </button>
    </div>
  );
};

// Aave Simple Interface
const AaveSimpleInterface: React.FC = () => {
  const [supplyToken, setSupplyToken] = useState('USDC');
  const [borrowToken, setBorrowToken] = useState('ETH');
  const [supplyAmount, setSupplyAmount] = useState('');
  const [borrowPercentage, setBorrowPercentage] = useState(50);
  const [showSupplySelector, setShowSupplySelector] = useState(false);
  const [showBorrowSelector, setShowBorrowSelector] = useState(false);

  const tokens = [
    { id: 'USDC', name: 'USDC', apy: '3.2%' },
    { id: 'ETH', name: 'ETH', apy: '2.8%' },
    { id: 'BTC', name: 'BTC', apy: '1.5%' }
  ];

  const selectedSupplyToken = tokens.find(t => t.id === supplyToken);
  const selectedBorrowToken = tokens.find(t => t.id === borrowToken);

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Lend & Borrow</h3>
      
      {/* Supply Token */}
      <div className="mb-4">
        <label className="block text-white/90 text-sm font-medium mb-2">Supply</label>
        <button
          onClick={() => setShowSupplySelector(!showSupplySelector)}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors flex justify-between items-center"
        >
          <span className="font-medium">{selectedSupplyToken?.name}</span>
          <span className="text-green-300 text-sm">{selectedSupplyToken?.apy}</span>
        </button>
        
        {showSupplySelector && (
          <div className="mt-2 space-y-1">
            {tokens.map(token => (
              <button
                key={token.id}
                onClick={() => {
                  setSupplyToken(token.id);
                  setShowSupplySelector(false);
                }}
                className="w-full p-2 bg-white/10 border border-white/20 rounded text-white hover:bg-white/20 transition-colors flex justify-between items-center text-sm"
              >
                <span>{token.name}</span>
                <span className="text-green-300">{token.apy}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Supply Amount */}
      <div className="mb-4">
        <label className="block text-white/90 text-sm font-medium mb-2">Amount</label>
        <input
          type="number"
          value={supplyAmount}
          onChange={(e) => setSupplyAmount(e.target.value)}
          placeholder="1000"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50"
        />
      </div>

      {/* Borrow Token */}
      <div className="mb-4">
        <label className="block text-white/90 text-sm font-medium mb-2">Borrow</label>
        <button
          onClick={() => setShowBorrowSelector(!showBorrowSelector)}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors flex justify-between items-center"
        >
          <span className="font-medium">{selectedBorrowToken?.name}</span>
          <span className="text-red-300 text-sm">{selectedBorrowToken?.apy}</span>
        </button>
        
        {showBorrowSelector && (
          <div className="mt-2 space-y-1">
            {tokens.filter(t => t.id !== supplyToken).map(token => (
              <button
                key={token.id}
                onClick={() => {
                  setBorrowToken(token.id);
                  setShowBorrowSelector(false);
                }}
                className="w-full p-2 bg-white/10 border border-white/20 rounded text-white hover:bg-white/20 transition-colors flex justify-between items-center text-sm"
              >
                <span>{token.name}</span>
                <span className="text-red-300">{token.apy}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Borrow Percentage */}
      <div className="mb-6">
        <label className="block text-white/90 text-sm font-medium mb-2">Borrow %</label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="80"
            value={borrowPercentage}
            onChange={(e) => setBorrowPercentage(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-white/90">
            <span>0%</span>
            <span className="font-semibold">{borrowPercentage}%</span>
            <span>80%</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center justify-center space-x-2">
        <TrendingUp className="h-5 w-5" />
        <span>Execute Strategy</span>
      </button>
    </div>
  );
};

// Other Protocol Interfaces (simplified)
const CompoundSimpleInterface: React.FC = () => (
  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl text-center">
    <h3 className="text-xl font-bold text-white mb-4">Compound Yield</h3>
    <p className="text-white/90 text-sm mb-6">Simple yield farming with automatic compounding</p>
    <button className="bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-white/90 transition-colors">
      Start Earning
    </button>
  </div>
);

const CurveSimpleInterface: React.FC = () => (
  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl text-center">
    <h3 className="text-xl font-bold text-white mb-4">Curve Swaps</h3>
    <p className="text-white/90 text-sm mb-6">Low-slippage stablecoin exchanges</p>
    <button className="bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-white/90 transition-colors">
      Swap Now
    </button>
  </div>
);

const YearnSimpleInterface: React.FC = () => (
  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl text-center">
    <h3 className="text-xl font-bold text-white mb-4">Yearn Vaults</h3>
    <p className="text-white/90 text-sm mb-6">Automated yield optimization strategies</p>
    <button className="bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-white/90 transition-colors">
      Enter Vault
    </button>
  </div>
);

const DefaultSimpleInterface: React.FC<{ protocol: ProtocolData }> = ({ protocol }) => (
  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl text-center">
    <h3 className="text-xl font-bold text-white mb-4">{protocol.name}</h3>
    <p className="text-white/90 text-sm mb-6">{protocol.description}</p>
    <button className="bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-white/90 transition-colors">
      Get Started
    </button>
  </div>
);

export default SimpleDeFiCarousel;
