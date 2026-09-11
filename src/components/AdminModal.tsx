import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogin: (password: string) => boolean;
  onLogout: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const valid = onLogin(pin);
    if (valid) {
      setSuccess('Berhasil masuk sebagai Administrator PMR Wira SMKN 3!');
      setTimeout(() => {
        setSuccess('');
        setPin('');
        onClose();
      }, 800);
    } else {
      setError('Kode PIN salah. Silakan coba: pmrwira123');
    }
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-snug">Portal Akses Pengurus</h3>
              <p className="text-red-100 text-xs">PMR Wira SMKN 3 Banjarmasin</p>
            </div>
          </div>
          <button
            id="close-admin-modal-btn"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isAdmin ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-red-50/50">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">Mode Administrator Aktif</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Anda memiliki akses penuh untuk menambah & menghapus anggota, mengelola jadwal kegiatan, dan memverifikasi pendaftar.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hak akses: Tambah Anggota, Tambah Kegiatan, Kelola Pendaftar</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  id="cancel-admin-modal-btn"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition"
                >
                  Tutup
                </button>
                <button
                  id="logout-admin-btn"
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm shadow-sm transition"
                >
                  Keluar Mode Admin
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-slate-600">
                  Masukkan PIN Administrator untuk membuka wewenang penambahan anggota dan daftar kegiatan PMR Wira.
                </p>
                <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs mt-2 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>PIN Bawaan Pengurus: <strong className="font-mono text-amber-900 bg-amber-100/70 px-1 py-0.5 rounded">pmrwira123</strong></span>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kode Sandi / PIN Admin
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="admin-pin-input"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Ketik pmrwira123"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition"
                >
                  Batal
                </button>
                <button
                  id="submit-admin-pin-btn"
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  Masuk Admin
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setPin('pmrwira123')}
                  className="text-xs text-red-600 hover:text-red-700 underline underline-offset-2"
                >
                  Isi otomatis PIN Pengurus
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
