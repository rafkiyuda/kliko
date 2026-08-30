import Link from "next/link";
import { Hammer, Recycle, ShieldCheck, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/KLIKO-logo.png"
                alt="KLIKO Logo"
                className="h-9 w-9 object-contain rounded-xl shadow-xs"
              />
              <span className="font-black text-xl tracking-tight">KLIKO</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                Circular Economy
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Platform ekosistem on-demand konstruksi dan renovasi no. 1 di Indonesia. Menggabungkan jasa tukang terverifikasi harga pasti dengan marketplace material sisa proyek untuk solusi bangun hemat & ramah lingkungan.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Recycle className="h-4 w-4" />
              <span>Mendukung Pengurangan 100+ Ton Limbah Konstruksi per Tahun</span>
            </div>
          </div>

          {/* Links: Layanan Jasa */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">
              Layanan Jasa
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Pasang Keramik & Granit
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Rangka Baja Ringan & Kanopi
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Pengecatan Interior/Eksterior
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Reparasi Atap Bocor
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Plumbing & Pipa Air
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Marketplace & Bundling */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">
              Sirkular & Hemat
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/marketplace" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Material Sisa Proyek</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-600 px-1.5 py-0.2 rounded-full font-bold">Baru</span>
                </Link>
              </li>
              <li>
                <Link href="/bundling" className="hover:text-primary transition-colors">
                  Paket Bundling Hemat 35%
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-primary transition-colors">
                  Puing & Agregat Daur Ulang
                </Link>
              </li>
              <li>
                <Link href="/tracking/ord-101" className="hover:text-primary transition-colors">
                  Sistem Before-After
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Daftar Jadi Mitra Tukang
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Transparency */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-foreground">
              Jaminan & Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5 text-xs text-foreground font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Garansi Pengerjaan s.d 30 Hari</span>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-foreground font-semibold">
                <Sparkles className="h-4 w-4 text-orange-500" />
                <span>Fixed Price Tanpa Nego Siluman</span>
              </li>
              <li className="pt-2 text-xs">
                Hubungi Customer Service WhatsApp:
                <br />
                <span className="font-bold text-foreground">+62 812-9988-KLIKO (55456)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 KLIKO (Klik Layanan Instan Konstruksi Online). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat untuk masa depan konstruksi sirkular & transparan di Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
