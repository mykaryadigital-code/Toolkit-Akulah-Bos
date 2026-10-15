import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';
import { 
  Users, 
  Plus, 
  Phone, 
  Calendar, 
  Clock, 
  FileText, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export const TeamManager: React.FC = () => {
  const { 
    teamMembers, 
    tasks, 
    coachingRecords, 
    onboardingForms,
    addTeamMember, 
    updateTeamMember, 
    deleteTeamMember 
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(teamMembers[0]?.id || null);

  // New member form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newShift, setNewShift] = useState('Syif Pagi (08:00 - 16:30)');
  const [newPhone, setNewPhone] = useState('');
  const [newStatus, setNewStatus] = useState<'aktif' | 'percubaan' | 'rehat'>('aktif');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addTeamMember({
      name: newName.trim(),
      role: newRole.trim() || 'Krew Operasi',
      shift: newShift,
      phone: newPhone.trim() || '012-XXXXXXX',
      joinDate: new Date().toISOString().split('T')[0],
      status: newStatus,
      avatarColor: 'bg-neutral-800'
    });

    setNewName('');
    setNewRole('');
    setNewPhone('');
    setShowAddModal(false);
  };

  const selectedMember = teamMembers.find(m => m.id === selectedMemberId);
  const memberTasks = tasks.filter(t => t.assignedToId === selectedMemberId);
  const memberCoachings = coachingRecords.filter(c => c.employeeName.toLowerCase().includes(selectedMember?.name.toLowerCase() || ''));
  const memberOnboarding = onboardingForms.find(o => o.employeeName.toLowerCase().includes(selectedMember?.name.toLowerCase() || ''));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Pengurusan Pasukan & Rekod Pekerja
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Senarai nama staf, profil syif kerja, rekod onboarding, dan sejarah bimbingan prestasi.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Tambah Pekerja</span>
        </button>
      </div>

      {/* Main Grid: Staff List on Left, Selected Profile Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Team List */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
              Senarai Staf ({teamMembers.length})
            </span>
          </div>

          <div className="divide-y divide-neutral-100">
            {teamMembers.map(member => {
              const isSelected = selectedMemberId === member.id;
              const pendingCount = tasks.filter(t => t.assignedToId === member.id && t.status !== 'completed').length;
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  className={`p-4 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-amber-50/60 border-l-3 border-amber-500' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${member.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{member.name}</h4>
                      <p className="text-[11px] text-neutral-500">{member.role}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase ${
                      member.status === 'aktif' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : member.status === 'percubaan' 
                        ? 'bg-amber-50 text-amber-700' 
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {member.status}
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-1 tabular-nums">
                      {pendingCount} tugasan aktif
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Dossier for Selected Member */}
        <div className="lg:col-span-2 space-y-6">
          {selectedMember ? (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-2xs space-y-6">
              
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${selectedMember.avatarColor} text-white flex items-center justify-center font-bold text-xl shadow-xs`}>
                    {selectedMember.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-neutral-900">{selectedMember.name}</h2>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 uppercase">
                        {selectedMember.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{selectedMember.role}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{selectedMember.shift}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{selectedMember.phone}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Mula: {selectedMember.joinDate}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    onClick={() => setEditingMember(selectedMember)}
                    className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-700 cursor-pointer text-xs flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Kemaskini</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Padam profil pekerja ${selectedMember.name}?`)) {
                        deleteTeamMember(selectedMember.id);
                        setSelectedMemberId(teamMembers[0]?.id || null);
                      }
                    }}
                    className="p-2 border border-neutral-200 rounded-lg hover:bg-rose-50 text-rose-600 cursor-pointer text-xs"
                    title="Padam Pekerja"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dossier Section 1: Assigned Tasks */}
              <div>
                <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wide mb-3 flex items-center justify-between">
                  <span>Tugasan Semasa ({memberTasks.length})</span>
                  <span className="text-neutral-400 font-normal normal-case">
                    {memberTasks.filter(t => t.status === 'completed').length} siap
                  </span>
                </h3>

                {memberTasks.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic bg-neutral-50 p-3 rounded-lg">
                    Tiada tugasan aktif diberikan kepada staf ini.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {memberTasks.map(t => (
                      <div key={t.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-neutral-900">{t.title}</span>
                            {t.isBottleneck && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1 py-0.5 rounded-sm">
                                Bottleneck
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-500">{t.shift} · {t.estimatedHours} jam</span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize ${
                          t.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'
                        }`}>
                          {t.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dossier Section 2: Coaching & Reprimand Records */}
              <div>
                <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wide mb-3">
                  Sejarah Teguran & Bimbingan (Dokumen #4)
                </h3>

                {memberCoachings.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic bg-neutral-50 p-3 rounded-lg">
                    Tiada rekod teguran atau isu disiplin direkodkan untuk staf ini. Rekod bersih.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {memberCoachings.map(c => (
                      <div key={c.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-neutral-900">Perbincangan Tarikh: {c.discussionDate}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-sm">
                            {c.followUpStatus?.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-neutral-600 line-clamp-2">{c.whatHappenedFacts}</p>
                        <p className="mt-1 text-[11px] text-neutral-500">Tarikh Semakan Susulan: <strong>{c.followUpDate}</strong></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dossier Section 3: First Day Onboarding Status */}
              <div>
                <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wide mb-2">
                  Status Onboarding Hari Pertama (Dokumen #2)
                </h3>
                {memberOnboarding ? (
                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs flex items-center justify-between text-emerald-900">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Checklist onboarding telah selesai dan disahkan pada {memberOnboarding.startDate}</span>
                    </div>
                    <span className="font-semibold text-[11px]">Lengkap</span>
                  </div>
                ) : (
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs flex items-center justify-between text-neutral-600">
                    <span>Checklist hari pertama belum diisi untuk staf ini.</span>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center text-neutral-400 text-xs">
              Pilih pekerja dari senarai di sebelah kiri untuk melihat profil penuh.
            </div>
          )}
        </div>

      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-100">
            <h3 className="text-base font-bold text-neutral-900 mb-1">Tambah Pekerja Baharu</h3>
            <p className="text-xs text-neutral-500 mb-4">Masukkan profil staf untuk penugasan syif dan rekod operasi.</p>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Nama Penuh Pekerja</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Muhammad Harith"
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Jawatan / Peranan</label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Contoh: Barista / Krew Servis"
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Jadual Syif Utama</label>
                <input
                  type="text"
                  value={newShift}
                  onChange={(e) => setNewShift(e.target.value)}
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">No. Telefon</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="012-XXXXXXX"
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Status Pekerjaan</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                >
                  <option value="aktif">Aktif (Tetap / Kontrak)</option>
                  <option value="percubaan">Percubaan (Probation)</option>
                  <option value="rehat">Cuti / Rehat</option>
                </select>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-50 cursor-pointer font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer font-medium"
                >
                  Simpan Pekerja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-100">
            <h3 className="text-base font-bold text-neutral-900 mb-1">Kemaskini Pekerja</h3>
            <p className="text-xs text-neutral-500 mb-4">Sunting peranan atau jadual syif staf.</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              updateTeamMember(editingMember.id, editingMember);
              setEditingMember(null);
            }} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Nama Penuh</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Jawatan</label>
                <input
                  type="text"
                  required
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Jadual Syif</label>
                <input
                  type="text"
                  value={editingMember.shift}
                  onChange={(e) => setEditingMember({ ...editingMember, shift: e.target.value })}
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">No. Telefon</label>
                <input
                  type="text"
                  value={editingMember.phone}
                  onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                  className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-50 cursor-pointer font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 cursor-pointer font-medium"
                >
                  Simpan Kemaskini
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
