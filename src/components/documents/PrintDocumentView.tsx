import React from 'react';
import { DocumentType } from '../../types';
import { Printer, X } from 'lucide-react';

interface PrintDocumentViewProps {
  type: DocumentType;
  data: any;
  onClose: () => void;
}

export const PrintDocumentView: React.FC<PrintDocumentViewProps> = ({ type, data, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
      
      {/* Top Floating Action Bar */}
      <div className="w-full max-w-4xl bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between mb-4 no-print">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-400">PRAPAPARAN CETAK / PDF</span>
          <span className="text-xs text-neutral-400">· Format Standard AKULAH BOSS™</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg text-xs font-bold cursor-pointer transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Dokumen (Ctrl+P / Command+P)</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer transition-colors"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* The Printable A4 Sheet */}
      <div className="w-full max-w-4xl bg-white text-neutral-900 p-8 sm:p-12 rounded-xl shadow-xl border border-neutral-300 print:border-none print:shadow-none print:p-0">
        
        {/* Official Header */}
        <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-4 mb-6">
          <div>
            <span className="text-xs font-black tracking-widest text-neutral-900 uppercase">
              AKULAH BOSS™
            </span>
            <span className="text-xs text-neutral-500 font-medium ml-2">
              Rules · Record · Response
            </span>
          </div>
          <div className="text-right text-xs text-neutral-500">
            <span>Tarikh: {data.createdAt || data.discussionDate || data.reviewDate || new Date().toISOString().split('T')[0]}</span>
          </div>
        </div>

        {/* Dynamic Content based on type */}
        {type === 'doc1_interview' && <PrintInterview data={data} />}
        {type === 'doc2_onboarding' && <PrintOnboarding data={data} />}
        {type === 'doc3_rules' && <PrintWorkRules data={data} />}
        {type === 'doc4_coaching' && <PrintCoaching data={data} />}
        {type === 'doc5_explanation' && <PrintExplanation data={data} />}
        {type === 'doc6_emergency' && <PrintEmergency data={data} />}
        {type === 'doc8_capacity' && <PrintCapacity data={data} />}

        {/* Official Footer Note */}
        <div className="mt-12 pt-6 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center justify-between">
          <span>AKULAH BOSS™ Toolkit Operasi</span>
          <span>Dokumen Operasi Dalaman Perniagaan</span>
        </div>

      </div>
    </div>
  );
};

// Sub-renderers for Print
const PrintInterview: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6 text-xs text-neutral-800">
    <div className="bg-amber-100/60 p-3 rounded-lg border border-amber-300">
      <span className="font-bold text-amber-900 block text-sm">DOKUMEN #1: BORANG TEMUDUGA RINGKAS PEKERJA</span>
      <span className="text-neutral-600">Tujuan: Membantu boss interview calon dengan konsisten supaya keputusan tidak dibuat hanya kerana "nampak okay" atau "aku perlukan orang cepat".</span>
    </div>

    <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg bg-neutral-50">
      <div><strong>Nama Calon:</strong> {data.candidateName}</div>
      <div><strong>No. Telefon:</strong> {data.phone}</div>
      <div><strong>Jawatan Dipohon:</strong> {data.positionApplied}</div>
      <div><strong>Kawasan Tinggal:</strong> {data.livingArea}</div>
      <div><strong>Pengangkutan:</strong> {data.transport}</div>
      <div><strong>Tarikh Boleh Mula:</strong> {data.availableStartDate}</div>
    </div>

    <div className="border p-4 rounded-lg">
      <h4 className="font-bold mb-2">Pengalaman Kerja Sebelumnya</h4>
      <p><strong>Tempat Kerja:</strong> {data.previousWorkplace || '-'}</p>
      <p><strong>Jawatan / Tugas:</strong> {data.previousPosition || '-'}</p>
      <p><strong>Berapa Lama Bekerja:</strong> {data.durationWorked || '-'}</p>
      <p><strong>Sebab Berhenti:</strong> {data.reasonLeaving || '-'}</p>
    </div>

    <div className="space-y-3">
      <h4 className="font-bold text-sm">7 Soalan Temuduga</h4>
      {data.questions?.map((q: any) => (
        <div key={q.id} className="border p-3 rounded-lg">
          <p className="font-semibold text-neutral-900">{q.id}. {q.question}</p>
          <p className="mt-1 text-neutral-700"><strong>Jawapan:</strong> {q.candidateAnswer || '—'}</p>
          {q.bossNote && <p className="mt-1 text-neutral-500 italic">Nota Boss: {q.bossNote}</p>}
        </div>
      ))}
    </div>

    <div className="border p-4 rounded-lg bg-neutral-50 flex items-center justify-between">
      <div>
        <p className="font-bold">Keputusan Temuduga: <span className="uppercase text-neutral-900">{data.decision?.replace('_', ' ')}</span></p>
        <p className="text-neutral-600 mt-1">Sebab: {data.decisionReason || '—'}</p>
      </div>
      <div className="text-right">
        <p>Penemuduga: <strong>{data.interviewerName}</strong></p>
        <p>Tarikh: {data.interviewDate}</p>
      </div>
    </div>
  </div>
);

