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

export type ViewState = 'home' | 'search' | 'browse' | 'compare' | 'events' | 'news' | 'about';

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