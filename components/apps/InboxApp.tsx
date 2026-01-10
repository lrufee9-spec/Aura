
import React, { useState, useEffect } from 'react';
import { Email } from '../../types';

const MOCK_EMAILS: Email[] = [
  {
    id: 'e1',
    sender: 'Nexus System Core',
    subject: 'Security Protocol Updated',
    body: 'Greetings User, Your biometric security encryption has been upgraded to v2.5. Please review the attached protocol document for details on the new multi-layer authentication bridge.',
    timestamp: Date.now() - 3600000,
    isRead: false,
    attachments: [{ name: 'Security_Protocols_v2.5.docx', type: 'doc', size: '1.2 MB' }],
    isStarred: true
  },
  {
    id: 'e2',
    sender: 'Sarah Reed (Chat Sync)',
    subject: 'Synced Long-form Message',
    body: 'I was thinking about the project roadmap for next year and I have a lot of detailed points. Since this exceeded the 50-character limit, Nexus synchronized this to our shared inbox for better tracking...',
    timestamp: Date.now() - 7200000,
    isRead: true,
    attachments: []
  },
  {
    id: 'e3',
    sender: 'Global Marketplace',
    subject: 'Nexus Credits Transaction',
    body: 'Your recent transaction of 500 Nexus Credits was successful. You can find the invoice attached to this email.',
    timestamp: Date.now() - 86400000,
    isRead: true,
    attachments: [{ name: 'Invoice_8842.pdf', type: 'pdf', size: '450 KB' }]
  }
];

const InboxApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const handleSend = () => {
    if (!composeData.to || !composeData.subject) return;
    const newEmail: Email = {
      id: 'e' + Date.now(),
      sender: 'Me (NexusOS)',
      subject: composeData.subject,
      body: composeData.body,
      timestamp: Date.now(),
      isRead: true,
      attachments: []
    };
    setEmails([newEmail, ...emails]);
    setIsComposing(false);
    setComposeData({ to: '', subject: '', body: '' });
  };

  const convertToPdf = () => {
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      alert('Document converted to NexusPDF instantly. Saved to /Home/user/Documents');
    }, 1500);
  };

  const simulatePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      window.print();
    }, 1000);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative">
      {/* Sidebar - Email Folders */}
      <div className="w-16 md:w-64 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <button onClick={onBackToHome} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="hidden md:block font-black text-xs uppercase tracking-[0.2em] text-emerald-500">Nexus Inbox</h2>
        </div>

        <div className="p-4 md:p-6">
          <button 
            onClick={() => setIsComposing(true)}
            className="w-full py-4 bg-emerald-600 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all group active:scale-95"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden md:block text-xs font-black uppercase tracking-widest text-white">Compose</span>
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 md:px-4">
          {[
            { id: 'inbox', label: 'Inbox', icon: '📥', count: 3 },
            { id: 'starred', label: 'Starred', icon: '⭐', count: 0 },
            { id: 'sent', label: 'Sent', icon: '📤', count: 0 },
            { id: 'drafts', label: 'Drafts', icon: '📝', count: 1 },
            { id: 'trash', label: 'Trash', icon: '🗑️', count: 0 }
          ].map(folder => (
            <button key={folder.id} className="w-full flex items-center justify-between p-3 md:p-4 rounded-xl hover:bg-white/5 transition-all text-gray-400 hover:text-white group">
              <div className="flex items-center gap-4">
                <span className="text-xl group-hover:scale-110 transition-transform">{folder.icon}</span>
                <span className="hidden md:block text-xs font-bold uppercase tracking-widest">{folder.label}</span>
              </div>
              {folder.count > 0 && <span className="hidden md:block bg-emerald-600/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full">{folder.count}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Area: List or Reader */}
      <div className="flex-1 flex flex-col relative">
        {isComposing ? (
          /* Compose View */
          <div className="flex-1 flex flex-col p-6 md:p-12 animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto w-full glass-dark p-8 rounded-[3rem] border border-white/5 shadow-2xl space-y-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-white">New Message</h3>
                <button onClick={() => setIsComposing(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="To: nexus.user@global.os"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                  value={composeData.to}
                  onChange={e => setComposeData({...composeData, to: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Subject"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-bold"
                  value={composeData.subject}
                  onChange={e => setComposeData({...composeData, subject: e.target.value})}
                />
                <textarea 
                  rows={8}
                  placeholder="Write your email here..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
                  value={composeData.body}
                  onChange={e => setComposeData({...composeData, body: e.target.value})}
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex gap-2">
                  <button className="p-4 glass rounded-2xl text-gray-500 hover:text-white transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></button>
                  <button className="p-4 glass rounded-2xl text-gray-500 hover:text-white transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg></button>
                </div>
                <button 
                  onClick={handleSend}
                  className="px-10 py-4 bg-emerald-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  Send Neural Mail
                </button>
              </div>
            </div>
          </div>
        ) : selectedEmail ? (
          /* Reader View */
          <div className="flex-1 flex flex-col p-6 md:p-12 animate-in fade-in duration-500">
            <header className="flex justify-between items-center mb-10">
              <button 
                onClick={() => setSelectedEmail(null)}
                className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Inbox
              </button>
              <div className="flex items-center gap-2">
                <button onClick={convertToPdf} disabled={isConverting} className="px-5 py-2 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600/10 transition-all border-emerald-500/20 text-emerald-400">
                  {isConverting ? 'Converting...' : 'Convert to PDF'}
                </button>
                <button onClick={simulatePrint} className="px-5 py-2 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600/10 transition-all border-blue-500/20 text-blue-400">
                  Print Document
                </button>
              </div>
            </header>

            <article className="max-w-4xl mx-auto w-full glass-dark p-10 rounded-[3rem] border border-white/5 relative">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-2xl font-black">
                    {selectedEmail.sender[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">{selectedEmail.sender}</h2>
                    <p className="text-xs text-gray-500 mt-1 font-bold">{new Date(selectedEmail.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <button onClick={(e) => toggleStar(selectedEmail.id, e)} className={`text-2xl transition-all ${selectedEmail.isStarred ? 'text-amber-400' : 'text-gray-700'}`}>
                  {selectedEmail.isStarred ? '⭐' : '☆'}
                </button>
              </div>

              <h1 className="text-2xl font-black mb-8 border-b border-white/5 pb-8">{selectedEmail.subject}</h1>
              
              <div className="text-gray-300 leading-relaxed text-lg mb-12 whitespace-pre-wrap">
                {selectedEmail.body}
              </div>

              {selectedEmail.attachments.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Attachments ({selectedEmail.attachments.length})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedEmail.attachments.map((file, i) => (
                      <div key={i} className="glass p-5 rounded-2xl flex items-center justify-between border-white/5 group hover:border-emerald-500/40 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                             {file.type === 'pdf' ? '📄' : '📁'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{file.name}</p>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">{file.size}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-emerald-600 rounded-lg transition-colors">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        ) : (
          /* List View */
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-700">
            <header className="h-20 flex items-center px-8 border-b border-white/5 glass-dark justify-between z-10">
              <div className="flex items-center gap-6">
                 <h3 className="font-black text-sm uppercase tracking-widest text-white">All Messages</h3>
                 <div className="flex items-center bg-white/5 border border-white/5 rounded-full px-4 py-1.5">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input type="text" placeholder="Search mail..." className="bg-transparent border-none outline-none text-xs w-48" />
                 </div>
              </div>
              <div className="flex gap-2">
                 <button className="p-3 glass rounded-xl text-gray-500 hover:text-white transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
              </div>
            </header>

            <div className="flex-1 overflow-auto p-4 md:p-8 space-y-2">
               {emails.map((email) => (
                 <div 
                   key={email.id}
                   onClick={() => setSelectedEmail(email)}
                   className={`glass p-6 rounded-[2rem] border border-white/5 flex items-center gap-6 cursor-pointer hover:bg-white/5 transition-all group ${!email.isRead ? 'ring-1 ring-emerald-500/30 bg-emerald-500/5' : ''}`}
                 >
                   <div className="flex items-center gap-4 flex-shrink-0">
                      <button onClick={(e) => toggleStar(email.id, e)} className={`text-xl transition-all ${email.isStarred ? 'text-amber-400' : 'text-gray-800 group-hover:text-gray-600'}`}>
                        {email.isStarred ? '⭐' : '☆'}
                      </button>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${!email.isRead ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400'}`}>
                        {email.sender[0]}
                      </div>
                   </div>
                   
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                         <h4 className={`font-black text-sm ${!email.isRead ? 'text-white' : 'text-gray-400'}`}>{email.sender}</h4>
                         <span className="text-[10px] text-gray-600 font-bold">{new Date(email.timestamp).toLocaleDateString()}</span>
                      </div>
                      <h5 className={`text-xs font-bold truncate ${!email.isRead ? 'text-emerald-400' : 'text-gray-300'}`}>{email.subject}</h5>
                      <p className="text-[11px] text-gray-500 truncate mt-1 leading-relaxed">{email.body}</p>
                   </div>

                   {email.attachments.length > 0 && (
                     <div className="hidden sm:flex items-center gap-2 flex-shrink-0 opacity-40">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        <span className="text-[10px] font-black">{email.attachments.length}</span>
                     </div>
                   )}
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* Global Printing Overlay */}
      {isPrinting && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="w-64 h-64 border-8 border-white/5 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-8 border-emerald-500 rounded-full border-t-transparent animate-spin" />
              <div className="text-6xl animate-bounce">🖨️</div>
           </div>
           <h2 className="text-2xl font-black mt-8 text-white uppercase tracking-widest">Nexus Print Engine</h2>
           <p className="text-emerald-500 font-bold uppercase tracking-[0.3em] mt-2 animate-pulse">Initializing Hardware Bridge...</p>
        </div>
      )}
    </div>
  );
};

export default InboxApp;
