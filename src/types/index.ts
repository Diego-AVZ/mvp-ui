// Tipos principales para FlowFi MVP

export interface Fund {
  id: string;
  name: string;
  description: string;
  tvl: number;
  apy: number;
  performance: number;
  fees: {
    rewardFee: number;
    appreciationFee: number;
    premiumAnnual?: number;
  };
  strategies: string[];
  createdAt: Date;
  manager: string;
  status: 'active' | 'paused' | 'closed';
}

export interface StrategyBundle {
  id: string;
  name: string;
  description: string;
  type: 'delta-neutral' | 'leverage-aave' | 'uniswap-v3' | 'uniswap-v4' | 'multi-swap';
  entryFee: number;
  profitFee: number;
  estimatedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  tokens: string[];
  createdAt: Date;
  usageCount: number;
}

export interface ChartData {
  timestamp: number;
  price: number;
  volume: number;
  liquidity?: number;
}

export interface UserPosition {
  id: string;
  type: 'fund' | 'strategy' | 'liquidity';
  asset: string;
  amount: number;
  value: number;
  pnl: number;
  pnlPercentage: number;
}

export interface ProtocolStats {
  totalTvl: number;
  totalUsers: number;
  totalFees: number;
  activeFunds: number;
  activeStrategies: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'swap' | 'strategy_execute';
  amount: number;
  token: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  hash?: string;
}
