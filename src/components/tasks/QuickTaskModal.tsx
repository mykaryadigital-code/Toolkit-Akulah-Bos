import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskCategory, TaskPriority, TaskStatus } from '../../types';
import { X, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

interface QuickTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickTaskModal: React.FC<QuickTaskModalProps> = ({ isOpen, onClose }) => {
  const { teamMembers, addTask } = useApp();

  // Top 3 primary fields
  const [title, setTitle] = useState('');
  const [assignedToId, setAssignedToId] = useState(''); // Do NOT auto-select!
  const [shiftTime, setShiftTime] = useState('08:30 Pagi (Syif Pembukaan)');

  // Collapsible detailed fields
  const [showDetails, setShowDetails] = useState(false);
  const [category, setCategory] = useState<TaskCategory>('peak_hour');
  const [priority, setPriority] = useState<TaskPriority>('sederhana');
  const [description, setDescription] = useState('');
  const [sopStandard, setSopStandard] = useState('');
  const [isBottleneck, setIsBottleneck] = useState(false);
  const [estimatedHours, setEstimatedHours] = useState('1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignedMember = teamMembers.find(m => m.id === assignedToId);

    addTask({
      title: title.trim(),
      description: description.trim() || 'Tugasan operasi syif pasukan.',
      assignedToId: assignedToId || '',
      assignedToName: assignedMember ? assignedMember.name : 'Belum Ditugaskan',
      category,
      priority,
      status: 'todo',
      shift: shiftTime.trim() || 'Syif Harian',
      estimatedHours: parseFloat(estimatedHours) || 1,
      dueDate: new Date().toISOString().split('T')[0],
      isBottleneck,
      sopStandard: sopStandard.trim() || undefined
    });

    // Reset fields
    setTitle('');
    setAssignedToId('');
    setShiftTime('08:30 Pagi (Syif Pembukaan)');
    setDescription('');
    setSopStandard('');
    setIsBottleneck(false);
    setShowDetails(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Tambah Tugasan Pasukan
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Isi maklumat asas dahulu untuk agihan pantas
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Nama Tugasan */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              1. Nama Tugasan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="cth: Kalibrasi mesin & buka kaunter"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-base bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
            />
          </div>

          {/* 2. Pilih Staf (Jangan pilih automatik) */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              2. Pilih Staf Penanggungjawab (PIC)
            </label>
            <select
              value={assignedToId}
              onChange={(e) => setAssignedToId(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-base bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900 cursor-pointer"
            >
              <option value="">Pilih staf (pilihan)...</option>
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role}) — {m.shift}
                </option>
              ))}
            </select>
            <span className="text-xs text-slate-500 mt-1 block">
              Boleh dibiarkan kosong jika belum diagihkan kepada individu khusus.
            </span>
          </div>

          {/* 3. Waktu / Masa Siap */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              3. Waktu / Syif Pelaksanaan
            </label>
            <input
              type="text"
              value={shiftTime}
              onChange={(e) => setShiftTime(e.target.value)}
              placeholder="cth: 08:30 Pagi / Syif Pembukaan / Waktu Puncak"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-base bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
            />
          </div>

          {/* Collapsible: Butiran Lanjut */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full min-h-[44px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Butiran Lanjut (Kategori, Keutamaan, SOP & Catatan)</span>
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDetails && (
              <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3.5 animate-in fade-in duration-150 text-sm">
                
                {/* Kategori & Keutamaan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori Tugasan</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TaskCategory)}
                      className="w-full min-h-[44px] px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                    >
                      <option value="opening">Pembukaan (Opening SOP)</option>
                      <option value="peak_hour">Waktu Puncak (Peak Hour)</option>
                      <option value="closing">Penutupan (Closing SOP)</option>
                      <option value="operasi">Operasi Rutin</option>
                      <option value="kebersihan">Kebersihan & Peralatan</option>
                      <option value="latihan">Latihan & Bimbingan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tahap Keutamaan</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as TaskPriority)}
                      className="w-full min-h-[44px] px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                    >
                      <option value="rendah">Biasa (Rendah)</option>
                      <option value="sederhana">Sederhana</option>
                      <option value="tinggi">Segera (Tinggi)</option>
                    </select>
                  </div>
                </div>

                {/* Anggaran Masa */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Anggaran Masa (Jam)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                    className="w-full min-h-[44px] px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                  />
                </div>

                {/* Bottleneck Flag */}
                <label className="flex items-center gap-2.5 p-2 bg-amber-50/70 border border-amber-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBottleneck}
                    onChange={(e) => setIsBottleneck(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-amber-900 block">Tandakan sebagai Titik Bottleneck Operasi</span>
                    <span className="text-amber-700 text-[11px]">Tugasan yang berisiko memperlahankan kelancaran syif jika lewat</span>
                  </div>
                </label>

                {/* SOP Standard */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Standard SOP / Kriteria Siap</label>
                  <textarea
                    rows={2}
                    value={sopStandard}
                    onChange={(e) => setSopStandard(e.target.value)}
                    placeholder="cth: Suhu chiller di bawah 4°C, meja sanitasi sebelum 8:45 pagi"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                  />
                </div>

                {/* Penerangan */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan / Penerangan Tambahan</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Perincian tugas jika diperlukan..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800"
                  />
                </div>

              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-base cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-6 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Simpan Tugasan
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
