import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Network, 
  Eye, 
  Target, 
  TrendingUp,
  CheckCircle,
  Star,
  Activity
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const DeFiGraphDocs: React.FC = () => {
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
              <Network className="h-12 w-12 text-green-500 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">DeFi Graph</h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Visualize and analyze your entire DeFi ecosystem and positions. See how your different DeFi activities 
              interact and impact each other, providing insights impossible to get from individual protocol interfaces.
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Portfolio Visualization</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                  <li>• Interactive network graph of all your positions</li>
                  <li>• Real-time value tracking across protocols</li>
                  <li>• Visual representation of asset flows</li>
                  <li>• Cross-protocol position relationships</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center mb-4">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Performance Analytics</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li>• Comprehensive performance metrics</li>
                  <li>• Risk analysis and correlation tracking</li>
                  <li>• Yield optimization recommendations</li>
                  <li>• Historical performance comparison</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Risk Management</h3>
                </div>
                <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                  <li>• Portfolio diversification analysis</li>
                  <li>• Concentration risk monitoring</li>
                  <li>• Liquidity risk assessment</li>
                  <li>• Smart contract risk tracking</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-3" />
                  <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Optimization Insights</h3>
                </div>
                <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                  <li>• Automated optimization suggestions</li>
                  <li>• Gas fee optimization recommendations</li>
                  <li>• Yield improvement opportunities</li>
                  <li>• Rebalancing strategies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What Makes It Different */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What Makes DeFi Graph Different?</h2>
            <div className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Traditional Approach</h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3">✗</span>
                      <span>Check each protocol individually</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3">✗</span>
                      <span>No visibility into cross-protocol interactions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3">✗</span>
                      <span>Manual portfolio tracking across platforms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-3">✗</span>
                      <span>Limited risk assessment capabilities</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">DeFi Graph Approach</h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Unified view of entire DeFi portfolio</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Visual representation of protocol connections</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Automated tracking and analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Comprehensive risk and optimization insights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Interactive Features</h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Network className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dynamic Network Visualization</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Interactive graph showing your positions as nodes connected by relationships. Click on any position 
                  to see detailed information, performance metrics, and related activities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Node Size:</strong> Represents position value
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Node Color:</strong> Indicates performance
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <strong>Connections:</strong> Show relationships
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Analytics Dashboard</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive dashboard showing portfolio performance, risk metrics, yield generation, 
                  and optimization opportunities updated in real-time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <strong>Portfolio Metrics:</strong> TVL, APY, P&L
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <strong>Risk Analysis:</strong> Diversification, concentration
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <strong>Yield Tracking:</strong> Real-time yield generation
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <strong>Optimization:</strong> Improvement suggestions
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Alerts & Notifications</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Intelligent alerts for important events, opportunities, and risks across your entire DeFi portfolio.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                      <strong>Performance Alerts:</strong> Significant gains/losses
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                      <strong>Risk Warnings:</strong> High concentration, liquidity issues
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                      <strong>Opportunity Alerts:</strong> New yield opportunities
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                      <strong>Optimization Tips:</strong> Rebalancing suggestions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How DeFi Graph Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Connect Positions</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Automatically detect and connect all your DeFi positions across supported protocols.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Build Network</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create interactive network visualization showing relationships between your positions.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analyze & Track</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Monitor performance, analyze risks, and track optimization opportunities in real-time.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Optimize Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Receive intelligent recommendations and execute optimizations directly from the graph interface.
                </p>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-12 bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Pro Tip
            </h4>
            <p className="text-green-800 dark:text-green-200 text-sm">
              DeFi Graph represents the ultimate "DeFi in one click" experience - it turns the complex web of 
              DeFi protocols and positions into a simple, visual, and actionable interface that provides insights 
              impossible to achieve through individual protocol management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeFiGraphDocs;
