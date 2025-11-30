import React, { useState } from 'react';
import { POPULAR_STANDARDS } from '../constants';
import { compareStandardsWithAI } from '../services/geminiService';
import { ComparisonResult } from '../types';
import { Scale, Sparkles, Loader2, AlertCircle, Plus, Trash2, PenTool } from 'lucide-react';

const Compare: React.FC = () => {
  const [selectedStandards, setSelectedStandards] = useState<string[]>([POPULAR_STANDARDS[0].code, POPULAR_STANDARDS[2].code]);
  const [customTopic, setCustomTopic] = useState<string>('General Safety Requirements');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddStandard = () => {
    if (selectedStandards.length < 4) {
      // Find a standard not currently selected
      const available = POPULAR_STANDARDS.find(s => !selectedStandards.includes(s.code));
      if (available) {
        setSelectedStandards([...selectedStandards, available.code]);
      }
    }
  };

  const handleRemoveStandard = (index: number) => {
    if (selectedStandards.length > 2) {
      const newStds = [...selectedStandards];
      newStds.splice(index, 1);
      setSelectedStandards(newStds);
    }
  };

  const handleUpdateStandard = (index: number, value: string) => {
    const newStds = [...selectedStandards];
    newStds[index] = value;
    setSelectedStandards(newStds);
  };

  const handleCompare = async () => {
    if (!customTopic.trim()) {
        setError("Please enter a topic to compare.");
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await compareStandardsWithAI(selectedStandards, customTopic);
      setResult(data);
    } catch (err) {
      setError("Failed to generate comparison. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
          <Scale className="w-8 h-8 text-blue-600" />
          Standards Comparison Engine
        </h2>
        <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
          Compare up to 4 standards side-by-side on any specific engineering topic.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
        
        {/* Topic Input */}
        <div className="mb-8 max-w-3xl mx-auto">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                Comparison Topic
            </label>
            <input 
                type="text" 
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g., Restraint Locking Systems, Wind Load Calculations, NDT Intervals..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            <p className="text-xs text-slate-500 mt-2">Type any specific technical subject you want to analyze.</p>
        </div>

        {/* Standard Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {selectedStandards.map((selected, index) => (
            <div key={index} className="relative group">
              <label className="block text-xs font-medium text-slate-500 mb-1">Standard {index + 1}</label>
              <div className="flex gap-2">
                <select 
                    value={selected}
                    onChange={(e) => handleUpdateStandard(index, e.target.value)}
                    className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 text-sm"
                >
                    {POPULAR_STANDARDS.map((std) => (
                    <option key={std.code} value={std.code}>{std.code}</option>
                    ))}
                </select>
                {selectedStandards.length > 2 && (
                    <button 
                        onClick={() => handleRemoveStandard(index)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove standard"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
              </div>
            </div>
          ))}
          
          {selectedStandards.length < 4 && (
             <div className="flex items-end">
                <button 
                    onClick={handleAddStandard}
                    className="w-full h-[42px] border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm font-medium gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Standard
                </button>
             </div>
          )}
        </div>

        <div className="flex justify-center border-t border-slate-100 pt-6">
          <button
            onClick={handleCompare}
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Analyze Differences
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 mb-8">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Results */}
      {result && !isLoading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Executive Summary: {result.topic}</h3>
            <p className="text-slate-700 leading-relaxed">{result.summary}</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-48 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">
                        Aspect
                    </th>
                    {result.standards.map((stdName, idx) => (
                        <th key={idx} scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider min-w-[200px]">
                            {stdName}
                        </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {result.points.map((point, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-100 shadow-sm">
                          {point.aspect}
                      </td>
                      {point.values.map((val, valIdx) => (
                          <td key={valIdx} className="px-6 py-4 text-sm text-slate-600 align-top">
                              {val}
                          </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-slate-400">
            Comparison generated by AI. Always verify specific clauses in the official standard documents.
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;