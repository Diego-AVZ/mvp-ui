import React, { useState } from 'react';
import { TrendingUp, Plus, Eye, DollarSign, Users, Calendar } from 'lucide-react';
import { mockFunds } from '../data/mockData';
import { Fund } from '../types';

const Funds: React.FC = () => {
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Funds</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">Fondos gestionados con TVL tokenizado</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Crear Fund</span>
        </button>
      </div>

      {/* Funds Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockFunds.map((fund) => (
          <div key={fund.id} className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 hover:shadow-md transition-all duration-200">
            <div className="p-6">
              {/* Fund Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{fund.name}</h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">{fund.description}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  fund.status === 'active' ? 'bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-400' :
                  fund.status === 'paused' ? 'bg-warning-100 dark:bg-warning-900/20 text-warning-800 dark:text-warning-400' :
                  'bg-error-100 dark:bg-error-900/20 text-error-800 dark:text-error-400'
                }`}>
                  {fund.status}
                </div>
              </div>

              {/* Fund Stats */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">TVL</span>
                  <span className="font-semibold text-text-light dark:text-text-dark">{formatCurrency(fund.tvl)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">APY</span>
                  <span className="font-semibold text-success-600 dark:text-success-400">{formatPercentage(fund.apy)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Performance</span>
                  <span className="font-semibold text-primary-600 dark:text-primary-400">{formatPercentage(fund.performance)}</span>
                </div>
              </div>

              {/* Fees */}
              <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-medium text-text-light dark:text-text-dark mb-2">Fees</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-light-secondary dark:text-text-dark-secondary">Reward Fee</span>
                    <span className="text-text-light dark:text-text-dark">{fund.fees.rewardFee}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-light-secondary dark:text-text-dark-secondary">Appreciation Fee</span>
                    <span className="text-text-light dark:text-text-dark">{fund.fees.appreciationFee}%</span>
                  </div>
                  {fund.fees.premiumAnnual && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-light-secondary dark:text-text-dark-secondary">Premium Annual</span>
                      <span className="text-text-light dark:text-text-dark">${fund.fees.premiumAnnual}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Strategies */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-text-light dark:text-text-dark mb-2">Estrategias</h4>
                <div className="flex flex-wrap gap-1">
                  {fund.strategies.map((strategy, index) => (
                    <span key={index} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 text-xs rounded-full">
                      {strategy}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedFund(fund)}
                  className="flex-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Ver Detalles</span>
                </button>
                <button className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Depositar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fund Details Modal */}
      {selectedFund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-700">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">{selectedFund.name}</h2>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">{selectedFund.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedFund(null)}
                  className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">TVL</p>
                      <p className="text-lg font-semibold text-text-light dark:text-text-dark">{formatCurrency(selectedFund.tvl)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-success-600 dark:text-success-400" />
                    <div>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">APY</p>
                      <p className="text-lg font-semibold text-success-600 dark:text-success-400">{formatPercentage(selectedFund.apy)}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Manager</p>
                      <p className="text-lg font-semibold text-text-light dark:text-text-dark">{selectedFund.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Creado</p>
                      <p className="text-lg font-semibold text-text-light dark:text-text-dark">{selectedFund.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Estrategias Activas</h3>
                <div className="grid grid-cols-1 gap-3">
                  {selectedFund.strategies.map((strategy, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <p className="font-medium text-text-light dark:text-text-dark">{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  Depositar en este Fund
                </button>
                <button className="flex-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
                  Ver Historial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
