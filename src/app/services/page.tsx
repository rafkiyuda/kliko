"use client";

import * as React from "react";
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
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { MOCK_SERVICES, MOCK_TUKANGS, MockService } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Semua");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [bookingService, setBookingService] = React.useState<MockService | null>(null);
  const [bookingQty, setBookingQty] = React.useState<number>(10);
  const [bookingDate, setBookingDate] = React.useState<string>("2026-09-01");
  const [bookingAddress, setBookingAddress] = React.useState<string>("Jl. Kemang Raya No. 24, Jakarta Selatan");
  const [bookingSuccess, setBookingSuccess] = React.useState<boolean>(false);

  const categories = [
    "Semua",
    "Lantai & Dinding",
    "Atap & Kanopi",
    "Cat & Dinding",
    "Plumbing & Sanitari",
    "Kelistrikan",
  ];

  const filteredServices = MOCK_SERVICES.filter((srv) => {
    const matchesCat = selectedCategory === "Semua" || srv.category === selectedCategory;
    const matchesSearch = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenBooking = (service: MockService) => {
    setBookingService(service);
    setBookingQty(service.priceType === "per_m2" ? 15 : 2);
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
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-10">
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

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-card p-4 rounded-2xl border border-border shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-muted-foreground hover:text-foreground"
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
              placeholder="Cari jasa tukang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-input bg-background text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-xs">
                      {service.category}
                    </span>
                    {service.popular && (
                      <Badge variant="orange" className="text-[10px]">
                        🔥 Populer
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-foreground border border-border">
                    Garansi {service.warrantyDays} Hari
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Scope Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Scope of Work Tercover:
                    </span>
                    {service.includedScope.map((scope, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-foreground/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{scope}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Price & Booking CTA */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">
                      Tarif Tetap (Fixed)
                    </span>
                    <span className="text-xl font-black text-foreground">
                      {formatRupiah(service.basePrice)}
                      <span className="text-xs font-normal text-muted-foreground">/{service.unit}</span>
                    </span>
                  </div>

                  <Button
                    onClick={() => handleOpenBooking(service)}
                    className="font-bold gap-1.5 shadow-md shadow-orange-500/20"
                  >
                    <span>Pesan Instan</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Tukang Partners Showcase */}
        <div className="pt-12 space-y-6">
          <div className="space-y-1">
            <Badge variant="verified" className="text-xs px-3 py-1 font-bold">
              <UserCheck className="h-3.5 w-3.5 mr-1" />
              Mitra Tukang Siap Dispatch
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Tukang Bersertifikasi & Terverifikasi
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Semua mitra telah melalui verifikasi KTP, uji keterampilan teknis, dan audit standar K3.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_TUKANGS.map((tukang) => (
              <div key={tukang.id} className="bg-card p-5 rounded-2xl border border-border shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={tukang.avatar}
                    alt={tukang.name}
                    className="h-12 w-12 rounded-xl object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{tukang.name}</h4>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      <span>{tukang.rating}</span>
                      <span className="text-muted-foreground font-normal">({tukang.reviewCount} ulasan)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <Badge variant={tukang.badge === "GOLD_MASTER" ? "gold" : "silver"}>
                    {tukang.badge === "GOLD_MASTER" ? "👑 Gold Master" : "⭐ Silver Mitra"}
                  </Badge>
                  <span className="text-muted-foreground font-medium">{tukang.yearsExperience} Thn Pengalaman</span>
                </div>

                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  {tukang.bio}
                </p>

                <div className="text-[11px] text-muted-foreground flex items-center gap-1 pt-1 border-t border-border">
                  <MapPin className="h-3 w-3 text-primary shrink-0" />
                  <span className="truncate">{tukang.location}</span>
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
            <div className="py-8 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-black text-foreground">
                  Pemesanan Berhasil Terkirim!
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Order ID: <strong>#KLK-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </DialogDescription>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Sistem sedang mencocokkan mitra tukang terdekat di area Anda. Rincian rencana kerja dan kontak tukang telah dikirim via WhatsApp Business KLIKO.
              </p>
              <div className="pt-4 flex gap-3 justify-center">
                <Button onClick={() => setBookingService(null)} className="font-bold">
                  Selesai & Tutup
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
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
