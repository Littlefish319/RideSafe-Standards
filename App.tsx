
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import AISearch from './components/AISearch';
import Browse from './components/Browse';
import Compare from './components/Compare';
import Events from './components/Events';
import News from './components/News';
import WorkDashboard from './components/WorkDashboard';
import History from './components/History';
import AuthModal from './components/AuthModal';
import StandardModal from './components/StandardModal';
import { ViewState, Standard, User, Project } from './types';
import { RollerCoaster, Search, Menu, X, BookOpen, Scale, CalendarDays, Newspaper, Copyright, CheckCircle2, Briefcase, Clock, User as UserIcon, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState<Standard | null>(null);
  
  // Auth & Project State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Load state from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('rideSafeUser');
    const savedProjects = localStorage.getItem('rideSafeProjects');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('rideSafeUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rideSafeUser');
    navigateTo('home');
  };

  const handleSaveProject = (project: Project) => {
    const updatedProjects = [project, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem('rideSafeProjects', JSON.stringify(updatedProjects));
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('rideSafeProjects', JSON.stringify(updated));
  };

  const handleLoadProject = (project: Project) => {
    setActiveProject(project);
    navigateTo('dashboard');
  };

  const handleExportProject = (project: Project) => {
    const blob = new Blob([JSON.stringify(project.report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.replace(/\s+/g, '_')}_Report.json`;
    a.click();
  };

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSelectStandard = (standard: Standard) => {
    setSelectedStandard(standard);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer group" onClick={() => navigateTo('home')}>
              <div className="p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                 <RollerCoaster className="h-6 w-6 text-blue-600" />
              </div>
              <span className="ml-2 text-xl font-bold text-slate-900 tracking-tight">RideSafe<span className="text-blue-600">AI</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <button onClick={() => navigateTo('search')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'search' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Search className="w-4 h-4" /> AI Search
              </button>
              <button onClick={() => navigateTo('dashboard')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'dashboard' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Briefcase className="w-4 h-4" /> Work Dashboard
              </button>
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              <button onClick={() => navigateTo('browse')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'browse' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                <BookOpen className="w-4 h-4" />
              </button>
              <button onClick={() => navigateTo('compare')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'compare' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Scale className="w-4 h-4" />
              </button>
              <button onClick={() => navigateTo('events')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'events' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                <CalendarDays className="w-4 h-4" />
              </button>
              <button onClick={() => navigateTo('news')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'news' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Newspaper className="w-4 h-4" />
              </button>

              <div className="ml-4 pl-4 border-l border-slate-200 flex items-center gap-2">
                 {user ? (
                   <div className="flex items-center gap-2">
                      <button onClick={() => navigateTo('history')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'history' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                        <Clock className="w-4 h-4" /> History
                      </button>
                      <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                        <LogOut className="w-4 h-4" />
                      </button>
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ml-1">
                        {user.name.charAt(0)}
                      </div>
                   </div>
                 ) : (
                   <button onClick={() => setIsAuthModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                     <UserIcon className="w-4 h-4" /> Sign In
                   </button>
                 )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-md hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full z-50">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <button onClick={() => navigateTo('dashboard')} className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                <Briefcase className="w-5 h-5" /> Work Dashboard
              </button>
              <button onClick={() => navigateTo('search')} className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                <Search className="w-5 h-5" /> AI Search
              </button>
              {user && (
                <button onClick={() => navigateTo('history')} className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                    <Clock className="w-5 h-5" /> History
                </button>
              )}
              <div className="border-t border-slate-100 my-2"></div>
              {!user ? (
                 <button onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }} className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                    <UserIcon className="w-5 h-5" /> Sign In
                 </button>
              ) : (
                 <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50">
                    <LogOut className="w-5 h-5" /> Sign Out ({user.name})
                 </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onStartSearching={() => navigateTo('search')} onBrowse={() => navigateTo('browse')} />
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">Featured Standards</h2>
                        <p className="text-slate-500 mt-2 text-lg">The most referenced documents in the amusement industry.</p>
                    </div>
                     <Browse onSelectStandard={handleSelectStandard} />
                </div>
            </div>
          </>
        )}

        {currentView === 'search' && <AISearch onSelectStandard={handleSelectStandard} />}
        {currentView === 'browse' && <Browse onSelectStandard={handleSelectStandard} />}
        {currentView === 'compare' && <Compare />}
        {currentView === 'events' && <Events />}
        {currentView === 'news' && <News />}
        
        {currentView === 'dashboard' && (
            <WorkDashboard 
                user={user} 
                onSaveProject={handleSaveProject} 
                activeProject={activeProject} 
            />
        )}
        
        {currentView === 'history' && (
            <History 
                projects={projects} 
                onLoadProject={handleLoadProject} 
                onDeleteProject={handleDeleteProject}
                onExport={handleExportProject}
            />
        )}

        {currentView === 'about' && (
          <div className="max-w-3xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">About RideSafe AI</h1>
            <div className="prose prose-slate lg:prose-lg text-slate-600">
              <p className="mb-6 leading-relaxed">
                RideSafe AI is an advanced educational tool designed to assist engineers, safety inspectors, and amusement park operators in navigating the complex landscape of international safety standards.
              </p>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8 not-prose">
                 <h3 className="text-lg font-bold text-blue-900 mb-2">Our Mission</h3>
                 <p className="text-blue-800">To make critical safety information more accessible, ensuring a safer entertainment experience for everyone worldwide.</p>
              </div>
              <p className="mb-6">
                The amusement industry relies on a rigorous framework of standards from organizations like <strong>ASTM International (Committee F24)</strong>, the <strong>European Committee for Standardization (CEN)</strong>, and <strong>ISO</strong> to ensure the safety of millions of guests annually.
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Supported Standards</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>ASTM F24</strong> - Primary US and International standards.</li>
                <li><strong>EN 13814</strong> - The European standard for amusement rides.</li>
                <li><strong>ISO 17842</strong> - Global safety standard.</li>
                <li><strong>GB 8408</strong> - The National Standard of the People's Republic of China.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Overlays */}
      {selectedStandard && <StandardModal standard={selectedStandard} onClose={() => setSelectedStandard(null)} />}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center text-white mb-6">
                 <div className="p-1.5 rounded-lg bg-blue-600 mr-3">
                   <RollerCoaster className="h-5 w-5 text-white" />
                 </div>
                <span className="text-xl font-bold">RideSafe AI</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Empowering the amusement industry with accessible, AI-driven knowledge on safety and engineering standards.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="https://www.astm.org/committee-f24" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">ASTM F24 Committee</a></li>
                <li><a href="https://www.iso.org/committee/487900.html" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">ISO/TC 254</a></li>
                <li><a href="https://www.iaapa.org/safety-security/standards-harmonization" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">IAAPA Safety</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => navigateTo('about')} className="hover:text-blue-400 transition-colors text-left">Terms of Use</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-blue-400 transition-colors text-left">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            <p className="font-semibold text-slate-300 mb-2 flex items-center justify-center gap-1">
              <Copyright className="w-3 h-3" /> 
              {new Date().getFullYear()} RideSafe AI. All rights reserved by Xiaoyu Tang @YuNova.
            </p>
            <p className="text-slate-600 max-w-2xl mx-auto mb-2">
              Made by Xiaoyu Tang @YuNova LLC. This application, its design, code structure, and original content are the intellectual property of Xiaoyu Tang. 
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
                 <p className="text-slate-700">Not affiliated with ASTM, ISO, or CEN.</p>
                 <span className="text-slate-800">•</span>
                 <p className="text-green-600 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    System Online
                 </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