const PrintOnboarding: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6 text-xs text-neutral-800">
    <div className="bg-amber-100/60 p-3 rounded-lg border border-amber-300">
      <span className="font-bold text-amber-900 block text-sm">DOKUMEN #2: CHECKLIST HARI PERTAMA PEKERJA</span>
      <span className="text-neutral-600">Tujuan: Memastikan pekerja baru menerima penerangan asas sebelum boss menganggap "benda ni common sense".</span>
    </div>

    <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg bg-neutral-50">
      <div><strong>Nama Pekerja:</strong> {data.employeeName}</div>
      <div><strong>Jawatan / Tugas:</strong> {data.position}</div>
      <div><strong>Tarikh Mula:</strong> {data.startDate}</div>
      <div><strong>Pemberi Penerangan:</strong> {data.briefedBy}</div>
    </div>

    <div className="border p-4 rounded-lg">
      <h4 className="font-bold mb-2">3 Tugas Utama (Tunjuk Cara & Pekerja Cuba)</h4>
      {data.tugasUtama?.map((t: any, idx: number) => (
        <div key={idx} className="flex items-center justify-between py-1 border-b last:border-0">
          <span>{idx + 1}. {t.name}</span>
          <span className="font-mono">{t.sudahDitunjukkan ? '[✓] Ditunjukkan' : '[ ]'} &nbsp; {t.pekerjaSudahCuba ? '[✓] Sudah Cuba' : '[ ]'}</span>
        </div>
      ))}
    </div>

    <div className="border p-4 rounded-lg bg-amber-50">
      <h4 className="font-bold text-amber-900 mb-2">5 Rules Paling Penting Bisnes Ini</h4>
      <ol className="list-decimal pl-4 space-y-1">
        {data.rulesPentingBisnes?.map((r: string, idx: number) => (
          <li key={idx}>{r}</li>
        ))}
      </ol>
    </div>

    <div className="border p-4 rounded-lg">
      <h4 className="font-bold mb-1">Check-in Hujung Hari</h4>
      <p className="italic text-neutral-600">"Apa bahagian kerja hari ini yang masih kurang jelas?"</p>
      <p className="mt-1 font-medium">{data.checkInHujungHari?.bahagianKurangJelas || 'Semua bahagian telah difahami.'}</p>
    </div>

    <div className="grid grid-cols-2 gap-8 pt-8">
      <div className="border-t pt-2 text-center">
        <p className="font-bold">{data.employeeName}</p>
        <p className="text-neutral-500 text-[10px]">Tandatangan Pekerja</p>
      </div>
      <div className="border-t pt-2 text-center">
        <p className="font-bold">{data.briefedBy}</p>
        <p className="text-neutral-500 text-[10px]">Tandatangan Boss / Penyelia</p>
      </div>
    </div>
  </div>
);

const PrintWorkRules: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6 text-xs text-neutral-800">
    <div className="bg-amber-100/60 p-3 rounded-lg border border-amber-300">
      <span className="font-bold text-amber-900 block text-sm">DOKUMEN #3: CHECKLIST PERATURAN KERJA</span>
      <span className="text-neutral-600">Tujuan: Membantu boss mengeluarkan rules daripada kepala dan menjadikannya lebih jelas kepada pekerja.</span>
    </div>

    <div className="border p-4 rounded-lg bg-neutral-50">
      <p><strong>Nama Perniagaan:</strong> {data.companyName}</p>
      <p><strong>Bidang / Sektor:</strong> {data.businessType}</p>
    </div>

    <div className="space-y-4">
      <div className="border p-3 rounded-lg">
        <h4 className="font-bold text-neutral-900 mb-1">A. Waktu & Kehadiran</h4>
        <p className="text-neutral-600">{data.waktuKehadiran?.rulesKhusus}</p>
      </div>
      <div className="border p-3 rounded-lg">
        <h4 className="font-bold text-neutral-900 mb-1">B. Penggunaan Telefon</h4>
        <p className="text-neutral-600">{data.penggunaanTelefon?.rulesKhusus}</p>
      </div>
      <div className="border p-3 rounded-lg">
        <h4 className="font-bold text-neutral-900 mb-1">C. Tanggungjawab & Standard</h4>
        <p className="text-neutral-600">{data.tugasTanggungjawab?.rulesKhusus}</p>
      </div>
    </div>

    <div className="border p-4 rounded-lg bg-neutral-900 text-white">
      <h4 className="font-bold text-amber-400 mb-2">5 Rules Khusus Bisnes</h4>
      <ol className="list-decimal pl-4 space-y-1">
        {data.limaRulesKhusus?.map((r: string, idx: number) => (
          <li key={idx}>{r}</li>
        ))}
      </ol>
    </div>
  </div>
);

