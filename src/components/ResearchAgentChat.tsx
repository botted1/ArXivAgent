import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Code, HelpCircle, Layers } from 'lucide-react';
import { PaperAnalysis } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ResearchAgentChatProps {
  currentAnalysis: PaperAnalysis | null;
}

export const ResearchAgentChat: React.FC<ResearchAgentChatProps> = ({ currentAnalysis }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I am your Computer Science Research Agent. I've indexed "${currentAnalysis?.paperTitle || 'the paper'}". Ask me anything about tensor dimensions, mathematical intuition, memory bottlenecks (SRAM vs HBM), or how to defend this project in a technical interview!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const newMsgs: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs,
          paperContext: {
            title: currentAnalysis?.paperTitle,
            coreConcept: currentAnalysis?.coreConcept,
            opportunities: currentAnalysis?.studentOpportunities,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Apologies, I encountered an issue processing that query.' },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection issue while communicating with research agent.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    'Explain the tensor shapes flowing through the core layer',
    'What hardware bottleneck makes this faster or slower on GPUs?',
    'What is a common pitfall when implementing this in PyTorch?',
    'How should I explain this architecture in a Google SWE interview?',
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col h-[560px]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Bot className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-white">CS Research Agent Deep-Dive</h3>
            <p className="text-xs text-slate-400">
              Interactive Q&A for systems engineering, equations, and code implementation
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Ready
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 text-xs leading-relaxed ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`p-3.5 rounded-xl max-w-[85%] ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white font-sans'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-200 font-sans'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
            {m.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 text-xs text-slate-400 items-center">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 font-mono text-xs">
              Synthesizing response with token efficiency...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-2 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about equations, hardware complexity, or PyTorch gotchas..."
          disabled={loading}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
