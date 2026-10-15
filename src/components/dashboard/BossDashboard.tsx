import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  CalendarCheck,
  TrendingUp,
  FileSpreadsheet,
  MessageSquareQuote,
  Sparkles
} from 'lucide-react';
import { DocumentType } from '../../types';
import AppDashboard from './AppDashboard';

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
    teamMembers, 
    coachingRecords, 
    capacityAudits,
    setActiveTab, 
    setTaskStatus 
  } = useApp();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const bottleneckTasks = tasks.filter(t => t.isBottleneck && t.status !== 'completed');
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Active follow-ups needing attention
  const activeFollowUps = coachingRecords.filter(r => 
    r.followUpStatus === 'masih_dipantau' || r.followUpStatus === 'perlu_tindakan_lanjut'
  );

  const handleNavigate = (route: string) => {
    if (route === 'interview') {
      onOpenDocument('doc1_interview');
    } else if (route === 'onboarding') {
      onOpenDocument('doc2_onboarding');
    } else if (route === 'record') {
      onOpenDocument('doc4_coaching');
    } else if (route === 'response') {
      setActiveTab('scripts');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* AppDashboard: 4 Modul / Situasi Utama */}
      <AppDashboard onNavigate={handleNavigate} />

      {/* 4 Main Operational Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Task Completion Rate */}
        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Kadar Siap Tugasan</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-neutral-900 tabular-nums">
              {completionRate}%
            </span>
            <span className="text-xs text-neutral-500 tabular-nums">
              ({completedTasks}/{totalTasks} siap)
            </span>
          </div>
          <div className="mt-3 w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${completionRate}%` }} 
            />
          </div>
        </div>

        {/* Metric 2: Bottleneck Alerts */}
        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Isu Bottleneck / Sesak</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              bottleneckTasks.length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-neutral-100 text-neutral-500'
            }`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl font-bold tracking-tight tabular-nums ${
              bottleneckTasks.length > 0 ? 'text-amber-700' : 'text-neutral-900'
            }`}>
              {bottleneckTasks.length}
            </span>
            <span className="text-xs text-neutral-500">titik sangkut operasi</span>
          </div>
          <p className="mt-2 text-xs text-neutral-500 line-clamp-1">
            {bottleneckTasks.length > 0 ? 'Perlu susun flow stesen peak hour' : 'Aliran kerja lancar tanpa kesesakan'}
          </p>
        </div>

        {/* Metric 3: Coaching & Issue Follow-ups */}
        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Isu Disiplin Dalam Pantauan</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              activeFollowUps.length > 0 ? 'bg-blue-50 text-blue-600' : 'bg-neutral-100 text-neutral-500'
            }`}>
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-neutral-900 tabular-nums">
              {activeFollowUps.length}
            </span>
            <span className="text-xs text-neutral-500">kes follow-up aktif</span>
          </div>
          <p className="mt-2 text-xs text-neutral-500 line-clamp-1">
            {activeFollowUps.length > 0 ? `Sasaran semakan: ${activeFollowUps[0].followUpDate}` : 'Tiada perbincangan tertunggak'}
          </p>
        </div>

        {/* Metric 4: Capacity & Staffing Audit */}
        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Status Audit Pengambilan</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-neutral-900">
              {capacityAudits.length > 0 
                ? (capacityAudits[0].decision === 'mungkin_uji_sistem' 
                    ? 'Uji Sistem Dulu' 
                    : capacityAudits[0].decision === 'ya_perlu_pekerja' 
                    ? 'Perlu Pekerja' 
                    : 'Belum Perlu')
                : 'Belum Diaudit'}
            </span>
          </div>
          <p className="mt-2 text-xs text-neutral-500 line-clamp-1">
            “Jangan beli 8 jam untuk selesai masalah 2 jam”
          </p>
        </div>

      </div>

      {/* The 3 Pillars of AKULAH BOS Architecture */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-7 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              3 Tiang Utama Pengurusan "AKULAH BOS"
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Kerangka kerja sistematik untuk mengelakkan salah faham dan mengurangkan tekanan boss.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('scripts')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Lihat Skrip & Ayat Siap Guna</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1: RULES */}
          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-neutral-900 text-white rounded-md tracking-wider">
                  01. RULES
                </span>
                <span className="text-xs font-semibold text-neutral-700">Jelas Sejak Awal</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Keluarkan peraturan daripada kepala. Jangan anggap <em className="font-medium text-neutral-800">“benda ni common sense”</em>. Terangkan waktu, kehadiran, penggunaan telefon, dan standard kerja sebelum shift bermula.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">Dokumen #2 & #3</span>
              <button
                onClick={() => onOpenDocument('doc3_rules')}
                className="text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Rules</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Pillar 2: RECORD */}
          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-neutral-900 text-white rounded-md tracking-wider">
                  02. RECORD
                </span>
                <span className="text-xs font-semibold text-neutral-700">Fakta, Bukan Label</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Elakkan label seperti <span className="text-rose-600 line-through">“dia memang malas”</span>. Tulis fakta sebenar: <span className="font-medium text-neutral-800">“Dijadualkan 9:00, tiba 9:42 tanpa makluman”</span>. Rekodkan perbincangan supaya tak bergantung pada <em className="text-neutral-800">“aku rasa kita pernah bincang”</em>.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">Dokumen #4 & #5</span>
              <button
                onClick={() => onOpenDocument('doc4_coaching')}
                className="text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Log Teguran</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Pillar 3: RESPONSE */}
          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-neutral-900 text-white rounded-md tracking-wider">
                  03. RESPONSE
                </span>
                <span className="text-xs font-semibold text-neutral-700">Tindakan Berdisiplin</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Jangan cipta hukuman spontan ketika marah. Tarik brek kecemasan (Emergency Brake). Dengar penjelasan staf, semak rekod, lakukan emotion check, dan tentukan tindakan wajar berasaskan polisi.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">Dokumen #6</span>
              <button
                onClick={() => onOpenDocument('doc6_emergency')}
                className="text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Brek Kecemasan</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Today's Tasks & Urgent Coaching Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Operasi & Tugasan Hari Ini */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
                Tugasan Syif & Operasi Terkini
              </h3>
              <p className="text-xs text-neutral-500">
                Memastikan SOP pembukaan, waktu puncak, dan penutupan dipatuhi.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenNewTask}
                className="text-xs font-semibold text-neutral-800 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                + Tambah Tugasan
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs font-medium text-amber-700 hover:underline cursor-pointer"
              >
                Lihat Semua ({tasks.length})
              </button>
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="py-3 flex items-start justify-between gap-3 group">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => setTaskStatus(task.id, task.status === 'completed' ? 'todo' : 'completed')}
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                      task.status === 'completed'
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-neutral-300 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    {task.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${
                        task.status === 'completed' ? 'line-through text-neutral-400' : 'text-neutral-900'
                      }`}>
                        {task.title}
                      </span>
                      {task.isBottleneck && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-sm border border-amber-200">
                          Bottleneck
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
                      <span>PIC: {task.assignedToName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{task.shift}</span>
                      {task.sopStandard && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-neutral-400 truncate max-w-xs">{task.sopStandard}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs">
                  <span className={`capitalize text-[11px] font-medium px-2 py-0.5 rounded-md ${
                    task.status === 'completed' 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : task.status === 'in_progress' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {task.status === 'completed' ? 'Selesai' : task.status === 'in_progress' ? 'Sedang Jalan' : 'Belum Mula'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>{inProgressTasks} tugasan sedang dijalankan oleh pasukan</span>
            <button
              onClick={() => setActiveTab('productivity')}
              className="font-medium text-neutral-700 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Semak Beban & Produktiviti Staf</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: Coaching Watchlist & Follow-ups */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
                Rekod Teguran & Pantauan
              </h3>
              <button
                onClick={() => onOpenDocument('doc4_coaching')}
                className="text-xs font-medium text-amber-700 hover:underline cursor-pointer"
              >
                Urus Rekod
              </button>
            </div>

            {activeFollowUps.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-neutral-700">Semua isu dalam keadaan terkawal</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Tiada staf dalam pemantauan berulang</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeFollowUps.map((rec) => (
                  <div key={rec.id} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">{rec.employeeName}</span>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-sm">
                        Masih Dipantau
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2">
                      {rec.whatHappenedFacts}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>Tarikh Semakan: <strong className="text-neutral-800">{rec.followUpDate}</strong></span>
                      <button
                        onClick={() => onOpenDocument('doc4_coaching')}
                        className="text-amber-700 font-semibold hover:underline cursor-pointer"
                      >
                        Semak Nota
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100">
            <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-3 text-xs text-amber-900">
              <p className="font-semibold text-amber-900 flex items-center gap-1.5 mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Peringatan Sebelum Tindakan Serius</span>
              </p>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Jika rasa nak marah atau pecat serta-merta, buka <strong>Dokumen #6 (Brek Kecemasan)</strong> untuk semak fakta vs andaian terlebih dahulu.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* The 7 Official Documents Access Grid */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-7 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              Pusat Toolkit Rasmi: 7 Dokumen "AKULAH BOS"
            </h2>
            <p className="text-xs text-neutral-500">
              Setiap borang mengandungi nota bimbingan boss, ayat sedia guna, dan format siap cetak.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('documents')}
            className="text-xs font-semibold text-neutral-800 hover:text-neutral-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Buka Semua Dokumen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          
          {/* Doc 1 */}
          <div 
            onClick={() => onOpenDocument('doc1_interview')}
            className="group p-4 rounded-xl border border-neutral-200 hover:border-amber-300 hover:bg-amber-50/20 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded-sm">
                  DOKUMEN #1
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-amber-700 transition-colors">→</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">
                Borang Temuduga Ringkas
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                7 soalan teras mengelakkan keputusan dibuat hanya kerana “nampak okay” atau “perlukan orang cepat”.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
              Sesuai: Pengambilan pekerja baharu
            </div>
          </div>

          {/* Doc 2 */}
          <div 
            onClick={() => onOpenDocument('doc2_onboarding')}
            className="group p-4 rounded-xl border border-neutral-200 hover:border-amber-300 hover:bg-amber-50/20 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded-sm">
                  DOKUMEN #2
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-amber-700 transition-colors">→</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">
                Checklist Hari Pertama
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                Penerangan asas operasi & check-in hujung hari sebelum boss menganggap “benda ni common sense”.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
              Sesuai: Onboarding hari pertama staf
            </div>
          </div>

          {/* Doc 3 */}
          <div 
            onClick={() => onOpenDocument('doc3_rules')}
            className="group p-4 rounded-xl border border-neutral-200 hover:border-amber-300 hover:bg-amber-50/20 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded-sm">
                  DOKUMEN #3
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-amber-700 transition-colors">→</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">
                Checklist Peraturan Kerja
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                Keluarkan peraturan bisnes daripada kepala boss supaya jelas untuk dipatuhi semua pekerja.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
              Sesuai: Pembinaan SOP & rules operasi
            </div>
          </div>

          {/* Doc 4 */}
          <div 
            onClick={() => onOpenDocument('doc4_coaching')}
            className="group p-4 rounded-xl border border-neutral-200 hover:border-amber-300 hover:bg-amber-50/20 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded-sm">
                  DOKUMEN #4
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-amber-700 transition-colors">→</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">
                Rekod Teguran & Bimbingan
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                Catat fakta kejadian, sesi dengar penjelasan, expectation baru & tarikh semakan susulan.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
              Sesuai: Teguran disiplin & prestasi
            </div>
          </div>

          {/* Doc 5 */}
          <div 
            onClick={() => onOpenDocument('doc5_explanation')}
            className="group p-4 rounded-xl border border-neutral-200 hover:border-amber-300 hover:bg-amber-50/20 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded-sm">
                  DOKUMEN #5
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-amber-700 transition-colors">→</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">
                Borang Penjelasan Pekerja
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                Beri ruang adil kepada staf menjelaskan insiden sebelum boss membuat sebarang kesimpulan.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
              Sesuai: Sesi penjelasan & bukti insiden
            </div>
          </div>

          {/* Doc 6 */}
          <div 
            onClick={() => onOpenDocument('doc6_emergency')}
            className="group p-4 rounded-xl border border-neutral-200 hover:border-rose-300 hover:bg-rose-50/20 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100/70 px-1.5 py-0.5 rounded-sm">
                  DOKUMEN #6
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-rose-700 transition-colors">→</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 group-hover:text-rose-900">
                Checklist Tindakan Serius
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                Brek kecemasan boss: 9 langkah semakan, semakan emosi, dan kepatuhan undang-undang buruh.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
              Sesuai: Sebelum amaran keras / penamatan
            </div>
          </div>

          {/* Doc 8 */}
          <div 
            onClick={() => onOpenDocument('doc8_capacity')}
            className="group p-4 rounded-xl border border-neutral-200 hover:border-purple-300 hover:bg-purple-50/20 transition-all cursor-pointer flex flex-col justify-between sm:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-100/70 px-1.5 py-0.5 rounded-sm">
                  DOKUMEN #8
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-purple-700 transition-colors">→</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 group-hover:text-purple-900">
                Audit Kapasiti: Perlu Tambah Orang?
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                Formula: Masalah → Gap → Tugas → Waktu → Bentuk Tenaga Kerja. Membezakan penat vs gap sebenar.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
              Sesuai: Sebelum siar iklan jawatan kosong
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
