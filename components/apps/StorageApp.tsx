
import React from 'react';

interface StorageAppProps {
  onBackToHome?: () => void;
  onOpenDJMusic?: () => void;
}

const StorageApp: React.FC<StorageAppProps> = ({ onBackToHome, onOpenDJMusic }) => {
  const stats = [
    { name: 'System Core', size: '24 GB', color: 'bg-blue-500', percent: 15 },
    { name: 'Applications', size: '42 GB', color: 'bg-indigo-500', percent: 25 },
    { name: 'DJ Library', size: '156 GB', color: 'bg-emerald-500', percent: 45 },
    { name: 'Personal Vault', size: '12 GB', color: 'bg-rose-500', percent: 5 },
  ];

  const totalUsed = stats.reduce((acc, curr) => acc + curr.percent, 0);

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white relative font-inter overflow-hidden">
      <header className="h-20 flex items-center justify-between px-8 glass-dark border-b border-white/5 z-20 shrink-0">
        <div className="flex items-center gap-6">
          <button onClick={onBackToHome} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group active:scale-95">
            <svg className="w-6 h-6 text-emerald-500 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Hardware Intelligence</span>
            <h2 className="text-sm font-black uppercase tracking-wider">Nexus Storage Hub</h2>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-10 space-y-12">
        {/* Storage Bar Section */}
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-black">Memory Integrity</h3>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Managing 512 GB Neural Storage</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-white tabular-nums">{totalUsed}%</span>
              <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Total Consumption</p>
            </div>
          </div>

          <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden flex shadow-inner border border-white/5">
            {stats.map((s, i) => (
              <div 
                key={i} 
                className={`${s.color} h-full transition-all duration-1000 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]`} 
                style={{ width: `${s.percent}%` }} 
                title={`${s.name}: ${s.size}`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="glass p-6 rounded-[2rem] flex items-center justify-between border-white/5 group hover:bg-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${s.color} shadow-lg`} />
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{s.name}</p>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{s.size}</p>
                  </div>
                </div>
                <div className="text-xs font-black text-gray-400">{s.percent}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Hub */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            onClick={onOpenDJMusic}
            className="group cursor-pointer relative glass-dark p-10 rounded-[3.5rem] border border-emerald-500/20 hover:border-emerald-500/60 transition-all bg-gradient-to-br from-emerald-600/10 via-transparent to-transparent shadow-2xl"
          >
            <div className="absolute top-8 right-8 text-4xl group-hover:rotate-12 transition-transform">🎧</div>
            <h4 className="text-2xl font-black mb-2">DJ MUSIC SUITE</h4>
            <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">Download from YouTube, analyze waveforms, and sync directly to Serato, Rekordbox, or VirtualDJ Crates.</p>
            <button className="px-8 py-3 bg-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 group-hover:scale-105 transition-transform">Launch Studio</button>
          </div>

          <div className="glass-dark p-10 rounded-[3.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent">
            <div className="text-4xl mb-6">🛠️</div>
            <h4 className="text-2xl font-black mb-2">Drive Optimizer</h4>
            <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed">AI detected 4.2 GB of temporary cached metadata that can be flushed to improve neural response times.</p>
            <button onClick={() => alert("Optimizing file system...")} className="px-8 py-3 glass border-blue-500/30 text-blue-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Run Maintenance</button>
          </div>
        </div>
      </main>

      <footer className="h-16 px-10 glass-dark border-t border-white/5 flex items-center justify-between shrink-0">
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Nexus Health Index: 98.4% Optimal</p>
        <div className="flex gap-4">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse [animation-delay:0.2s]" />
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse [animation-delay:0.4s]" />
        </div>
      </footer>
    </div>
  );
};

export default StorageApp;
