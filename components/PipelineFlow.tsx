import React from 'react';

const PipelineFlow: React.FC = () => {
  const steps = [
    { title: 'HBM', desc: 'Global Memory', icon: '🌍' },
    { title: 'TMA Load', desc: 'Async Copy', icon: '🚛' },
    { title: 'SMEM', desc: 'Shared Mem', icon: '📦' },
    { title: 'WGMMA', desc: 'Tensor Op', icon: '⚡' },
    { title: 'REGISTERS', desc: 'Sharded Result', icon: '🧩', active: true },
    { title: 'STMATRIX', desc: 'Reassembly', icon: '🔧' },
    { title: 'SMEM', desc: 'Contiguous', icon: '📦' },
    { title: 'TMA Store', desc: 'Async Write', icon: '🚛' },
    { title: 'HBM', desc: 'Global Memory', icon: '🌍' },
  ];

  return (
    <div className="flex flex-col h-full w-full p-6 animate-fade-in overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">The Hopper Data Pipeline</h2>
        <p className="text-gray-400">From math to memory: The lifecycle of a tile.</p>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-x-auto pb-8">
        <div className="flex gap-4 min-w-max px-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center">
              <div className={`
                flex flex-col items-center justify-center w-32 h-32 rounded-2xl border-2 transition-all duration-300
                ${step.active 
                  ? 'bg-nvidia/10 border-nvidia shadow-[0_0_20px_rgba(118,185,0,0.3)] scale-110 z-10' 
                  : 'bg-chip-800 border-chip-border text-gray-500 hover:border-gray-500'}
              `}>
                <span className="text-3xl mb-2">{step.icon}</span>
                <span className={`font-bold font-mono text-sm ${step.active ? 'text-white' : ''}`}>{step.title}</span>
                <span className="text-[10px] uppercase tracking-wider mt-1 opacity-70">{step.desc}</span>
              </div>
              
              {idx < steps.length - 1 && (
                <div className="w-8 h-1 bg-gray-800 mx-2 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gray-600 w-full animate-pulse-slow"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineFlow;
