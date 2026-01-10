import React, { useState } from 'react';
import { Book, NewspaperPost } from '../../types';

const MOCK_BOOKS: Book[] = [
  { id: 'b1', title: 'The Neural Link Code', author: 'Dr. Orion', cover: 'https://picsum.photos/id/119/400/600', price: 45, category: 'tech' },
  { id: 'b2', title: 'Future of Silicon', author: 'E. Musk (Nexus Edition)', cover: 'https://picsum.photos/id/115/400/600', price: 80, category: 'tech', isPurchased: true },
  { id: 'b3', title: 'Silent Galaxies', author: 'Luna Nova', cover: 'https://picsum.photos/id/110/400/600', price: 15, category: 'fiction' },
  { id: 'b4', title: 'Global Economy 2030 (PDF)', author: 'Nexus Intelligence', cover: 'https://picsum.photos/id/111/400/600', price: 25, category: 'pdf' },
  { id: 'b5', title: 'Advanced Robotics v4', author: 'TechNexus', cover: 'https://picsum.photos/id/112/400/600', price: 120, category: 'tech' },
  { id: 'b6', title: 'Dystopian Dreams', author: 'M. Gibson', cover: 'https://picsum.photos/id/113/400/600', price: 12, category: 'fiction' },
];

const MOCK_NEWS: NewspaperPost[] = [
  { id: 'n1', user: 'Nexus_Official', avatar: 'https://picsum.photos/id/64/100/100', content: 'The new Quantum Kernel is now available for early testers! #NexusOS #Future', timestamp: Date.now() - 3600000, likes: 245 },
  { id: 'n2', user: 'GlobalReader', avatar: 'https://picsum.photos/id/65/100/100', content: 'Just finished "The Neural Link Code". Mind-blowing insights on biometric syncing.', timestamp: Date.now() - 7200000, likes: 12 },
];

