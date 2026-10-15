import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CoachingRecord, ExplanationForm } from '../../types';
import { 
  ArrowLeft, 
  Printer, 
  Save, 
  CheckCircle2, 
  Sparkles,
  Clock,
  FileText
} from 'lucide-react';

interface RecordIsuPerbincanganProps {
  onBack?: () => void;
  onSaved?: () => void;
}

export default function RecordIsuPerbincangan({ onBack, onSaved }: RecordIsuPerbincanganProps) {
  const { 
    coachingRecords, 
    explanationForms, 
    saveCoachingRecord, 
    saveExplanationForm, 
    setActivePrintDoc 
  } = useApp();

  const currentCoaching = coachingRecords[0];
  const currentExplanation = explanationForms[0];

  // State untuk Dokumen #4 (Rekod Teguran & Perbincangan)
  const [rekodTeguran, setRekodTeguran] = useState({
    namaPekerja: currentCoaching?.employeeName || '',
    jawatan: currentCoaching?.position || 'Krew Operasi',
    tarikh: currentCoaching?.discussionDate || new Date().toISOString().split('T')[0],
    masa: currentCoaching?.discussionTime || '15:30',
    lokasi: currentCoaching?.location || 'Bilik Perbincangan / Pejabat Kafe',
    penyelia: currentCoaching?.supervisorName || 'Boss Bertugas',
    jenisIsu: currentCoaching?.issueTypes?.[0] || 'Lewat',
    faktaKejadian: currentCoaching?.whatHappenedFacts || '',
    penjelasanPekerja: currentCoaching?.employeeExplanation || '',
    perubahanDikehendaki: currentCoaching?.whatNeedsToChange || '',
    tarikhFollowUp: currentCoaching?.followUpDate || '',
    status: currentCoaching?.followUpStatus || 'masih_dipantau'
  });

  // State untuk Dokumen #5 (Borang Penjelasan Pekerja)
  const [borangPenjelasan, setBorangPenjelasan] = useState({
    namaPekerja: currentExplanation?.employeeName || '',
    jawatan: currentExplanation?.position || 'Krew Operasi',
    tarikhKejadian: currentExplanation?.incidentDate || new Date().toISOString().split('T')[0],
    sebabPeristiwa: currentExplanation?.employeeStatement || '',
    adaDimaklumkan: currentExplanation?.wasBossNotified ? 'Ya' : 'Tidak',
    pihakTerlibat: currentExplanation?.witnessDetails?.name || '',
    langkahElakBerulang: currentExplanation?.preventivePlan || ''
  });

  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  const handleSubmitTeguran = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedRecord: CoachingRecord = {
      id: currentCoaching?.id || `coach-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      employeeName: rekodTeguran.namaPekerja || 'Nama Pekerja',
      position: rekodTeguran.jawatan || 'Krew Operasi',
      discussionDate: rekodTeguran.tarikh,
      discussionTime: rekodTeguran.masa,
      location: rekodTeguran.lokasi,
      supervisorName: rekodTeguran.penyelia,
      issueTypes: [rekodTeguran.jenisIsu],
      whatHappenedFacts: rekodTeguran.faktaKejadian || 'Fakta kejadian dicatat tanpa label emosi.',
      relatedRecords: ['Rekod kehadiran imbasan QR', 'WhatsApp kumpulan operasi'],
      recordNotes: 'Rekod disemak bersama pekerja.',
      whatWasDiscussed: `Membincangkan isu ${rekodTeguran.jenisIsu} dan kesan kepada kelancaran operasi.`,
      operationalImpact: 'Mempengaruhi kelancaran syif dan waktu menunggu pelanggan.',
      employeeExplanation: rekodTeguran.penjelasanPekerja || 'Pekerja mendengar dan memberi penjelasan.',
      whatNeedsToChange: rekodTeguran.perubahanDikehendaki || 'Expectation dipersetujui bersama.',
      startsFromDate: rekodTeguran.tarikh,
      followUpActions: ['Jelaskan semula rules', 'Pantau', 'Follow-up pada tarikh tertentu'],
      followUpDate: rekodTeguran.tarikhFollowUp || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      followUpStatus: rekodTeguran.status as any,
      followUpNotes: 'Pemantauan berterusan selama seminggu.',
      acknowledgedByEmployee: true,
      acknowledgedBySupervisor: true
    };

    saveCoachingRecord(formattedRecord);
    setSavedSuccessMsg('Rekod Teguran & Perbincangan (Dokumen #4) berjaya disimpan!');
    setTimeout(() => setSavedSuccessMsg(null), 4000);

    if (onSaved) onSaved();
  };

  const handleSubmitPenjelasan = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedExplanation: ExplanationForm = {
      id: currentExplanation?.id || `exp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      employeeName: borangPenjelasan.namaPekerja || 'Nama Pekerja',
      position: borangPenjelasan.jawatan || 'Krew Operasi',
      incidentDate: borangPenjelasan.tarikhKejadian,
      categories: [rekodTeguran.jenisIsu],
      bossFactSummary: rekodTeguran.faktaKejadian || 'Ringkasan fakta kejadian.',
      employeeStatement: borangPenjelasan.sebabPeristiwa || 'Penjelasan pihak pekerja.',
      whyItHappened: borangPenjelasan.sebabPeristiwa || 'Sebab kejadian berlaku.',
      wasBossNotified: borangPenjelasan.adaDimaklumkan === 'Ya',
      notificationDetails: {
        who: 'Penyelia Bertugas',
        when: 'Sebelum atau semasa syif',
        how: 'Panggilan / Mesej WhatsApp'
      },
      witnessesInvolved: Boolean(borangPenjelasan.pihakTerlibat),
      witnessDetails: borangPenjelasan.pihakTerlibat ? {
        name: borangPenjelasan.pihakTerlibat,
        role: 'Rakan Sekerja',
        brief: 'Mengetahui situasi insiden'
      } : undefined,
      supportingRecords: ['WhatsApp', 'Resit / Dokumen Sokongan'],
      preventivePlan: borangPenjelasan.langkahElakBerulang || 'Langkah pencegahan yang dicadangkan pekerja.',
      additionalNotes: 'Pengakuan dan komitmen penambahbaikan.',
      employeeSigned: true,
      bossNextAction: {
        maklumatCukup: true,
        semakSistem: true,
        semakMesej: true,
        semakJadual: false,
        bercakapPihakLain: false,
        perluFollowUp: true,
        perluReview: false,
        nextStepText: 'Terima penjelasan berasaskan bukti rekod. Teruskan pemantauan susulan.'
      }
    };

    saveExplanationForm(formattedExplanation);
    setSavedSuccessMsg('Borang Penjelasan Pekerja (Dokumen #5) berjaya disimpan!');
    setTimeout(() => setSavedSuccessMsg(null), 4000);

    if (onSaved) onSaved();
  };

  const handlePrintTeguran = () => {
    setActivePrintDoc({
      type: 'doc4_coaching',
      data: {
        id: 'coach-print',
        employeeName: rekodTeguran.namaPekerja || 'Nama Pekerja',
        position: rekodTeguran.jawatan || 'Krew Operasi',
        discussionDate: rekodTeguran.tarikh,
        discussionTime: rekodTeguran.masa,
        location: rekodTeguran.lokasi,
        supervisorName: rekodTeguran.penyelia,
        issueTypes: [rekodTeguran.jenisIsu],
        whatHappenedFacts: rekodTeguran.faktaKejadian || '-',
        employeeExplanation: rekodTeguran.penjelasanPekerja || '-',
        whatNeedsToChange: rekodTeguran.perubahanDikehendaki || '-',
        startsFromDate: rekodTeguran.tarikh,
        followUpDate: rekodTeguran.tarikhFollowUp || '-',
        followUpStatus: rekodTeguran.status,
        followUpNotes: 'Rekod rasmi perbincangan bimbingan.'
      }
    });
  };

  const handlePrintPenjelasan = () => {
    setActivePrintDoc({
      type: 'doc5_explanation',
      data: {
        id: 'exp-print',
        employeeName: borangPenjelasan.namaPekerja || 'Nama Pekerja',
        position: borangPenjelasan.jawatan || 'Krew Operasi',
        incidentDate: borangPenjelasan.tarikhKejadian,
        categories: [rekodTeguran.jenisIsu],
        bossFactSummary: rekodTeguran.faktaKejadian || '-',
        employeeStatement: borangPenjelasan.sebabPeristiwa || '-',
        whyItHappened: borangPenjelasan.sebabPeristiwa || '-',
        preventivePlan: borangPenjelasan.langkahElakBerulang || '-',
        bossNextAction: {
          nextStepText: 'Tindakan susulan & pemantauan oleh pengurusan.'
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrintTeguran}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Cetak Rekod Teguran</span>
          </button>
        </div>
      </div>

      {savedSuccessMsg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Berjaya!</strong> {savedSuccessMsg}</span>
        </div>
      )}

      {/* Main Container without pill badges */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-10">
        
        {/* BAHAGIAN 1: DOKUMEN #4 - REKOD TEGURAN & PERBINCANGAN */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Rekod Teguran & Perbincangan Pekerja
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
            Gunakan apabila sesuatu isu cukup penting untuk direkodkan supaya boss tidak bergantung pada ingatan semata-mata <em className="text-slate-900 font-medium">“Aku rasa kita dah pernah bincang”</em>.
          </p>

          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Panduan Boss (Tulis Fakta, Elakkan Label):</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <span className="text-rose-700">❌ Kurang Baik: “Pekerja memang malas.”</span>
                <span className="text-emerald-700">✅ Lebih Baik: “Dijadualkan masuk 9:00 pagi, tiba 9:42 pagi tanpa makluman awal.”</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmitTeguran} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pekerja <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nama Pekerja" 
                  required
                  value={rekodTeguran.namaPekerja} 
                  onChange={(e) => setRekodTeguran({ ...rekodTeguran, namaPekerja: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tarikh Perbincangan <span className="text-rose-500">*</span></label>
                <input 
                  type="date" 
                  required
                  value={rekodTeguran.tarikh} 
                  onChange={(e) => setRekodTeguran({ ...rekodTeguran, tarikh: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Jenis Isu</label>
              <select 
                value={rekodTeguran.jenisIsu}
                onChange={(e) => setRekodTeguran({ ...rekodTeguran, jenisIsu: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 text-slate-800"
              >
                <option value="Lewat">Lewat / Ketidakhadiran</option>
                <option value="Tugas tidak siap">Tugas tidak siap / Prestasi</option>
                <option value="Tidak mengikut arahan">Tidak mengikut arahan</option>
                <option value="Penggunaan telefon">Penggunaan telefon</option>
                <option value="Customer complaint">Aduan pelanggan (Customer complaint)</option>
                <option value="Konflik pekerja">Konflik rakan sekerja</option>
                <option value="Keselamatan">Keselamatan & Standard Peralatan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Fakta Kejadian (Tulis fakta, elakkan label emosi cth: "malas")
              </label>
              <textarea 
                rows={3} 
                placeholder="Cth: Pekerja dijadualkan masuk 9:00 pagi, tiba pukul 9:42 pagi tanpa makluman awal. Kelewatan menyebabkan persediaan stesen terganggu."
                value={rekodTeguran.faktaKejadian}
                onChange={(e) => setRekodTeguran({ ...rekodTeguran, faktaKejadian: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Penjelasan Pekerja (Dengar dahulu sebelum buat keputusan)
              </label>
              <textarea 
                rows={2} 
                placeholder="Catat penjelasan pihak pekerja di sini..."
                value={rekodTeguran.penjelasanPekerja}
                onChange={(e) => setRekodTeguran({ ...rekodTeguran, penjelasanPekerja: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Apa yang perlu berubah? (Expectation)</label>
                <input 
                  type="text" 
                  placeholder="Cth: Wajib tiba 10 minit awal sebelum syif"
                  value={rekodTeguran.perubahanDikehendaki}
                  onChange={(e) => setRekodTeguran({ ...rekodTeguran, perubahanDikehendaki: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tarikh Semakan Susulan (Follow-Up)</label>
                <input 
                  type="date" 
                  value={rekodTeguran.tarikhFollowUp}
                  onChange={(e) => setRekodTeguran({ ...rekodTeguran, tarikhFollowUp: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-amber-600 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition text-sm cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Rekod Teguran</span>
            </button>
          </form>
        </div>

        <hr className="border-slate-200" />

        {/* BAHAGIAN 2: DOKUMEN #5 - BORANG PENJELASAN PEKERJA */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Borang Penjelasan Pekerja
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Memberi ruang kepada pekerja menjelaskan sesuatu kejadian sebelum boss membuat kesimpulan muktamad (Fakta → Penjelasan → Rekod → Keputusan).
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrintPenjelasan}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Penjelasan</span>
            </button>
          </div>

          <form onSubmit={handleSubmitPenjelasan} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pekerja <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nama Pekerja" 
                  required
                  value={borangPenjelasan.namaPekerja} 
                  onChange={(e) => setBorangPenjelasan({ ...borangPenjelasan, namaPekerja: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tarikh Kejadian <span className="text-rose-500">*</span></label>
                <input 
                  type="date" 
                  required
                  value={borangPenjelasan.tarikhKejadian} 
                  onChange={(e) => setBorangPenjelasan({ ...borangPenjelasan, tarikhKejadian: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Adakah Boss / Penyelia Dimaklumkan?</label>
                <select
                  value={borangPenjelasan.adaDimaklumkan}
                  onChange={(e) => setBorangPenjelasan({ ...borangPenjelasan, adaDimaklumkan: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                >
                  <option value="Ya">Ya, telah dimaklumkan</option>
                  <option value="Tidak">Tidak / Terlewat maklum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Ada Pihak / Saksi Lain Terlibat?</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Rakan syif / Pembekal"
                  value={borangPenjelasan.pihakTerlibat}
                  onChange={(e) => setBorangPenjelasan({ ...borangPenjelasan, pihakTerlibat: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Sebab / Cerita Sebenar Daripada Pekerja
              </label>
              <textarea 
                rows={3} 
                placeholder="Terangkan apa yang berlaku dari sudut pandang pekerja secara jujur..."
                value={borangPenjelasan.sebabPeristiwa}
                onChange={(e) => setBorangPenjelasan({ ...borangPenjelasan, sebabPeristiwa: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Langkah pencegahan yang boleh dibuat oleh pekerja
              </label>
              <input 
                type="text" 
                placeholder="Cth: Pasang penggera lebih awal / pastikan bateri telefon dicas penuh"
                value={borangPenjelasan.langkahElakBerulang}
                onChange={(e) => setBorangPenjelasan({ ...borangPenjelasan, langkahElakBerulang: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Borang Penjelasan</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
