import React, { useState } from 'react';
import { Zap, Shield, TrendingUp, Eye, DollarSign } from 'lucide-react';
import { mockStrategyBundles } from '../data/mockData';
import SimpleDeFiCarousel from './SimpleDeFiCarousel';
import type { StrategyBundle } from '../types';

const StrategyBundles: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'one-click' | 'simple'>('one-click');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedBundle, setSelectedBundle] = useState<StrategyBundle | null>(null);

  // Filtrar estrategias por tipo
  const getFilteredBundles = () => {
    let filtered = mockStrategyBundles;
    
    if (activeTab === 'one-click') {
      filtered = filtered.filter(bundle => bundle.type !== 'uniswap-v4');
      if (selectedFilter !== 'all') {
        filtered = filtered.filter(bundle => bundle.type === selectedFilter);
      }
    } else {
      filtered = filtered.filter(bundle => bundle.type === 'uniswap-v4');
    }
    
    return filtered;
  };

  const filteredBundles = getFilteredBundles();

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Low Risk';
      case 'medium': return 'Medium Risk';
      case 'high': return 'High Risk';
      default: return 'Unknown';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'delta-neutral': return '⚖️';
      case 'uniswap-v3': return '💧';
      case 'leverage-aave': return '🏦';
      case 'multi-swap': return '🔄';
      case 'uniswap-v4': return '🛡️';
      default: return '📊';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'delta-neutral': return 'Delta Neutral';
      case 'uniswap-v3': return 'Uniswap LP';
      case 'leverage-aave': return 'Lending';
      case 'multi-swap': return 'Multi-Token';
      case 'uniswap-v4': return 'Simple DeFi';
      default: return 'Other';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
          Strategy Bundles
        </h1>
        <p className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto">
          Deploy complex DeFi strategies in a single transaction. Choose from our curated collection of battle-tested strategies.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-dark-700 rounded-xl p-1 inline-flex">
          <button
            onClick={() => setActiveTab('one-click')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'one-click'
                ? 'bg-white dark:bg-dark-800 text-text-light dark:text-text-dark shadow-sm'
                : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark'
            }`}
          >
            <Zap className="h-5 w-5" />
            <span>1-Click DeFi</span>
          </button>
          <button
            onClick={() => setActiveTab('simple')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'simple'
                ? 'bg-white dark:bg-dark-800 text-text-light dark:text-text-dark shadow-sm'
                : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark'
            }`}
          >
            <Shield className="h-5 w-5" />
            <span>Simple DeFi</span>
          </button>
        </div>
      </div>

      {/* Filters for 1-Click DeFi */}
      {activeTab === 'one-click' && (
        <div className="flex justify-center">
          <div className="flex space-x-2 bg-white dark:bg-dark-800 rounded-xl p-1 border border-gray-200 dark:border-dark-700">
            {[
              { value: 'all', label: 'All' },
              { value: 'delta-neutral', label: 'Delta Neutral' },
              { value: 'uniswap-v3', label: 'LP Uniswap' },
              { value: 'leverage-aave', label: 'Lending' },
              { value: 'multi-swap', label: 'Multi-Token' }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.value
                    ? 'bg-primary-600 text-white'
                    : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'simple' ? (
        <div className="max-w-4xl mx-auto">
          <SimpleDeFiCarousel />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBundles.map((bundle, index) => (
          <div
            key={bundle.id}
            className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 hover:shadow-lg hover:scale-105 transition-all duration-300 transform animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getTypeIcon(bundle.type)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                      {bundle.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                        {getTypeLabel(bundle.type)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(bundle.riskLevel)}`}>
                        {getRiskLabel(bundle.riskLevel)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm mb-4">
                {bundle.description}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <div className="text-lg font-bold text-success-600 dark:text-success-400">
                    {formatPercentage(bundle.estimatedReturn)}
                  </div>
                  <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    Est. Return
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {formatNumber(bundle.usageCount)}
                  </div>
                  <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    Users
                  </div>
                </div>
              </div>

              {/* Tokens */}
              <div className="mb-4">
                <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-2">
                  Tokens
                </div>
                <div className="flex flex-wrap gap-1">
                  {bundle.tokens.slice(0, 4).map(token => (
                    <span
                      key={token}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 text-xs rounded-full"
                    >
                      {token}
                    </span>
                  ))}
                  {bundle.tokens.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary text-xs rounded-full">
                      +{bundle.tokens.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Fees */}
              <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 mb-4">
                <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-2">
                  Fees
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light-secondary dark:text-text-dark-secondary">Entry:</span>
                  <span className="text-text-light dark:text-text-dark">{bundle.entryFee}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light-secondary dark:text-text-dark-secondary">Profit:</span>
                  <span className="text-text-light dark:text-text-dark">{bundle.profitFee}%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedBundle(bundle)}
                  className="flex-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Deposit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* No Results */}
      {activeTab === 'one-click' && filteredBundles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
            No strategies found
          </h3>
          <p className="text-text-light-secondary dark:text-text-dark-secondary">
            Try adjusting your filters to see more strategies.
          </p>
        </div>
      )}

      {/* Bundle Details Modal */}
      {selectedBundle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-700">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{getTypeIcon(selectedBundle.type)}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
                      {selectedBundle.name}
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        {getTypeLabel(selectedBundle.type)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedBundle.riskLevel)}`}>
                        {getRiskLabel(selectedBundle.riskLevel)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBundle(null)}
                  className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
                    Strategy Description
                  </h3>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary">
                    {selectedBundle.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                    <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
                      Estimated Return
                    </div>
                    <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                      {formatPercentage(selectedBundle.estimatedReturn)}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                    <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
                      Active Users
                    </div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {formatNumber(selectedBundle.usageCount)}
                    </div>
                  </div>
                </div>

                {/* Tokens */}
                <div>
                  <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">
                    Supported Tokens
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBundle.tokens.map(token => (
                      <span
                        key={token}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 text-sm rounded-full"
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Fees */}
                <div>
                  <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">
                    Fee Structure
                  </h3>
                  <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Entry Fee:</span>
                        <span className="font-medium text-text-light dark:text-text-dark">{selectedBundle.entryFee}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Profit Fee:</span>
                        <span className="font-medium text-text-light dark:text-text-dark">{selectedBundle.profitFee}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Deposit Now</span>
                  </button>
                  <button className="flex-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors flex items-center justify-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>View Performance</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyBundles;
