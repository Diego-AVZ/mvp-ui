import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TrendingUp, Plus, DollarSign, ArrowUpDown, Shield, X, Info } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  type: 'protocol' | 'fund' | 'bundle';
  tvl?: number;
  apr?: number;
  risk?: 'low' | 'medium' | 'high';
  x?: number;
  y?: number;
  color?: string;
  actions?: {
    label: string;
    icon: React.ComponentType<any>;
    value?: string;
    color: string;
  }[];
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

const DeFiGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  const nodes: Node[] = [
    { 
      id: 'flowfi', 
      name: 'FlowFi', 
      type: 'fund', 
      tvl: 7500000, 
      apr: 12.5, 
      risk: 'low',
      color: '#3b82f6',
      actions: [
        { label: 'Deposit', icon: Plus, color: 'bg-blue-500' },
        { label: 'Withdraw', icon: ArrowUpDown, color: 'bg-gray-500' },
        { label: 'View Stats', icon: TrendingUp, color: 'bg-green-500' }
      ]
    },
    { 
      id: 'uniswap', 
      name: 'UniV3 - LP', 
      type: 'protocol', 
      tvl: 2500000, 
      apr: 12.5, 
      risk: 'medium',
      color: '#10b981',
      actions: [
        { label: 'Add Liquidity', icon: Plus, color: 'bg-green-500' },
        { label: 'Claim fees', icon: DollarSign, value: '$107', color: 'bg-blue-500' },
        { label: 'Withdraw', icon: ArrowUpDown, color: 'bg-gray-500' }
      ]
    },
    { 
      id: 'aave-supply', 
      name: 'Aave Supply', 
      type: 'protocol', 
      tvl: 1800000, 
      apr: 8.2, 
      risk: 'low',
      color: '#8b5cf6',
      actions: [
        { label: 'Supply', icon: Plus, color: 'bg-purple-500' },
        { label: 'Claim Rewards', icon: DollarSign, color: 'bg-green-500' },
        { label: 'Withdraw', icon: ArrowUpDown, color: 'bg-gray-500' }
      ]
    },
    { 
      id: 'aave-borrow', 
      name: 'Aave Borrow', 
      type: 'protocol', 
      tvl: 1200000, 
      apr: 6.8, 
      risk: 'high',
      color: '#f59e0b',
      actions: [
        { label: 'Borrow', icon: ArrowUpDown, color: 'bg-orange-500' },
        { label: 'Repay', icon: Shield, color: 'bg-red-500' },
        { label: 'View Position', icon: Info, color: 'bg-blue-500' }
      ]
    },
    { 
      id: 'swap', 
      name: 'Swap', 
      type: 'protocol', 
      tvl: 500000, 
      apr: 0, 
      risk: 'low',
      color: '#ef4444',
      actions: [
        { label: 'Swap Tokens', icon: ArrowUpDown, color: 'bg-red-500' },
        { label: 'Set Slippage', icon: Shield, color: 'bg-blue-500' },
        { label: 'View Rates', icon: TrendingUp, color: 'bg-green-500' }
      ]
    },
    { 
      id: 'uniswap-lp2', 
      name: 'UniV3 - LP', 
      type: 'protocol', 
      tvl: 320000, 
      apr: 11.3, 
      risk: 'medium',
      color: '#10b981',
      actions: [
        { label: 'Add Liquidity', icon: Plus, color: 'bg-green-500' },
        { label: 'Claim fees', icon: DollarSign, value: '$45', color: 'bg-blue-500' },
        { label: 'Withdraw', icon: ArrowUpDown, color: 'bg-gray-500' }
      ]
    }
  ];

  const links: Link[] = [
    { source: 'flowfi', target: 'uniswap', strength: 0.8 },
    { source: 'flowfi', target: 'aave-supply', strength: 0.6 },
    { source: 'aave-supply', target: 'aave-borrow', strength: 0.9 },
    { source: 'aave-borrow', target: 'swap', strength: 0.6 },
    { source: 'swap', target: 'uniswap-lp2', strength: 0.8 },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    // Detect dark mode
    const isDark = document.documentElement.classList.contains('dark');

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 500;

    svg.attr('width', width).attr('height', height);

    // Create main container for zoom/pan
    const container = svg.append('g');

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).strength(0.1))
      .force('charge', d3.forceManyBody().strength((d: any) => d.id === 'flowfi' ? -800 : -500)) // FlowFi más repulsión
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.id === 'flowfi' ? 80 : 40)) // FlowFi más espacio
      .force('x', d3.forceX((d: any) => d.id === 'flowfi' ? width / 2 : d.x || width / 2).strength((d: any) => d.id === 'flowfi' ? 0.5 : 0)) // Centrar FlowFi
      .force('y', d3.forceY((d: any) => d.id === 'flowfi' ? height / 2 : d.y || height / 2).strength((d: any) => d.id === 'flowfi' ? 0.5 : 0)); // Centrar FlowFi

    // Create links with gradient
    const defs = container.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'linkGradient')
      .attr('gradientUnits', 'userSpaceOnUse');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6')
      .attr('stop-opacity', 0.8);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8b5cf6')
      .attr('stop-opacity', 0.4);

    const link = container.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', 'url(#linkGradient)')
      .attr('stroke-width', 3)
      .attr('stroke-opacity', 0.7)
      .attr('stroke-linecap', 'round');

    // Create nodes
    const node = container.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .call(d3.drag<any, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles for nodes with gradient
    node.append('circle')
      .attr('r', (d) => {
        if (d.id === 'flowfi') return 70; // FlowFi mucho más grande
        if (d.type === 'fund') return 35;
        if (d.type === 'protocol') return 30;
        return 25;
      })
      .attr('fill', (d) => d.color || '#3b82f6')
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))')
      .on('mouseover', (event, d) => {
        setHoveredNode(d);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', () => {
            if (d.id === 'flowfi') return 85; // FlowFi mucho más grande en hover
            if (d.type === 'fund') return 40;
            if (d.type === 'protocol') return 35;
            return 30;
          })
          .style('filter', 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))');
      })
      .on('mouseout', (event, d) => {
        setHoveredNode(null);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', () => {
            if (d.id === 'flowfi') return 70; // FlowFi vuelve a su tamaño normal
            if (d.type === 'fund') return 35;
            if (d.type === 'protocol') return 30;
            return 25;
          })
          .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))');
      })
      .on('click', (_, d) => {
        setSelectedNode(d);
      });

    // Add inner circles for depth
    node.append('circle')
      .attr('r', (d) => {
        if (d.id === 'flowfi') return 50; // FlowFi círculo interno mucho más grande
        if (d.type === 'fund') return 25;
        if (d.type === 'protocol') return 20;
        return 15;
      })
      .attr('fill', 'rgba(255,255,255,0.3)')
      .attr('stroke', 'none');

    // Add labels with better styling
    node.append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', 50)
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .attr('fill', isDark ? '#e5e7eb' : '#374151')
      .style('pointer-events', 'none')
      .style('text-shadow', isDark ? '0 1px 2px rgba(0,0,0,0.8)' : '0 1px 2px rgba(255,255,255,0.8)');

    // Add TVL labels
    node.append('text')
      .text((d) => d.tvl ? `$${(d.tvl / 1000000).toFixed(1)}M` : '')
      .attr('text-anchor', 'middle')
      .attr('dy', 70)
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('fill', isDark ? '#9ca3af' : '#6b7280')
      .style('pointer-events', 'none');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">DeFi Graph</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">Interactive visualization of the DeFi ecosystem</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Reset View
          </button>
          <button className="px-4 py-2 bg-gray-100 dark:bg-dark-700 text-text-light-secondary dark:text-text-dark-secondary rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-4">
        <h3 className="text-sm font-semibold text-text-light dark:text-text-dark mb-3">Legend</h3>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
            <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Protocols</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success-500 rounded-full"></div>
            <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Funds</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
            <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Bundles</span>
          </div>
        </div>
      </div>

      {/* Graph Visualization */}
      <div className="relative">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <svg 
            ref={svgRef} 
            className="w-full h-full"
            style={{ minHeight: '500px' }}
          ></svg>
          
          {/* Circular Modal for Selected Node */}
          {selectedNode && (
            <div 
              className="absolute bg-white dark:bg-dark-800 rounded-full shadow-2xl border border-gray-200 dark:border-dark-700 p-6 z-10"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '320px',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Node info */}
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: selectedNode.color }}
                >
                  {selectedNode.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-1">
                  {selectedNode.name}
                </h3>
                {selectedNode.tvl && (
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    TVL: ${(selectedNode.tvl / 1000000).toFixed(1)}M
                  </p>
                )}
                {selectedNode.apr && (
                  <p className="text-sm text-success-600 dark:text-success-400 font-medium">
                    APR: {selectedNode.apr}%
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2 w-full">
                {selectedNode.actions?.map((action, index) => (
                  <button
                    key={index}
                    className={`w-full px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${action.color}`}
                  >
                    <action.icon className="h-4 w-4" />
                    <span>{action.label}</span>
                    {action.value && (
                      <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded">
                        {action.value}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hover Info Tooltip */}
          {hoveredNode && !selectedNode && (
            <div 
              className="absolute bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 p-3 z-10"
              style={{
                left: '20px',
                top: '20px',
                maxWidth: '250px'
              }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: hoveredNode.color }}
                ></div>
                <span className="font-medium text-text-light dark:text-text-dark">
                  {hoveredNode.name}
                </span>
              </div>
              {hoveredNode.tvl && (
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  TVL: ${(hoveredNode.tvl / 1000000).toFixed(1)}M
                </p>
              )}
              {hoveredNode.apr && (
                <p className="text-sm text-success-600 dark:text-success-400">
                  APR: {hoveredNode.apr}%
                </p>
              )}
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                Click for actions
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button 
            onClick={() => setSelectedNode(null)}
            className="px-4 py-2 bg-white dark:bg-dark-800 text-text-light-secondary dark:text-text-dark-secondary rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
          >
            Reset View
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeFiGraph;
