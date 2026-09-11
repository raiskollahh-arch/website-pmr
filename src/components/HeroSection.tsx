import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  UserPlus, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  HeartHandshake
} from 'lucide-react';
import { ActionItem } from '../types';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenRegisterModal: () => void;
  actionItems: ActionItem[];
  onToggleActionItem?: (id: string, completed: boolean) => void;
  isAdmin: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenRegisterModal,
  actionItems,
  onToggleActionItem,
  isAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'action' | 'notifications'>('action');
  const [newsIndex, setNewsIndex] = useState(0);

  const featuredNews = [
    {
      title: 'Simulasi Tanggap Bencana & Pertolongan Pertama PMR Wira SMKN 3',
      description: 'Latihan gabungan lapangan bersama KSR PMI Kota Banjarmasin mengasah kesiapsiagaan evakuasi cepat dan balut bidai korban darurat.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1400&auto=format&fit=crop&q=80',
      tag: 'Kegiatan Utama',
      date: 'Bulan Kemanusiaan 2025'
    },
    {
      title: 'Aksi Donor Darah Sukarela & Kampanye Pendidikan Remaja Sebaya',
      description: 'Mewujudkan kepedulian antarsesama siswa dan warga sekolah melalui donor darah rutin dan edukasi kesehatan reproduksi sehat.',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1400&auto=format&fit=crop&q=80',
      tag: 'Bakti Sosial',
      date: 'Agenda Mendatang'
    }
  ];

  const currentNews = featuredNews[newsIndex];

  return (
    <section id="hero" className="relative pt-6 pb-12 overflow-hidden">
      {/* Background Watermark Cross (Matches the reference image's subtle round watermark with red cross) */}
      <div className="absolute right-1/4 top-4 -z-10 opacity-30 pointer-events-none select-none">
        <div className="relative w-96 h-96 rounded-full border-12 border-red-100 flex items-center justify-center">
          <div className="w-48 h-48 relative">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-14 bg-red-100/70 rounded-md" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-14 bg-red-100/70 rounded-md" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left content (Hero + Quick Links + News) and Right Sidebar (Items to Action + Red Promo Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Hero Greeting text */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Halo, Relawan Muda!
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl leading-relaxed">
                Selamat datang di Portal Resmi <span className="font-semibold text-red-600">PMR Wira SMKN 3 Banjarmasin</span>.
                Siamo Tutti Fratelli — Kita Semua Bersaudara!
              </p>
            </div>

            {/* Quick Links Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Tautan Cepat</h2>
                  <p className="text-xs text-slate-500">Akses cepat menu layanan dan informasi PMR Wira</p>
                </div>
              </div>

              {/* 4 Quick Links Cards - styled cleanly like the reference image */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {/* Card 1: Daftar Kegiatan */}
                <div 
                  onClick={() => onNavigate('kegiatan')}
                  className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-200 cursor-pointer flex flex-col items-center text-center justify-center min-h-[145px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-red-600 transition">
                    Jadwal Kegiatan
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 hidden sm:block">
                    Agenda & Latgab
                  </p>
                </div>

                {/* Card 2: Anggota & Divisi */}
                <div 
                  onClick={() => onNavigate('anggota')}
                  className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-200 cursor-pointer flex flex-col items-center text-center justify-center min-h-[145px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-red-600 transition">
                    Divisi & Anggota
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 hidden sm:block">
                    6 Kategori Lengkap
                  </p>
                </div>

                {/* Card 3: Pendaftaran Relawan */}
                <div 
                  onClick={onOpenRegisterModal}
                  className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-200 cursor-pointer flex flex-col items-center text-center justify-center min-h-[145px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-red-600 transition">
                    Daftar Kegiatan
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 hidden sm:block">
                    Formulir Siswa
                  </p>
                </div>

                {/* Card 4: Kontak & Posko */}
                <div 
                  onClick={() => onNavigate('kontak')}
                  className="group bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-200 cursor-pointer flex flex-col items-center text-center justify-center min-h-[145px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-red-600 transition">
                    Kontak & Medsos
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 hidden sm:block">
                    Posko & Hotline
                  </p>
                </div>
              </div>
            </div>

            {/* Latest News / Kegiatan Terkini Feature Banner (Matches reference image's large photo banner) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Kegiatan & Berita Terkini</h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className={`w-6 h-1 rounded-full ${newsIndex === 0 ? 'bg-red-600' : 'bg-slate-200'}`} />
                    <span className={`w-6 h-1 rounded-full ${newsIndex === 1 ? 'bg-red-600' : 'bg-slate-200'}`} />
                  </div>
                  <button
                    onClick={() => setNewsIndex(newsIndex === 0 ? 1 : 0)}
                    className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                    aria-label="Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setNewsIndex(newsIndex === 1 ? 0 : 1)}
                    className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                    aria-label="Selanjutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Large Card with Photo */}
              <div className="relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] shadow-xl shadow-slate-900/10 flex flex-col justify-end p-6 sm:p-8 group">
                <img
                  src={currentNews.image}
                  alt={currentNews.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                <div className="relative z-10 space-y-3 text-white max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-600/90 backdrop-blur-xs text-[11px] font-bold tracking-wide uppercase">
                    <Sparkles className="w-3 h-3" />
                    {currentNews.tag} &bull; {currentNews.date}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    {currentNews.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 sm:line-clamp-none font-normal">
                    {currentNews.description}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('kegiatan')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-red-50 hover:text-red-600 transition shadow-md"
                    >
                      <span>Lihat Agenda Lengkap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (4 cols) - Matches reference image right side panel! */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Panel Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-5">
              
              {/* Tabs like reference: "Items to Action" & "Notifications" */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('action')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                      activeTab === 'action'
                        ? 'bg-red-50 text-red-700'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span>Tindakan Cepat</span>
                    <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {actionItems.length}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                      activeTab === 'notifications'
                        ? 'bg-red-50 text-red-700'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span>Notifikasi</span>
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3.5">
                {activeTab === 'action' ? (
                  actionItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/60 hover:bg-slate-50 transition flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                          <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{item.subtitle}</p>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          {item.timeAgo}
                        </div>
                      </div>

                      {/* Action icons like reference: check and x */}
                      <div className="flex items-center gap-1 shrink-0 pt-0.5">
                        <button
                          onClick={() => onToggleActionItem && onToggleActionItem(item.id, true)}
                          title="Tandai Selesai"
                          className="p-1 rounded-md text-emerald-600 hover:bg-emerald-100 transition"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onToggleActionItem && onToggleActionItem(item.id, false)}
                          title="Abaikan"
                          className="p-1 rounded-md text-red-500 hover:bg-red-100 transition"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl bg-red-50/50 border border-red-100 text-xs">
                      <p className="font-bold text-red-900">Uji Coba LCC Kemanusiaan</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">Ruang multimedia dibuka setiap Jumat sore untuk latihan bank soal.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Hari ini, 15:30 WITA</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs">
                      <p className="font-bold text-slate-800">Pembaruan Tandu Darurat</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">2 pasang bambu tandu dan mitela baru telah tersedia di gudang UKS.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Kemarin</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Red Promo Card (Identical in style & role to the reference image's deep red card) */}
            <div className="relative rounded-3xl bg-gradient-to-br from-red-600 to-red-700 p-6 text-white overflow-hidden shadow-lg shadow-red-600/20">
              {/* Subtle circular watermark icon */}
              <div className="absolute right-3 bottom-2 opacity-15 pointer-events-none">
                <HeartHandshake className="w-32 h-32 text-white" />
              </div>

              <div className="relative z-10 space-y-3">
                <span className="inline-block text-[10px] uppercase font-extrabold tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
                  Pendaftaran Terbuka
                </span>
                <h3 className="text-lg font-extrabold leading-snug">
                  Tertarik Menjadi Relawan PMR Wira SMKN 3?
                </h3>
                <p className="text-xs text-red-100 leading-relaxed">
                  Asah kepemimpinan, keterampilan pertolongan darurat, dan bangun kepedulian sosial bersama kami.
                </p>
                <div className="pt-1">
                  <button
                    id="hero-red-cta-btn"
                    onClick={onOpenRegisterModal}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-red-100 group"
                  >
                    <span className="underline underline-offset-4">Daftar Kegiatan Sekarang</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
