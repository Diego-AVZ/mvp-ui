import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';
import { mockChartData } from '../data/mockData';

const Chart: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [chartType, setChartType] = useState<'price' | 'volume' | 'liquidity'>('price');

  const timeframes = ['1H', '4H', '1D', '1W', '1M'];
  
  const formatPrice = (value: number) => `$${value.toFixed(2)}`;
  const formatVolume = (value: number) => `$${(value / 1000000).toFixed(1)}M`;
  const formatLiquidity = (value: number) => `$${(value / 1000000).toFixed(1)}M`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">{new Date(label).toLocaleString()}</p>
          <p className="text-lg font-semibold text-gray-900">
            Precio: {formatPrice(data.price)}
          </p>
          <p className="text-sm text-gray-600">
            Volumen: {formatVolume(data.volume)}
          </p>
          <p className="text-sm text-gray-600">
            Liquidez: {formatLiquidity(data.liquidity)}
          </p>
        </div>
      );
    }
    return null;
  };

  const currentPrice = mockChartData[mockChartData.length - 1]?.price || 0;
  const previousPrice = mockChartData[mockChartData.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DeFi Chart Interactivo</h1>
          <p className="text-gray-600 mt-2">Visualización avanzada para gestión de estrategias</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">ETH/USDC</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">{formatPrice(currentPrice)}</p>
            <p className={`text-sm flex items-center ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {priceChangePercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            {[
              { key: 'price', label: 'Precio', icon: TrendingUp },
              { key: 'volume', label: 'Volumen', icon: BarChart3 },
              { key: 'liquidity', label: 'Liquidez', icon: Activity }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setChartType(key as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                  chartType === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'price' ? (
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  stroke="#666"
                />
                <YAxis 
                  tickFormatter={formatPrice}
                  stroke="#666"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : chartType === 'volume' ? (
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  stroke="#666"
                />
                <YAxis 
                  tickFormatter={formatVolume}
                  stroke="#666"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.3}
                />
              </AreaChart>
            ) : (
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  stroke="#666"
                />
                <YAxis 
                  tickFormatter={formatLiquidity}
                  stroke="#666"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="liquidity" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trading Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buy/Sell Panel */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Rápido</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Comprar ETH
              </button>
              <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                Vender ETH
              </button>
            </div>
          </div>
        </div>

        {/* Position Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mis Posiciones</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">ETH/USDC LP</p>
                <p className="text-sm text-gray-600">Posición de Liquidez</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">$2,680</p>
                <p className="text-sm text-green-600">+7.2%</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">ETH Long</p>
                <p className="text-sm text-gray-600">Apalancamiento 2x</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">$1,250</p>
                <p className="text-sm text-green-600">+5.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Execution */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ejecutar Estrategia desde Chart</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Delta Neutral</p>
              <p className="text-sm text-gray-600">Long ETH + Short ETH</p>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <div className="text-center">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Liquidity Range</p>
              <p className="text-sm text-gray-600">Uniswap V3 Position</p>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Multi-Swap</p>
              <p className="text-sm text-gray-600">Arbitraje Automático</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chart;
