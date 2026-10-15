import React, { useState } from 'react';
import { BOSS_GOLDEN_SCRIPTS } from '../../data/initialData';
import { 
  MessageSquareQuote, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  Search
} from 'lucide-react';

export const BossScriptsView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredScripts = BOSS_GOLDEN_SCRIPTS.filter(s => {
    const matchesSearch = s.script.toLowerCase().includes(search.toLowerCase()) ||
                          s.category.toLowerCase().includes(search.toLowerCase()) ||
                          s.context.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['all', ...Array.from(new Set(BOSS_GOLDEN_SCRIPTS.map(s => s.category)))];

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Koleksi “Ayat Siap Guna” (Skrip Bos)
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Skrip komunikasi tepat dan profesional daripada PDF AKULAH BOS untuk pelbagai situasi operasi mencabar.
          </p>
        </div>
      </div>

      {/* Mindset Philosophy Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              Prinsip Komunikasi Pengurusan Bos
            </h2>
            <p className="text-base font-medium text-white mt-1 leading-relaxed">
              Komunikasi yang baik bukan bermaksud berlembut tanpa batas, dan bukan juga menengking atau menyindir. Komunikasi yang berkesan ialah menetapkan standard dengan tenang, berasaskan fakta, dan memberi arahan yang jelas.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari situasi, ayat skrip atau rujukan..."
            className="w-full min-h-[44px] pl-11 pr-3 py-2 text-base bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'Semua Situasi' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredScripts.map(item => {
          const isCopied = copiedId === item.id;
          return (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.source}
                  </span>
                </div>

                <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-base font-bold text-slate-900 leading-relaxed font-sans">
                    “{item.script}”
                  </p>
                </div>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Situasi Penggunaan: </strong>
                  {item.context}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400">
                  Sedia guna dalam operasi
                </span>
                <button
                  onClick={() => handleCopy(item.id, item.script)}
                  className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? 'Tersalin!' : 'Salin Skrip'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
