import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentType } from '../../types';
import { 
  FileText, 
  Printer, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  Search, 
  Calendar, 
  User, 
  Shield, 
  ShieldAlert, 
  Briefcase,
  Edit3
} from 'lucide-react';
import BorangTemuduga from './BorangTemuduga';
import OnboardingRules from './OnboardingRules';
import RecordIsuPerbincangan from './RecordIsuPerbincangan';

export const DocumentsHub: React.FC = () => {
  const { 
    activeDocSubtab, 
    setActiveDocSubtab,
    interviewForms,
    onboardingForms,
    workRulesList,
    coachingRecords,
    explanationForms,
    seriousActions,
    capacityAudits,
    saveInterviewForm,
    deleteInterviewForm,
    saveOnboardingForm,
    saveWorkRules,
    saveCoachingRecord,
    deleteCoachingRecord,
    saveExplanationForm,
    saveSeriousAction,
    saveCapacityAudit,
    setActivePrintDoc
  } = useApp();

  const [activeFormModal, setActiveFormModal] = useState<DocumentType | null>(null);
  const [directFillingDoc, setDirectFillingDoc] = useState<DocumentType | null>(null);

  // Tab configurations
  const docList: { type: DocumentType; label: string; number: string; desc: string; count: number }[] = [
    { 
      type: 'doc1_interview', 
      number: 'Dokumen 1', 
      label: 'Borang Temuduga Ringkas', 
      desc: '7 soalan interview konsisten & semakan kerja', 
      count: interviewForms.length 
    },
    { 
      type: 'doc2_onboarding', 
      number: 'Dokumen 2', 
      label: 'Senarai Semak Hari Pertama', 
      desc: 'Onboarding asas, 3 tugas utama & check-in', 
      count: onboardingForms.length 
    },
    { 
      type: 'doc3_rules', 
      number: 'Dokumen 3', 
      label: 'Senarai Semak Peraturan Kerja', 
      desc: 'Keluarkan peraturan: telefon, kehadiran & SOP', 
      count: workRulesList.length 
    },
    { 
      type: 'doc4_coaching', 
      number: 'Dokumen 4', 
      label: 'Rekod Teguran & Bimbingan', 
      desc: 'Catatan fakta, sesi dengar & tarikh susulan', 
      count: coachingRecords.length 
    },
    { 
      type: 'doc5_explanation', 
      number: 'Dokumen 5', 
      label: 'Borang Penjelasan Pekerja', 
      desc: 'Ruang adil staf jelaskan insiden & pencegahan', 
      count: explanationForms.length 
    },
    { 
      type: 'doc6_emergency', 
      number: 'Dokumen 6', 
      label: 'Senarai Semak Tindakan Serius', 
      desc: 'Brek kecemasan bos: 9 langkah semakan & emosi', 
      count: seriousActions.length 
    },
    { 
      type: 'doc8_capacity', 
      number: 'Dokumen 7', 
      label: 'Audit Kapasiti Pekerja', 
      desc: 'Formula: Penat ≠ Automatik tak cukup orang (Audit 7 hari)', 
      count: capacityAudits.length 
    }
  ];

  const handleOpenNewRecord = (docType: DocumentType) => {
    if (
      docType === 'doc1_interview' || 
      docType === 'doc2_onboarding' || 
      docType === 'doc3_rules' || 
      docType === 'doc4_coaching' || 
      docType === 'doc5_explanation'
    ) {
      setDirectFillingDoc(docType);
    } else {
      setActiveFormModal(docType);
    }
  };

  if (directFillingDoc === 'doc1_interview') {
    return (
      <BorangTemuduga 
        onBack={() => setDirectFillingDoc(null)}
        onSaved={() => setDirectFillingDoc(null)}
      />
    );
  }

  if (directFillingDoc === 'doc2_onboarding' || directFillingDoc === 'doc3_rules') {
    return (
      <OnboardingRules 
        onBack={() => setDirectFillingDoc(null)}
        onSaved={() => setDirectFillingDoc(null)}
      />
    );
  }

  if (directFillingDoc === 'doc4_coaching' || directFillingDoc === 'doc5_explanation') {
    return (
      <RecordIsuPerbincangan 
        onBack={() => setDirectFillingDoc(null)}
        onSaved={() => setDirectFillingDoc(null)}
      />
    );
  }

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Dokumen & Rekod Operasi Bos
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Format rasmi berpandukan kerangka AKULAH BOS: Rules • Record • Response
          </p>
        </div>

        <button
          onClick={() => handleOpenNewRecord(activeDocSubtab)}
          className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors cursor-pointer active:scale-98"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>+ Isi Rekod Baharu</span>
        </button>
      </div>

      {/* Situasi Operasi (4 Modul Situasi Pantas) */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap items-center gap-1.5 text-sm">
        <span className="font-bold text-slate-500 px-3 py-1">Pilih Situasi:</span>
        <button
          onClick={() => setActiveDocSubtab('doc1_interview')}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
            activeDocSubtab === 'doc1_interview'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          1. Temuduga (Dokumen 1)
        </button>
        <button
          onClick={() => setActiveDocSubtab(activeDocSubtab === 'doc3_rules' ? 'doc3_rules' : 'doc2_onboarding')}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
            activeDocSubtab === 'doc2_onboarding' || activeDocSubtab === 'doc3_rules'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          2. Onboarding & Peraturan (Dokumen 2 & 3)
        </button>
        <button
          onClick={() => setActiveDocSubtab(activeDocSubtab === 'doc5_explanation' ? 'doc5_explanation' : 'doc4_coaching')}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
            activeDocSubtab === 'doc4_coaching' || activeDocSubtab === 'doc5_explanation'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          3. Teguran & Penjelasan (Dokumen 4 & 5)
        </button>
        <button
          onClick={() => setActiveDocSubtab(activeDocSubtab === 'doc8_capacity' ? 'doc8_capacity' : 'doc6_emergency')}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
            activeDocSubtab === 'doc6_emergency' || activeDocSubtab === 'doc8_capacity'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          4. Tindakan Serius & Kapasiti (Dokumen 6 & 7)
        </button>
      </div>

      {/* Document Selector Navigation Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
        {docList.map(doc => {
          const isActive = activeDocSubtab === doc.type;
          return (
            <button
              key={doc.type}
              onClick={() => setActiveDocSubtab(doc.type)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold block ${isActive ? 'text-amber-400' : 'text-neutral-400'}`}>
                  {doc.number}
                </span>
                <span className="text-xs font-bold line-clamp-1 mt-0.5">
                  {doc.label}
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-neutral-200/40 flex items-center justify-between text-[10px]">
                <span className={isActive ? 'text-neutral-400' : 'text-neutral-400'}>Rekod</span>
                <span className="font-mono font-bold tabular-nums">{doc.count}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Document Content Area */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs">
        
        {/* Dokumen #1 View */}
        {activeDocSubtab === 'doc1_interview' && (
          <Doc1InterviewView 
            forms={interviewForms} 
            onOpenPrint={(f) => setActivePrintDoc({ type: 'doc1_interview', data: f })}
            onDelete={deleteInterviewForm}
            onCreateNew={() => setActiveFormModal('doc1_interview')}
          />
        )}

        {/* Dokumen #2 View */}
        {activeDocSubtab === 'doc2_onboarding' && (
          <Doc2OnboardingView 
            forms={onboardingForms}
            onOpenPrint={(f) => setActivePrintDoc({ type: 'doc2_onboarding', data: f })}
            onCreateNew={() => setActiveFormModal('doc2_onboarding')}
          />
        )}

        {/* Dokumen #3 View */}
        {activeDocSubtab === 'doc3_rules' && (
          <Doc3RulesView 
            rules={workRulesList}
            onOpenPrint={(r) => setActivePrintDoc({ type: 'doc3_rules', data: r })}
            onCreateNew={() => setActiveFormModal('doc3_rules')}
          />
        )}

        {/* Dokumen #4 View */}
        {activeDocSubtab === 'doc4_coaching' && (
          <Doc4CoachingView 
            records={coachingRecords}
            onOpenPrint={(r) => setActivePrintDoc({ type: 'doc4_coaching', data: r })}
            onDelete={deleteCoachingRecord}
            onCreateNew={() => setActiveFormModal('doc4_coaching')}
          />
        )}

        {/* Dokumen #5 View */}
        {activeDocSubtab === 'doc5_explanation' && (
          <Doc5ExplanationView 
            forms={explanationForms}
            onOpenPrint={(f) => setActivePrintDoc({ type: 'doc5_explanation', data: f })}
            onCreateNew={() => setActiveFormModal('doc5_explanation')}
          />
        )}

        {/* Dokumen #6 View */}
        {activeDocSubtab === 'doc6_emergency' && (
          <Doc6EmergencyView 
            actions={seriousActions}
            onOpenPrint={(a) => setActivePrintDoc({ type: 'doc6_emergency', data: a })}
            onCreateNew={() => setActiveFormModal('doc6_emergency')}
          />
        )}

        {/* Dokumen #8 View */}
        {activeDocSubtab === 'doc8_capacity' && (
          <Doc8CapacityView 
            audits={capacityAudits}
            onOpenPrint={(a) => setActivePrintDoc({ type: 'doc8_capacity', data: a })}
            onCreateNew={() => setActiveFormModal('doc8_capacity')}
          />
        )}

      </div>

      {/* Creation Modal */}
      {activeFormModal && (
        <CreationFormModal 
          type={activeFormModal}
          onClose={() => setActiveFormModal(null)}
        />
      )}

    </div>
  );
};

// ==========================================
// SUB-VIEWS FOR EACH DOCUMENT
// ==========================================

// Doc 1 Subview
const Doc1InterviewView: React.FC<{ 
  forms: any[]; 
  onOpenPrint: (f: any) => void; 
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}> = ({ forms, onOpenPrint, onDelete }) => {
  const [isFilling, setIsFilling] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  if (isFilling) {
    return (
      <BorangTemuduga 
        onBack={() => {
          setIsFilling(false);
          setSelectedCandidate(null);
        }}
        initialData={selectedCandidate}
        onSaved={() => {
          setIsFilling(false);
          setSelectedCandidate(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Dokumen #1
            </span>
            <h2 className="text-base font-bold text-neutral-900">
              Borang Temuduga Ringkas Pekerja
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Tujuan: Membantu boss interview calon dengan lebih konsisten supaya keputusan tidak dibuat hanya kerana <em className="text-neutral-800">“Nampak okay”</em> atau <em className="text-neutral-800">“Aku perlukan orang cepat”</em>.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCandidate(null);
            setIsFilling(true);
          }}
          className="px-3.5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buka Borang Temuduga Baru</span>
        </button>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-12 text-neutral-400">
          <p className="text-xs">Tiada borang temuduga disimpan lagi.</p>
          <button
            onClick={() => {
              setSelectedCandidate(null);
              setIsFilling(true);
            }}
            className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
          >
            Mula Temuduga Calon Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {forms.map(form => (
            <div key={form.id} className="border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 transition-colors bg-white shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <span className="text-sm font-bold text-neutral-900">{form.candidateName}</span>
                  <span className="text-xs text-neutral-500 ml-2">Jawatan: <strong>{form.positionApplied}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                    form.decision === 'pertimbangkan' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : form.decision === 'semakan_lanjut' 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {form.decision?.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCandidate(form);
                      setIsFilling(true);
                    }}
                    className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md border border-neutral-200 cursor-pointer hover:bg-slate-50"
                    title="Sunting / Buka Borang"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenPrint(form)}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded-md border border-neutral-200 cursor-pointer hover:bg-slate-50"
                    title="Cetak Borang Temuduga"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(form.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-md cursor-pointer hover:bg-rose-50"
                    title="Padam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-neutral-600 bg-neutral-50 p-3 rounded-lg mb-3">
                <div>Telefon: <strong className="text-neutral-800">{form.phone}</strong></div>
                <div>Tempat Tinggal: <strong className="text-neutral-800">{form.livingArea}</strong></div>
                <div>Pengangkutan: <strong className="text-neutral-800">{form.transport}</strong></div>
                <div>Boleh Mula: <strong className="text-neutral-800">{form.availableStartDate}</strong></div>
              </div>

              <div className="text-xs text-neutral-700 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-3">
                <strong>Sebab Keputusan: </strong> {form.decisionReason || 'Tiada catatan'}
              </div>

              <div className="text-[11px] text-neutral-500 flex items-center justify-between">
                <span>Penemuduga: {form.interviewerName} · Tarikh: {form.interviewDate}</span>
                <button
                  onClick={() => {
                    setSelectedCandidate(form);
                    setIsFilling(true);
                  }}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Buka & Sunting Borang Penuh (7 Soalan) →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Doc 2 Subview
const Doc2OnboardingView: React.FC<{ forms: any[]; onOpenPrint: (f: any) => void; onCreateNew: () => void }> = ({ forms, onOpenPrint }) => {
  const [isFilling, setIsFilling] = useState(false);

  if (isFilling) {
    return (
      <OnboardingRules 
        onBack={() => setIsFilling(false)}
        onSaved={() => setIsFilling(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900">
              Checklist Hari Pertama Pekerja
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Tujuan: Memastikan pekerja baru menerima penerangan asas sebelum boss menganggap <em className="text-neutral-800">“benda ni common sense”</em>.
          </p>
        </div>

        <button
          onClick={() => setIsFilling(true)}
          className="px-3.5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Isi Onboarding & Peraturan Kerja</span>
        </button>
      </div>

    {forms.map(form => (
      <div key={form.id} className="border border-neutral-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">{form.employeeName}</h3>
            <span className="text-xs text-neutral-500">{form.position} · Mula: {form.startDate}</span>
          </div>
          <button
            onClick={() => onOpenPrint(form)}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-200 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Dokumen</span>
          </button>
        </div>

        {/* 3 Main Tasks Checklist preview */}
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
          <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide mb-2">
            3 Tugas Utama (Tunjuk Cara & Pekerja Cuba)
          </h4>
          <div className="space-y-2">
            {form.tugasUtama?.map((t: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-neutral-200">
                <span className="font-medium text-neutral-800">{idx + 1}. {t.name}</span>
                <div className="flex items-center gap-3 text-[11px] text-neutral-600">
                  <span className={t.sudahDitunjukkan ? 'text-emerald-700 font-semibold' : 'text-neutral-400'}>
                    {t.sudahDitunjukkan ? '✓ Ditunjukkan cara' : 'Belum ditunjuk'}
                  </span>
                  <span className={t.pekerjaSudahCuba ? 'text-emerald-700 font-semibold' : 'text-neutral-400'}>
                    {t.pekerjaSudahCuba ? '✓ Pekerja sudah cuba' : 'Belum cuba'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Rules Penting */}
        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-2">
            5 Rules Paling Penting Bisnes Ini
          </h4>
          <ul className="text-xs text-neutral-800 space-y-1 pl-4 list-decimal">
            {form.rulesPentingBisnes?.map((r: string, idx: number) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Check in hujung hari */}
        <div className="border border-neutral-200 p-3 rounded-lg text-xs">
          <span className="font-semibold text-neutral-700">Check-in Hujung Hari: </span>
          <span className="italic text-neutral-600">“Apa bahagian hari ini yang masih kurang jelas?” </span>
          <p className="mt-1 font-medium text-neutral-900">{form.checkInHujungHari?.bahagianKurangJelas}</p>
        </div>
      </div>
    ))}
    </div>
  );
};

// Doc 3 Subview
const Doc3RulesView: React.FC<{ rules: any[]; onOpenPrint: (r: any) => void; onCreateNew: () => void }> = ({ rules, onOpenPrint }) => {
  const [isFilling, setIsFilling] = useState(false);

  if (isFilling) {
    return (
      <OnboardingRules 
        onBack={() => setIsFilling(false)}
        onSaved={() => setIsFilling(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900">
              Checklist Peraturan Kerja (Rules)
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Tujuan: Membantu boss mengeluarkan rules daripada kepala dan menjadikannya lebih jelas kepada pekerja.
          </p>
        </div>

        <button
          onClick={() => setIsFilling(true)}
          className="px-3.5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Kemaskini Peraturan Kerja</span>
        </button>
      </div>

    {rules.map(rule => (
      <div key={rule.id} className="border border-neutral-200 rounded-xl p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">{rule.companyName}</h3>
            <span className="text-xs text-neutral-500">Sektor: {rule.businessType}</span>
          </div>
          <button
            onClick={() => onOpenPrint(rule)}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-200 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Checklist Peraturan</span>
          </button>
        </div>

        {/* 6 Rules Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-900 mb-1.5">A. Waktu & Kehadiran</h4>
            <p className="text-neutral-600 leading-relaxed">{rule.waktuKehadiran?.rulesKhusus}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-900 mb-1.5">B. Penggunaan Telefon</h4>
            <p className="text-neutral-600 leading-relaxed">{rule.penggunaanTelefon?.rulesKhusus}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-900 mb-1.5">C. Tugas & Tanggungjawab</h4>
            <p className="text-neutral-600 leading-relaxed">{rule.tugasTanggungjawab?.rulesKhusus}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <h4 className="font-bold text-neutral-900 mb-1.5">D. Sikap & Komunikasi</h4>
            <p className="text-neutral-600 leading-relaxed">{rule.sikapKomunikasi?.rulesKhusus}</p>
          </div>
        </div>

        {/* 6 Langkah Jika Rules Tak Diikut */}
        <div className="bg-neutral-900 text-white p-5 rounded-xl">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-3">
            Bahagian I: Jika Rules Tak Diikut (Jangan Terus Buat Hukuman Spontan!)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            <div className="bg-neutral-800 p-2.5 rounded-lg">
              <span className="font-bold text-amber-400 block mb-1">1. Dapatkan Maklumat</span>
              <span className="text-[11px] text-neutral-300">Apa sebenarnya berlaku?</span>
            </div>
            <div className="bg-neutral-800 p-2.5 rounded-lg">
              <span className="font-bold text-amber-400 block mb-1">2. Dengar Penjelasan</span>
              <span className="text-[11px] text-neutral-300">Fahamkan keadaan dahulu.</span>
            </div>
            <div className="bg-neutral-800 p-2.5 rounded-lg">
              <span className="font-bold text-amber-400 block mb-1">3. Jelaskan Expectation</span>
              <span className="text-[11px] text-neutral-300">Betulkan salah faham.</span>
            </div>
            <div className="bg-neutral-800 p-2.5 rounded-lg">
              <span className="font-bold text-amber-400 block mb-1">4. Rekod</span>
              <span className="text-[11px] text-neutral-300">Catat jika isu berulang.</span>
            </div>
            <div className="bg-neutral-800 p-2.5 rounded-lg">
              <span className="font-bold text-amber-400 block mb-1">5. Pantau</span>
              <span className="text-[11px] text-neutral-300">Lihat perubahan sikap.</span>
            </div>
            <div className="bg-neutral-800 p-2.5 rounded-lg">
              <span className="font-bold text-amber-400 block mb-1">6. Response</span>
              <span className="text-[11px] text-neutral-300">Tindakan ikut fakta kes.</span>
            </div>
          </div>
        </div>
      </div>
    ))}
    </div>
  );
};

// Doc 4 Subview
const Doc4CoachingView: React.FC<{ 
  records: any[]; 
  onOpenPrint: (r: any) => void; 
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}> = ({ records, onOpenPrint, onDelete }) => {
  const [isFilling, setIsFilling] = useState(false);

  if (isFilling) {
    return (
      <RecordIsuPerbincangan 
        onBack={() => setIsFilling(false)}
        onSaved={() => setIsFilling(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900">
              Rekod Teguran & Perbincangan Pekerja
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Tujuan: Digunakan apabila sesuatu isu penting untuk direkodkan supaya boss tidak perlu bergantung kepada: <em className="text-neutral-800">“Aku rasa kita dah pernah bincang”</em>.
          </p>
        </div>

        <button
          onClick={() => setIsFilling(true)}
          className="px-3.5 py-2 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Catat Teguran & Penjelasan</span>
        </button>
      </div>

      {/* Fact vs Label Golden Tip */}
      <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-xs">
        <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900">Panduan Menulis Fakta (Bukan Label):</strong>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
            <div className="bg-white/80 p-2 rounded-lg border border-rose-200">
              <span className="text-rose-700 font-semibold block text-[11px]">Kurang Baik (Label Emosi):</span>
              <span className="text-neutral-700">“Pekerja memang malas dan selalu buat masalah.”</span>
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-emerald-200">
              <span className="text-emerald-700 font-semibold block text-[11px]">Lebih Baik (Fakta Spesifik):</span>
              <span className="text-neutral-700">“Pekerja dijadualkan masuk pukul 9:00 pagi dan direkodkan tiba 9:42 pagi tanpa makluman awal.”</span>
            </div>
          </div>
        </div>
      </div>

      {records.map(rec => (
        <div key={rec.id} className="border border-neutral-200 rounded-xl p-5 space-y-4 hover:border-neutral-300 transition-colors bg-white shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">{rec.employeeName}</h3>
              <span className="text-xs text-neutral-500">
                {rec.position} · Tarikh Perbincangan: {rec.discussionDate} ({rec.discussionTime}) · Lokasi: {rec.location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                rec.followUpStatus === 'selesai'
                  ? 'bg-emerald-50 text-emerald-700'
                  : rec.followUpStatus === 'bertambah_baik'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-amber-50 text-amber-700'
              }`}>
                Status: {rec.followUpStatus?.replace('_', ' ')}
              </span>
              <button
                onClick={() => onOpenPrint(rec)}
                className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded-md border border-neutral-200 cursor-pointer"
                title="Cetak Rekod Teguran"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(rec.id)}
                className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-md cursor-pointer"
                title="Padam"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Fact details */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs space-y-2">
            <div>
              <span className="font-bold text-neutral-900">Apa Yang Berlaku (Fakta): </span>
              <span className="text-neutral-800">{rec.whatHappenedFacts}</span>
            </div>
            {rec.operationalImpact && (
              <div>
                <span className="font-bold text-neutral-700">Kesan Kepada Operasi: </span>
                <span className="text-neutral-600">{rec.operationalImpact}</span>
              </div>
            )}
            <div>
              <span className="font-bold text-neutral-700">Penjelasan Pekerja: </span>
              <span className="text-neutral-600">{rec.employeeExplanation}</span>
            </div>
          </div>

          {/* What Needs to Change */}
          <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-200 text-xs">
            <strong className="text-emerald-950">Apa Yang Perlu Berubah: </strong>
            <span className="text-emerald-900">{rec.whatNeedsToChange}</span>
            <span className="text-emerald-700 block mt-1 text-[11px]">Bermula: {rec.startsFromDate} · Tarikh Follow-Up: {rec.followUpDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Doc 5 Subview
const Doc5ExplanationView: React.FC<{ forms: any[]; onOpenPrint: (f: any) => void; onCreateNew: () => void }> = ({ forms, onOpenPrint }) => {
  const [isFilling, setIsFilling] = useState(false);

  if (isFilling) {
    return (
      <RecordIsuPerbincangan 
        onBack={() => setIsFilling(false)}
        onSaved={() => setIsFilling(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900">
              Borang Penjelasan Pekerja
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Tujuan: Memberi ruang kepada pekerja menjelaskan sesuatu kejadian sebelum boss membuat kesimpulan (Fakta → Penjelasan → Rekod → Keputusan).
          </p>
        </div>

        <button
          onClick={() => setIsFilling(true)}
          className="px-3.5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Borang Penjelasan Baharu</span>
        </button>
      </div>

      {forms.map(form => (
        <div key={form.id} className="border border-neutral-200 rounded-xl p-5 space-y-4 bg-white shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">{form.employeeName}</h3>
              <span className="text-xs text-neutral-500">Tarikh Kejadian: {form.incidentDate}</span>
            </div>
            <button
              onClick={() => onOpenPrint(form)}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-200 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs space-y-2">
            <div>
              <span className="font-bold text-neutral-900">Ringkasan Fakta Oleh Boss: </span>
              <span className="text-neutral-700">{form.bossFactSummary}</span>
            </div>
            <div>
              <span className="font-bold text-neutral-900">Penjelasan Pekerja: </span>
              <span className="text-neutral-700">{form.employeeStatement}</span>
            </div>
            <div>
              <span className="font-bold text-neutral-900">Pelan Pencegahan: </span>
              <span className="text-neutral-700">{form.preventivePlan}</span>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs">
            <strong className="text-amber-900">Tindakan Seterusnya Oleh Boss: </strong>
            <span className="text-amber-800">{form.bossNextAction?.nextStepText}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Doc 6 Subview (Emergency Brake)
const Doc6EmergencyView: React.FC<{ actions: any[]; onOpenPrint: (a: any) => void; onCreateNew: () => void }> = ({ actions, onOpenPrint, onCreateNew }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm">
            DOKUMEN #6
          </span>
          <h2 className="text-base font-bold text-neutral-900">
            Checklist Sebelum Tindakan Serius (Emergency Brake)
          </h2>
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          Tujuan: Emergency brake untuk boss. Gunakan sebelum membuat keputusan besar apabila masalah pekerja sudah serius atau boss sedang sangat marah.
        </p>
      </div>

      <button
        onClick={onCreateNew}
        className="px-3 py-1.5 bg-rose-600 text-white text-xs font-medium rounded-lg hover:bg-rose-700 cursor-pointer"
      >
        + Tarik Brek Kecemasan
      </button>
    </div>

    {actions.map(act => (
      <div key={act.id} className="border border-neutral-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">{act.caseName}</h3>
            <span className="text-xs text-neutral-500">{act.employeeName} ({act.position}) · Tarikh: {act.reviewDate}</span>
          </div>
          <button
            onClick={() => onOpenPrint(act)}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-200 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Tindakan</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <span className="font-bold text-neutral-900 block mb-1">Fakta Disokong:</span>
            <p className="text-neutral-700">{act.step1_factsSupported}</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <span className="font-bold text-amber-900 block mb-1">Emotion Check Boss:</span>
            <p className="text-amber-800 italic">{act.step7_sameDecisionIfGoodMood}</p>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-xs text-rose-950">
          <span className="font-bold block">Keputusan & Langkah Seterusnya:</span>
          <p className="mt-1 font-semibold">{act.step9_nextStep}</p>
          <p className="mt-0.5 text-rose-800 text-[11px]">Sebab: {act.step9_reason}</p>
        </div>
      </div>
    ))}
  </div>
);

// Doc 8 Subview (Capacity Audit)
const Doc8CapacityView: React.FC<{ audits: any[]; onOpenPrint: (a: any) => void; onCreateNew: () => void }> = ({ audits, onOpenPrint, onCreateNew }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-sm">
            DOKUMEN #8
          </span>
          <h2 className="text-base font-bold text-neutral-900">
            Betul-betul Perlu Tambah Pekerja? (Audit Kapasiti)
          </h2>
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          Tujuan: Membantu boss membezakan <em className="text-neutral-800">“Aku memang tak cukup orang”</em> daripada <em className="text-neutral-800">“Sistem aku sebenarnya tak teratur”</em>.
        </p>
      </div>

      <button
        onClick={onCreateNew}
        className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-800 cursor-pointer"
      >
        + Buat Audit Kapasiti Baharu
      </button>
    </div>

    {audits.map(aud => (
      <div key={aud.id} className="border border-neutral-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Masalah: {aud.mainProblemToSolve}</h3>
            <span className="text-xs text-neutral-500">Tarikh Audit: {aud.createdAt}</span>
          </div>
          <button
            onClick={() => onOpenPrint(aud)}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-200 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Audit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div>
            <span className="text-neutral-500 block">Waktu Paling Sibuk:</span>
            <strong className="text-neutral-900">{aud.audit7Days?.busiestDayTime}</strong>
          </div>
          <div>
            <span className="text-neutral-500 block">Waktu Perlahan:</span>
            <strong className="text-neutral-900">{aud.audit7Days?.slowestDayTime}</strong>
          </div>
          <div>
            <span className="text-neutral-500 block">Kekurangan Tenaga Sebenar:</span>
            <strong className="text-purple-700">{aud.audit7Days?.hoursLackingStaff} jam</strong>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-xs text-purple-950">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold">Keputusan Audit:</span>
            <span className="uppercase font-mono font-bold bg-purple-200/80 px-2 py-0.5 rounded-sm">
              {aud.decision?.replace('_', ' ')}
            </span>
          </div>
          <p className="leading-relaxed mt-1">{aud.decisionDetails}</p>
        </div>
      </div>
    ))}
  </div>
);

// ==========================================
// CREATION FORM MODAL (INTERACTIVE INPUT)
// ==========================================
const CreationFormModal: React.FC<{ type: DocumentType; onClose: () => void }> = ({ type, onClose }) => {
  const { 
    saveInterviewForm, 
    saveOnboardingForm, 
    saveWorkRules, 
    saveCoachingRecord, 
    saveExplanationForm, 
    saveSeriousAction, 
    saveCapacityAudit 
  } = useApp();

  // Basic generic state for creation
  const [candidateName, setCandidateName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [position, setPosition] = useState('');
  const [facts, setFacts] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString().split('T')[0];

    if (type === 'doc1_interview') {
      saveInterviewForm({
        id: `iv-${Date.now()}`,
        createdAt: now,
        candidateName: candidateName || 'Calon Temuduga',
        phone: phone || '012-XXXXXXX',
        positionApplied: position || 'Krew Operasi',
        livingArea: 'Kawasan Berdekatan (3km)',
        transport: 'Motosikal sendiri',
        availableStartDate: now,
        previousWorkplace: 'Kedai Terdahulu',
        previousPosition: 'Krew',
        durationWorked: '6 bulan',
        reasonLeaving: 'Mencari suasana kerja berdisiplin',
        questions: [
          { id: 1, question: 'Kenapa anda nak kerja di sini?', candidateAnswer: 'Minat dalam bidang servis dan waktu kerja bersesuaian.', bossNote: 'Jawapan memuaskan.' },
          { id: 2, question: 'Ada komitmen yang mungkin ganggu jadual kerja?', candidateAnswer: 'Tiada komitmen luar.', bossNote: 'Jadual fleksibel.' },
          { id: 3, question: 'Kalau shift bermula pukul 9 pagi, pukul berapa sampai?', candidateAnswer: '8:45 pagi sedia di kaunter.', bossNote: 'Faham ketepatan masa.' },
          { id: 4, question: 'Kalau tak boleh datang, apa anda akan buat?', candidateAnswer: 'Maklum sekurang-kurangnya 3 jam awal.', bossNote: 'Bagus.' },
          { id: 5, question: 'Kalau tak tahu buat sesuatu tugas?', candidateAnswer: 'Tanya penyelia terus.', bossNote: 'Tidak buat andaian sendiri.' },
          { id: 6, question: 'Kalau boss tegur kerja anda?', candidateAnswer: 'Dengar dan perbaiki segera.', bossNote: 'Terbuka.' },
          { id: 7, question: 'Berapa lama merancang untuk bekerja?', candidateAnswer: '1 tahun ke atas.', bossNote: 'Komitmen kukuh.' }
        ],
        briefingChecklist: {
          waktuShift: true, hariBekerja: true, hariRehat: true, tugasUtama: true,
          kadarBayaran: true, kitaranBayaran: true, expectationKetepatanMasa: true,
          caraMaklumkanKetidakhadiran: true, caraMintaCuti: true, penggunaanTelefon: true,
          rulesPenting: true, bahagianKerjaMencabar: true
        },
        lastQuestionAnswer: 'Calon jelas dengan penerangan yang diberikan.',
        evaluation: { ketepatanMasa: 'baik', komunikasi: 'baik', kesesuaianJadual: 'baik', sikapArahan: 'baik', komitmen: 'baik' },
        additionalNotes: notes || 'Calon berdisiplin dan sedia bekerja.',
        decision: 'pertimbangkan',
        decisionReason: 'Sikap baik dan menepati kriteria.',
        interviewerName: 'Boss Bertugas',
        interviewDate: now
      });
    } else if (type === 'doc4_coaching') {
      saveCoachingRecord({
        id: `coach-${Date.now()}`,
        createdAt: now,
        employeeName: employeeName || 'Nama Staf',
        position: position || 'Krew',
        discussionDate: now,
        discussionTime: '15:00',
        location: 'Pejabat Operasi',
        supervisorName: 'Boss / Penyelia',
        issueTypes: ['Kehadiran', 'Prestasi kerja'],
        whatHappenedFacts: facts || 'Catatan fakta kejadian tanpa sebarang label emosi.',
        relatedRecords: ['Rekod kehadiran', 'Jadual kerja'],
        recordNotes: 'Rekod disemak bersama staf.',
        whatWasDiscussed: 'Membincangkan kepentingan ketepatan masa & komitmen pasukan.',
        operationalImpact: 'Mempengaruhi kelancaran syif rakan sekerja.',
        employeeExplanation: 'Pekerja mendengar dan memberi penjelasan.',
        whatNeedsToChange: 'Perlu tiba 10 minit sebelum syif bermula.',
        startsFromDate: now,
        followUpActions: ['Jelaskan semula rules', 'Pantau'],
        followUpDate: now,
        followUpStatus: 'masih_dipantau',
        followUpNotes: 'Akan disemak semula dalam tempoh seminggu.',
        acknowledgedByEmployee: true,
        acknowledgedBySupervisor: true
      });
    } else if (type === 'doc6_emergency') {
      saveSeriousAction({
        id: `action-${Date.now()}`,
        createdAt: now,
        employeeName: employeeName || 'Nama Staf',
        position: position || 'Krew Operasi',
        caseName: 'Semakan Isu Disiplin / Prestasi Kritikal',
        reviewDate: now,
        issue: 'Kelewatan berulang dan ketidakpatuhan SOP',
        step1_factsSupported: facts || 'Fakta kejadian telah dikumpulkan daripada rekod operasi.',
        step1_assumptionsUnconfirmed: 'Tiada andaian tanpa bukti.',
        step2_expectationExplained: 'ya',
        step2_howExplained: ['Checklist Hari Pertama', 'Penerangan bersemuka'],
        step2_notes: 'Pekerja telah dimaklumkan standard kerja.',
        step3_recordsAvailable: ['WhatsApp', 'Rekod kehadiran'],
        step3_whatRecordsShow: 'Rekod menunjukkan pola ketidakhadiran.',
        step4_givenChanceToExplain: 'ya',
        step4_explanationSummary: 'Pekerja telah diberi ruang menjelaskan situasi.',
        step4_whatStillNeedsCheck: 'Semakan rekod sokongan selesai.',
        step5_frequency: 'berulang',
        step6_canBeFixedReasons: ['Sediakan jadual lebih jelas'],
        step6_notes: 'Peluang bimbingan telah ditawarkan.',
        step7_emotionCheckReasons: ['Bertenang sebelum buat keputusan', 'Fokus pada standard operasi'],
        step7_sameDecisionIfGoodMood: 'Keputusan dibuat dengan tenang dan objektif.',
        step8_preActionReview: {
          tahuFaktaUtama: true,
          asingkanFaktaAndaian: true,
          semakRekod: true,
          ruangPenjelasanDiberi: true,
          semakSejarahKes: true,
          expectationJelas: true,
          tidakSemataMataMarah: true,
          semakPolisiUndangUndang: true,
          dapatPandanganProfesional: false
        },
        step9_nextStep: notes || 'Surat Amaran Bertulis Rasmi & Pemantauan Ketat',
        step9_reason: 'Tindakan susulan demi kelancaran standard perniagaan.',
        actionReviewDate: now
      });
    } else if (type === 'doc8_capacity') {
      saveCapacityAudit({
        id: `cap-${Date.now()}`,
        createdAt: now,
        reasonsThoughtNeeded: ['Boss penat', 'Waktu puncak sesak'],
        mainProblemToSolve: notes || facts || 'Kesesakan aliran operasi pada waktu puncak',
        audit7Days: {
          busiestDayTime: 'Jumaat - Ahad (6:00 PM - 9:30 PM)',
          slowestDayTime: 'Isnin - Rabu (2:00 PM - 5:00 PM)',
          hoursLackingStaff: 8,
          issueTiming: 'waktu_tertentu',
          isBottleneckTwoHoursVsEightHours: true
        },
        taskDelegation: {
          allKnowRolesDuringRush: 'tidak_pasti',
          bottleneckTask: 'Penyediaan pesanan',
          whoDoesItNow: 'Boss & Barista',
          twoPeopleDoingSameThing: true,
          whoResponsiblePeakHour: 'Krew Utama'
        },
        bossDailyTasks: [
          { task: 'Susun stok', doneBy: 'PEKERJA' },
          { task: 'Jaga kaunter waktu puncak', doneBy: 'BOSS' }
        ],
        systemIssuesChecked: ['Susun atur stesen kerja'],
        overburdenSigns: ['Krew letih waktu peak'],
        alternativeTrial: {
          testedActions: ['Susun semula syif peak'],
          whatWillBeTested: 'Tambah krew part-time 3 jam hujung minggu',
          testPeriod: '2 minggu',
          fromDate: now,
          toDate: now,
          reviewDate: now
        },
        ifMustHire: {
          threeMainTasks: ['Ambil pesanan', 'Bancuh minuman', 'Cuci perkakas'],
          daysNeeded: 'Jumaat - Ahad',
          hoursNeeded: '4 jam sehari',
          peakHour: '6pm - 10pm',
          needType: 'Part-time',
          monthlyCommitmentRM: 600,
          expectedOutcome: 'Masa menunggu pelanggan bawah 5 minit'
        },
        fiveQuestions: {
          tahuMasalahSebenar: true,
          tahuTigaTugasUtama: true,
          tahuHariWaktuKekurangan: true,
          cubaKemaskanProses: true,
          bisnesMampuKomitmen: true
        },
        decision: 'mungkin_uji_sistem',
        decisionDetails: notes || 'Uji sistem 2 minggu dengan pengagihan syif fleksi sebelum menambah komitmen kos tetap.'
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-neutral-200">
        <h3 className="text-base font-bold text-neutral-900 mb-1">
          Daftar Rekod Baharu ({type.toUpperCase()})
        </h3>
        <p className="text-xs text-neutral-500 mb-4">
          Isi maklumat asas dokumen untuk disimpan ke dalam sistem operasi AKULAH BOS.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-neutral-700 block mb-1">Nama Individu / Pekerja</label>
            <input
              type="text"
              required
              value={type === 'doc1_interview' ? candidateName : employeeName}
              onChange={(e) => type === 'doc1_interview' ? setCandidateName(e.target.value) : setEmployeeName(e.target.value)}
              placeholder="Contoh: Ahmad Faiz"
              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="font-semibold text-neutral-700 block mb-1">Jawatan / Peranan</label>
            <input
              type="text"
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Contoh: Barista / Krew Dapur"
              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {type === 'doc1_interview' && (
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">No. Telefon Calon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="012-XXXXXXX"
                className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
              />
            </div>
          )}

          <div>
            <label className="font-semibold text-neutral-700 block mb-1">
              {type === 'doc4_coaching' ? 'Fakta Kejadian (Tulis fakta, elakkan label!)' : 'Nota Tambahan'}
            </label>
            <textarea
              rows={3}
              value={type === 'doc4_coaching' ? facts : notes}
              onChange={(e) => type === 'doc4_coaching' ? setFacts(e.target.value) : setNotes(e.target.value)}
              placeholder={type === 'doc4_coaching' ? 'Contoh: Dijadualkan 9:00 pagi dan tiba 9:42 pagi...' : 'Catatan tambahan...'}
              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-50 cursor-pointer font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer font-medium"
            >
              Simpan Rekod
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
