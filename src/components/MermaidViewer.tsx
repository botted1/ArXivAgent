import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, RotateCcw, Copy, Check, Download, Code, Eye, Maximize2, Minimize2, AlertCircle } from 'lucide-react';

interface MermaidViewerProps {
  chartDefinition: string;
  labeledSegment: string;
  paperTitle: string;
}

export const MermaidViewer: React.FC<MermaidViewerProps> = ({
  chartDefinition,
  labeledSegment,
  paperTitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [renderError, setRenderError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'diagram' | 'code'>('diagram');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Clean and prepare chart string
  const cleanChart = (raw: string): string => {
    let text = raw.trim();
    // Strip markdown code fences if present
    text = text.replace(/```(?:mermaid)?/gi, '').replace(/```/g, '').trim();
    // Ensure it starts with graph TD or flowchart TD
    if (!text.startsWith('graph') && !text.startsWith('flowchart')) {
      text = 'graph TD\n' + text;
    }
    return text;
  };

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      themeVariables: {
        darkMode: true,
        background: '#090d16',
        primaryColor: '#3b82f6',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: '#60a5fa',
        lineColor: '#94a3b8',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a',
        edgeLabelBackground: '#1e293b',
        nodeBorder: '#38bdf8',
        mainBkg: '#0f172a',
      },
    });

    const renderChart = async () => {
      if (!chartDefinition) return;
      try {
        setRenderError(null);
        const cleaned = cleanChart(chartDefinition);
        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(uniqueId, cleaned);
        setSvgContent(svg);
      } catch (err: unknown) {
        console.warn('Mermaid render error:', err);
        const msg = err instanceof Error ? err.message : 'Syntax error in architecture diagram';
        setRenderError(msg);
      }
    };

    renderChart();
  }, [chartDefinition]);

  const handleCopyCode = () => {
    const textToCopy = labeledSegment || `[FLOWCHART]\n${cleanChart(chartDefinition)}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paperTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-architecture.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition-all shadow-xl ${isFullscreen ? 'fixed inset-4 z-50 flex flex-col bg-slate-950/98 backdrop-blur-md' : 'w-full'}`}>
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
            [FLOWCHART] Mermaid.js Architecture
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            graph TD
          </span>
        </div>

        {/* View Mode & Controls */}
        <div className="flex items-center gap-1.5">
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 mr-2">
            <button
              onClick={() => setViewMode('diagram')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'diagram'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Rendered Diagram"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Diagram</span>
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'code'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Raw Mermaid Syntax"
            >
              <Code className="w-3.5 h-3.5" />
              <span>[FLOWCHART] Syntax</span>
            </button>
          </div>

          {viewMode === 'diagram' && (
            <>
              <button
                onClick={() => setZoom((prev) => Math.min(prev + 0.2, 2.5))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.5))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            title="Copy [FLOWCHART] string"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
            <span>{isCopied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            disabled={!svgContent}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-40"
            title="Export SVG"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main View Body */}
      <div className={`relative overflow-auto p-6 ${isFullscreen ? 'flex-1 min-h-[500px]' : 'min-h-[420px] max-h-[640px]'}`}>
        {viewMode === 'diagram' ? (
          renderError ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <AlertCircle className="w-10 h-10 text-amber-400 mb-3" />
              <p className="text-sm font-semibold text-slate-200">Mermaid Render Notice</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
                {renderError}
              </p>
              <button
                onClick={() => setViewMode('code')}
                className="mt-3 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium"
              >
                Inspect Raw Syntax
              </button>
            </div>
          ) : svgContent ? (
            <div
              ref={containerRef}
              className="flex justify-center items-center transition-transform duration-150 origin-top"
              style={{ transform: `scale(${zoom})` }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-500 text-sm">
              Rendering architectural graph...
            </div>
          )
        ) : (
          <div className="font-mono text-xs">
            <div className="text-emerald-400 font-bold mb-2">[FLOWCHART]</div>
            <pre className="p-4 bg-slate-900/90 text-cyan-300 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
              {cleanChart(chartDefinition)}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="font-mono">
          Flowchart charts data inputs, tensor dims, model layers, and data outputs.
        </span>
        <span className="font-mono text-slate-400">
          Scale: {Math.round(zoom * 100)}%
        </span>
      </div>
    </div>
  );
};
