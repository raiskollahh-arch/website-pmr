import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MembersSection } from './components/MembersSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { ContactSection } from './components/ContactSection';
import { AdminModal } from './components/AdminModal';
import { RegistrationModal } from './components/RegistrationModal';
import { MemberFormModal } from './components/MemberFormModal';
import { ActivityFormModal } from './components/ActivityFormModal';
import { RegisteredListModal } from './components/RegisteredListModal';

import { 
  Member, 
  Activity, 
  Registration, 
  ActionItem 
} from './types';
import { 
  INITIAL_MEMBERS, 
  INITIAL_ACTIVITIES, 
  INITIAL_REGISTRATIONS, 
  INITIAL_ACTION_ITEMS 
} from './data/initialData';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // --- Persistent States ---
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem('pmr_smkn3_members');
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    try {
      const saved = localStorage.getItem('pmr_smkn3_activities');
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    try {
      const saved = localStorage.getItem('pmr_smkn3_registrations');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  const [actionItems, setActionItems] = useState<ActionItem[]>(() => {
    try {
      const saved = localStorage.getItem('pmr_smkn3_action_items');
      return saved ? JSON.parse(saved) : INITIAL_ACTION_ITEMS;
    } catch {
      return INITIAL_ACTION_ITEMS;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pmr_smkn3_is_admin') === 'true';
    } catch {
      return false;
    }
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('pmr_smkn3_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('pmr_smkn3_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('pmr_smkn3_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('pmr_smkn3_action_items', JSON.stringify(actionItems));
  }, [actionItems]);

  useEffect(() => {
    localStorage.setItem('pmr_smkn3_is_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  // --- UI States & Modals ---
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedActivityIdForRegister, setSelectedActivityIdForRegister] = useState<string | undefined>(undefined);

  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [isActivityFormOpen, setIsActivityFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const [isRegisteredListOpen, setIsRegisteredListOpen] = useState(false);
  const [selectedActivityForRegistrations, setSelectedActivityForRegistrations] = useState<Activity | null>(null);

  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // --- Admin Login / Logout ---
  const handleAdminLogin = (pin: string) => {
    // Default PIN: pmrwira123 or pmr2025
    if (pin.trim() === 'pmrwira123' || pin.trim() === 'pmr2025' || pin.trim() === 'admin') {
      setIsAdmin(true);
      showToast('Akses Administrator PMR Wira Aktif!');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    showToast('Keluar dari Mode Administrator. Anda sekarang dalam mode pengunjung.', 'info');
  };

  // --- Navigation Handler ---
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Action Items handlers ---
  const handleToggleActionItem = (id: string, completed: boolean) => {
    setActionItems((prev) => prev.filter((item) => item.id !== id));
    showToast(completed ? 'Tindakan telah diselesaikan' : 'Item tindakan dihapus', 'info');
  };

  // --- Members CRUD (Admin Only) ---
  const handleAddMemberClick = () => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setEditingMember(null);
    setIsMemberFormOpen(true);
  };

  const handleEditMemberClick = (member: Member) => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setEditingMember(member);
    setIsMemberFormOpen(true);
  };

  const handleSaveMember = (data: Omit<Member, 'id'>, id?: string) => {
    if (id) {
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...data, id } : m))
      );
      showToast(`Data anggota "${data.name}" berhasil diperbarui!`);
    } else {
      const newMember: Member = {
        ...data,
        id: `mem-${Date.now()}`,
      };
      setMembers((prev) => [newMember, ...prev]);
      showToast(`Anggota baru "${data.name}" berhasil ditambahkan!`);
    }
  };

  const handleDeleteMember = (memberId: string) => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    const member = members.find((m) => m.id === memberId);
    const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus data anggota ${member?.name || ''}?`);
    if (confirmed) {
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      showToast(`Anggota berhasil dihapus`, 'info');
    }
  };

  // --- Activities CRUD (Admin Only) ---
  const handleAddActivityClick = () => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setEditingActivity(null);
    setIsActivityFormOpen(true);
  };

  const handleEditActivityClick = (activity: Activity) => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setEditingActivity(activity);
    setIsActivityFormOpen(true);
  };

  const handleSaveActivity = (data: Omit<Activity, 'id'>, id?: string) => {
    if (id) {
      setActivities((prev) =>
        prev.map((act) => (act.id === id ? { ...data, id } : act))
      );
      showToast(`Jadwal kegiatan "${data.title}" berhasil diperbarui!`);
    } else {
      const newActivity: Activity = {
        ...data,
        id: `act-${Date.now()}`,
      };
      setActivities((prev) => [newActivity, ...prev]);
      showToast(`Kegiatan baru "${data.title}" berhasil dijadwalkan!`);
    }
  };

  const handleDeleteActivity = (activityId: string) => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    const act = activities.find((a) => a.id === activityId);
    const confirmed = window.confirm(`Hapus kegiatan "${act?.title}" dari jadwal?`);
    if (confirmed) {
      setActivities((prev) => prev.filter((a) => a.id !== activityId));
      showToast(`Kegiatan berhasil dihapus`, 'info');
    }
  };

  // --- Registrations (Public & Visitor Registration) ---
  const handleOpenRegisterModal = (activityId?: string) => {
    setSelectedActivityIdForRegister(activityId);
    setIsRegisterModalOpen(true);
  };

  const handleRegisterActivity = (
    data: Omit<Registration, 'id' | 'registeredAt' | 'status'>
  ) => {
    const newReg: Registration = {
      ...data,
      id: `reg-${Date.now()}`,
      registeredAt: new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WITA',
      status: 'menunggu',
    };

    setRegistrations((prev) => [newReg, ...prev]);

    // Also add to action items for admin notice
    const newAction: ActionItem = {
      id: `act-item-${Date.now()}`,
      title: 'Pendaftaran Siswa Baru',
      subtitle: `${data.fullName} (${data.classGrade}) mendaftar ${data.activityTitle}`,
      timeAgo: 'Baru saja',
      type: 'approval',
    };
    setActionItems((prev) => [newAction, ...prev]);

    showToast(`Pendaftaran Anda untuk "${data.activityTitle}" berhasil dikirim!`);
  };

  // --- Manage Registrations (Admin Only) ---
  const handleViewRegistrations = (activity: Activity) => {
    setSelectedActivityForRegistrations(activity);
    setIsRegisteredListOpen(true);
  };

  const handleUpdateRegistrationStatus = (
    regId: string,
    status: 'menunggu' | 'diterima' | 'ditolak'
  ) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === regId ? { ...r, status } : r))
    );
    showToast(`Status peserta diperbarui menjadi: ${status.toUpperCase()}`);
  };

  const handleDeleteRegistration = (regId: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== regId));
    showToast(`Data pendaftaran peserta dihapus`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-red-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 text-xs sm:text-sm">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        isAdmin={isAdmin}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={handleNavigate}
        notificationCount={actionItems.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section matching the reference layout */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenRegisterModal={() => handleOpenRegisterModal()}
          actionItems={actionItems}
          onToggleActionItem={handleToggleActionItem}
          isAdmin={isAdmin}
        />

        {/* Scheduled Activities Section */}
        <ActivitiesSection
          activities={activities}
          registrations={registrations}
          isAdmin={isAdmin}
          onAddActivity={handleAddActivityClick}
          onEditActivity={handleEditActivityClick}
          onDeleteActivity={handleDeleteActivity}
          onOpenRegisterModal={handleOpenRegisterModal}
          onViewRegistrations={handleViewRegistrations}
        />

        {/* Members Directory Section with Category Filtering */}
        <MembersSection
          members={members}
          isAdmin={isAdmin}
          onAddMember={handleAddMemberClick}
          onEditMember={handleEditMemberClick}
          onDeleteMember={handleDeleteMember}
        />

        {/* Social Media & Contacts Section */}
        <ContactSection />
      </main>

      {/* Modals */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdmin={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
      />

      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        activities={activities}
        selectedActivityId={selectedActivityIdForRegister}
        onRegister={handleRegisterActivity}
      />

      <MemberFormModal
        isOpen={isMemberFormOpen}
        onClose={() => {
          setIsMemberFormOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        editingMember={editingMember}
      />

      <ActivityFormModal
        isOpen={isActivityFormOpen}
        onClose={() => {
          setIsActivityFormOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleSaveActivity}
        editingActivity={editingActivity}
      />

      <RegisteredListModal
        isOpen={isRegisteredListOpen}
        onClose={() => {
          setIsRegisteredListOpen(false);
          setSelectedActivityForRegistrations(null);
        }}
        activity={selectedActivityForRegistrations}
        registrations={registrations}
        onUpdateStatus={handleUpdateRegistrationStatus}
        onDeleteRegistration={handleDeleteRegistration}
      />
    </div>
  );
}
