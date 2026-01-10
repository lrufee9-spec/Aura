import React, { useState, useRef, useEffect } from 'react';
import { Message, Contact } from '../../types';
import { chatWithGemini } from '../../services/geminiService';

const MOCK_CONTACTS: Contact[] = [
  { id: 'c1', name: 'Sarah Nexus', phone: '+1 555-0123', avatar: 'https://picsum.photos/id/64/100/100', status: 'online' },
  { id: 'c2', name: 'Alex Reed', phone: '+1 555-9876', avatar: 'https://picsum.photos/id/65/100/100', status: 'offline' },
  { id: 'c3', name: 'Jordan Dev', phone: '+1 555-4433', avatar: 'https://picsum.photos/id/63/100/100', status: 'busy' },
];

const ChatApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [activeContact, setActiveContact] = useState<Contact>(MOCK_CONTACTS[0]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'c1': [
      { id: '1', role: 'peer', content: 'Hey! Did you see the new NexusOS update?', timestamp: Date.now() - 100000, reactions: ['❤️'] },
      { id: '2', role: 'user', content: 'Yeah, just logged in. It looks amazing.', timestamp: Date.now() - 50000 }
    ]
  });
  const [input, setInput] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newPhone, setNewPhone] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  // Fix: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> to resolve the 'Cannot find namespace NodeJS' error in the browser context.
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeContact]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordTime(prev => {
          if (prev >= 120) { // 2 mins limit
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordTime(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const isLong = input.length > 50;
    const newMsg: Message = { 
      id: Math.random().toString(36),
      role: 'user', 
      content: input, 
      timestamp: Date.now(),
      type: isLong ? 'text' : 'text' 
    };

    if (isLong) {
      // Logic for syncing to Inbox
      alert("Message exceeds 50 characters. Syncing long-form content to your Nexus Inbox...");
    }

    setMessages(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMsg]
    }));
    setInput('');

    // Mock reply
    setTimeout(() => {
      const reply: Message = {
        id: Math.random().toString(36),
        role: 'peer',
        content: isLong ? "Got your detailed message! Checking my inbox now." : "Sounds good! 👍",
        timestamp: Date.now()
      };
      setMessages(prev => ({
        ...prev,
        [activeContact.id]: [...(prev[activeContact.id] || []), reply]
      }));
    }, 1500);
  };

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => {
    setIsRecording(false);
    const voiceMsg: Message = {
      id: Math.random().toString(36),
      role: 'user',
      content: `Voice Message (${recordTime}s)`,
      timestamp: Date.now(),
      type: 'voice'
    };
    setMessages(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), voiceMsg]
    }));
  };

  const addReaction = (msgId: string, emoji: string) => {
    setMessages(prev => {
      const currentMsgs = prev[activeContact.id] || [];
      return {
        ...prev,
        [activeContact.id]: currentMsgs.map(m => 
          m.id === msgId ? { ...m, reactions: [...(m.reactions || []), emoji] } : m
        )
      };
    });
  };

  const toggleBlock = (contactId: string) => {
    setContacts(prev => prev.map(c => 
      c.id === contactId ? { ...c, isBlocked: !c.isBlocked } : c
    ));
  };

  const startCall = (type: 'audio' | 'video') => {
    setCallType(type);
    setIsCalling(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative">
      {/* Sidebar */}
      <div className="w-20 md:w-80 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <button onClick={onBackToHome} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="hidden md:block font-black text-xs uppercase tracking-[0.2em] text-blue-500">Nexus Chat</h2>
          <button onClick={() => setShowAddFriend(true)} className="p-2 bg-blue-600/10 text-blue-400 rounded-xl hover:bg-blue-600/20 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              onClick={() => setActiveContact(contact)}
              className={`p-4 md:p-6 flex items-center gap-4 cursor-pointer transition-all border-l-4 ${
                activeContact.id === contact.id ? 'bg-blue-600/10 border-blue-500' : 'border-transparent hover:bg-white/5'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img src={contact.avatar} className="w-12 h-12 rounded-2xl object-cover" />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#050505] ${
                  contact.status === 'online' ? 'bg-emerald-500' : contact.status === 'busy' ? 'bg-rose-500' : 'bg-gray-600'
                }`} />
              </div>
              <div className="hidden md:block flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-bold truncate ${contact.isBlocked ? 'text-gray-600 line-through' : 'text-white'}`}>
                    {contact.name}
                  </h4>
                  <span className="text-[10px] text-gray-500">12:45</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{contact.isBlocked ? 'Blocked' : 'Tap to chat...'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Chat Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 glass-dark z-10">
          <div className="flex items-center gap-4">
            <img src={activeContact.avatar} className="w-10 h-10 rounded-xl" />
            <div>
              <h3 className="font-bold text-sm">{activeContact.name}</h3>
              <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">{activeContact.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => startCall('audio')} className="p-3 hover:bg-white/5 rounded-xl transition-all text-gray-400 hover:text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button onClick={() => startCall('video')} className="p-3 hover:bg-white/5 rounded-xl transition-all text-gray-400 hover:text-purple-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button onClick={() => toggleBlock(activeContact.id)} className={`p-3 rounded-xl transition-all ${activeContact.isBlocked ? 'text-rose-500 bg-rose-500/10' : 'text-gray-400 hover:text-rose-500 hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-auto p-8 space-y-6 scroll-smooth">
          {(messages[activeContact.id] || []).map((m, i) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className="max-w-[80%] relative group">
                <div className={`p-5 rounded-3xl shadow-xl border ${
                  m.role === 'user' 
                    ? 'bg-blue-600 border-blue-500 text-white rounded-tr-none' 
                    : 'glass-dark border-white/5 text-gray-100 rounded-tl-none'
                }`}>
                  {m.type === 'voice' ? (
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">▶️</div>
                       <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-white" />
                       </div>
                       <span className="text-[10px] font-bold">2:00</span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{m.content}</p>
                  )}
                  
                  <div className="mt-2 flex items-center gap-2">
                    {m.reactions?.map((r, ri) => (
                      <span key={ri} className="bg-black/40 px-2 py-0.5 rounded-full text-[10px]">{r}</span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between opacity-30">
                     <span className="text-[9px] font-black uppercase tracking-widest">{new Date(m.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>

                {/* Reaction Picker */}
                <div className="absolute top-0 -right-12 hidden group-hover:flex flex-col gap-1 glass p-1 rounded-xl">
                  {['❤️', '👍', '😂', '😮'].map(emoji => (
                    <button key={emoji} onClick={() => addReaction(m.id!, emoji)} className="hover:scale-125 transition-transform p-1">{emoji}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <footer className="p-6 glass-dark border-t border-white/10">
          {isRecording ? (
            <div className="flex items-center justify-between bg-rose-600/10 p-4 rounded-3xl border border-rose-500/20 animate-pulse">
               <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />
                  <span className="text-rose-500 font-bold">Recording... {formatTime(recordTime)} / 2:00</span>
               </div>
               <button onClick={stopRecording} className="px-6 py-2 bg-rose-600 text-white rounded-xl font-bold text-xs uppercase">Stop & Send</button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto flex items-end gap-3 glass p-2 rounded-[2rem] border-white/10">
              <div className="flex gap-1 p-1">
                <button className="p-3 text-gray-500 hover:text-white transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
                <button onClick={startRecording} className="p-3 text-gray-500 hover:text-rose-500 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg></button>
              </div>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Type a message... ( >50 chars syncs to Inbox)"
                className="flex-1 bg-transparent border-none outline-none py-3 px-2 text-sm resize-none max-h-32"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-4 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          )}
        </footer>
      </div>

      {/* Calling Overlay */}
      {isCalling && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center animate-in fade-in duration-500">
           <div className="relative mb-12">
              <img src={activeContact.avatar} className="w-48 h-48 rounded-full object-cover border-4 border-blue-500/50 p-2" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest animate-bounce">
                {callType.toUpperCase()} CALLING...
              </div>
           </div>
           
           <h2 className="text-4xl font-black mb-2">{activeContact.name}</h2>
           <p className="text-gray-500 font-bold mb-12">Nexus Secure Channel</p>

           <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              <button 
                onClick={() => setIsTranslating(!isTranslating)}
                className={`w-full py-4 rounded-3xl border transition-all flex items-center justify-center gap-4 font-black text-sm uppercase tracking-widest ${
                  isTranslating ? 'bg-emerald-600 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                {isTranslating ? 'Translation: ON' : 'Instant AI Translator'}
              </button>

              <div className="flex gap-6">
                 <button className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                 </button>
                 <button onClick={() => setIsCalling(false)} className="w-20 h-20 rounded-full bg-rose-600 flex items-center justify-center hover:bg-rose-500 shadow-2xl shadow-rose-600/40 active:scale-95 transition-all">
                    <svg className="w-10 h-10 text-white transform rotate-[135deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                 </button>
                 <button className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Add Friend Dialog */}
      {showAddFriend && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="glass-dark p-10 rounded-[2.5rem] border border-white/10 w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-2xl font-black mb-6">Add Global Contact</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Telephone Number</label>
                <input 
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAddFriend(false)} className="flex-1 py-4 rounded-2xl bg-white/5 font-bold hover:bg-white/10 transition-all">Cancel</button>
                <button onClick={() => {
                  if(newPhone) {
                    setContacts(prev => [...prev, { id: 'c'+Date.now(), name: 'New Contact', phone: newPhone, avatar: 'https://picsum.photos/id/100/100/100', status: 'online' }]);
                    setShowAddFriend(false);
                    setNewPhone('');
                  }
                }} className="flex-1 py-4 rounded-2xl bg-blue-600 font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">Add Friend</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;