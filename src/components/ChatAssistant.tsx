import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Sparkles, Send, Trash2, ShieldCheck, Loader2 } from 'lucide-react';
import { ChatMessage, ChatSession } from '../types';

interface ChatAssistantProps {
  systemPersona: string;
  activeSession: ChatSession | null;
  onUpdateSessionMessages: (messages: ChatMessage[]) => void;
  onAddNewSession: (session: ChatSession) => void;
}

// Fallback high-fidelity smart answers when Gemini API endpoint is unreachable or misses credentials
const FALLBACK_ANSWERS = [
  {
    keywords: ['napier', 'yield', 'tonne', 'grass'],
    response: 'Napier Grass yields up to 80 tonnes of dry matter per hectare annually under optimal farming practices in Punjab. It is high-energy, drought-hardy, and acts as a pristine continuous biofuel resource with extremely low manual care requirements.',
  },
  {
    keywords: ['coal', 'bio-coal', 'pellets', 'fuel', 'hydrophobic'],
    response: 'RKTAS Bio-Coal pellets are produced with a specialized mild torrefaction (roasting) that makes them highly hydrophobic. By breaking down hemicellulose, the pellets won\'t retain moisture or deteriorate, enabling safe outdoor storage. They are a direct, carbon-neutral drop-in fuel for traditional thermal coal power stations.',
  },
  {
    keywords: ['biogas', 'cbg', 'cng', 'resizing'],
    response: 'Our Compressed Biogas (CBG) systems break seasonal sizing barriers, converting raw paddy straw residue directly into renewable transport gas. It aligns flawlessly with India\'s SATAT initiatives to scale green alternative infrastructure.',
  },
  {
    keywords: ['burning', 'paddy', 'residue', 'straw', 'acres'],
    response: 'Northern India faces over 70 Lakh+ acres of paddy straw burning annually, losing 16.8M kg of vital Organic Soil Carbon and releasing massive CO2. RKTAS collects stubble in a strict 50-day harvest window, preventing environmental damage and generating reliable rural wages.',
  },
  {
    keywords: ['invest', 'funds', 'capital', 'relations'],
    response: 'We welcome strategic partners seeking robust green returns. RKTAS maintains a verified 100 MT/day processing footprint spanning multiple rural cooperatives, aiming to multiply efficiency to 300 MT/day by 2026. Reach out directly through the portal.',
  },
  {
    keywords: ['contact', 'location', 'where', 'address'],
    response: 'Our administrative headquarters is located at 76, Ahluwalia Building, Ambala Cantt, Haryana. Processing aggregates operate in Village Sadhugarh, Punjab. Contact us through the Leads database to schedule operations!',
  },
];

