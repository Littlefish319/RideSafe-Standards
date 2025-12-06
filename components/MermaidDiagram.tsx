import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize once
    mermaid.initialize({ 
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
        fontFamily: 'Inter',
        flowchart: { htmlLabels: true }
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current && chart) {
          containerRef.current.innerHTML = '';
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          try {
              // 1. Clean Markdown code blocks if present
              let cleanChart = chart.replace(/```mermaid/g, '').replace(/```/g, '').trim();
              
              // 2. Remove any lingering parentheses inside node names which break mermaid
              // This is a heuristic: it replaces ( ) with [ ] or - if they are likely inside text
              // But relying on AI prompt is better. We will just try to render what we get.
              
              if (!cleanChart) return;

              const { svg } = await mermaid.render(id, cleanChart);
              if (containerRef.current) {
                  containerRef.current.innerHTML = svg;
              }
          } catch (error) {
              console.error("Mermaid rendering failed:", error);
              if (containerRef.current) {
                  containerRef.current.innerHTML = `
                    <div class="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg border border-slate-200 text-slate-500 text-sm">
                      <p class="font-semibold mb-1 text-slate-700">Visual Diagram Unavailable</p>
                      <p>The AI generated a chart structure that could not be rendered.</p>
                      <p class="text-xs mt-2 text-slate-400">Error: Syntax mismatch</p>
                    </div>
                  `;
              }
          }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div className="w-full overflow-x-auto flex justify-center p-4 bg-white rounded-lg border border-slate-100 min-h-[100px]">
      <div ref={containerRef} className="mermaid w-full text-center">
        {/* SVG will be injected here */}
      </div>
    </div>
  );
};

export default MermaidDiagram;