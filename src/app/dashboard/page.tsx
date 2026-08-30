"use client";

import * as React from "react";
import Link from "next/link";
import { 
  User, 
  Hammer, 
  Recycle, 
  ShieldCheck, 
  Layers, 
  Plus, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  Camera, 
  ArrowRight, 
  Flame,
  Award,
  Wallet,
  AlertCircle,
  Building2,
  Check,
  X,
  FileCheck,
  RefreshCw,
  Truck,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAuth, UserRole } from "@/context/AuthContext";
import { MOCK_ORDERS, MOCK_MATERIALS, MOCK_TUKANGS } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";

export default function DashboardPage() {
  const { user, switchRole } = useAuth();

  // Seller States
  const [newMaterialModal, setNewMaterialModal] = React.useState(false);
  const [newMatTitle, setNewMatTitle] = React.useState("");
  const [newMatCategory, setNewMatCategory] = React.useState("Keramik & Granit");
  const [newMatPrice, setNewMatPrice] = React.useState(145000);
  const [newMatStock, setNewMatStock] = React.useState(25);
  const [listingSuccess, setListingSuccess] = React.useState(false);

  // Tukang Upload Photo State
  const [uploadModal, setUploadModal] = React.useState(false);
  const [uploadType, setUploadType] = React.useState<"before" | "after">("after");
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  // Admin Verification States
  const [pendingTukang, setPendingTukang] = React.useState([
    { id: "tk-new-1", name: "Pak Mulyadi", skill: "Tukang Plafon & Partisi Gypsum", city: "Bekasi", exp: 6, ktp: "3275012345678901" },
    { id: "tk-new-2", name: "Mas Rizki Firmansyah", skill: "Instalasi Kelistrikan & Panel", city: "Jakarta Timur", exp: 4, ktp: "3175098765432100" },
  ]);

  const handleApproveTukang = (id: string) => {
    setPendingTukang(pendingTukang.filter(t => t.id !== id));
  };

  const handleAddMaterial = () => {
    setListingSuccess(true);
  };

  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-8">
        {/* Top Header Card */}
        <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || "/images/tukang-joko.jpg"}
              alt={user?.name || "User"}
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-primary/40 shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground">
                  {user?.name}
                </h1>
                <Badge
                  variant={
                    user?.role === "TUKANG" ? "amber" :
                    user?.role === "SELLER" ? "eco" :
                    user?.role === "ADMIN" ? "default" : "orange"
                  }
                  className="text-xs font-bold"
                >
                  {user?.title || user?.role}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {user?.email} • {user?.location || "Indonesia"} • Mode Simulasi Aktif
              </p>
            </div>
          </div>

          {/* Quick Switch Role Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-2 rounded-2xl bg-muted border border-border self-start md:self-auto">
            <span className="text-[11px] font-bold text-muted-foreground px-2">
              Ganti Simulasi:
            </span>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => switchRole("CUSTOMER")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  user?.role === "CUSTOMER" ? "bg-primary text-white shadow-xs" : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                🏠 Customer
              </button>
              <button
                onClick={() => switchRole("TUKANG")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  user?.role === "TUKANG" ? "bg-primary text-white shadow-xs" : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                🔨 Tukang
              </button>
              <button
                onClick={() => switchRole("SELLER")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  user?.role === "SELLER" ? "bg-emerald-600 text-white shadow-xs" : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                📦 Seller
              </button>
              <button
                onClick={() => switchRole("ADMIN")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  user?.role === "ADMIN" ? "bg-blue-600 text-white shadow-xs" : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                🛡️ Admin
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. CUSTOMER DASHBOARD */}
        {/* ========================================================================= */}
        {user?.role === "CUSTOMER" && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Pesanan Aktif Lapangan:</span>
                <div className="text-2xl font-black text-foreground">1 Proyek Berjalan</div>
                <span className="text-[11px] text-orange-600 font-bold">● Progres 75% selesai</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Total Penghematan Sirkular:</span>
                <div className="text-2xl font-black text-emerald-600">Rp 1.400.000</div>
                <span className="text-[11px] text-muted-foreground">Dari 2 pesanan paket bundling</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">KLIKO Loyalty Points:</span>
                <div className="text-2xl font-black text-amber-500">{user?.points || 250} Poin</div>
                <span className="text-[11px] text-muted-foreground">Tukarkan dengan diskon material sisa</span>
              </div>
            </div>

            {/* Active & Past Bookings */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Pesanan & Layanan Renovasi Anda</h2>
                  <p className="text-xs text-muted-foreground">Pantau progres pengerjaan, verifikasi foto before-after, dan cek sisa masa garansi.</p>
                </div>
                <Link href="/services">
                  <Button size="sm" className="font-bold gap-1 text-xs shadow-md shadow-orange-500/20">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Pesan Layanan / Bundling Baru</span>
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl border border-border/80 bg-background flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/50 transition-colors shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={order.status === "COMPLETED" ? "verified" : "orange"} className="text-[10px]">
                          {order.status === "COMPLETED" ? "Selesai & Bergaransi" : "Sedang Dikerjakan (75%)"}
                        </Badge>
                        <span className="text-xs font-bold text-muted-foreground">{order.orderNumber}</span>
                      </div>
                      <h3 className="font-bold text-base text-foreground">{order.serviceTitle}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          {order.scheduledDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Hammer className="h-3.5 w-3.5 text-orange-500" />
                          Mitra Tukang: <strong>{order.tukangName}</strong>
                        </span>
                        <span className="font-bold text-foreground">
                          Tagihan: {formatRupiah(order.totalAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <Link href={`/tracking/${order.id}`}>
                        <Button variant="outline" size="sm" className="font-bold text-xs gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Lihat Before-After & Garansi</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MITRA TUKANG DASHBOARD */}
        {/* ========================================================================= */}
        {user?.role === "TUKANG" && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* Tukang Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Tingkat Lencana:</span>
                <div className="text-xl font-black text-amber-500 flex items-center gap-1">
                  <Award className="h-5 w-5" />
                  <span>Gold Master Tukang</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-bold">Prioritas Order Otomatis Aktif</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Dompet Saldo Upah:</span>
                <div className="text-xl font-black text-foreground">{formatRupiah(user?.balance || 4850000)}</div>
                <span className="text-[11px] text-emerald-600">Siap dicairkan ke BCA/BRI</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Total Proyek Selesai:</span>
                <div className="text-xl font-black text-foreground">342 Proyek</div>
                <span className="text-[11px] text-emerald-600">Rating 4.96 / 5.0 (289 Ulasan)</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Job Masuk Area Terdekat:</span>
                <div className="text-xl font-black text-primary">2 Job Baru</div>
                <span className="text-[11px] text-muted-foreground">Area Kebayoran & Cilandak</span>
              </div>
            </div>

            {/* Active Job Workflow for Tukang */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">Pekerjaan Lapangan Hari Ini</h2>
                    <Badge variant="verified">Status: Di Lokasi Proyek</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Wajib mengunggah foto sebelum (Before) dan sesudah (After) pengerjaan untuk klaim upah.
                  </p>
                </div>
                <span className="text-base font-black text-emerald-600">
                  Upah Job: Rp 1.400.000 (Fixed)
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-muted/60 border border-border space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-primary">ORDER #KLK-20260830-001</span>
                    <h3 className="font-bold text-base text-foreground">Paket Bangun Kanopi & Garasi Hemat 15m²</h3>
                    <p className="text-xs text-muted-foreground">Klien: Bpk. Aditya Pratama (Jl. Tebet Barat Raya No. 45, Jaksel)</p>
                  </div>
                </div>

                {/* Scope Checklist for Tukang */}
                <div className="space-y-2 pt-2 border-t border-border/60">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    Checklist Tahapan Kerja:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border text-emerald-700 font-bold">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>1. Foto Kondisi Awal (Before) Diunggah</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border text-emerald-700 font-bold">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>2. Rangka Baja Ringan C75 Selesai</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border text-emerald-700 font-bold">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>3. Atap Spandek Pasir Terpasang</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border text-orange-600 font-bold">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>4. Upload Foto Hasil Akhir (After)</span>
                    </div>
                  </div>
                </div>

                {/* Actions for Tukang */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <Button
                    onClick={() => { setUploadType("after"); setUploadModal(true); setUploadSuccess(false); }}
                    size="sm"
                    className="font-bold text-xs gap-1.5 shadow-md shadow-orange-500/20"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    <span>Upload Foto After Pekerjaan</span>
                  </Button>
                  <Link href="/tracking/ord-101">
                    <Button variant="outline" size="sm" className="font-bold text-xs">
                      Lihat Halaman Tracking
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. SELLER / CONTRACTOR DASHBOARD */}
        {/* ========================================================================= */}
        {user?.role === "SELLER" && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* Seller Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Penjualan Sisa Material:</span>
                <div className="text-2xl font-black text-emerald-600">{formatRupiah(user?.balance || 12800000)}</div>
                <span className="text-[11px] text-muted-foreground">Monetisasi surplus dari 6 proyek selesai</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Listing Aktif di Marketplace:</span>
                <div className="text-2xl font-black text-foreground">4 Item Terverifikasi</div>
                <span className="text-[11px] text-emerald-600 font-bold">Siap kirim via partner Lalamove</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Dampak Sirkular Lingkungan:</span>
                <div className="text-2xl font-black text-primary">850 kg CO₂ Saved</div>
                <span className="text-[11px] text-muted-foreground">Mendukung sertifikasi Green Construction</span>
              </div>
            </div>

            {/* Inventory Management */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Inventaris Material Sisa Proyek Anda</h2>
                  <p className="text-xs text-muted-foreground">Ubah sisa keramik, cat, dan baja proyek jadi keuntungan daripada membuangnya.</p>
                </div>
                <Button onClick={() => { setNewMaterialModal(true); setListingSuccess(false); }} size="sm" variant="eco" className="font-bold gap-1 text-xs shadow-md shadow-emerald-500/20">
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ Jual Material Sisa Baru</span>
                </Button>
              </div>

              <div className="space-y-4">
                {MOCK_MATERIALS.slice(0, 3).map((mat) => (
                  <div
                    key={mat.id}
                    className="p-4 rounded-2xl border border-border bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={mat.imageUrl}
                        alt={mat.title}
                        className="h-16 w-16 rounded-xl object-cover border border-border"
                      />
                      <div>
                        <Badge variant="verified" className="text-[9px] mb-1">
                          {mat.condition === "SURPLUS_BRAND_NEW" ? "Surplus Brand New" : "Reclaimed"}
                        </Badge>
                        <h4 className="font-bold text-sm text-foreground">{mat.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          Stok: <strong>{mat.stock} {mat.unit}</strong> • Harga: <strong className="text-emerald-600">{formatRupiah(mat.discountedPrice)}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="text-xs font-bold">
                        Edit Stok
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. ADMIN OPERASIONAL DASHBOARD */}
        {/* ========================================================================= */}
        {user?.role === "ADMIN" && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* Admin Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Total GMV Transaksi:</span>
                <div className="text-xl font-black text-foreground">Rp 48.500.000</div>
                <span className="text-[11px] text-emerald-600 font-bold">Bulan Ini (Jabodetabek)</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Komisi Platform (10%):</span>
                <div className="text-xl font-black text-primary">Rp 4.850.000</div>
                <span className="text-[11px] text-muted-foreground">Net Revenue Platform</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Mitra Tukang Aktif:</span>
                <div className="text-xl font-black text-amber-500">250+ Mandor</div>
                <span className="text-[11px] text-muted-foreground">100% Lolos Verifikasi K3</span>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-1 shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">Limbah Dialihkan (TPA):</span>
                <div className="text-xl font-black text-emerald-600">12.500 kg</div>
                <span className="text-[11px] text-muted-foreground">Sirkular agregat & surplus</span>
              </div>
            </div>

            {/* Tukang Verification Queue */}
            <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Antrian Verifikasi Mitra Tukang Baru</h2>
                  <p className="text-xs text-muted-foreground">Pemeriksaan KTP, sertifikat keahlian, dan pemberian lencana mutu KLIKO.</p>
                </div>
                <Badge variant="orange" className="text-xs font-bold">
                  {pendingTukang.length} Menunggu Approval
                </Badge>
              </div>

              {pendingTukang.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  Semua mitra tukang telah diverifikasi!
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingTukang.map((tk) => (
                    <div
                      key={tk.id}
                      className="p-4 rounded-2xl border border-border bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-foreground">{tk.name}</h4>
                          <span className="text-xs text-muted-foreground">({tk.city})</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Keahlian: <strong>{tk.skill}</strong> • Pengalaman: <strong>{tk.exp} Tahun</strong> • No. KTP: {tk.ktp}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleApproveTukang(tk.id)}
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Verifikasi & Beri Badge</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Seller Add Material Modal */}
      <Dialog open={newMaterialModal} onOpenChange={setNewMaterialModal}>
        <DialogContent className="sm:max-w-md">
          {listingSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="h-14 w-14 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <DialogTitle className="text-xl font-bold">Material Berhasil Didaftarkan!</DialogTitle>
              <p className="text-xs text-muted-foreground">
                Item sisa proyek Anda sekarang tayang di Circular Marketplace KLIKO dan dapat dibeli oleh homeowner & tukang.
              </p>
              <Button onClick={() => { setNewMaterialModal(false); setListingSuccess(false); }} variant="eco" className="font-bold">
                Tutup & Selesai
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-emerald-600" />
                  <span>Jual Sisa Material Proyek</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Daftarkan sisa ubin, cat, semen, baja yang tidak terpakai dari proyek Anda.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3.5 py-2 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-muted-foreground">Nama & Merek Material</label>
                  <input
                    type="text"
                    placeholder="Contoh: Sisa 20 Dus Granit Roman 60x60"
                    value={newMatTitle}
                    onChange={(e) => setNewMatTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-input bg-background font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-muted-foreground">Kategori</label>
                    <select
                      value={newMatCategory}
                      onChange={(e) => setNewMatCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-input bg-background font-medium"
                    >
                      <option>Keramik & Granit</option>
                      <option>Cat & Finishing</option>
                      <option>Baja Ringan & Besi</option>
                      <option>Puing Agregat</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-muted-foreground">Jumlah Stok</label>
                    <input
                      type="number"
                      value={newMatStock}
                      onChange={(e) => setNewMatStock(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-input bg-background font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-muted-foreground">Harga Jual Diskon (Rp)</label>
                  <input
                    type="number"
                    value={newMatPrice}
                    onChange={(e) => setNewMatPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-input bg-background font-medium"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setNewMaterialModal(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddMaterial} variant="eco" className="font-bold">
                  Publikasikan ke Marketplace
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Tukang Upload Photo Modal */}
      <Dialog open={uploadModal} onOpenChange={setUploadModal}>
        <DialogContent className="sm:max-w-md">
          {uploadSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="h-14 w-14 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <DialogTitle className="text-xl font-bold">Foto Pekerjaan Berhasil Diunggah!</DialogTitle>
              <p className="text-xs text-muted-foreground">
                Dokumentasi foto {uploadType === "after" ? "After" : "Before"} tersimpan di sistem verifikasi. Klien dapat langsung melihat hasil kerja Anda.
              </p>
              <Button onClick={() => setUploadModal(false)} className="font-bold">
                Tutup
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  <span>Upload Foto {uploadType === "after" ? "Hasil Akhir (After)" : "Kondisi Awal (Before)"}</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Order #KLK-20260830-001 (Paket Bangun Kanopi 15m²)
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="p-6 border-2 border-dashed border-border rounded-2xl text-center space-y-2 bg-muted/40">
                  <Camera className="h-8 w-8 text-primary mx-auto" />
                  <div className="text-xs font-bold text-foreground">
                    Pilih foto dari kamera smartphone atau galeri
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Format JPG, PNG (Maks 10MB). Pastikan sudut pengambilan foto jelas.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadModal(false)}>
                  Batal
                </Button>
                <Button onClick={() => setUploadSuccess(true)} className="font-bold">
                  Simpan & Unggah Foto
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
