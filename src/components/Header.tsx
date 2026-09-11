import React, { useState } from 'react';
import { Search, Bell, Shield, ShieldCheck, ChevronDown, Menu as MenuIcon, X, Calendar, Users, PhoneCall, Info } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onOpenAdminModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (sectionId: string) => void;
  notificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  isAdmin,
  onOpenAdminModal,
  searchQuery,
  onSearchChange,
  onNavigate,
  notificationCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & School Name */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer shrink-0 group"
          >
            {/* Red Cross Icon */}
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/20 group-hover:scale-105 transition-transform duration-200">
              <div className="relative w-6 h-6">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-white rounded-xs" />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-white rounded-xs" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg leading-tight">
                  PMR Wira
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-md">
                  SMKN 3
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-normal">
                Kota Banjarmasin &bull; Unit Wira
              </p>
            </div>
          </div>

          {/* Search Bar - styled exactly like the reference image */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari anggota, divisi, jadwal kegiatan PMR..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
              <button
                onClick={() => handleNavClick('kegiatan')}
                className="px-3 py-1.5 rounded-lg hover:text-red-600 hover:bg-red-50/60 transition"
              >
                Kegiatan
              </button>
              <button
                onClick={() => handleNavClick('anggota')}
                className="px-3 py-1.5 rounded-lg hover:text-red-600 hover:bg-red-50/60 transition"
              >
                Divisi & Anggota
              </button>
              <button
                onClick={() => handleNavClick('kontak')}
                className="px-3 py-1.5 rounded-lg hover:text-red-600 hover:bg-red-50/60 transition"
              >
                Kontak & Medsos
              </button>
            </nav>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                id="notification-bell-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-xl relative transition"
                aria-label="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="font-bold text-slate-900 text-sm">Pengumuman & Notifikasi</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                      PMR Wira
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="p-2.5 bg-red-50/50 rounded-xl border border-red-100">
                      <p className="font-semibold text-red-900">Pendaftaran Latgab PP Dibuka</p>
                      <p className="text-slate-600 mt-0.5">Siswa SMKN 3 Banjarmasin dapat mendaftar langsung di menu Jadwal Kegiatan.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Baru saja</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                      <p className="font-semibold text-slate-800">Piket Posko UKS Hari Ini</p>
                      <p className="text-slate-600 mt-0.5">Regu piket divisi Pertolongan Pertama bertugas di UKS lantai 1.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Pukul 07:30 WITA</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Toggle / Profile Avatar Button */}
            <button
              id="header-admin-toggle-btn"
              onClick={onOpenAdminModal}
              className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                isAdmin
                  ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isAdmin ? 'bg-red-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {isAdmin ? <ShieldCheck className="w-4 h-4" /> : 'PW'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="leading-tight">{isAdmin ? 'Mode Admin' : 'Akses Admin'}</p>
                <p className="text-[10px] font-normal text-slate-500">
                  {isAdmin ? 'Wira SMKN 3' : 'Pengurus / Tamu'}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              aria-label="Menu Mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari kegiatan, anggota, materi..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 space-y-1">
            <button
              onClick={() => handleNavClick('kegiatan')}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
            >
              <Calendar className="w-4 h-4 text-red-500" />
              Agenda Kegiatan
            </button>
            <button
              onClick={() => handleNavClick('anggota')}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
            >
              <Users className="w-4 h-4 text-red-500" />
              Divisi & Anggota PMR
            </button>
            <button
              onClick={() => handleNavClick('kontak')}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
            >
              <PhoneCall className="w-4 h-4 text-red-500" />
              Kontak & Posko SMKN 3
            </button>
          </div>
        )}
      </div>

      {/* Admin Mode active banner strip if logged in */}
      {isAdmin && (
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-1.5 text-xs text-amber-800 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span><strong>Mode Admin Aktif:</strong> Anda dapat menambah/mengedit data anggota dan agenda kegiatan.</span>
            </div>
            <button
              onClick={onOpenAdminModal}
              className="text-amber-900 font-bold hover:underline ml-3 shrink-0"
            >
              Kelola Akses &rarr;
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
