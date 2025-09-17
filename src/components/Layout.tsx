import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Package, Network, BarChart3, Wallet, Home, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const topNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/funds', label: 'Funds', icon: TrendingUp },
    { path: '/bundles', label: 'Bundles', icon: Package },
    { path: '/chart', label: 'DeFi Chart', icon: BarChart3 },
    { path: '/graph', label: 'DeFi Graph', icon: Network },
  ];

  const getSidebarItems = () => {
    if (location.pathname === '/funds') {
      return [
        { label: 'All Funds', path: '/funds' },
        { label: 'My Funds', path: '/funds/my' },
        { label: 'Create Fund', path: '/funds/create' },
      ];
    }
    if (location.pathname.startsWith('/bundles')) {
      return [
        { label: 'Marketplace', path: '/bundles' },
        { label: 'My Bundles', path: '/bundles/my' },
        { label: 'Bundle Builder', path: '/bundles/builder' },
      ];
    }
    if (location.pathname.startsWith('/chart')) {
      return [
        { label: 'Trading View', path: '/chart' },
        { label: 'My Positions', path: '/chart/positions' },
        { label: 'Market Analysis', path: '/chart/analysis' },
      ];
    }
    if (location.pathname.startsWith('/graph')) {
      return [
        { label: 'Overview', path: '/graph' },
        { label: 'My Positions', path: '/graph/positions' },
        { label: 'Protocols', path: '/graph/protocols' },
      ];
    }
    return [];
  };

  const sidebarItems = getSidebarItems();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-text-light dark:text-text-dark">FlowFi</span>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden md:flex space-x-8">
              {topNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Wallet Info and Theme Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <Wallet className="h-4 w-4 text-text-light-secondary dark:text-text-dark-secondary" />
                <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">0x1234...5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Arbitrum</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Contextual Sidebar */}
        {sidebarItems.length > 0 && (
          <aside className="w-64 bg-white dark:bg-dark-800 shadow-sm min-h-screen border-r border-gray-200 dark:border-dark-700 transition-colors duration-200">
            <div className="p-6">
              <h3 className="text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wider mb-4">
                {location.pathname.startsWith('/funds') ? 'Funds' :
                 location.pathname.startsWith('/bundles') ? 'Bundles' :
                 location.pathname.startsWith('/chart') ? 'DeFi Chart' :
                 location.pathname.startsWith('/graph') ? 'DeFi Graph' : ''}
              </h3>
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                          : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-50 dark:hover:bg-dark-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className={`${sidebarItems.length > 0 ? 'flex-1' : 'w-full'} p-6 bg-gray-50 dark:bg-dark-900 transition-colors duration-200`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
