
import React, { useState, useEffect, useRef } from 'react';
import { DJTrack, CuePoint } from '../../types';

const MOCK_TRACKS: DJTrack[] = [
  {
    id: 't1', title: 'Neural Pulse (Original Mix)', artist: 'Cyberlink', bpm: 124, key: 'Am', duration: '6:45', format: 'mp3',
    cues: [{ id: 'c1', time: 0, label: 'Intro', color: 'bg-emerald-500' }, { id: 'c2', time: 120, label: 'Build', color: 'bg-rose-500' }],
    beatgrid: 12, phraseLength: 32, isAnalyzed: true, sourceUrl: 'nexus://audio/t1'
  },
  {
    id: 't2', title: 'Solar Flare', artist: 'DaftNexus', bpm: 128, key: 'Cm', duration: '5:20', format: 'wav',
    cues: [], beatgrid: 0, phraseLength: 16, isAnalyzed: false, sourceUrl: 'youtube://solarflare'
  }
];

const DJMusicApp: React.FC<{ onBackToStorage?: () => void }> = ({ onBackToStorage }) => {
  const [activeTab, setActiveTab] = useState<'library' | 'downloader' | 'studio'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<DJTrack[]>(MOCK_TRACKS);
  const [selectedTrack, setSelectedTrack] = useState<DJTrack | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const startDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          alert("Neural Transcode Successful: MP3 320kbps added to DJ Crates.");
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleAnalyze = (track: DJTrack) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setTracks(prev => prev.map(t => t.id === track.id ? { ...t, isAnalyzed: true, bpm: 126, key: 'Gm' } : t));
      setIsAnalyzing(false);
      setSelectedTrack({ ...track, isAnalyzed: true, bpm: 126, key: 'Gm' });
    }, 2500);
  };

  const syncToSoftware = (target: string) => {
    alert(`Sync Bridge Initialized: Nexus DJ Crate exported to ${target} Library. You can now drag tracks from Nexus Storage in the ${target} browser.`);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative font-inter">
      {/* HUD Sidebar */}
      <aside className="w-16 md:w-72 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-5">
          <button onClick={onBackToStorage} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group active:scale-95 shadow-lg">
            <svg className="w-6 h-6 text-emerald-400 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="hidden md:block">
             <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Audio Lab</span>
             <h2 className="text-sm font-black text-white uppercase tracking-widest">DJ Music</h2>
          </div>
        </div>

        <nav className="flex-1 p-4 md:p-6 space-y-3 mt-4">
          {[
            { id: 'library', label: 'Crate Browser', icon: '🎧' },
            { id: 'downloader', label: 'Stream Grabber', icon: '📥' },
            { id: 'studio', label: 'Waveform Lab', icon: '〰️' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/30' : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="hidden md:block">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto space-y-4">
           <div className="glass p-5 rounded-3xl border border-white/5 text-center">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Sync Engine</p>
              <div className="flex justify-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[8px] font-black text-emerald-400">READY</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Studio Interface */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-24 flex items-center justify-between px-10 glass-dark border-b border-white/5 shrink-0">
           <div className="flex flex-col">
              <h3 className="text-2xl font-black uppercase tracking-tight">Audio Studio</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Universal DJ Integration Engine</p>
           </div>
           
           <div className="flex items-center gap-4">
              {['Serato', 'Rekordbox', 'VirtualDJ'].map(sw => (
                <button 
                  key={sw}
                  onClick={() => syncToSoftware(sw)}
                  className="px-5 py-2 glass border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95"
                >
                  Sync {sw}
                </button>
              ))}
           </div>
        </header>

        <main className="flex-1 overflow-auto p-10 bg-[#020202]">
           {activeTab === 'library' && (
             <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {tracks.map(track => (
                     <div 
                      key={track.id} 
                      onClick={() => setSelectedTrack(track)}
                      className={`glass-dark p-8 rounded-[3.5rem] border transition-all cursor-pointer relative group ${selectedTrack?.id === track.id ? 'border-emerald-500 bg-emerald-600/5' : 'border-white/5 hover:border-emerald-500/40'}`}
                     >
                        <div className="flex justify-between items-start mb-6">
                           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🎵</div>
                           <div className="text-right">
                              <span className="text-[10px] font-black text-emerald-400 block">{track.bpm} BPM</span>
                              <span className="text-[10px] font-black text-gray-500 uppercase">{track.key}</span>
                           </div>
                        </div>
                        <h4 className="text-xl font-black mb-1 truncate">{track.title}</h4>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">{track.artist}</p>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-600">
                           <span>{track.format} • {track.duration}</span>
                           {track.isAnalyzed && <span className="text-emerald-500">GRID SECURE</span>}
                        </div>
                        {selectedTrack?.id === track.id && (
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                             <button onClick={() => setActiveTab('studio')} className="px-6 py-2 bg-emerald-600 rounded-full text-[9px] font-black shadow-xl">OPEN LAB</button>
                          </div>
                        )}
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'downloader' && (
             <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-500">
                <div className="text-center">
                   <div className="w-32 h-32 bg-emerald-600/10 rounded-[3rem] border border-emerald-500/30 flex items-center justify-center text-7xl mx-auto mb-8 shadow-2xl">📥</div>
                   <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Stream Grabber</h2>
                   <p className="text-gray-500 text-sm max-w-md mx-auto">Neural integration allows high-fidelity extraction from YouTube, SoundCloud, and Vimeo.</p>
                </div>

                <div className="glass-dark p-10 rounded-[4rem] border border-white/5 space-y-10">
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Paste YouTube/URL link here..."
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-10 py-5 outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all font-medium"
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                      <button 
                        onClick={startDownload}
                        disabled={isDownloading}
                        className="absolute right-3 top-3 bottom-3 px-8 bg-emerald-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all disabled:opacity-20"
                      >
                         Fetch Audio
                      </button>
                   </div>

                   {isDownloading && (
                     <div className="space-y-4 animate-in fade-in">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                           <span className="text-emerald-400">Transcoding to MP3 320kbps</span>
                           <span>{downloadProgress}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-600 transition-all duration-150" style={{ width: `${downloadProgress}%` }} />
                        </div>
                     </div>
                   )}

                   <div className="grid grid-cols-2 gap-4">
                      {['MP3 (320k)', 'WAV (Lossless)', 'AIFF (Pro)', 'MP4 (Video)'].map(fmt => (
                        <button key={fmt} className="p-6 glass rounded-3xl border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600/20 hover:border-emerald-500/40 transition-all text-center">
                           {fmt}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'studio' && selectedTrack && (
             <div className="max-w-6xl mx-auto h-full flex flex-col gap-10 animate-in zoom-in duration-500">
                {/* Waveform Visualization Mock */}
                <div className="flex-1 glass-dark rounded-[4rem] border border-emerald-500/20 p-12 flex flex-col relative overflow-hidden">
                   <div className="flex justify-between items-start relative z-10 mb-8">
                      <div>
                         <h2 className="text-4xl font-black">{selectedTrack.title}</h2>
                         <p className="text-emerald-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">{selectedTrack.artist} • {selectedTrack.bpm} BPM</p>
                      </div>
                      {!selectedTrack.isAnalyzed && (
                         <button onClick={() => handleAnalyze(selectedTrack)} className="px-10 py-4 bg-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">Start Analysis</button>
                      )}
                   </div>

                   {isAnalyzing ? (
                     <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-pulse">
                        <div className="text-8xl">🧬</div>
                        <p className="text-2xl font-black uppercase tracking-widest">Calculating Beatgrid...</p>
                     </div>
                   ) : (
                     <div className="flex-1 bg-black/40 rounded-[3rem] border border-white/5 relative flex flex-col justify-center px-10 gap-2">
                        {/* Waveform Bars */}
                        <div className="h-48 w-full flex items-center gap-1">
                           {Array.from({ length: 120 }).map((_, i) => {
                             const h = Math.random() * 80 + 20;
                             const isCue = i === 10 || i === 45 || i === 80;
                             return (
                               <div 
                                key={i} 
                                className={`flex-1 rounded-full transition-all duration-700 ${isCue ? 'bg-rose-500 w-1' : 'bg-emerald-600/40 hover:bg-emerald-400'}`} 
                                style={{ height: `${h}%` }} 
                               />
                             );
                           })}
                        </div>
                        {/* Playhead */}
                        <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20" />
                        
                        {/* Grid Lines */}
                        <div className="absolute inset-x-10 bottom-8 h-8 flex justify-between px-2">
                           {Array.from({ length: 16 }).map((_, i) => (
                             <div key={i} className="w-[1px] h-full bg-white/10 text-[8px] font-mono text-gray-700 flex flex-col justify-end">{i + 1}</div>
                           ))}
                        </div>
                     </div>
                   )}
                </div>

                {/* DJ Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
                   {[
                     { label: 'Hot Cues', icon: '🎯', desc: '8 Recallable Points' },
                     { label: 'Phrase Lock', icon: '🎼', desc: 'Auto 8/16/32 Grid' },
                     { label: 'Beatgrid Shift', icon: '⚖️', desc: '+/- 0.05ms Align' },
                     { label: 'Cloud Sync', icon: '☁️', desc: 'Sync to Pro DJ Sw' }
                   ].map(ctrl => (
                     <div key={ctrl.label} className="glass p-8 rounded-[3rem] border border-white/5 hover:border-emerald-500/30 transition-all text-center group cursor-pointer">
                        <div className="text-3xl mb-4 group-hover:scale-125 transition-transform">{ctrl.icon}</div>
                        <h5 className="font-black text-[11px] uppercase tracking-widest mb-1">{ctrl.label}</h5>
                        <p className="text-[9px] text-gray-500 font-bold">{ctrl.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {!selectedTrack && activeTab === 'studio' && (
             <div className="h-full flex flex-col items-center justify-center opacity-30 text-center animate-in fade-in">
                <div className="text-8xl mb-8">🎹</div>
                <h3 className="text-3xl font-black mb-4 uppercase">No Track Active</h3>
                <p className="max-w-xs font-medium">Select a track from your Crate Browser to perform deep neural analysis.</p>
             </div>
           )}
        </main>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default DJMusicApp;
