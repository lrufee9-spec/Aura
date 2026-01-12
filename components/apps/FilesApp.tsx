
import React, { useState } from 'react';
import { AppId } from '../../constants';
import { FileNode  } from '../../types';

const MOCK_FILES: FileNode[] = [
  { id: 'f1', name: 'Digital_Driving_License', type: 'file', category: 'document', extension: 'PDF', size: '1.4 MB', modified: '2023-11-20', isPrivate: true, previewUrl: 'https://picsum.photos/id/60/400/300', meta: { isID: true } },
  { id: 'f2', name: 'Identity_Passport_Scan', type: 'file', category: 'document', extension: 'PDF', size: '2.8 MB', modified: '2023-11-18', isPrivate: true, previewUrl: 'https://picsum.photos/id/61/400/300', meta: { isID: true } },
  { id: 'f3', name: 'Nexus_Architecture_v1', type: 'file', category: 'document', extension: 'PDF', size: '12.5 MB', modified: '2023-11-10' },
  { id: 'f4', name: 'Cyberpunk_City_Shot', type: 'file', category: 'photo', extension: 'JPG', size: '8.2 MB', modified: '2023-11-05', previewUrl: 'https://picsum.photos/id/103/1200/800' },
  { id: 'f5', name: 'Neural_Core_Portrait', type: 'file', category: 'photo', extension: 'PNG', size: '15.1 MB', modified: '2023-11-01', previewUrl: 'https://picsum.photos/id/104/1200/800' },
  { id: 'f6', name: 'Family_Dinner_2023', type: 'file', category: 'video', extension: 'MP4', size: '1.2 GB', modified: '2023-10-20', isPrivate: true, previewUrl: 'https://picsum.photos/id/106/1200/800', meta: { duration: '05:22' } },
  { id: 'f7', name: 'Public_Vlog_Snippet', type: 'file', category: 'video', extension: 'MOV', size: '450 MB', modified: '2023-09-15', previewUrl: 'https://picsum.photos/id/107/1200/800', meta: { duration: '01:00' } },
];

const FilesApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const filteredFiles = MOCK_FILES.filter(f => 
    (activeCategory === 'all' || f.category === activeCategory) &&
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShareSync = (targetApp: string) => {
    if (!selectedFile) return;
    setSyncStatus(`Uploading ${selectedFile.name} to ${targetApp}...`);
    setTimeout(() => {
      setSyncStatus(null);
      setIsSharing(false);
      alert(`Success: ${selectedFile.name} is now available in ${targetApp}.`);
    }, 2000);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative font-inter">
      {/* Dynamic Aura Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent blur-[120px]" />
      </div>

      {/* Futuristic Sidebar */}
      <aside className="w-16 md:w-72 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-5">
          <button onClick={onBackToHome} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group active:scale-95 shadow-lg">
            <svg className="w-6 h-6 text-amber-500 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="hidden md:block">
             <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Nexus OS</span>
             <h2 className="text-sm font-black text-white uppercase tracking-widest">Unified Drive</h2>
          </div>
        </div>

        <nav className="flex-1 p-4 md:p-6 space-y-3 mt-4">
          {[
            { id: 'all', label: 'All Files', icon: '📂' },
            { id: 'document', label: 'Documents', icon: '📄' },
            { id: 'photo', label: 'Photos', icon: '🖼️' },
            { id: 'video', label: 'Videos', icon: '🎥' },
          ].map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat.id ? 'bg-amber-600 text-white shadow-xl shadow-amber-600/30' : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="hidden md:block">{cat.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8">
           <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-black text-gray-500 uppercase">Cloud Capacity</span>
                 <span className="text-[10px] font-black text-amber-500">75%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-600 w-3/4" />
              </div>
              <p className="text-[9px] text-gray-600 mt-3 font-bold uppercase tracking-widest">Secure Backup: Active</p>
           </div>
        </div>
      </aside>

      {/* Main Grid Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-24 flex items-center justify-between px-10 glass-dark border-b border-white/5 shrink-0">
           <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search your documents, private IDs, or media..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-14 py-4 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium text-sm"
                />
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
           </div>
           <div className="flex items-center gap-6 ml-10">
              <button className="flex flex-col items-end group">
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">AI Sync Status</span>
                 <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">Everything Cloud-Secure</span>
              </button>
              <button className="px-8 py-4 bg-amber-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-amber-600/20 hover:scale-105 active:scale-95 transition-all">Upload New</button>
           </div>
        </header>

        <main className="flex-1 overflow-auto p-12">
           <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
              <div className="flex items-end justify-between">
                 <div>
                    <h3 className="text-4xl font-black capitalize tracking-tight">{activeCategory === 'all' ? 'Universal Explorer' : `${activeCategory} Vault`}</h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-3">Personal data securely managed by Nexus AI</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                 {filteredFiles.map(file => (
                   <div 
                    key={file.id} 
                    onClick={() => setSelectedFile(file)}
                    className="group flex flex-col gap-5 cursor-pointer"
                   >
                      <div className={`aspect-square rounded-[3rem] border border-white/5 overflow-hidden transition-all group-hover:scale-105 group-hover:border-amber-500/50 relative shadow-2xl bg-white/[0.01] ${
                        selectedFile?.id === file.id ? 'ring-4 ring-amber-500/50' : ''
                      }`}>
                         {file.previewUrl ? (
                           <img src={file.previewUrl} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-6xl opacity-20 group-hover:opacity-100 transition-all">
                              {file.category === 'document' ? '📄' : file.category === 'video' ? '🎥' : '📁'}
                           </div>
                         )}
                         
                         {file.isPrivate && (
                           <div className="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-xl flex items-center justify-center text-amber-500 border border-white/10">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                           </div>
                         )}
                         
                         {file.meta?.isID && (
                           <div className="absolute bottom-5 left-5 bg-amber-600/90 backdrop-blur-lg px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white shadow-xl">Official ID</div>
                         )}
                         
                         {file.category === 'video' && file.meta?.duration && (
                           <div className="absolute bottom-5 right-5 bg-black/80 backdrop-blur-lg px-3 py-1 rounded-lg text-[9px] font-black text-white">{file.meta.duration}</div>
                         )}
                         
                         <div className="absolute inset-0 bg-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                               👁️
                            </div>
                         </div>
                      </div>
                      <div className="text-center">
                         <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">{file.name}</h4>
                         <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-1.5">{file.extension} • {file.size}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </main>

        {/* Dynamic Action Bar */}
        {selectedFile && (
          <div className="h-36 glass-dark border-t border-white/10 z-30 p-8 flex items-center justify-between animate-in slide-in-from-bottom-12 duration-500 backdrop-blur-[40px]">
             <div className="flex items-center gap-8">
                <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/5 overflow-hidden shadow-2xl">
                   {selectedFile.previewUrl && <img src={selectedFile.previewUrl} className="w-full h-full object-cover" />}
                </div>
                <div>
                   <h3 className="text-2xl font-black text-white">{selectedFile.name}</h3>
                   <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                      Vault Item • {selectedFile.extension} Format • Modified {selectedFile.modified}
                   </p>
                </div>
             </div>
             
             <div className="flex items-center gap-4">
                {selectedFile.category === 'photo' && (
                  <button onClick={() => setIsEditingPhoto(true)} className="px-8 py-4 glass border-blue-500/20 text-blue-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600/10 transition-all">AI Enhancement</button>
                )}
                <button onClick={() => setIsSharing(true)} className="px-8 py-4 glass border-emerald-500/20 text-emerald-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600/10 transition-all">System Sync</button>
                <button onClick={() => alert("Downloading file...")} className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl active:scale-95">Download Local</button>
                <button onClick={() => setSelectedFile(null)} className="p-5 hover:bg-white/5 rounded-2xl transition-all">
                   <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
          </div>
        )}
      </div>

      {/* AI Photo Editor */}
      {isEditingPhoto && selectedFile && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-[50px] flex items-center justify-center p-12 animate-in zoom-in duration-500">
           <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-16">
              <div className="flex-1 relative aspect-square glass rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.1)]">
                 <img src={selectedFile.previewUrl} className="w-full h-full object-contain" />
                 <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
              </div>
              <div className="w-full lg:w-[450px] glass-dark p-12 rounded-[5rem] border border-white/5 space-y-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 animate-spin-slow">⚙️</div>
                 </div>
                 
                 <div>
                    <h2 className="text-4xl font-black mb-3 text-white">Neural Image Engine</h2>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.3em]">Nexus AI v2.5 Graphics Bridge</p>
                 </div>

                 <div className="space-y-10">
                    {['Neural Sharpness', 'Chroma Contrast', 'AI Exposure', 'Digital Saturation'].map(control => (
                      <div key={control} className="space-y-4">
                         <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                            <span>{control}</span>
                            <span className="text-blue-400">Optimized</span>
                         </div>
                         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                            <div className="h-full bg-blue-600 w-[75%] shadow-[0_0_20px_rgba(37,99,235,1)]" />
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="flex gap-4 pt-10">
                    <button onClick={() => setIsEditingPhoto(false)} className="flex-1 py-5 glass rounded-[2rem] font-black text-[11px] uppercase tracking-widest">Cancel</button>
                    <button onClick={() => { alert("Photo enhanced and saved to vault."); setIsEditingPhoto(false); }} className="flex-1 py-5 bg-blue-600 rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-600/30 active:scale-95 transition-all">Process AI</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Sync Manager Portal */}
      {isSharing && selectedFile && (
        <div className="fixed inset-0 z-[110] bg-black/92 backdrop-blur-[60px] flex items-center justify-center p-8 animate-in fade-in duration-500">
           <div className="max-w-2xl w-full glass-dark p-16 rounded-[5rem] border border-emerald-500/30 text-center relative overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.15)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse" />
              
              <div className="w-32 h-32 bg-emerald-600/10 border border-emerald-500/20 rounded-[2.5rem] mx-auto mb-12 flex items-center justify-center text-6xl shadow-inner">
                 🔗
              </div>
              
              <h2 className="text-4xl font-black mb-4 tracking-tight">Cross-System Sync</h2>
              <p className="text-gray-400 text-sm mb-16 leading-relaxed">
                Synchronize <span className="text-emerald-400 font-bold">"{selectedFile.name}"</span> across your Nexus personal infrastructure. 
                Data remains encrypted in transit.
              </p>

              <div className="grid grid-cols-2 gap-6">
                 {[
                   { id: AppId.INBOX, name: 'Mail Vault', icon: '📩', color: 'emerald' },
                   { id: AppId.CONTENT, name: 'Content Hub', icon: '📺', color: 'purple' },
                   { id: AppId.AI_CHAT, name: 'AI Assistant', icon: '🤖', color: 'indigo' },
                   { id: AppId.CHAT, name: 'Secure Chat', icon: '💬', color: 'blue' }
                 ].map(app => (
                   <button 
                    key={app.id} 
                    onClick={() => handleShareSync(app.name)}
                    className="flex flex-col items-center gap-5 p-8 glass rounded-[3.5rem] hover:bg-white/5 transition-all border-white/5 hover:border-emerald-500/30 group active:scale-[0.97]"
                   >
                      <span className="text-4xl group-hover:scale-110 transition-transform">{app.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-emerald-400">Sync to {app.name}</span>
                   </button>
                 ))}
              </div>

              <button onClick={() => setIsSharing(false)} className="mt-16 text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 hover:text-white transition-colors underline decoration-gray-800 underline-offset-8">Abort Sync Bridge</button>
           </div>
        </div>
      )}

      {/* Global Sync Overlay */}
      {syncStatus && (
        <div className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-[100px] flex flex-col items-center justify-center animate-in fade-in duration-500">
           <div className="w-24 h-24 border-8 border-white/5 border-t-amber-500 rounded-full animate-spin mb-10 shadow-[0_0_40px_rgba(245,158,11,0.3)]" />
           <p className="text-3xl font-black text-white uppercase tracking-widest animate-pulse">{syncStatus}</p>
           <p className="mt-6 text-[10px] text-gray-600 font-black uppercase tracking-[0.6em]">Nexus Neural Transfer Bridge Protocol v2.5</p>
        </div>
      )}

      <style>{`
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default FilesApp;
