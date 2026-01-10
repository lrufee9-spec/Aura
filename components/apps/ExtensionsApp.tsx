import React, { useState } from 'react';

interface ExtensionItem {
  id: string;
  name: string;
  category: 'class' | 'ai' | 'finance' | 'game';
  icon: string;
  description: string;
  price?: number;
  isInstalled?: boolean;
}

const ExtensionsApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'store' | 'studio' | 'installed'>('store');
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installProgress, setInstallProgress] = useState(0);

  const EXTENSIONS: ExtensionItem[] = [
    { id: 'ex1', name: 'Neural Scripting 101', category: 'class', icon: '🎓', description: 'Master the Nexus kernel language.', price: 0 },
    { id: 'ex2', name: 'AI Video Architect', category: 'ai', icon: '🎬', description: 'Pro-grade neural video sequencing.', price: 200 },
    { id: 'ex3', name: 'Nexus Gift Card $50', category: 'finance', icon: '🧧', description: 'Reload your Nexus Profile balance.', price: 50 },
    { id: 'ex4', name: 'Nexus Gift Card $200', category: 'finance', icon: '💳', description: 'Reload your Nexus Profile balance.', price: 200 },
    { id: 'ex5', name: 'Cyber-Strike Game Pack', category: 'game', icon: '☄️', description: 'Includes 5 high-octane battle games.', price: 45 },
    { id: 'ex6', name: 'Quantum Physics Hub', category: 'class', icon: '⚛️', description: 'Deep dive into spatial computing.', price: 15 },
  ];

  const handleInstall = (ext: ExtensionItem) => {
    if (ext.category === 'finance') {
      alert(`Synchronizing ${ext.name} to Profile... ${ext.price} Credits added to your account.`);
      return;
    }

    setInstallingId(ext.id);
    setInstallProgress(0);
    
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setInstallingId(null);
          alert(`${ext.name} installed successfully. Shortcut added to Home Desktop.`);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative font-inter">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-[-10%] right-[-10%] w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent blur-[120px]" />
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-16 md:w-72 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-5">
          <button onClick={onBackToHome} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group active:scale-95 shadow-lg">
            <svg className="w-6 h-6 text-pink-500 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="hidden md:block">
             <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.4em]">Marketplace</span>
             <h2 className="text-sm font-black text-white uppercase tracking-widest">Extensions</h2>
          </div>
        </div>

        <nav className="flex-1 p-4 md:p-6 space-y-3 mt-4">
          {[
            { id: 'store', label: 'Extension Store', icon: '🧩' },
            { id: 'studio', label: 'AI Video Studio', icon: '🎞️' },
            { id: 'installed', label: 'Active Modules', icon: '✅' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-pink-600 text-white shadow-xl shadow-pink-600/30' : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="hidden md:block">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
           <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Sync Status</p>
              <p className="text-xs font-black text-emerald-400 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 UP TO DATE
              </p>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-24 flex items-center justify-between px-10 glass-dark border-b border-white/5 shrink-0">
           <div className="flex flex-col">
              <h3 className="text-2xl font-black uppercase tracking-tight">Extensions Hub</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Enhance your NexusOS environment</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="text-right">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Profile Balance</p>
                 <p className="text-sm font-black text-pink-400">💰 12,450.00</p>
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-auto p-10">
           {activeTab === 'store' && (
             <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {EXTENSIONS.map(ext => (
                     <div key={ext.id} className="glass-dark p-8 rounded-[3.5rem] border border-white/5 hover:border-pink-500/40 transition-all flex flex-col justify-between group shadow-xl bg-white/[0.01]">
                        <div className="flex justify-between items-start mb-6">
                           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                              {ext.icon}
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest bg-pink-600/10 text-pink-400 px-3 py-1 rounded-full border border-pink-500/20">
                              {ext.category}
                           </span>
                        </div>
                        <div>
                           <h4 className="text-xl font-black mb-2">{ext.name}</h4>
                           <p className="text-gray-500 text-xs font-medium leading-relaxed mb-8">{ext.description}</p>
                        </div>
                        <button 
                          onClick={() => handleInstall(ext)}
                          disabled={installingId === ext.id}
                          className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-pink-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                           {installingId === ext.id ? (
                             <>
                               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                               Installing {installProgress}%
                             </>
                           ) : (
                             ext.category === 'finance' ? `Load Balance: $${ext.price}` : `Install Module • ${ext.price ? `${ext.price} CR` : 'FREE'}`
                           )}
                        </button>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'studio' && (
             <div className="max-w-6xl mx-auto h-full flex flex-col gap-10 animate-in slide-in-from-right-12 duration-500">
                <div className="flex-1 glass-dark rounded-[4rem] border border-pink-500/20 p-12 flex flex-col overflow-hidden relative">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                         <h2 className="text-3xl font-black">AI Video Architect</h2>
                         <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Neural Sequencing Engine v4.0</p>
                      </div>
                      <button className="px-8 py-3 bg-pink-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-pink-600/20">New Project</button>
                   </div>

                   <div className="flex-1 bg-black/40 rounded-[3rem] border border-white/5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 text-center p-12">
                         <div className="text-8xl mb-8">📽️</div>
                         <h3 className="text-2xl font-black mb-4">Neural Canvas Ready</h3>
                         <p className="max-w-sm text-sm">Drag video files from your Nexus Vault or use AI to generate sequences from text prompts.</p>
                      </div>
                      {/* Timeline Mock */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-black/60 backdrop-blur-md border-t border-white/5 p-4 flex items-center gap-2">
                         {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                           <div key={i} className="h-full w-12 bg-white/5 rounded-lg border border-white/10 flex-shrink-0 animate-pulse" style={{animationDelay: `${i*0.1}s`}} />
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'installed' && (
             <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
                <div className="flex justify-between items-end">
                   <div>
                      <h2 className="text-3xl font-black">Active Modules</h2>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Currently synchronized with Nexus Desktop</p>
                   </div>
                   <button className="text-[10px] font-black uppercase tracking-widest text-pink-500 hover:text-pink-400 underline decoration-pink-500/30 underline-offset-8 transition-colors">Uninstall All</button>
                </div>

                <div className="space-y-4">
                   {[
                     { name: 'Neural Terminal Plus', icon: '💻', date: 'Installed 2 days ago' },
                     { name: 'Global News Feed', icon: '🗞️', date: 'Installed 5 days ago' }
                   ].map((mod, i) => (
                     <div key={i} className="glass p-8 rounded-[3rem] border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-8">
                           <div className="text-4xl group-hover:scale-110 transition-transform">{mod.icon}</div>
                           <div>
                              <h4 className="text-xl font-black text-white">{mod.name}</h4>
                              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{mod.date}</p>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <button className="px-6 py-2 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-600 transition-all">Configure</button>
                           <button className="p-3 glass border-rose-500/20 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all">🗑️</button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </main>
      </div>

      {/* Global Install Overlay */}
      {installingId && (
        <div className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-[100px] flex flex-col items-center justify-center animate-in fade-in duration-500">
           <div className="w-32 h-32 relative mb-12">
              <div className="absolute inset-0 border-8 border-white/5 rounded-full" />
              <div className="absolute inset-0 border-8 border-pink-500 rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-4xl">🚀</div>
           </div>
           <p className="text-3xl font-black text-white uppercase tracking-[0.5em] animate-pulse">INSTALLING SYSTEM MODULE</p>
           <p className="mt-6 text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">Syncing to Home Desktop Portal v2.5</p>
        </div>
      )}
    </div>
  );
};

export default ExtensionsApp;