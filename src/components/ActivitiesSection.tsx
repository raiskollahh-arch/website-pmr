import React, { useState } from 'react';
import { 
  Calendar, 
  CalendarPlus, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Edit, 
  Trash2, 
  UserCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import { Activity, Registration } from '../types';

interface ActivitiesSectionProps {
  activities: Activity[];
  registrations: Registration[];
  isAdmin: boolean;
  onAddActivity: () => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (activityId: string) => void;
  onOpenRegisterModal: (activityId?: string) => void;
  onViewRegistrations: (activity: Activity) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  activities,
  registrations,
  isAdmin,
  onAddActivity,
  onEditActivity,
  onDeleteActivity,
  onOpenRegisterModal,
  onViewRegistrations,
}) => {
  const [filterStatus, setFilterStatus] = useState<'semua' | 'buka' | 'segera' | 'selesai'>('semua');

  const filteredActivities = activities.filter((act) => {
    if (filterStatus === 'semua') return true;
    return act.status === filterStatus;
  });

  const getRegistrantCount = (activityId: string) => {
    return registrations.filter((r) => r.activityId === activityId).length;
  };

  const getStatusBadge = (status: Activity['status']) => {
    switch (status) {
      case 'buka':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Pendaftaran Terbuka
          </span>
        );
      case 'segera':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
            Segera Dibuka
          </span>
        );
      case 'penuh':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800">
            Kuota Penuh
          </span>
        );
      case 'selesai':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
            Kegiatan Selesai
          </span>
        );
    }
  };

  return (
    <section id="kegiatan" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda & Pelatihan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Jadwal Kegiatan PMR Wira
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Ikuti agenda pelatihan kemanusiaan, simulasi tanggap darurat, dan bakti sosial SMK Negeri 3 Banjarmasin.
            </p>
          </div>

          {/* Admin Add Activity Button */}
          {isAdmin ? (
            <button
              id="admin-add-activity-btn"
              onClick={onAddActivity}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition self-start md:self-auto"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Tambah Daftar Kegiatan</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenRegisterModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-semibold text-xs transition"
            >
              <UserCheck className="w-4 h-4" />
              <span>Daftar Kegiatan Terjadwal</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          {(['semua', 'buka', 'segera', 'selesai'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                filterStatus === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'semua' ? 'Semua Status' : st}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => {
            const count = getRegistrantCount(act.id);
            const isFull = count >= act.quota;
            const canRegister = act.status === 'buka' && !isFull;

            return (
              <div
                key={act.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:border-red-300 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Banner Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={act.bannerUrl}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />
                    
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                        {act.category}
                      </span>
                      {getStatusBadge(isFull ? 'penuh' : act.status)}
                    </div>

                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <p className="text-xs font-semibold flex items-center gap-1.5 text-red-200">
                        <Calendar className="w-3.5 h-3.5" />
                        {act.date}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3.5">
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-red-600 transition">
                      {act.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {act.description}
                    </p>

                    {/* Metadata List */}
                    <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{act.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{act.location}</span>
                      </div>
                      {act.instructor && (
                        <div className="flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">Pemateri: {act.instructor}</span>
                        </div>
                      )}
                    </div>

                    {/* Quota bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span>Pendaftar: {count} dari {act.quota} kuota</span>
                        <span className={isFull ? 'text-red-600' : 'text-emerald-600'}>
                          {Math.round((count / act.quota) * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFull ? 'bg-red-500' : 'bg-red-600'
                          }`}
                          style={{ width: `${Math.min(100, (count / act.quota) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0 border-t border-slate-100 flex flex-col gap-2">
                  {/* Non-Admin: Registration Button */}
                  {canRegister ? (
                    <button
                      id={`register-act-btn-${act.id}`}
                      onClick={() => onOpenRegisterModal(act.id)}
                      className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm shadow-red-600/20 transition flex items-center justify-center gap-2"
                    >
                      <span>Daftar Kegiatan Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed"
                    >
                      {act.status === 'selesai' ? 'Kegiatan Telah Selesai' : isFull ? 'Kuota Penuh' : 'Pendaftaran Belum Dibuka'}
                    </button>
                  )}

                  {/* Admin Specific Action Controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-2 pt-2 border-t border-dashed border-slate-200">
                      <button
                        id={`admin-view-regs-${act.id}`}
                        onClick={() => onViewRegistrations(act)}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Pendaftar ({count})</span>
                      </button>
                      <button
                        id={`admin-edit-act-${act.id}`}
                        onClick={() => onEditActivity(act)}
                        title="Edit Kegiatan"
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        id={`admin-delete-act-${act.id}`}
                        onClick={() => onDeleteActivity(act.id)}
                        title="Hapus Kegiatan"
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
