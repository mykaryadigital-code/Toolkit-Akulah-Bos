import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskCategory, TaskPriority, TaskStatus } from '../../types';
import { X, Sparkles } from 'lucide-react';

interface QuickTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickTaskModal: React.FC<QuickTaskModalProps> = ({ isOpen, onClose }) => {
  const { teamMembers, addTask } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedToId, setAssignedToId] = useState(teamMembers[0]?.id || '');
  const [category, setCategory] = useState<TaskCategory>('peak_hour');
  const [priority, setPriority] = useState<TaskPriority>('tinggi');
  const [shift, setShift] = useState('Syif Puncak (11:30 - 14:00)');
  const [estimatedHours, setEstimatedHours] = useState('1.5');
  const [sopStandard, setSopStandard] = useState('');
  const [isBottleneck, setIsBottleneck] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignedMember = teamMembers.find(m => m.id === assignedToId);

    addTask({
      title: title.trim(),
      description: description.trim() || 'Tugasan operasi pasukan.',
      assignedToId: assignedToId || (teamMembers[0]?.id ?? ''),
      assignedToName: assignedMember ? assignedMember.name : (teamMembers[0]?.name ?? 'Staf Bertugas'),
      category,
      priority,
      status: 'todo',
      shift,
      estimatedHours: parseFloat(estimatedHours) || 1,
      dueDate: new Date().toISOString().split('T')[0],
      isBottleneck,
      sopStandard: sopStandard.trim() || undefined
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setSopStandard('');
    setIsBottleneck(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-100">
        
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Tambah Tugasan & SOP Pasukan
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Tetapkan standard kerja dan PIC dengan jelas tanpa andaian.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-neutral-700 block mb-1">
              Tajuk Tugasan / Aktiviti <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Prep Bahan Peak Hour Lunch / Opening SOP"
              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="font-semibold text-neutral-700 block mb-1">Penerangan Ringkas</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Perincian langkah dan perkara yang perlu disiapkan..."
              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="font-semibold text-neutral-700 block mb-1">Standard SOP Kerja (Hasil Yang Diharapkan)</label>
            <input
              type="text"
              value={sopStandard}
              onChange={(e) => setSopStandard(e.target.value)}
              placeholder="Contoh: Kaunter bersih, bahan berlabel tarikh sedia sebelum 11:30 pagi."
              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Penanggungjawab (PIC)</label>
              <select
                value={assignedToId}
                onChange={(e) => setAssignedToId(e.target.value)}
                className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden text-neutral-800"
              >
                {teamMembers.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Kategori Tugasan</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden text-neutral-800"
              >
                <option value="opening">Pembukaan (Opening SOP)</option>
                <option value="peak_hour">Waktu Puncak (Peak Hour)</option>
                <option value="closing">Penutupan (Closing SOP)</option>
                <option value="operasi">Operasi Rutin</option>
                <option value="kebersihan">Kebersihan & Peralatan</option>
                <option value="latihan">Latihan Staf</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Syif / Waktu Pelaksanaan</label>
              <input
                type="text"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                placeholder="Contoh: Syif Pagi (08:00 - 16:00)"
                className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden text-neutral-800"
              />
            </div>

            <div>
              <label className="font-semibold text-neutral-700 block mb-1">Anggaran Masa (Jam)</label>
              <input
                type="number"
                step="0.25"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
                className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden text-neutral-800 font-mono"
              />
            </div>
          </div>

          {/* Bottleneck Flag */}
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="quickBottleneck"
              checked={isBottleneck}
              onChange={(e) => setIsBottleneck(e.target.checked)}
              className="mt-0.5 rounded border-neutral-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="quickBottleneck" className="text-neutral-800 cursor-pointer">
              <strong className="text-amber-950 font-semibold block">Tandakan sebagai Titik Bottleneck Operasi</strong>
              <span className="text-neutral-600 text-[11px] block mt-0.5">
                Gunakan jika tugasan ini kerap menyebabkan kesesakan atau waktu menunggu pelanggan panjang jika lewat.
              </span>
            </label>
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
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
              Simpan Tugasan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
