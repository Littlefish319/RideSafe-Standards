import React, { useState } from 'react';
import { POPULAR_STANDARDS } from '../constants';
import StandardCard from './StandardCard';
import { Standard } from '../types';
import { Filter } from 'lucide-react';

interface BrowseProps {
  onSelectStandard: (standard: Standard) => void;
}

const CATEGORIES = ['All', 'Safety', 'Design', 'Operations', 'Manufacturing'];

const Browse: React.FC<BrowseProps> = ({ onSelectStandard }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredStandards = activeCategory === 'All' 
    ? POPULAR_STANDARDS 
    : POPULAR_STANDARDS.filter(std => std.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Common Standards Library</h2>
          <p className="mt-2 text-slate-600 text-lg">
            Essential documentation for the amusement industry globally.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                        activeCategory === cat 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStandards.map((std, idx) => (
          <StandardCard key={idx} standard={std} onClick={onSelectStandard} />
        ))}
      </div>
      
      {filteredStandards.length === 0 && (
          <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              No standards found in this category.
          </div>
      )}
      
      <div className="mt-16 bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-sm border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Understanding the Organizations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
                <h4 className="text-lg font-bold text-blue-700">ASTM International (F24)</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Primary standards body for North America and widely adopted globally. Committee F24 on Amusement Rides and Devices develops standards for design, manufacturing, operation, maintenance, and inspection.
                </p>
            </div>
            <div className="space-y-3">
                <h4 className="text-lg font-bold text-blue-700">ISO (International)</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Develops global standards like ISO 17842. ISO 13849 is critical for control system safety (PL ratings) and is often referenced by both ASTM and EN standards for functional safety.
                </p>
            </div>
            <div className="space-y-3">
                <h4 className="text-lg font-bold text-blue-700">CEN (EN Standards)</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                    European standards (like EN 13814) are law in many EU countries. They tend to be highly prescriptive regarding independent design review and calculations compared to some other regions.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;