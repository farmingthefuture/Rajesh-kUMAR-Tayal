import React, { useState } from 'react';
import { MessageSquare, Calendar, ChevronRight, Sparkles, Clock, RefreshCw, Eye } from 'lucide-react';
import { ChatSession } from '../types';

interface HistoryAIProps {
  sessions: ChatSession[];
  onSelectSession: (session: ChatSession) => void;
  activeSessionId?: string;
}

export default function HistoryAI({
  sessions,
  onSelectSession,
  activeSessionId,
}: HistoryAIProps) {
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(
    sessions.length > 0 ? sessions[0] : null
  );

  const handleSelect = (session: ChatSession) => {
    setSelectedSession(session);
    onSelectSession(session);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full animate-fade-in text-[#1A1A1A]">
      {/* Session selector menu (Left-side col) */}
      <div className="lg:col-span-5 border border-[#1A1A1A] bg-white/60 p-6 flex flex-col justify-start">
        <div className="mb-6 pb-4 border-b border-[#1A1A1A]">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C8880] mb-2 block font-semibold">Briefing Archive</span>
          <h3 className="font-serif italic text-3xl text-[#01261f] text-left">Agri-AI Brief History</h3>
          <p className="text-xs text-[#1A1A1A]/70 mt-2 font-serif italic text-left">Review corporate consultation logs and farmer query intelligence.</p>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => handleSelect(session)}
              className={`w-full p-4 rounded-none border text-left transition-all flex items-start gap-4 cursor-pointer ${
                selectedSession?.id === session.id
                  ? 'bg-[#1A1A1A] text-[#F4F1EA] border-[#1A1A1A]'
                  : 'bg-[#F4F1EA]/60 border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:bg-[#E9E5DC]/50'
              }`}
            >
              <div className={`w-9 h-9 rounded-none border flex items-center justify-center shrink-0 ${
                selectedSession?.id === session.id ? 'bg-[#01261f] text-white border-[#01261f]' : 'bg-white border-[#1A1A1A]/30 text-[#1A1A1A]'
              }`}>
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-serif italic font-bold text-sm truncate ${selectedSession?.id === session.id ? 'text-[#F4F1EA]' : 'text-[#01261f]'}`}>
                  {session.title}
                </p>
                <div className="flex items-center gap-3 mt-2 font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {session.date}
                  </span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {session.messages.length} lines
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8C8880] mt-1 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* active messages log display panel (Right-side col) */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        {selectedSession ? (
          <div className="border border-[#1A1A1A] bg-white/60 p-6 h-full flex flex-col justify-between">
            {/* Session Metadata header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#F4F1EA] uppercase bg-[#01261f] px-2.5 py-1">
                  Archived Dialogue Code
                </span>
                <h4 className="font-serif italic text-xl text-[#01261f] mt-3">{selectedSession.title}</h4>
              </div>
              
              <button
                onClick={() => onSelectSession(selectedSession)}
                className="border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] hover:bg-transparent hover:text-[#1A1A1A] text-[9px] font-mono uppercase tracking-[0.15em] px-4 py-2.5 rounded-none flex items-center gap-1.5 transition-all outline-none cursor-pointer font-bold"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sync to Assistant</span>
              </button>
            </div>

            {/* Conversation list bubbles (rendered as elegant quotation articles) */}
            <div className="space-y-4 flex-1 overflow-y-auto max-h-[380px] pr-2">
              {selectedSession.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] border p-4 text-xs leading-relaxed rounded-none ${
                      msg.sender === 'user'
                        ? 'bg-[#E9E5DC] border-[#1A1A1A] text-[#1A1A1A]'
                        : 'bg-white border-[#1A1A1A]/30 text-[#1A1A1A]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2 font-mono text-[9px] uppercase tracking-wider text-[#8C8880] border-b border-[#1A1A1A]/10 pb-1.5">
                      {msg.sender === 'ai' && <Sparkles className="w-3 h-3 text-[#01261f]" />}
                      <span className="font-bold text-[#1A1A1A]">{msg.sender === 'user' ? 'Local Operator' : 'RKTAS AI Bot'}</span>
                      <span>&middot;</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-wrap font-serif text-[13px] leading-relaxed italic">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hint line at bottom */}
            <div className="mt-6 pt-4 border-t border-[#1A1A1A]/20 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#8C8880]">
              <Eye className="w-3.5 h-3.5 text-[#1a1a1a]" />
              <span>Diagnostic transcripts are secured via regional RKTAS localized encryption rules.</span>
            </div>
          </div>
        ) : (
          <div className="border border-[#1A1A1A] bg-white/60 p-12 flex flex-col justify-center items-center text-center h-full">
            <MessageSquare className="w-12 h-12 text-[#8C8880] mb-4" />
            <h4 className="font-serif italic text-2xl text-[#01261f]">No Dialogue Selected</h4>
            <p className="text-xs text-[#8C8880] font-mono uppercase mt-2 tracking-wider">Select an archived consultation to preview logs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
