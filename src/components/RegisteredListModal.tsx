import React, { useState } from 'react';
import { X, Users, Check, Ban, Trash2, Search, Download, Phone, BookOpen, Clock } from 'lucide-react';
import { Registration, Activity } from '../types';

interface RegisteredListModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
  registrations: Registration[];
  onUpdateStatus: (registrationId: string, status: 'menunggu' | 'diterima' | 'ditolak') => void;
  onDeleteRegistration: (registrationId: string) => void;
}

export const RegisteredListModal: React.FC<RegisteredListModalProps> = ({
  isOpen,
  onClose,
  activity,
  registrations,
  onUpdateStatus,
  onDeleteRegistration,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'semua' | 'menunggu' | 'diterima' | 'ditolak'>('semua');

  if (!isOpen || !activity) return null;

  const filtered = registrations
    .filter((r) => r.activityId === activity.id)
    .filter((r) => {
      if (statusFilter === 'semua') return true;
      return r.status === statusFilter;
    })
    .filter((r) => {
      const q = search.toLowerCase();
      return (
        r.fullName.toLowerCase().includes(q) ||
        r.classGrade.toLowerCase().includes(q) ||
        r.whatsapp.includes(q) ||
        r.nisn.includes(q)
      );
    });

  const handleExportCsv = () => {
    const list = registrations.filter((r) => r.activityId === activity.id);
    if (list.length === 0) return;

    const headers = ['No', 'Nama Lengkap', 'Kelas/Jurusan', 'No WA', 'NISN', 'Gol Darah', 'Status', 'Waktu Daftar'];
    const rows = list.map((item, index) => [
      index + 1,
      `"${item.fullName}"`,
      `"${item.classGrade}"`,
      `"${item.whatsapp}"`,
      `"${item.nisn}"`,
      `"${item.bloodType || '-'}"`,
      `"${item.status}"`,
      `"${item.registeredAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pendaftar_${activity.title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRegistered = registrations.filter((r) => r.activityId === activity.id).length;
  const acceptedCount = registrations.filter((r) => r.activityId === activity.id && r.status === 'diterima').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-snug">Daftar Peserta Kegiatan</h3>
              <p className="text-red-100 text-xs truncate max-w-md">{activity.title}</p>
            </div>
          </div>
          <button
            id="close-registered-modal-btn"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Summary bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span>Total Pendaftar: <strong className="text-slate-800 text-sm">{totalRegistered}</strong></span>
              <span>Diterima: <strong className="text-emerald-700 text-sm">{acceptedCount}</strong></span>
              <span>Sisa Kuota: <strong className="text-red-600 text-sm">{Math.max(0, activity.quota - acceptedCount)}</strong></span>
            </div>
            <button
              id="export-csv-btn"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Unduh Data (CSV)
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-registrations-input"
                type="text"
                placeholder="Cari nama siswa, kelas, no wa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30"
              />
            </div>
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 text-xs">
              {(['semua', 'menunggu', 'diterima', 'ditolak'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-medium capitalize transition ${
                    statusFilter === st
                      ? 'bg-white text-red-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* List of registered participants */}
          <div className="max-h-[380px] overflow-y-auto space-y-2.5 pr-1">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">Belum ada data pendaftar yang sesuai</p>
              </div>
            ) : (
              filtered.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="font-semibold text-slate-900 text-sm">{item.fullName}</h4>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          item.status === 'diterima'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'ditolak'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 pl-8">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        {item.classGrade}
                      </span>
                      <a
                        href={`https://wa.me/62${item.whatsapp.replace(/^0/, '').replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-emerald-600 hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {item.whatsapp}
                      </a>
                      <span className="text-slate-400">NISN: {item.nisn}</span>
                      {item.bloodType && (
                        <span className="text-red-700 font-semibold bg-red-50 px-1.5 py-0.5 rounded">
                          Gol. {item.bloodType}
                        </span>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-xs text-slate-600 italic pl-8 pt-1">
                        "{item.notes}"
                      </p>
                    )}

                    <div className="text-[11px] text-slate-400 flex items-center gap-1 pl-8 pt-0.5">
                      <Clock className="w-3 h-3" />
                      Mendaftar: {item.registeredAt}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    <button
                      id={`accept-reg-${item.id}`}
                      onClick={() => onUpdateStatus(item.id, 'diterima')}
                      title="Terima Peserta"
                      className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      id={`reject-reg-${item.id}`}
                      onClick={() => onUpdateStatus(item.id, 'ditolak')}
                      title="Tolak Peserta"
                      className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 border border-amber-200 transition"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                    <button
                      id={`delete-reg-${item.id}`}
                      onClick={() => onDeleteRegistration(item.id)}
                      title="Hapus Data"
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              id="close-registered-btn"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition"
            >
              Tutup Jendela
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
