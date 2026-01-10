
import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini, generateVoiceResponse, decodeBase64, decodeAudioData } from '../../services/geminiService';
import { Message, Peer, Reminder } from '../../types';

const MOCK_PEERS: Peer[] = [
  { id: '1', name: 'Alex (Nearby)', avatar: 'https://picsum.photos/id/65/100/100', status: 'online' },
  { id: '2', name: 'Sarah (Office)', avatar: 'https://picsum.photos/id/64/100/100', status: 'online' },
  { id: '3', name: 'Jordan', avatar: 'https://picsum.photos/id/63/100/100', status: 'busy' },
];

const AIChatApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Nexus Intelligence initialized. Your private vault (Documents, Photos, Videos) is indexed and ready for neural search. How can I assist with your workspace today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [view, setView] = useState<'chat' | 'translator' | 'discovery'>('chat');
  const [connectedPeer, setConnectedPeer] = useState<Peer | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, view]);

  const handleSendMessage = async (text: string, isVoice: boolean = false) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', content: text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI Context enhancement: Mentioning files
    const systemPrompt = "You are Nexus Assistant. You have access to the user's secure file vault (Documents, Photos, Videos). Help them search for IDs like Driving Licenses, manage media, and synchronize tasks. Be concise and high-tech.";

    const history = messages.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      parts: [{ text: m.content }]
    }));

    const responseText = await chatWithGemini(text, history as any);
    
    const assistantMsg: Message = { role: 'assistant', content: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);

    if (isVoice || isSpeaking) {
      const audioBase64 = await generateVoiceResponse(responseText);
      if (audioBase64) {
        if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const ctx = audioContextRef.current;
        const audioData = decodeBase64(audioBase64);
        const audioBuffer = await decodeAudioData(audioData, ctx);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        setIsSpeaking(true);
        source.onended = () => setIsSpeaking(false);
        source.start();
      }
    }
  };

  const renderDiscovery = () => (
    <div className="flex-1 p-8 animate-in slide-in-from-right-4 duration-500 overflow-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Neural Device Search</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Scanning biometric and wireless signatures</p>
        </div>
        <div className="w-12 h-12 rounded-2xl border border-blue-500/30 flex items-center justify-center animate-spin-slow">
           <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)]" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-[3rem] mb-10">
           <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Vault Insight</h4>
           <div className="flex items-center justify-between">
              <div className="flex gap-4">
                 <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-2xl">📄</div>
                 <div>
                    <p className="text-sm font-bold text-white">Driving_License.pdf</p>
                    <p className="text-[9px] text-gray-500 uppercase font-black">Ready for AI Verification</p>
                 </div>
              </div>
              <button className="text-xs font-black text-blue-500 hover:text-blue-400 transition-colors">Sync to Identity</button>
           </div>
        </div>

        {MOCK_PEERS.map(peer => (
          <div key={peer.id} className="glass p-6 rounded-[2.5rem] flex items-center justify-between border border-white/5 group hover:border-blue-500/40 transition-all">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img src={peer.avatar} className="w-16 h-16 rounded-[1.5rem] object-cover ring-2 ring-white/10 group-hover:ring-blue-500/50 transition-all" />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#020202] ${peer.status === 'online' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">{peer.name}</h4>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{peer.status}</p>
              </div>
            </div>
            <button 
              onClick={() => { setConnectedPeer(peer); setView('translator'); }}
              className="px-8 py-3 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-transform"
            >
              Bridge Connection
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#020202] text-white relative overflow-hidden font-inter selection:bg-blue-500/30">
      <header className="h-20 flex items-center justify-between px-8 glass-dark border-b border-white/10 z-20 backdrop-blur-3xl">
        <div className="flex items-center gap-8">
          <button onClick={onBackToHome} className="p-3 hover:bg-white/5 rounded-2xl transition-all group active:scale-95">
            <svg className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Personal AI</span>
            <h1 className="text-sm font-black text-white uppercase tracking-wider">Nexus Assistant</h1>
          </div>
        </div>

        <nav className="flex items-center gap-2 bg-white/5 p-1.5 rounded-[1.5rem] border border-white/5">
          {['chat', 'translator', 'discovery'].map(t => (
            <button 
              key={t}
              onClick={() => setView(t as any)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === t ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 flex flex-col md:flex-row min-h-0 z-10">
        <div className="flex-1 flex flex-col min-w-0 border-r border-white/5">
          {view === 'chat' ? (
            <div ref={scrollRef} className="flex-1 overflow-auto p-10 space-y-8 scroll-smooth">
               {messages.map((m, i) => (
                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                   <div className={`max-w-[85%] sm:max-w-[70%] rounded-[2.5rem] p-7 shadow-2xl relative group ${
                     m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'glass-dark border border-white/10 text-gray-100 rounded-tl-none'
                   }`}>
                     <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{m.content}</p>
                     <div className="mt-6 flex items-center justify-between opacity-30 group-hover:opacity-60 transition-opacity">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{m.role === 'user' ? 'System User' : 'Nexus Intelligence'}</span>
                        <span className="text-[10px] font-bold">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                     </div>
                   </div>
                 </div>
               ))}
               {isTyping && (
                 <div className="flex justify-start">
                   <div className="glass-dark px-8 py-5 rounded-[2rem] border border-white/10 flex gap-2 items-center">
                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                     <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                     <span className="ml-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">Indexing vault data...</span>
                   </div>
                 </div>
               )}
            </div>
          ) : view === 'translator' ? (
            <div className="flex-1 p-10">
               {/* Translation bridge component logic here */}
               <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                  <div className="text-8xl mb-8">🌎</div>
                  <h3 className="text-2xl font-black mb-4">Translator Active</h3>
                  <p className="max-w-sm font-medium">Nexus is listening for cross-language input to synchronize with your connected devices.</p>
               </div>
            </div>
          ) : renderDiscovery()}
        </div>

        <aside className="hidden lg:flex w-[400px] flex-col bg-black/60 backdrop-blur-3xl p-10 border-l border-white/5 overflow-auto">
          <div className="mb-12">
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-10">Vault Discovery</h3>
            <div className="space-y-4">
               {[
                 { name: 'Driving_License.pdf', category: 'Document', icon: '📄', size: '1.4MB' },
                 { name: 'Selfie_Enhance.png', category: 'Photo', icon: '🖼️', size: '4.2MB' },
                 { name: 'Vault_Secure.vid', category: 'Video', icon: '🎥', size: '124MB' }
               ].map((file, i) => (
                 <div key={i} className="glass p-5 rounded-[2rem] flex items-center gap-5 border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">{file.icon}</div>
                    <div>
                       <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{file.name}</p>
                       <p className="text-[9px] text-gray-500 font-black uppercase mt-1.5">{file.category} • {file.size}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-10">Workspace Sync</h3>
            <div className="glass p-8 rounded-[3rem] border-white/5 text-center">
               <p className="text-[10px] text-gray-500 font-bold uppercase mb-6 leading-relaxed">AI automatically synchronizes your most accessed files for fast retrieval.</p>
               <button className="w-full py-4 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">Optimize Search Index</button>
            </div>
          </div>
        </aside>
      </main>

      <footer className="p-8 glass-dark border-t border-white/10 z-30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end gap-5 glass p-3 rounded-[3rem] border-white/10 transition-all focus-within:ring-4 focus-within:ring-blue-500/20">
             <button className="p-5 text-gray-500 hover:text-blue-400 transition-colors bg-white/5 rounded-full">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
             </button>
             <textarea 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage(input))}
               placeholder="Search files, manage vault, or ask Nexus..."
               className="flex-1 bg-transparent border-none outline-none py-4 px-4 text-base sm:text-lg resize-none max-h-40 scrollbar-none"
               rows={1}
             />
             <button 
               onClick={() => handleSendMessage(input)}
               disabled={!input.trim()}
               className="p-6 bg-blue-600 rounded-full text-white shadow-2xl shadow-blue-600/40 active:scale-95 transition-all disabled:opacity-20"
             >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIChatApp;
