import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, Camera, X } from 'lucide-react';
import type { Fund } from '../types';

interface SimpleFundSearchProps {
  funds: Fund[];
  onSearchResults: (funds: Fund[]) => void;
  onSearchTerm: (term: string) => void;
}

const SimpleFundSearch: React.FC<SimpleFundSearchProps> = ({ funds, onSearchResults, onSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sugerencias populares
  const popularSearches = [
    'Bitcoin',
    'Ethereum', 
    'Stablecoin',
    'Yield Farming',
    'Staking',
    'DeFi',
    'High APY',
    'Low Risk'
  ];

  // Fondos populares para mostrar como sugerencias
  const popularFunds = funds.slice(0, 4);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearchTerm(term);
    
    if (term.trim() === '') {
      onSearchResults(funds);
      return;
    }

    const filtered = funds.filter(fund => {
      const searchLower = term.toLowerCase();
      return (
        fund.name.toLowerCase().includes(searchLower) ||
        fund.description.toLowerCase().includes(searchLower) ||
        fund.manager.toLowerCase().includes(searchLower) ||
        fund.strategies.some(strategy => strategy.toLowerCase().includes(searchLower)) ||
        // Búsquedas inteligentes
        (searchLower.includes('bitcoin') && fund.strategies.some(s => s.toLowerCase().includes('btc'))) ||
        (searchLower.includes('ethereum') && fund.strategies.some(s => s.toLowerCase().includes('eth'))) ||
        (searchLower.includes('stable') && fund.strategies.some(s => s.toLowerCase().includes('stable'))) ||
        (searchLower.includes('yield') && fund.name.toLowerCase().includes('yield')) ||
        (searchLower.includes('staking') && fund.strategies.some(s => s.toLowerCase().includes('staking'))) ||
        (searchLower.includes('high apy') && fund.apy > 15) ||
        (searchLower.includes('low risk') && fund.apy < 10)
      );
    });

    onSearchResults(filtered);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      onSearchResults(funds);
      onSearchTerm('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearchTerm('');
    onSearchResults(funds);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Logo/Brand */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-2">
          FlowFi
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">
          Encuentra el fondo perfecto para tu estrategia
        </p>
      </div>

      {/* Search Box */}
      <div className="relative" ref={inputRef}>
        <div className={`relative bg-white dark:bg-dark-800 rounded-full border-2 transition-all duration-200 ${
          isFocused 
            ? 'border-primary-500 shadow-lg' 
            : 'border-gray-200 dark:border-dark-700 hover:border-gray-300 dark:hover:border-dark-600'
        }`}>
          <div className="flex items-center px-6 py-4">
            <Search className="h-5 w-5 text-text-light-secondary dark:text-text-dark-secondary mr-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={() => {
                setIsFocused(true);
                setShowSuggestions(true);
              }}
              placeholder="Buscar fondos, estrategias, managers..."
              className="flex-1 bg-transparent text-text-light dark:text-text-dark placeholder-text-light-secondary dark:placeholder-text-dark-secondary focus:outline-none text-lg"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="ml-4 p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-text-light-secondary dark:text-text-dark-secondary" />
              </button>
            )}
            <div className="ml-4 flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors">
                <Mic className="h-5 w-5 text-text-light-secondary dark:text-text-dark-secondary" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors">
                <Camera className="h-5 w-5 text-text-light-secondary dark:text-text-dark-secondary" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden z-50">
            {searchTerm ? (
              // Search suggestions based on current input
              <div className="p-4">
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-3">
                  Sugerencias para "{searchTerm}"
                </div>
                <div className="space-y-2">
                  {funds
                    .filter(fund => 
                      fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      fund.strategies.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .slice(0, 3)
                    .map(fund => (
                      <button
                        key={fund.id}
                        onClick={() => handleSearch(fund.name)}
                        className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                      >
                        <div className="font-medium text-text-light dark:text-text-dark">{fund.name}</div>
                        <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                          {fund.apy.toFixed(1)}% APY • {fund.manager}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              // Popular searches and funds
              <div className="p-4">
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-3">
                  Búsquedas populares
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {popularSearches.map(search => (
                    <button
                      key={search}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark text-sm rounded-full hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
                
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-3">
                  Fondos populares
                </div>
                <div className="space-y-2">
                  {popularFunds.map(fund => (
                    <button
                      key={fund.id}
                      onClick={() => handleSearch(fund.name)}
                      className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                    >
                      <div className="font-medium text-text-light dark:text-text-dark">{fund.name}</div>
                      <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        {fund.apy.toFixed(1)}% APY • {fund.manager}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4 mt-6">
        <button className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
          Buscar Fondos
        </button>
        <button className="px-6 py-2 bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark rounded-full hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
          Explorar Todo
        </button>
      </div>
    </div>
  );
};

export default SimpleFundSearch;
