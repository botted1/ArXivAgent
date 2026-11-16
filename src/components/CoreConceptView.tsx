import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Copy, Check, Flame, Zap, Brain, Layers } from 'lucide-react';

interface CoreConceptViewProps {
  coreConcept: {
    problemStatement: string;
    primaryMethodology: string;
    keyBreakthroughs: string;
    plainSummary: string;
  };
  wordCount: number;
}

export const CoreConceptView: React.FC<CoreConceptViewProps> = ({
  coreConcept,
  wordCount,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'structured' | 'plain'>('structured');

  const calculatedWordCount = wordCount || (coreConcept.plainSummary
    ? coreConcept.plainSummary.trim().split(/\s+/).length
    : (coreConcept.problemStatement + ' ' + coreConcept.primaryMethodology + ' ' + coreConcept.keyBreakthroughs).trim().split(/\s+/).length);

  const isUnderLimit = calculatedWordCount <= 300;

  const handleCopy = () => {
    const textToCopy = `=== CORE CONCEPT EXTRACTION (< 300 words) ===\n\nPROBLEM STATEMENT:\n${coreConcept.problemStatement}\n\nPRIMARY METHODOLOGY:\n${coreConcept.primaryMethodology}\n\nKEY MATHEMATICAL/ALGORITHMIC BREAKTHROUGHS:\n${coreConcept.keyBreakthroughs}\n\nPLAIN SUMMARY:\n${coreConcept.plainSummary}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl">
      {/* Header with Word Count Constraint Indicator */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <BookOpen className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              1. Core Concept Extraction
            </h3>
            <p className="text-xs text-slate-400">
              Summarized in accessible language with verified mathematical rigor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Strict Word Count Badge (< 300 words) */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${
              isUnderLimit
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {calculatedWordCount} / 300 words
            </span>
            <span className="text-[10px] opacity-75">
              {isUnderLimit ? '(Passed)' : '(Review)'}
            </span>
          </div>

          {/* Structured vs Flowing View */}
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveTab('structured')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'structured'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Structured
            </button>
            <button
              onClick={() => setActiveTab('plain')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'plain'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Plain Summary
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            title="Copy core concept"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Body Content */}
      {activeTab === 'structured' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* 1. Problem Statement */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Problem Statement</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {coreConcept.problemStatement}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
              Foundational Bottleneck
            </div>
          </div>

          {/* 2. Primary Methodology */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 font-mono uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Primary Methodology</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {coreConcept.primaryMethodology}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
              Core System Design
            </div>
          </div>

          {/* 3. Mathematical / Algorithmic Breakthroughs */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider mb-2">
                <Brain className="w-4 h-4 text-emerald-400" />
                <span>Mathematical Breakthroughs</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {coreConcept.keyBreakthroughs}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
              Algorithmic Complexity & Bounds
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 p-5 rounded-xl bg-slate-950/80 border border-slate-800">
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {coreConcept.plainSummary || `${coreConcept.problemStatement} ${coreConcept.primaryMethodology} ${coreConcept.keyBreakthroughs}`}
          </p>
        </div>
      )}
    </div>
  );
};
