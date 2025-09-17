import React, { useState } from 'react';
import { Package, Play, TrendingUp, AlertTriangle, Shield, Zap } from 'lucide-react';
import { mockStrategyBundles } from '../data/mockData';
import { StrategyBundle } from '../types';

const Strategies: React.FC = () => {
  const [selectedBundle, setSelectedBundle] = useState<StrategyBundle | null>(null);

  const getStrategyIcon = (type: string) => {
    switch (type) {
      case 'delta-neutral':
        return Shield;
      case 'leverage-aave':
        return TrendingUp;
      case 'uniswap-v3':
      case 'uniswap-v4':
        return Package;
      case 'multi-swap':
        return Zap;
      default:
        return Package;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-400';
      case 'medium':
        return 'bg-warning-100 dark:bg-warning-900/20 text-warning-800 dark:text-warning-400';
      case 'high':
        return 'bg-error-100 dark:bg-error-900/20 text-error-800 dark:text-error-400';
      default:
        return 'bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-text-dark-secondary';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return Shield;
      case 'medium':
        return AlertTriangle;
      case 'high':
        return AlertTriangle;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Strategy Bundles</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">Estrategias empaquetadas para operaciones complejas</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <Package className="h-5 w-5" />
          <span>Crear Bundle</span>
        </button>
      </div>

      {/* Strategy Bundles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockStrategyBundles.map((bundle) => {
          const StrategyIcon = getStrategyIcon(bundle.type);
          const RiskIcon = getRiskIcon(bundle.riskLevel);
          
          return (
            <div key={bundle.id} className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 hover:shadow-md transition-all duration-200">
              <div className="p-6">
                {/* Bundle Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                      <StrategyIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{bundle.name}</h3>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{bundle.description}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRiskColor(bundle.riskLevel)}`}>
                    <RiskIcon className="h-3 w-3" />
                    <span>{bundle.riskLevel}</span>
                  </div>
                </div>

                {/* Bundle Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3">
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Retorno Estimado</p>
                    <p className="text-lg font-semibold text-success-600 dark:text-success-400">{bundle.estimatedReturn.toFixed(1)}%</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3">
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Usos</p>
                    <p className="text-lg font-semibold text-text-light dark:text-text-dark">{bundle.usageCount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Fees */}
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-medium text-primary-900 dark:text-primary-400 mb-2">Fees</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-700 dark:text-primary-300">Entry Fee</span>
                      <span className="text-primary-900 dark:text-primary-400 font-medium">{bundle.entryFee}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-700 dark:text-primary-300">Profit Fee</span>
                      <span className="text-primary-900 dark:text-primary-400 font-medium">{bundle.profitFee}%</span>
                    </div>
                  </div>
                </div>

                {/* Tokens */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-light dark:text-text-dark mb-2">Tokens Soportados</h4>
                  <div className="flex flex-wrap gap-1">
                    {bundle.tokens.map((token, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary text-xs rounded-full">
                        {token}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedBundle(bundle)}
                    className="flex-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                  >
                    Ver Detalles
                  </button>
                  <button className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>Ejecutar</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bundle Details Modal */}
      {selectedBundle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-700">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                    {React.createElement(getStrategyIcon(selectedBundle.type), { className: "h-6 w-6 text-primary-600 dark:text-primary-400" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">{selectedBundle.name}</h2>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">{selectedBundle.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedBundle(null)}
                  className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-success-900 dark:text-success-400 mb-2">Retorno Estimado</h3>
                    <p className="text-2xl font-bold text-success-600 dark:text-success-400">{selectedBundle.estimatedReturn.toFixed(1)}%</p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-primary-900 dark:text-primary-400 mb-2">Usos Totales</h3>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{selectedBundle.usageCount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-text-light dark:text-text-dark mb-2">Fees</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Entry Fee</span>
                        <span className="font-semibold text-text-light dark:text-text-dark">{selectedBundle.entryFee}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-light-secondary dark:text-text-dark-secondary">Profit Fee</span>
                        <span className="font-semibold text-text-light dark:text-text-dark">{selectedBundle.profitFee}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-warning-50 dark:bg-warning-900/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-warning-900 dark:text-warning-400 mb-2">Nivel de Riesgo</h3>
                    <div className="flex items-center space-x-2">
                      {React.createElement(getRiskIcon(selectedBundle.riskLevel), { className: "h-5 w-5 text-warning-600 dark:text-warning-400" })}
                      <span className="font-semibold text-warning-600 dark:text-warning-400 capitalize">{selectedBundle.riskLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Tokens Soportados</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBundle.tokens.map((token, index) => (
                    <span key={index} className="px-3 py-2 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary rounded-lg font-medium">
                      {token}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Cómo Funciona</h3>
                <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                  <p className="text-text-light-secondary dark:text-text-dark-secondary">
                    Esta estrategia empaquetada ejecuta automáticamente una secuencia de operaciones complejas 
                    en una sola transacción. Los usuarios pagan una tarifa de entrada y una tarifa de ganancia 
                    por el uso de la estrategia optimizada.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Ejecutar Estrategia</span>
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

export default Strategies;
