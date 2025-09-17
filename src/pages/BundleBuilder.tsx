import React, { useState } from 'react';
import { Package, Trash2, Zap, Shield, AlertTriangle } from 'lucide-react';

interface Protocol {
  id: string;
  name: string;
  type: 'dex' | 'lending' | 'yield' | 'derivatives';
  apr: number;
  risk: 'low' | 'medium' | 'high';
  icon: string;
}

interface BundleComponent {
  id: string;
  protocol: Protocol;
  weight: number;
}

const BundleBuilder: React.FC = () => {
  const [selectedProtocols, setSelectedProtocols] = useState<BundleComponent[]>([]);
  const [estimatedAPR, setEstimatedAPR] = useState(0);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');

  const availableProtocols: Protocol[] = [
    { id: 'uniswap', name: 'Uniswap V3', type: 'dex', apr: 12.5, risk: 'medium', icon: '🔄' },
    { id: 'aave', name: 'Aave', type: 'lending', apr: 8.2, risk: 'low', icon: '💰' },
    { id: 'compound', name: 'Compound', type: 'lending', apr: 6.8, risk: 'low', icon: '🏦' },
    { id: 'curve', name: 'Curve', type: 'dex', apr: 15.3, risk: 'medium', icon: '📈' },
    { id: 'yearn', name: 'Yearn', type: 'yield', apr: 18.7, risk: 'high', icon: '⚡' },
    { id: 'synthetix', name: 'Synthetix', type: 'derivatives', apr: 22.1, risk: 'high', icon: '🔮' },
  ];

  const addProtocol = (protocol: Protocol) => {
    const newComponent: BundleComponent = {
      id: `${protocol.id}-${Date.now()}`,
      protocol,
      weight: 25, // Default weight
    };
    
    const updated = [...selectedProtocols, newComponent];
    setSelectedProtocols(updated);
    calculateMetrics(updated);
  };

  const removeProtocol = (id: string) => {
    const updated = selectedProtocols.filter(comp => comp.id !== id);
    setSelectedProtocols(updated);
    calculateMetrics(updated);
  };

  const updateWeight = (id: string, weight: number) => {
    const updated = selectedProtocols.map(comp => 
      comp.id === id ? { ...comp, weight } : comp
    );
    setSelectedProtocols(updated);
    calculateMetrics(updated);
  };

  const calculateMetrics = (components: BundleComponent[]) => {
    if (components.length === 0) {
      setEstimatedAPR(0);
      setRiskLevel('low');
      return;
    }

    // Calculate weighted average APR
    const totalWeight = components.reduce((sum, comp) => sum + comp.weight, 0);
    const weightedAPR = components.reduce((sum, comp) => 
      sum + (comp.protocol.apr * comp.weight / totalWeight), 0
    );
    setEstimatedAPR(weightedAPR);

    // Calculate risk level (highest risk protocol determines overall risk)
    const maxRisk = components.reduce((max, comp) => {
      const riskValues = { low: 1, medium: 2, high: 3 };
      return Math.max(max, riskValues[comp.protocol.risk]);
    }, 0);
    
    if (maxRisk >= 3) setRiskLevel('high');
    else if (maxRisk >= 2) setRiskLevel('medium');
    else setRiskLevel('low');
  };

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20';
      case 'medium': return 'text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-900/20';
      case 'high': return 'text-error-600 dark:text-error-400 bg-error-50 dark:bg-error-900/20';
    }
  };

  const getRiskIcon = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return Shield;
      case 'medium': return AlertTriangle;
      case 'high': return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Bundle Builder</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">Create and configure DeFi strategy bundles</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Deploy Bundle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Protocols */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Available Protocols</h3>
            <div className="space-y-3">
              {availableProtocols.map((protocol) => (
                <div
                  key={protocol.id}
                  className="p-3 border border-gray-200 dark:border-dark-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors cursor-pointer"
                  onClick={() => addProtocol(protocol)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{protocol.icon}</span>
                      <div>
                        <p className="font-medium text-text-light dark:text-text-dark">{protocol.name}</p>
                        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary capitalize">{protocol.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-success-600 dark:text-success-400">{protocol.apr}%</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(protocol.risk)}`}>
                        {protocol.risk}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bundle Configuration */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Bundle Configuration</h3>
              {selectedProtocols.length > 0 && (
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Estimated APR</p>
                    <p className="text-xl font-bold text-success-600 dark:text-success-400">{estimatedAPR.toFixed(1)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Risk Level</p>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskLevel)}`}>
                      {riskLevel}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {selectedProtocols.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-text-light-secondary dark:text-text-dark-secondary mx-auto mb-4" />
                <h4 className="text-lg font-medium text-text-light dark:text-text-dark mb-2">No protocols selected</h4>
                <p className="text-text-light-secondary dark:text-text-dark-secondary">Drag protocols from the left panel to build your bundle</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedProtocols.map((component) => (
                  <div key={component.id} className="p-4 border border-gray-200 dark:border-dark-600 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{component.protocol.icon}</span>
                        <div>
                          <p className="font-medium text-text-light dark:text-text-dark">{component.protocol.name}</p>
                          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{component.protocol.apr}% APR</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeProtocol(component.id)}
                        className="p-2 text-text-light-secondary dark:text-text-dark-secondary hover:text-error-500 dark:hover:text-error-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Weight:</span>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={component.weight}
                        onChange={(e) => updateWeight(component.id, Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-12 text-right text-text-light dark:text-text-dark">{component.weight}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bundle Preview */}
          {selectedProtocols.length > 0 && (
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Bundle Preview</h3>
              <div className="bg-gradient-to-r from-primary-50 to-primary-50 dark:from-primary-900/20 dark:to-primary-900/20 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-light dark:text-text-dark">Custom Strategy Bundle</h4>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary">{selectedProtocols.length} protocols included</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success-600 dark:text-success-400">{estimatedAPR.toFixed(1)}%</p>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Estimated APR</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{selectedProtocols.length}</p>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Protocols</p>
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskLevel)}`}>
                      {React.createElement(getRiskIcon(riskLevel), { className: "h-4 w-4" })}
                      <span>{riskLevel}</span>
                    </div>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">Risk Level</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                    Deploy Bundle
                  </button>
                  <button className="flex-1 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
                    Save as Template
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BundleBuilder;
