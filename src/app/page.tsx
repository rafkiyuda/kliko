import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { CircularBanner } from "@/components/home/CircularBanner";
import { BeforeAfterShowcase } from "@/components/home/BeforeAfterShowcase";
import { QuickEstimator } from "@/components/home/QuickEstimator";
import Link from "next/link";
import { Flame, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Grid */}
      <ServicesGrid />

      {/* 3. Circular Economy Banner */}
      <CircularBanner />

      {/* 4. Bundling CTA Section */}
      <section className="py-16 bg-linear-to-b from-background via-orange-500/5 to-background border-t border-border/60">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="rounded-3xl bg-linear-to-r from-orange-600 via-amber-600 to-orange-500 text-white p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wide">
                  <Flame className="h-4 w-4" />
                  <span>FITUR UNGGULAN: PAKET BUNDLING</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  Mau Bikin Garasi, Cat Rumah, atau Pasang Granit Tanpa Pusing?
                </h2>
                
                <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                  Pilih paket bundling terpadu KLIKO! Dapatkan kombinasi material surplus berkualitas tinggi langsung dengan jasa tukang ahli. Satu kali bayar, hemat biaya hingga 35%, dan pengerjaan bergaransi penuh.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-white/95">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Tanpa repot belanja material sendiri</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Garansi pengerjaan 14-30 hari</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link href="/bundling">
                  <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold shadow-xl gap-2 h-14 text-base">
                    <span>Lihat Semua Paket Bundling</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="glass" className="w-full text-white border-white/40 hover:bg-white/20 font-bold h-12">
                    Pesan Jasa Tukang Saja
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Before-After Transparency Showcase */}
      <BeforeAfterShowcase />

      {/* 6. Quick Cost Estimator (Di bagian paling bawah sebelum footer) */}
      <QuickEstimator />
    </div>
  );
}
