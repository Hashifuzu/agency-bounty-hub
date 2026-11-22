# KREASIHUB — Agency Bounty & Innovation Hub

Platform Sayembara & Inovasi Internal Perusahaan yang dirancang khusus untuk agensi kreatif & digital. Menghubungkan tantangan operasional harian agensi dengan solusi inovatif, template terstandar, dan otomasi dari seluruh talenta internal.

![High-Contrast Cobalt & Obsidian Theme](https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80)

---

## 🚀 Fitur Utama

- **Bounty Board (Papan Sayembara):**
  - Tampilan grid kartu sayembara aktif dengan countdown deadline dan hadiah tunai + poin.
  - Filter kategori agensi: `Desain & Template`, `Video & Motion`, `Tech & Automation`, `SOP & Workflow`, `Pitch & Strategi`.
  - Search bar interaktif dengan pencarian cepat.
- **Detail Sayembara & Submission:**
  - Brief lengkap, tujuan project, deliverable yang diharapkan, dan kriteria penilaian bertingkat.
  - Form submit karya untuk karyawan dengan multi-link (Figma, Google Drive, GitHub, Loom) dan preview thumbnail.
- **Panel Review & Penjurian (Mode Manajemen/Admin):**
  - Kurasi karya masuk dengan status: `Approved`, `Perlu Revisi`, `Pending`, dan penetapan `Winner 🏆` dengan efek konfeti selebrasi.
- **Arsip Karya & Aset (Hall of Fame):**
  - Perpustakaan aset internal yang memajang seluruh inovasi pemenang yang siap pakai dan dapat langsung diakses/diunduh oleh seluruh tim.
- **Leaderboard Inovator:**
  - Peringkat karyawan paling kontributif berdasarkan total kemenangan dan poin inovasi.
- **Quick Role Switcher:**
  - Segmented control di navbar untuk berpindah peran secara instan antara `Karyawan (Talent)` dan `Manajemen (Admin)`.
- **Desain Editorial High-Contrast Cobalt & Obsidian:**
  - Sudut tajam 90° (`rounded-none`), tipografi bold uppercase italic, dan animasi berkas cahaya diagonal cobalt dinamis (*GPU-accelerated*).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router, Turbopack)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Icons:** [Lucide React](https://lucide.dev/)
- **Effects:** Canvas Confetti
- **State & Data:** React Context dengan auto-sync ke LocalStorage (siap dihubungkan ke Supabase/PostgreSQL)

---

## 📦 Menjalankan Secara Lokal

```bash
# Clone repository
git clone https://github.com/Hashifuzu/agency-bounty-hub.git

# Masuk ke direktori
cd agency-bounty-hub

# Install dependensi
npm install

# Jalankan server development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🌐 Panduan Deployment ke Vercel

Aplikasi ini 100% kompatibel dengan **Vercel** tanpa konfigurasi tambahan (*zero-configuration Next.js App Router*):

1. Masuk ke [Vercel Dashboard](https://vercel.com/new).
2. Pilih repository **`agency-bounty-hub`** dari akun GitHub Anda.
3. Biarkan pengaturan default (*Framework Preset: Next.js*).
4. Klik **Deploy**.
5. Aplikasi akan langsung aktif secara global dalam hitungan detik!

---

## 📄 Lisensi

MIT License © 2026 KreasiHub Team.
