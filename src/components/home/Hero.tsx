"use client";

import Link from "next/link";
import { 
  Hammer, 
  Recycle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown, 
  Star,
  Users,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Background Gradients & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/15 dark:bg-orange-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-emerald-500/15 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs md:text-sm font-bold shadow-xs">
              <Sparkles className="h-4 w-4" />
              <span>Platform On-Demand Konstruksi & Material Sirkular #1</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
              Klik Sekali, <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                Semua Urusan
              </span>{" "}
              Konstruksi Beres.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Pesan jasa tukang terverifikasi dengan <strong>tarif pasti (fixed price)</strong> tanpa nego melelahkan. Dapatkan material sisa proyek berkualitas <em>“Brand New”</em> dengan diskon s.d <strong>40%</strong> via Circular Marketplace.
            </p>

            {/* 3 Core Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-card border border-border/80 shadow-xs">
                <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-foreground">Harga Pasti & Fix</div>
                  <div className="text-muted-foreground">Tanpa biaya siluman</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-card border border-border/80 shadow-xs">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Recycle className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-foreground">Material Sirkular</div>
                  <div className="text-muted-foreground">Hemat 30-45%</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-card border border-border/80 shadow-xs">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-foreground">Garansi 30 Hari</div>
                  <div className="text-muted-foreground">Before-after tercatat</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons - Cleanly Fitted without Colliding */}
            <div className="pt-3 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-center lg:justify-start">
                <Link href="/ai-scanner" className="shrink-0">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-extrabold shadow-lg shadow-orange-500/25 px-5">
                    <Sparkles className="h-4.5 w-4.5" />
                    <span>AI Scan Kerusakan</span>
                  </Button>
                </Link>

                <Link href="/services" className="shrink-0">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 font-bold px-5">
                    <Hammer className="h-4 w-4 text-primary" />
                    <span>Pesan Tukang Instan</span>
                  </Button>
                </Link>
              </div>

              {/* Bundling Quick Sublink */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-muted-foreground pt-1">
                <span>Ingin lebih hemat?</span>
                <Link href="/bundling" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5" />
                  <span>Lihat Paket Bundling (Hemat 35%) →</span>
                </Link>
              </div>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
                  src="/images/tukang-joko.jpg"
                  alt="Pak Budi Santoso"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
                  src="/images/tukang-asep.jpg"
                  alt="Kang Asep"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
                  src="/images/tukang-joko.jpg"
                  alt="Pak Slamet"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  <span>4.92 / 5.0</span>
                  <span className="text-muted-foreground font-normal">(1.400+ Proyek Selesai)</span>
                </div>
                <span>Didukung 250+ Mitra Tukang Terverifikasi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden border border-border/80">
              {/* Highlight Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Live Booking Simulation
                  </span>
                </div>
                <Badge variant="verified">100% Verified Mitra</Badge>
              </div>

              {/* Sample Bundling Card */}
              <div className="mt-4 rounded-2xl bg-muted/60 p-4 border border-border/50 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                      Paket Bundling Terpopuler
                    </span>
                    <h3 className="text-base font-bold text-foreground">
                      Kanopi Baja Ringan & Atap Spandek (15 m²)
                    </h3>
                  </div>
                  <Badge variant="eco">-33% OFF</Badge>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center justify-between">
                    <span>12x Baja Ringan SNI (Surplus Grade A):</span>
                    <span className="line-through text-muted-foreground">Rp 1.380.000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>6x Atap Spandek Pasir + Baut:</span>
                    <span className="line-through text-muted-foreground">Rp 1.470.000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Jasa 2 Tukang Bersertifikasi (2 Hari):</span>
                    <span className="line-through text-muted-foreground">Rp 1.400.000</span>
                  </div>
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-sm font-bold text-foreground">
                    <span>Total Normal:</span>
                    <span className="line-through text-destructive">Rp 4.250.000</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-black text-emerald-600 dark:text-emerald-400">
                    <span>Harga Bundling KLIKO:</span>
                    <span>Rp 2.850.000</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/bundling">
                    <Button className="w-full justify-center text-xs h-9 font-bold">
                      Ambil Penawaran Paket Ini
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Before-After Floating Widget */}
              <div className="mt-4 p-3 rounded-2xl bg-card border border-border flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-xs">
                    📸
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-foreground">Before-After System</div>
                    <div className="text-muted-foreground">Foto wajib diunggah mitra tukang</div>
                  </div>
                </div>
                <Link href="/tracking/ord-101">
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">
                    Lihat Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
