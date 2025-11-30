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
        startOnLoad: false, // We render manually
        theme: 'neutral',
        securityLevel: 'loose',
        fontFamily: 'Inter',
        flowchart: { htmlLabels: true }
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current && chart) {
          // Clean container
          containerRef.current.innerHTML = '';
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          try {
              // Ensure chart is treated as a string and trim whitespace
              const cleanChart = chart.trim();
              if (!cleanChart) return;

              const { svg } = await mermaid.render(id, cleanChart);
              if (containerRef.current) {
                  containerRef.current.innerHTML = svg;
              }
          } catch (error) {
              console.error("Mermaid rendering failed:", error);
              if (containerRef.current) {
                  containerRef.current.innerHTML = `
                    <div class="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg border border-red-100 text-red-600 text-xs">
                      <p class="font-semibold mb-1">Diagram Error</p>
                      <p>Unable to render flow chart due to syntax issue.</p>
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