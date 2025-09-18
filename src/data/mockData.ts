import type { Fund, StrategyBundle, ChartData, UserPosition, ProtocolStats, Transaction } from '../types';

// Datos mockeados para Funds
export const mockFunds: Fund[] = [
  {
    id: 'fund-1',
    name: 'FlowFi Yield Fund',
    description: 'Fondo de yield farming automatizado con estrategias diversificadas',
    tvl: 2500000,
    apy: 12.5,
    performance: 8.3,
    fees: {
      rewardFee: 8,
      appreciationFee: 2.5,
      premiumAnnual: 150
    },
    strategies: ['Uniswap V3', 'Aave Lending', 'Compound'],
    createdAt: new Date('2024-01-15'),
    manager: 'FlowFi Team',
    status: 'active'
  },
  {
    id: 'fund-2',
    name: 'Delta Neutral Fund',
    description: 'Estrategia delta neutral para minimizar riesgo de mercado',
    tvl: 1800000,
    apy: 9.8,
    performance: 6.2,
    fees: {
      rewardFee: 8,
      appreciationFee: 2.5
    },
    strategies: ['Delta Neutral', 'Perpetual Futures'],
    createdAt: new Date('2024-02-01'),
    manager: 'FlowFi Team',
    status: 'active'
  },
  {
    id: 'fund-3',
    name: 'Liquidity Mining Fund',
    description: 'Optimización de liquidez en múltiples DEXs',
    tvl: 3200000,
    apy: 15.2,
    performance: 11.7,
    fees: {
      rewardFee: 8,
      appreciationFee: 2.5,
      premiumAnnual: 200
    },
    strategies: ['Uniswap V3', 'SushiSwap', 'Balancer'],
    createdAt: new Date('2024-01-20'),
    manager: 'FlowFi Team',
    status: 'active'
  },
  {
    id: 'fund-4',
    name: 'Smart Yield Fund',
    description: 'Fondo inteligente con estrategias de alto rendimiento',
    tvl: 23540000,
    apy: 15.0,
    performance: 12.8,
    fees: {
      rewardFee: 10,
      appreciationFee: 3.0,
      premiumAnnual: 300
    },
    strategies: ['Curve Finance', 'Yearn Finance', 'Convex'],
    createdAt: new Date('2024-01-10'),
    manager: 'Smart Capital',
    status: 'active'
  },
  {
    id: 'fund-5',
    name: 'BTC Automated Strategy',
    description: 'Estrategia automatizada enfocada en Bitcoin',
    tvl: 10980000,
    apy: 20.0,
    performance: 18.5,
    fees: {
      rewardFee: 12,
      appreciationFee: 2.0
    },
    strategies: ['Bitcoin Staking', 'BTC Lending', 'Futures Arbitrage'],
    createdAt: new Date('2024-01-05'),
    manager: 'BTC Masters',
    status: 'active'
  },
  {
    id: 'fund-6',
    name: 'USD Stable Growth',
    description: 'Fondo estable con crecimiento consistente en USD',
    tvl: 38450000,
    apy: 12.0,
    performance: 9.2,
    fees: {
      rewardFee: 6,
      appreciationFee: 1.5,
      premiumAnnual: 100
    },
    strategies: ['USDC Lending', 'DAI Farming', 'Stablecoin Arbitrage'],
    createdAt: new Date('2024-01-01'),
    manager: 'Stable Capital',
    status: 'active'
  },
  {
    id: 'fund-7',
    name: 'DeFi Innovation Fund',
    description: 'Fondo enfocado en protocolos DeFi innovadores',
    tvl: 8500000,
    apy: 18.5,
    performance: 15.3,
    fees: {
      rewardFee: 15,
      appreciationFee: 4.0,
      premiumAnnual: 500
    },
    strategies: ['Uniswap V4', 'Aave V3', 'Compound V3'],
    createdAt: new Date('2024-02-15'),
    manager: 'DeFi Pioneers',
    status: 'active'
  },
  {
    id: 'fund-8',
    name: 'Conservative Income Fund',
    description: 'Fondo conservador para ingresos estables',
    tvl: 12000000,
    apy: 8.5,
    performance: 6.8,
    fees: {
      rewardFee: 5,
      appreciationFee: 1.0
    },
    strategies: ['USDC Staking', 'DAI Savings', 'Treasury Bills'],
    createdAt: new Date('2024-01-25'),
    manager: 'Conservative Capital',
    status: 'active'
  },
  {
    id: 'fund-9',
    name: 'High Risk High Reward',
    description: 'Fondo de alto riesgo con potencial de alto rendimiento',
    tvl: 5500000,
    apy: 25.0,
    performance: 22.1,
    fees: {
      rewardFee: 20,
      appreciationFee: 5.0,
      premiumAnnual: 750
    },
    strategies: ['Leverage Trading', 'Options Strategies', 'Futures Arbitrage'],
    createdAt: new Date('2024-02-10'),
    manager: 'Risk Masters',
    status: 'active'
  },
  {
    id: 'fund-10',
    name: 'Multi-Chain Fund',
    description: 'Fondo diversificado en múltiples blockchains',
    tvl: 16500000,
    apy: 16.8,
    performance: 13.5,
    fees: {
      rewardFee: 12,
      appreciationFee: 3.5,
      premiumAnnual: 400
    },
    strategies: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'],
    createdAt: new Date('2024-01-30'),
    manager: 'Multi-Chain Experts',
    status: 'active'
  },
  {
    id: 'fund-11',
    name: 'NFT Yield Fund',
    description: 'Fondo especializado en estrategias NFT',
    tvl: 3200000,
    apy: 14.2,
    performance: 11.8,
    fees: {
      rewardFee: 15,
      appreciationFee: 3.0,
      premiumAnnual: 250
    },
    strategies: ['NFT Lending', 'NFT Staking', 'Floor Price Arbitrage'],
    createdAt: new Date('2024-02-20'),
    manager: 'NFT Capital',
    status: 'paused'
  },
  {
    id: 'fund-12',
    name: 'Liquid Staking Fund',
    description: 'Fondo especializado en liquid staking',
    tvl: 28000000,
    apy: 11.5,
    performance: 9.7,
    fees: {
      rewardFee: 8,
      appreciationFee: 2.0,
      premiumAnnual: 200
    },
    strategies: ['Ethereum Staking', 'Lido', 'Rocket Pool'],
    createdAt: new Date('2024-01-12'),
    manager: 'Staking Experts',
    status: 'active'
  }
];

