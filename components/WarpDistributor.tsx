import React, { useState } from 'react';
import { WARPS } from '../constants';
import { Layers, ChevronRight, Box } from 'lucide-react';

const WarpDistributor: React.FC = () => {
  const [activeWarp, setActiveWarp] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full w-full p-6 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Layers className="text-nvidia" />
          Level 1: The Warp Divide
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl">
          The <span className="text-white font-mono">64xN</span> output matrix is too large for a single processing unit. 
          The hardware splits the 64 rows into 4 chunks. Each chunk is owned by a single <strong>Warp</strong> (32 threads).
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Visual Stack */}
        <div className="flex flex-col gap-1 w-full max-w-md relative group">
          <div className="absolute -left-12 top-0 h-full flex flex-col justify-between py-4 text-xs text-gray-500 font-mono">
            <span>Row 0</span>
            <span>Row 63</span>
          </div>
          
          {WARPS.map((warp) => (
            <div
              key={warp.id}
              onMouseEnter={() => setActiveWarp(warp.id)}
              onMouseLeave={() => setActiveWarp(null)}
              className={`
                h-24 w-full border-2 rounded-lg flex items-center justify-between px-6 cursor-pointer transition-all duration-300
                ${activeWarp === warp.id ? 'border-nvidia bg-nvidia/10 scale-105 z-10 shadow-[0_0_15px_rgba(118,185,0,0.3)]' : 'border-chip-border bg-chip-800 hover:border-gray-500'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded flex items-center justify-center font-bold text-xl bg-chip-900 ${warp.color}`}>
                  W{warp.id}
                </div>
                <div>
                  <div className={`font-mono text-sm ${warp.color}`}>Rows {warp.rowStart} - {warp.rowEnd}</div>
                  <div className="text-xs text-gray-500">32 Threads</div>
                </div>
              </div>
              <ChevronRight className={`transition-transform duration-300 ${activeWarp === warp.id ? 'translate-x-2 text-nvidia' : 'text-gray-700'}`} />
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <div className="flex-1 bg-chip-800 border border-chip-border rounded-xl p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          {activeWarp !== null ? (
            <div className="relative z-10 animate-fade-in-up">
              <h3 className={`text-2xl font-bold mb-4 ${WARPS[activeWarp].color}`}>Warp {activeWarp} Analysis</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-white">Ownership:</strong> This warp strictly owns rows <span className="font-mono bg-chip-900 px-2 py-0.5 rounded border border-gray-700">{WARPS[activeWarp].rowStart}</span> through <span className="font-mono bg-chip-900 px-2 py-0.5 rounded border border-gray-700">{WARPS[activeWarp].rowEnd}</span>.
                </p>
                <p>
                  <strong className="text-white">Isolation:</strong> Threads in Warp {activeWarp} cannot access data from rows owned by other warps without writing to shared memory first.
                </p>
                <div className="p-4 bg-chip-900 rounded border border-dashed border-gray-600 mt-6">
                  <div className="text-xs text-gray-500 uppercase mb-2 tracking-wider">Accumulator Fragment</div>
                  <div className="font-mono text-sm">
                    Shape: [16, 8] (FP32) or [16, 16] (FP16)<br/>
                    Total Registers: 128 (4 per thread)<br/>
                    Status: <span className="text-red-400">SHARDED</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-600">
              <Box size={64} className="mb-4 opacity-20" />
              <p>Hover over a Warp block to inspect details</p>
            </div>
          )}
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-32 bg-nvidia/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default WarpDistributor;