const PrintCoaching: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6 text-xs text-neutral-800">
    <div className="bg-amber-100/60 p-3 rounded-lg border border-amber-300">
      <span className="font-bold text-amber-900 block text-sm">DOKUMEN #4: REKOD TEGURAN & PERBINCANGAN PEKERJA</span>
      <span className="text-neutral-600">Tujuan: Digunakan apabila sesuatu isu penting untuk direkodkan supaya boss tidak bergantung kepada: "Aku rasa kita dah pernah bincang."</span>
    </div>

    <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg bg-neutral-50">
      <div><strong>Nama Pekerja:</strong> {data.employeeName}</div>
      <div><strong>Jawatan:</strong> {data.position}</div>
      <div><strong>Tarikh Perbincangan:</strong> {data.discussionDate} ({data.discussionTime})</div>
      <div><strong>Penyelia Bertugas:</strong> {data.supervisorName}</div>
      <div><strong>Lokasi:</strong> {data.location}</div>
      <div><strong>Isu Terlibat:</strong> {data.issueTypes?.join(', ')}</div>
    </div>

    <div className="border p-4 rounded-lg bg-amber-50/50">
      <h4 className="font-bold text-amber-950 mb-1">Fakta Kejadian (Tulis Fakta, Elakkan Label)</h4>
      <p className="text-neutral-800">{data.whatHappenedFacts}</p>
      {data.operationalImpact && (
        <p className="mt-2 text-neutral-600"><strong>Kesan Kepada Operasi:</strong> {data.operationalImpact}</p>
      )}
    </div>

    <div className="border p-4 rounded-lg">
      <h4 className="font-bold text-neutral-900 mb-1">Penjelasan Pekerja (Dengar Dahulu)</h4>
      <p className="text-neutral-700">{data.employeeExplanation || 'Tiada penjelasan tambahan dikemukakan.'}</p>
    </div>

    <div className="border p-4 rounded-lg">
      <h4 className="font-bold text-neutral-900 mb-1">Apa Yang Perlu Berubah (Expectation)</h4>
      <p className="text-neutral-800">{data.whatNeedsToChange}</p>
      <p className="mt-1 text-neutral-500">Bermula Pada: <strong>{data.startsFromDate}</strong></p>
    </div>

    <div className="border p-4 rounded-lg bg-neutral-50 flex items-center justify-between">
      <div>
        <p>Tarikh Follow-Up: <strong>{data.followUpDate}</strong></p>
        <p>Status Pantauan: <span className="uppercase font-bold">{data.followUpStatus?.replace('_', ' ')}</span></p>
      </div>
      <div>
        <p className="italic text-neutral-500">{data.followUpNotes}</p>
      </div>
    </div>
  </div>
);

