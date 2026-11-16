import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Cpu,
  Layers,
  FileText,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  Download,
  Share2,
  Terminal,
  BookmarkCheck,
  ShieldCheck,
  Compass,
  MessageSquare
} from 'lucide-react';
import { PaperAnalysis, PresetPaper } from './types';
import { PRESET_PAPERS } from './data/presets';
import { FALLBACK_ANALYSES } from './data/fallbackAnalyses';
import { CoreConceptView } from './components/CoreConceptView';
import { MermaidViewer } from './components/MermaidViewer';
import { StudentOpportunities } from './components/StudentOpportunities';
import { TokenEfficiencyBadge } from './components/TokenEfficiencyBadge';
import { ResearchAgentChat } from './components/ResearchAgentChat';

export default function App() {
  const [urlInput, setUrlInput] = useState<string>('https://arxiv.org/abs/1706.03762');
  const [rawTextInput, setRawTextInput] = useState<string>('');
  const [showRawInput, setShowRawInput] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<PaperAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'flowchart' | 'internships' | 'chat'>('overview');
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Initialize with the Transformer paper as baseline
  useEffect(() => {
    setAnalysis(FALLBACK_ANALYSES['transformer']);
  }, []);

  const handleAnalyze = async (overrideUrl?: string, overrideTitle?: string) => {
    const targetUrl = overrideUrl || urlInput;
    if (!targetUrl.trim() && !rawTextInput.trim() && !overrideTitle) {
      setError('Please provide a research paper URL, title, or abstract text.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    // Check if preset matches our verified preloaded data for instant response
    const matchedPreset = PRESET_PAPERS.find(
      (p) =>
        p.arxivUrl.toLowerCase() === targetUrl.trim().toLowerCase() ||
        (overrideTitle && p.title.toLowerCase() === overrideTitle.toLowerCase())
    );

    if (matchedPreset && FALLBACK_ANALYSES[matchedPreset.id]) {
      // Simulate quick token-efficient processing for instant responsiveness
      setTimeout(() => {
        setAnalysis(FALLBACK_ANALYSES[matchedPreset.id]);
        setIsAnalyzing(false);
      }, 400);
      return;
    }

    try {
      const res = await fetch('/api/analyze-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetUrl.trim(),
          rawText: rawTextInput.trim(),
          paperTitle: overrideTitle || '',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze paper');
      }

      const parsed: PaperAnalysis = {
        paperTitle: data.paperTitle,
        arxivId: data.arxivId,
        authors: data.authors,
        published: data.published,
        url: data.url,
        wordCount: data.data.wordCount,
        coreConcept: data.data.coreConcept,
        mermaidFlowchart: data.data.mermaidFlowchart,
        flowchartLabeledSegment: data.data.flowchartLabeledSegment || `[FLOWCHART]\n${data.data.mermaidFlowchart}`,
        studentOpportunities: data.data.studentOpportunities || [],
        usage: data.usage,
      };

      setAnalysis(parsed);
      setActiveTab('overview');
    } catch (err: unknown) {
      console.error('Analysis error:', err);
      const msg = err instanceof Error ? err.message : 'Analysis failed. Please check the URL or try another paper.';
      setError(msg);
      // Fallback gracefully to Transformer if error occurs
      if (!analysis) {
        setAnalysis(FALLBACK_ANALYSES['transformer']);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectPreset = (preset: PresetPaper) => {
    setUrlInput(preset.arxivUrl);
    handleAnalyze(preset.arxivUrl, preset.title);
  };

  const handleCopyFullReport = () => {
    if (!analysis) return;
    const report = `# RESEARCH PAPER ARCHITECTURE & FEASIBILITY REPORT: ${analysis.paperTitle}
Source: ${analysis.url || analysis.arxivId || 'N/A'}
Token Usage: ${analysis.usage?.totalTokens || 'N/A'} / 25,000

===================================================================
1. CORE CONCEPT EXTRACTION (< 300 words)
===================================================================
PROBLEM STATEMENT:
${analysis.coreConcept.problemStatement}

PRIMARY METHODOLOGY:
${analysis.coreConcept.primaryMethodology}

KEY MATHEMATICAL & ALGORITHMIC BREAKTHROUGHS:
${analysis.coreConcept.keyBreakthroughs}

PLAIN ACCESSIBLE SUMMARY:
${analysis.coreConcept.plainSummary}

===================================================================
2. ARCHITECTURAL FLOWCHART (Mermaid.js)
===================================================================
${analysis.flowchartLabeledSegment || `[FLOWCHART]\n${analysis.mermaidFlowchart}`}

===================================================================
3. FUTURE WORK & INTERNSHIP OPPORTUNITIES (3rd-Year CS Student)
===================================================================
${analysis.studentOpportunities
  .map(
    (o, i) => `IDEA #${i + 1}: ${o.title}
• Exact Extension: ${o.exactExtension}
• Targeted Metric: ${o.targetedMetric}
• Tech Stack: ${o.recommendedTechStack.join(', ')}
• Resume Bullet: "${o.resumeBullet}"
`
  )
  .join('\n')}
`;
    navigator.clipboard.writeText(report);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white font-mono">
                  ArXivAgent
                </span>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  CS Research Agent
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                System Architecture Parser • Mermaid.js • Resume Projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Token Budget: &lt; 25,000 Limit Enforced</span>
            </div>

            {analysis && (
              <button
                onClick={handleCopyFullReport}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
                title="Copy complete research brief"
              >
                {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedReport ? 'Copied Brief' : 'Export Brief'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Paper Input & Ingestion Engine */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-400" />
                  Academic Paper Ingestion & Architecture Extractor
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Enter an arXiv URL, paper title, or preprint link. Uses token-efficient parsing to extract core breakthroughs, Mermaid.js architectures, and student internships.
                </p>
              </div>

              <button
                onClick={() => setShowRawInput(!showRawInput)}
                className="text-xs text-blue-400 hover:text-blue-300 font-mono underline underline-offset-4"
              >
                {showRawInput ? '← Use URL Input' : '+ Paste Abstract / Paper Text'}
              </button>
            </div>

            {/* Input Form */}
            {!showRawInput ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAnalyze();
                }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="e.g., https://arxiv.org/abs/1706.03762 or arXiv:2312.00752 or paper title"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 shrink-0"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Parsing & Extracting...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Paper</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={rawTextInput}
                  onChange={(e) => setRawTextInput(e.target.value)}
                  placeholder="Paste paper abstract, introduction, or architecture description here..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  onClick={() => handleAnalyze()}
                  disabled={isAnalyzing || !rawTextInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Analyze Abstract Text</span>
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Preset Landmark Papers Quick Selector */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2">
                <BookmarkCheck className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Or Test Landmark & Recent Papers:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESET_PAPERS.map((preset) => {
                  const isCurrent = analysis?.paperTitle?.toLowerCase().includes(preset.title.toLowerCase().slice(0, 15));
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left flex items-center gap-2 ${
                        isCurrent
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="font-semibold">{preset.shortTitle}</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                        {preset.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Token Efficiency Gauge & Live Telemetry */}
        {analysis && <TokenEfficiencyBadge usage={analysis.usage} />}

        {/* Paper Header Card */}
        {analysis && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {analysis.arxivId && (
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    arXiv:{analysis.arxivId}
                  </span>
                )}
                {analysis.published && (
                  <span className="text-[11px] font-mono text-slate-400">
                    Published: {analysis.published.split('T')[0]}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {analysis.paperTitle}
              </h2>
              {analysis.authors && analysis.authors.length > 0 && (
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  Authors: {analysis.authors.join(', ')}
                </p>
              )}
            </div>

            {analysis.url && (
              <a
                href={analysis.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 text-xs font-mono border border-slate-700 transition-colors shrink-0 self-start md:self-auto"
              >
                <span>Read Full Paper</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Section Navigation Tabs */}
        {analysis && (
          <div className="flex border-b border-slate-800 gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Core Concept Extraction</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                &lt; 300 words
              </span>
            </button>

            <button
              onClick={() => setActiveTab('flowchart')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'flowchart'
                  ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>2. Architectural Flowchart</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400">
                [FLOWCHART]
              </span>
            </button>

            <button
              onClick={() => setActiveTab('internships')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'internships'
                  ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>3. Student Projects & Internships</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400">
                3 Ideas
              </span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>CS Agent Deep Dive & Q&A</span>
            </button>
          </div>
        )}

        {/* Tab Content Display */}
        {analysis && (
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <CoreConceptView
                  coreConcept={analysis.coreConcept}
                  wordCount={analysis.wordCount}
                />
                {/* Secondary preview of flowchart */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                      <Layers className="w-4 h-4 text-blue-400" />
                      Architectural Blueprint Preview
                    </h4>
                    <button
                      onClick={() => setActiveTab('flowchart')}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      <span>Interactive Fullscreen & Code View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <MermaidViewer
                    chartDefinition={analysis.mermaidFlowchart}
                    labeledSegment={analysis.flowchartLabeledSegment}
                    paperTitle={analysis.paperTitle}
                  />
                </div>
              </div>
            )}

            {activeTab === 'flowchart' && (
              <div className="space-y-4">
                <MermaidViewer
                  chartDefinition={analysis.mermaidFlowchart}
                  labeledSegment={analysis.flowchartLabeledSegment}
                  paperTitle={analysis.paperTitle}
                />
              </div>
            )}

            {activeTab === 'internships' && (
              <StudentOpportunities
                opportunities={analysis.studentOpportunities}
                paperTitle={analysis.paperTitle}
              />
            )}

            {activeTab === 'chat' && (
              <ResearchAgentChat currentAnalysis={analysis} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">ArXivAgent</span>
            <span>•</span>
            <span>CS Research Agent for Academic Papers, Flowcharts, & Student Opportunity Engineering</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Token Budget &lt; 25,000</span>
            <span>•</span>
            <span>Mermaid.js graph TD</span>
            <span>•</span>
            <span>Gemini 3.8 Flash</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
