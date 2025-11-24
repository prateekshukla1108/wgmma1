import React, { useState, useMemo } from 'react';
import { getThreadMapping } from '../constants';
import { Grid3X3, Cpu, Info } from 'lucide-react';

const ThreadInspector: React.FC = () => {
  const [activeThread, setActiveThread] = useState<number>(0);
  
  // Warp 0 Dimensions: 16 Rows x 8 Cols
  const rows = Array.from({ length: 16 }, (_, i) => i);
  const cols = Array.from({ length: 8 }, (_, i) => i);

  const threadMap = useMemo(() => getThreadMapping(activeThread), [activeThread]);

  const isOwned = (r: number, c: number) => {
    return threadMap.find(reg => reg.row === r && reg.col === c);
  };

  return (
    <div className="flex flex-col h-full w-full p-4 lg:p-6 animate-fade-in">
       <div className="mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Grid3X3 className="text-nvidia" />
          Level 2: The Thread Shuffle
        </h2>
        <p className="text-gray-400 mt-2">
          Inside <strong>Warp 0</strong> (Rows 0-15), data is not stored linearly. 
          Use the slider to see how a single thread holds a "strided" fragment of the matrix.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        
        {/* Left Control Panel */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          <div className="bg-chip-800 p-6 rounded-xl border border-chip-border shadow-lg">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 block">
              Select Thread ID
            </label>
            <div className="flex items-center gap-4 mb-2">
              <Cpu className="text-nvidia" size={20} />
              <span className="text-3xl font-mono text-white">T{activeThread}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="31" 
              value={activeThread} 
              onChange={(e) => setActiveThread(Number(e.target.value))}
              className="w-full h-2 bg-chip-700 rounded-lg appearance-none cursor-pointer accent-nvidia hover:accent-nvidia-glow"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
              <span>0</span>
              <span>15</span>
              <span>31</span>
            </div>
          </div>

          <div className="bg-chip-800 p-6 rounded-xl border border-chip-border flex-1">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-nvidia"></span>
              Local Register File
            </h3>
            <div className="space-y-2">
              {threadMap.map((reg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-chip-900 rounded border border-gray-800 font-mono text-sm hover:border-nvidia/50 transition-colors">
                  <span className="text-nvidia font-bold">{reg.regName}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-white bg-chip-700 px-2 py-0.5 rounded">
                    [{reg.row}, {reg.col}]
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded text-sm text-yellow-200/80 flex gap-2">
              <Info className="shrink-0 w-4 h-4 mt-0.5" />
              <p>Note the stride: <strong>R0</strong> holds Row {threadMap[0].row}, while <strong>R2</strong> holds Row {threadMap[2].row} (8 rows down).</p>
            </div>
          </div>
        </div>

        {/* Right Visualization Grid */}
        <div className="flex-1 bg-chip-900 p-1 rounded-xl border border-chip-border relative overflow-hidden flex flex-col">
          {/* Header row labels */}
          <div className="absolute top-2 right-4 text-xs font-mono text-gray-600">Warp 0: 16x8 Fragment</div>

          <div className="flex-1 p-4 overflow-auto">
             <div 
              className="grid gap-1 mx-auto"
              style={{
                gridTemplateColumns: `30px repeat(8, minmax(30px, 1fr))`,
                gridTemplateRows: `30px repeat(16, 30px)`
              }}
             >
                {/* Column Headers */}
                <div className="font-mono text-xs text-gray-500 flex items-center justify-center"></div>
                {cols.map(c => (
                  <div key={`head-${c}`} className="font-mono text-xs text-gray-500 flex items-center justify-center bg-chip-800 rounded">
                    {c}
                  </div>
                ))}

                {/* Rows */}
                {rows.map(r => (
                  <React.Fragment key={`row-${r}`}>
                    {/* Row Header */}
                    <div className="font-mono text-xs text-gray-500 flex items-center justify-center bg-chip-800 rounded">
                      {r}
                    </div>
                    {/* Cells */}
                    {cols.map(c => {
                      const ownership = isOwned(r, c);
                      return (
                        <div 
                          key={`${r}-${c}`}
                          className={`
                            rounded flex items-center justify-center text-[10px] font-mono border transition-all duration-300
                            ${ownership 
                              ? 'bg-nvidia text-black font-bold border-nvidia-glow scale-110 shadow-[0_0_10px_rgba(118,185,0,0.6)] z-10' 
                              : 'bg-chip-800 border-chip-700 text-gray-700 hover:bg-chip-700'}
                          `}
                        >
                          {ownership ? ownership.regName : ''}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
             </div>
          </div>
          
          <div className="p-4 border-t border-chip-border bg-chip-800/50 backdrop-blur text-xs text-gray-400 flex justify-between">
             <span>Grid represents the logical matrix layout.</span>
             <span>Colored cells represent data physically held in T{activeThread}'s registers.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadInspector;