const BooksApp: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'store' | 'library' | 'newspaper'>('store');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsFeed, setNewsFeed] = useState<NewspaperPost[]>(MOCK_NEWS);
  const [newPost, setNewPost] = useState('');
  const [purchasedBooks, setPurchasedBooks] = useState<Book[]>(MOCK_BOOKS.filter(b => b.isPurchased));
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePurchase = (book: Book) => {
    if (confirm(`Confirm purchase of "${book.title}" for ${book.price} Credits?`)) {
      setPurchasedBooks(prev => [...prev, { ...book, isPurchased: true }]);
      alert("Added to your Library!");
    }
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: NewspaperPost = {
      id: 'n' + Date.now(),
      user: 'Me (NexusOS)',
      avatar: 'https://picsum.photos/id/100/100/100',
      content: newPost,
      timestamp: Date.now(),
      likes: 0
    };
    setNewsFeed([post, ...newsFeed]);
    setNewPost('');
  };

  const handlePrint = (title: string) => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      window.print();
    }, 1500);
  };

  const filteredBooks = MOCK_BOOKS.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden relative font-inter">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation Sidebar */}
      <aside className="w-16 md:w-64 border-r border-white/5 flex flex-col glass-dark z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <button onClick={onBackToHome} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="hidden md:block font-black text-xs uppercase tracking-[0.2em] text-orange-500">Nexus Library</h2>
        </div>

        <nav className="flex-1 p-2 md:p-4 space-y-2 mt-4">
          {[
            { id: 'store', label: 'Book Store', icon: '🏪' },
            { id: 'library', label: 'My Library', icon: '📚' },
            { id: 'newspaper', label: 'Nexus Daily', icon: '🗞️' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="hidden md:block">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 glass-dark border-b border-white/10 shrink-0">
           <div className="flex-1 max-w-xl">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search titles, authors, journals..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3.5 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-medium text-sm"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
           </div>
           <div className="hidden lg:flex items-center gap-4 ml-8">
              <div className="text-right">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Balance</p>
                <p className="text-sm font-black text-orange-400">💰 12,450 CR</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">👤</div>
           </div>
        </header>

        <main className="flex-1 overflow-auto p-6 md:p-10">
          {activeTab === 'store' && (
            <div className="space-y-10 animate-in fade-in duration-700">
               <div>
                 <h3 className="text-3xl font-black mb-2">Featured Collection</h3>
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Curated for your neural link profile</p>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                  {filteredBooks.map(book => (
                    <div key={book.id} className="group flex flex-col gap-4">
                       <div className="relative aspect-[2/3] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-all group-hover:scale-105 group-hover:border-orange-500/50">
                          <img src={book.cover} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                             {!purchasedBooks.some(b => b.id === book.id) ? (
                               <button 
                                onClick={() => handlePurchase(book)}
                                className="w-full py-3 bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
                               >
                                 Buy {book.price} CR
                               </button>
                             ) : (
                               <span className="w-full py-3 bg-emerald-600/20 text-emerald-400 rounded-xl text-[10px] font-black uppercase text-center tracking-widest">Purchased</span>
                             )}
                          </div>
                       </div>
                       <div className="px-2">
                          <h4 className="font-bold text-sm truncate text-white">{book.title}</h4>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{book.author}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="space-y-10 animate-in slide-in-from-left-4 duration-700">
               <div>
                 <h3 className="text-3xl font-black mb-2">My Digital Library</h3>
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{purchasedBooks.length} Items Synchronized</p>
               </div>
               {purchasedBooks.length === 0 ? (
                 <div className="h-64 flex flex-col items-center justify-center glass rounded-[3rem] border-dashed border-white/10 opacity-30">
                    <span className="text-6xl mb-4">📚</span>
                    <p className="font-bold text-sm">Your purchased books will appear here.</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedBooks.map(book => (
                      <div key={book.id} className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-6 group hover:border-orange-500/30 transition-all">
                         <div className="w-24 h-32 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
                            <img src={book.cover} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors truncate">{book.title}</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{book.author}</p>
                            <div className="flex gap-2 mt-6">
                               <button 
                                onClick={() => alert("Opening PDF reader...")}
                                className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all"
                               >
                                 Read
                               </button>
                               <button 
                                onClick={() => handlePrint(book.title)}
                                className="p-2 glass rounded-xl text-gray-400 hover:text-white transition-all"
                               >
                                 🖨️
                               </button>
                               <button 
                                onClick={() => alert("Downloading PDF...")}
                                className="p-2 glass rounded-xl text-gray-400 hover:text-white transition-all"
                               >
                                 📥
                               </button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          )}

          {activeTab === 'newspaper' && (
            <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-700">
               <div className="glass-dark p-8 rounded-[3rem] border border-white/5 space-y-6">
                  <h3 className="text-xl font-black text-white">What's on your mind?</h3>
                  <textarea 
                    value={newPost}
                    onChange={e => setNewPost(e.target.value)}
                    placeholder="Post something to Nexus Daily..."
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none text-sm"
                    rows={4}
                  />
                  <div className="flex justify-between items-center pt-2">
                     <div className="flex gap-4">
                        <button className="text-xl opacity-40 hover:opacity-100 transition-opacity">🖼️</button>
                        <button className="text-xl opacity-40 hover:opacity-100 transition-opacity">📊</button>
                        <button className="text-xl opacity-40 hover:opacity-100 transition-opacity">📍</button>
                     </div>
                     <button 
                      onClick={handlePost}
                      disabled={!newPost.trim()}
                      className="px-10 py-3 bg-orange-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-600/20 active:scale-95 transition-all disabled:opacity-20"
                     >
                       Post
                     </button>
                  </div>
               </div>

               <div className="space-y-6">
                  {newsFeed.map(post => (
                    <div key={post.id} className="glass p-8 rounded-[3rem] border border-white/5 space-y-4 group hover:border-white/10 transition-all">
                       <div className="flex items-center gap-4">
                          <img src={post.avatar} className="w-12 h-12 rounded-2xl border border-white/5" />
                          <div>
                             <h4 className="font-bold text-sm text-white">{post.user}</h4>
                             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{new Date(post.timestamp).toLocaleTimeString()}</p>
                          </div>
                       </div>
                       <p className="text-gray-200 leading-relaxed font-medium">{post.content}</p>
                       <div className="flex gap-8 pt-4 border-t border-white/5">
                          <button className="flex items-center gap-2 group/btn">
                             <span className="text-lg group-hover/btn:scale-125 transition-transform">❤️</span>
                             <span className="text-xs text-gray-500">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 group/btn">
                             <span className="text-lg group-hover/btn:rotate-12 transition-transform">💬</span>
                             <span className="text-xs text-gray-500">Repy</span>
                          </button>
                          <button className="flex items-center gap-2 group/btn">
                             <span className="text-lg group-hover/btn:-translate-y-1 transition-transform">🔄</span>
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </main>
      </div>

      {/* Printing Overlay */}
      {isPrinting && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="w-64 h-64 border-8 border-white/5 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-8 border-orange-500 rounded-full border-t-transparent animate-spin" />
              <div className="text-6xl animate-bounce">📚</div>
           </div>
           <h2 className="text-2xl font-black mt-8 text-white uppercase tracking-widest">Formatting for Print</h2>
           <p className="text-orange-500 font-bold uppercase tracking-[0.3em] mt-2 animate-pulse">Syncing with Physical Bridge...</p>
        </div>
      )}
    </div>
  );
};

export default BooksApp;