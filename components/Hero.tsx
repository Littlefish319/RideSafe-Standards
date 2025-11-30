import React from 'react';
import { Search, ShieldAlert, Globe } from 'lucide-react';

interface HeroProps {
  onStartSearching: () => void;
  onBrowse: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartSearching, onBrowse }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-20">
         <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#3b82f6" />
         </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="block">Safety Standards for</span>
            <span className="block text-blue-400">Amusement Attractions</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
            Navigate the complex world of ISO, ASTM, and EN safety protocols. 
            Use our AI-powered engine to find the exact engineering and safety standards for your ride or device.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onStartSearching}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/50"
            >
              <Search className="w-5 h-5" />
              AI Search Assistant
            </button>
            <button 
              onClick={onBrowse}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Globe className="w-5 h-5" />
              Browse Library
            </button>
          </div>
        </div>
      </div>
      
      {/* Feature Strip */}
      <div className="bg-slate-950/50 border-t border-slate-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-400 text-sm font-medium">
            <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-500" />
                <span>Risk Assessment (ISO 12100)</span>
            </div>
             <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-500" />
                <span>Global Compliance (ASTM F24)</span>
            </div>
             <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-green-500" />
                <span>Control Systems (ISO 13849)</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
