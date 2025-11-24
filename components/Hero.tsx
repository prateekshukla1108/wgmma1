import React from 'react';
import { Play } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">
       {/* Background Grid Effect */}
       <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
       <div className="scanline"></div>

       <div className="z-10 max-w-4xl">
         <div className="inline-block px-3 py-1 bg-nvidia/10 border border-nvidia rounded-full text-nvidia text-xs font-mono mb-6 animate-bounce">
            NVIDIA HOPPER H100 ARCHITECTURE
         </div>
         
         <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
           THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-nvidia to-emerald-400">BLACK BOX</span>
         </h1>
         
         <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
           You issued <code className="text-nvidia bg-chip-800 px-2 py-1 rounded">wgmma.mma_async</code>. 
           Your data is now exploded across 128 threads.
           <br />
           <span className="text-white font-bold">Where is your result?</span>
         </p>

         <button 
           onClick={onStart}
           className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded overflow-hidden transition-transform hover:scale-105 active:scale-95"
         >
            <span className="relative z-10 flex items-center gap-2">
              ENTER THE ACCUMULATOR <Play size={20} fill="currentColor" />
            </span>
            <div className="absolute inset-0 bg-nvidia transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
         </button>
       </div>

       <div className="absolute bottom-8 text-gray-600 text-xs font-mono">
         DISTRIBUTED_SHARDING_VISUALIZER_V1.0
       </div>
    </div>
  );
};

export default Hero;
