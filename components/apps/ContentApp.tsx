
import React, { useState, useEffect, useRef } from 'react';
import { ContentPost, LiveRoom } from '../../types';

const MOCK_POSTS: ContentPost[] = [
  { id: 'p1', user: 'LeoGaming', avatar: 'https://picsum.photos/id/1/100/100', type: 'video', mediaUrl: 'https://picsum.photos/id/10/800/1200', likes: 1240, description: 'Best goal in the soccer world league! ⚽', duration: '1:45' },
  { id: 'p2', user: 'StudioNexus', avatar: 'https://picsum.photos/id/2/100/100', type: 'image', mediaUrl: 'https://picsum.photos/id/20/800/800', likes: 890, description: 'New office setup in Tokyo.' },
  { id: 'p3', user: 'TravelNexus', avatar: 'https://picsum.photos/id/3/100/100', type: 'video', mediaUrl: 'https://picsum.photos/id/30/800/1200', likes: 3200, description: '2 minutes of pure bliss in the Swiss Alps.', duration: '2:00' },
];

const ContentApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'live' | 'gaming'>('feed');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [speakerTimer, setSpeakerTimer] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [credits, setCredits] = useState(500);
  const [gamepadConnected, setGamepadConnected] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const checkGamepad = () => {
      const gamepads = navigator.getGamepads();
      setGamepadConnected(!!gamepads[0]);
    };
    window.addEventListener("gamepadconnected", checkGamepad);
    window.addEventListener("gamepaddisconnected", checkGamepad);
    const interval = setInterval(checkGamepad, 1000);
    return () => {
      window.removeEventListener("gamepadconnected", checkGamepad);
      window.removeEventListener("gamepaddisconnected", checkGamepad);
      clearInterval(interval);
    };
  }, []);

  const startSpeaking = () => {
    setIsSpeaking(true);
    setSpeakerTimer(30); // 30 seconds to speak
    timerRef.current = setInterval(() => {
      setSpeakerTimer(prev => {
        if (prev <= 1) {
          handleStopTalking(true); // Forced stop
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStopTalking = (exceeded: boolean) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSpeaking(false);
    if (!exceeded) {
      alert("Success! Credits transferred to speaker.");
    } else {
      alert("Time limit exceeded. Credits returned to sender.");
    }
  };

  const renderFeed = () => (
    <div className="flex-1 overflow-auto p-4 md:p-8 space-y-12">
      <div className="max-w-2xl mx-auto space-y-12">
        {MOCK_POSTS.map(post => (
          <div key={post.id} className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden group">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={post.avatar} className="w-12 h-12 rounded-2xl border border-white/10" />
                <div>
                  <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{post.user}</h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sponsored • Nexus Global</p>
                </div>
              </div>
              <button className="px-5 py-2 glass border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-blue-600/10 transition-all">Follow</button>
            </div>
            
            <div className="relative aspect-[4/5] bg-black flex items-center justify-center">
              <img src={post.mediaUrl} className="w-full h-full object-cover" />
              {post.type === 'video' && (
                <div className="absolute top-6 left-6 bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  {post.duration}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                 <p className="text-sm font-medium leading-relaxed">{post.description}</p>
              </div>
            </div>

            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <button className="flex items-center gap-2 group/btn">
                    <span className="text-xl group-hover/btn:scale-125 transition-transform">❤️</span>
                    <span className="text-xs font-bold text-gray-400">{post.likes}</span>
                 </button>
                 <button className="flex items-center gap-2 group/btn">
                    <span className="text-xl group-hover/btn:rotate-12 transition-transform">💬</span>
                    <span className="text-xs font-bold text-gray-400">42</span>
                 </button>
                 <button className="flex items-center gap-2 group/btn">
                    <span className="text-xl group-hover/btn:-translate-y-1 transition-transform">🎁</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Gifts</span>
                 </button>
              </div>
              <button className="p-2 glass rounded-xl hover:bg-white/10 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 000-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLive = () => (
    <div className="flex-1 flex flex-col md:flex-row p-4 md:p-8 gap-8 overflow-hidden bg-gradient-to-br from-indigo-950/20 to-black">
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex-1 glass-dark rounded-[3rem] border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
          {isSpeaking ? (
            <div className="text-center animate-in zoom-in duration-500">
               <div className="relative mb-8">
                  <div className="w-48 h-48 rounded-full border-4 border-blue-500/50 p-2 animate-spin-slow">
                     <img src="https://picsum.photos/id/64/200/200" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-4xl font-black text-white">{speakerTimer}s</span>
                  </div>
               </div>
               <h3 className="text-2xl font-black text-white">LeoNexus is Speaking...</h3>
               <p className="text-blue-400 font-bold uppercase tracking-widest mt-2">Active Session: AI Sovereignty</p>
            </div>
          ) : (
            <div className="text-center p-12 opacity-40">
               <div className="text-8xl mb-6">🎙️</div>
               <h3 className="text-2xl font-black">Waiting for Speaker</h3>
               <p className="max-w-xs mx-auto mt-4 text-sm">Raise your hand to request the floor from the host.</p>
            </div>
          )}

          <div className="absolute top-8 left-8 flex items-center gap-3">
             <div className="bg-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Live: 1,240 Viewers
             </div>
          </div>
        </div>

        <div className="flex gap-4">
           <button 
             onClick={() => setIsHandRaised(!isHandRaised)}
             className={`flex-1 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 border ${
               isHandRaised ? 'bg-amber-600 border-amber-400 shadow-xl' : 'glass border-white/10 text-gray-400 hover:text-white'
             }`}
           >
             <span className="text-xl">🖐️</span>
             {isHandRaised ? 'Hand Raised' : 'Raise Hand'}
           </button>
           <button 
             onClick={() => isSpeaking ? handleStopTalking(false) : startSpeaking()}
             className={`flex-1 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all border ${
               isSpeaking ? 'bg-rose-600 border-rose-400' : 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-600/20'
             }`}
           >
             {isSpeaking ? 'End My Turn' : 'Claim Mic (Host Only)'}
           </button>
        </div>
      </div>

      <div className="w-full md:w-80 flex flex-col gap-6">
        <div className="glass-dark p-6 rounded-[2.5rem] flex flex-col gap-6 border-white/5">
           <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Speaker Contribution</h4>
           <div className="text-center py-4">
              <span className="text-3xl font-black text-white">💰 {credits}</span>
              <p className="text-[9px] text-gray-500 font-bold uppercase mt-2">Nexus Global Credits</p>
           </div>
           <button 
            disabled={isSpeaking}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-tighter shadow-lg shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-20"
           >
             Buy Subscription & Support Speaker
           </button>
        </div>

        <div className="flex-1 glass-dark rounded-[2.5rem] p-6 border-white/5 overflow-auto">
           <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Interaction Log</h4>
           <div className="space-y-4">
              {[
                { u: 'Sarah_N', msg: 'Great point about the credits!', type: 'chat' },
                { u: 'Alex_Global', msg: 'Sent 50 credits', type: 'gift' },
                { u: 'Admin', msg: 'LeoNexus raised hand', type: 'system' }
              ].map((log, i) => (
                <div key={i} className="flex gap-3 text-xs">
                   <span className={`font-black uppercase tracking-tighter ${log.type === 'gift' ? 'text-amber-500' : 'text-gray-400'}`}>{log.u}:</span>
                   <span className="text-gray-200">{log.msg}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  const renderGaming = () => (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
           <div>
              <h2 className="text-3xl font-black text-white">Nexus Global Gaming</h2>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Sync your PS5 or Xbox Pad to compete globally</p>
           </div>
           <div className={`px-6 py-2 rounded-full border transition-all flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${
             gamepadConnected ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-600/10 border-rose-500/30 text-rose-400'
           }`}>
              <div className={`w-2 h-2 rounded-full ${gamepadConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              {gamepadConnected ? 'PS5 Controller Connected' : 'Waiting for Pad Connection'}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'Global Soccer League', desc: 'Sync your pad for the 2024 season.', icon: '⚽', img: 'https://picsum.photos/id/40/800/600', color: 'blue' },
             { title: 'Cyber Adventure', desc: 'MMO exploration with worldwide co-op.', icon: '🗡️', img: 'https://picsum.photos/id/50/800/600', color: 'purple' },
             { title: 'Nexus Racing v4', desc: 'Real-time multiplayer drag racing.', icon: '🏎️', img: 'https://picsum.photos/id/60/800/600', color: 'rose' }
           ].map((game, i) => (
             <div key={i} className="group glass-dark rounded-[3rem] border-white/5 overflow-hidden hover:border-blue-500/40 transition-all cursor-pointer">
                <div className="h-48 relative">
                   <img src={game.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   <div className="absolute top-6 right-6 text-4xl">{game.icon}</div>
                </div>
                <div className="p-8">
                   <h3 className="text-xl font-black mb-2">{game.title}</h3>
                   <p className="text-sm text-gray-500 mb-8">{game.desc}</p>
                   <button className="w-full py-4 bg-white/5 rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-blue-600 transition-colors">Start Session</button>
                </div>
             </div>
           ))}
        </div>

        <div className="glass-dark p-12 rounded-[3.5rem] border-white/5 text-center">
           <h3 className="text-xl font-black mb-4">Connect with Friends</h3>
           <p className="text-gray-500 text-sm max-w-lg mx-auto mb-8">Play alongside users you know or discover new rivals from around the world.</p>
           <div className="flex flex-wrap justify-center gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="relative group">
                   <img src={`https://picsum.photos/id/${60+i}/100/100`} className="w-14 h-14 rounded-2xl border-2 border-transparent group-hover:border-blue-500 transition-all" />
                   <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" />
                </div>
              ))}
              <button className="w-14 h-14 rounded-2xl glass border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#020202] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      <header className="h-20 flex items-center justify-between px-8 glass-dark border-b border-white/5 z-20">
        <div className="flex items-center gap-6">
          <button onClick={onBackToHome} className="p-3 glass rounded-2xl text-gray-400 hover:text-white transition-all group active:scale-95">
             <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div className="flex flex-col">
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Global Content Hub</span>
             <h2 className="text-sm font-black uppercase tracking-wider">Nexus Social</h2>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-[1.5rem] border border-white/5">
           {[
             { id: 'feed', label: 'Feed', icon: '📺' },
             { id: 'live', label: 'Live Space', icon: '🔥' },
             { id: 'gaming', label: 'Gaming', icon: '🎮' }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                 activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'
               }`}
             >
               <span>{tab.icon}</span>
               {tab.label}
             </button>
           ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
           <div className="text-right">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Credits</p>
              <p className="text-sm font-black text-white">💰 12,450.00</p>
           </div>
           <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
           </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col z-10 overflow-hidden">
        {activeTab === 'feed' ? renderFeed() : activeTab === 'live' ? renderLive() : renderGaming()}
      </main>

      <style>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContentApp;
