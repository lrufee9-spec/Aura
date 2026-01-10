
import React, { useState } from 'react';

interface DeploymentStatus {
  platform: string;
  url: string;
  status: 'live' | 'deploying' | 'error';
  version: string;
  lastDeploy: string;
}

const SettingsApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'cloud' | 'playstore' | 'security'>('system');
  const [isDeploying, setIsDeploying] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [mfaStep, setMfaStep] = useState(0);

  const deployment: DeploymentStatus = {
    platform: 'Google Firebase',
    url: 'aura-os-neural.web.app',
    status: 'live',
    version: '2.5.0-production',
    lastDeploy: 'Just now'
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert("AuraOS Successfully Deployed to Google Cloud Edge Nodes.");
    }, 3000);
  };

  const renderSecurityWizard = () => (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl animate-pulse">
          🛡️
        </div>
        <h2 className="text-3xl font-black italic">2-Step Verification</h2>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Neural Security Layer Configuration</p>
      </div>

      <div className="glass-dark p-8 rounded-[3rem] border border-blue-500/30">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(step => (
            <div key={step} className={`h-1.5 flex-1 rounded-full ${mfaStep >= step ? 'bg-blue-500' : 'bg-white/10'}`} />
          ))}
        </div>

        {mfaStep === 0 && (
          <div className="space-y-6 text-center">
            <p className="text-gray-400 text-sm leading-relaxed">
              To gain global access to Firebase Hosting and the Google Play Store, AuraOS requires an additional layer of security.
            </p>
            <button 
              onClick={() => setMfaStep(1)}
              className="w-full py-4 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
            >
              Begin Neural Setup
            </button>
          </div>
        )}

        {mfaStep === 1 && (
          <div className="space-y-6">
            <h4 className="font-black text-sm uppercase tracking-widest text-blue-400">Step 1: Passkeys</h4>
            <div className="p-6 glass rounded-2xl border-white/5 bg-white/5">
              <p className="text-xs text-gray-300">Sync your biometric thumbprint or hardware security key with AuraOS.</p>
            </div>
            <button 
              onClick={() => setMfaStep(2)}
              className="w-full py-4 bg-emerald-600 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
            >
              Add Passkey
            </button>
          </div>
        )}

        {mfaStep === 2 && (
          <div className="space-y-6">
            <h4 className="font-black text-sm uppercase tracking-widest text-emerald-400">Step 2: Neural Authenticator</h4>
            <p className="text-xs text-gray-500">Install the Aura Authenticator on your primary mobile device to receive sync codes.</p>
            <div className="aspect-square w-32 bg-white p-2 rounded-2xl mx-auto flex items-center justify-center">
              <div className="text-[10px] text-black font-black uppercase text-center">SCAN QR<br/>SYNC OS</div>
            </div>
            <button 
              onClick={() => setMfaStep(3)}
              className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
            >
              Verify Sync
            </button>
          </div>
        )}

        {mfaStep === 3 && (
          <div className="text-center py-6">
            <div className="text-6xl mb-6 animate-bounce">✅</div>
            <h3 className="text-2xl font-black text-white">Neural MFA Active</h3>
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">AuraOS v2.5.0 Secured</p>
            <button 
              onClick={() => { setMfaStep(0); setActiveTab('cloud'); }}
              className="mt-8 px-10 py-3 glass border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest"
            >
              Proceed to Cloud Hosting
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative font-inter">
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 left-1/4 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent blur-[120px]" />
      </div>

      <aside className="w-16 md:w-72 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-5">
          <button onClick={onBackToHome} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group active:scale-95 shadow-lg">
            <svg className="w-6 h-6 text-blue-500 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="hidden md:block">
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Configuration</span>
             <h2 className="text-sm font-black text-white uppercase tracking-widest">Settings</h2>
          </div>
        </div>

        <nav className="flex-1 p-4 md:p-6 space-y-3 mt-4">
          {[
            { id: 'system', label: 'System Prefs', icon: '⚙️' },
            { id: 'security', label: 'Neural 2FA', icon: '🛡️' },
            { id: 'cloud', label: 'Hosting Hub', icon: '☁️' },
            { id: 'playstore', label: 'Play Store', icon: '🤖' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="hidden md:block">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-24 flex items-center justify-between px-10 glass-dark border-b border-white/5 shrink-0">
           <div className="flex flex-col">
              <h3 className="text-2xl font-black uppercase tracking-tight italic">
                {activeTab === 'system' ? 'System Core' : activeTab === 'security' ? 'Security Wizard' : activeTab === 'cloud' ? 'Deployment HUD' : 'Global Release'}
              </h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">AuraOS Management Engine</p>
           </div>
        </header>

        <main className="flex-1 overflow-auto p-10">
           {activeTab === 'security' ? renderSecurityWizard() : activeTab === 'system' && (
             <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div className="glass-dark p-10 rounded-[4rem] border border-white/5 space-y-10">
                   <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest">Identity Authentication</h4>
                   <div className="flex items-center justify-between p-6 glass rounded-3xl border-white/5">
                      <div className="flex items-center gap-6">
                         <div className="text-3xl">☝️</div>
                         <div>
                            <p className="font-bold text-white">Touch ID Mirroring</p>
                            <p className="text-xs text-gray-500 mt-1">Unlock using device-native biometric bridge</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                        className={`w-14 h-7 rounded-full flex items-center px-1 transition-all ${biometricsEnabled ? 'bg-blue-600 justify-end' : 'bg-white/10 justify-start'}`}
                      >
                         <div className="w-5 h-5 bg-white rounded-full shadow-lg" />
                      </button>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'cloud' && (
             <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-500">
                <div className="text-center py-10">
                   <div className="w-32 h-32 bg-blue-600/10 rounded-[3rem] border border-blue-500/30 flex items-center justify-center text-7xl mx-auto mb-8 shadow-2xl">☁️</div>
                   <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Google Hosting HUD</h2>
                   <p className="text-gray-400 text-sm max-w-md mx-auto">Your AuraOS is now optimized for the high-security Google Cloud environment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="glass-dark p-8 rounded-[3.5rem] border border-emerald-500/20 relative">
                      <div className="absolute top-8 right-8 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Network Status</p>
                      <h4 className="text-xl font-black text-white">{deployment.platform}</h4>
                      <p className="text-xs font-mono text-gray-500 mt-2">{deployment.url}</p>
                   </div>

                   <div className="glass-dark p-8 rounded-[3.5rem] border border-white/5 flex flex-col justify-between">
                      <div>
                         <h4 className="text-lg font-black text-white italic">Cloud Push</h4>
                         <p className="text-xs text-gray-500 mt-2">Manually trigger a neural rebuild to Google Cloud servers.</p>
                      </div>
                      <button 
                        onClick={handleDeploy}
                        disabled={isDeploying}
                        className="mt-8 w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                         {isDeploying ? 'Deploying...' : 'Initiate Push'}
                      </button>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'playstore' && (
             <div className="max-w-4xl mx-auto space-y-12 animate-in zoom-in duration-500">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-emerald-600/10 rounded-[2rem] border border-emerald-500/30 flex items-center justify-center text-4xl">🤖</div>
                      <div>
                         <h2 className="text-3xl font-black">Play Console Sync</h2>
                         <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Native Bundle Integration</p>
                      </div>
                   </div>
                </div>

                <div className="glass-dark p-12 rounded-[4rem] border border-white/5 flex flex-col md:flex-row items-center gap-12">
                   <div className="flex-1">
                      <h3 className="text-xl font-black mb-4 italic">Compile AAB Bundle</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-8">Ready to release AuraOS on the Play Store? Use the PWA metadata to generate your TWA bundle.</p>
                      <button onClick={() => alert("Building Android Package...")} className="px-10 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Build for Play Store</button>
                   </div>
                </div>
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

export default SettingsApp;
