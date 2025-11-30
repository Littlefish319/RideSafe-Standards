import React, { useState } from 'react';
import { Search, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Standard, SearchState } from '../types';
import { searchStandardsWithAI } from '../services/geminiService';
import StandardCard from './StandardCard';

interface AISearchProps {
  onSelectStandard: (standard: Standard) => void;
}

const SUGGESTED_QUERIES = [
  "Hydraulic launch system safety",
  "Roller coaster restraint design",
  "Water slide dispatch intervals",
  "Emergency stop PL ratings (ISO)",
  "Inspection of wooden tracks"
];

const AISearch: React.FC<AISearchProps> = ({ onSelectStandard }) => {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    isLoading: false,
    error: null,
    hasSearched: false
  });

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setState(prev => ({ ...prev, query: searchQuery, isLoading: true, error: null, hasSearched: true }));

    try {
      const results = await searchStandardsWithAI(searchQuery);
      setState(prev => ({ ...prev, results, isLoading: false }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "We couldn't process your request right now. Please check your connection or try again." 
      }));
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(state.query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-600" />
          AI Standards Assistant
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          Describe the system, ride type, or safety concern. The AI will consult its knowledge base of ISO, ASTM, and CEN standards to find the most relevant documents for you.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex bg-white rounded-lg shadow-xl ring-1 ring-slate-900/5">
              <input
                type="text"
                value={state.query}
                onChange={(e) => setState(prev => ({ ...prev, query: e.target.value }))}
                placeholder="e.g. Design fatigue life analysis for steel coasters..."
                className="flex-grow px-6 py-4 text-lg bg-transparent border-none rounded-l-lg focus:ring-0 focus:outline-none placeholder-slate-400 text-slate-900"
              />
              <button
                type="submit"
                disabled={state.isLoading}
                className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-r-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {state.isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Suggestions */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
            {SUGGESTED_QUERIES.map((q, idx) => (
                <button 
                    key={idx}
                    onClick={() => performSearch(q)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 text-sm rounded-full transition-colors"
                >
                    {q}
                </button>
            ))}
        </div>
      </div>

      {/* Results Section */}
      {state.error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700 mb-8">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{state.error}</p>
        </div>
      )}

      {state.isLoading && (
        <div className="text-center py-20 animate-pulse">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h3 className="text-xl font-medium text-slate-900">Analyzing your request...</h3>
          <p className="text-slate-500 mt-1">Cross-referencing ASTM, ISO, and EN databases</p>
        </div>
      )}

      {!state.isLoading && state.hasSearched && state.results.length === 0 && !state.error && (
        <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 text-lg">No exact standards found for that specific query. Try broadening your terms.</p>
        </div>
      )}

      {!state.isLoading && state.results.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900">Recommended Standards</h3>
              <span className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {state.results.length} matches found
              </span>
           </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.results.map((std, idx) => (
              <StandardCard key={idx} standard={std} onClick={onSelectStandard} />
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p><strong>Professional Note:</strong> Always verify the latest version of these standards (e.g., -24 for 2024) directly with the issuing body (ASTM International, ISO, etc.) before applying them to engineering projects.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISearch;