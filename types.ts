
export interface Standard {
  code: string;
  title: string;
  organization: string;
  description: string;
  relevance?: string; // Used in search results to explain why it matches
  category?: 'Safety' | 'Design' | 'Operations' | 'Manufacturing' | 'Maintenance' | 'Inspection' | 'Aquatics';
  aiExplanation?: string; // For the deep dive feature
  mermaidDiagram?: string; // For the visual flowchart
}

export interface IndustryEvent {
  id: string;
  title: string;
  organization: string;
  date: string;
  location: string;
  address: string;
  coordinates: [number, number]; // [lat, lng]
  description: string;
  website: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  source: string;
  summary: string;
  type: 'New Standard' | 'Adjustment' | 'Harmonization' | 'Committee';
}

export type ViewState = 'home' | 'search' | 'browse' | 'compare' | 'events' | 'news' | 'about' | 'dashboard' | 'history';

export interface SearchState {
  query: string;
  results: Standard[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export interface ComparisonPoint {
  aspect: string;
  values: string[]; // Array of values corresponding to the standards
}

export interface ComparisonResult {
  standards: string[]; // List of standard names being compared
  topic: string;
  summary: string;
  points: ComparisonPoint[];
}

// --- NEW TYPES FOR WORK DASHBOARD ---

export interface Risk {
  hazard: string;
  consequence: string;
  mitigation: string;
  isoReference: string; // e.g. ISO 12100 5.4
}

export interface PhaseAnalysis {
  phase: 'Design' | 'Manufacture' | 'Installation' | 'Operation' | 'Testing';
  applicableStandards: string[]; // e.g. ["ASTM F2291-24 Sec 6", "EN 13814-1"]
  keyRequirements: string[];
  criticalCheckpoints: string[];
}

export interface AnalysisReport {
  projectTitle: string;
  summary: string;
  riskAssessment: Risk[];
  phases: PhaseAnalysis[];
  timestamp: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  report: AnalysisReport;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPro?: boolean;
}
