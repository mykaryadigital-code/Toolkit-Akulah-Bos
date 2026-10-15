import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Plus, 
  FileText, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Sparkles, 
  User, 
  Check, 
  Layers,
  HelpCircle,
  X
} from 'lucide-react';
import { DocumentType, Task } from '../../types';

interface BossDashboardProps {
  onOpenNewTask: () => void;
  onOpenDocument: (type: DocumentType) => void;
}

export const BossDashboard: React.FC<BossDashboardProps> = ({ 
  onOpenNewTask, 
  onOpenDocument 
}) => {
  const { 
    tasks, 
    coachingRecords, 
    setActiveTab, 
    setTaskStatus,
    setActivePrintDoc
  } = useApp();

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedTaskForPreview, setSelectedTaskForPreview] = useState<Task | null>(null);

  // 1. Ringkasan Metrics
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const incompleteTasksCount = todoTasks.length + inProgressTasks.length;

  const reviewTasks = tasks.filter(t => t.status === 'review');
  const reviewTasksCount = reviewTasks.length;

  const activeFollowUps = coachingRecords.filter(r => 
    r.followUpStatus === 'masih_dipantau' || r.followUpStatus === 'perlu_tindakan_lanjut'
  );
  const pendingFollowUpsCount = activeFollowUps.length;

  // 2. Senarai "Perlu Perhatian"
  const bottleneckTasks = tasks.filter(t => t.isBottleneck && t.status !== 'completed');
  const urgentTasks = tasks.filter(t => t.priority === 'tinggi' && t.status === 'todo' && !t.isBottleneck);

  // Combine items needing attention
  const attentionItems: Array<{
    id: string;
    type: 'bottleneck' | 'review' | 'urgent' | 'follow_up';
    badgeLabel: string;
    badgeStyle: string;
    title: string;
    meta: string;
    actionLabel: string;
    onAction: () => void;
  }> = [
    ...bottleneckTasks.map(t => ({
      id: `bt-${t.id}`,
      type: 'bottleneck' as const,
      badgeLabel: 'Titik Sangkut (Bottleneck)',
      badgeStyle: 'bg-amber-100 text-amber-900 border-amber-300',
      title: t.title,
      meta: `PIC: ${t.assignedToName} · Syif: ${t.shift}`,
      actionLabel: 'Semak Tugasan',
      onAction: () => setSelectedTaskForPreview(t)
    })),
    ...reviewTasks.map(t => ({
      id: `rev-${t.id}`,
      type: 'review' as const,
      badgeLabel: 'Perlu Semakan',
      badgeStyle: 'bg-blue-100 text-blue-900 border-blue-300',
      title: t.title,
      meta: `PIC: ${t.assignedToName} · Menunggu pengesahan kualiti`,
      actionLabel: 'Sahkan Selesai',
      onAction: () => setTaskStatus(t.id, 'completed')
    })),
    ...urgentTasks.map(t => ({
      id: `urg-${t.id}`,
      type: 'urgent' as const,
      badgeLabel: 'Keutamaan Segera',
      badgeStyle: 'bg-rose-100 text-rose-900 border-rose-300',
      title: t.title,
      meta: `PIC: ${t.assignedToName} · Belum dimulakan`,
      actionLabel: 'Mula Sekarang',
      onAction: () => setTaskStatus(t.id, 'in_progress')
    })),
    ...activeFollowUps.map(r => ({
      id: `fup-${r.id}`,
      type: 'follow_up' as const,
      badgeLabel: 'Susulan Pekerja',
      badgeStyle: 'bg-purple-100 text-purple-900 border-purple-300',
      title: `${r.employeeName} — Isu: ${r.issueTypes?.[0] || 'Teguran Disiplin'}`,
      meta: `Tarikh Semakan: ${r.followUpDate} · Status: Masih Dipantau`,
      actionLabel: 'Buka Rekod',
      onAction: () => onOpenDocument('doc4_coaching')
    }))
  ];

  // 4. Lima tugasan terkini
  const latestFiveTasks = tasks.slice(0, 5);

  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">Selesai</span>;
      case 'in_progress':
        return <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">Dalam Proses</span>;
      case 'review':
        return <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900">Perlu Semakan</span>;
      case 'todo':
      default:
        return <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">Belum Mula</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* 1. RINGKASAN: Tugasan Belum Siap, Perlu Semakan, Susulan Pekerja */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Ringkasan Operasi
          </h2>
          <span className="text-xs font-medium text-slate-500">
            Kemas kini langsung pasukan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card 1: Tugasan Belum Siap */}
          <div 
            onClick={() => setActiveTab('tasks')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">Tugasan Belum Siap</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                {incompleteTasksCount}
              </span>
              <span className="text-xs text-slate-500">tugasan aktif</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {todoTasks.length} belum mula · {inProgressTasks.length} dalam proses
            </p>
          </div>

          {/* Card 2: Perlu Semakan */}
          <div 
            onClick={() => setActiveTab('tasks')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">Perlu Semakan</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                {reviewTasksCount}
              </span>
              <span className="text-xs text-slate-500">menunggu semakan</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {reviewTasksCount > 0 ? 'Sahkan kualiti tugasan sebelum ditutup' : 'Tiada tugasan tertunggak'}
            </p>
          </div>

          {/* Card 3: Susulan Pekerja */}
          <div 
            onClick={() => onOpenDocument('doc4_coaching')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">Susulan Pekerja</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                {pendingFollowUpsCount}
              </span>
              <span className="text-xs text-slate-500">kes dipantau</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {pendingFollowUpsCount > 0 ? `${pendingFollowUpsCount} rekod bimbingan perlu follow-up` : 'Tiada isu disiplin dalam pantauan'}
            </p>
          </div>

        </div>
      </section>

      {/* 2. SENARAI "PERLU PERHATIAN" DENGAN BUTANG TINDAKAN */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Perlu Perhatian Bos
              </h2>
              <p className="text-xs text-slate-500">
                Titik sangkut operasi, tugasan semakan, dan kes pemantauan aktif
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
            {attentionItems.length} item
          </span>
        </div>

        {attentionItems.length === 0 ? (
          <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-base font-bold text-slate-800">Semua Operasi Lancar</h4>
            <p className="text-sm text-slate-500 mt-1">
              Tiada bottleneck, semakan tertunggak, atau isu disiplin mendesak buat masa ini.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {attentionItems.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${item.badgeStyle}`}>
                      {item.badgeLabel}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {item.meta}
                  </p>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  <button
                    onClick={item.onAction}
                    className="min-h-[44px] px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1.5"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. PINTASAN: Tambah Tugasan, Catat Teguran, Buka Dokumen */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
          Pintasan Pantas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Pintasan 1: Tambah Tugasan */}
          <button
            onClick={onOpenNewTask}
            className="min-h-[52px] p-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span>+ Tambah Tugasan</span>
          </button>

          {/* Pintasan 2: Catat Teguran */}
          <button
            onClick={() => onOpenDocument('doc4_coaching')}
            className="min-h-[52px] p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <span>Catat Teguran & Bimbingan</span>
          </button>

          {/* Pintasan 3: Buka Dokumen */}
          <button
            onClick={() => setActiveTab('documents')}
            className="min-h-[52px] p-3.5 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <span>Buka Dokumen & Rekod</span>
          </button>

        </div>
      </section>

      {/* 4. LIMA TUGASAN TERKINI & BUTANG "LIHAT SEMUA" */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Lima Tugasan Terkini
            </h2>
            <p className="text-xs text-slate-500">
              Tugasan operasi syif dan status semasa
            </p>
          </div>

          <button
            onClick={() => setActiveTab('tasks')}
            className="min-h-[44px] px-3.5 py-2 text-sm font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Lihat Semua ({tasks.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {latestFiveTasks.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <p className="text-sm">Tiada tugasan aktif dalam senarai.</p>
            <button
              onClick={onOpenNewTask}
              className="mt-3 min-h-[44px] px-4 py-2 bg-amber-400 text-slate-950 font-bold text-sm rounded-xl"
            >
              Cipta Tugasan Pertama
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {latestFiveTasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => setSelectedTaskForPreview(task)}
                className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {task.title}
                    </h4>
                    {task.isBottleneck && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                        Bottleneck
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-1 flex-wrap">
                    <span className="font-medium text-slate-700">Staf: {task.assignedToName}</span>
                    <span aria-hidden="true">·</span>
                    <span>Waktu: {task.shift}</span>
                    {task.estimatedHours && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{task.estimatedHours} jam</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  {getStatusBadge(task.status)}
                  <span className="text-slate-300 group-hover:text-slate-600 hidden sm:inline">→</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <span>{incompleteTasksCount} tugasan belum selesai daripada {tasks.length} jumlah tugasan</span>
          <button
            onClick={() => setActiveTab('tasks')}
            className="font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
          >
            <span>Semua Tugasan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5. BAHAGIAN "PANDUAN" YANG BOLEH DIKEMBANGKAN (COLLAPSIBLE) */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-sm shrink-0">
              3R
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Panduan Operasi AKULAH BOS & Metodologi 3R
              </h3>
              <p className="text-xs text-slate-500">
                Prinsip teras pengurusan: Rules · Record · Response & Formula F-D-E-N
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
            {isGuideOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {isGuideOpen && (
          <div className="p-5 sm:p-6 pt-2 border-t border-slate-100 space-y-6 bg-slate-50/50 animate-in fade-in duration-150">
            
            {/* Formula Teras */}
            <div className="p-4 bg-slate-900 text-white rounded-xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Formula Asas Komunikasi Bos
              </span>
              <p className="text-base font-bold text-white">
                Fakta → Dengar → Expectation → Next Step
              </p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Elakkan melabel emosi (cth: “malas”). Mulakan dengan fakta sebenar yang direkodkan, dengar penjelasan pekerja secara adil, tetapkan semula expectation dengan tarikh mula, dan putuskan langkah susulan.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  01. RULES
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">Jelas Sejak Awal</h4>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Keluarkan peraturan daripada kepala bos ke dalam sistem (Checklist Hari Pertama & Peraturan Kerja). Jangan anggap “benda ni common sense”.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  02. RECORD
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">Fakta, Bukan Ingatan</h4>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Catat fakta kejadian segera. Elakkan bergantung kepada: “Aku rasa kita pernah bincang”. Gunakan Rekod Teguran & Borang Penjelasan.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  03. RESPONSE
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">Tindakan Berdisiplin</h4>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Jangan buat hukuman spontan ketika marah. Gunakan Brek Kecemasan (Dokumen #6) untuk lakukan emotion check sebelum ambil tindakan serius.
                </p>
              </div>
            </div>

            {/* Petua Emas Operasi */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-sm">
              <span className="font-bold block text-base text-amber-900 mb-1">
                Petua Pengambilan & Beban Kerja (Dokumen #8)
              </span>
              <p className="leading-relaxed">
                “Penat ≠ Automatik tak cukup orang. Jangan beli komitmen kos 8 jam untuk menyelesaikan masalah kesesakan operasi 2 jam. Kemaskan aliran waktu puncak dahulu.”
              </p>
            </div>

          </div>
        )}
      </section>

      {/* Task Preview Modal when clicked from dashboard */}
      {selectedTaskForPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(selectedTaskForPreview.status)}
                  {selectedTaskForPreview.isBottleneck && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      Titik Bottleneck
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedTaskForPreview.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTaskForPreview(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Penanggungjawab (PIC):</span>
                  <strong className="text-base text-slate-900">{selectedTaskForPreview.assignedToName}</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Waktu / Syif:</span>
                  <strong className="text-base text-slate-900">{selectedTaskForPreview.shift}</strong>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Penerangan Tugas:
                </span>
                <p className="text-base text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {selectedTaskForPreview.description || 'Tiada penerangan tambahan.'}
                </p>
              </div>

              {selectedTaskForPreview.sopStandard && (
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    Standard SOP & Kriteria Siap:
                  </span>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-950 font-medium">
                    {selectedTaskForPreview.sopStandard}
                  </div>
                </div>
              )}

              {/* Status Selector */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Tukar Status:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['todo', 'in_progress', 'review', 'completed'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        setTaskStatus(selectedTaskForPreview.id, st);
                        setSelectedTaskForPreview({ ...selectedTaskForPreview, status: st });
                      }}
                      className={`min-h-[44px] px-2 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        selectedTaskForPreview.status === st
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {st === 'todo' ? 'Belum Mula' : st === 'in_progress' ? 'Dalam Proses' : st === 'review' ? 'Perlu Semak' : 'Selesai'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedTaskForPreview(null)}
                className="min-h-[44px] px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
