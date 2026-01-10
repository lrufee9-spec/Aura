import React, { useState } from 'react';

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1200);
  };

  const handleFingerprint = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#050505] p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse [animation-delay:2s]" />

      <div className="w-full max-w-md glass-dark p-8 md:p-10 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-700 relative z-10">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-blue-500/20 transform hover:rotate-6 transition-transform">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 italic">AuraOS</h1>
          <p className="text-gray-400 font-medium">
            {isRegistering ? 'Initialize your neural core' : 'Welcome back to your workspace'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {isRegistering && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Universal Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                placeholder="identity@aura.os"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Username</label>
            <input 
              type="text" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              placeholder="Aura User"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Neural Key</label>
            <input 
              type="password" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Syncing...' : (isRegistering ? 'Initialize Aura' : 'Boot AuraOS')}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="flex items-center w-full gap-4">
            <div className="h-[1px] bg-white/10 flex-grow" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">or biometrics</span>
            <div className="h-[1px] bg-white/10 flex-grow" />
          </div>

          <button 
            onClick={handleFingerprint}
            className="group flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-blue-500/50 transition-all text-sm text-gray-300 font-semibold"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            Touch ID Unlock
          </button>

          <p className="text-sm text-gray-500">
            {isRegistering ? 'Already have an Aura core?' : 'New to AuraOS?'}{' '}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-400 font-bold hover:underline"
            >
              {isRegistering ? 'Sign In' : 'Create Identity'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;