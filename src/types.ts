export type MemberCategory = 
  | 'cerdas_cermat'
  | 'pertolongan_pertama'
  | 'prs'
  | 'tandu'
  | 'pelatih'
  | 'pembina';

export interface Member {
  id: string;
  name: string;
  category: MemberCategory;
  role: string; // e.g., 'Ketua PMR Wira', 'Koordinator PP', 'Anggota Utama', 'Pembina Utama'
  classGrade?: string; // e.g., 'XII Rekayasa Perangkat Lunak', 'XI Desain Komunikasi Visual'
  phone?: string;
  bloodType?: 'A' | 'B' | 'AB' | 'O' | '-';
  avatarUrl?: string;
  joinedYear?: string;
  badge?: string;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  date: string; // e.g., '18 Oktober 2025'
  time: string; // e.g., '08:00 - 12:00 WITA'
  location: string; // e.g., 'Aula Sasangga Banua SMKN 3 Banjarmasin'
  description: string;
  quota: number;
  bannerUrl?: string;
  instructor?: string;
  status: 'buka' | 'segera' | 'penuh' | 'selesai';
}

export interface Registration {
  id: string;
  activityId: string;
  activityTitle: string;
  fullName: string;
  classGrade: string; // e.g. 'X TKJ 1'
  whatsapp: string;
  nisn: string;
  bloodType?: string;
  notes?: string;
  registeredAt: string;
  status: 'menunggu' | 'diterima' | 'ditolak';
}

export interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  type: 'approval' | 'notice' | 'event' | 'task';
  completed?: boolean;
}
