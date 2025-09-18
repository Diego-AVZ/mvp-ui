import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Star, ArrowRight } from 'lucide-react';
import type { Fund } from '../types';

interface RecommendedFundsCarouselProps {
  funds: Fund[];
}

const RecommendedFundsCarousel: React.FC<RecommendedFundsCarouselProps> = ({ funds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Tomar solo los primeros 3 fondos como recomendados
  const recommendedFunds = funds.slice(0, 3);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendedFunds.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recommendedFunds.length) % recommendedFunds.length);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Fondos Recomendados</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-text-light dark:text-text-dark" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-text-light dark:text-text-dark" />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {recommendedFunds.map((fund) => (
            <div key={fund.id} className="w-full flex-shrink-0">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 rounded-2xl border border-primary-200 dark:border-primary-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Fund Info */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                          Recomendado
                        </span>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-sm font-medium rounded-full">
                          {fund.status === 'active' ? 'Activo' : 'Pausado'}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
                        {fund.name}
                      </h3>
                      <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary">
                        {fund.description}
                      </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-dark-800 p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-success-600 dark:text-success-400" />
                          <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">APY</span>
                        </div>
                        <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                          {formatPercentage(fund.apy)}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-dark-800 p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="h-4 w-4 bg-primary-600 rounded-full"></div>
                          <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">TVL</span>
                        </div>
                        <div className="text-2xl font-bold text-text-light dark:text-text-dark">
                          {formatCurrency(fund.tvl)}
                        </div>
                      </div>
                    </div>

                    {/* Manager */}
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {fund.manager.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Gestionado por</p>
                        <p className="font-semibold text-text-light dark:text-text-dark">{fund.manager}</p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="relative">
                    <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-lg">
                      <h4 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
                        Estrategias Activas
                      </h4>
                      <div className="space-y-3">
                        {fund.strategies.slice(0, 3).map((strategy, strategyIndex) => (
                          <div key={strategyIndex} className="flex items-center space-x-3">
                            <div className="h-2 w-2 bg-primary-600 rounded-full"></div>
                            <span className="text-text-light dark:text-text-dark">{strategy}</span>
                          </div>
                        ))}
                        {fund.strategies.length > 3 && (
                          <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                            +{fund.strategies.length - 3} más estrategias
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-end">
                  <button className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors flex items-center space-x-2 group">
                    <span>Ver Detalles</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {recommendedFunds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-primary-600' 
                : 'bg-gray-300 dark:bg-dark-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedFundsCarousel;
