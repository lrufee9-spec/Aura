import React, { useState } from 'react';

type ProfileSection = 'account' | 'security' | 'billing';

interface ProfileAppProps {
  onBackToHome?: () => void;
}

const ProfileApp: React.FC<ProfileAppProps> = ({ onBackToHome }) => {
  const [activeSection, setActiveSection] = useState<ProfileSection>('account');

  const renderSection = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 glass rounded-3xl bg-white/[0.02] border border-white/5">
              <div className="relative group">
                <img 
                  src="https://picsum.photos/id/64/300/300" 
                  alt="User Profile" 
                  className="w-28 h-28 rounded-3xl object-cover ring-4 ring-blue-500/10 group-hover:ring-blue-500/30 transition-all shadow-2xl"
                />
                <button className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl shadow-lg hover:scale-110 transition-transform active:scale-95">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-black text-white">Aura User</h3>
                <p className="text-blue-400 text-sm font-medium tracking-wide">identity@aura.os</p>
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-blue-500/20">Aura Pro</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-emerald-500/20">Identity Verified</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-3xl flex flex-col justify-between h-44 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent border-blue-500/20 group hover:border-blue-500/40 transition-all shadow-lg">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Personal Balance</span>
                  <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white tracking-tight">$2,450.00</div>
                  <div className="text-xs text-emerald-400 mt-2 font-bold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.293-9.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.879-1.879z" clipRule="evenodd"/></svg>
                    + $120.50 this month
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-3xl flex flex-col justify-between h-44 bg-gradient-to-br from-purple-600/10 via-transparent to-transparent border-purple-500/20 group hover:border-purple-500/40 transition-all shadow-lg">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Productivity Score</span>
                  <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white">42.5 hrs <span className="text-sm font-normal text-gray-500">/ week</span></div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">Personal Efficiency Index: 94%</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-black mb-6 tracking-tight text-white italic">Neural Security Core</h3>
            <div className="space-y-3">
              <div className="glass p-6 rounded-[2rem] border border-blue-500/30 bg-blue-500/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase tracking-widest">Neural MFA Status</p>
                    <p className="text-xs text-emerald-400 font-bold mt-1">ACTIVE • SYNCED WITH GOOGLE CLOUD</p>
                  </div>
                </div>
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              <button className="w-full glass p-5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all border border-white/5 active:scale-[0.99]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Update Neural Key</p>
                    <p className="text-xs text-gray-500">Rotate primary workspace credentials</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="glass p-5 rounded-2xl flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 border border-cyan-500/20">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M3 7a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Biometric Mirroring</p>
                    <p className="text-xs text-gray-500">Fingerprint auth synced to local device</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1 border border-white/10 shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-xl font-black mb-6 text-white italic">Neural Credit Ledger</h3>
             <div className="space-y-2">
                {[
                  { title: 'Global Sync Top-up', date: '2023-11-15', price: '+ $500.00', status: 'Completed', icon: '💰' },
                  { title: 'Aura Cloud Subscription', date: '2023-11-01', price: '- $49.99', status: 'Completed', icon: '🤖' },
                  { title: 'Play Store Bundle', date: '2023-10-22', price: '- $12.99', status: 'Completed', icon: '📚' }
                ].map((item, i) => (
                  <div key={i} className="glass p-4 rounded-2xl flex justify-between items-center border border-white/5 hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-xs text-gray-500 font-medium">{item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-black ${item.price.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>{item.price}</p>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{item.status}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#050505] overflow-hidden">
      <div className="w-full md:w-72 border-r border-white/5 flex flex-col bg-black/40 backdrop-blur-3xl relative z-10">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-xs">A</div>
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Neural Profile</h2>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'account', label: 'Core Identity', icon: '👤' },
              { id: 'security', label: 'Security Link', icon: '🛡️' },
              { id: 'billing', label: 'Credit Hub', icon: '💳' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as ProfileSection)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all border ${
                  activeSection === item.id 
                    ? 'bg-blue-600/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                    : 'text-gray-500 hover:bg-white/5 hover:text-gray-300 border-transparent'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-3">
          <button 
            onClick={onBackToHome}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 transition-all group active:scale-[0.98]"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            System Exit
          </button>
          <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black text-rose-500 hover:bg-rose-500/10 transition-all group active:scale-[0.98]">
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Deauth User
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        <header className="h-20 flex items-center px-10 border-b border-white/5 justify-between bg-black/20 backdrop-blur-md sticky top-0 z-20">
          <div className="flex flex-col">
            <h1 className="font-black text-lg tracking-tight capitalize text-white italic">{activeSection} Control</h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AuraOS Neural Workspace Management</p>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6 md:p-12 lg:p-16 max-w-5xl mx-auto w-full relative z-10">
          {renderSection()}
        </main>

        <div className="absolute top-1/4 right-10 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};

export default ProfileApp;