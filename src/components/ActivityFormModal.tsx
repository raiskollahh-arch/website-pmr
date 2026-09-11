import React, { useState, useEffect } from 'react';
import { X, CalendarPlus, Save, Calendar, Clock, MapPin, Users, Award, FileText } from 'lucide-react';
import { Activity } from '../types';

interface ActivityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Omit<Activity, 'id'>, id?: string) => void;
  editingActivity?: Activity | null;
}

export const ActivityFormModal: React.FC<ActivityFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingActivity,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pertolongan Pertama');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('08:00 - 12:00 WITA');
  const [location, setLocation] = useState('SMKN 3 Banjarmasin');
  const [description, setDescription] = useState('');
  const [quota, setQuota] = useState(40);
  const [instructor, setInstructor] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [status, setStatus] = useState<'buka' | 'segera' | 'penuh' | 'selesai'>('buka');

  useEffect(() => {
    if (editingActivity) {
      setTitle(editingActivity.title);
      setCategory(editingActivity.category);
      setDate(editingActivity.date);
      setTime(editingActivity.time);
      setLocation(editingActivity.location);
      setDescription(editingActivity.description);
      setQuota(editingActivity.quota);
      setInstructor(editingActivity.instructor || '');
      setBannerUrl(editingActivity.bannerUrl || '');
      setStatus(editingActivity.status);
    } else {
      setTitle('');
      setCategory('Pertolongan Pertama');
      setDate('');
      setTime('08:00 - 12:00 WITA');
      setLocation('Lapangan Utama SMKN 3 Banjarmasin');
      setDescription('');
      setQuota(40);
      setInstructor('');
      setBannerUrl('');
      setStatus('buka');
    }
  }, [editingActivity, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    const fallbackBanner = bannerUrl.trim() ||
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80';

    onSave(
      {
        title: title.trim(),
        category: category.trim(),
        date: date.trim(),
        time: time.trim(),
        location: location.trim(),
        description: description.trim(),
        quota: Number(quota) || 30,
        instructor: instructor.trim() || 'Tim Pembina PMR SMKN 3',
        bannerUrl: fallbackBanner,
        status,
      },
      editingActivity?.id
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <CalendarPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-snug">
                {editingActivity ? 'Edit Jadwal Kegiatan' : 'Tambah Daftar Kegiatan Baru'}
              </h3>
              <p className="text-red-100 text-xs">Akses Khusus Administrator</p>
            </div>
          </div>
          <button
            id="close-activity-form-btn"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama / Judul Kegiatan <span className="text-red-500">*</span>
            </label>
            <input
              id="activity-form-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Latihan Gabungan Balut Bidai & RJP"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kategori Divisi
              </label>
              <select
                id="activity-form-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
              >
                <option value="Pertolongan Pertama">Pertolongan Pertama</option>
                <option value="Tandu">Tandu</option>
                <option value="Pendidikan Remaja Sebaya">Pendidikan Remaja Sebaya (PRS)</option>
                <option value="Cerdas Cermat">Cerdas Cermat</option>
                <option value="Bakti Sosial & Kemanusiaan">Bakti Sosial & Kemanusiaan</option>
                <option value="Latihan Gabungan & Pelantikan">Latihan Gabungan & Pelantikan</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Status Pendaftaran
              </label>
              <select
                id="activity-form-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
              >
                <option value="buka">Buka Pendaftaran (Aktif)</option>
                <option value="segera">Segera Dibuka</option>
                <option value="penuh">Kuota Penuh</option>
                <option value="selesai">Selesai Dilaksanakan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tanggal Pelaksanaan <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="activity-form-date-input"
                  type="text"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Contoh: 18 Oktober 2025"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Waktu Pelaksanaan
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="activity-form-time-input"
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="08:00 - 12:00 WITA"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tempat / Lokasi
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="activity-form-location-input"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Aula Sasangga Banua SMKN 3"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Quota */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kuota Maksimal Peserta
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="activity-form-quota-input"
                  type="number"
                  min="1"
                  max="500"
                  value={quota}
                  onChange={(e) => setQuota(Number(e.target.value))}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Pemateri / Instruktur / PIC
            </label>
            <div className="relative">
              <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="activity-form-instructor-input"
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="Contoh: KSR PMI Kota Banjarmasin & Pelatih Wira"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Deskripsi & Rincian Kegiatan
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <textarea
                id="activity-form-description-input"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan tujuan kegiatan, materi yang dipelajari, serta perlengkapan yang perlu dibawa peserta..."
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              id="cancel-activity-form-btn"
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition"
            >
              Batal
            </button>
            <button
              id="save-activity-form-btn"
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editingActivity ? 'Simpan Perubahan' : 'Jadwalkan Kegiatan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
