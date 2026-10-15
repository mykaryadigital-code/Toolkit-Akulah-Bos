import React, { useRef, useState } from 'react';
import { useApp, MainNavTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Users, 
  TrendingUp, 
  MessageSquareQuote, 
  Plus, 
  Download, 
  Upload, 
  RotateCcw,
  BookOpen,
  Check,
  AlertCircle
} from 'lucide-react';

interface SidebarProps {
  onOpenQuickTask: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenQuickTask }) => {
  const { 
    activeTab, 
    setActiveTab, 
    exportDataJson, 
    importDataJson, 
    resetToDefaultData,
    tasks,
    coachingRecords
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const navItems: { id: MainNavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Utama', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'tasks', label: 'Tugasan', icon: <CheckSquare className="w-5 h-5" />, badge: pendingTasksCount > 0 ? pendingTasksCount : undefined },
    { id: 'documents', label: 'Dokumen & Rekod', icon: <FileText className="w-5 h-5" />, badge: pendingFollowUpsCount > 0 ? pendingFollowUpsCount : undefined },
    { id: 'team', label: 'Pasukan', icon: <Users className="w-5 h-5" /> },
    { id: 'productivity', label: 'Produktiviti', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'scripts', label: 'Ayat Siap Guna', icon: <MessageSquareQuote className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col justify-between border-r border-slate-800 shrink-0 no-print">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 text-left w-full group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
              B
            </div>
            <div className="min-w-0">
              <span className="text-lg font-black tracking-tight text-white block group-hover:text-amber-400 transition-colors">
                AKULAH BOS
              </span>
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                Rules · Record · Response
              </span>
            </div>
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="p-4 pb-2">
          <button
            onClick={onOpenQuickTask}
            className="w-full min-h-[44px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Tambah Tugasan</span>
          </button>
        </div>

        {/* Main Navigation List */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-slate-950' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Data & Sandaran */}
      <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-900/90">
        <div className="text-xs font-bold tracking-wider text-slate-400 uppercase px-1">
          Data & Sandaran
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={exportDataJson}
            title="Muat Turun Sandaran Data (JSON)"
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Sandaran</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Pulihkan Data Daripada Fail JSON"
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Pulihkan</span>
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
            if (confirm('Adakah anda pasti mahu menetapkan semula semua data contoh asal? Rekod semasa akan digantikan.')) {
              resetToDefaultData();
              showNotification('success', 'Data telah ditetapkan semula ke contoh asal.');
            }
          }}
          className="w-full min-h-[38px] flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 py-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Tetapkan Semula Data Contoh</span>
        </button>

        {feedbackMsg && (
          <div className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
            feedbackMsg.type === 'success' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
          }`}>
            {feedbackMsg.type === 'success' ? <Check className="w-3.5 h-3.5 shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
            <span className="truncate">{feedbackMsg.text}</span>
          </div>
        )}
      </div>
    </aside>
  );
};