// Datos mockeados para Strategy Bundles
export const mockStrategyBundles: StrategyBundle[] = [
  // Delta Neutral Strategies
  {
    id: 'bundle-1',
    name: 'Long ETH, Short ARB',
    description: 'Ideal strategy for Bitcoin seasons',
    type: 'delta-neutral',
    entryFee: 0.5,
    profitFee: 10,
    estimatedReturn: 8.5,
    riskLevel: 'medium',
    tokens: ['ETH', 'ARB'],
    createdAt: new Date('2024-01-10'),
    usageCount: 1247
  },
  {
    id: 'bundle-2',
    name: 'Long BTC, Short ETH',
    description: 'Perfect for Bitcoin dominance cycles',
    type: 'delta-neutral',
    entryFee: 0.6,
    profitFee: 12,
    estimatedReturn: 9.2,
    riskLevel: 'medium',
    tokens: ['BTC', 'ETH'],
    createdAt: new Date('2024-01-15'),
    usageCount: 892
  },
  {
    id: 'bundle-3',
    name: 'Long SOL, Short AVAX',
    description: 'Ideal for Solana ecosystem growth',
    type: 'delta-neutral',
    entryFee: 0.4,
    profitFee: 8,
    estimatedReturn: 7.8,
    riskLevel: 'medium',
    tokens: ['SOL', 'AVAX'],
    createdAt: new Date('2024-01-12'),
    usageCount: 634
  },

  // Uniswap LP Strategies
  {
    id: 'bundle-4',
    name: 'LP BTC-USDC Bearish',
    description: 'Ideal for buying BTC in bear markets while earning fees',
    type: 'uniswap-v3',
    entryFee: 0.3,
    profitFee: 8,
    estimatedReturn: 6.8,
    riskLevel: 'low',
    tokens: ['BTC', 'USDC'],
    createdAt: new Date('2024-01-08'),
    usageCount: 2156
  },
  {
    id: 'bundle-5',
    name: 'LP ETH-USDT Bullish',
    description: 'Perfect for ETH bull runs with fee generation',
    type: 'uniswap-v3',
    entryFee: 0.4,
    profitFee: 10,
    estimatedReturn: 8.2,
    riskLevel: 'low',
    tokens: ['ETH', 'USDT'],
    createdAt: new Date('2024-01-20'),
    usageCount: 1843
  },
  {
    id: 'bundle-6',
    name: 'LP SOL-USDC Range',
    description: 'Optimized for SOL volatility with concentrated liquidity',
    type: 'uniswap-v3',
    entryFee: 0.5,
    profitFee: 12,
    estimatedReturn: 9.5,
    riskLevel: 'medium',
    tokens: ['SOL', 'USDC'],
    createdAt: new Date('2024-01-18'),
    usageCount: 967
  },

  // Lending Strategies
  {
    id: 'bundle-7',
    name: 'Aave ETH Leverage 3x',
    description: 'Maximize ETH exposure with controlled risk',
    type: 'leverage-aave',
    entryFee: 1.0,
    profitFee: 15,
    estimatedReturn: 12.3,
    riskLevel: 'high',
    tokens: ['ETH', 'USDC'],
    createdAt: new Date('2024-01-05'),
    usageCount: 1456
  },
  {
    id: 'bundle-8',
    name: 'Compound USDC Yield',
    description: 'Stable yield farming with USDC lending',
    type: 'leverage-aave',
    entryFee: 0.2,
    profitFee: 5,
    estimatedReturn: 4.8,
    riskLevel: 'low',
    tokens: ['USDC'],
    createdAt: new Date('2024-01-22'),
    usageCount: 3245
  },
  {
    id: 'bundle-9',
    name: 'Aave Multi-Asset Lending',
    description: 'Diversified lending across multiple assets',
    type: 'leverage-aave',
    entryFee: 0.8,
    profitFee: 12,
    estimatedReturn: 7.5,
    riskLevel: 'medium',
    tokens: ['ETH', 'USDC', 'DAI'],
    createdAt: new Date('2024-01-14'),
    usageCount: 1123
  },

  // Multi-Token Portfolio Strategies
  {
    id: 'bundle-10',
    name: 'DeFi Blue Chips Portfolio',
    description: 'Hold top DeFi tokens with automated rebalancing',
    type: 'multi-swap',
    entryFee: 0.8,
    profitFee: 12,
    estimatedReturn: 5.2,
    riskLevel: 'medium',
    tokens: ['ETH', 'USDC', 'DAI', 'USDT', 'UNI', 'AAVE'],
    createdAt: new Date('2024-01-08'),
    usageCount: 1876
  },
  {
    id: 'bundle-11',
    name: 'Layer 1 Diversification',
    description: 'Spread risk across multiple Layer 1 blockchains',
    type: 'multi-swap',
    entryFee: 1.2,
    profitFee: 15,
    estimatedReturn: 8.7,
    riskLevel: 'medium',
    tokens: ['ETH', 'SOL', 'AVAX', 'MATIC', 'DOT'],
    createdAt: new Date('2024-01-16'),
    usageCount: 743
  },
  {
    id: 'bundle-12',
    name: 'Stablecoin Yield Farm',
    description: 'Maximize yield across stablecoin protocols',
    type: 'multi-swap',
    entryFee: 0.5,
    profitFee: 8,
    estimatedReturn: 6.3,
    riskLevel: 'low',
    tokens: ['USDC', 'USDT', 'DAI', 'FRAX'],
    createdAt: new Date('2024-01-19'),
    usageCount: 2567
  },

  // Simple DeFi Strategies
  {
    id: 'bundle-13',
    name: 'ETH Staking',
    description: 'Simple ETH staking for consistent rewards',
    type: 'uniswap-v4',
    entryFee: 0.1,
    profitFee: 3,
    estimatedReturn: 4.2,
    riskLevel: 'low',
    tokens: ['ETH'],
    createdAt: new Date('2024-01-25'),
    usageCount: 4567
  },
  {
    id: 'bundle-14',
    name: 'USDC Savings',
    description: 'Low-risk USDC earning with compound interest',
    type: 'uniswap-v4',
    entryFee: 0.05,
    profitFee: 2,
    estimatedReturn: 3.8,
    riskLevel: 'low',
    tokens: ['USDC'],
    createdAt: new Date('2024-01-28'),
    usageCount: 6789
  },
  {
    id: 'bundle-15',
    name: 'BTC Hodl Strategy',
    description: 'Long-term Bitcoin holding with yield optimization',
    type: 'uniswap-v4',
    entryFee: 0.2,
    profitFee: 5,
    estimatedReturn: 5.5,
    riskLevel: 'low',
    tokens: ['BTC'],
    createdAt: new Date('2024-01-30'),
    usageCount: 2345
  }
];

