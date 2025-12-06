
import React, { useState, useRef } from 'react';
import { analyzeProjectWithAI } from '../services/geminiService';
import { AnalysisReport, Project } from '../types';
import { 
  Briefcase, 
  Upload, 
  FileText, 
  Sparkles, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  Save, 
  Download,
  PenTool,
  Factory,
  Wrench,
  PlayCircle,
  ClipboardCheck,
  X
} from 'lucide-react';

interface WorkDashboardProps {
  user: any;
  onSaveProject: (project: Project) => void;
  activeProject?: Project | null;
}

const PHASES = [
    { id: 'Risk', icon: AlertTriangle, label: 'Risk Assessment', color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'Design', icon: PenTool, label: 'Design', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'Manufacture', icon: Factory, label: 'Manufacture', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'Installation', icon: Wrench, label: 'Installation', color: 'text-slate-600', bg: 'bg-slate-50' },
    { id: 'Operation', icon: PlayCircle, label: 'Operation', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'Testing', icon: ClipboardCheck, label: 'Testing', color: 'text-purple-600', bg: 'bg-purple-50' },
];

const WorkDashboard: React.FC<WorkDashboardProps> = ({ user, onSaveProject, activeProject }) => {
  // Input State
  const [description, setDescription] = useState(activeProject?.description || '');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(activeProject?.report || null);
  const [activePhase, setActivePhase] = useState('Risk');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix (e.g., "data:application/pdf;base64,")
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleAnalyze = async () => {
    if (!description.trim() && !file) {
      setError("Please provide a description or upload a document.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setReport(null);

    try {
      let base64Data = null;
      let mimeType = null;

      if (file) {
        base64Data = await convertFileToBase64(file);
        mimeType = file.type;
      }

      const result = await analyzeProjectWithAI(description, base64Data, mimeType);
      setReport(result);
      
      // Auto-save if logged in
      if (user) {
        const newProject: Project = {
            id: crypto.randomUUID(),
            title: result.projectTitle,
            description: description.substring(0, 100) + '...',
            dateCreated: new Date().toISOString(),
            report: result
        };
        onSaveProject(newProject);
      }

    } catch (err) {
      setError("Analysis failed. Please try again or check your input.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.projectTitle.replace(/\s+/g, '_')}_Report.json`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-600" />
            Engineering Work Dashboard
        </h2>
        <p className="mt-2 text-slate-600">
            Professional tool for ride analysis, standard compliance verification, and risk assessment.
        </p>
      </div>

      {!user && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                  <h4 className="font-bold text-amber-800">Guest Mode</h4>
                  <p className="text-sm text-amber-700">Please sign in to automatically save your projects and history.</p>
              </div>
          </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT SECTION */}
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    Project Inputs
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Ride Description / Parameters</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the ride type, forces, capacity, and mechanisms (e.g., 'Steel launch coaster with LSM launch, 3 inversions...')"
                            className="w-full h-40 p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Attach Documents (PDF/Images)</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                            {file ? (
                                <div className="flex items-center justify-center gap-2 text-blue-600">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                                    <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="p-1 hover:bg-blue-100 rounded-full">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-slate-500">
                                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                                    <p className="text-xs">Click to upload specification PDF or plans</p>
                                </div>
                            )}
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                accept="application/pdf,image/*" 
                                className="hidden" 
                                onChange={handleFileChange} 
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="w-full py-3 bg-slate-900 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing Specs...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                                Generate Analysis
                            </>
                        )}
                    </button>
                    {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                </div>
            </div>
        </div>

        {/* OUTPUT SECTION */}
        <div className="lg:col-span-8">
            {report ? (
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-bottom-4">
                    {/* Report Header */}
                    <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold">{report.projectTitle}</h2>
                            <p className="text-slate-400 text-sm mt-1">Generated: {new Date(report.timestamp).toLocaleString()}</p>
                        </div>
                        <button onClick={handleExport} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <Download className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Summary */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50">
                        <h4 className="font-bold text-slate-800 mb-2">Executive Summary</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{report.summary}</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex overflow-x-auto border-b border-slate-200 no-scrollbar">
                        {PHASES.map((phase) => (
                            <button
                                key={phase.id}
                                onClick={() => setActivePhase(phase.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
                                    activePhase === phase.id 
                                    ? `border-blue-600 ${phase.color} bg-white` 
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <phase.icon className="w-4 h-4" />
                                {phase.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Body */}
                    <div className="p-6 min-h-[400px]">
                        {activePhase === 'Risk' && (
                            <div className="space-y-4">
                                {report.riskAssessment.map((risk, idx) => (
                                    <div key={idx} className="bg-amber-50 rounded-lg p-5 border border-amber-100">
                                        <div className="flex items-start justify-between mb-2">
                                            <h5 className="font-bold text-amber-900">{risk.hazard}</h5>
                                            <span className="text-xs font-mono bg-white px-2 py-1 rounded text-amber-700 border border-amber-200">
                                                {risk.isoReference}
                                            </span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 mt-3">
                                            <div>
                                                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Potential Consequence</span>
                                                <p className="text-sm text-slate-700 mt-1">{risk.consequence}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Required Mitigation</span>
                                                <p className="text-sm text-slate-700 mt-1">{risk.mitigation}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {PHASES.slice(1).map((p) => {
                            if (activePhase !== p.id) return null;
                            const phaseData = report.phases.find(ph => ph.phase === p.id);
                            
                            if (!phaseData) return <div key={p.id}>No data for this phase.</div>;

                            return (
                                <div key={p.id} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                            <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-blue-500" />
                                                Applicable Standards
                                            </h5>
                                            <ul className="space-y-2">
                                                {phaseData.applicableStandards.map((std, i) => (
                                                    <li key={i} className="text-sm text-blue-700 font-medium bg-white px-3 py-2 rounded border border-blue-100 shadow-sm flex items-center gap-2">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                                                        {std}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                            <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                                                Critical Checkpoints
                                            </h5>
                                            <ul className="space-y-2">
                                                {phaseData.criticalCheckpoints.map((pt, i) => (
                                                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0"></span>
                                                        {pt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="font-bold text-slate-800 mb-3">Key Technical Requirements</h5>
                                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                                            <ul className="space-y-3">
                                                {phaseData.keyRequirements.map((req, i) => (
                                                    <li key={i} className="text-sm text-slate-700 leading-relaxed border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="h-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 min-h-[400px]">
                    <Briefcase className="w-16 h-16 mb-4 text-slate-300" />
                    <h3 className="text-lg font-semibold text-slate-600">Ready to Analyze</h3>
                    <p className="max-w-xs text-center text-sm mt-2">
                        Enter ride details and upload specs on the left to generate a comprehensive engineering report.
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default WorkDashboard;
