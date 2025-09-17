import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Package, Network, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Landing: React.FC = () => {
  const entryCards = [
    {
      title: 'Funds',
      subtitle: 'Invest or launch tokenized funds',
      description: 'Access professionally managed funds with transparent performance metrics and automated yield strategies.',
      icon: TrendingUp,
      link: '/funds',
      gradient: 'from-blue-500 to-blue-600',
      bgPattern: 'bg-blue-50',
      stats: { tvl: '$7.5M', funds: '12 Active' }
    },
    {
      title: 'Bundles',
      subtitle: 'Create and explore strategy bundles',
      description: 'Discover pre-packaged DeFi strategies or build your own with our intuitive bundle builder.',
      icon: Package,
      link: '/bundles',
      gradient: 'from-purple-500 to-purple-600',
      bgPattern: 'bg-purple-50',
      stats: { strategies: '25+', users: '2.8K' }
    },
    {
      title: 'DeFi Chart',
      subtitle: 'Interactive DeFi trading and analysis',
      description: 'Advanced trading interface with liquidity management, range tools, and real-time market data.',
      icon: BarChart3,
      link: '/chart',
      gradient: 'from-orange-500 to-orange-600',
      bgPattern: 'bg-orange-50',
      stats: { volume: '$2.1M', trades: '1.5K' }
    },
    {
      title: 'DeFi Graph',
      subtitle: 'Visualize and analyze DeFi positions',
      description: 'Interactive visualization of the DeFi ecosystem with real-time data and position tracking.',
      icon: Network,
      link: '/graph',
      gradient: 'from-green-500 to-green-600',
      bgPattern: 'bg-green-50',
      stats: { protocols: '50+', positions: '1.2K' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 transition-colors duration-200">
      {/* Header with Theme Toggle */}
      <header className="absolute top-0 right-0 p-6 z-10">
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-primary-500 mr-3" />
              <h1 className="text-5xl font-bold text-text-light dark:text-text-dark">FlowFi</h1>
            </div>
            <h2 className="text-3xl font-semibold text-text-light-secondary dark:text-text-dark-secondary mb-4">
              One platform. Three ways to master DeFi.
            </h2>
            <p className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto mb-12">
              Simplify DeFi complexity with our modular protocol. Invest in funds, 
              explore strategies, or visualize the entire ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Four Entry Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {entryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.link}
                className="group relative bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-dark-700"
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 ${card.bgPattern} dark:bg-dark-700 opacity-50 dark:opacity-20`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${card.gradient} mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">{card.title}</h3>
                  <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-4">{card.subtitle}</p>
                  
                  {/* Description */}
                  <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6 leading-relaxed">{card.description}</p>

                  {/* Stats */}
                  <div className="flex space-x-6 mb-6">
                    {Object.entries(card.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-text-light dark:text-text-dark">{value}</div>
                        <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-primary-500 font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    <span>Explore {card.title}</span>
                    <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white dark:via-dark-700 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-text-light dark:text-text-dark">$7.5M</div>
              <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Total Value Locked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-light dark:text-text-dark">2.8K</div>
              <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-light dark:text-text-dark">25+</div>
              <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Strategy Bundles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-light dark:text-text-dark">50+</div>
              <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Supported Protocols</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