// Datos mockeados para Chart
export const mockChartData: ChartData[] = [
  { timestamp: 1704067200000, price: 2500, volume: 1200000, liquidity: 5000000 },
  { timestamp: 1704153600000, price: 2550, volume: 1350000, liquidity: 5200000 },
  { timestamp: 1704240000000, price: 2480, volume: 980000, liquidity: 4800000 },
  { timestamp: 1704326400000, price: 2620, volume: 1600000, liquidity: 5500000 },
  { timestamp: 1704412800000, price: 2580, volume: 1420000, liquidity: 5300000 },
  { timestamp: 1704499200000, price: 2650, volume: 1750000, liquidity: 5800000 },
  { timestamp: 1704585600000, price: 2700, volume: 1900000, liquidity: 6000000 },
  { timestamp: 1704672000000, price: 2680, volume: 1650000, liquidity: 5900000 },
  { timestamp: 1704758400000, price: 2720, volume: 2000000, liquidity: 6200000 },
  { timestamp: 1704844800000, price: 2750, volume: 2200000, liquidity: 6400000 }
];

// Posiciones del usuario
export const mockUserPositions: UserPosition[] = [
  {
    id: 'pos-1',
    type: 'fund',
    asset: 'FlowFi Yield Fund',
    amount: 10000,
    value: 10830,
    pnl: 830,
    pnlPercentage: 8.3
  },
  {
    id: 'pos-2',
    type: 'strategy',
    asset: 'Delta Neutral ETH/USDC',
    amount: 5000,
    value: 5425,
    pnl: 425,
    pnlPercentage: 8.5
  },
  {
    id: 'pos-3',
    type: 'liquidity',
    asset: 'ETH/USDC LP',
    amount: 2500,
    value: 2680,
    pnl: 180,
    pnlPercentage: 7.2
  }
];

// Estadísticas del protocolo
export const mockProtocolStats: ProtocolStats = {
  totalTvl: 7500000,
  totalUsers: 2847,
  totalFees: 125000,
  activeFunds: 3,
  activeStrategies: 4
};

// Transacciones recientes
export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    type: 'deposit',
    amount: 5000,
    token: 'USDC',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'completed',
    hash: '0x1234...5678'
  },
  {
    id: 'tx-2',
    type: 'strategy_execute',
    amount: 2500,
    token: 'ETH',
    timestamp: new Date('2024-01-15T09:15:00'),
    status: 'completed',
    hash: '0xabcd...efgh'
  },
  {
    id: 'tx-3',
    type: 'withdraw',
    amount: 1000,
    token: 'USDC',
    timestamp: new Date('2024-01-14T16:45:00'),
    status: 'completed',
    hash: '0x9876...5432'
  }
];
