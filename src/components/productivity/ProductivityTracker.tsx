import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Scale, 
  UserCheck, 
  Zap, 
  Sparkles,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DocumentType } from '../../types';

interface ProductivityTrackerProps {
  onNavigateToDocument: (type: DocumentType) => void;
}

export const ProductivityTracker: React.FC<ProductivityTrackerProps> = ({ 
  onNavigateToDocument 
}) => {
  const { teamMembers, tasks, capacityAudits } = useApp();

  const [activeTab, setActiveTab] = useState<'workload' | 'boss_audit' | 'alternatives'>('workload');

  // Calculate stats per team member
  const memberStats = teamMembers.map(member => {
    const memberTasks = tasks.filter(t => t.assignedToId === member.id);
    const completed = memberTasks.filter(t => t.status === 'completed').length;
    const inProgress = memberTasks.filter(t => t.status === 'in_progress').length;
    const totalHours = memberTasks.reduce((acc, t) => acc + t.estimatedHours, 0);
    const completedHours = memberTasks
      .filter(t => t.status === 'completed')
      .reduce((acc, t) => acc + t.estimatedHours, 0);
    const completionRate = memberTasks.length > 0 ? Math.round((completed / memberTasks.length) * 100) : 0;
    
    // Status assessment
    let loadStatus: 'seimbang' | 'tinggi' | 'rendah' = 'seimbang';
    if (totalHours > 6.5) loadStatus = 'tinggi';
    else if (totalHours < 2) loadStatus = 'rendah';

    return {
      member,
      totalTasks: memberTasks.length,
      completed,
      inProgress,
      totalHours,
      completedHours,
      completionRate,
      loadStatus
    };
  });

  const totalAssignedHours = memberStats.reduce((acc, s) => acc + s.totalHours, 0);
  const totalCompletedTasks = tasks.filter(t => t.status === 'completed').length;
  const overallCompletionRate = tasks.length > 0 ? Math.round((totalCompletedTasks / tasks.length) * 100) : 0;

  // Boss tasks audit analysis (from latest audit or default)
  const audit = capacityAudits[0];
  const bossTasks = audit ? audit.bossDailyTasks : [];
  const bossOnlyCount = bossTasks.filter(t => t.doneBy === 'BOSS').length;
  const workerCount = bossTasks.filter(t => t.doneBy === 'PEKERJA').length;
  const systemCount = bossTasks.filter(t => t.doneBy === 'SISTEM').length;
  const totalBossTasks = bossTasks.length || 1;
  const bossBurdenPercent = Math.round((bossOnlyCount / totalBossTasks) * 100);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Pelacakan Produktiviti & Beban Pasukan
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Analisis beban kerja berasaskan data fakta untuk mengelakkan salah anggap “pekerja tak cukup”.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
          <button
            onClick={() => setActiveTab('workload')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'workload' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Taburan Beban Staf
          </button>
          <button
            onClick={() => setActiveTab('boss_audit')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'boss_audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Analisis Kerja Bos
          </button>
          <button
            onClick={() => setActiveTab('alternatives')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'alternatives' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            10 Alternatif Tanpa Hire
          </button>
        </div>
      </div>

      {/* Formula Reminder Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
            ≠
          </div>
          <div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Formula AKULAH BOS™ (Dokumen 7)
            </h3>
            <p className="text-base font-bold text-white mt-1">
              PENAT ≠ AUTOMATIK TAK CUKUP PEKERJA
            </p>
            <p className="text-sm text-slate-300 mt-1">
              Bos boleh penat kerana: tugas tak jelas, jadual tak teratur, rekod berselerak, proses terlalu manual, atau semua keputusan masih perlu tunggu bos.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToDocument('doc8_capacity')}
          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl border border-slate-700 shrink-0 cursor-pointer"
        >
          <span>Buka Audit Kapasiti Penuh</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tab 1: Taburan Beban Staf */}
      {activeTab === 'workload' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs">
              <span className="text-xs text-neutral-500 font-medium">Jumlah Jam Diperuntukkan</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-neutral-900 font-mono tabular-nums">
                  {totalAssignedHours}
                </span>
                <span className="text-xs text-neutral-500">jam syif aktif</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs">
              <span className="text-xs text-neutral-500 font-medium">Kadar Siap Keseluruhan</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-600 font-mono tabular-nums">
                  {overallCompletionRate}%
                </span>
                <span className="text-xs text-neutral-500">({totalCompletedTasks}/{tasks.length} tugasan)</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-2xs">
              <span className="text-xs text-neutral-500 font-medium">Keseimbangan Beban Pasukan</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-neutral-900">
                  {memberStats.some(s => s.loadStatus === 'tinggi') ? 'Ada Staf Terbeban' : 'Seimbang Secara Purata'}
                </span>
              </div>
            </div>
          </div>

          {/* Member Workload Detail Cards */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50/70 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                  Taburan Tugasan & Jam Setiap Staf
                </h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Kenal pasti jika ada staf yang menanggung terlalu banyak tugasan atau tidak diagihkan dengan adil.
                </p>
              </div>
              <span className="text-xs text-neutral-500 font-medium tabular-nums">
                {teamMembers.length} staf aktif
              </span>
            </div>

            <div className="divide-y divide-neutral-100">
              {memberStats.map(({ member, totalTasks, completed, inProgress, totalHours, completionRate, loadStatus }) => (
                <div key={member.id} className="p-4 sm:p-5 hover:bg-neutral-50/60 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${member.avatarColor} text-white flex items-center justify-center font-bold text-xs`}>
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">{member.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                          <span>{member.role}</span>
                          <span aria-hidden="true">·</span>
                          <span>{member.shift}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        loadStatus === 'tinggi' 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : loadStatus === 'rendah' 
                          ? 'bg-neutral-100 text-neutral-600' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {loadStatus === 'tinggi' ? 'Beban Tinggi' : loadStatus === 'rendah' ? 'Beban Ringan' : 'Beban Seimbang'}
                      </span>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-neutral-900 tabular-nums">
                          {totalHours}j
                        </span>
                        <span className="text-[11px] text-neutral-500 block">beban masa</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar and task stats */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-neutral-600">
                      <span>{completed} siap, {inProgress} sedang jalan daripada {totalTasks} tugasan</span>
                      <span className="font-semibold tabular-nums">{completionRate}% siap</span>
                    </div>

                    <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          completionRate === 100 ? 'bg-emerald-500' : 'bg-neutral-800'
                        }`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Task list preview for member */}
                  <div className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-wrap gap-1.5">
                    {tasks.filter(t => t.assignedToId === member.id).map(t => (
                      <span 
                        key={t.id}
                        className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                          t.status === 'completed'
                            ? 'bg-neutral-50 text-neutral-500 border-neutral-200 line-through'
                            : t.isBottleneck
                            ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold'
                            : 'bg-white text-neutral-700 border-neutral-200'
                        }`}
                      >
                        {t.isBottleneck && '⚠️'} {t.title}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Analisis Kerja Boss (Dokumen #8 Section D) */}
      {activeTab === 'boss_audit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs">
            <div className="max-w-2xl mb-6">
              <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                Apa Boss Buat Sekarang? (Analisis Delegasi & Sistem)
              </h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Soalan utama Dokumen #8: <em className="font-semibold text-neutral-900">“Adakah aku perlukan orang baru atau aku masih melakukan kerja yang sebenarnya boleh diserahkan kepada pekerja atau sistem?”</em>
              </p>
            </div>

            {/* Proportion Bar */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 mb-6">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-700 mb-2">
                <span>Agihan Tanggungjawab Tugas Harian</span>
                <span>{bossBurdenPercent}% Masih Ditanggung Boss</span>
              </div>
              <div className="h-4 w-full bg-neutral-200 rounded-full overflow-hidden flex">
                <div 
                  className="bg-amber-500 h-full transition-all" 
                  style={{ width: `${(bossOnlyCount / totalBossTasks) * 100}%` }}
                  title={`Boss: ${bossOnlyCount} tugasan`}
                />
                <div 
                  className="bg-blue-500 h-full transition-all" 
                  style={{ width: `${(workerCount / totalBossTasks) * 100}%` }}
                  title={`Pekerja: ${workerCount} tugasan`}
                />
                <div 
                  className="bg-emerald-500 h-full transition-all" 
                  style={{ width: `${(systemCount / totalBossTasks) * 100}%` }}
                  title={`Sistem: ${systemCount} tugasan`}
                />
              </div>
              <div className="mt-3 flex items-center justify-center gap-6 text-xs text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-amber-500" />
                  <span>Boss ({bossOnlyCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-blue-500" />
                  <span>Pekerja ({workerCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                  <span>Sistem / Automasi ({systemCount})</span>
                </div>
              </div>
            </div>

            {/* Daily Task Breakdown Table */}
            <div className="border border-neutral-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-200">
                  <tr>
                    <th className="py-2.5 px-4">Tugasan Harian Operasi</th>
                    <th className="py-2.5 px-4 text-center">Dilakukan Oleh</th>
                    <th className="py-2.5 px-4 text-right">Cadangan Penambahbaikan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {bossTasks.map((t, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/70">
                      <td className="py-3 px-4 font-medium text-neutral-900">
                        {t.task}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-md font-semibold text-[11px] ${
                          t.doneBy === 'BOSS' 
                            ? 'bg-amber-100 text-amber-800' 
                            : t.doneBy === 'PEKERJA' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {t.doneBy}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-neutral-500">
                        {t.doneBy === 'BOSS' 
                          ? 'Boleh didelegasikan dengan SOP jelas' 
                          : t.doneBy === 'PEKERJA' 
                          ? 'Dijalankan dengan baik oleh staf' 
                          : 'Automatik / Sistem'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: 10 Alternatif Tanpa Hire (Dokumen #8 Section G) */}
      {activeTab === 'alternatives' && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md w-fit mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>DOKUMEN #8 BAHAGIAN G</span>
            </div>
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">
              10 Perkara Yang Boleh Dicuba Sebelum Menambah Pekerja
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Jangan terus membeli lapan jam tenaga kerja untuk menyelesaikan masalah dua jam. Cuba langkah ini dan uji selama 7–14 hari:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { num: '01', title: 'Ubah shift ikut peak hour', desc: 'Gerakkan jadual staf masuk 1 jam sebelum waktu sibuk dan pulang selepas rush selesai.' },
              { num: '02', title: 'Kemaskan pembahagian tugas', desc: 'Asingkan stesen. Jangan biarkan 2 orang buat kerja sama manakala stesen lain terbiar.' },
              { num: '03', title: 'Buat opening checklist', desc: 'Pastikan semua stok dan peralatan sedia sebelum kedai buka (Dokumen #2).' },
              { num: '04', title: 'Buat closing checklist', desc: 'Elakkan syif pagi terpaksa mengemas sisa kerja syif malam yang lepas.' },
              { num: '05', title: 'Jelaskan siapa bertanggungjawab', desc: 'Tiada lagi ayat “semua orang buat semua”. Tetapkan 1 PIC untuk setiap zon.' },
              { num: '06', title: 'Latih pekerja sedia ada', desc: 'Beri tunjuk ajar teknik pantas (speed training) untuk tugas-tugas teras.' },
              { num: '07', title: 'Kurangkan proses manual', desc: 'Gantikan catatan kertas atau WhatsApp yang lambat dengan sistem yang kemas.' },
              { num: '08', title: 'Gunakan sistem rekod operasi', desc: 'Simpan rekod kehadiran & tugasan dalam sistem supaya tidak hilang jejak.' },
              { num: '09', title: 'Buang kerja yang tidak perlu', desc: 'Hapuskan langkah kerja lapuk yang membuang masa tanpa nilai kepada pelanggan.' },
              { num: '10', title: 'Uji perubahan selama 7–14 hari', desc: 'Pantau kelancaran operasi sebelum membuat komitmen kos gaji bulanan baharu.' }
            ].map(alt => (
              <div key={alt.num} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-neutral-400 mt-0.5">{alt.num}</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{alt.title}</h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">{alt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-4">
            <div>
              <span className="font-bold">Formula Pengambilan: </span>
              <span>MASALAH → GAP → TUGAS → WAKTU → BENTUK TENAGA KERJA (Bukan: PENAT → HIRE)</span>
            </div>
            <button
              onClick={() => onNavigateToDocument('doc8_capacity')}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg text-xs shrink-0 cursor-pointer"
            >
              Jalankan Audit Penuh
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
