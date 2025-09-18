import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Plus, DollarSign, Target, Eye } from 'lucide-react';

interface FundData {
  name: string;
  description: string;
  fees: {
    rewardFee: number;
    appreciationFee: number;
    premiumAnnual?: number;
  };
  strategies: string[];
  riskLevel: 'low' | 'medium' | 'high';
  initialDeposit: number;
}

interface CreateFundWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onFundCreated: (fund: FundData) => void;
}

const CreateFundWizard: React.FC<CreateFundWizardProps> = ({ isOpen, onClose, onFundCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fundData, setFundData] = useState<FundData>({
    name: '',
    description: '',
    fees: {
      rewardFee: 8,
      appreciationFee: 2.5,
      premiumAnnual: 0
    },
    strategies: [],
    riskLevel: 'medium',
    initialDeposit: 1000
  });

  const totalSteps = 4;

  const updateFundData = (updates: Partial<FundData>) => {
    setFundData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateFund = () => {
    onFundCreated(fundData);
    onClose();
    // Reset form
    setCurrentStep(1);
    setFundData({
      name: '',
      description: '',
      fees: {
        rewardFee: 8,
        appreciationFee: 2.5,
        premiumAnnual: 0
      },
      strategies: [],
      riskLevel: 'medium',
      initialDeposit: 1000
    });
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return fundData.name.trim() !== '' && fundData.description.trim() !== '';
      case 2:
        return fundData.fees.rewardFee >= 0 && fundData.fees.appreciationFee >= 0;
      case 3:
        return fundData.strategies.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const canProceed = isStepValid(currentStep);
  const canGoBack = currentStep > 1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-dark-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Crear Nuevo Fondo</h2>
              <p className="text-primary-100 mt-1">Configura tu fondo en pocos pasos</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-primary-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps }, (_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 <= currentStep
                        ? 'bg-white text-primary-600'
                        : 'bg-primary-500 text-white'
                    }`}
                  >
                    {index + 1 < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < totalSteps - 1 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        index + 1 < currentStep ? 'bg-white' : 'bg-primary-500'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {currentStep === 1 && <Step1BasicInfo fundData={fundData} updateFundData={updateFundData} />}
          {currentStep === 2 && <Step2Fees fundData={fundData} updateFundData={updateFundData} />}
          {currentStep === 3 && <Step3Strategies fundData={fundData} updateFundData={updateFundData} />}
          {currentStep === 4 && <Step4Summary fundData={fundData} />}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-dark-700 px-6 py-4 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={!canGoBack}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              canGoBack
                ? 'bg-gray-200 dark:bg-dark-600 text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-dark-500'
                : 'bg-gray-100 dark:bg-dark-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </button>

          <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
            Paso {currentStep} de {totalSteps}
          </div>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!canProceed}
              className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                canProceed
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 dark:bg-dark-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleCreateFund}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Crear Fondo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Step 1: Basic Information
const Step1BasicInfo: React.FC<{ fundData: FundData; updateFundData: (updates: Partial<FundData>) => void }> = ({ fundData, updateFundData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">Información Básica</h3>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">
          Define el nombre y descripción de tu fondo
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
            Nombre del Fondo *
          </label>
          <input
            type="text"
            value={fundData.name}
            onChange={(e) => updateFundData({ name: e.target.value })}
            placeholder="Ej: Mi Fondo DeFi"
            className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
            Descripción *
          </label>
          <textarea
            value={fundData.description}
            onChange={(e) => updateFundData({ description: e.target.value })}
            placeholder="Describe la estrategia y objetivos de tu fondo..."
            rows={4}
            className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
            Nivel de Riesgo
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'low', label: 'Bajo', color: 'green', desc: 'Conservador' },
              { value: 'medium', label: 'Medio', color: 'yellow', desc: 'Balanceado' },
              { value: 'high', label: 'Alto', color: 'red', desc: 'Agresivo' }
            ].map(risk => (
              <button
                key={risk.value}
                onClick={() => updateFundData({ riskLevel: risk.value as 'low' | 'medium' | 'high' })}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  fundData.riskLevel === risk.value
                    ? `border-${risk.color}-500 bg-${risk.color}-50 dark:bg-${risk.color}-900/20`
                    : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500'
                }`}
              >
                <div className={`text-lg font-semibold text-${risk.color}-600 dark:text-${risk.color}-400`}>
                  {risk.label}
                </div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  {risk.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2: Fees Configuration
const Step2Fees: React.FC<{ fundData: FundData; updateFundData: (updates: Partial<FundData>) => void }> = ({ fundData, updateFundData }) => {
  const feePresets = [
    { rewardFee: 5, appreciationFee: 1.5, premiumAnnual: 0, label: 'Básico', desc: 'Para fondos pequeños' },
    { rewardFee: 8, appreciationFee: 2.5, premiumAnnual: 100, label: 'Estándar', desc: 'Recomendado' },
    { rewardFee: 12, appreciationFee: 3.5, premiumAnnual: 250, label: 'Premium', desc: 'Para fondos grandes' },
    { rewardFee: 15, appreciationFee: 5, premiumAnnual: 500, label: 'VIP', desc: 'Servicio exclusivo' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">Configuración de Fees</h3>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">
          Define las comisiones que cobrarás como manager
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Fee Presets */}
        <div>
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-3">
            Plantillas de Fees
          </label>
          <div className="grid grid-cols-2 gap-3">
            {feePresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => updateFundData({ 
                  fees: { 
                    rewardFee: preset.rewardFee, 
                    appreciationFee: preset.appreciationFee, 
                    premiumAnnual: preset.premiumAnnual 
                  } 
                })}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  fundData.fees.rewardFee === preset.rewardFee && 
                  fundData.fees.appreciationFee === preset.appreciationFee
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500'
                }`}
              >
                <div className="font-semibold text-text-light dark:text-text-dark">{preset.label}</div>
                <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-2">
                  {preset.desc}
                </div>
                <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                  Reward: {preset.rewardFee}% • Appreciation: {preset.appreciationFee}%
                  {preset.premiumAnnual > 0 && ` • Premium: $${preset.premiumAnnual}`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Fees */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-text-light dark:text-text-dark">
            Configuración Personalizada
          </label>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">
                Reward Fee (%)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={fundData.fees.rewardFee}
                onChange={(e) => updateFundData({ 
                  fees: { ...fundData.fees, rewardFee: Number(e.target.value) } 
                })}
                className="w-full px-3 py-2 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">
                Appreciation Fee (%)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={fundData.fees.appreciationFee}
                onChange={(e) => updateFundData({ 
                  fees: { ...fundData.fees, appreciationFee: Number(e.target.value) } 
                })}
                className="w-full px-3 py-2 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">
              Premium Annual ($) - Opcional
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={fundData.fees.premiumAnnual || 0}
              onChange={(e) => updateFundData({ 
                fees: { ...fundData.fees, premiumAnnual: Number(e.target.value) } 
              })}
              className="w-full px-3 py-2 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Fee Summary */}
        <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
          <h4 className="font-medium text-text-light dark:text-text-dark mb-2">Resumen de Fees</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-light-secondary dark:text-text-dark-secondary">Reward Fee:</span>
              <span className="text-text-light dark:text-text-dark">{fundData.fees.rewardFee}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-light-secondary dark:text-text-dark-secondary">Appreciation Fee:</span>
              <span className="text-text-light dark:text-text-dark">{fundData.fees.appreciationFee}%</span>
            </div>
            {fundData.fees.premiumAnnual && fundData.fees.premiumAnnual > 0 && (
              <div className="flex justify-between">
                <span className="text-text-light-secondary dark:text-text-dark-secondary">Premium Annual:</span>
                <span className="text-text-light dark:text-text-dark">${fundData.fees.premiumAnnual}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 3: Strategy Selection
const Step3Strategies: React.FC<{ fundData: FundData; updateFundData: (updates: Partial<FundData>) => void }> = ({ fundData, updateFundData }) => {
  const availableStrategies = [
    'Uniswap V3', 'Aave Lending', 'Compound', 'Curve Finance', 'Yearn Finance',
    'SushiSwap', 'Balancer', 'Delta Neutral', 'Perpetual Futures', 'Leverage Trading',
    'Options Strategies', 'Futures Arbitrage', 'Multi-Swap', 'Bitcoin Staking',
    'Ethereum Staking', 'Lido', 'Rocket Pool', 'NFT Lending', 'NFT Staking'
  ];

  const toggleStrategy = (strategy: string) => {
    const newStrategies = fundData.strategies.includes(strategy)
      ? fundData.strategies.filter(s => s !== strategy)
      : [...fundData.strategies, strategy];
    updateFundData({ strategies: newStrategies });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">Estrategias</h3>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">
          Selecciona las estrategias que utilizará tu fondo
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-3">
            Estrategias Disponibles ({fundData.strategies.length} seleccionadas)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableStrategies.map(strategy => (
              <button
                key={strategy}
                onClick={() => toggleStrategy(strategy)}
                className={`p-3 rounded-lg border-2 transition-colors text-left ${
                  fundData.strategies.includes(strategy)
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                    : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500 text-text-light dark:text-text-dark'
                }`}
              >
                <div className="text-sm font-medium">{strategy}</div>
              </button>
            ))}
          </div>
        </div>

        {fundData.strategies.length > 0 && (
          <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-primary-700 dark:text-primary-400 mb-2">
              Estrategias Seleccionadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {fundData.strategies.map(strategy => (
                <span
                  key={strategy}
                  className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full"
                >
                  {strategy}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 4: Summary
const Step4Summary: React.FC<{ fundData: FundData }> = ({ fundData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">Resumen</h3>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">
          Revisa la configuración de tu fondo antes de crearlo
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Basic Info */}
        <div className="bg-white dark:bg-dark-700 p-6 rounded-lg border border-gray-200 dark:border-dark-600">
          <h4 className="font-semibold text-text-light dark:text-text-dark mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
            Información Básica
          </h4>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Nombre:</span>
              <span className="ml-2 font-medium text-text-light dark:text-text-dark">{fundData.name}</span>
            </div>
            <div>
              <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Descripción:</span>
              <p className="mt-1 text-text-light dark:text-text-dark">{fundData.description}</p>
            </div>
            <div>
              <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Riesgo:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                fundData.riskLevel === 'low' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                fundData.riskLevel === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
              }`}>
                {fundData.riskLevel === 'low' ? 'Bajo' : fundData.riskLevel === 'medium' ? 'Medio' : 'Alto'}
              </span>
            </div>
          </div>
        </div>

        {/* Fees */}
        <div className="bg-white dark:bg-dark-700 p-6 rounded-lg border border-gray-200 dark:border-dark-600">
          <h4 className="font-semibold text-text-light dark:text-text-dark mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Configuración de Fees
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Reward Fee:</span>
              <span className="font-medium text-text-light dark:text-text-dark">{fundData.fees.rewardFee}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Appreciation Fee:</span>
              <span className="font-medium text-text-light dark:text-text-dark">{fundData.fees.appreciationFee}%</span>
            </div>
            {fundData.fees.premiumAnnual && fundData.fees.premiumAnnual > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Premium Annual:</span>
                <span className="font-medium text-text-light dark:text-text-dark">${fundData.fees.premiumAnnual}</span>
              </div>
            )}
          </div>
        </div>

        {/* Strategies */}
        <div className="bg-white dark:bg-dark-700 p-6 rounded-lg border border-gray-200 dark:border-dark-600">
          <h4 className="font-semibold text-text-light dark:text-text-dark mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Estrategias ({fundData.strategies.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {fundData.strategies.map(strategy => (
              <span
                key={strategy}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-sm rounded-full"
              >
                {strategy}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFundWizard;
