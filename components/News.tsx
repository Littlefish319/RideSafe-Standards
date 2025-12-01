import React, { useState } from 'react';
import { INDUSTRY_NEWS } from '../constants';
import { Newspaper, Calendar, Tag } from 'lucide-react';

const News: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');

  const types = ['All', 'New Standard', 'Adjustment', 'Harmonization', 'Committee'];

  const filteredNews = filterType === 'All' 
    ? INDUSTRY_NEWS 
    : INDUSTRY_NEWS.filter(item => item.type === filterType);

  const getTypeColor = (type: string) => {
    switch (type) {
        case 'New Standard': return 'bg-green-100 text-green-800';
        case 'Adjustment': return 'bg-amber-100 text-amber-800';
        case 'Harmonization': return 'bg-purple-100 text-purple-800';
        default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Newspaper className="w-8 h-8 text-blue-600" />
                Standards News Wire
            </h2>
            <p className="mt-2 text-slate-600">
                Latest updates on new publications, adjustments, and harmonization efforts.
            </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
            {types.map(t => (
                <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                        filterType === t 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                >
                    {t}
                </button>
            ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredNews.map((news) => (
            <div key={news.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${getTypeColor(news.type)}`}>
                        {news.type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {news.date}
                    </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{news.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-4">
                    {news.summary}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 border-t border-slate-100 pt-4">
                    <Tag className="w-3.5 h-3.5" />
                    Source: <span className="text-slate-900">{news.source}</span>
                </div>
            </div>
        ))}

        {filteredNews.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                No news items found for this filter.
            </div>
        )}
      </div>
    </div>
  );
};

export default News;