import React from 'react';
import { Standard } from '../types';
import { BookOpen, ShieldCheck, Settings, PenTool, Activity, Factory, ChevronRight, Waves, SearchCheck } from 'lucide-react';

interface StandardCardProps {
  standard: Standard;
  onClick: (standard: Standard) => void;
}

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'Design': return <PenTool className="w-3.5 h-3.5" />;
    case 'Operations': return <Activity className="w-3.5 h-3.5" />;
    case 'Manufacturing': return <Factory className="w-3.5 h-3.5" />;
    case 'Maintenance': return <Settings className="w-3.5 h-3.5" />;
    case 'Aquatics': return <Waves className="w-3.5 h-3.5" />;
    case 'Inspection': return <SearchCheck className="w-3.5 h-3.5" />;
    case 'Safety': 
    default: return <ShieldCheck className="w-3.5 h-3.5" />;
  }
};

const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'Design': return 'bg-sky-50 text-sky-700 border-sky-100';
    case 'Operations': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'Manufacturing': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    case 'Maintenance': return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'Aquatics': return 'bg-cyan-50 text-cyan-700 border-cyan-100';
    case 'Inspection': return 'bg-violet-50 text-violet-700 border-violet-100';
    case 'Safety': 
    default: return 'bg-rose-50 text-rose-700 border-rose-100';
  }
};

const StandardCard: React.FC<StandardCardProps> = ({ standard, onClick }) => {
  return (
    <div 
      onClick={() => onClick(standard)}
      className="group bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col h-full cursor-pointer relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border ${getCategoryColor(standard.category)}`}>
          {getCategoryIcon(standard.category)}
          {standard.category || 'General'}
        </div>
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider text-right">{standard.organization}</span>
      </div>
      
      <div className="relative z-10 flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{standard.code}</h3>
        <h4 className="text-sm font-medium text-slate-600 mb-3 min-h-[40px] leading-snug">{standard.title}</h4>
        
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-2">
          {standard.description}
        </p>

        {standard.relevance && (
          <div className="mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-600">
              <span className="font-semibold text-indigo-600">Match: </span>
              {standard.relevance}
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium relative z-10">
        <span className="text-slate-400 group-hover:text-blue-600 transition-colors flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          View Details
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default StandardCard;