import { Member, Activity, Registration, ActionItem } from '../types';

export const INITIAL_MEMBERS: Member[] = [
  // Pembina
  {
    id: 'mem-1',
    name: 'Dra. Hj. Rusmiati, M.Pd',
    category: 'pembina',
    role: 'Pembina Utama PMR Wira',
    classGrade: 'Guru Pembina SMKN 3 Banjarmasin',
    phone: '0812-5100-2211',
    bloodType: 'O',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2018',
    badge: 'Pembina Wira'
  },
  {
    id: 'mem-2',
    name: 'Muhammad Ilham, S.Pd',
    category: 'pembina',
    role: 'Pembina Pendamping / Kesiswaan',
    classGrade: 'Guru Pembina SMKN 3 Banjarmasin',
    phone: '0813-4889-1120',
    bloodType: 'A',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2021',
    badge: 'Pembina Wira'
  },
  // Pelatih
  {
    id: 'mem-3',
    name: 'Ahmad Faisal, S.Kep., Ners',
    category: 'pelatih',
    role: 'Pelatih Teknis PP & Tandu (KSR PMI Banjarmasin)',
    classGrade: 'Alumni & Korps Sukarela PMI Kota',
    phone: '0852-4911-3322',
    bloodType: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2020',
    badge: 'Pelatih PMI'
  },
  {
    id: 'mem-4',
    name: 'Siti Rahmah, S.Tr.Keb',
    category: 'pelatih',
    role: 'Pelatih Materi PRS & Kesehatan Reproduksi',
    classGrade: 'Instruktur KSR PMI Kota Banjarmasin',
    phone: '0853-9988-7711',
    bloodType: 'AB',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2022',
    badge: 'Pelatih PMI'
  },
  // Pertolongan Pertama
  {
    id: 'mem-5',
    name: 'Muhammad Rizky Aditya',
    category: 'pertolongan_pertama',
    role: 'Ketua PMR Wira & Koord. Pertolongan Pertama',
    classGrade: 'XII Rekayasa Perangkat Lunak 1',
    phone: '0821-5044-8831',
    bloodType: 'O',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2023',
    badge: 'Tim Reaksi Cepat'
  },
  {
    id: 'mem-6',
    name: 'Nurul Hidayah',
    category: 'pertolongan_pertama',
    role: 'Anggota Senior Pertolongan Pertama',
    classGrade: 'XI Layanan Perbankan Syariah',
    phone: '0822-7711-2299',
    bloodType: 'A',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2024',
    badge: 'Medis Lapangan'
  },
  {
    id: 'mem-7',
    name: 'Dimas Prasetyo',
    category: 'pertolongan_pertama',
    role: 'Staff Unit Balut & Bidai',
    classGrade: 'XI Teknik Jaringan Komputer 2',
    phone: '0813-9900-3344',
    bloodType: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2024',
    badge: 'PP Dasar'
  },
  // Tandu
  {
    id: 'mem-8',
    name: 'Bagus Setiawan',
    category: 'tandu',
    role: 'Koordinator Regu Tandu Darurat',
    classGrade: 'XII Bisnis Daring & Pemasaran 1',
    phone: '0821-6655-4411',
    bloodType: 'AB',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2023',
    badge: 'Juara 1 Tandu Kota'
  },
  {
    id: 'mem-9',
    name: 'Rezky Maulana',
    category: 'tandu',
    role: 'Regu Tandu Putra Cepat',
    classGrade: 'XI Teknik Komputer & Jaringan 1',
    phone: '0852-1144-8800',
    bloodType: 'O',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2024',
    badge: 'Tandu Lapangan'
  },
  {
    id: 'mem-10',
    name: 'Siti Aisyah',
    category: 'tandu',
    role: 'Regu Tandu Putri & Evakuasi Cepat',
    classGrade: 'XI Otomatisasi Tata Kelola Perkantoran',
    phone: '0812-4433-2211',
    bloodType: 'A',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2024',
    badge: 'Evakuasi Cepat'
  },
  // PRS (Pendidikan Remaja Sebaya)
  {
    id: 'mem-11',
    name: 'Anisa Maulida',
    category: 'prs',
    role: 'Koordinator Pendidikan Remaja Sebaya (PRS)',
    classGrade: 'XII Akuntansi & Keuangan Lembaga 1',
    phone: '0858-2233-4455',
    bloodType: 'B',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2023',
    badge: 'Pendidik Sebaya'
  },
  {
    id: 'mem-12',
    name: 'Fathur Rahman',
    category: 'prs',
    role: 'Fasilitator Kesehatan Remaja & Anti Narkoba',
    classGrade: 'XI Desain Komunikasi Visual 1',
    phone: '0813-8822-1100',
    bloodType: 'O',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2024',
    badge: 'Konselor Sebaya'
  },
  // Cerdas Cermat
  {
    id: 'mem-13',
    name: 'Zahra Amelia',
    category: 'cerdas_cermat',
    role: 'Kapten Tim Cerdas Cermat Kemanusiaan',
    classGrade: 'XII Rekayasa Perangkat Lunak 2',
    phone: '0821-9988-7766',
    bloodType: 'A',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2023',
    badge: 'Juara LCC PMI Prov'
  },
  {
    id: 'mem-14',
    name: 'M. Hafiz Al-Ghifari',
    category: 'cerdas_cermat',
    role: 'Spesialis Kepalangmerahan & HPI (Hukum Humaniter)',
    classGrade: 'XI Manajemen Perkantoran 2',
    phone: '0853-6677-8899',
    bloodType: 'O',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    joinedYear: '2024',
    badge: 'Debat Kemanusiaan'
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Latihan Gabungan Pertolongan Pertama & Simulasi Bencana',
    category: 'Pertolongan Pertama',
    date: '25 Oktober 2025',
    time: '08:00 - 12:30 WITA',
    location: 'Lapangan Utama & Lapangan Basket SMKN 3 Banjarmasin',
    description: 'Pelatihan teknik balut bidai tingkat lanjut, penanganan korban henti napas (RJP), serta simulasi tanggap gempa dan kebakaran lingkungan sekolah.',
    quota: 45,
    bannerUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80',
    instructor: 'Ahmad Faisal, S.Kep (KSR PMI Kota Banjarmasin)',
    status: 'buka'
  },
  {
    id: 'act-2',
    title: 'Workshop Pendidikan Remaja Sebaya (PRS) & Bahaya NAPZA',
    category: 'Pendidikan Remaja Sebaya',
    date: '08 November 2025',
    time: '09:00 - 13:00 WITA',
    location: 'Aula Sasangga Banua SMKN 3 Banjarmasin',
    description: 'Edukasi interaktif mengenai kesehatan reproduksi remaja, manajemen stres belajar, serta pencegahan perundungan (anti-bullying) dan bahaya narkotika.',
    quota: 60,
    bannerUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&auto=format&fit=crop&q=80',
    instructor: 'Siti Rahmah, S.Tr.Keb & BNN Kota Banjarmasin',
    status: 'buka'
  },
  {
    id: 'act-3',
    title: 'Bongkar Pasang Tandu Darurat & Lomba Ketangkasan Regu',
    category: 'Tandu',
    date: '15 November 2025',
    time: '14:30 - 17:30 WITA',
    location: 'Koridor Olahraga & Lapangan Depan Posko PMR SMKN 3',
    description: 'Uji kecepatan, ketepatan ikatan jangkar dan pangkal, serta teknik angkat angkut korban darurat melalui rintangan halang rintang.',
    quota: 30,
    bannerUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80',
    instructor: 'Bagus Setiawan (Koord. Divisi Tandu)',
    status: 'buka'
  },
  {
    id: 'act-4',
    title: 'Aksi Donor Darah Sukarela SMKN 3 Banjarmasin Peduli Kemanusiaan',
    category: 'Bakti Sosial & Kemanusiaan',
    date: '29 November 2025',
    time: '08:30 - 13:30 WITA',
    location: 'Ruang UKS & Laboratorium Praktik SMKN 3 Banjarmasin',
    description: 'Bekerjasama dengan Unit Donor Darah (UDD) PMI Kota Banjarmasin melayani donor darah untuk dewan guru, siswa usia 17+, dan masyarakat umum.',
    quota: 100,
    bannerUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200&auto=format&fit=crop&q=80',
    instructor: 'Tim UDD PMI Kota Banjarmasin & Relawan PMR Wira',
    status: 'segera'
  },
  {
    id: 'act-5',
    title: 'Simulasi LCC Kemanusiaan Tingkat Wira Se-Kalimantan Selatan',
    category: 'Cerdas Cermat',
    date: '10 Desember 2025',
    time: '08:00 - 15:00 WITA',
    location: 'Lab Komputer & Multimedia SMKN 3 Banjarmasin',
    description: 'Pembekalan materi 7 Prinsip Palang Merah, Gerakan Palang Merah Internasional, sejarah Henry Dunant, dan Hukum Humaniter Internasional (HPI).',
    quota: 25,
    bannerUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    instructor: 'Zahra Amelia (Kapten Tim LCC)',
    status: 'buka'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-1',
    activityId: 'act-1',
    activityTitle: 'Latihan Gabungan Pertolongan Pertama & Simulasi Bencana',
    fullName: 'Fikri Aditya Pratama',
    classGrade: 'X TKJ 1',
    whatsapp: '0821-9988-1234',
    nisn: '0078912345',
    bloodType: 'O',
    notes: 'Ingin memperdalam materi balut bidai untuk bekal tim medis kelas.',
    registeredAt: '11 Sep 2025, 08:30 WITA',
    status: 'diterima'
  },
  {
    id: 'reg-2',
    activityId: 'act-1',
    activityTitle: 'Latihan Gabungan Pertolongan Pertama & Simulasi Bencana',
    fullName: 'Dewi Anggraini',
    classGrade: 'XI RPL 2',
    whatsapp: '0852-7744-9911',
    nisn: '0067812903',
    bloodType: 'B',
    notes: 'Siap hadir tepat waktu dan membawa perlengkapan mitela pribadi.',
    registeredAt: '11 Sep 2025, 09:15 WITA',
    status: 'menunggu'
  },
  {
    id: 'reg-3',
    activityId: 'act-3',
    activityTitle: 'Bongkar Pasang Tandu Darurat & Lomba Ketangkasan Regu',
    fullName: 'Muhammad Dani Rahman',
    classGrade: 'X DKV 2',
    whatsapp: '0813-5566-7788',
    nisn: '0081239944',
    bloodType: 'A',
    notes: 'Tertarik masuk regu inti lomba tandu darurat.',
    registeredAt: '11 Sep 2025, 10:00 WITA',
    status: 'menunggu'
  }
];

export const INITIAL_ACTION_ITEMS: ActionItem[] = [
  {
    id: 'act-item-1',
    title: 'Pendaftaran Siswa Baru',
    subtitle: 'Dewi Anggraini (XI RPL 2) mendaftar Latgab PP',
    timeAgo: 'Baru saja',
    type: 'approval'
  },
  {
    id: 'act-item-2',
    title: 'Verifikasi Peserta Tandu',
    subtitle: 'M. Dani Rahman mendaftar Latihan Tandu Cepat',
    timeAgo: '15 menit lalu',
    type: 'approval'
  },
  {
    id: 'act-item-3',
    title: 'Piket Posko UKS Hari Ini',
    subtitle: 'Regu 2 bertugas piket istirahat pertama & kedua',
    timeAgo: '1 jam lalu',
    type: 'notice',
    completed: true
  },
  {
    id: 'act-item-4',
    title: 'Restock Kotak P3K Sekolah',
    subtitle: 'Pemeriksaan kasa steril, povidone iodine, & plester',
    timeAgo: '3 jam lalu',
    type: 'task'
  }
];
