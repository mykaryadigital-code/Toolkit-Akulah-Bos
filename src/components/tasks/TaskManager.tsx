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
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  List, 
  Columns3, 
  ChevronDown, 
  ChevronUp, 
  X, 
  UserCheck, 
  Sparkles,
  Layers
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
    updateTask,
    addTask
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<string>('all');

  // Requirement 4: Jadikan paparan senarai sebagai tetapan awal pada telefon
  const [viewMode, setViewMode] = useState<'board' | 'list'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'list';
    }
    return 'board';
  });

  // State for previewing full task details and SOP on card click
  const [previewTask, setPreviewTask] = useState<Task | null>(null);

  // State for editing task
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
    { id: 'opening', label: 'Pembukaan (Opening)' },
    { id: 'peak_hour', label: 'Waktu Puncak (Peak)' },
    { id: 'closing', label: 'Penutupan (Closing)' },
    { id: 'operasi', label: 'Operasi Rutin' },
    { id: 'kebersihan', label: 'Kebersihan' }
  ];

  const columns: { id: TaskStatus; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'todo', label: 'Belum Mula', icon: <Clock className="w-4 h-4 text-slate-400" />, color: 'border-slate-300' },
    { id: 'in_progress', label: 'Dalam Proses', icon: <Clock className="w-4 h-4 text-blue-500" />, color: 'border-blue-400' },
    { id: 'review', label: 'Perlu Semakan', icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, color: 'border-amber-400' },
    { id: 'completed', label: 'Selesai', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, color: 'border-emerald-400' }
  ];

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">Selesai</span>;
      case 'in_progress':
        return <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">Dalam Proses</span>;
      case 'review':
        return <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900">Perlu Semakan</span>;
      case 'todo':
      default:
        return <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">Belum Mula</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Pengurusan Tugasan & SOP
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Agihan tugas syif, penanggungjawab (PIC), dan pemantauan standard operasi
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={`min-h-[40px] px-3 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Paparan Senarai"
            >
              <List className="w-4 h-4" />
              <span>Senarai</span>
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`min-h-[40px] px-3 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'board' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Paparan Papan Kanban"
            >
              <Columns3 className="w-4 h-4" />
              <span>Papan</span>
            </button>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="min-h-[44px] px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>+ Tugasan Baharu</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tugasan, SOP, atau nama staf..."
              className="w-full min-h-[44px] pl-11 pr-3 py-2 text-base bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
            />
          </div>

          {/* Filter by Staff */}
          <div className="w-full sm:w-64">
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-base bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900 cursor-pointer"
            >
              <option value="all">Semua Staf (PIC)</option>
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
              ))}
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'board' ? (
        /* Board Kanban View with Simplified Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {columns.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.id);
            return (
              <div 
                key={col.id} 
                className="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200 flex flex-col min-h-[400px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    {col.icon}
                    <h3 className="text-sm font-bold text-slate-900">{col.label}</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 tabular-nums">
                    {colTasks.length}
                  </span>
                </div>

                {/* Simplified Task Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.length === 0 ? (
                    <div className="h-28 flex flex-col items-center justify-center text-center p-3 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                      <span className="text-xs">Tiada tugasan</span>
                    </div>
                  ) : (
                    colTasks.map(task => (
                      <div
                        key={task.id}
                        onClick={() => setPreviewTask(task)}
                        className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer space-y-2.5 group"
                      >
                        {/* Requirement 4: Ringkaskan kad tugasan kepada tajuk, staf, waktu dan status */}
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                            {task.title}
                          </h4>
                          {task.isBottleneck && (
                            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 shrink-0">
                              Bottleneck
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-600 pt-1 border-t border-slate-100">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                              {task.assignedToName.charAt(0)}
                            </div>
                            <span className="font-semibold text-slate-800 truncate">
                              {task.assignedToName}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                          <span>{task.shift}</span>
                          {getStatusBadge(task.status)}
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
        /* List Mode View (Simplified, responsive, no horizontal scroll) */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <p className="text-base">Tiada tugasan ditemui mengikut tapisan semasa.</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => setPreviewTask(task)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                        {task.title}
                      </h4>
                      {task.isBottleneck && (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                          Bottleneck
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-slate-500 flex-wrap">
                      <span className="font-semibold text-slate-800">Staf: {task.assignedToName}</span>
                      <span aria-hidden="true">·</span>
                      <span>Waktu: {task.shift}</span>
                      {task.estimatedHours && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{task.estimatedHours} jam</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {getStatusBadge(task.status)}
                    <span className="text-slate-400 text-sm hidden sm:inline group-hover:text-slate-700">
                      Tekan untuk SOP →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Task Preview & SOP Modal (Requirement 4: Buka penerangan serta SOP apabila kad ditekan) */}
      {previewTask && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="min-w-0 flex-1 pr-2">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {getStatusBadge(previewTask.status)}
                  {previewTask.isBottleneck && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      Titik Bottleneck Operasi
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {previewTask.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewTask(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">Penanggungjawab (PIC):</span>
                  <strong className="text-base text-slate-900">{previewTask.assignedToName}</strong>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">Waktu / Syif:</span>
                  <strong className="text-base text-slate-900">{previewTask.shift}</strong>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Penerangan Tugasan:
                </span>
                <p className="text-base text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {previewTask.description || 'Tiada penerangan perincian.'}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                  Standard SOP & Langkah Kerja:
                </span>
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-base text-amber-950 font-medium leading-relaxed">
                  {previewTask.sopStandard || 'Tiada SOP khusus. Laksanakan mengikut standard operasi asas harian.'}
                </div>
              </div>

              {/* Status Switcher */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Tukar Status Tugasan:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['todo', 'in_progress', 'review', 'completed'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        setTaskStatus(previewTask.id, st);
                        setPreviewTask({ ...previewTask, status: st });
                      }}
                      className={`min-h-[44px] px-2 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        previewTask.status === st
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {st === 'todo' ? 'Belum Mula' : st === 'in_progress' ? 'Dalam Proses' : st === 'review' ? 'Perlu Semak' : 'Selesai'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingTask(previewTask);
                    setPreviewTask(null);
                  }}
                  className="min-h-[44px] px-3.5 py-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Sunting</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm('Padam tugasan ini?')) {
                      deleteTask(previewTask.id);
                      setPreviewTask(null);
                    }
                  }}
                  className="min-h-[44px] px-3.5 py-2 text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-xl text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Padam</span>
                </button>
              </div>

              <button
                onClick={() => setPreviewTask(null)}
                className="min-h-[44px] px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Edit Task Modal using the simplified flow */}
      {editingTask && (
        <EditTaskModal 
          task={editingTask} 
          onClose={() => setEditingTask(null)} 
        />
      )}

    </div>
  );
};

// Simplified Edit Task Modal component matching Requirement 5
const EditTaskModal: React.FC<{ task: Task; onClose: () => void }> = ({ task, onClose }) => {
  const { teamMembers, updateTask } = useApp();

  const [title, setTitle] = useState(task.title);
  const [assignedToId, setAssignedToId] = useState(task.assignedToId || '');
  const [shift, setShift] = useState(task.shift || '');

  // Advanced fields in collapsible
  const [showDetails, setShowDetails] = useState(false);
  const [description, setDescription] = useState(task.description || '');
  const [category, setCategory] = useState<TaskCategory>(task.category);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [sopStandard, setSopStandard] = useState(task.sopStandard || '');
  const [isBottleneck, setIsBottleneck] = useState(task.isBottleneck);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assigned = teamMembers.find(m => m.id === assignedToId);

    updateTask(task.id, {
      title: title.trim(),
      assignedToId,
      assignedToName: assigned ? assigned.name : 'Belum Ditugaskan',
      shift,
      description,
      category,
      priority,
      sopStandard,
      isBottleneck
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Sunting Tugasan</h3>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">1. Nama Tugasan</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-base bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">2. Pilih Staf (PIC)</label>
            <select
              value={assignedToId}
              onChange={(e) => setAssignedToId(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-base bg-slate-50 border border-slate-300 rounded-xl cursor-pointer"
            >
              <option value="">Pilih staf (pilihan)...</option>
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">3. Waktu / Syif</label>
            <input
              type="text"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-base bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          {/* Collapsible Details */}
          <div>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full min-h-[44px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl flex items-center justify-between cursor-pointer"
            >
              <span>Butiran Lanjut (Kategori, Keutamaan, SOP & Catatan)</span>
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDetails && (
              <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <label className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBottleneck}
                    onChange={(e) => setIsBottleneck(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                  <span className="text-xs font-bold text-amber-900">Titik Bottleneck Operasi</span>
                </label>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Standard SOP</label>
                  <textarea
                    rows={2}
                    value={sopStandard}
                    onChange={(e) => setSopStandard(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Penerangan Tugasan</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 text-slate-600 rounded-xl font-semibold text-base cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-6 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base rounded-xl cursor-pointer"
            >
              Kemas Kini Tugasan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
