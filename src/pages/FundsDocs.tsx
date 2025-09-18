import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield, 
  BarChart3,
  CheckCircle,
  Star
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const FundsDocs: React.FC = () => {
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
              <TrendingUp className="h-12 w-12 text-blue-500 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Funds</h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professionally managed funds with transparent on-chain data. Create your own fund or invest in existing ones 
              with complete transparency and professional management.
            </p>
          </div>

          {/* Two User Types */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">For Depositors</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Invest in Professional Funds</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      Deposit into professionally managed funds with transparent strategies and performance metrics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Professional Management</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      Fund managers handle strategy execution and optimization across multiple DeFi protocols.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Transparent On-Chain Data</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      Access complete transparency with on-chain data showing fund performance and strategies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Real-time Monitoring</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      Monitor fund performance, yield generation, and strategy changes with transparent on-chain data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-8 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-6">
                <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100">For Fund Managers</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Create Your Fund</h3>
                    <p className="text-purple-800 dark:text-purple-200 text-sm">
                      Launch your own fund with custom investment strategies and risk parameters.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Strategy Management</h3>
                    <p className="text-purple-800 dark:text-purple-200 text-sm">
                      Design and execute investment strategies across multiple DeFi protocols and manage fund operations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Transparent Fee Structure</h3>
                    <p className="text-purple-800 dark:text-purple-200 text-sm">
                      Earn management fees through transparent structures while providing value to depositors with clear on-chain data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Performance Analytics</h3>
                    <p className="text-purple-800 dark:text-purple-200 text-sm">
                      Access detailed analytics and reporting tools to optimize fund performance with transparent on-chain data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security First</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Audited smart contracts, multi-signature protection, and transparent on-chain operations for all funds.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transparent Fees</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Clear fee structure with transparent management fees displayed upfront and tracked on-chain.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Automated Yield</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Professional fund management and strategy execution across multiple DeFi protocols with transparent tracking.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How Funds Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">For Depositors</h3>
                <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span>Browse available funds and their performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span>Deposit your tokens into the chosen fund</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span>Monitor fund performance through transparent on-chain data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                    <span>Track performance and withdraw anytime</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">For Fund Managers</h3>
                <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span>Create fund with investment strategy and parameters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span>Design investment strategies and set fund parameters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span>Launch fund and start accepting deposits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                    <span>Manage fund operations and earn transparent management fees</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Pro Tip
            </h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Funds represent the "DeFi in one click" philosophy perfectly - complex multi-protocol strategies 
              become simple investments with professional management and transparent tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundsDocs;
