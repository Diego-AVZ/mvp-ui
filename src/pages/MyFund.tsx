import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Settings, Plus, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Position {
  id: string;
  protocol: string;
  tokens: string[];
  value: number;
  pnl: number;
  status: 'active' | 'expired' | 'out_of_range';
  fees?: number;
}

const MyFund: React.FC = () => {
  const [selectedToken0, setSelectedToken0] = useState('ETH');
  const [selectedToken1, setSelectedToken1] = useState('UNI');
  const [amount0, setAmount0] = useState('0.00');
  const [amount1, setAmount1] = useState('8.15');

  const stats = {
    tvl: 1245000,
    investors: 54,
    apr: 27.5,
    claimableFees: 834.22
  };

  const positions: Position[] = [
    {
      id: 'pos-1',
      protocol: 'Uniswap V3',
      tokens: ['ETH', 'USDC'],
      value: 2400,
      pnl: -200,
      status: 'active',
      fees: 45.20
    },
    {
      id: 'pos-2',
      protocol: 'Aave',
      tokens: ['ETH', 'BTC'],
      value: 32.12,
      pnl: 5.8,
      status: 'expired'
    },
    {
      id: 'pos-3',
      protocol: 'Compound',
      tokens: ['AAVE'],
      value: 23.99,
      pnl: -2.1,
      status: 'out_of_range'
    }
  ];

  const protocols = [
    { name: 'Uniswap V3', icon: '🦄', color: 'bg-green-500' },
    { name: 'Aave', icon: '🔵', color: 'bg-blue-500' },
    { name: 'Compound', icon: '🟡', color: 'bg-yellow-500' },
    { name: 'Curve', icon: '🟣', color: 'bg-purple-500' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'expired': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'out_of_range': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'expired': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'out_of_range': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Fund Manager Dashboard</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">Manage your DeFi fund positions and liquidity</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <button className="px-4 py-2 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">TVL</p>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">
                ${(stats.tvl / 1000).toFixed(0)}K
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Investors/Clients</p>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">{stats.investors}</p>
            </div>
            <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Annualized APR</p>
              <p className="text-2xl font-bold text-success-600 dark:text-success-400">{stats.apr}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-success-600 dark:text-success-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Claimable Fees</p>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">${stats.claimableFees}</p>
            </div>
            <Settings className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
      </div>

      {/* Liquidity Management */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-6">Liquidity Management</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Token Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Token 0</label>
              <div className="flex space-x-2">
                <select 
                  value={selectedToken0}
                  onChange={(e) => setSelectedToken0(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="ETH">ETH</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                  <option value="UNI">UNI</option>
                  <option value="AAVE">AAVE</option>
                </select>
                <input
                  type="number"
                  value={amount0}
                  onChange={(e) => setAmount0(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Token 1</label>
              <div className="flex space-x-2">
                <select 
                  value={selectedToken1}
                  onChange={(e) => setSelectedToken1(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="ETH">ETH</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                  <option value="UNI">UNI</option>
                  <option value="AAVE">AAVE</option>
                </select>
                <input
                  type="number"
                  value={amount1}
                  onChange={(e) => setAmount1(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Liquidity</span>
            </button>
          </div>

          {/* Chart Placeholder */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-light dark:text-text-dark">Price Range Chart</h3>
            <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-2"></div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Chart - Stop</p>
                <p className="text-lg font-semibold text-text-light dark:text-text-dark">Current Price: 3.25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Selection */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-6">Available Protocols</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {protocols.map((protocol) => (
            <button
              key={protocol.name}
              className="p-4 border border-gray-200 dark:border-dark-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{protocol.icon}</div>
                <p className="font-medium text-text-light dark:text-text-dark">{protocol.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Positions */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-6">Active Positions</h2>
        <div className="space-y-4">
          {positions.map((position) => (
            <div key={position.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {position.tokens.map((token, index) => (
                    <div key={index} className="w-8 h-8 bg-gray-200 dark:bg-dark-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {token.charAt(0)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-medium text-text-light dark:text-text-dark">{position.protocol}</p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    {position.tokens.join(' / ')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(position.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(position.status)}`}>
                    {position.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="font-semibold text-text-light dark:text-text-dark">${position.value}</p>
                  <p className={`text-sm ${position.pnl >= 0 ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
                    {position.pnl >= 0 ? '+' : ''}${position.pnl}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  {position.fees && (
                    <button className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                      Claim Fees
                    </button>
                  )}
                  <button className="px-3 py-1 bg-gray-100 dark:bg-dark-600 text-text-light-secondary dark:text-text-dark-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-dark-500 transition-colors text-sm">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFund;
