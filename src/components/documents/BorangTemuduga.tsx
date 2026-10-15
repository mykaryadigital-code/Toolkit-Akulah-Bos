import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InterviewForm } from '../../types';
import { 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Save, 
  ChevronDown, 
  ChevronUp,
  FileText
} from 'lucide-react';

interface BorangTemudugaProps {
  onBack?: () => void;
  initialData?: InterviewForm | null;
  onSaved?: () => void;
}

export default function BorangTemuduga({ onBack, initialData, onSaved }: BorangTemudugaProps) {
  const { saveInterviewForm, setActivePrintDoc } = useApp();

  const [formData, setFormData] = useState({
    nama: initialData?.candidateName || '',
    telefon: initialData?.phone || '',
    jawatan: initialData?.positionApplied || '',
    lokasi: initialData?.livingArea || '',
    pengangkutan: initialData?.transport || '',
    mula: initialData?.availableStartDate || new Date().toISOString().split('T')[0],
    tempatKerjaLama: initialData?.previousWorkplace || '',
    jawatanLama: initialData?.previousPosition || '',
    lamaBekerja: initialData?.durationWorked || '',
    sebabBerhenti: initialData?.reasonLeaving || '',
    jawapanSoalan: {
      q1: initialData?.questions?.find(q => q.id === 1)?.candidateAnswer || '',
      q2: initialData?.questions?.find(q => q.id === 2)?.candidateAnswer || '',
      q3: initialData?.questions?.find(q => q.id === 3)?.candidateAnswer || '',
      q4: initialData?.questions?.find(q => q.id === 4)?.candidateAnswer || '',
      q5: initialData?.questions?.find(q => q.id === 5)?.candidateAnswer || '',
      q6: initialData?.questions?.find(q => q.id === 6)?.candidateAnswer || '',
      q7: initialData?.questions?.find(q => q.id === 7)?.candidateAnswer || ''
    },
    notaBossSoalan: {
      q1: initialData?.questions?.find(q => q.id === 1)?.bossNote || '',
      q2: initialData?.questions?.find(q => q.id === 2)?.bossNote || '',
      q3: initialData?.questions?.find(q => q.id === 3)?.bossNote || '',
      q4: initialData?.questions?.find(q => q.id === 4)?.bossNote || '',
      q5: initialData?.questions?.find(q => q.id === 5)?.bossNote || '',
      q6: initialData?.questions?.find(q => q.id === 6)?.bossNote || '',
      q7: initialData?.questions?.find(q => q.id === 7)?.bossNote || ''
    },
    briefingChecklist: initialData?.briefingChecklist || {
      waktuShift: true,
      hariBekerja: true,
      hariRehat: true,
      tugasUtama: true,
      kadarBayaran: true,
      kitaranBayaran: true,
      expectationKetepatanMasa: true,
      caraMaklumkanKetidakhadiran: true,
      caraMintaCuti: true,
      penggunaanTelefon: true,
      rulesPenting: true,
      bahagianKerjaMencabar: true
    },
    evaluation: initialData?.evaluation || {
      ketepatanMasa: 'baik',
      komunikasi: 'baik',
      kesesuaianJadual: 'baik',
      sikapArahan: 'baik',
      komitmen: 'baik'
    },
    lastQuestionAnswer: initialData?.lastQuestionAnswer || '',
    keputusan: initialData?.decision || 'pertimbangkan',
    sebabKeputusan: initialData?.decisionReason || '',
    interviewerName: initialData?.interviewerName || 'Boss Bertugas'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showAdvancedSections, setShowAdvancedSections] = useState(false);

  const soalanList = [
    { 
      id: 'q1', 
      num: 1,
      soalan: 'Kenapa anda nak kerja di sini?',
      notaBoss: 'Jangan hanya dengar kenapa calon berhenti. Dengar juga bagaimana dia bercerita tentang tempat kerja lama. Kalau ada perkara yang meragukan, tanya lebih lanjut.'
    },
    { 
      id: 'q2', 
      num: 2,
      soalan: 'Ada komitmen yang mungkin ganggu jadual kerja? (Contoh: kerja lain, kelas, pengangkutan, komitmen keluarga atau jadual tetap)',
      notaBoss: 'Pastikan jadual calon tidak bertembung dengan waktu operasi puncak perniagaan anda.'
    },
    { 
      id: 'q3', 
      num: 3,
      soalan: 'Kalau shift bermula pukul 9 pagi, pukul berapa anda akan sampai?',
      notaBoss: 'Tujuan soalan ini bukan untuk memerangkap calon. Anda mahu tahu bagaimana calon memahami ketepatan masa. Kalau expectation anda ialah pekerja sudah bersedia bekerja tepat pukul 9, terangkan dengan jelas.'
    },
    { 
      id: 'q4', 
      num: 4,
      soalan: 'Kalau tiba-tiba anda tak boleh datang kerja, apa anda akan buat?',
      notaBoss: 'Uji adakah calon faham prosedur maklumkan awal kepada rakan dan boss, bukan tunggu shift dah bermula baru senyap.'
    },
    { 
      id: 'q5', 
      num: 5,
      soalan: 'Kalau anda tak tahu cara buat sesuatu tugas, apa anda akan buat?',
      notaBoss: 'Kalau tak tahu, tanya. Jangan buat ikut andaian kalau tidak pasti.'
    },
    { 
      id: 'q6', 
      num: 6,
      soalan: 'Kalau boss tegur kerja anda, macam mana anda biasanya respond?',
      notaBoss: 'Lihat sama ada calon matang menerima bimbingan operasi atau cepat defensif.'
    },
    { 
      id: 'q7', 
      num: 7,
      soalan: 'Kalau semuanya berjalan baik, berapa lama anda merancang untuk bekerja?',
      notaBoss: 'Ketahui jangkaan komitmen untuk kestabilan tenaga kerja operasi bisnes anda.'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSoalanChange = (qId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      jawapanSoalan: { ...prev.jawapanSoalan, [qId]: value }
    }));
  };

  const handleNotaBossChange = (qId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      notaBossSoalan: { ...prev.notaBossSoalan, [qId]: value }
    }));
  };

  const handleBriefingToggle = (field: string) => {
    setFormData(prev => ({
      ...prev,
      briefingChecklist: {
        ...prev.briefingChecklist,
        [field]: !prev.briefingChecklist[field as keyof typeof prev.briefingChecklist]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedForm: InterviewForm = {
      id: initialData?.id || `iv-${Date.now()}`,
      createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
      candidateName: formData.nama || 'Nama Calon',
      phone: formData.telefon || '012-XXXXXXX',
      positionApplied: formData.jawatan || 'Krew Operasi',
      livingArea: formData.lokasi || 'Kawasan Berdekatan',
      transport: formData.pengangkutan || 'Motosikal sendiri',
      availableStartDate: formData.mula,
      previousWorkplace: formData.tempatKerjaLama,
      previousPosition: formData.jawatanLama,
      durationWorked: formData.lamaBekerja,
      reasonLeaving: formData.sebabBerhenti,
      questions: soalanList.map(s => ({
        id: s.num,
        question: s.soalan,
        candidateAnswer: formData.jawapanSoalan[s.id as keyof typeof formData.jawapanSoalan],
        bossNote: formData.notaBossSoalan[s.id as keyof typeof formData.notaBossSoalan] || '',
        tip: s.notaBoss
      })),
      briefingChecklist: formData.briefingChecklist,
      lastQuestionAnswer: formData.lastQuestionAnswer,
      evaluation: formData.evaluation,
      additionalNotes: formData.sebabKeputusan,
      decision: formData.keputusan as any,
      decisionReason: formData.sebabKeputusan || 'Menepati kriteria yang ditetapkan.',
      interviewerName: formData.interviewerName,
      interviewDate: new Date().toISOString().split('T')[0]
    };

    saveInterviewForm(formattedForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);

    if (onSaved) {
      onSaved();
    }
  };

  const handlePrintCurrent = () => {
    const formattedForm: InterviewForm = {
      id: initialData?.id || `iv-preview`,
      createdAt: new Date().toISOString().split('T')[0],
      candidateName: formData.nama || 'Nama Calon',
      phone: formData.telefon || '-',
      positionApplied: formData.jawatan || '-',
      livingArea: formData.lokasi || '-',
      transport: formData.pengangkutan || '-',
      availableStartDate: formData.mula,
      previousWorkplace: formData.tempatKerjaLama,
      previousPosition: formData.jawatanLama,
      durationWorked: formData.lamaBekerja,
      reasonLeaving: formData.sebabBerhenti,
      questions: soalanList.map(s => ({
        id: s.num,
        question: s.soalan,
        candidateAnswer: formData.jawapanSoalan[s.id as keyof typeof formData.jawapanSoalan],
        bossNote: formData.notaBossSoalan[s.id as keyof typeof formData.notaBossSoalan] || '',
        tip: s.notaBoss
      })),
      briefingChecklist: formData.briefingChecklist,
      lastQuestionAnswer: formData.lastQuestionAnswer,
      evaluation: formData.evaluation,
      additionalNotes: formData.sebabKeputusan,
      decision: formData.keputusan as any,
      decisionReason: formData.sebabKeputusan,
      interviewerName: formData.interviewerName,
      interviewDate: new Date().toISOString().split('T')[0]
    };

    setActivePrintDoc({
      type: 'doc1_interview',
      data: formattedForm
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-slate-50 min-h-screen font-sans">
      
      {/* Top Bar with Back and Print Actions */}
      <div className="flex items-center justify-between mb-4 no-print">
        {onBack ? (
          <button 
            type="button"
            onClick={onBack}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Papan Pemuka</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrintCurrent}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Prapaparan Cetak / PDF</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Berjaya!</strong> Rekod temuduga telah disimpan ke dalam pangkalan data AKULAH BOS.</span>
        </div>
      )}

      {/* Main Form Container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
        
        {/* Document Header Badge & Title */}
        <div className="border-b border-slate-100 pb-5 mb-6">
          <span className="text-xs font-bold text-slate-800 bg-amber-400 px-3 py-1 rounded-md">
            Dokumen 1
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Borang Temuduga Ringkas Pekerja
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1 leading-relaxed">
            Membantu bos temuduga calon secara konsisten supaya keputusan tidak dibuat hanya kerana <em className="text-slate-900 font-medium">“Nampak okay”</em> atau <em className="text-slate-900 font-medium">“Aku perlukan orang cepat”</em>.
          </p>

          <div className="mt-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-950 flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Peringatan Bos:</strong> Kekosongan satu syif mungkin menyusahkan sehari. Salah ambil orang boleh menyusahkan berbulan-bulan. Temuduga yang berdisiplin adalah untuk mengurangkan kejutan selepas pekerja masuk.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* A. Maklumat Calon */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>A. Maklumat Calon</span>
              <span className="text-xs text-slate-400 font-normal">Isi maklumat asas calon</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Penuh Calon <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nama Calon" 
                  required
                  value={formData.nama} 
                  onChange={(e) => handleInputChange('nama', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">No. Telefon <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="012-3456789" 
                  required
                  value={formData.telefon} 
                  onChange={(e) => handleInputChange('telefon', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jawatan Dipohon</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Barista / Krew Servis" 
                  value={formData.jawatan} 
                  onChange={(e) => handleInputChange('jawatan', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kawasan Tinggal</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Seksyen 7, Shah Alam (5km)" 
                  value={formData.lokasi} 
                  onChange={(e) => handleInputChange('lokasi', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pengangkutan</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Motosikal sendiri / Bas" 
                  value={formData.pengangkutan} 
                  onChange={(e) => handleInputChange('pengangkutan', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tarikh Boleh Mula</label>
                <input 
                  type="date" 
                  value={formData.mula} 
                  onChange={(e) => handleInputChange('mula', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          {/* B. Pengalaman Kerja Sebelumnya */}
          <div className="space-y-4 pt-2">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>B. Pengalaman Kerja</span>
              <span className="text-xs text-slate-400 font-normal">Latar belakang pekerjaan lalu</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tempat Kerja Sebelum Ini</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Kafe Kopi Kampung" 
                  value={formData.tempatKerjaLama} 
                  onChange={(e) => handleInputChange('tempatKerjaLama', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jawatan / Tugas</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Krew Servis & Juruwang" 
                  value={formData.jawatanLama} 
                  onChange={(e) => handleInputChange('jawatanLama', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Berapa Lama Bekerja</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 8 bulan" 
                  value={formData.lamaBekerja} 
                  onChange={(e) => handleInputChange('lamaBekerja', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sebab Berhenti</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Mencari tempat lebih dekat & jadual tersusun" 
                  value={formData.sebabBerhenti} 
                  onChange={(e) => handleInputChange('sebabBerhenti', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          {/* 7 Soalan Interview Teras */}
          <div className="space-y-4 pt-2">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>7 Soalan Temuduga Teras</span>
              <span className="text-xs text-blue-600 font-semibold">Teras Metodologi</span>
            </h3>

            {soalanList.map((item) => (
              <div key={item.id} className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Soalan {item.num}: "{item.soalan}"
                  </label>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1">Jawapan Calon:</span>
                  <textarea 
                    rows={2} 
                    placeholder="Catat jawapan calon di sini..."
                    value={formData.jawapanSoalan[item.id as keyof typeof formData.jawapanSoalan]} 
                    onChange={(e) => handleSoalanChange(item.id, e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                {/* Nota Panduan Boss daripada PDF */}
                <div className="bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/70 text-xs">
                  <span className="font-semibold text-amber-900 block mb-0.5">Panduan Nota Boss:</span>
                  <p className="text-slate-600 italic text-[11px] leading-relaxed">{item.notaBoss}</p>
                  <input
                    type="text"
                    placeholder="Catatan pemerhatian boss (pilihan)..."
                    value={formData.notaBossSoalan[item.id as keyof typeof formData.notaBossSoalan]}
                    onChange={(e) => handleNotaBossChange(item.id, e.target.value)}
                    className="mt-1.5 w-full px-2.5 py-1 text-xs bg-white border border-amber-200 rounded-md focus:outline-hidden"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Toggle Advanced Section (C. Boss Terangkan Kerja & E. Penilaian) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvancedSections(!showAdvancedSections)}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Bahagian Tambahan: C. Boss Terangkan Kerja (Checklist 12-Item) & E. Matriks Penilaian</span>
              {showAdvancedSections ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showAdvancedSections && (
            <div className="space-y-6 pt-2 animate-in fade-in duration-150">
              {/* C. Boss Terangkan Kerja */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
                  C. Boss Terangkan Kerja
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Sebelum interview berakhir, pastikan perkara yang berkaitan sudah diterangkan dengan jelas:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'waktuShift', label: 'Waktu / shift kerja' },
                    { key: 'hariBekerja', label: 'Hari bekerja' },
                    { key: 'hariRehat', label: 'Hari rehat' },
                    { key: 'tugasUtama', label: 'Tugas utama' },
                    { key: 'kadarBayaran', label: 'Kaedah / kadar bayaran yang berkaitan' },
                    { key: 'kitaranBayaran', label: 'Kitaran / tarikh bayaran' },
                    { key: 'expectationKetepatanMasa', label: 'Expectation ketepatan masa' },
                    { key: 'caraMaklumkanKetidakhadiran', label: 'Cara maklumkan ketidakhadiran' },
                    { key: 'caraMintaCuti', label: 'Cara meminta cuti' },
                    { key: 'penggunaanTelefon', label: 'Penggunaan telefon' },
                    { key: 'rulesPenting', label: 'Rules penting bisnes' },
                    { key: 'bahagianKerjaMencabar', label: 'Bahagian kerja yang mungkin mencabar' }
                  ].map(item => (
                    <label key={item.key} className="flex items-center gap-2 p-1.5 hover:bg-white rounded-md cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.briefingChecklist[item.key as keyof typeof formData.briefingChecklist]}
                        onChange={() => handleBriefingToggle(item.key)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* E. Penilaian Boss */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
                  E. Penilaian Boss
                </h4>

                <div className="space-y-3 text-xs">
                  {[
                    { key: 'ketepatanMasa', label: 'Ketepatan Masa' },
                    { key: 'komunikasi', label: 'Komunikasi' },
                    { key: 'kesesuaianJadual', label: 'Kesesuaian Jadual' },
                    { key: 'sikapArahan', label: 'Sikap Terhadap Arahan' },
                    { key: 'komitmen', label: 'Komitmen' }
                  ].map(criteria => (
                    <div key={criteria.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-white rounded-lg border border-slate-200">
                      <span className="font-semibold text-slate-800">{criteria.label}</span>
                      <div className="flex items-center gap-4">
                        {(['baik', 'belum_pasti', 'meragukan'] as const).map(option => (
                          <label key={option} className="flex items-center gap-1.5 cursor-pointer">
                            <input 
                              type="radio"
                              name={criteria.key}
                              value={option}
                              checked={formData.evaluation[criteria.key as keyof typeof formData.evaluation] === option}
                              onChange={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  evaluation: { ...prev.evaluation, [criteria.key]: option }
                                }));
                              }}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="capitalize text-slate-700 text-xs">{option.replace('_', ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* D & F. Keputusan Temuduga */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div>
              <label className="block font-semibold text-slate-800 text-sm mb-1.5">
                Keputusan Temuduga <span className="text-rose-500">*</span>
              </label>
              <select 
                value={formData.keputusan} 
                onChange={(e) => handleInputChange('keputusan', e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              >
                <option value="pertimbangkan">Pertimbangkan</option>
                <option value="semakan_lanjut">Interview / semakan lanjut</option>
                <option value="tidak_sesuai">Tidak sesuai buat masa ini</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sebab Ringkas Keputusan
              </label>
              <textarea 
                rows={2}
                placeholder="Contoh: Calon menepati waktu, komunikasi lancar, dan bersedia bekerja pada syif pembukaan."
                value={formData.sebabKeputusan} 
                onChange={(e) => handleInputChange('sebabKeputusan', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Penemuduga</label>
                <input 
                  type="text" 
                  value={formData.interviewerName}
                  onChange={(e) => handleInputChange('interviewerName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tarikh Temuduga</label>
                <input 
                  type="text" 
                  readOnly
                  value={new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-100 text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button 
              type="submit"
              className="w-full sm:flex-1 min-h-[48px] bg-amber-400 hover:bg-amber-300 text-slate-950 py-3 rounded-xl font-bold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <Save className="w-5 h-5" />
              <span>Simpan Rekod Temuduga</span>
            </button>

            <button
              type="button"
              onClick={handlePrintCurrent}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-900 rounded-xl font-bold text-base transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-5 h-5" />
              <span>Cetak Borang (A4)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
