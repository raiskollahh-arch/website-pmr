import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Youtube, 
  Clock, 
  ExternalLink, 
  HeartHandshake, 
  ShieldCheck, 
  MessageSquareQuote,
  Share2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram Resmi',
      handle: '@pmrwira_smkn3bjm',
      url: 'https://instagram.com/pmrwira_smkn3bjm',
      icon: Instagram,
      color: 'hover:text-pink-600 hover:border-pink-300',
      badge: 'Update Harian & Foto Kegiatan'
    },
    {
      name: 'WhatsApp Hotline',
      handle: '+62 821-5044-8831',
      url: 'https://wa.me/6282150448831?text=Halo%20Admin%20PMR%20Wira%20SMKN%203%20Banjarmasin',
      icon: Phone,
      color: 'hover:text-emerald-600 hover:border-emerald-300',
      badge: 'Respon Cepat Jam Piket'
    },
    {
      name: 'YouTube Channel',
      handle: 'PMR Wira SMKN 3 Banjarmasin',
      url: 'https://youtube.com',
      icon: Youtube,
      color: 'hover:text-red-600 hover:border-red-300',
      badge: 'Dokumentasi Diksar & Latgab'
    },
    {
      name: 'Email Surat & Kerjasama',
      handle: 'pmrwira.smkn3bjm@gmail.com',
      url: 'mailto:pmrwira.smkn3bjm@gmail.com',
      icon: Mail,
      color: 'hover:text-blue-600 hover:border-blue-300',
      badge: 'Surat Undangan & Bakti Sosial'
    },
  ];

  const triBakti = [
    {
      num: '01',
      title: 'Meningkatkan Keterampilan Hidup Sehat',
      desc: 'Membiasakan perilaku hidup bersih dan sehat di lingkungan sekolah serta masyarakat luas.'
    },
    {
      num: '02',
      title: 'Berkarya dan Berbakti di Masyarakat',
      desc: 'Terjun langsung dalam bakti sosial, donor darah, simulasi bencana, dan pertolongan pertama.'
    },
    {
      num: '03',
      title: 'Mempererat Persahabatan Nasional & Internasional',
      desc: 'Membangun jejaring persaudaraan relawan muda tanpa membedakan suku, agama, dan ras.'
    }
  ];

  const tujuhPrinsip = [
    'Kemanusiaan', 'Kesamaan', 'Kenetralan', 
    'Kemandirian', 'Kesukarelaan', 'Kesatuan', 'Kesemestaan'
  ];

  return (
    <section id="kontak" className="py-16 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Red cross backdrop decoration */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
        <div className="w-96 h-96 relative">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-28 bg-white rounded-2xl" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-28 bg-white rounded-2xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Posko & Hubungan Masyarakat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kontak & Media Sosial Resmi
          </h2>
          <p className="text-slate-400 text-sm">
            Hubungi pengurus PMR Wira SMKN 3 Banjarmasin untuk pendaftaran relawan, layanan medis kegiatan sekolah, dan kolaborasi kepalangmerahan.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={`bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 hover:bg-slate-800 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group ${item.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-700/60 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{item.name}</h3>
                  <p className="text-xs text-slate-300 font-mono mt-1">{item.handle}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.badge}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* School Info & Tri Bakti */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Location & School Address */}
          <div className="lg:col-span-5 bg-slate-800/50 border border-slate-700/70 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Posko & Sekretariat</h3>
                <p className="text-xs text-slate-400">SMK Negeri 3 Banjarmasin</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Alamat Lengkap:</strong>
                  Jl. Pramuka Km. 6 No. 52, Kel. Pemurus Luar, Kec. Banjarmasin Timur, Kota Banjarmasin, Kalimantan Selatan 70249
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Jadwal Piket Posko & UKS:</strong>
                  Senin — Jumat: 07:30 – 16:00 WITA<br />
                  Sabtu: 08:00 – 12:00 WITA (Latihan Rutin)
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Naungan & Afiliasi:</strong>
                  Palang Merah Indonesia (PMI) Kota Banjarmasin & Cabang Kalimantan Selatan
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=SMK+Negeri+3+Banjarmasin"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs transition"
              >
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Buka Petunjuk Arah Google Maps</span>
              </a>
            </div>
          </div>

          {/* Tri Bakti PMR & 7 Prinsip */}
          <div className="lg:col-span-7 bg-slate-800/50 border border-slate-700/70 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Tri Bakti PMR (Palang Merah Remaja)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Landasan pengabdian setiap anggota PMR Wira SMKN 3 Banjarmasin:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {triBakti.map((item) => (
                <div key={item.num} className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                  <span className="font-extrabold text-red-500 text-sm">{item.num}</span>
                  <h4 className="font-bold text-white text-xs mt-1 leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* 7 Prinsip */}
            <div className="pt-3 border-t border-slate-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                7 Prinsip Dasar Gerakan Palang Merah Internasional:
              </h4>
              <div className="flex flex-wrap gap-2">
                {tujuhPrinsip.map((prinsip) => (
                  <span
                    key={prinsip}
                    className="px-2.5 py-1 rounded-lg bg-slate-700/70 border border-slate-600/60 text-[11px] font-semibold text-slate-200"
                  >
                    {prinsip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">
              +
            </div>
            <span>&copy; {new Date().getFullYear()} PMR Wira SMKN 3 Banjarmasin &bull; Hak Cipta Dilindungi</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Siamo Tutti Fratelli</span>
            <span>&bull;</span>
            <span>Relawan Kemanusiaan Wira</span>
          </div>
        </div>

      </div>
    </section>
  );
};
