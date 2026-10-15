import React, { useState } from 'react';
import { BOSS_GOLDEN_SCRIPTS } from '../../data/initialData';
import { 
  MessageSquareQuote, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Lightbulb,
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
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Koleksi “Ayat Siap Guna” & Skrip Boss
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Skrip komunikasi tepat dan profesional daripada PDF AKULAH BOS™ untuk pelbagai situasi operasi mencabar.
          </p>
        </div>
      </div>

      {/* Mindset Philosophy Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              Prinsip Komunikasi Pengurusan
            </h2>
            <p className="text-sm font-medium text-white mt-1 leading-relaxed">
              Komunikasi yang baik bukan bermaksud berlembut tanpa batas, dan bukan juga menengking atau menyindir. Komunikasi yang berkesan ialah menetapkan standard dengan tenang, berasaskan fakta, dan memberi arahan yang jelas.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-2xs space-y-3">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari situasi, ayat skrip atau dokumen rujukan..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 text-neutral-800"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
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
              className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium">
                    {item.source}
                  </span>
                </div>

                <div className="mt-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80">
                  <p className="text-xs font-semibold text-neutral-900 leading-relaxed font-sans">
                    {item.script}
                  </p>
                </div>

                <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                  <strong className="text-neutral-800 font-semibold">Situasi Penggunaan: </strong>
                  {item.context}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Sedia digunakan dalam operasi harian
                </span>
                <button
                  onClick={() => handleCopy(item.id, item.script)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Tersalin!' : 'Salin Ayat'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
