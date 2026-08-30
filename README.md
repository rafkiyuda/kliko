# KLIKO — Klik Sekali, Semua Beres 🏗️🌿

> **Platform On-Demand Konstruksi & Marketplace Material Sirkular No. 1 di Indonesia**

KLIKO menggabungkan layanan jasa tukang bangunan terverifikasi dengan **tarif pasti (*fixed price*)** dan pasar sirkular (*Circular Economy Marketplace*) untuk memperjualbelikan material sisa proyek berkualitas tinggi dengan diskon hingga 40%.

---

## ✨ Fitur Utama

- 🔨 **Jasa Tukang Fixed-Price**: Booking instan tanpa nego berbelit untuk pasang keramik, kanopi/baja ringan, atap bocor, kelistrikan, dan plumbing.
- 📦 **Circular Economy Marketplace**: Penyelamatan material sisa proyek (*Granit, Cat Pail, Baja Ringan, Paving Block Daur Ulang, Kusen Kayu*) langsung dari kontraktor dan pengembang.
- ⚡ **Paket Bundling Hemat**: Paket kombinasi material sisa + ongkos tukang ahli dalam satu harga hemat hingga 35%.
- 🤖 **AI Damage Scanner (Google Gemini Vision)**: Foto kerusakan barang/rumah tangga (AC bocor, wastafel mampet, dinding retak) untuk diagnosa instan, estimasi biaya, rekomendasi tukang, dan tips darurat.
- 📸 **Before-After Transparency Tracking**: Verifikasi foto sebelum dan sesudah kerja lapangan dengan sertifikat garansi resmi digital 14–30 hari.
- 👥 **Multi-Role Experience**: Dasbor khusus terintegrasi untuk Customer (*Homeowner*), Mitra Tukang (*Mandor*), Seller (*Kontraktor/Supplier*), dan Admin Operasional.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Radix UI + Lucide Icons
- **Database & ORM**: [PostgreSQL (Supabase)](https://supabase.com/) + [Prisma ORM](https://www.prisma.io/)
- **AI Engine**: [Google Generative AI (Gemini 1.5 Flash Vision)](https://ai.google.dev/)

---

## 🚀 Memulai Pengembangan Lokal

1. **Clone repository**:
   ```bash
   git clone https://github.com/rafkiyuda/kliko.git
   cd kliko
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Salin file `.env.example` menjadi `.env` dan isi kredensial yang sesuai:
   ```bash
   cp .env.example .env
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **Jalankan Dev Server**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📄 Lisensi
Hak Cipta © 2026 KLIKO (*Klik Layanan Instan Konstruksi Online*). All rights reserved.
