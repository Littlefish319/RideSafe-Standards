
import React from 'react';
import { Project } from '../types';
import { FileText, Clock, ChevronRight, Download, Trash2, FolderOpen } from 'lucide-react';

interface HistoryProps {
  projects: Project[];
  onLoadProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onExport: (project: Project) => void;
}

const History: React.FC<HistoryProps> = ({ projects, onLoadProject, onDeleteProject, onExport }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Clock className="w-8 h-8 text-blue-600" />
                Project History
            </h2>
            <p className="mt-2 text-slate-600">
                Access your past engineering analyses and safety reports.
            </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium text-sm">
            {projects.length} Saved Projects
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
            <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No Projects Found</h3>
            <p className="text-slate-500 mt-2 mb-6">Start a new analysis in the Work Dashboard to save your progress.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
                <div key={project.id} className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-grow">
                        <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-1 mb-2">
                                {project.description}
                            </p>
                            <span className="text-xs font-medium text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded inline-block">
                                <Clock className="w-3 h-3" />
                                {new Date(project.dateCreated).toLocaleDateString()} at {new Date(project.dateCreated).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                        <button 
                            onClick={() => onExport(project)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Export Report"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => onDeleteProject(project.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Project"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => onLoadProject(project)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm ml-2 w-full md:w-auto justify-center"
                        >
                            Open Report
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default History;
