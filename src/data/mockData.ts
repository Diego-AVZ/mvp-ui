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
  }
];

// Datos mockeados para Strategy Bundles
export const mockStrategyBundles: StrategyBundle[] = [
  {
    id: 'bundle-1',
    name: 'Delta Neutral ETH/USDC',
    description: 'Long ETH + Short ETH en perpétuos para exposición delta neutral',
    type: 'delta-neutral',
    entryFee: 0.5,
    profitFee: 10,
    estimatedReturn: 8.5,
    riskLevel: 'medium',
    tokens: ['ETH', 'USDC'],
    createdAt: new Date('2024-01-10'),
    usageCount: 1247
  },
  {
    id: 'bundle-2',
    name: 'Aave Leverage Long',
    description: 'Apalancamiento 3x en Aave para maximizar exposición',
    type: 'leverage-aave',
    entryFee: 1.0,
    profitFee: 15,
    estimatedReturn: 12.3,
    riskLevel: 'high',
    tokens: ['ETH', 'USDC', 'USDT'],
    createdAt: new Date('2024-01-05'),
    usageCount: 892
  },
  {
    id: 'bundle-3',
    name: 'Uniswap V3 Range',
    description: 'Posición de liquidez optimizada en rango específico',
    type: 'uniswap-v3',
    entryFee: 0.3,
    profitFee: 8,
    estimatedReturn: 6.8,
    riskLevel: 'low',
    tokens: ['ETH', 'USDC'],
    createdAt: new Date('2024-01-12'),
    usageCount: 2156
  },
  {
    id: 'bundle-4',
    name: 'Multi-Swap Arbitrage',
    description: 'Arbitraje automático entre múltiples DEXs',
    type: 'multi-swap',
    entryFee: 0.8,
    profitFee: 12,
    estimatedReturn: 5.2,
    riskLevel: 'medium',
    tokens: ['ETH', 'USDC', 'DAI', 'USDT'],
    createdAt: new Date('2024-01-08'),
    usageCount: 634
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