const PrintExplanation: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6 text-xs text-neutral-800">
    <div className="bg-amber-100/60 p-3 rounded-lg border border-amber-300">
      <span className="font-bold text-amber-900 block text-sm">DOKUMEN #5: BORANG PENJELASAN PEKERJA</span>
      <span className="text-neutral-600">Tujuan: Memberi ruang kepada pekerja menjelaskan sesuatu kejadian sebelum boss membuat kesimpulan (Fakta → Penjelasan → Rekod → Keputusan).</span>
    </div>

    <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg bg-neutral-50">
      <div><strong>Nama Pekerja:</strong> {data.employeeName}</div>
      <div><strong>Jawatan:</strong> {data.position}</div>
      <div><strong>Tarikh Kejadian:</strong> {data.incidentDate}</div>
      <div><strong>Kategori Isu:</strong> {data.categories?.join(', ')}</div>
    </div>

    <div className="border p-4 rounded-lg">
      <h4 className="font-bold mb-1">Ringkasan Fakta Oleh Boss</h4>
      <p className="text-neutral-700">{data.bossFactSummary}</p>
    </div>

    <div className="border p-4 rounded-lg bg-neutral-50">
      <h4 className="font-bold mb-1">Kenyataan & Penjelasan Pekerja</h4>
      <p className="text-neutral-800 font-medium">{data.employeeStatement}</p>
      <p className="mt-2 text-neutral-600"><strong>Sebab Berlakunya Perkara Tersebut:</strong> {data.whyItHappened}</p>
    </div>

    <div className="border p-4 rounded-lg">
      <h4 className="font-bold mb-1">Pelan Untuk Mengelakkan Perkara Berulang</h4>
      <p className="text-neutral-800">{data.preventivePlan}</p>
    </div>

    <div className="border p-4 rounded-lg bg-amber-50">
      <h4 className="font-bold text-amber-900 mb-1">Tindakan Seterusnya Oleh Boss</h4>
      <p className="text-neutral-800">{data.bossNextAction?.nextStepText}</p>
    </div>
  </div>
);

const PrintEmergency: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6 text-xs text-neutral-800">
    <div className="bg-rose-100/60 p-3 rounded-lg border border-rose-300">
      <span className="font-bold text-rose-900 block text-sm">DOKUMEN #6: CHECKLIST SEBELUM TINDAKAN SERIUS</span>
      <span className="text-neutral-600">Tujuan: Emergency brake untuk boss sebelum membuat keputusan besar apabila masalah pekerja sudah serius atau boss sedang sangat marah.</span>
    </div>

    <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg bg-neutral-50">
      <div><strong>Nama Kes:</strong> {data.caseName}</div>
      <div><strong>Nama Pekerja:</strong> {data.employeeName}</div>
      <div><strong>Tarikh Semakan:</strong> {data.reviewDate}</div>
      <div><strong>Isu:</strong> {data.issue}</div>
    </div>

    <div className="border p-4 rounded-lg">
      <h4 className="font-bold mb-1">Langkah 1: Fakta Yang Boleh Disokong (Bukan Andaian)</h4>
      <p>{data.step1_factsSupported}</p>
    </div>

    <div className="border p-4 rounded-lg bg-neutral-50">
      <h4 className="font-bold mb-1">Langkah 7: Emotion Check Boss</h4>
      <p className="italic">"Kalau kejadian sama berlaku tetapi aku tengah mood baik, adakah keputusan sama?"</p>
      <p className="mt-1 font-semibold">{data.step7_sameDecisionIfGoodMood}</p>
    </div>

    <div className="border p-4 rounded-lg bg-rose-50 border-rose-200">
      <h4 className="font-bold text-rose-950 mb-1">Keputusan & Langkah Seterusnya</h4>
      <p className="text-rose-900 font-semibold">{data.step9_nextStep}</p>
      <p className="text-rose-800 mt-1">Sebab: {data.step9_reason}</p>
    </div>
  </div>
);

const PrintCapacity: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6 text-xs text-neutral-800">
    <div className="bg-purple-100/60 p-3 rounded-lg border border-purple-300">
      <span className="font-bold text-purple-900 block text-sm">DOKUMEN #8: BETUL-BETUL PERLU TAMBAH PEKERJA?</span>
      <span className="text-neutral-600">Tujuan: Membantu boss membezakan "aku memang tak cukup orang" daripada "sistem aku sebenarnya tak teratur".</span>
    </div>

    <div className="border p-4 rounded-lg">
      <h4 className="font-bold mb-1">Masalah Utama Yang Mahu Diselesaikan</h4>
      <p>{data.mainProblemToSolve}</p>
    </div>

    <div className="border p-4 rounded-lg bg-neutral-50">
      <h4 className="font-bold mb-1">Audit 7 Hari</h4>
      <p>Waktu Paling Sibuk: <strong>{data.audit7Days?.busiestDayTime}</strong></p>
      <p>Waktu Paling Perlahan: <strong>{data.audit7Days?.slowestDayTime}</strong></p>
      <p>Kekurangan Tenaga Sebenar: <strong>{data.audit7Days?.hoursLackingStaff} jam</strong></p>
    </div>

    <div className="border p-4 rounded-lg bg-purple-50 border-purple-200">
      <h4 className="font-bold text-purple-950 mb-1">Keputusan Akhir</h4>
      <p className="font-bold uppercase text-purple-900">{data.decision?.replace('_', ' ')}</p>
      <p className="text-neutral-700 mt-1">{data.decisionDetails}</p>
    </div>
  </div>
);
