"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Hammer, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Check,
  Search,
  Filter,
  UserCheck,
  Zap,
  RotateCcw,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { MOCK_SERVICES, MOCK_TUKANGS, MockService } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";

function ServicesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category");
  const serviceTitleParam = searchParams.get("serviceTitle");
  const damageTitleParam = searchParams.get("damageTitle");
  const fromAiParam = searchParams.get("fromAi") === "true";

  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    categoryParam || "Semua"
  );
  const [searchQuery, setSearchQuery] = React.useState<string>(serviceTitleParam || "");
  const [bookingService, setBookingService] = React.useState<MockService | null>(null);
  const [bookingQty, setBookingQty] = React.useState<number>(1);
  const [bookingDate, setBookingDate] = React.useState<string>("2026-09-01");
  const [bookingAddress, setBookingAddress] = React.useState<string>("Jl. Kemang Raya No. 24, Jakarta Selatan");
  const [bookingSuccess, setBookingSuccess] = React.useState<boolean>(false);
  const [isAiFiltered, setIsAiFiltered] = React.useState<boolean>(fromAiParam);

  React.useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setIsAiFiltered(true);
    }
  }, [categoryParam]);

  const categories = [
    "Semua",
    "Elektronik & AC",
    "Lantai & Dinding",
    "Atap & Kanopi",
    "Cat & Dinding",
    "Plumbing & Sanitari",
    "Kelistrikan",
  ];

  // Filter Services
  const filteredServices = MOCK_SERVICES.filter((srv) => {
    const matchesCat = selectedCategory === "Semua" || srv.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(srv.category.toLowerCase());
    const matchesSearch = searchQuery === "" || 
                          srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filter Tukang based on selected category / AI specialty
  const filteredTukangs = MOCK_TUKANGS.filter((tk) => {
    if (selectedCategory === "Semua") return true;
    const cat = selectedCategory.toLowerCase();
    return tk.specialties.some((spec) => {
      const s = spec.toLowerCase();
      if (cat.includes("ac") && (s.includes("ac") || s.includes("hvac") || s.includes("elektronik"))) return true;
      if (cat.includes("plumbing") && (s.includes("plumbing") || s.includes("pipa") || s.includes("sanitari") || s.includes("sanitary"))) return true;
      if (cat.includes("cat") && (s.includes("cat") || s.includes("waterproofing"))) return true;
      if (cat.includes("atap") && (s.includes("atap") || s.includes("baja") || s.includes("kanopi") || s.includes("talang"))) return true;
      if (cat.includes("lantai") && (s.includes("keramik") || s.includes("granit") || s.includes("bata") || s.includes("plester"))) return true;
      if (cat.includes("listrik") && (s.includes("listrik") || s.includes("kelistrikan"))) return true;
      return s.includes(cat) || cat.includes(s);
    });
  });

  const handleResetFilter = () => {
    setSelectedCategory("Semua");
    setSearchQuery("");
    setIsAiFiltered(false);
    router.replace("/services");
  };

  const handleOpenBooking = (service: MockService) => {
    setBookingService(service);
    setBookingQty(service.priceType === "per_m2" ? 15 : 1);
    setBookingSuccess(false);
  };

  const calculateTotal = () => {
    if (!bookingService) return 0;
    return bookingService.basePrice * bookingQty;
  };

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-8">
        {/* Header Title */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="orange" className="text-xs px-3 py-1 font-bold">
            <Hammer className="h-3.5 w-3.5 mr-1" />
            Fixed-Price Instant Dispatch
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Layanan Jasa Tukang Terverifikasi
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Pesan tukang ahli bersertifikasi dengan <strong>harga pasti tanpa nego</strong>. Setiap pengerjaan dilengkapi rencana kerja jelas (*scope of work*), bukti foto *before-after*, dan masa garansi resmi.
          </p>
        </div>

        {/* AI Scan Filter Notification Banner */}
        {isAiFiltered && (
          <div className="p-4 rounded-2xl bg-linear-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 border border-orange-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in-50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="verified" className="text-[10px]">Filter AI Aktif</Badge>
                  <span className="text-sm font-bold text-foreground">
                    Kategori: {selectedCategory}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Menampilkan rekomendasi layanan dan <strong>{filteredTukangs.length} mitra tukang spesialis</strong> yang cocok untuk menangani kerusakan Anda.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilter}
              className="text-xs font-bold gap-1.5 shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Tampilkan Semua Layanan</span>
            </Button>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-card p-4 rounded-2xl border border-border shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsAiFiltered(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari layanan (misal: AC, Pipa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-input bg-background font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Pilihan Layanan ({filteredServices.length} Tersedia)
            </h2>
          </div>

          {filteredServices.length === 0 ? (
            <div className="py-12 text-center bg-card rounded-3xl border border-border space-y-3">
              <Hammer className="h-10 w-10 text-muted-foreground mx-auto" />
              <div className="font-bold text-base text-foreground">Layanan tidak ditemukan</div>
              <p className="text-xs text-muted-foreground">Coba ubah kata kunci pencarian atau ganti kategori.</p>
              <Button onClick={handleResetFilter} variant="outline" size="sm" className="font-bold text-xs">
                Reset Semua Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="rounded-3xl border border-border bg-card overflow-hidden shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between group"
                >
                  <div className="relative aspect-16/9 overflow-hidden bg-muted">
                    <img
                      src={service.imageUrl || "/images/keramik-lantai.jpg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="verified" className="text-[10px] shadow-sm">
                        Garansi {service.warrantyDays} Hari
                      </Badge>
                      {service.popular && (
                        <Badge variant="orange" className="text-[10px] shadow-sm">
                          Terpopuler
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        {service.category}
                      </span>
                      <h3 className="font-bold text-base text-foreground leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Scope Items */}
                    <div className="space-y-1.5 pt-2 border-t border-border/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Lingkup Kerja Termasuk:
                      </span>
                      {service.includedScope.slice(0, 3).map((scope, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{scope}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price & Action */}
                    <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-muted-foreground block">Tarif Pasti:</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-foreground">
                            {formatRupiah(service.basePrice)}
                          </span>
                          <span className="text-xs text-muted-foreground font-semibold">
                            / {service.unit}
                          </span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => handleOpenBooking(service)}
                        className="font-bold text-xs gap-1 shadow-xs"
                      >
                        <span>Pesan Jasa</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verified Specialized Tukang Section (Filtered to relevant specialists) */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  Mitra Tukang Terverifikasi {selectedCategory !== "Semua" ? `(${selectedCategory})` : ""}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {selectedCategory !== "Semua" 
                  ? `Menampilkan ${filteredTukangs.length} mitra tukang dengan spesialisasi keahlian ${selectedCategory}.`
                  : "Daftar mandor dan tukang ahli teruji bersertifikasi K3 dan evaluasi berkala."}
              </p>
            </div>
            <Badge variant="verified" className="self-start sm:self-auto">
              100% Lolos Uji Kompetensi
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTukangs.map((tukang) => (
              <div
                key={tukang.id}
                className="p-4 rounded-2xl border border-border/80 bg-background/50 hover:border-primary/50 transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={tukang.avatar}
                    alt={tukang.name}
                    className="h-12 w-12 rounded-xl object-cover ring-1 ring-border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-sm text-foreground truncate">{tukang.name}</h4>
                      <Badge variant={tukang.badge === "GOLD_MASTER" ? "amber" : "outline"} className="text-[9px] px-1.5 py-0 shrink-0 font-bold">
                        {tukang.badge === "GOLD_MASTER" ? "Gold Master" : "Silver"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center text-amber-500 font-bold">
                        <Star className="h-3 w-3 fill-amber-500 mr-0.5" />
                        {tukang.rating}
                      </span>
                      <span>•</span>
                      <span>{tukang.completedJobs} Proyek</span>
                      <span>•</span>
                      <span>{tukang.yearsExperience} Thn Pengalaman</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {tukang.specialties.map((spec, idx) => (
                    <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-muted text-foreground/80">
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {tukang.bio}
                </p>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="truncate max-w-[150px]">{tukang.location.split("(")[0]}</span>
                  </span>
                  <span className="font-bold text-foreground">
                    {formatRupiah(tukang.dailyRate)}/hari
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Dialog Modal */}
      <Dialog open={!!bookingService} onOpenChange={(open) => !open && setBookingService(null)}>
        <DialogContent className="sm:max-w-lg">
          {bookingSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-bold">Pemesanan Berhasil Dikonfirmasi!</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Order #KLK-{Date.now().toString().slice(-6)} telah tercatat. Mitra tukang terdekat di area Anda akan segera menuju lokasi sesuai jadwal.
                </DialogDescription>
              </div>

              <div className="p-4 rounded-2xl bg-muted text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Layanan:</span>
                  <span className="font-bold text-foreground">{bookingService?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="font-bold text-foreground">{bookingQty} {bookingService?.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Jadwal Mulai:</span>
                  <span className="font-bold text-foreground">{bookingDate}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border font-bold">
                  <span>Total Tagihan:</span>
                  <span className="text-primary text-sm">{formatRupiah(calculateTotal())}</span>
                </div>
              </div>

              <Button onClick={() => setBookingService(null)} className="w-full font-bold">
                Tutup & Selesai
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <Hammer className="h-5 w-5 text-primary" />
                  <span>Pesan Layanan: {bookingService?.title}</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Tarif fixed price transparan tanpa biaya tersembunyi.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Quantity Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Volume Pekerjaan ({bookingService?.unit})
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={bookingQty}
                      onChange={(e) => setBookingQty(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2.5 rounded-xl border border-input bg-background font-bold text-sm"
                    />
                    <span className="text-sm font-bold text-muted-foreground shrink-0">
                      {bookingService?.unit}
                    </span>
                  </div>
                </div>

                {/* Schedule Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Jadwal Mulai Pekerjaan
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-input bg-background text-sm font-medium"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Alamat Lokasi Pengerjaan
                  </label>
                  <textarea
                    rows={2}
                    value={bookingAddress}
                    onChange={(e) => setBookingAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-input bg-background text-xs font-medium resize-none"
                  />
                </div>

                {/* Total Cost Box */}
                <div className="p-4 rounded-2xl bg-muted border border-border space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Tarif per {bookingService?.unit}:</span>
                    <span>{formatRupiah(bookingService?.basePrice || 0)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Garansi Pekerjaan:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {bookingService?.warrantyDays} Hari Resmi
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border/80 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-foreground">Total Pembayaran:</span>
                    <span className="text-xl font-black text-primary">
                      {formatRupiah(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setBookingService(null)}>
                  Batal
                </Button>
                <Button onClick={handleConfirmBooking} className="font-bold gap-1.5">
                  <span>Konfirmasi & Booking</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen py-20 text-center text-xs text-muted-foreground">Memuat layanan...</div>}>
      <ServicesContent />
    </React.Suspense>
  );
}
