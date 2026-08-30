import Link from "next/link";
import { Hammer, ArrowRight, ShieldCheck, Star, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_SERVICES } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";

export function ServicesGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <Badge variant="orange" className="text-xs px-3 py-1 font-bold">
              <Hammer className="h-3.5 w-3.5 mr-1" />
              Layanan Terstandar & Transparan
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Jasa Tukang On-Demand Tanpa Nego
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Pilih jenis pekerjaan, dapatkan mitra tukang terverifikasi, dan nikmati garansi pengerjaan.
            </p>
          </div>

          <Link href="/services">
            <Button variant="outline" className="gap-2 font-bold shrink-0">
              <span>Lihat Semua Layanan</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SERVICES.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-card rounded-2xl border border-border/80 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Image & Category */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-xs">
                    {service.category}
                  </span>
                  {service.popular && (
                    <Badge variant="orange" className="text-[10px]">
                      🔥 Terpopuler
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-foreground border border-border">
                  Garansi {service.warrantyDays} Hari
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Included Scope Pills */}
                  <div className="pt-2 space-y-1">
                    {service.includedScope.slice(0, 2).map((scope, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{scope}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase tracking-wider font-semibold">
                      Tarif Tetap (Fixed)
                    </span>
                    <div className="text-base font-black text-foreground">
                      {formatRupiah(service.basePrice)}
                      <span className="text-xs font-normal text-muted-foreground">/{service.unit}</span>
                    </div>
                  </div>

                  <Link href={`/services?selected=${service.id}`}>
                    <Button size="sm" className="font-bold gap-1 text-xs">
                      <span>Pesan</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
