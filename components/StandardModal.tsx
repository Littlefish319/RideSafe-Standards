import React, { useState } from 'react';
import { Standard } from '../types';
import { explainStandardWithAI } from '../services/geminiService';
import MermaidDiagram from './MermaidDiagram';
import { X, Sparkles, Book, FileText, Globe, CheckCircle2, Loader2, Workflow } from 'lucide-react';

interface StandardModalProps {
  standard: Standard;
  onClose: () => void;
}

const StandardModal: React.FC<StandardModalProps> = ({ standard, onClose }) => {
  const [explanation, setExplanation] = useState<string | null>(standard.aiExplanation || null);
  const [diagram, setDiagram] = useState<string | null>(standard.mermaidDiagram || null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    setIsLoading(true);
    try {
      const { explanation: text, mermaid } = await explainStandardWithAI(standard);
      setExplanation(text);
      setDiagram(mermaid);
    } catch (e) {
      setExplanation("Could not generate explanation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Book className="w-5 h-5" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-slate-900">{standard.code}</h3>
                <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{standard.organization} STANDARD</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-2 leading-snug">{standard.title}</h2>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    {standard.category || 'General'}
                </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                    <FileText className="w-4 h-4 text-slate-500" />
                    Official Description
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                    {standard.description}
                </p>
            </div>

            {standard.relevance && (
                <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-indigo-900 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                        Relevance to Your Query
                    </h4>
                    <p className="text-indigo-800 text-sm leading-relaxed">
                        {standard.relevance}
                    </p>
                </div>
            )}

            {/* AI Deep Dive Section */}
            <div className="border-t border-slate-100 pt-6">
                {!explanation ? (
                    <div className="text-center bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-blue-100 border-dashed">
                        <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                        <h4 className="text-slate-900 font-medium mb-1">Want a Deeper Analysis?</h4>
                        <p className="text-slate-500 text-sm mb-4">Use AI to generate a detailed summary and a visual flowchart of this standard.</p>
                        <button 
                            onClick={handleExplain}
                            disabled={isLoading}
                            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Generate Deep Dive
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="animate-in slide-in-from-bottom-2 duration-300 space-y-6">
                        <div>
                             <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-4">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                Key Engineering Takeaways
                            </h4>
                            <div className="prose prose-sm prose-slate bg-purple-50/50 p-5 rounded-xl border border-purple-100 text-slate-700">
                                 <div className="whitespace-pre-line">{explanation}</div>
                            </div>
                        </div>

                        {diagram && (
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-4">
                                    <Workflow className="w-4 h-4 text-emerald-500" />
                                    Visual Flowchart
                                </h4>
                                <MermaidDiagram chart={diagram} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Valid for International Use
            </span>
            <span>Always verify official documents</span>
        </div>

      </div>
    </div>
  );
};

export default StandardModal;