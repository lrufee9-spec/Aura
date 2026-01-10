
import React from 'react';

const DashboardApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  return (
    <div className="flex h-full bg-[#020202] text-white overflow-hidden relative font-inter p-6 md:p-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 animate-in fade-in zoom-in duration-700">
        
        {/* Header Section */}
        <header className="flex justify-between items-end mb-4">
           <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Command Center</h1>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Aura Neural Interface • Global Sync Active</p>
           </div>
           <div className="flex gap-4">
              <div className="glass px-6 py-3 rounded-2xl border-white/5 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Core Nominal</span>
              </div>
           </div>
        </header>

        {/* Deployment Section */}
        <div className="glass-dark p-10 rounded-[4rem] border border-blue-500/30 bg-gradient-to-br from-blue-600/5 to-transparent relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8">
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Security Link: Verified</span>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1">
                 <h2 className="text-2xl font-black mb-2 italic">Global Release Hub</h2>
                 <p className="text-gray-400 text-sm leading-relaxed mb-6">
                   MFA configuration detected. Your developer identity is now linked to the AuraOS global infrastructure. You are ready for Firebase and the Play Store.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <a href="https://console.firebase.google.com" target="_blank" className="px-8 py-3 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Launch Firebase</a>
                    <a href="https://play.google.com/console" target="_blank" className="px-8 py-3 glass border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest">Play Console</a>
                 </div>
              </div>
              <div className="hidden lg:block w-48 h-48 border-4 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center p-6 text-center">
                 <span className="text-4xl mb-4">🛡️</span>
                 <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
                    <div className="w-full h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                 </div>
                 <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-tight">MFA SECURED</p>
              </div>
           </div>
        </div>

        {/* Top Row: Core Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="glass-dark p-8 rounded-[3.5rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-600/5 to-transparent relative group">
              <h3 className="text-lg font-black mb-6 uppercase tracking-widest italic">Neural Identity</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 uppercase tracking-tighter">Status</span>
                    <span className="text-emerald-400 font-black">BIOMETRIC SYNCED</span>
                 </div>
                 <div className="pt-4 border-t border-white/5 text-[9px] text-gray-500 font-black uppercase tracking-widest">User ID: aura_master_01</div>
              </div>
           </div>

           <div className="glass-dark p-8 rounded-[3.5rem] border border-sky-500/20 bg-gradient-to-br from-sky-600/5 to-transparent">
              <h3 className="text-lg font-black mb-6 uppercase tracking-widest italic">GPS Telemetry</h3>
              <div className="space-y-4 text-xs">
                 <div className="flex justify-between">
                    <span className="text-gray-500">Signal Range</span>
                    <span className="text-white font-mono">Global Link</span>
                 </div>
                 <div className="pt-4 border-t border-white/5 text-sky-400 font-bold tracking-widest uppercase">Encryption Active</div>
              </div>
           </div>

           <div className="glass-dark p-8 rounded-[3.5rem] border border-pink-500/20 bg-gradient-to-br from-pink-600/5 to-transparent">
              <h3 className="text-lg font-black mb-6 uppercase tracking-widest italic">Neural Memory</h3>
              <div className="space-y-4 text-xs">
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-600 w-[92%]" />
                 </div>
                 <div className="pt-2 text-pink-400 font-bold uppercase tracking-widest">VAULT INTEGRITY 92%</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardApp;
