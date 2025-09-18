import React, { useState } from 'react';
import { Plus, Eye, DollarSign, Users, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { mockFunds } from '../data/mockData';
import RecommendedFundsCarousel from '../components/RecommendedFundsCarousel';
import SimpleFundSearch from '../components/SimpleFundSearch';
import ExploreFunds from '../components/ExploreFunds';
import CreateFundWizard from '../components/CreateFundWizard';
import type { Fund } from '../types';

const Funds: React.FC = () => {
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>(mockFunds);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState<'home' | 'explore'>('home');
  const [, setSearchTerm] = useState('');
  const [isCreateWizardOpen, setIsCreateWizardOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const handleSearchResults = (funds: Fund[]) => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredFunds(funds);
      setIsLoading(false);
    }, 300);
  };

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
    if (term.trim() !== '') {
      setCurrentSection('explore');
    }
  };

  const handleExploreClick = () => {
    setCurrentSection('explore');
  };

  const handleCreateFund = (fundData: any) => {
    // Aquí normalmente harías una llamada a la API para crear el fondo
    console.log('Nuevo fondo creado:', fundData);
    
    // Simular creación exitosa
    alert(`¡Fondo "${fundData.name}" creado exitosamente!`);
    
    // Opcionalmente, refrescar la lista de fondos
    // setFilteredFunds([...filteredFunds, newFund]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Navigation */}
      <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentSection('home')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentSection === 'home'
                    ? 'bg-primary-600 text-white'
                    : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => setCurrentSection('explore')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentSection === 'explore'
                    ? 'bg-primary-600 text-white'
                    : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark'
                }`}
              >
                Explorar
              </button>
            </div>
            <button 
              onClick={() => setIsCreateWizardOpen(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Crear Fund</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentSection === 'home' ? (
          <div className="space-y-12">
            {/* Hero Section with Search */}
            <div className="text-center py-12">
              <SimpleFundSearch 
                funds={mockFunds} 
                onSearchResults={handleSearchResults}
                onSearchTerm={handleSearchTerm}
              />
            </div>

            {/* Recommended Funds Carousel */}
            <RecommendedFundsCarousel funds={mockFunds} />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                <div className="text-2xl font-bold text-text-light dark:text-text-dark mb-1">
                  {mockFunds.length}
                </div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Fondos Activos
                </div>
              </div>
              <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                <div className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1">
                  {mockFunds.reduce((acc, fund) => acc + fund.tvl, 0) / 1000000 > 1000 
                    ? `${(mockFunds.reduce((acc, fund) => acc + fund.tvl, 0) / 1000000000).toFixed(1)}B`
                    : `${(mockFunds.reduce((acc, fund) => acc + fund.tvl, 0) / 1000000).toFixed(0)}M`
                  }
                </div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  TVL Total
                </div>
              </div>
              <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {(mockFunds.reduce((acc, fund) => acc + fund.apy, 0) / mockFunds.length).toFixed(1)}%
                </div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  APY Promedio
                </div>
              </div>
              <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                <div className="text-2xl font-bold text-text-light dark:text-text-dark mb-1">
                  {[...new Set(mockFunds.map(fund => fund.manager))].length}
                </div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Managers
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center py-8">
              <button
                onClick={handleExploreClick}
                className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <span>Explorar Todos los Fondos</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Explore Section */}
            <ExploreFunds funds={mockFunds} onFilteredFunds={handleSearchResults} />

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-3 text-text-light-secondary dark:text-text-dark-secondary">Buscando fondos...</span>
              </div>
            )}

            {/* Results Count */}
            {!isLoading && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Mostrando {filteredFunds.length} de {mockFunds.length} fondos
                </p>
              </div>
            )}

            {/* Funds Grid */}
            {!isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFunds.map((fund, index) => (
                  <div 
                    key={fund.id} 
                    className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 hover:shadow-lg hover:scale-105 transition-all duration-300 transform animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6">
                      {/* Fund Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{fund.name}</h3>
                          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">{fund.description}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          fund.status === 'active' ? 'bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-400' :
                          fund.status === 'paused' ? 'bg-warning-100 dark:bg-warning-900/20 text-warning-800 dark:text-warning-400' :
                          'bg-error-100 dark:bg-error-900/20 text-error-800 dark:text-error-400'
                        }`}>
                          {fund.status}
                        </div>
                      </div>

                      {/* Fund Stats */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">TVL</span>
                          <span className="font-semibold text-text-light dark:text-text-dark">{formatCurrency(fund.tvl)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">APY</span>
                          <span className="font-semibold text-success-600 dark:text-success-400">{formatPercentage(fund.apy)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Performance</span>
                          <span className="font-semibold text-primary-600 dark:text-primary-400">{formatPercentage(fund.performance)}</span>
                        </div>
                      </div>

                      {/* Strategies */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-text-light dark:text-text-dark mb-2">Estrategias</h4>
                        <div className="flex flex-wrap gap-1">
                          {fund.strategies.slice(0, 3).map((strategy, index) => (
                            <span key={index} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 text-xs rounded-full">
                              {strategy}
                            </span>
                          ))}
                          {fund.strategies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary text-xs rounded-full">
                              +{fund.strategies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedFund(fund)}
                          className="flex-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Ver Detalles</span>
                        </button>
                        <button className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                          Depositar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && filteredFunds.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">No se encontraron fondos</h3>
                <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">
                  Intenta ajustar tus filtros de búsqueda para encontrar más fondos.
                </p>
                <button
                  onClick={() => setCurrentSection('home')}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Volver al Inicio
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Fund Wizard */}
      <CreateFundWizard
        isOpen={isCreateWizardOpen}
        onClose={() => setIsCreateWizardOpen(false)}
        onFundCreated={handleCreateFund}
      />

      {/* Fund Details Modal */}
      {selectedFund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-dark-700">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">{selectedFund.name}</h2>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary mt-1">{selectedFund.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedFund(null)}
                  className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">TVL</p>
                      <p className="text-lg font-semibold text-text-light dark:text-text-dark">{formatCurrency(selectedFund.tvl)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-success-600 dark:text-success-400" />
                    <div>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">APY</p>
                      <p className="text-lg font-semibold text-success-600 dark:text-success-400">{formatPercentage(selectedFund.apy)}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Manager</p>
                      <p className="text-lg font-semibold text-text-light dark:text-text-dark">{selectedFund.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Creado</p>
                      <p className="text-lg font-semibold text-text-light dark:text-text-dark">{selectedFund.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Estrategias Activas</h3>
                <div className="grid grid-cols-1 gap-3">
                  {selectedFund.strategies.map((strategy, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <p className="font-medium text-text-light dark:text-text-dark">{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  Depositar en este Fund
                </button>
                <button className="flex-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
                  Ver Historial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