export default function ChatAssistant({
  systemPersona,
  activeSession,
  onUpdateSessionMessages,
  onAddNewSession,
}: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeSession?.messages, isTyping, isOpen]);

  // Current list of messages
  const messages = activeSession?.messages || [];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    // Generate accurate timestamp
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Construct user message record
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: nowStr,
    };

    let updatedSession = activeSession;
    let newMessagesList = [...messages, userMsg];

    if (!activeSession) {
      // Setup dynamic new session
      const newSession: ChatSession = {
        id: `sess-${Date.now()}`,
        title: userText.length > 25 ? `${userText.slice(0, 25)}...` : userText,
        date: new Date().toISOString().slice(0, 10),
        messages: [userMsg],
      };
      onAddNewSession(newSession);
      updatedSession = newSession;
    } else {
      onUpdateSessionMessages(newMessagesList);
    }

    setIsTyping(true);

    try {
      // POST to our backend proxy server API
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessagesList,
          systemPersona: systemPersona,
        }),
      });

      if (!res.ok) {
        throw new Error('API server unreachable or returned error');
      }

      const responseData = await res.json();
      const botText: string = responseData.text || '';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onUpdateSessionMessages([...newMessagesList, aiMsg]);
    } catch (err) {
      console.warn('Backend proxy lookup failed. Launching high-fidelity organic rules-engine lookup:', err);
      
      // Select best response matching keywords, else standard helpful fallback
      let matchedVal = '';
      const textLower = userText.toLowerCase();
      
      for (const rule of FALLBACK_ANSWERS) {
        if (rule.keywords.some(kw => textLower.includes(kw))) {
          matchedVal = rule.response;
          break;
        }
      }

      if (!matchedVal) {
        matchedVal = `I am the RKTAS Operational AI, customized as a "${systemPersona}". Currently operating in standalone. \n\nI can answer questions regarding our dry Bio-Coal production, raw Napier Grass yields (80 tonnes/ha), and Punjab crop residue solutions. Please specify keywords to enable smart diagnostic queries.`;
      }

      // Small simulate delay to make typing feel organic
      setTimeout(() => {
        const fallbackMsg: ChatMessage = {
          id: `ai-fb-${Date.now()}`,
          sender: 'ai',
          text: matchedVal,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        onUpdateSessionMessages([...newMessagesList, fallbackMsg]);
        setIsTyping(false);
      }, 1100);
      return;
    }

    setIsTyping(false);
  };

  const handleClearMessages = () => {
    onUpdateSessionMessages([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-[#1A1A1A]">
      {/* Editorial Floating Button - Sharp print toggle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#1A1A1A] px-5 py-4.5 rounded-none font-mono text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl transition-all cursor-pointer flex items-center gap-2.5 active:scale-95"
          title="Open RKTAS Support AI"
        >
          <Sparkles className="w-4 h-4 text-[#C4B293] animate-pulse" />
          <span>Consult AI Advisor</span>
        </button>
      )}

      {/* Floating Gazette-Style Chat Desk Drawer Interface */}
      {isOpen && (
        <div className="bg-[#F4F1EA] rounded-none w-80 md:w-96 h-[500px] shadow-2xl border-2 border-[#1A1A1A] flex flex-col justify-between overflow-hidden animate-fade-in">
          {/* Header Panel */}
          <div className="bg-[#01261f] text-white px-5 py-4 flex items-center justify-between border-b border-[#1A1A1A] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-none border border-white/20 bg-[#C4B293] flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#01261f]" />
              </div>
              <div>
                <h4 className="font-serif italic text-sm tracking-wide text-white">RKTAS Support AI</h4>
                <p className="text-[8px] font-mono text-[#C4B293] uppercase tracking-widest mt-0.5">
                  Always Engaged
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearMessages}
                className="text-white/70 hover:text-white p-1 rounded-none hover:bg-white/10 transition-colors cursor-pointer"
                title="Clear Dialogue Stream"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-none hover:bg-white/10 transition-colors cursor-pointer"
                title="Minimize Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Secure disclaimer Banner */}
          <div className="bg-[#E9E5DC] border-b border-[#1A1A1A] px-4 py-2.5 flex items-center gap-2 text-[9px] font-mono uppercase text-[#01261f]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#01261f]" />
            <span>Encrypted Diagnostic Interface Active</span>
          </div>

          {/* Message log display list */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F4F1EA] text-xs leading-relaxed"
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 self-center space-y-4">
                <div className="w-10 h-10 rounded-none border border-[#1A1A1A] bg-[#C4B293]/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#01261f]" />
                </div>
                <div>
                  <h5 className="font-serif italic text-lg text-[#01261f]">Consultive Advisor</h5>
                  <p className="text-[10px] font-serif text-[#1A1A1A]/70 leading-relaxed mt-2">
                    Query physical parameters regarding CBG plants, Napier energy, torrefied pellets, orPunjab crop residues.
                  </p>
                </div>
                {/* Hot Query recommendations */}
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  <button
                    onClick={() => setInputText('What are Napier Grass yields?')}
                    className="bg-white border border-[#1A1A1A] hover:bg-[#E9E5DC] px-3 py-1.5 rounded-none text-[9px] font-mono uppercase text-[#1A1A1A] font-bold transition-all cursor-pointer"
                  >
                    Grass Yield
                  </button>
                  <button
                    onClick={() => setInputText('How are torrefied pellets hydrophobic?')}
                    className="bg-white border border-[#1A1A1A] hover:bg-[#E9E5DC] px-3 py-1.5 rounded-none text-[9px] font-mono uppercase text-[#1A1A1A] font-bold transition-all cursor-pointer"
                  >
                    Torrefaction Hydrophobics
                  </button>
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] border p-3.5 rounded-none font-serif text-[12.5px] leading-relaxed italic ${
                      m.sender === 'user'
                        ? 'bg-[#E9E5DC] border-[#1A1A1A] text-[#1A1A1A]'
                        : 'bg-white border-[#1A1A1A]/30 text-[#1A1A1A]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <span className="text-[8px] font-mono uppercase tracking-widest opacity-60 block text-right mt-2">{m.timestamp}</span>
                  </div>
                </div>
              ))
            )}

            {/* Simulated typing dot sequence bubbles */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#1A1A1A] p-4 rounded-none flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#01261f]" />
                  <span className="text-[9px] font-mono uppercase text-[#8C8880]">Compiling briefing transcript...</span>
                </div>
              </div>
            )}
          </div>

          {/* Form input field sender */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#E9E5DC]/50 border-t border-[#1A1A1A] flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask a technical/field query..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-white border border-[#1A1A1A] rounded-none px-4 py-2.5 text-xs text-[#1A1A1A] outline-none font-mono focus:border-[#01261f]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="bg-[#1A1A1A] border border-[#1A1A1A] text-white hover:bg-transparent hover:text-[#1A1A1A] p-2.5 rounded-none cursor-pointer disabled:opacity-30 transition-all outline-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
