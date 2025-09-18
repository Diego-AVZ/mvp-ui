import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { Fund } from '../types';

interface FundSearchProps {
  funds: Fund[];
  onFilteredFunds: (funds: Fund[]) => void;
}

interface FilterState {
  searchTerm: string;
  minApy: number;
  maxApy: number;
  minTvl: number;
  maxTvl: number;
  status: string[];
  managers: string[];
  strategies: string[];
}

const FundSearch: React.FC<FundSearchProps> = ({ funds, onFilteredFunds }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    minApy: 0,
    maxApy: 30,
    minTvl: 0,
    maxTvl: 50000000,
    status: [],
    managers: [],
    strategies: []
  });

  // Obtener opciones únicas para los filtros
  const uniqueManagers = [...new Set(funds.map(fund => fund.manager))];
  const uniqueStrategies = [...new Set(funds.flatMap(fund => fund.strategies))];
  const uniqueStatuses = ['active', 'paused', 'closed'];

  const applyFilters = (newFilters: FilterState) => {
    let filtered = funds.filter(fund => {
      // Búsqueda por texto con coincidencias más inteligentes
      const searchTerm = newFilters.searchTerm.toLowerCase();
      const searchMatch = newFilters.searchTerm === '' || 
        fund.name.toLowerCase().includes(searchTerm) ||
        fund.description.toLowerCase().includes(searchTerm) ||
        fund.manager.toLowerCase().includes(searchTerm) ||
        fund.strategies.some(strategy => 
          strategy.toLowerCase().includes(searchTerm)
        ) ||
        // Búsqueda por palabras clave comunes
        (searchTerm.includes('bitcoin') && fund.strategies.some(s => s.toLowerCase().includes('btc'))) ||
        (searchTerm.includes('ethereum') && fund.strategies.some(s => s.toLowerCase().includes('eth'))) ||
        (searchTerm.includes('stable') && fund.strategies.some(s => s.toLowerCase().includes('stable'))) ||
        (searchTerm.includes('yield') && fund.name.toLowerCase().includes('yield')) ||
        (searchTerm.includes('staking') && fund.strategies.some(s => s.toLowerCase().includes('staking')));

      // Filtro por APY
      const apyMatch = fund.apy >= newFilters.minApy && fund.apy <= newFilters.maxApy;

      // Filtro por TVL
      const tvlMatch = fund.tvl >= newFilters.minTvl && fund.tvl <= newFilters.maxTvl;

      // Filtro por estado
      const statusMatch = newFilters.status.length === 0 || newFilters.status.includes(fund.status);

      // Filtro por managers
      const managerMatch = newFilters.managers.length === 0 || newFilters.managers.includes(fund.manager);

      // Filtro por estrategias
      const strategyMatch = newFilters.strategies.length === 0 || 
        newFilters.strategies.some(strategy => fund.strategies.includes(strategy));

      return searchMatch && apyMatch && tvlMatch && statusMatch && managerMatch && strategyMatch;
    });

    onFilteredFunds(filtered);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleSearchChange = (value: string) => {
    handleFilterChange('searchTerm', value);
  };

  const toggleArrayFilter = (key: 'status' | 'managers' | 'strategies', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleFilterChange(key, newArray);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      searchTerm: '',
      minApy: 0,
      maxApy: 30,
      minTvl: 0,
      maxTvl: 50000000,
      status: [],
      managers: [],
      strategies: []
    };
    setFilters(clearedFilters);
    applyFilters(clearedFilters);
  };


  return (
    <div className="space-y-4">
      {/* Barra de búsqueda principal */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-light-secondary dark:text-text-dark-secondary" />
        <input
          type="text"
          placeholder="Buscar fondos por nombre, descripción, manager o estrategia..."
          value={filters.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg text-text-light dark:text-text-dark placeholder-text-light-secondary dark:placeholder-text-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Sugerencias de búsqueda rápida */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Búsquedas rápidas:</span>
        {['Bitcoin', 'Ethereum', 'Stablecoin', 'Yield', 'Staking', 'DeFi'].map(suggestion => (
          <button
            key={suggestion}
            onClick={() => handleSearchChange(suggestion)}
            className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark text-sm rounded-full hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Botón de filtros avanzados */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filtros Avanzados</span>
          {isFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {(filters.searchTerm || filters.status.length > 0 || filters.managers.length > 0 || filters.strategies.length > 0 || filters.minApy > 0 || filters.maxApy < 30 || filters.minTvl > 0 || filters.maxTvl < 50000000) && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Limpiar filtros</span>
          </button>
        )}
      </div>

      {/* Panel de filtros avanzados */}
      {isFiltersOpen && (
        <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg p-6 space-y-6 animate-slide-in">
          {/* Filtros por APY */}
          <div>
            <h3 className="text-sm font-medium text-text-light dark:text-text-dark mb-3">APY (%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Mínimo</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={filters.minApy}
                  onChange={(e) => handleFilterChange('minApy', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Máximo</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={filters.maxApy}
                  onChange={(e) => handleFilterChange('maxApy', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Filtros por TVL */}
          <div>
            <h3 className="text-sm font-medium text-text-light dark:text-text-dark mb-3">TVL</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Mínimo</label>
                <input
                  type="number"
                  min="0"
                  max="50000000"
                  step="100000"
                  value={filters.minTvl}
                  onChange={(e) => handleFilterChange('minTvl', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">Máximo</label>
                <input
                  type="number"
                  min="0"
                  max="50000000"
                  step="100000"
                  value={filters.maxTvl}
                  onChange={(e) => handleFilterChange('maxTvl', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Filtros por Estado */}
          <div>
            <h3 className="text-sm font-medium text-text-light dark:text-text-dark mb-3">Estado</h3>
            <div className="flex flex-wrap gap-2">
              {uniqueStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => toggleArrayFilter('status', status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.status.includes(status)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-dark-600'
                  }`}
                >
                  {status === 'active' ? 'Activo' : status === 'paused' ? 'Pausado' : 'Cerrado'}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros por Manager */}
          <div>
            <h3 className="text-sm font-medium text-text-light dark:text-text-dark mb-3">Manager</h3>
            <div className="flex flex-wrap gap-2">
              {uniqueManagers.map(manager => (
                <button
                  key={manager}
                  onClick={() => toggleArrayFilter('managers', manager)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.managers.includes(manager)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-dark-600'
                  }`}
                >
                  {manager}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros por Estrategias */}
          <div>
            <h3 className="text-sm font-medium text-text-light dark:text-text-dark mb-3">Estrategias</h3>
            <div className="flex flex-wrap gap-2">
              {uniqueStrategies.slice(0, 10).map(strategy => (
                <button
                  key={strategy}
                  onClick={() => toggleArrayFilter('strategies', strategy)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.strategies.includes(strategy)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-dark-600'
                  }`}
                >
                  {strategy}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundSearch;
