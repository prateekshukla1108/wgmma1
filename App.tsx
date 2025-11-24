import React, { useState } from 'react';
import WarpDistributor from './components/WarpDistributor';
import ThreadInspector from './components/ThreadInspector';
import StMatrixVis from './components/StMatrixVis';
import PipelineFlow from './components/PipelineFlow';
import Hero from './components/Hero';
import { Section } from './types';
import { LayoutGrid, Cpu, PlayCircle, BarChart2, Microchip } from 'lucide-react';

const App: React.FC = () => {
  const [section, setSection] = useState<Section>(Section.INTRO);

  const navItems = [
    { id: Section.WARP_VIEW, label: '1. Warps (Rows)', icon: <LayoutGrid size={18} /> },
    { id: Section.THREAD_VIEW, label: '2. Threads (Cols)', icon: <Cpu size={18} /> },
    { id: Section.STMATRIX, label: '3. Reassembly', icon: <PlayCircle size={18} /> },
    { id: Section.PIPELINE, label: '4. Full Pipeline', icon: <Microchip size={18} /> },
  ];

  const renderContent = () => {
    switch (section) {
      case Section.INTRO: return <Hero onStart={() => setSection(Section.WARP_VIEW)} />;
      case Section.WARP_VIEW: return <WarpDistributor />;
      case Section.THREAD_VIEW: return <ThreadInspector />;
      case Section.STMATRIX: return <StMatrixVis />;
      case Section.PIPELINE: return <PipelineFlow />;
      default: return <Hero onStart={() => setSection(Section.WARP_VIEW)} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-chip-900 text-gray-200 overflow-hidden font-sans selection:bg-nvidia selection:text-black">
      
      {/* Sidebar Navigation */}
      {section !== Section.INTRO && (
        <nav className="w-20 lg:w-64 bg-black border-r border-chip-border flex flex-col shrink-0 transition-all duration-300">
          <div className="p-6 flex items-center gap-3 border-b border-chip-border">
             <div className="w-8 h-8 bg-nvidia rounded flex items-center justify-center font-bold text-black font-mono">H</div>
             <span className="font-bold tracking-wider hidden lg:block text-white">H100<span className="text-nvidia">VIS</span></span>
          </div>

          <div className="flex-1 py-6 flex flex-col gap-2 px-3">
             {navItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setSection(item.id as Section)}
                 className={`
                   flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group
                   ${section === item.id 
                      ? 'bg-nvidia text-black font-bold shadow-[0_0_15px_rgba(118,185,0,0.4)]' 
                      : 'text-gray-500 hover:bg-chip-800 hover:text-white'}
                 `}
               >
                 <span className={section === item.id ? 'animate-pulse' : ''}>{item.icon}</span>
                 <span className="hidden lg:block text-sm">{item.label}</span>
                 {section === item.id && <div className="ml-auto w-2 h-2 rounded-full bg-black hidden lg:block" />}
               </button>
             ))}
          </div>

          <div className="p-6 border-t border-chip-border hidden lg:block">
            <div className="text-xs text-gray-600 font-mono">
              STATUS: <span className="text-nvidia">ONLINE</span><br/>
              GPU: <span className="text-white">H100 SXM5</span><br/>
              MODE: <span className="text-white">FP32 ACCUM</span>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-gradient-to-br from-chip-900 to-black">
        {renderContent()}
      </main>

    </div>
  );
};

export default App;
