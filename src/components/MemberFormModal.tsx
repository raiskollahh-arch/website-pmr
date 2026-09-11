import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, User, Shield, GraduationCap, Phone, Heart, Sparkles } from 'lucide-react';
import { Member, MemberCategory } from '../types';

interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<Member, 'id'>, id?: string) => void;
  editingMember?: Member | null;
}

const CATEGORY_OPTIONS: { value: MemberCategory; label: string }[] = [
  { value: 'pembina', label: 'Pembina' },
  { value: 'pelatih', label: 'Pelatih' },
  { value: 'pertolongan_pertama', label: 'Pertolongan Pertama' },
  { value: 'tandu', label: 'Tandu' },
  { value: 'prs', label: 'PRS (Pendidikan Remaja Sebaya)' },
  { value: 'cerdas_cermat', label: 'Cerdas Cermat' },
];

export const MemberFormModal: React.FC<MemberFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingMember,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MemberCategory>('pertolongan_pertama');
  const [role, setRole] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodType, setBloodType] = useState<'A' | 'B' | 'AB' | 'O' | '-'>('O');
  const [badge, setBadge] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name);
      setCategory(editingMember.category);
      setRole(editingMember.role);
      setClassGrade(editingMember.classGrade || '');
      setPhone(editingMember.phone || '');
      setBloodType(editingMember.bloodType || 'O');
      setBadge(editingMember.badge || '');
      setAvatarUrl(editingMember.avatarUrl || '');
    } else {
      setName('');
      setCategory('pertolongan_pertama');
      setRole('');
      setClassGrade('');
      setPhone('');
      setBloodType('O');
      setBadge('');
      setAvatarUrl('');
    }
  }, [editingMember, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;

    // Default avatar fallback if empty
    const fallbackAvatar = avatarUrl.trim() || 
      `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80`;

    onSave(
      {
        name: name.trim(),
        category,
        role: role.trim(),
        classGrade: classGrade.trim(),
        phone: phone.trim(),
        bloodType,
        badge: badge.trim(),
        avatarUrl: fallbackAvatar,
        joinedYear: editingMember?.joinedYear || '2025',
      },
      editingMember?.id
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-snug">
                {editingMember ? 'Edit Data Anggota PMR' : 'Tambah Anggota PMR Baru'}
              </h3>
              <p className="text-red-100 text-xs">Akses Khusus Administrator</p>
            </div>
          </div>
          <button
            id="close-member-form-btn"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap Anggota <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="member-form-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Muhammad Rizky Aditya"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kategori Divisi <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Shield className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  id="member-form-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MemberCategory)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Role / Jabatan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Jabatan / Posisi <span className="text-red-500">*</span>
              </label>
              <input
                id="member-form-role-input"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Contoh: Koordinator PP / Anggota Regu"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Class / Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kelas / Instansi
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="member-form-class-input"
                  type="text"
                  value={classGrade}
                  onChange={(e) => setClassGrade(e.target.value)}
                  placeholder="Contoh: XII RPL 1 / Guru SMKN 3"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                No. HP / WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="member-form-phone-input"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0821-xxxx-xxxx"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Blood Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Golongan Darah
              </label>
              <div className="relative">
                <Heart className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  id="member-form-blood-select"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value as any)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                >
                  <option value="A">Golongan Darah A</option>
                  <option value="B">Golongan Darah B</option>
                  <option value="AB">Golongan Darah AB</option>
                  <option value="O">Golongan Darah O</option>
                  <option value="-">Tidak Diketahui (-)</option>
                </select>
              </div>
            </div>

            {/* Badge / Special Skill */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Lencana / Gelar Keahlian
              </label>
              <div className="relative">
                <Sparkles className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="member-form-badge-input"
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Contoh: Juara 1 Tandu / Tim Reaksi Cepat"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              URL Foto / Avatar <span className="text-slate-400 font-normal">(Opsional - otomatis jika kosong)</span>
            </label>
            <input
              id="member-form-avatar-input"
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              id="cancel-member-form-btn"
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition"
            >
              Batal
            </button>
            <button
              id="save-member-form-btn"
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editingMember ? 'Simpan Perubahan' : 'Tambahkan Anggota'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
