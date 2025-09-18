import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ArrowLeft, 
  DollarSign, 
  Target, 
  Shield, 
  Users, 
  TrendingUp,
  Package,
  BarChart3,
  Network,
  Github,
  ExternalLink,
  Star
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Docs: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">What is FlowFi?</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              FlowFi is the <strong>all-in-one DeFi platform</strong> that simplifies decentralized finance through four main branches: 
              <strong> Funds</strong>, <strong>Strategy Bundles</strong>, <strong>DeFi Chart</strong>, and <strong>DeFi Graph</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our philosophy is <strong>"DeFi in one click"</strong> - we democratize access to sophisticated DeFi strategies 
              by removing technical complexity while maintaining full transparency and security. No more navigating multiple protocols, 
              managing complex transactions, or understanding intricate DeFi mechanics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-500 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Funds</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Create or invest in professionally managed funds with transparent on-chain data.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Package className="h-6 w-6 text-purple-500 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Strategy Bundles</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Pre-packaged DeFi strategies that go beyond simple DeFi interactions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-6 w-6 text-orange-500 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">DeFi Chart</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Multiple DeFi options with advanced visualization and direct execution.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Network className="h-6 w-6 text-green-500 mr-3" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">DeFi Graph</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Visualize and analyze your entire DeFi ecosystem and positions.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Target,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How to Get Started with FlowFi</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              FlowFi makes DeFi accessible to everyone. Whether you're new to DeFi or an experienced user, 
              you can start earning with sophisticated strategies in just a few clicks.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-2 mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Connect Your Wallet</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Connect your Web3 wallet (MetaMask, WalletConnect, etc.) to access FlowFi's unified DeFi platform.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-2 mr-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Choose Your Strategy</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Select from funds, strategy bundles, DeFi chart, or DeFi graph. Each option provides different levels of DeFi complexity and control.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2 mr-4">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Track Everything</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor all your strategies, positions, and performance in real-time. FlowFi provides complete transparency 
                and tracking for every DeFi interaction you make.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Pro Tip
            </h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Start with our recommended funds or strategy bundles to experience the "DeFi in one click" philosophy. 
              You'll see how complex DeFi strategies become simple and accessible.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'features',
      title: 'Features',
      icon: DollarSign,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                Funds
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>For Depositors:</strong> Invest in professionally managed funds with transparent on-chain data. 
                  The manager handles strategy execution while you can monitor transparent results.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>For Managers:</strong> Create and launch your own fund, set investment strategies, 
                  and earn management fees while providing value to depositors.
                </p>
                <Link 
                  to="/docs/funds" 
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Learn more about Funds →
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Package className="h-5 w-5 text-purple-500 mr-2" />
                Strategy Bundles
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Unlike simple DeFi interactions, Strategy Bundles are sophisticated multi-step strategies 
                  that combine multiple protocols and techniques.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Think of them as "DeFi recipes" - complex strategies packaged into simple, executable bundles 
                  that would normally require deep technical knowledge.
                </p>
                <Link 
                  to="/docs/bundles" 
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium"
                >
                  Learn more about Strategy Bundles →
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <BarChart3 className="h-5 w-5 text-orange-500 mr-2" />
                DeFi Chart
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  More than just trading - DeFi Chart offers multiple DeFi options including liquidity provision, 
                  yield farming, staking, and advanced trading strategies.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  All DeFi activities are visualized and executed through our unified interface, 
                  eliminating the need to navigate multiple protocols.
                </p>
                <Link 
                  to="/docs/chart" 
                  className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium"
                >
                  Learn more about DeFi Chart →
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Network className="h-5 w-5 text-green-500 mr-2" />
                DeFi Graph
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Visualize your entire DeFi portfolio across all protocols and strategies in one place. 
                  Track performance, analyze connections, and optimize your positions.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  See how your different DeFi activities interact and impact each other, 
                  providing insights that are impossible to get from individual protocol interfaces.
                </p>
                <Link 
                  to="/docs/graph" 
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                >
                  Learn more about DeFi Graph →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'benefits',
      title: 'Benefits',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security
              </h4>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>• Audited smart contracts</li>
                <li>• Multi-signature wallet protection</li>
                <li>• Insurance coverage for major funds</li>
                <li>• Transparent fee structure</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Performance
              </h4>
              <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li>• Professional fund management</li>
                <li>• Automated yield optimization</li>
                <li>• Real-time market analysis</li>
                <li>• Diversified risk strategies</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Accessibility
              </h4>
              <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                <li>• User-friendly interface</li>
                <li>• Low minimum investment amounts</li>
                <li>• Comprehensive educational resources</li>
                <li>• 24/7 customer support</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Why Choose FlowFi?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-800 dark:text-indigo-200">
              <div>
                <p className="mb-2"><strong>For Investors:</strong> Access professional-grade DeFi strategies without technical complexity.</p>
                <p><strong>For Fund Managers:</strong> Launch and manage tokenized funds with automated fee collection.</p>
              </div>
              <div>
                <p className="mb-2"><strong>For Traders:</strong> Advanced charting tools with direct trading capabilities.</p>
                <p><strong>For Everyone:</strong> Transparent, secure, and user-friendly DeFi experience.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-semibold">Volver a FlowFi</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/tu-usuario/flowfi-mvp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                <span className="text-sm">GitHub</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                  Documentación
                </h2>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {section.title}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              {sections.find(section => section.id === activeSection)?.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
