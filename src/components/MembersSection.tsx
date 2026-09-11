import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Heart, 
  Phone, 
  GraduationCap, 
  Sparkles, 
  Edit, 
  Trash2, 
  Shield, 
  Award,
  Filter
} from 'lucide-react';
import { Member, MemberCategory } from '../types';

interface MembersSectionProps {
  members: Member[];
  isAdmin: boolean;
  onAddMember: () => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (memberId: string) => void;
}

type FilterCategory = 'semua' | MemberCategory;

const CATEGORY_TABS: { id: FilterCategory; label: string; countKey?: MemberCategory }[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'pembina', label: 'Pembina' },
  { id: 'pelatih', label: 'Pelatih' },
  { id: 'pertolongan_pertama', label: 'Pertolongan Pertama' },
  { id: 'tandu', label: 'Tandu' },
  { id: 'prs', label: 'PRS' },
  { id: 'cerdas_cermat', label: 'Cerdas Cermat' },
];

const CATEGORY_META: Record<MemberCategory, { label: string; color: string; desc: string }> = {
  pembina: {
    label: 'Pembina',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    desc: 'Dewan Guru Pembimbing PMR Wira SMKN 3 Banjarmasin'
  },
  pelatih: {
    label: 'Pelatih',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    desc: 'Instruktur Teknis KSR PMI Kota Banjarmasin'
  },
  pertolongan_pertama: {
    label: 'Pertolongan Pertama',
    color: 'bg-red-50 text-red-700 border-red-200',
    desc: 'Divisi Medis Tanggap Darurat & Balut Bidai'
  },
  tandu: {
    label: 'Tandu',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    desc: 'Divisi Pasang Bongkar Tandu Darurat & Evakuasi Cepat'
  },
  prs: {
    label: 'PRS',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    desc: 'Pendidikan Remaja Sebaya, Kesehatan & Konseling'
  },
  cerdas_cermat: {
    label: 'Cerdas Cermat',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    desc: 'Divisi Lomba Cerdas Cermat & Hukum Humaniter Internasional'
  }
};

export const MembersSection: React.FC<MembersSectionProps> = ({
  members,
  isAdmin,
  onAddMember,
  onEditMember,
  onDeleteMember,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('semua');
  const [search, setSearch] = useState('');

  const filteredMembers = members.filter((member) => {
    const matchesCategory = selectedCategory === 'semua' || member.category === selectedCategory;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      member.name.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q) ||
      (member.classGrade && member.classGrade.toLowerCase().includes(q)) ||
      (member.badge && member.badge.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (catId: FilterCategory) => {
    if (catId === 'semua') return members.length;
    return members.filter((m) => m.category === catId).length;
  };

  return (
    <section id="anggota" className="py-12 bg-slate-50/50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Struktur & Relawan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Direktori Anggota PMR Wira
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Daftar pembina, pelatih, serta anggota aktif PMR Wira SMKN 3 Banjarmasin berdasarkan divisi keahlian kepalangmerahan.
            </p>
          </div>

          {/* Admin Add Member Button */}
          {isAdmin ? (
            <button
              id="admin-add-member-btn"
              onClick={onAddMember}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition self-start md:self-auto"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Anggota Baru</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Mode Pengunjung (Hanya Melihat Data)</span>
            </div>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-4">
          {/* Category Tabs: Semua, Cerdas Cermat, Pertolongan Pertama, PRS, Tandu, Pelatih, Pembina */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const count = getCategoryCount(tab.id);
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`filter-cat-${tab.id}`}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-2 border ${
                    isActive
                      ? 'bg-red-600 text-white border-red-600 shadow-sm shadow-red-600/20'
                      : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar for Members */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-members-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama anggota, kelas, atau jabatan..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
            />
          </div>
        </div>

        {/* Active Category Description Note */}
        {selectedCategory !== 'semua' && (
          <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>
                <strong>{CATEGORY_META[selectedCategory].label}:</strong> {CATEGORY_META[selectedCategory].desc}
              </span>
            </div>
            <button
              onClick={() => setSelectedCategory('semua')}
              className="text-red-600 font-semibold hover:underline"
            >
              Lihat Semua ({members.length})
            </button>
          </div>
        )}

        {/* Member Cards Grid */}
        {filteredMembers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">Tidak ada anggota ditemukan</h4>
            <p className="text-xs text-slate-500 mt-1">
              Coba sesuaikan kata kunci pencarian atau ganti kategori filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMembers.map((member) => {
              const meta = CATEGORY_META[member.category];
              return (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl border border-slate-200/80 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-200 p-5 flex flex-col justify-between relative group"
                >
                  {/* Top Bar: Category badge and Admin buttons */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${meta.color}`}
                    >
                      {meta.label}
                    </span>

                    {/* Admin Action Buttons */}
                    {isAdmin && (
                      <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition">
                        <button
                          id={`edit-member-${member.id}`}
                          onClick={() => onEditMember(member)}
                          title="Edit Anggota"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`delete-member-${member.id}`}
                          onClick={() => onDeleteMember(member.id)}
                          title="Hapus Anggota"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Profile info: Avatar + Name + Role */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative shrink-0">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100"
                        loading="lazy"
                      />
                      {member.bloodType && member.bloodType !== '-' && (
                        <span className="absolute -bottom-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs ring-1 ring-white">
                          {member.bloodType}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm leading-snug truncate" title={member.name}>
                        {member.name}
                      </h3>
                      <p className="text-xs text-red-600 font-semibold leading-tight mt-0.5 truncate">
                        {member.role}
                      </p>
                      {member.classGrade && (
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                          <GraduationCap className="w-3 h-3 shrink-0" />
                          <span className="truncate">{member.classGrade}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Badges / Extras */}
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    {member.badge && (
                      <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50/70 border border-amber-200/60 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{member.badge}</span>
                      </div>
                    )}

                    {member.phone && (
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-400">Kontak:</span>
                        <a
                          href={`https://wa.me/62${member.phone.replace(/^0/, '').replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{member.phone}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
