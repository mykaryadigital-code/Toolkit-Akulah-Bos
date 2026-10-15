import React from 'react';

interface AppDashboardProps {
  onNavigate: (route: 'interview' | 'onboarding' | 'record' | 'response' | string) => void;
}

export default function AppDashboard({ onNavigate }: AppDashboardProps) {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl shadow-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AKULAH BOSS™ Toolkit</h1>
            <p className="text-slate-300 text-sm mt-1">
              Urus pekerja dengan sistem. Bukan dengan ingatan dan emosi.
            </p>
          </div>
          <span className="self-start sm:self-center bg-blue-600 px-3 py-1 rounded-full text-white font-semibold text-xs tracking-wide">
            3R System
          </span>
        </div>

        <div className="mt-4 p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Formula Asas: <strong className="text-white">Fakta → Dengar → Expectation → Next Step</strong></span>
          <span className="text-amber-400 font-medium">Rules · Record · Response</span>
        </div>
      </div>

      {/* Navigasi / Modul Utama */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Pilih Modul / Situasi</h2>
        <span className="text-xs text-slate-500">Pilih situasi operasi untuk tindakan pantas</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        
        {/* Kad 1: Nak Interview */}
        <div 
          onClick={() => onNavigate('interview')}
          className="bg-white p-5 rounded-xl shadow-xs border border-slate-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">
              Borang Temuduga Ringkas
            </h3>
            <span className="text-xs text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">
              Buka Modul →
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            7 Soalan interview konsisten supaya keputusan tidak dibuat atas dasar "nampak okay" sahaja.
          </p>
        </div>

        {/* Kad 2: Onboarding & Rules */}
        <div 
          onClick={() => onNavigate('onboarding')}
          className="bg-white p-5 rounded-xl shadow-xs border border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-600 transition-colors">
              Onboarding & Peraturan Kerja
            </h3>
            <span className="text-xs text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
              Buka Modul →
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Checklist hari pertama pekerja dan tetapan rules jelas sebelum masalah berlaku.
          </p>
        </div>

        {/* Kad 3: Rekod Perbincangan */}
        <div 
          onClick={() => onNavigate('record')}
          className="bg-white p-5 rounded-xl shadow-xs border border-slate-200 hover:border-amber-500 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base group-hover:text-amber-600 transition-colors">
              Rekod Teguran & Penjelasan
            </h3>
            <span className="text-xs text-slate-400 group-hover:text-amber-600 transition-colors shrink-0">
              Buka Modul →
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Catat fakta kejadian, dengar penjelasan pekerja, dan tetapkan tarikh follow-up.
          </p>
        </div>

        {/* Kad 4: Bank Ayat & Tindakan Serius */}
        <div 
          onClick={() => onNavigate('response')}
          className="bg-white p-5 rounded-xl shadow-xs border border-slate-200 hover:border-purple-500 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base group-hover:text-purple-600 transition-colors">
              Bank Ayat & Brek Kecemasan
            </h3>
            <span className="text-xs text-slate-400 group-hover:text-purple-600 transition-colors shrink-0">
              Buka Modul →
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Skrip mesej siap guna dan checklist sebelum ambil tindakan disiplin berat.
          </p>
        </div>

      </div>
    </div>
  );
}
