import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OnboardingChecklist, WorkRulesChecklist } from '../../types';
import { 
  ArrowLeft, 
  Printer, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Trash2,
  FileText
} from 'lucide-react';

interface OnboardingRulesProps {
  onBack?: () => void;
  onSaved?: () => void;
}

export default function OnboardingRules({ onBack, onSaved }: OnboardingRulesProps) {
  const { 
    onboardingForms, 
    workRulesList, 
    saveOnboardingForm, 
    saveWorkRules, 
    setActivePrintDoc 
  } = useApp();

  const currentOnboarding = onboardingForms[0];
  const currentRules = workRulesList[0];

  // State untuk Checklist Hari Pertama (Dokumen #2)
  const [hariPertama, setHariPertama] = useState({
    namaPekerja: currentOnboarding?.employeeName || '',
    jawatan: currentOnboarding?.position || '',
    tarikhMula: currentOnboarding?.startDate || new Date().toISOString().split('T')[0],
    pemberiPenerangan: currentOnboarding?.briefedBy || 'Penyelia Bertugas',
    waktuKerja: currentOnboarding?.waktuTempatKerja?.waktuMula ?? true,
    shift: currentOnboarding?.waktuTempatKerja?.shift ?? true,
    hariRehat: currentOnboarding?.waktuTempatKerja?.hariRehat ?? true,
    uniform: currentOnboarding?.waktuTempatKerja?.uniformPakaian ?? true,
    tugasUtama: true,
    caraTelefon: currentOnboarding?.telefon?.bilaBolehGuna ?? true,
    gajiDiterangkan: currentOnboarding?.gajiBayaran?.kadarBayaran ?? true,
    caraTanya: currentOnboarding?.standardKerja?.tahuBilaTakPasti ?? true,
    tugas1: currentOnboarding?.tugasUtama?.[0]?.name || 'Penyediaan Bahan & Kalibrasi Stesen',
    tugas2: currentOnboarding?.tugasUtama?.[1]?.name || 'Standard Operasi Mengambil Pesanan / Memasak',
    tugas3: currentOnboarding?.tugasUtama?.[2]?.name || 'Kebersihan & Sanitasi Hujung Syif',
    checkInNota: currentOnboarding?.checkInHujungHari?.bahagianKurangJelas || ''
  });

  // State untuk Peraturan Kerja (Dokumen #3)
  const [peraturanKerja, setPeraturanKerja] = useState({
    kehadiranJelas: currentRules?.waktuKehadiran?.caraRekodKehadiranJelas ?? true,
    telefonRules: currentRules?.penggunaanTelefon?.tidakGangguTugas ?? true,
    tugasJelas: currentRules?.tugasTanggungjawab?.tugasUtamaJelas ?? true,
    komunikasiSopan: currentRules?.sikapKomunikasi?.tiadaJeritanAtauSeranganPeribadi ?? true,
    keselamatanPeralatan: currentRules?.kebersihanKeselamatan?.prosedurKeselamatan ?? true,
    cutiProsedur: currentRules?.cutiLambat?.caraMintaCuti ?? true,
    rulesKhas1: currentRules?.limaRulesKhusus?.[0] || 'Pukul 9:00 pagi bermaksud sudah bersedia di kaunter, bukan baru melangkah masuk pintu kedai.',
    rulesKhas2: currentRules?.limaRulesKhusus?.[1] || 'Kalau tak tahu, tanya. Jangan buat ikut andaian kalau tidak pasti.',
    rulesKhas3: currentRules?.limaRulesKhusus?.[2] || 'Kebersihan meja dan stesen kerja dijaga setiap saat (Clean as you go).'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCheckboxChange = (type: 'hariPertama' | 'peraturan', field: string) => {
    if (type === 'hariPertama') {
      setHariPertama(prev => ({
        ...prev,
        [field]: !prev[field as keyof typeof prev]
      }));
    } else if (type === 'peraturan') {
      setPeraturanKerja(prev => ({
        ...prev,
        [field]: !prev[field as keyof typeof prev]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOnboarding: OnboardingChecklist = {
      id: currentOnboarding?.id || `onb-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      employeeName: hariPertama.namaPekerja || 'Pekerja Baharu',
      position: hariPertama.jawatan || 'Krew Operasi',
      startDate: hariPertama.tarikhMula,
      briefedBy: hariPertama.pemberiPenerangan,
      waktuTempatKerja: {
        waktuMula: hariPertama.waktuKerja,
        waktuTamat: hariPertama.waktuKerja,
        shift: hariPertama.shift,
        hariBekerja: hariPertama.shift,
        hariRehat: hariPertama.hariRehat,
        waktuRehat: true,
        uniformPakaian: hariPertama.uniform,
        tempatSimpanBarang: true,
        siapaBeriArahan: true
      },
      tugasUtama: [
        { name: hariPertama.tugas1, sudahDitunjukkan: true, pekerjaSudahCuba: true },
        { name: hariPertama.tugas2, sudahDitunjukkan: true, pekerjaSudahCuba: true },
        { name: hariPertama.tugas3, sudahDitunjukkan: true, pekerjaSudahCuba: true }
      ],
      standardKerja: {
        caraGunaPeralatan: true,
        standardKebersihan: true,
        layananCustomer: true,
        keselamatan: true,
        tahuBilaTakPasti: hariPertama.caraTanya
      },
      kehadiran: {
        rekodKehadiran: true,
        maksudMulaKerja: true,
        buatBilaLambat: true,
        buatBilaTakBolehDatang: true,
        mintaCuti: true,
        siapaDihubungi: true
      },
      telefon: {
        bilaBolehGuna: hariPertama.caraTelefon,
        bilaPerluSimpan: true,
        urusanKecemasan: true,
        rulesKhusus: 'Telefon disimpan dalam loker semasa bertugas kecuali rehat atau kecemasan.'
      },
      gajiBayaran: {
        kadarBayaran: hariPertama.gajiDiterangkan,
        kitaranBayaran: true,
        kepentinganRekodKehadiran: true,
        slipGaji: true,
        siapaBolehDitanya: true
      },
      bilaAdaMasalah: {
        takFahamArahan: true,
        tersilapBuatKerja: true,
        customerComplain: true,
        peralatanRosak: true,
        konflikPekerja: true,
        isuOperasi: true
      },
      rulesPentingBisnes: [
        peraturanKerja.rulesKhas1,
        peraturanKerja.rulesKhas2,
        peraturanKerja.rulesKhas3
      ].filter(Boolean),
      checkInHujungHari: {
        bahagianKurangJelas: hariPertama.checkInNota || 'Semua bahagian telah difahami dengan baik.',
        waktuKerjaJelas: true,
        tugasUtamaJelas: true,
        rulesAsasJelas: true,
        caraRekodKehadiranJelas: true,
        siapaPerluDitanyaJelas: true
      },
      confirmedByEmployee: true,
      confirmedByBoss: true
    };

    const newRules: WorkRulesChecklist = {
      id: currentRules?.id || `rules-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      companyName: currentRules?.companyName || 'Perniagaan Operasi Boss',
      businessType: currentRules?.businessType || 'Perkhidmatan & Runcit',
      waktuKehadiran: {
        waktuMulaJelas: true,
        waktuTamatJelas: true,
        shiftJelas: true,
        hariBekerjaJelas: true,
        hariRehatJelas: true,
        caraRekodKehadiranJelas: peraturanKerja.kehadiranJelas,
        prosedurLambatJelas: true,
        prosedurTakHadirJelas: true,
        caraMintaCutiJelas: peraturanKerja.cutiProsedur,
        rulesKhusus: 'Kehadiran direkod mengikut sistem operasi sebelum syif bermula.'
      },
      penggunaanTelefon: {
        tidakGangguTugas: peraturanKerja.telefonRules,
        waktuPenggunaanDibenarkan: true,
        urusanKecemasan: true,
        mediaSosial: true,
        rulesKhusus: 'Telefon tidak digunakan semasa melayan pelanggan atau di stesen kerja.'
      },
      tugasTanggungjawab: {
        tugasUtamaJelas: peraturanKerja.tugasJelas,
        siapaBeriArahanJelas: true,
        standardKerjaDiterangkan: true,
        tahuBilaPerluTanya: true,
        prosedurTugasTakSiapJelas: true,
        rulesKhusus: 'Setiap pekerja mempunyai PIC stesen yang jelas.'
      },
      sikapKomunikasi: {
        komunikasiCustomer: true,
        komunikasiRakanSekerja: true,
        maklumkanMasalah: true,
        terimaArahanPembetulan: true,
        tiadaJeritanAtauSeranganPeribadi: peraturanKerja.komunikasiSopan,
        rulesKhusus: 'Konflik tidak diselesaikan dengan jeritan atau serangan peribadi.'
      },
      kebersihanKeselamatan: {
        standardKebersihan: true,
        prosedurKeselamatan: peraturanKerja.keselamatanPeralatan,
        gunaPeralatan: true,
        kerosakanDimaklumkan: true,
        peralatanDijaga: true,
        rulesKhusus: 'Peralatan dibersihkan dan disimpan rapi mengikut standard.'
      },
      cutiLambat: {
        caraMintaCuti: peraturanKerja.cutiProsedur,
        notisDiharapkan: true,
        bilaKecemasan: true,
        bilaLambat: true,
        siapaDihubungi: true,
        rulesKhusus: 'Permohonan cuti dimaklumkan lebih awal untuk penyusunan jadual.'
      },
      gajiBayaran: {
        kadarBayaran: true,
        kitaranBayaran: true,
        kepentinganRekodKehadiran: true,
        prosesPertanyaanGaji: true,
        rekodDalamSistem: true
      },
      limaRulesKhusus: [
        peraturanKerja.rulesKhas1,
        peraturanKerja.rulesKhas2,
        peraturanKerja.rulesKhas3
      ].filter(Boolean)
    };

    saveOnboardingForm(newOnboarding);
    saveWorkRules(newRules);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);

    if (onSaved) {
      onSaved();
    }
  };

  const handlePrintCurrent = () => {
    setActivePrintDoc({
      type: 'doc2_onboarding',
      data: {
        id: 'onb-print',
        employeeName: hariPertama.namaPekerja || 'Nama Pekerja',
        position: hariPertama.jawatan || 'Krew Operasi',
        startDate: hariPertama.tarikhMula,
        briefedBy: hariPertama.pemberiPenerangan,
        tugasUtama: [
          { name: hariPertama.tugas1, sudahDitunjukkan: true, pekerjaSudahCuba: true },
          { name: hariPertama.tugas2, sudahDitunjukkan: true, pekerjaSudahCuba: true },
          { name: hariPertama.tugas3, sudahDitunjukkan: true, pekerjaSudahCuba: true }
        ],
        rulesPentingBisnes: [
          peraturanKerja.rulesKhas1,
          peraturanKerja.rulesKhas2,
          peraturanKerja.rulesKhas3
        ],
        checkInHujungHari: {
          bahagianKurangJelas: hariPertama.checkInNota || 'Semua bahagian kerja difahami.'
        }
      }
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

        <button
          type="button"
          onClick={handlePrintCurrent}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>Cetak Dokumen Onboarding</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Berjaya!</strong> Rekod Onboarding & Peraturan Kerja telah disimpan ke dalam pangkalan data.</span>
        </div>
      )}

      {/* Main Card Container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-5 mb-6">
          <span className="text-xs font-bold text-slate-800 bg-amber-400 px-3 py-1 rounded-md">
            Dokumen 2 & 3
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Senarai Semak Hari Pertama & Peraturan Kerja
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1 leading-relaxed">
            Memastikan pekerja baru menerima penerangan asas dan peraturan jelas sebelum bos menganggap <em className="text-slate-900 font-medium">“benda ni common sense”</em>.
          </p>

          <div className="mt-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-950 flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Ayat Siap Guna Bos:</strong> “Kalau syif bermula pukul 9, expectation kita ialah pukul 9 anda sudah bersedia untuk mula bekerja di stesen.”
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* BAHAGIAN 1: DOKUMEN #2 - CHECKLIST HARI PERTAMA */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Dokumen #2: Checklist Hari Pertama Pekerja</span>
              <span className="text-xs text-slate-400 font-normal">Onboarding Operasi</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pekerja <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nama Pekerja" 
                  required
                  value={hariPertama.namaPekerja} 
                  onChange={(e) => setHariPertama({ ...hariPertama, namaPekerja: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jawatan / Tugas</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Krew Dapur / Barista" 
                  value={hariPertama.jawatan} 
                  onChange={(e) => setHariPertama({ ...hariPertama, jawatan: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tarikh Mula Bekerja <span className="text-rose-500">*</span></label>
                <input 
                  type="date" 
                  required
                  value={hariPertama.tarikhMula} 
                  onChange={(e) => setHariPertama({ ...hariPertama, tarikhMula: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Orang Yang Memberi Penerangan</label>
                <input 
                  type="text" 
                  placeholder="Nama Boss / Penyelia" 
                  value={hariPertama.pemberiPenerangan} 
                  onChange={(e) => setHariPertama({ ...hariPertama, pemberiPenerangan: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Checklist Penerangan Operasi */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Senarai Semak Penerangan Operasi</p>
              
              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={hariPertama.waktuKerja} 
                  onChange={() => handleCheckboxChange('hariPertama', 'waktuKerja')}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Waktu mula & tamat kerja diterangkan dengan jelas</span>
              </label>

              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={hariPertama.shift} 
                  onChange={() => handleCheckboxChange('hariPertama', 'shift')}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Shift, Hari Bekerja & Hari Rehat diterangkan</span>
              </label>

              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={hariPertama.tugasUtama} 
                  onChange={() => handleCheckboxChange('hariPertama', 'tugasUtama')}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Tugas utama ditunjuk cara & dicuba sendiri oleh pekerja</span>
              </label>

              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={hariPertama.caraTelefon} 
                  onChange={() => handleCheckboxChange('hariPertama', 'caraTelefon')}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Rules penggunaan telefon & urusan kecemasan diterangkan</span>
              </label>

              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={hariPertama.gajiDiterangkan} 
                  onChange={() => handleCheckboxChange('hariPertama', 'gajiDiterangkan')}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Kadar bayaran, kitaran tarikh gaji & slip diterangkan</span>
              </label>

              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={hariPertama.caraTanya} 
                  onChange={() => handleCheckboxChange('hariPertama', 'caraTanya')}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Pekerja tahu apa perlu dibuat jika tidak pasti ("Kalau tak tahu, tanya")</span>
              </label>
            </div>

            {/* 3 Tugas Utama Detail */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                3 Tugas Utama (Tunjuk Cara & Pekerja Cuba Sendiri)
              </p>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Tugas #1 (cth: Bancuh kopi / susun stesen)"
                  value={hariPertama.tugas1}
                  onChange={(e) => setHariPertama({ ...hariPertama, tugas1: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                />
                <input
                  type="text"
                  placeholder="Tugas #2 (cth: Pengendalian mesin POS & tunai)"
                  value={hariPertama.tugas2}
                  onChange={(e) => setHariPertama({ ...hariPertama, tugas2: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                />
                <input
                  type="text"
                  placeholder="Tugas #3 (cth: Closing SOP & kebersihan)"
                  value={hariPertama.tugas3}
                  onChange={(e) => setHariPertama({ ...hariPertama, tugas3: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                />
              </div>
            </div>

            {/* Check-in Hujung Hari */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Check-in Hujung Hari: “Apa bahagian kerja hari ini yang masih kurang jelas?”
              </label>
              <textarea
                rows={2}
                placeholder="Catat maklum balas atau soalan daripada pekerja baru di penghujung hari pertama..."
                value={hariPertama.checkInNota}
                onChange={(e) => setHariPertama({ ...hariPertama, checkInNota: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:bg-white"
              />
            </div>
          </div>

          {/* BAHAGIAN 2: DOKUMEN #3 - CHECKLIST PERATURAN KERJA */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Dokumen #3: Checklist Peraturan Kerja (Rules)</span>
              <span className="text-xs text-slate-400 font-normal">SOP & Standard Bisnes</span>
            </h3>

            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Tetapan Peraturan Rasmi Bisnes</p>
              
              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={peraturanKerja.kehadiranJelas} 
                  onChange={() => handleCheckboxChange('peraturan', 'kehadiranJelas')}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span>Prosedur jika lewat atau tidak dapat hadir ditetapkan dengan jelas</span>
              </label>

              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={peraturanKerja.komunikasiSopan} 
                  onChange={() => handleCheckboxChange('peraturan', 'komunikasiSopan')}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span>Konflik tidak diselesaikan dengan jeritan atau serangan peribadi</span>
              </label>

              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={peraturanKerja.keselamatanPeralatan} 
                  onChange={() => handleCheckboxChange('peraturan', 'keselamatanPeralatan')}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span>Standard kebersihan, keselamatan & penjagaan peralatan diterangkan</span>
              </label>

              <label className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 cursor-pointer p-1.5 hover:bg-white rounded-lg transition-colors">
                <input 
                  type="checkbox" 
                  checked={peraturanKerja.cutiProsedur} 
                  onChange={() => handleCheckboxChange('peraturan', 'cutiProsedur')}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span>Cara meminta cuti & notis yang diharapkan diterangkan awal</span>
              </label>

              <div className="pt-2 space-y-2">
                <label className="block text-xs font-semibold text-slate-700">Rules Khusus Bisnes Anda:</label>
                <input 
                  type="text" 
                  placeholder="Rules 1: Contoh: Pukul 9 pagi bermaksud sedia di kaunter, bukan baru sampai pintu."
                  value={peraturanKerja.rulesKhas1}
                  onChange={(e) => setPeraturanKerja({ ...peraturanKerja, rulesKhas1: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                />
                <input 
                  type="text" 
                  placeholder="Rules 2: Contoh: Kalau tak tahu, tanya. Jangan buat ikut andaian."
                  value={peraturanKerja.rulesKhas2}
                  onChange={(e) => setPeraturanKerja({ ...peraturanKerja, rulesKhas2: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                />
                <input 
                  type="text" 
                  placeholder="Rules 3: Contoh: Kebersihan stesen kerja dijaga setiap saat."
                  value={peraturanKerja.rulesKhas3}
                  onChange={(e) => setPeraturanKerja({ ...peraturanKerja, rulesKhas3: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button 
              type="submit"
              className="w-full sm:flex-1 min-h-[48px] bg-amber-400 hover:bg-amber-300 text-slate-950 py-3 rounded-xl font-bold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <Save className="w-5 h-5" />
              <span>Simpan Onboarding & Peraturan</span>
            </button>

            <button
              type="button"
              onClick={handlePrintCurrent}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-900 rounded-xl font-bold text-base transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-5 h-5" />
              <span>Cetak Senarai Semak</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
