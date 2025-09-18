import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BarChart3, 
  Zap, 
  Target, 
  TrendingUp,
  CheckCircle,
  Star,
  Activity
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const DeFiChartDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/docs" className="flex items-center text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-semibold">Back to Documentation</span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <BarChart3 className="h-12 w-12 text-orange-500 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">DeFi Chart</h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              More than just trading - DeFi Chart offers multiple DeFi options with advanced visualization 
              and direct execution through our unified interface.
            </p>
          </div>

          {/* Multiple DeFi Options */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Multiple DeFi Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Trading & Swapping</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li>• Advanced DEX trading with optimal routing</li>
                  <li>• Cross-chain swaps and bridge integration</li>
                  <li>• Limit orders and advanced trading strategies</li>
                  <li>• Real-time price analysis and market insights</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Liquidity Provision</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                  <li>• Automated liquidity management</li>
                  <li>• Concentrated liquidity position optimization</li>
                  <li>• Impermanent loss protection strategies</li>
                  <li>• Multi-protocol liquidity farming</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center mb-4">
                  <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Yield Farming</h3>
                </div>
                <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                  <li>• Automated yield optimization across protocols</li>
                  <li>• Compound interest strategies</li>
                  <li>• Risk-adjusted yield farming</li>
                  <li>• Multi-token farming strategies</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center mb-4">
                  <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-3" />
                  <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Staking & Governance</h3>
                </div>
                <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                  <li>• Multi-protocol staking aggregation</li>
                  <li>• Governance token management</li>
                  <li>• Automated reward claiming and compounding</li>
                  <li>• Delegation and voting strategies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Advanced Visualization */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Advanced Visualization</h2>
            <div className="bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/20 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Real-time Market Data</h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Live price feeds from multiple DEXs and oracles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Advanced charting with technical indicators</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Volume analysis and market depth visualization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Cross-protocol arbitrage opportunities</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Tools</h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Drag-and-drop position management</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Simulation tools for strategy testing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Risk assessment and portfolio analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Customizable dashboard and alerts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Unified Interface Benefits */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Unified Interface Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Protocol Hopping</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Execute all DeFi activities from a single interface without navigating multiple protocols 
                  or managing different user experiences.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Optimal Execution</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Automatically find the best routes, lowest fees, and optimal execution across all 
                  supported protocols for every transaction.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Tracking</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Track all your DeFi activities, performance, and portfolio changes in one place 
                  with comprehensive analytics and reporting.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-900/20 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How DeFi Chart Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Activity</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Select from trading, liquidity provision, yield farming, or staking activities.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Configure Strategy</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Set parameters, risk tolerance, and optimization preferences for your strategy.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Execute & Monitor</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Execute your strategy with optimal routing and monitor performance in real-time.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Optimize Continuously</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  The system continuously optimizes your positions based on market conditions and your preferences.
                </p>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-12 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Pro Tip
            </h4>
            <p className="text-orange-800 dark:text-orange-200 text-sm">
              DeFi Chart embodies the "DeFi in one click" philosophy by consolidating multiple complex DeFi activities 
              into a single, intuitive interface with advanced visualization and automated optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeFiChartDocs;
