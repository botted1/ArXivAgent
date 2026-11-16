import React, { useState } from 'react';
import { StudentOpportunity, ProjectScaffold } from '../types';
import { Sparkles, Terminal, ArrowRight, Copy, Check, Target, Wrench, Calendar, Award, Code2, Loader2, FileCode, HelpCircle } from 'lucide-react';

interface StudentOpportunitiesProps {
  opportunities: StudentOpportunity[];
  paperTitle: string;
}

export const StudentOpportunities: React.FC<StudentOpportunitiesProps> = ({
  opportunities,
  paperTitle,
}) => {
  const [selectedOpp, setSelectedOpp] = useState<StudentOpportunity | null>(null);
  const [copiedBulletId, setCopiedBulletId] = useState<string | null>(null);
  const [loadingScaffoldId, setLoadingScaffoldId] = useState<string | null>(null);
  const [scaffoldData, setScaffoldData] = useState<ProjectScaffold | null>(null);
  const [activeCodeFile, setActiveCodeFile] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCopyBullet = (id: string, bullet: string) => {
    navigator.clipboard.writeText(bullet);
    setCopiedBulletId(id);
    setTimeout(() => setCopiedBulletId(null), 2000);
  };

  const handleGenerateScaffold = async (opp: StudentOpportunity) => {
    setSelectedOpp(opp);
    setLoadingScaffoldId(opp.id);
    try {
      const res = await fetch('/api/generate-scaffold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperTitle,
          opportunity: opp,
          techStack: opp.recommendedTechStack,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setScaffoldData(json.data);
      }
    } catch (err) {
      console.error('Failed to generate scaffolding:', err);
    } finally {
      setLoadingScaffoldId(null);
    }
  };

  const handleCopyFileCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Future Work & Student Internship Opportunities
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Engineered specifically for 3rd-year CS students targeting Tier-1 ML/Systems engineering internships.
          </p>
        </div>
        <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
          3 Actionable Projects
        </span>
      </div>

      {/* 3 Project Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {opportunities.map((opp, idx) => (
          <div
            key={opp.id || idx}
            className="flex flex-col justify-between bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Idea #{idx + 1}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {opp.difficulty || 'Intermediate'} • ~{opp.estimatedWeeks || 3} wks
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                {opp.title}
              </h4>

              {/* Exact Extension */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono mb-1">
                  <Target className="w-3.5 h-3.5" />
                  <span>Exact Extension</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {opp.exactExtension}
                </p>
              </div>

              {/* Targeted Performance Metric */}
              <div className="mt-3 p-3 bg-slate-950/80 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-mono mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Targeted Metric</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                  {opp.targetedMetric}
                </p>
              </div>

              {/* Recommended Tech Stack */}
              <div className="mt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 font-mono mb-2">
                  <Wrench className="w-3.5 h-3.5 text-blue-400" />
                  <span>Recommended Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {opp.recommendedTechStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resume Bullet Point */}
              {opp.resumeBullet && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                      Resume Bullet (Google XYZ Format)
                    </span>
                    <button
                      onClick={() => handleCopyBullet(opp.id, opp.resumeBullet!)}
                      className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                      title="Copy resume bullet"
                    >
                      {copiedBulletId === opp.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800/80 font-mono leading-relaxed italic">
                    "{opp.resumeBullet}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => handleGenerateScaffold(opp)}
                disabled={loadingScaffoldId === opp.id}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all disabled:opacity-50"
              >
                {loadingScaffoldId === opp.id ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing Starter Code...</span>
                  </>
                ) : (
                  <>
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Generate Scaffolding</span>
                    <ArrowRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scaffolding Modal / Code Inspector */}
      {scaffoldData && selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Terminal className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Starter Scaffolding: {selectedOpp.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Runnable implementation blueprint & interview preparation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setScaffoldData(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* File Tabs */}
            <div className="flex items-center justify-between px-6 py-2 bg-slate-950/60 border-b border-slate-800 overflow-x-auto">
              <div className="flex items-center gap-2">
                {scaffoldData.files.map((file, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCodeFile(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors ${
                      activeCodeFile === idx
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{file.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleCopyFileCode(scaffoldData.files[activeCodeFile].code)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="flex-1 overflow-auto p-6 bg-slate-950 font-mono text-xs text-slate-300">
              <pre className="whitespace-pre-wrap leading-relaxed select-all">
                {scaffoldData.files[activeCodeFile]?.code}
              </pre>
            </div>

            {/* Interview Prep Questions Footer */}
            {scaffoldData.interviewPrepQuestions && scaffoldData.interviewPrepQuestions.length > 0 && (
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Key Technical Interview Questions For This Project</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {scaffoldData.interviewPrepQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <p className="font-semibold text-slate-200 mb-1">Q: {q.question}</p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">Hint: {q.answerHint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
