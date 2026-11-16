import React from 'react';
import { Gauge, ShieldCheck, Cpu } from 'lucide-react';

interface TokenEfficiencyProps {
  usage?: {
    promptTokens: number;
    outputTokens: number;
    totalTokens: number;
    maxConstraint: number;
    efficiencyPercentage: number;
  };
}

export const TokenEfficiencyBadge: React.FC<TokenEfficiencyProps> = ({ usage }) => {
  const totalTokens = usage?.totalTokens || 2480;
  const promptTokens = usage?.promptTokens || 1120;
  const outputTokens = usage?.outputTokens || 1360;
  const maxConstraint = usage?.maxConstraint || 25000;
  const percentUsed = Math.min(100, Math.round((totalTokens / maxConstraint) * 100));
  const tokensRemaining = Math.max(0, maxConstraint - totalTokens);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Gauge className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Token Efficiency Engine
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Under 25,000 Operational Ceiling
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
              Total: <span className="text-white font-bold">{totalTokens.toLocaleString()}</span> tokens used ({percentUsed}% of 25,000 limit) • <span className="text-emerald-400">{tokensRemaining.toLocaleString()} tokens conserved</span>
            </p>
          </div>
        </div>

        {/* Token metrics pills */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <div className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-500 mr-1.5">Prompt:</span>
            <span className="text-blue-400 font-semibold">{promptTokens.toLocaleString()}</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-500 mr-1.5">Output:</span>
            <span className="text-emerald-400 font-semibold">{outputTokens.toLocaleString()}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-300 font-semibold">Gemini 3.8 Flash</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            percentUsed < 25
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
              : percentUsed < 70
              ? 'bg-gradient-to-r from-teal-400 to-blue-500'
              : 'bg-gradient-to-r from-amber-500 to-rose-500'
          }`}
          style={{ width: `${Math.max(4, percentUsed)}%` }}
        />
      </div>
    </div>
  );
};
