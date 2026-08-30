"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, Eye, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function BeforeAfterShowcase() {
  const [activeTab, setActiveTab] = React.useState<"after" | "before">("after");

  return (
    <section className="py-16 md:py-24 bg-muted/40 border-y border-border/70">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive Visual Comparison */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-card aspect-4/3 group">
              {/* Photo Display */}
              <img
                src={
                  activeTab === "after"
                    ? "/images/kanopi-carport.jpg"
                    : "/images/before-renovasi.jpg"
                }
                alt="Before After Showcase"
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Top Status Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <Badge
                  variant={activeTab === "after" ? "verified" : "amber"}
                  className="text-xs px-3 py-1 font-bold shadow-lg"
                >
                  {activeTab === "after" ? "✨ HASIL SESUDAH (AFTER)" : "⚠️ KONDISI SEBELUM (BEFORE)"}
                </Badge>
                <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-white/20">
                  Order ID: #KLK-20260828-089
                </div>
              </div>

              {/* Bottom Toggle Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-md p-1 rounded-full border border-border shadow-xl flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("before")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "before"
                      ? "bg-amber-500 text-slate-900 shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Lihat Foto SEBELUM
                </button>
                <button
                  onClick={() => setActiveTab("after")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "after"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Lihat Hasil SESUDAH
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Foto wajib diunggah mitra tukang langsung dari lokasi kerja via aplikasi KLIKO</span>
              </div>
              <span className="font-bold text-foreground">100% Otentik</span>
            </div>
          </div>

          {/* Right: Explanation & Differentiator */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="orange" className="text-xs px-3 py-1 font-bold">
              <Eye className="h-3.5 w-3.5 mr-1" />
              Sistem Transparansi Mutlak
            </Badge>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              Bukan Cuma Panggil Tukang, Tapi Punya Rencana Kerja & Bukti Nyata
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Banyak platform lain hanya mencocokkan tukang tanpa peduli bagaimana pekerjaannya diselesaikan. Di <strong>KLIKO</strong>, setiap proyek memiliki rencana kerja bertahap (*Scope of Work*) dan verifikasi foto sebelum-sesudah untuk memastikan kualitas standar terbaik.
            </p>

            {/* Checklist of Features */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 font-bold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Scope of Work Terstruktur</div>
                  <div className="text-xs text-muted-foreground">Tukang wajib menyelesaikan checklist pekerjaan yang telah disetujui bersama.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 font-bold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Live Foto Before-After di Aplikasi</div>
                  <div className="text-xs text-muted-foreground">Konsumen dapat memantau progres langsung dari smartphone tanpa perlu repot menunggui di lokasi sepanjang hari.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 font-bold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Garansi Retur Perbaikan Otomatis</div>
                  <div className="text-xs text-muted-foreground">Jika hasil tidak sesuai kesepakatan, tukang akan datang kembali tanpa tambahan biaya jasa.</div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/tracking/ord-101">
                <Button className="gap-2 font-bold">
                  <span>Coba Fitur Live Tracking Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
