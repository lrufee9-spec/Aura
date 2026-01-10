
import React, { useState, useEffect, useRef } from 'react';
import { VideoContent } from '../../types';

const MOCK_VIDEOS: VideoContent[] = [
  { id: 'v1', title: 'Nexus: The Final Frontier', creator: 'Universal Movies', thumbnail: 'https://picsum.photos/id/101/800/450', category: 'movie', isPremium: true, price: 150, duration: '2:14:00', likes: 15400, uploadDate: '2023-11-01' },
  { id: 'v2', title: 'Cyber-Pop Anthem', creator: 'DaftNexus', thumbnail: 'https://picsum.photos/id/102/800/450', category: 'music', isPremium: true, price: 25, duration: '3:45', likes: 8900, uploadDate: '2023-11-10' },
  { id: 'v3', title: 'Talent Show: Gravity Defied', creator: 'AcroLink', thumbnail: 'https://picsum.photos/id/103/800/450', category: 'talent', isPremium: false, duration: '12:45', likes: 2100, uploadDate: '2023-11-12' },
  { id: 'v4', title: 'User Upload: My Journey', creator: 'User99', thumbnail: 'https://picsum.photos/id/104/800/450', category: 'global', isPremium: true, price: 10, duration: '5:30', likes: 450, uploadDate: '2023-11-14' },
  { id: 'v5', title: 'Electronic Dreams', creator: 'SynthWave', thumbnail: 'https://picsum.photos/id/105/800/450', category: 'music', isPremium: true, price: 15, duration: '4:12', likes: 12000, uploadDate: '2023-11-05' },
  { id: 'v6', title: 'The Silent Grid (Extended Edition)', creator: 'NightCity', thumbnail: 'https://picsum.photos/id/106/800/450', category: 'movie', isPremium: true, price: 200, duration: '3:05:00', likes: 45000, uploadDate: '2023-10-20' },
  { id: 'v7', title: 'Global News Hub', creator: 'Nexus Broadcasting', thumbnail: 'https://picsum.photos/id/107/800/450', category: 'global', isPremium: false, duration: '1:00:00', likes: 1500, uploadDate: '2023-11-15' },
];

const VideoApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [purchasedVideos, setPurchasedVideos] = useState<VideoContent[]>([]);
  const [showAd, setShowAd] = useState(false);
  const [adTimer, setAdTimer] = useState(0);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  
  const playbackTimeRef = useRef<number>(0);
  const playbackIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Logic: 1-minute ad every 5 minutes of play (300 seconds)
  useEffect(() => {
    if (selectedVideo && !showAd) {
      playbackIntervalRef.current = setInterval(() => {
        playbackTimeRef.current += 1;
        if (playbackTimeRef.current >= 300) {
          triggerAd();
        }
      }, 1000);
    } else {
      if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
    }
    return () => { if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current); };
  }, [selectedVideo, showAd]);

  const triggerAd = () => {
    setShowAd(true);
    setAdTimer(60);
    const timer = setInterval(() => {
      setAdTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowAd(false);
          playbackTimeRef.current = 0;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const purchaseContent = (video: VideoContent) => {
    const isAlreadyPurchased = purchasedVideos.some(v => v.id === video.id);
    if (isAlreadyPurchased) return alert("You already own this content.");

    if (confirm(`Confirm purchase of "${video.title}" for ${video.price} Nexus Credits?`)) {
      setPurchasedVideos(prev => [...prev, { ...video, isPurchased: true }]);
      alert("Purchase complete! Added to your Nexus Playlist.");
    }
  };

  const downloadVideo = (video: VideoContent) => {
    setIsDownloading(video.id);
    setTimeout(() => {
      setIsDownloading(null);
      alert(`${video.title} has been downloaded to your Nexus device storage.`);
    }, 3000);
  };

  const filteredVideos = MOCK_VIDEOS.filter(v => 
    (activeCategory === 'all' || v.category === activeCategory) &&
    (v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.creator.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderVideoCard = (video: VideoContent) => {
    const isOwned = purchasedVideos.some(v => v.id === video.id) || !video.isPremium;
    return (
      <div key={video.id} className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden group hover:border-rose-500/40 transition-all flex flex-col shadow-xl">
        <div className="relative aspect-video bg-black">
          <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
          <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-0.5 rounded text-[10px] font-black text-white">{video.duration}</div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
             {isOwned ? (
               <button onClick={() => setSelectedVideo(video)} className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform">
                  ▶️
               </button>
             ) : (
               <button onClick={() => purchaseContent(video)} className="bg-amber-600 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-amber-500 active:scale-95 transition-all">
                  Purchase: {video.price} CR
               </button>
             )}
          </div>

          <div className="absolute top-4 left-4 flex gap-2">
             <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
               video.category === 'music' ? 'bg-blue-600/20 text-blue-400' :
               video.category === 'movie' ? 'bg-purple-600/20 text-purple-400' : 'bg-emerald-600/20 text-emerald-400'
             }`}>
               {video.category}
             </span>
             {video.isPremium && !purchasedVideos.some(v => v.id === video.id) && (
               <span className="bg-amber-600/20 text-amber-500 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Premium</span>
             )}
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between">
           <div>
              <h3 className="font-bold text-base text-white group-hover:text-rose-400 transition-colors mb-1">{video.title}</h3>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
                By {video.creator} • <span className="text-gray-600">{video.uploadDate}</span>
              </p>
           </div>
           
           <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex gap-4">
                 <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                    <span className="text-lg">❤️</span>
                    <span className="font-bold">{video.likes}</span>
                 </button>
                 <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                    <span className="text-lg">💬</span>
                 </button>
              </div>
              <div className="flex gap-2">
                 {isOwned && (
                   <button 
                    onClick={() => downloadVideo(video)} 
                    disabled={isDownloading === video.id}
                    className="p-3 glass rounded-xl text-gray-400 hover:text-rose-400 transition-all hover:bg-rose-600/10 disabled:opacity-30"
                   >
                     {isDownloading === video.id ? '⌛' : '📥'}
                   </button>
                 )}
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#020202] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-rose-950/20 to-transparent" />
      </div>

      <header className="h-20 flex items-center justify-between px-8 glass-dark border-b border-white/10 z-30 backdrop-blur-3xl">
        <div className="flex items-center gap-6">
          <button onClick={onBackToHome} className="p-3 glass rounded-2xl text-gray-400 hover:text-white transition-all group active:scale-95">
             <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div className="hidden sm:flex flex-col">
             <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Nexus Media</span>
             <h2 className="text-sm font-black uppercase tracking-wider">Cinematic Hub</h2>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8">
           <div className="relative group">
              <input 
                type="text" 
                placeholder="Search movies, music, or global uploads..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3.5 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-medium text-sm"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={() => setActiveCategory('playlist')} className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/20 active:scale-95">My Playlist</button>
           <div className="text-right hidden md:block">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Balance</p>
              <p className="text-sm font-black text-rose-400">💰 12,450 CR</p>
           </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row min-h-0 z-20 overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-72 glass-dark border-r border-white/5 p-8 flex flex-col gap-2 flex-shrink-0">
           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 ml-4">Nexus Explorer</p>
           {[
             { id: 'all', label: 'All Content', icon: '📺' },
             { id: 'movie', label: 'Feature Movies', icon: '🎬' },
             { id: 'music', label: 'Premium Music', icon: '🎵' },
             { id: 'talent', label: 'Talent Showcase', icon: '🌟' },
             { id: 'global', label: 'Global Uploads', icon: '🌍' },
             { id: 'personal', label: 'Private Storage', icon: '☁️' },
           ].map(cat => (
             <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat.id ? 'bg-rose-600 border-rose-400 text-white shadow-xl shadow-rose-600/20' : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-300'
              }`}
             >
               <span className="text-xl">{cat.icon}</span>
               {cat.label}
             </button>
           ))}

           <div className="mt-auto p-6 bg-rose-600/10 border border-rose-500/20 rounded-[2rem] text-center hidden md:block">
              <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2">Creator Hub</h4>
              <p className="text-[10px] text-gray-400 mb-4">Upload your talent and earn Nexus Credits from subscribers.</p>
              <button className="w-full py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 active:scale-95 transition-transform">Upload Video</button>
           </div>
        </aside>

        {/* Dynamic Video Grid */}
        <div className="flex-1 overflow-auto p-10">
           <div className="max-w-7xl mx-auto space-y-12">
              <div className="flex items-center justify-between">
                 <div>
                    <h3 className="text-3xl font-black capitalize">{activeCategory === 'playlist' ? 'My Nexus Playlist' : `${activeCategory} Feed`}</h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">Discover content uploaded by users alround the world</p>
                 </div>
              </div>

              {activeCategory === 'playlist' && purchasedVideos.length === 0 ? (
                <div className="h-[400px] glass rounded-[4rem] border-dashed border-white/10 flex flex-col items-center justify-center opacity-40">
                   <div className="text-8xl mb-8">📼</div>
                   <h4 className="text-xl font-black">Empty Collection</h4>
                   <p className="text-sm mt-4">Purchased music and movies will synchronize here instantly.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {(activeCategory === 'playlist' ? purchasedVideos : filteredVideos).map(v => renderVideoCard(v))}
                </div>
              )}
           </div>
        </div>
      </main>

      {/* Popout Ad System Overlay */}
      {showAd && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-[40px] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
           <div className="max-w-lg w-full glass p-16 rounded-[4rem] border border-rose-500/30 shadow-[0_0_80px_rgba(225,29,72,0.2)]">
              <div className="w-28 h-28 bg-gradient-to-tr from-rose-600 to-orange-500 rounded-[2rem] mx-auto mb-10 flex items-center justify-center text-5xl animate-bounce shadow-2xl">
                📺
              </div>
              <h2 className="text-4xl font-black mb-6 text-white tracking-tight">Support Nexus Creators</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">This 1-minute popout allows Nexus to remain a fair marketplace for all users. Your content resumes instantly when the timer expires.</p>
              
              <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden mb-10">
                 <div 
                  className="h-full bg-rose-600 transition-all duration-1000 shadow-[0_0_20px_rgba(225,29,72,0.8)]" 
                  style={{ width: `${(adTimer / 60) * 100}%` }}
                 />
              </div>

              <div className="flex flex-col items-center gap-2">
                 <div className="text-6xl font-black text-rose-500 tabular-nums">{adTimer}s</div>
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Synchronization Required</span>
              </div>
           </div>
           <p className="mt-12 text-[10px] text-gray-800 font-black uppercase tracking-[0.6em]">Nexus Protocol 2.5 • Unified Media Pipeline</p>
        </div>
      )}

      {/* Mini Player / Selected Video View */}
      {selectedVideo && !showAd && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex flex-col animate-in zoom-in duration-500">
           <header className="h-20 flex items-center justify-between px-10 border-b border-white/5">
              <div className="flex items-center gap-6">
                 <button onClick={() => setSelectedVideo(null)} className="p-3 glass rounded-2xl hover:bg-white/10 transition-all">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
                 <div>
                    <h2 className="text-xl font-black text-white">{selectedVideo.title}</h2>
                    <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest">{selectedVideo.creator} • Now Playing</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <button onClick={() => downloadVideo(selectedVideo)} className="px-6 py-2.5 glass border-rose-500/20 text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-widest">Download Offline</button>
              </div>
           </header>
           <div className="flex-1 relative flex items-center justify-center bg-black">
              <img src={selectedVideo.thumbnail} className="w-full h-full object-contain opacity-40 blur-3xl absolute inset-0" />
              <div className="relative w-full max-w-6xl aspect-video glass-dark border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl flex items-center justify-center">
                 <div className="text-9xl animate-pulse opacity-20">🎞️</div>
                 <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
                    <div className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center text-4xl shadow-2xl cursor-pointer hover:scale-110 transition-transform">⏸️</div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Secure Stream: 1080p Neural-Link</span>
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                    <div className="flex items-center gap-8">
                       <span className="text-sm font-bold tabular-nums">1:45:20 / {selectedVideo.duration}</span>
                    </div>
                    <div className="flex gap-4">
                       <button className="p-3 hover:text-rose-500 transition-colors">❤️</button>
                       <button className="p-3 hover:text-rose-500 transition-colors">💬</button>
                       <button className="p-3 hover:text-rose-500 transition-colors">🔗</button>
                    </div>
                 </div>
                 {/* Progress Slider */}
                 <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/5">
                    <div className="h-full bg-rose-600 w-1/3 shadow-[0_0_15px_rgba(225,29,72,1)]" />
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default VideoApp;
