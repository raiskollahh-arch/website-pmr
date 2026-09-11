import React, { useState, useEffect } from 'react';
import { X, CalendarCheck, User, BookOpen, Phone, Hash, Heart, Send, CheckCircle2 } from 'lucide-react';
import { Activity, Registration } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: Activity[];
  selectedActivityId?: string;
  onRegister: (registration: Omit<Registration, 'id' | 'registeredAt' | 'status'>) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  activities,
  selectedActivityId,
  onRegister,
}) => {
  const [activityId, setActivityId] = useState('');
  const [fullName, setFullName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [nisn, setNisn] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bloodType, setBloodType] = useState('O');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedActivityId) {
      setActivityId(selectedActivityId);
    } else if (activities.length > 0) {
      setActivityId(activities[0].id);
    }
  }, [selectedActivityId, activities, isOpen]);

  if (!isOpen) return null;

  const currentActivity = activities.find((a) => a.id === activityId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityId || !fullName || !classGrade || !whatsapp) return;

    onRegister({
      activityId,
      activityTitle: currentActivity ? currentActivity.title : 'Kegiatan PMR Wira',
      fullName,
      classGrade,
      nisn: nisn || '-',
      whatsapp,
      bloodType,
      notes,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setClassGrade('');
      setNisn('');
      setWhatsapp('');
      setNotes('');
      onClose();
    }, 1500);
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
              <CalendarCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-snug">Formulir Pendaftaran Kegiatan</h3>
              <p className="text-red-100 text-xs">PMR Wira Unit SMKN 3 Banjarmasin</p>
            </div>
          </div>
          <button
            id="close-registration-modal-btn"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Pendaftaran Berhasil Terkirim!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Terima kasih, <strong>{fullName}</strong>. Data pendaftaran Anda untuk kegiatan <em>"{currentActivity?.title}"</em> telah tercatat. Panitia PMR Wira akan menghubungi via WhatsApp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Activity selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Pilih Jadwal Kegiatan <span className="text-red-500">*</span>
              </label>
              <select
                id="registration-activity-select"
                value={activityId}
                onChange={(e) => setActivityId(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
              >
                {activities.map((act) => (
                  <option key={act.id} value={act.id} disabled={act.status === 'penuh' || act.status === 'selesai'}>
                    {act.title} ({act.date} - {act.time}) {act.status === 'penuh' ? '[PENUH]' : ''}
                  </option>
                ))}
              </select>
              {currentActivity && (
                <div className="mt-2 p-2.5 bg-red-50/60 border border-red-100 rounded-xl text-xs text-red-900 flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-semibold">{currentActivity.location}</span> &bull; Pelatih: {currentActivity.instructor}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap Siswa <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="registration-fullname-input"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Muhammad Ilham"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Class & Major */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kelas & Jurusan SMKN 3 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="registration-class-input"
                    type="text"
                    required
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                    placeholder="Contoh: X TKJ 2 / XI RPL 1"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* WhatsApp */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  No. WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="registration-whatsapp-input"
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0821-xxxx-xxxx"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Blood Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Gol. Darah
                </label>
                <div className="relative">
                  <Heart className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    id="registration-blood-select"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                    <option value="Belum Tahu">Belum Tahu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* NISN (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                NISN (Nomor Induk Siswa Nasional) <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="registration-nisn-input"
                  type="text"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  placeholder="Contoh: 0087612345"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Motivation / Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alasan / Catatan Mengikuti Kegiatan
              </label>
              <textarea
                id="registration-notes-input"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Ingin mengasah kemampuan pertolongan pertama dan sertifikasi relawan wira..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
              />
            </div>

            <div className="flex gap-3 pt-3 border-t border-slate-100">
              <button
                id="cancel-registration-btn"
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition"
              >
                Batal
              </button>
              <button
                id="submit-registration-btn"
                type="submit"
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Kirim Pendaftaran
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
