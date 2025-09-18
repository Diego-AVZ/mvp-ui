import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  Zap, 
  Target, 
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const BundlesDocs: React.FC = () => {
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
              <Package className="h-12 w-12 text-purple-500 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Strategy Bundles</h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Pre-packaged DeFi strategies that go beyond simple interactions. Think of them as "DeFi recipes" - 
              complex multi-step strategies packaged into simple, executable bundles.
            </p>
          </div>

          {/* What Makes Bundles Different */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What Makes Bundles Different?</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-8 border border-red-200 dark:border-red-800">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-red-600 dark:text-red-400 mr-3" />
                  <h3 className="text-xl font-bold text-red-900 dark:text-red-100">Simple DeFi</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-red-600 dark:text-red-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-200 text-sm">Single protocol interactions</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-red-600 dark:text-red-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-200 text-sm">Basic yield farming or staking</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-red-600 dark:text-red-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-200 text-sm">Manual management required</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-red-600 dark:text-red-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-200 text-sm">Limited optimization</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-8 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center mb-6">
                  <Package className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
                  <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">Strategy Bundles</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-purple-800 dark:text-purple-200 text-sm">Multi-protocol strategies</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-purple-800 dark:text-purple-200 text-sm">Sophisticated yield optimization</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-purple-800 dark:text-purple-200 text-sm">Fully automated execution</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-purple-800 dark:text-purple-200 text-sm">Advanced risk management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bundle Examples */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Bundle Examples</h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Zap className="h-6 w-6 text-yellow-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yield Optimization Bundle</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Automatically moves liquidity between the highest-yielding protocols, rebalancing based on 
                  real-time APY changes and risk assessments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Step 1:</strong> Monitor APY across protocols
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Step 2:</strong> Calculate optimal allocation
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Step 3:</strong> Execute rebalancing automatically
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Arbitrage Bundle</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Identifies price discrepancies across DEXs and automatically executes arbitrage opportunities 
                  while managing gas costs and slippage.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Step 1:</strong> Scan multiple DEXs for price differences
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Step 2:</strong> Calculate profitable opportunities
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Step 3:</strong> Execute trades with optimal routing
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Liquidity Management Bundle</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Manages concentrated liquidity positions across multiple protocols, automatically adjusting 
                  ranges based on market conditions and impermanent loss calculations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Step 1:</strong> Analyze market volatility
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Step 2:</strong> Calculate optimal price ranges
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Step 3:</strong> Adjust positions automatically
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Complexity Simplified</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Execute sophisticated strategies that would normally require deep technical knowledge and 
                  constant monitoring, all with a single click.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Automated Execution</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No need to manually execute each step of complex strategies. Bundles handle everything 
                  automatically while you focus on other things.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Risk Management</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Built-in risk management protocols that monitor positions and adjust strategies based on 
                  market conditions and risk parameters.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-orange-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Tracking</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Complete transparency with real-time performance metrics, strategy explanations, and 
                  historical data for every bundle.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How Strategy Bundles Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Bundle</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Browse available strategy bundles with detailed descriptions and performance history.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Set Parameters</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Configure risk tolerance, investment amount, and any custom parameters for the strategy.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Execute Strategy</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  The bundle automatically executes the multi-step strategy across multiple protocols.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Monitor & Optimize</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Track performance in real-time while the bundle continues to optimize and rebalance automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Pro Tip
            </h4>
            <p className="text-purple-800 dark:text-purple-200 text-sm">
              Strategy Bundles represent the pinnacle of "DeFi in one click" - they turn complex multi-protocol 
              strategies that would take hours to execute manually into simple, automated processes that run continuously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundlesDocs;
