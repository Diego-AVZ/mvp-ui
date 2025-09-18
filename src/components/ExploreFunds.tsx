import React, { useState } from 'react';
import { Grid, List, SlidersHorizontal, X } from 'lucide-react';
import type { Fund } from '../types';

interface ExploreFundsProps {
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
  sortBy: string;
}

const ExploreFunds: React.FC<ExploreFundsProps> = ({ funds, onFilteredFunds }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    minApy: 0,
    maxApy: 30,
    minTvl: 0,
    maxTvl: 50000000,
    status: [],
    managers: [],
    strategies: [],
    sortBy: 'apy-desc'
  });

  // Obtener opciones únicas para los filtros
  const uniqueManagers = [...new Set(funds.map(fund => fund.manager))];
  const uniqueStrategies = [...new Set(funds.flatMap(fund => fund.strategies))];
  const uniqueStatuses = ['active', 'paused', 'closed'];

  const applyFilters = (newFilters: FilterState) => {
    let filtered = funds.filter(fund => {
      // Búsqueda por texto
      const searchTerm = newFilters.searchTerm.toLowerCase();
      const searchMatch = newFilters.searchTerm === '' || 
        fund.name.toLowerCase().includes(searchTerm) ||
        fund.description.toLowerCase().includes(searchTerm) ||
        fund.manager.toLowerCase().includes(searchTerm) ||
        fund.strategies.some(strategy => strategy.toLowerCase().includes(searchTerm));

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

    // Ordenar resultados
    const sorted = filtered.sort((a, b) => {
      switch (newFilters.sortBy) {
        case 'apy-desc':
          return b.apy - a.apy;
        case 'apy-asc':
          return a.apy - b.apy;
        case 'tvl-desc':
          return b.tvl - a.tvl;
        case 'tvl-asc':
          return a.tvl - b.tvl;
        case 'performance-desc':
          return b.performance - a.performance;
        case 'performance-asc':
          return a.performance - b.performance;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    onFilteredFunds(sorted);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
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
      strategies: [],
      sortBy: 'apy-desc'
    };
    setFilters(clearedFilters);
    applyFilters(clearedFilters);
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Explorar Fondos</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">
            Descubre todos los fondos disponibles con filtros avanzados
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700">
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar fondos..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="apy-desc">APY (Mayor a menor)</option>
            <option value="apy-asc">APY (Menor a mayor)</option>
            <option value="tvl-desc">TVL (Mayor a menor)</option>
            <option value="tvl-asc">TVL (Menor a mayor)</option>
            <option value="performance-desc">Performance (Mayor a menor)</option>
            <option value="performance-asc">Performance (Menor a mayor)</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>

          {/* Advanced Filters Button */}
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              isFiltersOpen || filters.status.length > 0 || filters.managers.length > 0 || filters.strategies.length > 0 || filters.minApy > 0 || filters.maxApy < 30 || filters.minTvl > 0 || filters.maxTvl < 50000000
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-text-light dark:text-text-dark'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filtros</span>
          </button>

          {/* Clear Filters */}
          {(filters.searchTerm || filters.status.length > 0 || filters.managers.length > 0 || filters.strategies.length > 0 || filters.minApy > 0 || filters.maxApy < 30 || filters.minTvl > 0 || filters.maxTvl < 50000000) && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-2 text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark transition-colors flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Limpiar</span>
            </button>
          )}
        </div>

        {/* Advanced Filters Panel */}
        {isFiltersOpen && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* APY Range */}
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  APY (%)
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={filters.minApy}
                    onChange={(e) => handleFilterChange('minApy', Number(e.target.value))}
                    placeholder="Mín"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={filters.maxApy}
                    onChange={(e) => handleFilterChange('maxApy', Number(e.target.value))}
                    placeholder="Máx"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* TVL Range */}
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  TVL
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={filters.minTvl}
                    onChange={(e) => handleFilterChange('minTvl', Number(e.target.value))}
                    placeholder="Mín"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={filters.maxTvl}
                    onChange={(e) => handleFilterChange('maxTvl', Number(e.target.value))}
                    placeholder="Máx"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Estado
                </label>
                <div className="space-y-2">
                  {uniqueStatuses.map(status => (
                    <label key={status} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => toggleArrayFilter('status', status)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-light dark:text-text-dark">
                        {status === 'active' ? 'Activo' : status === 'paused' ? 'Pausado' : 'Cerrado'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Manager Filter */}
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Manager
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uniqueManagers.map(manager => (
                    <label key={manager} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.managers.includes(manager)}
                        onChange={() => toggleArrayFilter('managers', manager)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-light dark:text-text-dark">{manager}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategies Filter */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Estrategias
              </label>
              <div className="flex flex-wrap gap-2">
                {uniqueStrategies.slice(0, 15).map(strategy => (
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
    </div>
  );
};

export default ExploreFunds;
