import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { mockProtocolStats, mockUserPositions, mockTransactions } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'TVL Total',
      value: `$${(mockProtocolStats.totalTvl / 1000000).toFixed(1)}M`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      name: 'Usuarios Activos',
      value: mockProtocolStats.totalUsers.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      name: 'Fees Generados',
      value: `$${(mockProtocolStats.totalFees / 1000).toFixed(0)}K`,
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      name: 'Funds Activos',
      value: mockProtocolStats.activeFunds.toString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: Activity
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Dashboard FlowFi</h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">Visión general del protocolo DeFi modular</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary">{stat.name}</p>
                  <p className="text-2xl font-bold text-text-light dark:text-text-dark">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary ml-2">vs mes anterior</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Positions */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="p-6 border-b border-gray-200 dark:border-dark-700">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Mis Posiciones</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">Resumen de tus inversiones activas</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockUserPositions.map((position) => (
              <div key={position.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-light dark:text-text-dark">{position.asset}</h3>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{position.amount.toLocaleString()} tokens</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text-light dark:text-text-dark">${position.value.toLocaleString()}</p>
                  <p className={`text-sm ${position.pnl >= 0 ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
                    {position.pnl >= 0 ? '+' : ''}${position.pnl.toLocaleString()} ({position.pnlPercentage.toFixed(1)}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="p-6 border-b border-gray-200 dark:border-dark-700">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Transacciones Recientes</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">Últimas actividades en el protocolo</p>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-dark-700 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    tx.status === 'completed' ? 'bg-success-500' : 
                    tx.status === 'pending' ? 'bg-warning-500' : 'bg-error-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-text-light dark:text-text-dark capitalize">{tx.type.replace('_', ' ')}</p>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{tx.timestamp.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-light dark:text-text-dark">{tx.amount.toLocaleString()} {tx.token}</p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{tx.hash}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
