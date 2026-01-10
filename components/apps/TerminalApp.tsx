import React, { useState, useRef, useEffect } from 'react';
import { terminalCommandExec } from '../../services/geminiService';

interface Log {
  type: 'cmd' | 'res' | 'system' | 'error' | 'success';
  content: string;
}

const TerminalApp: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([
    { type: 'system', content: 'NEXUS OS KERNEL V2.5.0-LTS INITIALIZED' },
    { type: 'system', content: 'NEURAL LINK SECURE. TYPE "NEXUS-HELP" FOR MODULE COMMANDS.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeProcesses, setActiveProcesses] = useState<string[]>(['Kernel-Idle', 'Net-Bridge-Active']);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const cmd = input.trim();
    setLogs(prev => [...prev, { type: 'cmd', content: cmd }]);
    setInput('');
    setIsLoading(true);

    if (cmd.toLowerCase() === 'clear') {
      setLogs([]);
      setIsLoading(false);
      return;
    }

    // Special Terminal-only Process Logic
    if (cmd.toLowerCase().startsWith('run ')) {
        const proc = cmd.split(' ')[1];
        setActiveProcesses(prev => [...prev, proc]);
    }

    const output = await terminalCommandExec(cmd);
    
    // Determine log type based on output content
    let type: Log['type'] = 'res';
    if (output.toLowerCase().includes('error')) type = 'error';
    if (output.toLowerCase().includes('success') || output.toLowerCase().includes('ok')) type = 'success';

    setLogs(prev => [...prev, { type, content: output }]);
    setIsLoading(false);
  };

  const quickCommands = [
    { cmd: 'nexus-status', label: 'System Report', icon: '📊' },
    { cmd: 'ls -R /vault', label: 'Map Vault', icon: '📁' },
    { cmd: 'geo-scan --satellite', label: 'GPS Refresh', icon: '📍' },
    { cmd: 'dj-sync --all', label: 'DJ Sync', icon: '🎧' },
  ];

  return (
    <div className="h-full bg-black flex flex-col md:flex-row terminal-text overflow-hidden relative group">
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Sidebar HUD */}
      <aside className="hidden md:flex w-72 border-r border-white/5 flex-col bg-[#050505] p-6 z-10">
        <div className="mb-10">
           <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-6">Neural Processes</h3>
           <div className="space-y-3">
              {activeProcesses.map((proc, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-gray-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   {proc.toUpperCase()}
                </div>
              ))}
           </div>
        </div>

        <div className="flex-1">
           <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-6">Quick Ops</h3>
           <div className="space-y-2">
              {quickCommands.map(qc => (
                <button 
                  key={qc.cmd}
                  onClick={() => setInput(qc.cmd)}
                  className="w-full flex items-center gap-3 p-3 glass border-white/5 rounded-xl hover:bg-white/5 transition-all text-left group"
                >
                   <span className="text-lg">{qc.icon}</span>
                   <span className="text-[10px] font-black text-gray-400 group-hover:text-white transition-colors">{qc.label}</span>
                </button>
              ))}
           </div>
        </div>

        <div className="p-4 bg-emerald-600/5 border border-emerald-500/20 rounded-2xl mt-auto">
           <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Encrypted Link</p>
           <p className="text-[8px] text-gray-500 font-mono">SSH v4.2 • AES-256</p>
        </div>
      </aside>

      {/* Console Area */}
      <div className="flex-1 flex flex-col p-6 min-w-0 bg-[#020202]">
        <div ref={scrollRef} className="flex-1 overflow-auto space-y-2 mb-4 scroll-smooth">
          {logs.map((log, i) => (
            <div key={i} className={`text-sm leading-relaxed animate-in fade-in slide-in-from-left-2 duration-300 ${
              log.type === 'cmd' ? 'text-white' : 
              log.type === 'res' ? 'text-emerald-400/80' : 
              log.type === 'error' ? 'text-rose-500' :
              log.type === 'success' ? 'text-cyan-400 font-bold' :
              'text-blue-500 font-black'
            }`}>
              {log.type === 'cmd' && <span className="mr-3 text-emerald-500/30 font-black uppercase tracking-tighter">root@nexus:~$</span>}
              <span className="whitespace-pre-wrap">{log.content}</span>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-3 text-emerald-500/40 text-xs font-black animate-pulse">
               <div className="w-3 h-3 border border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin" />
               EXECUTING NEURAL COMMAND...
            </div>
          )}
        </div>

        <form onSubmit={handleCommand} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 group focus-within:border-emerald-500/40 transition-all">
          <span className="text-emerald-500 font-black text-sm tracking-tighter">nexusOS ~ %</span>
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Awaiting input..."
            className="flex-1 bg-transparent text-sm text-gray-100 border-none outline-none font-mono placeholder:text-gray-700"
          />
          <div className="flex gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse [animation-delay:0.2s]" />
          </div>
        </form>
      </div>

      <style>{`
        .terminal-text {
          text-shadow: 0 0 5px rgba(16, 185, 129, 0.2);
        }
      `}</style>
    </div>
  );
};

export default TerminalApp;
