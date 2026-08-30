import Link from "next/link";
import { Recycle, Sparkles, TrendingUp, Building2, Truck, ArrowRight, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CircularBanner() {
  const steps = [
    {
      step: "01",
      title: "Material Sisa Proyek Dikumpulkan",
      description: "Kontraktor & pengembang mengunggah ubin, cat, kayu, atau puing beton sisa daripada dibuang ke TPA.",
      icon: Building2,
      color: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    },
    {
      step: "02",
      title: "Kurasi & Standarisasi KLIKO",
      description: "Tim ahli memeriksa kualitas material di holding yard. Puing dihancurkan jadi agregat paving, material sisa disegel ulang.",
      icon: ShieldCheck,
      color: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    },
    {
      step: "03",
      title: "Dijual Murah Kualitas 'Brand New'",
      description: "Konsumen dan tukang membeli material dengan diskon 30-50% untuk proyek renovasi hemat biaya.",
      icon: Recycle,
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    },
    {
      step: "04",
      title: "Pengantaran Cepat Armada Terpadu",
      description: "Bekerjasama dengan partner logistik instan (Lalamove, flatbed pickup) langsung tiba di lokasi konstruksi.",
      icon: Truck,
      color: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="eco" className="text-xs px-3 py-1 font-bold">
              <Leaf className="h-3.5 w-3.5 mr-1" />
              Circular Economy in Construction
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Ubah Limbah & Sisa Proyek Menjadi Solusi Renovasi Murah
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Tahukah Anda? 3% volume material konstruksi di Indonesia terbuang percuma (Nursin et al., 2014). KLIKO menghubungkan sisa proyek berkualitas dengan kebutuhan renovasi Anda.
            </p>
          </div>

          <Link href="/marketplace">
            <Button variant="eco" className="gap-2 shadow-md shadow-emerald-500/20 font-bold shrink-0">
              <Recycle className="h-4 w-4" />
              <span>Jelajahi Circular Marketplace</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* 4 Circular Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-card rounded-2xl p-6 border border-border/80 shadow-xs hover:shadow-md transition-all space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-black text-muted-foreground/30 group-hover:text-primary transition-colors">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Metric Banner */}
        <div className="mt-12 rounded-3xl bg-linear-to-r from-emerald-900/90 via-slate-900 to-emerald-950 text-white p-8 md:p-10 border border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-center">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-emerald-400">12.500+ kg</div>
              <div className="text-xs text-slate-300 font-medium">Limbah Konstruksi Berhasil Dialihkan dari TPA</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-amber-400">Rp 480 Juta+</div>
              <div className="text-xs text-slate-300 font-medium">Total Penghematan Biaya Material Pengguna</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-orange-400">100% Lolos Uji</div>
              <div className="text-xs text-slate-300 font-medium">Standar Kualitas & Integritas Struktural KLIKO</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
