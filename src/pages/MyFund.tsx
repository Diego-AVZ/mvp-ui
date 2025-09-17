import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Settings, Plus, AlertTriangle, CheckCircle, XCircle, BarChart3, Shield, Activity, Download, Eye, X } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Position {
  id: string;
  protocol: string;
  tokens: string[];
  value: number;
  pnl: number;
  status: 'active' | 'expired' | 'out_of_range';
  fees?: number;
}

interface FundDetails {
  name: string;
  description: string;
  inceptionDate: string;
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  securityScore: number;
  activityScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  strategies: string[];
  monthlyReturns: number[];
  topHoldings: { token: string; percentage: number }[];
  performanceMetrics: {
    ytd: number;
    '1m': number;
    '3m': number;
    '6m': number;
    '1y': number;
  };
}

const MyFund: React.FC = () => {
  const [selectedToken0, setSelectedToken0] = useState('ETH');
  const [selectedToken1, setSelectedToken1] = useState('UNI');
  const [amount0, setAmount0] = useState('0.00');
  const [amount1, setAmount1] = useState('8.15');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const stats = {
    tvl: 1245000,
    investors: 54,
    apr: 27.5,
    claimableFees: 834.22
  };

  const fundDetails: FundDetails = {
    name: 'FlowFi Yield Fund',
    description: 'Fondo de yield farming automatizado con estrategias diversificadas en múltiples protocolos DeFi',
    inceptionDate: '2024-01-15',
    totalReturn: 34.7,
    sharpeRatio: 2.1,
    maxDrawdown: -8.2,
    volatility: 12.3,
    securityScore: 8.5,
    activityScore: 9.2,
    riskLevel: 'medium',
    strategies: ['Uniswap V3 LP', 'Aave Lending', 'Compound Supply', 'Curve Staking'],
    monthlyReturns: [2.1, 3.4, -1.2, 4.8, 2.9, 3.7, 1.8, 4.2, 2.5, 3.9, 2.8, 4.1],
    topHoldings: [
      { token: 'ETH', percentage: 35.2 },
      { token: 'USDC', percentage: 28.7 },
      { token: 'USDT', percentage: 15.3 },
      { token: 'UNI', percentage: 8.9 },
      { token: 'AAVE', percentage: 6.2 },
      { token: 'Others', percentage: 5.7 }
    ],
    performanceMetrics: {
      ytd: 34.7,
      '1m': 2.8,
      '3m': 8.9,
      '6m': 18.4,
      '1y': 34.7
    }
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

  const generatePDF = async () => {
    const element = document.getElementById('pdf-content');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${fundDetails.name}-Report-${new Date().toISOString().split('T')[0]}.pdf`);
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

      {/* Fund Details Section */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Fund Performance & Analytics</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowPdfPreview(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview PDF</span>
            </button>
            <button 
              onClick={() => setShowDetailsModal(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>View Details</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <TrendingUp className="h-8 w-8 text-success-600 dark:text-success-400 mx-auto mb-2" />
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Total Return</p>
            <p className="text-2xl font-bold text-success-600 dark:text-success-400">{fundDetails.totalReturn}%</p>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <BarChart3 className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Sharpe Ratio</p>
            <p className="text-2xl font-bold text-text-light dark:text-text-dark">{fundDetails.sharpeRatio}</p>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Security Score</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{fundDetails.securityScore}/10</p>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Activity Score</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{fundDetails.activityScore}/10</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-text-light dark:text-text-dark mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              {Object.entries(fundDetails.performanceMetrics).map(([period, value]) => (
                <div key={period} className="flex justify-between items-center">
                  <span className="text-text-light-secondary dark:text-text-dark-secondary capitalize">{period}</span>
                  <span className={`font-semibold ${value >= 0 ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
                    {value >= 0 ? '+' : ''}{value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-light dark:text-text-dark mb-4">Top Holdings</h3>
            <div className="space-y-3">
              {fundDetails.topHoldings.map((holding, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-text-light dark:text-text-dark">{holding.token}</span>
                  <span className="text-text-light-secondary dark:text-text-dark-secondary">{holding.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
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

      {/* Fund Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-700">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">{fundDetails.name}</h2>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">{fundDetails.description}</p>
                </div>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Risk Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Max Drawdown</span>
                        <span className="text-error-600 dark:text-error-400 font-semibold">{fundDetails.maxDrawdown}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Volatility</span>
                        <span className="text-text-light dark:text-text-dark font-semibold">{fundDetails.volatility}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Risk Level</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          fundDetails.riskLevel === 'low' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          fundDetails.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {fundDetails.riskLevel.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Strategies</h3>
                    <div className="space-y-2">
                      {fundDetails.strategies.map((strategy, index) => (
                        <div key={index} className="px-3 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 rounded-lg text-sm">
                          {strategy}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Monthly Returns</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {fundDetails.monthlyReturns.map((return_, index) => (
                        <div key={index} className="text-center">
                          <div className={`h-16 rounded-lg flex items-end justify-center p-1 ${
                            return_ >= 0 ? 'bg-success-500' : 'bg-error-500'
                          }`} style={{ height: `${Math.abs(return_) * 4}px` }}>
                            <span className="text-white text-xs font-medium">{return_}%</span>
                          </div>
                          <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                            {new Date(2024, index).toLocaleDateString('en', { month: 'short' })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Fund Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Inception Date</span>
                        <span className="text-text-light dark:text-text-dark">{new Date(fundDetails.inceptionDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Total Investors</span>
                        <span className="text-text-light dark:text-text-dark">{stats.investors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Current TVL</span>
                        <span className="text-text-light dark:text-text-dark">${(stats.tvl / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-3">
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowPdfPreview(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="h-5 w-5" />
                  <span>Preview PDF Report</span>
                </button>
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    generatePDF();
                  }}
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">PDF Preview</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowPdfPreview(false)}
                    className="px-4 py-2 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={generatePDF}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* PDF Content */}
              <div id="pdf-content" className="bg-white p-8 text-black" style={{ minHeight: '800px' }}>
                {/* Header */}
                <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
                  <h1 className="text-3xl font-bold text-blue-600 mb-2">{fundDetails.name}</h1>
                  <p className="text-lg text-gray-600">{fundDetails.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Report Generated: {new Date().toLocaleDateString()}</p>
                </div>

                {/* Executive Summary */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Executive Summary</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Return:</span>
                        <span className="font-bold text-green-600">{fundDetails.totalReturn}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sharpe Ratio:</span>
                        <span className="font-bold">{fundDetails.sharpeRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Security Score:</span>
                        <span className="font-bold text-blue-600">{fundDetails.securityScore}/10</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">TVL:</span>
                        <span className="font-bold">${(stats.tvl / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investors:</span>
                        <span className="font-bold">{stats.investors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Risk Level:</span>
                        <span className="font-bold">{fundDetails.riskLevel.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Performance Metrics</h2>
                  <div className="grid grid-cols-5 gap-4">
                    {Object.entries(fundDetails.performanceMetrics).map(([period, value]) => (
                      <div key={period} className="text-center p-4 border border-gray-300 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">{period.toUpperCase()}</p>
                        <p className={`text-xl font-bold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {value >= 0 ? '+' : ''}{value}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Holdings */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Holdings</h2>
                  <div className="space-y-2">
                    {fundDetails.topHoldings.map((holding, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border border-gray-300 rounded-lg">
                        <span className="font-medium">{holding.token}</span>
                        <span className="text-gray-600">{holding.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategies */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Strategies</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {fundDetails.strategies.map((strategy, index) => (
                      <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="font-medium text-blue-800">{strategy}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 border-t-2 border-gray-300 pt-6">
                  <p>This report is generated automatically by FlowFi Fund Management System</p>
                  <p>For questions or support, contact: support@flowfi.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFund;
