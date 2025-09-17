import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Network, TrendingUp, Zap, Info } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  type: 'protocol' | 'fund' | 'bundle';
  tvl?: number;
  apr?: number;
  risk?: 'low' | 'medium' | 'high';
  x?: number;
  y?: number;
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
    { id: 'uniswap', name: 'Uniswap V3', type: 'protocol', tvl: 2500000, apr: 12.5, risk: 'medium' },
    { id: 'aave', name: 'Aave', type: 'protocol', tvl: 1800000, apr: 8.2, risk: 'low' },
    { id: 'compound', name: 'Compound', type: 'protocol', tvl: 1200000, apr: 6.8, risk: 'low' },
    { id: 'yield-fund', name: 'Yield Fund', type: 'fund', tvl: 750000, apr: 15.2, risk: 'medium' },
    { id: 'delta-fund', name: 'Delta Fund', type: 'fund', tvl: 450000, apr: 9.8, risk: 'high' },
    { id: 'liquidity-bundle', name: 'Liquidity Bundle', type: 'bundle', tvl: 320000, apr: 11.3, risk: 'medium' },
    { id: 'arbitrage-bundle', name: 'Arbitrage Bundle', type: 'bundle', tvl: 180000, apr: 7.5, risk: 'high' },
  ];

  const links: Link[] = [
    { source: 'yield-fund', target: 'uniswap', strength: 0.8 },
    { source: 'yield-fund', target: 'aave', strength: 0.6 },
    { source: 'delta-fund', target: 'uniswap', strength: 0.7 },
    { source: 'delta-fund', target: 'compound', strength: 0.5 },
    { source: 'liquidity-bundle', target: 'uniswap', strength: 0.9 },
    { source: 'arbitrage-bundle', target: 'uniswap', strength: 0.6 },
    { source: 'arbitrage-bundle', target: 'aave', strength: 0.4 },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;

    svg.attr('width', width).attr('height', height);

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).strength(0.1))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // Create nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .call(d3.drag<any, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles for nodes
    node.append('circle')
      .attr('r', (d) => {
        if (d.type === 'protocol') return 20;
        if (d.type === 'fund') return 16;
        return 12;
      })
      .attr('fill', (d) => {
        if (d.type === 'protocol') return '#3b82f6';
        if (d.type === 'fund') return '#10b981';
        return '#8b5cf6';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        setHoveredNode(d);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', () => {
            if (d.type === 'protocol') return 25;
            if (d.type === 'fund') return 20;
            return 16;
          });
      })
      .on('mouseout', (event, d) => {
        setHoveredNode(null);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('r', () => {
            if (d.type === 'protocol') return 20;
            if (d.type === 'fund') return 16;
            return 12;
          });
      })
      .on('click', (_, d) => {
        setSelectedNode(d);
      });

    // Add labels
    node.append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', 35)
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('fill', '#374151');

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

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'low': return 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20';
      case 'medium': return 'text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-900/20';
      case 'high': return 'text-error-600 dark:text-error-400 bg-error-50 dark:bg-error-900/20';
      default: return 'text-text-light-secondary dark:text-text-dark-secondary bg-gray-50 dark:bg-dark-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'protocol': return Network;
      case 'fund': return TrendingUp;
      case 'bundle': return Zap;
      default: return Info;
    }
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Graph Visualization */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
            <svg ref={svgRef} className="w-full h-full"></svg>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Hovered Node Info */}
          {hoveredNode && (
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-4">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">Node Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  {React.createElement(getTypeIcon(hoveredNode.type), { className: "h-4 w-4 text-text-light-secondary dark:text-text-dark-secondary" })}
                  <span className="font-medium text-text-light dark:text-text-dark">{hoveredNode.name}</span>
                </div>
                {hoveredNode.tvl && (
                  <div>
                    <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">TVL: </span>
                    <span className="font-semibold text-text-light dark:text-text-dark">${(hoveredNode.tvl / 1000000).toFixed(1)}M</span>
                  </div>
                )}
                {hoveredNode.apr && (
                  <div>
                    <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">APR: </span>
                    <span className="font-semibold text-success-600 dark:text-success-400">{hoveredNode.apr}%</span>
                  </div>
                )}
                {hoveredNode.risk && (
                  <div>
                    <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Risk: </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(hoveredNode.risk)}`}>
                      {hoveredNode.risk}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Selected Node Actions */}
          {selectedNode && (
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-4">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  View Details
                </button>
                {selectedNode.type === 'fund' && (
                  <button className="w-full px-3 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors text-sm">
                    Invest
                  </button>
                )}
                {selectedNode.type === 'bundle' && (
                  <button className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    Execute
                  </button>
                )}
              </div>
            </div>
          )}

          {/* My Positions */}
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-4">
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">My Positions</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Yield Fund</span>
                <span className="text-sm font-semibold text-success-600 dark:text-success-400">+8.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Liquidity Bundle</span>
                <span className="text-sm font-semibold text-success-600 dark:text-success-400">+5.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Total Value</span>
                <span className="text-sm font-semibold text-text-light dark:text-text-dark">$12,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeFiGraph;
