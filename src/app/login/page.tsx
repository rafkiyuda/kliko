"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Hammer, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Mail, 
  HelpCircle,
  Award,
  Recycle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth, UserRole, PRESET_USERS } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [selectedRole, setSelectedRole] = React.useState<UserRole>("CUSTOMER");
  const [email, setEmail] = React.useState(PRESET_USERS.CUSTOMER.email);
  const [password, setPassword] = React.useState("••••••••");

  const rolesList: {
    role: UserRole;
    title: string;
    subtitle: string;
    name: string;
    icon: any;
    color: string;
    features: string[];
    badgeText: string;
  }[] = [
    {
      role: "CUSTOMER",
      title: "Customer / Pemilik Rumah",
      subtitle: "Pesan tukang tanpa nego, beli material murah & tracking garansi",
      name: "Bpk. Aditya Pratama (Jakarta Selatan)",
      icon: User,
      color: "border-orange-500/40 bg-orange-500/5 hover:border-orange-500",
      badgeText: "Pemesan Jasa",
      features: [
        "Pesan Jasa Tukang Fixed-Price",
        "Beli Material Surplus Diskon s.d 40%",
        "Pantau Foto Before-After Pekerjaan",
        "Klaim Garansi Resmi 14-30 Hari",
      ],
    },
    {
      role: "TUKANG",
      title: "Mitra Tukang / Mandor",
      subtitle: "Terima job otomatis, upload foto pengerjaan & cairkan upah pasti",
      name: "Kang Asep Saepudin (Gold Master)",
      icon: Hammer,
      color: "border-amber-500/40 bg-amber-500/5 hover:border-amber-500",
      badgeText: "Penyedia Jasa",
      features: [
        "Terima Notifikasi Job Baru Terdekat",
        "Upload Foto Kondisi Sebelum & Sesudah",
        "Pantau Dompet & Upah Kerja Harian",
        "Tingkatkan Rating & Lencana Digital",
      ],
    },
    {
      role: "SELLER",
      title: "Seller / Kontraktor Surplus",
      subtitle: "Monetisasi sisa material proyek daripada dibuang ke TPA",
      name: "PT Graha Citra Konstruksi (Bpk. Rudi)",
      icon: Recycle,
      color: "border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500",
      badgeText: "Penyedia Material",
      features: [
        "Daftarkan Ubin, Cat, Baja Sisa Proyek",
        "Kelola Stok Inventaris Gudang",
        "Integrasi Pengiriman Lalamove",
        "Laporan Pendapatan Penjualan",
      ],
    },
    {
      role: "ADMIN",
      title: "Admin & Operasional KLIKO",
      subtitle: "Audit mutu tukang, kurasi material sirkular & kelola transaksi",
      name: "Tim Operasional KLIKO (HQ)",
      icon: ShieldCheck,
      color: "border-blue-500/40 bg-blue-500/5 hover:border-blue-500",
      badgeText: "Manajemen Platform",
      features: [
        "Verifikasi KTP & Sertifikat Mitra Tukang",
        "Approval Kurasi Kualitas Material Sisa",
        "Pantau Arus Transaksi & Komisi",
        "Pusat Resolusi Kendala & Dispute",
      ],
    },
  ];

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(PRESET_USERS[role].email);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    router.push("/dashboard");
  };

  const handleQuickSimulation = (role: UserRole) => {
    login(role);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-background flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-primary border border-orange-500/20 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Simulasi Login Multi-Peran KLIKO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Pilih Peran untuk Masuk ke Platform
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Platform KLIKO memiliki antarmuka khusus untuk masing-masing peran. Pilih simulasi profil di bawah untuk melihat pengalaman pengguna secara nyata:
          </p>
        </div>

        {/* 4 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rolesList.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedRole === item.role;

            return (
              <div
                key={item.role}
                onClick={() => handleSelectRole(item.role)}
                className={`rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 relative ${
                  isSelected
                    ? `${item.color} ring-2 ring-primary shadow-lg scale-[1.02]`
                    : "bg-card border-border/80 hover:border-primary/50 shadow-xs"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                    DIPILIH ✓
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-2xl bg-background border border-border flex items-center justify-center text-primary shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {item.badgeText}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/60 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Akses Fitur:
                    </span>
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-foreground/80 leading-tight">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickSimulation(item.role);
                    }}
                    className="w-full font-bold text-xs h-9 justify-center gap-1"
                  >
                    <span>Masuk Langsung</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conventional Form Card */}
        <div className="max-w-md mx-auto bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-md space-y-5">
          <div className="text-center space-y-1">
            <h3 className="font-bold text-lg text-foreground">
              Form Login Terpilih ({rolesList.find(r => r.role === selectedRole)?.title})
            </h3>
            <p className="text-xs text-muted-foreground">
              Akun demo sudah terisi otomatis sesuai peran di atas.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">Email Pengguna</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-sm font-bold gap-2 shadow-md shadow-orange-500/25">
              <span>Masuk ke Dashboard {selectedRole}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            <HelpCircle className="h-3.5 w-3.5 text-primary" />
            <span>Peran login dapat diganti kapan saja dari menu navigasi.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
