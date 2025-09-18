import React, { useEffect, useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DeFiChart: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState(116250.45);
  const [priceChange, setPriceChange] = useState(2.34);
  const [timeframe, setTimeframe] = useState('1d');
  const [isRangeToolActive, setIsRangeToolActive] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{lower: number | null, upper: number | null}>({lower: null, upper: null});
  const [showRangeModal, setShowRangeModal] = useState(false);
  const [showLiquidityModal, setShowLiquidityModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{x: number, y: number, price: number} | null>(null);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, price: number} | null>(null);
  const [limitOrder, setLimitOrder] = useState<{price: number, id: string} | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<any>(null);

  // Estrategias activas en el gráfico - distribuidas en diferentes fechas y precios
  const activeStrategies = [
    {
      id: 'strategy_1',
      name: 'Yield Farming Bundle',
      type: 'bundle',
      price: 113500, // Precio bajo
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 días atrás
      apy: 18.5,
      tvl: 2500000,
      protocols: ['Uniswap V3', 'Aave', 'Compound'],
      status: 'active',
      color: '#10b981',
      fees: 342.80,
      actions: ['Claim Fees', 'Add Liquidity', 'Close Position']
    },
    {
      id: 'strategy_2', 
      name: 'Arbitrage Bot',
      type: 'strategy',
      price: 115800, // Precio medio-bajo
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 días atrás
      apy: 12.3,
      tvl: 1800000,
      protocols: ['Uniswap V2', 'SushiSwap'],
      status: 'active',
      color: '#3b82f6',
      fees: 156.20,
      actions: ['Claim Fees', 'Add Liquidity', 'Close Position']
    },
    {
      id: 'strategy_3',
      name: 'Liquidity Mining',
      type: 'bundle', 
      price: 117200, // Precio medio-alto
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
      apy: 22.1,
      tvl: 3200000,
      protocols: ['Curve', 'Balancer'],
      status: 'active',
      color: '#8b5cf6',
      fees: 521.40,
      actions: ['Claim Fees', 'Add Liquidity', 'Close Position']
    },
    {
      id: 'strategy_4',
      name: 'DeFi Index Fund',
      type: 'fund',
      price: 118800, // Precio alto
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 horas atrás
      apy: 15.7,
      tvl: 4500000,
      protocols: ['Yearn', 'Harvest', 'Badger'],
      status: 'active',
      color: '#f59e0b',
      fees: 678.90,
      actions: ['Claim Fees', 'Add Liquidity', 'Close Position']
    }
  ];

  const timeframes = ['1h', '4h', '1d', '1w', '1M'];

  // Generate mock data for BTC/USDT
  const generateMockData = (timeframe: string) => {
    const data = [];
    const labels = [];
    const now = new Date();
    
    let dataPoints, timeInterval, basePrice, volatility;
    
    switch(timeframe) {
      case '1h':
        dataPoints = 168;
        timeInterval = 60 * 60 * 1000;
        basePrice = 116000;
        volatility = 2000;
        break;
      case '4h':
        dataPoints = 168;
        timeInterval = 4 * 60 * 60 * 1000;
        basePrice = 116000;
        volatility = 3000;
        break;
      case '1d':
        dataPoints = 365;
        timeInterval = 24 * 60 * 60 * 1000;
        basePrice = 116000;
        volatility = 5000;
        break;
      case '1w':
        dataPoints = 104;
        timeInterval = 7 * 24 * 60 * 60 * 1000;
        basePrice = 116000;
        volatility = 8000;
        break;
      case '1M':
        dataPoints = 60;
        timeInterval = 30 * 24 * 60 * 60 * 1000;
        basePrice = 116000;
        volatility = 15000;
        break;
      default:
        dataPoints = 365;
        timeInterval = 24 * 60 * 60 * 1000;
        basePrice = 116000;
        volatility = 5000;
    }
    
    for (let i = dataPoints; i >= 0; i--) {
      const date = new Date(now.getTime() - i * timeInterval);
      
      let label;
      switch(timeframe) {
        case '1h':
          label = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          break;
        case '4h':
          label = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          break;
        case '1d':
          label = date.toLocaleDateString();
          break;
        case '1w':
          label = date.toLocaleDateString();
          break;
        case '1M':
          label = date.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
          break;
        default:
          label = date.toLocaleDateString();
      }
      
      labels.push(label);
      
      const trend = Math.sin(i / dataPoints * Math.PI * 4) * 0.1;
      const randomVariation = (Math.random() - 0.5) * volatility;
      const price = basePrice * (1 + trend) + randomVariation;
      
      data.push(Math.max(price, 10000));
    }
    
    return { data, labels };
  };

  const { data: chartData, labels } = useMemo(() => generateMockData(timeframe), [timeframe]);


  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `Price: $${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#666',
          maxTicksLimit: 12
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#666',
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  }), []);

  const chartDataset = useMemo(() => ({
    labels: labels,
    datasets: [
      {
        label: 'BTC/USDT',
        data: chartData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#10b981',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2
      }
    ]
  }), [labels, chartData]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 1000;
      const newPrice = currentPrice + change;
      setCurrentPrice(newPrice);
      setPriceChange(change > 0 ? Math.abs(change / currentPrice * 100) : -Math.abs(change / currentPrice * 100));
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const handleRangeToolToggle = () => {
    setIsRangeToolActive(!isRangeToolActive);
    if (isRangeToolActive) {
      setSelectedRange({lower: null, upper: null});
    }
  };

  const getPriceFromPosition = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const chartHeight = rect.height;
    const priceRange = 30000; // Rango total de precios visible (±15k del precio actual)
    const maxPrice = currentPrice + priceRange / 2;
    return maxPrice - (y / chartHeight) * priceRange;
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isRangeToolActive) return;
    
    const price = getPriceFromPosition(event);
    const rect = event.currentTarget.getBoundingClientRect();
    
    setIsDragging(true);
    setDragStart({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      price: price
    });
    setSelectedRange({lower: price, upper: null});
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStart) return;
    
    const price = getPriceFromPosition(event);
    setSelectedRange({lower: dragStart.price, upper: price});
  };

  const handleMouseUp = () => {
    if (!isDragging || !dragStart) return;
    
    setIsDragging(false);
    setDragStart(null);
    
    // Abrir modal automáticamente cuando se completa el rango
    setTimeout(() => setShowRangeModal(true), 500);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
    }
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isRangeToolActive) return; // No mostrar menú si el range tool está activo
    
    const price = getPriceFromPosition(event);
    const rect = event.currentTarget.getBoundingClientRect();
    
    setContextMenu({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      price: price
    });
  };

  const handleOpenRange = () => {
    setContextMenu(null);
    setIsRangeToolActive(true);
    setSelectedRange({lower: contextMenu?.price || 0, upper: null});
  };

  const handleCreateLimitOrder = () => {
    setContextMenu(null);
    setLimitOrder({
      price: contextMenu?.price || 0,
      id: `limit_${Date.now()}`
    });
  };

  const handleLimitOrderClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (confirm('¿Eliminar orden límite?')) {
      setLimitOrder(null);
    }
  };

  const handleLimitOrderDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!limitOrder) return;
    
    const price = getPriceFromPosition(event);
    setLimitOrder({...limitOrder, price});
  };

  const handleStrategyClick = (strategy: any, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedStrategy(strategy);
    setContextMenu(null); // Cerrar menú contextual si está abierto
  };

  const handleStrategyAction = (action: string) => {
    if (!selectedStrategy) return;
    
    switch(action) {
      case 'Claim Fees':
        alert(`✅ Claimed $${selectedStrategy.fees} in fees from ${selectedStrategy.name}`);
        break;
      case 'Add Liquidity':
        alert(`💰 Add liquidity to ${selectedStrategy.name} - Opening liquidity modal...`);
        break;
      case 'Close Position':
        if (confirm(`⚠️ Are you sure you want to close ${selectedStrategy.name}?`)) {
          alert(`🔒 Position closed: ${selectedStrategy.name}`);
          setSelectedStrategy(null);
        }
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">DeFi Chart</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">Interactive DeFi trading and analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">BTC/USDT</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-text-light dark:text-text-dark">{formatPrice(currentPrice)}</p>
            <p className={`text-sm flex items-center ${priceChange >= 0 ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
              {priceChange >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {formatPercentage(priceChange)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-3">
          {/* Chart Controls */}
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-4 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      timeframe === tf
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-200 dark:hover:bg-dark-600'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <button
                onClick={handleRangeToolToggle}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isRangeToolActive
                    ? 'bg-error-600 text-white'
                    : 'bg-success-600 text-white hover:bg-success-700'
                }`}
              >
                {isRangeToolActive ? 'Cancel Range' : 'Open Range'}
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
            <div 
              className="h-96 relative select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onContextMenu={handleContextMenu}
              onClick={() => setContextMenu(null)}
              style={{ cursor: isRangeToolActive ? 'crosshair' : 'default' }}
            >
              <Line data={chartDataset} options={chartOptions} />
              
              {/* Range Selection Overlay */}
              {isRangeToolActive && selectedRange.lower && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Lower price line */}
                  <div 
                    className="absolute w-full border-t-2 border-success-500 opacity-70"
                    style={{
                      top: `${50 - (selectedRange.lower - currentPrice) / 30000 * 50}%`
                    }}
                  >
                    <div className="absolute -top-6 left-2 bg-success-500 text-white text-xs px-2 py-1 rounded">
                      Lower: ${selectedRange.lower.toFixed(0)}
                    </div>
                  </div>
                  
                  {/* Upper price line */}
                  {selectedRange.upper && (
                    <div 
                      className="absolute w-full border-t-2 border-success-500 opacity-70"
                      style={{
                        top: `${50 - (selectedRange.upper - currentPrice) / 30000 * 50}%`
                      }}
                    >
                      <div className="absolute -top-6 right-2 bg-success-500 text-white text-xs px-2 py-1 rounded">
                        Upper: ${selectedRange.upper.toFixed(0)}
                      </div>
                    </div>
                  )}
                  
                  {/* Range area */}
                  {selectedRange.upper && (
                    <div 
                      className="absolute w-full bg-success-500 opacity-10"
                      style={{
                        top: `${50 - (Math.max(selectedRange.lower!, selectedRange.upper) - currentPrice) / 30000 * 50}%`,
                        height: `${Math.abs(selectedRange.upper - selectedRange.lower!) / 30000 * 100}%`
                      }}
                    ></div>
                  )}
                </div>
              )}

              {/* Limit Order Line */}
              {limitOrder && (
                <div 
                  className="absolute w-full border-t-2 border-orange-500 opacity-80 cursor-move"
                  style={{
                    top: `${50 - (limitOrder.price - currentPrice) / 30000 * 50}%`
                  }}
                  onMouseDown={handleLimitOrderDrag}
                  onClick={handleLimitOrderClick}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                    <span>Limit: ${limitOrder.price.toFixed(0)}</span>
                    <button className="ml-1 text-red-200 hover:text-white">×</button>
                  </div>
                </div>
              )}

              {/* Strategy Markers */}
              {activeStrategies.map((strategy) => {
                // Calcular posición X basada en la fecha (porcentaje del ancho del gráfico)
                const timeRange = 7 * 24 * 60 * 60 * 1000; // 7 días en ms
                const timeFromNow = Date.now() - strategy.timestamp.getTime();
                const xPosition = (timeFromNow / timeRange) * 100; // Porcentaje del ancho
                
                // Calcular posición Y basada en el precio
                const priceRange = 30000; // Rango de precios visible
                const minPrice = currentPrice - priceRange / 2;
                const yPosition = 100 - ((strategy.price - minPrice) / priceRange) * 100; // Porcentaje de altura
                
                return (
                  <div
                    key={strategy.id}
                    className="absolute cursor-pointer z-10"
                    style={{
                      left: `${Math.max(5, Math.min(95, xPosition))}%`, // Limitar entre 5% y 95%
                      top: `${Math.max(5, Math.min(95, yPosition))}%`, // Limitar entre 5% y 95%
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={(e) => handleStrategyClick(strategy, e)}
                  >
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform"
                      style={{ backgroundColor: strategy.color }}
                    >
                      <div className="w-full h-full rounded-full animate-pulse opacity-60"></div>
                    </div>
                    
                    {/* Strategy Label */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-dark-800 text-xs px-2 py-1 rounded shadow-lg border border-gray-200 dark:border-dark-700 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      <div className="font-semibold">{strategy.name}</div>
                      <div className="text-gray-500 dark:text-gray-400">${strategy.price.toLocaleString()}</div>
                    </div>
                  </div>
                );
              })}

              {/* Context Menu */}
              {contextMenu && (
                <div 
                  className="absolute bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 p-2 z-20"
                  style={{
                    left: `${contextMenu.x}px`,
                    top: `${contextMenu.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
                    ${contextMenu.price.toFixed(0)}
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={handleOpenRange}
                      className="w-full px-3 py-2 text-sm bg-success-600 text-white rounded hover:bg-success-700 transition-colors"
                    >
                      📊 Open Range (Uniswap)
                    </button>
                    <button
                      onClick={handleCreateLimitOrder}
                      className="w-full px-3 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                    >
                      📈 Limit Order
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Range Tool Indicator */}
            {isRangeToolActive && (
              <div className="mt-4 p-3 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
                <div className="flex items-center space-x-2 text-success-700 dark:text-success-400">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {isDragging 
                      ? 'Drag to create range...'
                      : !selectedRange.lower 
                      ? 'Click and drag on chart to create range'
                      : !selectedRange.upper
                      ? 'Release to complete range'
                      : 'Range selected! Creating position...'
                    }
                  </span>
                </div>
                {selectedRange.lower && selectedRange.upper && (
                  <div className="mt-2 text-xs text-success-600 dark:text-success-400">
                    Range: ${Math.min(selectedRange.lower, selectedRange.upper).toFixed(0)} - ${Math.max(selectedRange.lower, selectedRange.upper).toFixed(0)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Positions */}
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Active Positions</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <div className="bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 px-2 py-1 rounded text-sm font-semibold">
                    Uniswap V3 LP
                  </div>
                  <div className="text-lg font-bold text-success-600 dark:text-success-400">$15,420.50</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center">
                    <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Range</div>
                    <div className="text-sm font-semibold text-text-light dark:text-text-dark">$112K - $120K</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">APR</div>
                    <div className="text-sm font-semibold text-text-light dark:text-text-dark">24.5%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Fees Earned</div>
                    <div className="text-sm font-semibold text-text-light dark:text-text-dark">$342.80</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Status</div>
                    <div className="text-sm font-semibold text-success-600 dark:text-success-400">Active</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowLiquidityModal(true)}
                    className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
                  >
                    Manage
                  </button>
                  <button className="flex-1 bg-gray-100 dark:bg-dark-600 text-text-light-secondary dark:text-text-dark-secondary py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-500 transition-colors text-sm font-semibold">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Quick Actions</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-light-secondary dark:text-text-dark-secondary mb-2">Add Liquidity (USDC)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-text-light dark:text-text-dark rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                Deposit USDC
              </button>
              
              <button className="w-full bg-error-600 text-white py-3 rounded-lg hover:bg-error-700 transition-colors font-semibold">
                Withdraw Liquidity
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Liquidity Modal */}
      {showLiquidityModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-200 dark:border-dark-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">BTC/USDT Liquidity Position</h3>
              <button 
                onClick={() => setShowLiquidityModal(false)}
                className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-4 mb-6 text-center">
              <div className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1">$342.80</div>
              <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Fees Earned</div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm text-text-light-secondary dark:text-text-dark-secondary mb-2">Add Liquidity (USDC)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-text-light dark:text-text-dark rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                Claim Fees
              </button>
              <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                Deposit USDC
              </button>
              <button className="flex-1 bg-error-600 text-white py-2 px-4 rounded-lg hover:bg-error-700 transition-colors font-semibold">
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Range Creation Modal */}
      {showRangeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 w-full max-w-4xl shadow-xl border border-gray-200 dark:border-dark-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">🚀 Create New Liquidity Position</h3>
              <button 
                onClick={() => setShowRangeModal(false)}
                className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">📊</span>
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">BTC/USDT Position</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 border border-primary-200 dark:border-primary-800">
                  <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Range:</div>
                  <div className="text-sm font-semibold text-success-600 dark:text-success-400">
                    ${selectedRange.lower?.toFixed(0)} - ${selectedRange.upper?.toFixed(0)}
                  </div>
                </div>
                <div className="text-center bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 border border-primary-200 dark:border-primary-800">
                  <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Current Price:</div>
                  <div className="text-sm font-semibold text-success-600 dark:text-success-400">$116,250</div>
                </div>
                <div className="text-center bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 border border-primary-200 dark:border-primary-800">
                  <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Status:</div>
                  <div className="text-sm font-semibold text-success-600 dark:text-success-400">In Range</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">💰 Position Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-light-secondary dark:text-text-dark-secondary mb-2">Lower Price (USDC)</label>
                    <input
                      type="number"
                      value={selectedRange.lower?.toFixed(2) || ''}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-text-light dark:text-text-dark rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-light-secondary dark:text-text-dark-secondary mb-2">Upper Price (USDC)</label>
                    <input
                      type="number"
                      value={selectedRange.upper?.toFixed(2) || ''}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-text-light dark:text-text-dark rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-light-secondary dark:text-text-dark-secondary mb-2">Liquidity Amount (USDC)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-text-light dark:text-text-dark rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">📈 Projections</h4>
                <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-light-secondary dark:text-text-dark-secondary">Price Range:</span>
                    <span className="text-success-600 dark:text-success-400 font-semibold">
                      ${selectedRange.lower?.toFixed(0)} - ${selectedRange.upper?.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-light-secondary dark:text-text-dark-secondary">Estimated Fees (24h):</span>
                    <span className="text-success-600 dark:text-success-400 font-semibold">$12.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-light-secondary dark:text-text-dark-secondary">APR:</span>
                    <span className="text-success-600 dark:text-success-400 font-semibold">18.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-light-secondary dark:text-text-dark-secondary">Range Width:</span>
                    <span className="text-success-600 dark:text-success-400 font-semibold">6.9%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => {
                  setSelectedRange({lower: null, upper: null});
                  setIsRangeToolActive(false);
                  setShowRangeModal(false);
                }}
                className="flex-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors font-semibold"
              >
                🔄 Clear Selection
              </button>
              <button 
                onClick={() => {
                  alert('✅ Position created successfully!');
                  setShowRangeModal(false);
                  setIsRangeToolActive(false);
                  setSelectedRange({lower: null, upper: null});
                }}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                ✨ Create Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Strategy Details Modal */}
      {selectedStrategy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 w-full max-w-2xl shadow-xl border border-gray-200 dark:border-dark-700">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: selectedStrategy.color }}
                >
                  {selectedStrategy.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark">{selectedStrategy.name}</h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary capitalize">{selectedStrategy.type}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStrategy(null)}
                className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">$</span>
                  </div>
                  <div>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Entry Price</p>
                    <p className="text-lg font-semibold text-text-light dark:text-text-dark">${selectedStrategy.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success-100 dark:bg-success-900/20 rounded-full flex items-center justify-center">
                    <span className="text-success-600 dark:text-success-400 font-bold">%</span>
                  </div>
                  <div>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">APY</p>
                    <p className="text-lg font-semibold text-success-600 dark:text-success-400">{selectedStrategy.apy}%</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">💰</span>
                  </div>
                  <div>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Fees Earned</p>
                    <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">${selectedStrategy.fees}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">📊</span>
                  </div>
                  <div>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">TVL</p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">${(selectedStrategy.tvl / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">Protocols</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStrategy.protocols.map((protocol: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                    {protocol}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              {selectedStrategy.actions.map((action: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleStrategyAction(action)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                    action === 'Claim Fees' 
                      ? 'bg-success-600 text-white hover:bg-success-700'
                      : action === 'Add Liquidity'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {action === 'Claim Fees' && '💰 '}
                  {action === 'Add Liquidity' && '➕ '}
                  {action === 'Close Position' && '🔒 '}
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeFiChart;