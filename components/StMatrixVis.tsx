import React, { useState, useEffect } from 'react';
import { ArrowRight, Database, RefreshCw, CheckCircle } from 'lucide-react';
import { getThreadMapping } from '../constants';

const StMatrixVis: React.FC = () => {
  const [status, setStatus] = useState<'SHARDED' | 'MOVING' | 'ASSEMBLED'>('SHARDED');
  
  // We will simulate a small patch (4x4) from the top corner to keep animation performant but illustrative
  // In reality, it handles the whole 16x8 tile per warp.
  // Let's visualize the "Data Packets" moving from Threads to SMEM.
  
  // Generating dummy data representing fragments
  const fragments = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    threadId: i, // Threads 0-7
    color: `hsl(${100 + i * 20}, 70%, 50%)`, // Varied green/teal hues
    regs: getThreadMapping(i)
  }));

  const handleAssemble = () => {
    setStatus('MOVING');
    setTimeout(() => {
      setStatus('ASSEMBLED');
    }, 1500);
  };

  const handleReset = () => {
    setStatus('SHARDED');
  };

  return (
    <div className="flex flex-col h-full w-full p-6 animate-fade-in relative overflow-hidden">
      <div className="mb-8 z-10">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Database className="text-nvidia" />
          The Cleanup: STMATRIX
        </h2>
        <p className="text-gray-400 mt-2 max-w-3xl">
          The Distributed Accumulator is useless in its sharded form. 
          The <code className="bg-chip-800 px-2 py-1 rounded text-nvidia font-mono border border-gray-700">stmatrix.sync.aligned.m8n8.x4</code> instruction 
          acts as an "Auto-Assembler", taking specific register fragments and writing them to calculated offsets in Shared Memory.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16 z-10">
        
        {/* Left: Registers (Sharded) */}
        <div className="w-full md:w-1/3 h-96 border-2 border-dashed border-gray-700 rounded-xl p-4 flex flex-col items-center relative bg-chip-900/50">
          <h3 className="text-gray-400 font-mono mb-4 text-sm uppercase tracking-widest">Register File (Distributed)</h3>
          
          <div className="grid grid-cols-4 gap-2 w-full h-full content-center">
            {fragments.map((frag) => (
               <div 
                 key={frag.id} 
                 className={`
                    h-12 rounded border border-gray-600 flex flex-col items-center justify-center text-[10px] font-mono text-white transition-all duration-1000
                    ${status === 'MOVING' ? 'opacity-0 scale-50' : 'opacity-100'}
                    ${status === 'ASSEMBLED' ? 'opacity-0' : ''}
                 `}
                 style={{ backgroundColor: status === 'SHARDED' ? frag.color : 'transparent' }}
               >
                 <span>T{frag.threadId}</span>
                 <span className="opacity-70">R0..R3</span>
               </div>
            ))}
          </div>
        </div>

        {/* Center: Instruction Control */}
        <div className="flex flex-col items-center gap-4">
          <ArrowRight className={`text-gray-600 w-12 h-12 transition-all duration-500 ${status === 'MOVING' ? 'text-nvidia translate-x-2 scale-110' : ''}`} />
          
          <button 
            onClick={status === 'ASSEMBLED' ? handleReset : handleAssemble}
            disabled={status === 'MOVING'}
            className={`
              px-8 py-3 rounded-full font-bold font-mono transition-all flex items-center gap-2
              ${status === 'MOVING' ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 
                status === 'ASSEMBLED' ? 'bg-chip-700 text-white hover:bg-chip-600 ring-2 ring-gray-500' :
                'bg-nvidia text-black hover:bg-nvidia-glow hover:scale-105 shadow-[0_0_20px_rgba(118,185,0,0.4)]'}
            `}
          >
            {status === 'ASSEMBLED' ? (
              <> <RefreshCw size={18} /> RESET </>
            ) : (
              <> <Database size={18} /> EXECUTE STMATRIX </>
            )}
          </button>
          
          <div className={`font-mono text-xs transition-opacity duration-300 ${status === 'MOVING' ? 'opacity-100 text-nvidia animate-pulse' : 'opacity-0'}`}>
            Descrambling Addresses...
          </div>
        </div>

        {/* Right: SMEM (Contiguous) */}
        <div className={`w-full md:w-1/3 h-96 border-2 rounded-xl p-4 flex flex-col items-center relative transition-colors duration-1000 ${status === 'ASSEMBLED' ? 'border-nvidia bg-nvidia/5' : 'border-gray-700 bg-chip-900/50'}`}>
          <h3 className={`font-mono mb-4 text-sm uppercase tracking-widest transition-colors ${status === 'ASSEMBLED' ? 'text-nvidia font-bold' : 'text-gray-400'}`}>
            Shared Memory (Linear)
          </h3>

          {status === 'ASSEMBLED' && (
             <div className="absolute top-4 right-4 text-nvidia animate-fade-in">
                <CheckCircle size={20} />
             </div>
          )}

          <div className="grid grid-cols-4 gap-1 w-full h-full content-center p-4 bg-black/20 rounded-lg">
             {/* Simulating the assembled matrix grid */}
             {Array.from({length: 32}).map((_, i) => (
                <div 
                  key={i}
                  className={`
                    rounded border border-gray-800 flex items-center justify-center text-[8px] text-gray-500 font-mono transition-all duration-500
                    ${status === 'ASSEMBLED' ? 'bg-nvidia/20 border-nvidia/30 text-nvidia scale-100' : 'scale-90 opacity-0'}
                  `}
                  style={{ transitionDelay: `${i * 10}ms` }}
                >
                  [{Math.floor(i/4)}, {i%4}]
                </div>
             ))}
          </div>
        </div>

      </div>
      
      {/* Visual flair background particles */}
      {status === 'MOVING' && (
         <div className="absolute inset-0 pointer-events-none">
           {Array.from({length: 20}).map((_, i) => (
             <div 
                key={i}
                className="absolute h-1 w-8 bg-nvidia rounded-full animate-ping opacity-20"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${30 + Math.random() * 40}%`,
                  animationDuration: `${0.5 + Math.random()}s`
                }}
             />
           ))}
         </div>
      )}
    </div>
  );
};

export default StMatrixVis;
