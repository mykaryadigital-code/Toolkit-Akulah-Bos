import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Task, 
  TaskCategory, 
  TaskPriority, 
  TaskStatus 
} from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  List, 
  Columns3, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface TaskManagerProps {
  onOpenCreateModal: () => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({ onOpenCreateModal }) => {
  const { 
    tasks, 
    teamMembers, 
    setTaskStatus, 
    deleteTask, 
    updateTask 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.assignedToName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesStaff = selectedStaff === 'all' || task.assignedToId === selectedStaff;
    return matchesSearch && matchesCategory && matchesStaff;
  });

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Semua Tugasan' },
    { id: 'opening', label: 'Pembukaan (Opening SOP)' },
    { id: 'peak_hour', label: 'Waktu Puncak (Peak Hour)' },
    { id: 'closing', label: 'Penutupan (Closing SOP)' },
    { id: 'operasi', label: 'Operasi Rutin' },
    { id: 'kebersihan', label: 'Kebersihan & Peralatan' }
  ];

  const columns: { id: TaskStatus; label: string; icon: React.ReactNode }[] = [
    { id: 'todo', label: 'Belum Mula', icon: <Clock className="w-3.5 h-3.5 text-neutral-400" /> },
    { id: 'in_progress', label: 'Sedang Berjalan', icon: <Clock className="w-3.5 h-3.5 text-blue-500" /> },
    { id: 'review', label: 'Perlu Semakan', icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'completed', label: 'Telah Siap', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header with Title and Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Pengurusan Tugasan & SOP Pasukan
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Pastikan setiap stesen ada PIC yang jelas dan tiada kekeliruan ketika waktu puncak.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-lg border border-neutral-200/80">
            <button
              onClick={() => setViewMode('board')}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'board' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
              title="Paparan Papan Kanban"
            >
              <Columns3 className="w-4 h-4" />
              <span className="hidden sm:inline">Papan</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
              title="Paparan Senarai"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Senarai</span>
            </button>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tugasan Baharu</span>
          </button>
        </div>
      </div>

      {/* Boss Quote Card on Bottlenecks */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="flex-1">
          <strong className="text-amber-900 font-semibold">Petua Boss untuk Aliran Tugas:</strong>
          <span className="text-amber-800 ml-1">
            “Siapa bertanggungjawab untuk apa ketika peak hour? Kalau jawapannya: semua orang buat semua... kemaskan flow dahulu sebelum salahkan pekerja lambat.”
          </span>
          <span className="text-neutral-500 text-[11px] block mt-1">
            — Rujukan Dokumen #8 (Audit Kapasiti & Bottleneck)
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tugasan, SOP, atau nama staf..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900 transition-colors"
            />
          </div>

          {/* Filter by Staff */}
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-neutral-400" />
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="text-xs bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-neutral-900 text-neutral-700"
            >
              <option value="all">Semua Staf Penanggungjawab</option>
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
              ))}
            </select>
          </div>

        </div>

        {/* Category Pills (Interactive Filter Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main View Area: Board vs List */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {columns.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.id);
            return (
              <div key={col.id} className="bg-neutral-100/70 rounded-xl p-3 border border-neutral-200/80 flex flex-col min-h-[420px]">
                
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-200/80">
                  <div className="flex items-center gap-1.5">
                    {col.icon}
                    <h3 className="text-xs font-bold text-neutral-800">{col.label}</h3>
                  </div>
                  <span className="text-xs font-semibold text-neutral-500 tabular-nums">
                    {colTasks.length}
                  </span>
                </div>

                {/* Task Cards in Column */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {colTasks.length === 0 ? (
                    <div className="h-28 flex flex-col items-center justify-center text-center p-3 text-neutral-400 border border-dashed border-neutral-200 rounded-lg">
                      <span className="text-xs">Tiada tugasan</span>
                    </div>
                  ) : (
                    colTasks.map(task => (
                      <div 
                        key={task.id}
                        className="bg-white rounded-xl p-3.5 border border-neutral-200/90 shadow-2xs hover:shadow-xs transition-shadow space-y-2 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                            {task.title}
                          </h4>
                          {task.isBottleneck && (
                            <span 
                              title="Tugasan ini dikenal pasti sebagai titik bottleneck operasi!"
                              className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded-sm border border-amber-300 shrink-0"
                            >
                              Bottleneck
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>

                        {task.sopStandard && (
                          <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-100 text-[10px] text-neutral-600">
                            <span className="font-semibold text-neutral-700">Standard SOP: </span>
                            <span>{task.sopStandard}</span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-neutral-800 text-white text-[10px] flex items-center justify-center font-bold">
                              {task.assignedToName.charAt(0)}
                            </div>
                            <span className="text-neutral-700 font-medium truncate max-w-[90px]">
                              {task.assignedToName}
                            </span>
                          </div>

                          <span className="text-neutral-500 tabular-nums">
                            {task.estimatedHours} jam
                          </span>
                        </div>

                        {/* Interactive Status Changer & Actions */}
                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                          <select
                            value={task.status}
                            onChange={(e) => setTaskStatus(task.id, e.target.value as TaskStatus)}
                            className="text-[11px] font-medium bg-neutral-50 border border-neutral-200 rounded-md px-1.5 py-0.5 text-neutral-700 focus:outline-hidden"
                          >
                            <option value="todo">Belum Mula</option>
                            <option value="in_progress">Sedang Jalan</option>
                            <option value="review">Perlu Semak</option>
                            <option value="completed">Siap</option>
                          </select>

                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                            <button
                              onClick={() => setEditingTask(task)}
                              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md cursor-pointer"
                              title="Sunting Tugasan"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-1 text-neutral-400 hover:text-rose-600 rounded-md cursor-pointer"
                              title="Padam Tugasan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode View (Dense tabular display) */
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
                <tr>
                  <th className="py-3 px-4 w-10">Status</th>
                  <th className="py-3 px-4">Tugasan & Penerangan</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Penanggungjawab (PIC)</th>
                  <th className="py-3 px-4">Syif Operasi</th>
                  <th className="py-3 px-4 text-right">Anggaran Masa</th>
                  <th className="py-3 px-4 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-neutral-400">
                      Tiada tugasan dijumpai mengikut kriteria carian.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map(task => (
                    <tr key={task.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setTaskStatus(task.id, task.status === 'completed' ? 'todo' : 'completed')}
                          className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                            task.status === 'completed'
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-neutral-300 hover:border-neutral-400 bg-white'
                          }`}
                        >
                          {task.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                      <td className="py-3 px-4 max-w-md">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${task.status === 'completed' ? 'line-through text-neutral-400' : 'text-neutral-900'}`}>
                            {task.title}
                          </span>
                          {task.isBottleneck && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-sm border border-amber-200">
                              Bottleneck
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                          {task.description}
                        </p>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="capitalize text-neutral-700">
                          {task.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-medium text-neutral-900">
                        {task.assignedToName}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-neutral-500">
                        {task.shift}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-neutral-700">
                        {task.estimatedHours} j
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditingTask(task)}
                            className="text-neutral-500 hover:text-neutral-900 p-1 cursor-pointer"
                            title="Sunting"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                            title="Padam"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-100">
            <h3 className="text-base font-bold text-neutral-900 mb-4">
              Kemaskini Tugasan & SOP
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              updateTask(editingTask.id, editingTask);
              setEditingTask(null);
            }} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Tajuk Tugasan</label>
                <input
                  type="text"
                  required
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Penerangan Ringkas</label>
                <textarea
                  rows={2}
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Standard Kerja / Kriteria Selesai</label>
                <input
                  type="text"
                  value={editingTask.sopStandard || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, sopStandard: e.target.value })}
                  placeholder="Contoh: Meja siap dibersihkan dalam 90 saat..."
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Penanggungjawab (PIC)</label>
                  <select
                    value={editingTask.assignedToId}
                    onChange={(e) => {
                      const member = teamMembers.find(m => m.id === e.target.value);
                      setEditingTask({
                        ...editingTask,
                        assignedToId: e.target.value,
                        assignedToName: member ? member.name : ''
                      });
                    }}
                    className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                  >
                    {teamMembers.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Kategori</label>
                  <select
                    value={editingTask.category}
                    onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value as TaskCategory })}
                    className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                  >
                    <option value="opening">Pembukaan (Opening)</option>
                    <option value="peak_hour">Waktu Puncak (Peak Hour)</option>
                    <option value="closing">Penutupan (Closing)</option>
                    <option value="operasi">Operasi Rutin</option>
                    <option value="kebersihan">Kebersihan & Peralatan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Status</label>
                  <select
                    value={editingTask.status}
                    onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value as TaskStatus })}
                    className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                  >
                    <option value="todo">Belum Mula</option>
                    <option value="in_progress">Sedang Berjalan</option>
                    <option value="review">Perlu Semakan</option>
                    <option value="completed">Telah Siap</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Anggaran Masa (Jam)</label>
                  <input
                    type="number"
                    step="0.25"
                    value={editingTask.estimatedHours}
                    onChange={(e) => setEditingTask({ ...editingTask, estimatedHours: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="bottleneckCheck"
                  checked={editingTask.isBottleneck}
                  onChange={(e) => setEditingTask({ ...editingTask, isBottleneck: e.target.checked })}
                  className="rounded border-neutral-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="bottleneckCheck" className="font-medium text-neutral-800">
                  Tandakan sebagai Titik Bottleneck Operasi (Perlu perhatian ketika peak hour)
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-50 cursor-pointer font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer font-medium"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
