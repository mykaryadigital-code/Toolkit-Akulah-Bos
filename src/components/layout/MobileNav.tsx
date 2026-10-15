import React, { useRef, useState } from 'react';
import { useApp, MainNavTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Users, 
  MoreHorizontal, 
  X, 
  TrendingUp, 
  MessageSquareQuote, 
  Download, 
  Upload, 
  RotateCcw, 
  Plus, 
  BookOpen, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface MobileNavProps {
  onOpenQuickTask: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenQuickTask }) => {
  const { 
    activeTab, 
    setActiveTab, 
    tasks, 
    coachingRecords,
    exportDataJson, 
    importDataJson, 
    resetToDefaultData 
  } = useApp();

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pendingTasksCount = tasks.filter(t => t.status !== 'completed').length;
  const pendingFollowUpsCount = coachingRecords.filter(r => 
    r.followUpStatus === 'masih_dipantau' || r.followUpStatus === 'perlu_tindakan_lanjut'
  ).length;

  const showNotification = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJson(content);
      if (success) {
        showNotification('success', 'Data berjaya dipulihkan!');
      } else {
        showNotification('error', 'Format fail JSON tidak sah.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const isMoreTabActive = activeTab === 'productivity' || activeTab === 'scripts';

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-30 bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between no-print">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2.5 text-left focus:outline-hidden"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-base shadow-xs shrink-0">
            B
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-white block leading-none">
              AKULAH BOS
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block mt-0.5">
              Rules · Record · Response
            </span>
          </div>
        </button>

        <button
          onClick={onOpenQuickTask}
          className="min-h-[44px] px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Tugasan</span>
        </button>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg no-print">
        {/* 1. Utama */}
        <button
          onClick={() => {
            setActiveTab('dashboard');
            setIsMoreOpen(false);
          }}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors cursor-pointer ${
            activeTab === 'dashboard' && !isMoreOpen
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'dashboard' && !isMoreOpen ? 'bg-amber-400 text-slate-950' : ''}`}>
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold mt-0.5">Utama</span>
        </button>

        {/* 2. Tugasan */}
        <button
          onClick={() => {
            setActiveTab('tasks');
            setIsMoreOpen(false);
          }}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors relative cursor-pointer ${
            activeTab === 'tasks' && !isMoreOpen
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'tasks' && !isMoreOpen ? 'bg-amber-400 text-slate-950' : ''}`}>
            <CheckSquare className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold mt-0.5">Tugasan</span>
          {pendingTasksCount > 0 && (
            <span className="absolute top-1 right-4 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[9px] rounded-full flex items-center justify-center">
              {pendingTasksCount}
            </span>
          )}
        </button>

        {/* 3. Dokumen */}
        <button
          onClick={() => {
            setActiveTab('documents');
            setIsMoreOpen(false);
          }}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors relative cursor-pointer ${
            activeTab === 'documents' && !isMoreOpen
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'documents' && !isMoreOpen ? 'bg-amber-400 text-slate-950' : ''}`}>
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold mt-0.5">Dokumen</span>
          {pendingFollowUpsCount > 0 && (
            <span className="absolute top-1 right-4 w-4 h-4 bg-rose-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
              {pendingFollowUpsCount}
            </span>
          )}
        </button>

        {/* 4. Pasukan */}
        <button
          onClick={() => {
            setActiveTab('team');
            setIsMoreOpen(false);
          }}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors cursor-pointer ${
            activeTab === 'team' && !isMoreOpen
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'team' && !isMoreOpen ? 'bg-amber-400 text-slate-950' : ''}`}>
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold mt-0.5">Pasukan</span>
        </button>

        {/* 5. Lagi */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors cursor-pointer ${
            isMoreOpen || isMoreTabActive
              ? 'text-slate-950 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`p-1 rounded-lg ${isMoreOpen || isMoreTabActive ? 'bg-amber-400 text-slate-950' : ''}`}>
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold mt-0.5">Lagi</span>
        </button>
      </nav>

      {/* "Lagi" Bottom Sheet Modal */}
      {isMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex flex-col justify-end">
          <div 
            onClick={() => setIsMoreOpen(false)} 
            className="flex-1 cursor-pointer"
          />
          <div className="bg-white rounded-t-3xl p-6 shadow-2xl border-t border-slate-200 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Menu Lanjutan & Sandaran
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Produktiviti, skrip komunikasi, dan kawalan data
                </p>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                title="Tutup Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modules inside "Lagi" */}
            <div className="py-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Modul Operasi Lanjutan
              </span>

              <button
                onClick={() => {
                  setActiveTab('productivity');
                  setIsMoreOpen(false);
                }}
                className="w-full min-h-[52px] p-3 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 flex items-center gap-3.5 transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-slate-900">Produktiviti Pasukan</h4>
                  <p className="text-xs text-slate-500 truncate">Beban kerja staf, analisis waktu puncak & audit kapasiti</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('scripts');
                  setIsMoreOpen(false);
                }}
                className="w-full min-h-[52px] p-3 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 flex items-center gap-3.5 transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-slate-900">Ayat Siap Guna (Skrip Bos)</h4>
                  <p className="text-xs text-slate-500 truncate">10 skrip komunikasi pantas berpandukan PDF AKULAH BOS</p>
                </div>
              </button>
            </div>

            {/* Data & Sandaran inside "Lagi" */}
            <div className="pt-2 pb-4 space-y-2 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Data & Sandaran Sistem
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    exportDataJson();
                    showNotification('success', 'Fail sandaran JSON dimuat turun.');
                  }}
                  className="min-h-[48px] flex items-center justify-center gap-2 p-3 bg-slate-900 text-white font-semibold text-sm rounded-xl cursor-pointer hover:bg-slate-800"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Muat Turun Sandaran</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="min-h-[48px] flex items-center justify-center gap-2 p-3 bg-slate-100 text-slate-800 font-semibold text-sm rounded-xl cursor-pointer hover:bg-slate-200 border border-slate-300"
                >
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>Pulihkan Data</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => {
                  if (confirm('Tetapkan semula ke data contoh asal? Rekod sedia ada akan digantikan.')) {
                    resetToDefaultData();
                    showNotification('success', 'Data contoh dipulihkan.');
                  }
                }}
                className="w-full min-h-[44px] text-xs font-medium text-slate-500 hover:text-rose-600 flex items-center justify-center gap-1.5 py-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tetapkan Semula Data Contoh Asal</span>
              </button>

              {feedbackMsg && (
                <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  feedbackMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800 border border-rose-300'
                }`}>
                  {feedbackMsg.type === 'success' ? <Check className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
                  <span>{feedbackMsg.text}</span>
                </div>
              )}
            </div>

            {/* Quick Guide Reminder */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950">
              <span className="font-bold block text-sm mb-1 text-amber-900">
                Prinsip Operasi AKULAH BOS™
              </span>
              <p className="leading-relaxed">
                Urus pekerja dengan sistem. Bukan dengan ingatan dan emosi. Tulis fakta, beri peluang mendengar, jelaskan expectation, dan buat keputusan berasaskan rekod.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
