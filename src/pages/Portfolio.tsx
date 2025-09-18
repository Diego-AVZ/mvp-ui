import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Plus, Minus, Download, RefreshCw } from 'lucide-react';

interface PortfolioPosition {
  id: string;
  type: 'fund' | 'strategy' | 'lp';
  name: string;
  description: string;
  investedAmount: number;
  currentValue: number;
  pnl: number;
  pnlPercentage: number;
  apy: number;
  fees: number;
  lastUpdate: Date;
  tokens: string[];
  status: 'active' | 'paused';
}

const Portfolio: React.FC = () => {
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Datos mock iniciales
  const initialPositions: PortfolioPosition[] = [
    {
      id: 'pos-1',
      type: 'fund',
      name: 'FlowFi Yield Fund',
      description: 'Fondo de yield farming automatizado',
      investedAmount: 10000,
      currentValue: 10830,
      pnl: 830,
      pnlPercentage: 8.3,
      apy: 12.5,
      fees: 125.5,
      lastUpdate: new Date(),
      tokens: ['USDC', 'ETH'],
      status: 'active'
    },
    {
      id: 'pos-2',
      type: 'strategy',
      name: 'Delta Neutral ETH/USDC',
      description: 'Estrategia delta neutral automatizada',
      investedAmount: 5000,
      currentValue: 5425,
      pnl: 425,
      pnlPercentage: 8.5,
      apy: 9.8,
      fees: 67.8,
      lastUpdate: new Date(),
      tokens: ['ETH', 'USDC'],
      status: 'active'
    },
    {
      id: 'pos-3',
      type: 'lp',
      name: 'LINK/ETH LP Uniswap',
      description: 'Posición de liquidez LINK/ETH',
      investedAmount: 2500,
      currentValue: 2680,
      pnl: 180,
      pnlPercentage: 7.2,
      apy: 15.2,
      fees: 45.2,
      lastUpdate: new Date(),
      tokens: ['LINK', 'ETH'],
      status: 'active'
    }
  ];

  // Función para simular cambios en tiempo real
  const updatePositions = () => {
    setPositions(prevPositions => 
      prevPositions.map(position => {
        // Simular variaciones pequeñas en los valores
        const variation = (Math.random() - 0.5) * 0.02; // ±1% de variación
        const newValue = position.currentValue * (1 + variation);
        const newPnl = newValue - position.investedAmount;
        const newPnlPercentage = (newPnl / position.investedAmount) * 100;
        
        return {
          ...position,
          currentValue: Math.round(newValue * 100) / 100,
          pnl: Math.round(newPnl * 100) / 100,
          pnlPercentage: Math.round(newPnlPercentage * 100) / 100,
          fees: position.fees + Math.random() * 2, // Incrementar fees gradualmente
          lastUpdate: new Date()
        };
      })
    );
  };

  // Configurar intervalos de actualización
  useEffect(() => {
    setPositions(initialPositions);
    
    // Actualizar cada 10 segundos
    const interval10s = setInterval(updatePositions, 10000);
    
    // Actualizar cada 18 segundos
    const interval18s = setInterval(updatePositions, 18000);
    
    // Actualizar cada 27 segundos
    const interval27s = setInterval(updatePositions, 27000);

    return () => {
      clearInterval(interval10s);
      clearInterval(interval18s);
      clearInterval(interval27s);
    };
  }, []);

  const totalInvested = positions.reduce((sum, pos) => sum + pos.investedAmount, 0);
  const totalValue = positions.reduce((sum, pos) => sum + pos.currentValue, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPercentage = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fund': return '🏦';
      case 'strategy': return '⚡';
      case 'lp': return '💧';
      default: return '📊';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fund': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'strategy': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400';
      case 'lp': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400';
    }
  };

  const handleAction = (action: string, positionId: string) => {
    setIsLoading(true);
    // Simular acción
    setTimeout(() => {
      setIsLoading(false);
      alert(`Acción ${action} ejecutada para posición ${positionId}`);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Mi Portfolio</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">
            Gestiona tus inversiones y ve tus ganancias en tiempo real
          </p>
        </div>
        <button 
          onClick={() => updatePositions()}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Resumen Total */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Total Invertido</p>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">{formatCurrency(totalInvested)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Valor Actual</p>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">{formatCurrency(totalValue)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-success-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">P&L Total</p>
              <p className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-success-500' : 'text-error-500'}`}>
                {formatCurrency(totalPnl)}
              </p>
            </div>
            {totalPnl >= 0 ? (
              <TrendingUp className="h-8 w-8 text-success-500" />
            ) : (
              <TrendingDown className="h-8 w-8 text-error-500" />
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Rendimiento</p>
              <p className={`text-2xl font-bold ${totalPnlPercentage >= 0 ? 'text-success-500' : 'text-error-500'}`}>
                {formatPercentage(totalPnlPercentage)}
              </p>
            </div>
            <div className="text-2xl">📈</div>
          </div>
        </div>
      </div>

      {/* Lista de Posiciones */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Mis Posiciones</h2>
        
        {positions.map((position) => (
          <div key={position.id} className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{getTypeIcon(position.type)}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                        {position.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(position.type)}`}>
                        {position.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      {position.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Invertido</p>
                    <p className="font-semibold text-text-light dark:text-text-dark">
                      {formatCurrency(position.investedAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Valor Actual</p>
                    <p className="font-semibold text-text-light dark:text-text-dark">
                      {formatCurrency(position.currentValue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">P&L</p>
                    <p className={`font-semibold ${position.pnl >= 0 ? 'text-success-500' : 'text-error-500'}`}>
                      {formatCurrency(position.pnl)} ({formatPercentage(position.pnlPercentage)})
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">APY</p>
                    <p className="font-semibold text-text-light dark:text-text-dark">
                      {position.apy.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  <span>Fees acumuladas: {formatCurrency(position.fees)}</span>
                  <span>Tokens: {position.tokens.join(', ')}</span>
                  <span>Última actualización: {position.lastUpdate.toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-6">
                <button
                  onClick={() => handleAction('add', position.id)}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-success-500 hover:bg-success-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  <span>Añadir</span>
                </button>
                <button
                  onClick={() => handleAction('claim', position.id)}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>Claim Fees</span>
                </button>
                <button
                  onClick={() => handleAction('withdraw', position.id)}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-error-500 hover:bg-error-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                  <span>Retirar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado de carga */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 animate-spin text-primary-500" />
              <span className="text-text-light dark:text-text-dark">Procesando transacción...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
