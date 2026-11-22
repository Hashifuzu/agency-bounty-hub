'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Bounty,
  Submission,
  EmployeeProfile,
  BountyStatus,
  SubmissionStatus,
} from '@/types';
import { INITIAL_BOUNTIES, INITIAL_SUBMISSIONS, INITIAL_LEADERBOARD } from '@/lib/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  toggleRole: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  bounties: Bounty[];
  submissions: Submission[];
  leaderboard: EmployeeProfile[];
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  addBounty: (bounty: Omit<Bounty, 'id' | 'createdAt' | 'submissionsCount'>) => Bounty;
  updateBountyStatus: (bountyId: string, status: BountyStatus) => void;
  addSubmission: (
    data: Omit<Submission, 'id' | 'submittedAt' | 'downloadsCount' | 'status'>
  ) => Submission;
  reviewSubmission: (
    submissionId: string,
    status: SubmissionStatus,
    feedback: string,
    reviewerName?: string
  ) => void;
  declareWinner: (
    submissionId: string,
    feedback: string,
    reviewerName?: string
  ) => void;
  incrementDownload: (submissionId: string) => void;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('admin');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [bounties, setBounties] = useState<Bounty[]>(INITIAL_BOUNTIES);
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [leaderboard, setLeaderboard] = useState<EmployeeProfile[]>(INITIAL_LEADERBOARD);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('agency_bounty_role') as Role;
      if (storedRole === 'admin' || storedRole === 'employee') {
        setRoleState(storedRole);
      }

      const storedTheme = localStorage.getItem('agency_bounty_theme') as 'dark' | 'light';
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme);
      } else {
        setTheme('light');
      }

      const storedBounties = localStorage.getItem('agency_bounty_list');
      if (storedBounties) {
        setBounties(JSON.parse(storedBounties));
      }

      const storedSubmissions = localStorage.getItem('agency_bounty_submissions');
      if (storedSubmissions) {
        setSubmissions(JSON.parse(storedSubmissions));
      }

      const storedLeaderboard = localStorage.getItem('agency_bounty_leaderboard');
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    } catch (e) {
      console.warn('LocalStorage error, using initial mock data', e);
    }
    setIsHydrated(true);
  }, []);

  // Update HTML class for dark mode
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      try {
        localStorage.setItem('agency_bounty_theme', theme);
      } catch {}
    }
  }, [theme]);

  // Persist state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('agency_bounty_role', role);
      localStorage.setItem('agency_bounty_list', JSON.stringify(bounties));
      localStorage.setItem('agency_bounty_submissions', JSON.stringify(submissions));
      localStorage.setItem('agency_bounty_leaderboard', JSON.stringify(leaderboard));
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [role, bounties, submissions, leaderboard, isHydrated]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    showToast(
      newRole === 'admin'
        ? 'Mode Manajemen/Admin aktif! Anda dapat membuat sayembara dan menilai karya.'
        : 'Mode Karyawan (Talent) aktif! Anda dapat menjelajah dan mengirimkan inovasi karya.',
      'info'
    );
  };

  const toggleRole = () => {
    setRole(role === 'admin' ? 'employee' : 'admin');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addBounty = (data: Omit<Bounty, 'id' | 'createdAt' | 'submissionsCount'>): Bounty => {
    const id = 'bty-' + Date.now().toString().slice(-4);
    const newBounty: Bounty = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      submissionsCount: 0,
    };
    setBounties((prev) => [newBounty, ...prev]);
    showToast(`Sayembara baru "${newBounty.title}" berhasil dipublikasikan!`, 'success');
    return newBounty;
  };

  const updateBountyStatus = (bountyId: string, status: BountyStatus) => {
    setBounties((prev) =>
      prev.map((b) => (b.id === bountyId ? { ...b, status } : b))
    );
    showToast(`Status sayembara diperbarui menjadi ${status}`, 'info');
  };

  const addSubmission = (
    data: Omit<Submission, 'id' | 'submittedAt' | 'downloadsCount' | 'status'>
  ): Submission => {
    const id = 'sub-' + Date.now().toString().slice(-4);
    const newSub: Submission = {
      ...data,
      id,
      submittedAt: new Date().toISOString(),
      downloadsCount: 0,
      status: 'Pending',
    };

    setSubmissions((prev) => [newSub, ...prev]);

    // Update submissions count on bounty
    setBounties((prev) =>
      prev.map((b) =>
        b.id === data.bountyId
          ? { ...b, submissionsCount: (b.submissionsCount || 0) + 1 }
          : b
      )
    );

    showToast('Karya inovasi Anda berhasil dikirimkan! Menunggu kurasi admin.', 'success');
    return newSub;
  };

  const reviewSubmission = (
    submissionId: string,
    status: SubmissionStatus,
    feedback: string,
    reviewerName: string = 'Creative Director'
  ) => {
    setSubmissions((prev) =>
      prev.map((s) => {
        if (s.id === submissionId) {
          return {
            ...s,
            status,
            feedback,
            reviewedBy: reviewerName,
            reviewedAt: new Date().toISOString(),
          };
        }
        return s;
      })
    );

    // Update leaderboard approved count if approved
    if (status === 'Approved') {
      const sub = submissions.find((s) => s.id === submissionId);
      if (sub) {
        setLeaderboard((prev) =>
          prev.map((emp) =>
            emp.id === sub.authorId || emp.name === sub.authorName
              ? {
                  ...emp,
                  approvedCount: emp.approvedCount + 1,
                  totalPoints: emp.totalPoints + 50,
                }
              : emp
          )
        );
      }
    }

    showToast(`Status karya diperbarui menjadi: ${status}`, 'success');
  };

  const declareWinner = (
    submissionId: string,
    feedback: string,
    reviewerName: string = 'Agency Management Board'
  ) => {
    const targetSub = submissions.find((s) => s.id === submissionId);
    if (!targetSub) return;

    // 1. Mark submission as Winner
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? {
              ...s,
              status: 'Winner',
              feedback,
              reviewedBy: reviewerName,
              reviewedAt: new Date().toISOString(),
            }
          : s
      )
    );

    // 2. Mark corresponding Bounty as Closed
    setBounties((prev) =>
      prev.map((b) =>
        b.id === targetSub.bountyId ? { ...b, status: 'Closed' } : b
      )
    );

    // 3. Update leaderboard for author
    const targetBounty = bounties.find((b) => b.id === targetSub.bountyId);
    const rewardPoints = targetBounty?.rewardPoints || 250;
    const rewardCash = targetBounty?.rewardCash || 'Rp 1.000.000';

    setLeaderboard((prev) => {
      const exists = prev.some(
        (emp) => emp.id === targetSub.authorId || emp.name === targetSub.authorName
      );
      if (exists) {
        return prev.map((emp) => {
          if (emp.id === targetSub.authorId || emp.name === targetSub.authorName) {
            return {
              ...emp,
              winsCount: emp.winsCount + 1,
              totalPoints: emp.totalPoints + rewardPoints,
              topInnovation: targetSub.title,
            };
          }
          return emp;
        });
      } else {
        // Add author to leaderboard if not present
        const newLeader: EmployeeProfile = {
          id: targetSub.authorId,
          name: targetSub.authorName,
          avatar: targetSub.authorAvatar,
          role: targetSub.authorRole,
          department: targetSub.authorDepartment,
          winsCount: 1,
          approvedCount: 1,
          totalPoints: rewardPoints,
          totalCashWon: rewardCash,
          badge: 'Champion Innovator 🏆',
          topInnovation: targetSub.title,
        };
        return [...prev, newLeader];
      }
    });

    showToast(`🎉 Selamat! "${targetSub.title}" resmi ditetapkan sebagai PEMENANG sayembara!`, 'success');
  };

  const incrementDownload = (submissionId: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? { ...s, downloadsCount: (s.downloadsCount || 0) + 1 }
          : s
      )
    );
  };

  const resetToDefaultData = () => {
    setBounties(INITIAL_BOUNTIES);
    setSubmissions(INITIAL_SUBMISSIONS);
    setLeaderboard(INITIAL_LEADERBOARD);
    try {
      localStorage.removeItem('agency_bounty_list');
      localStorage.removeItem('agency_bounty_submissions');
      localStorage.removeItem('agency_bounty_leaderboard');
    } catch {}
    showToast('Data berhasil di-reset ke seed data awal!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        toggleRole,
        theme,
        toggleTheme,
        bounties,
        submissions,
        leaderboard,
        toasts,
        showToast,
        removeToast,
        addBounty,
        updateBountyStatus,
        addSubmission,
        reviewSubmission,
        declareWinner,
        incrementDownload,
        resetToDefaultData,
      }}
    >
      {children}
      {/* Toast Notification Container (Linear/Vercel Minimalist Toast) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shadow-lg text-xs font-medium transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                toast.type === 'success'
                  ? 'bg-emerald-500'
                  : toast.type === 'error'
                  ? 'bg-rose-500'
                  : toast.type === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-zinc-500'
              }`} />
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs pl-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
