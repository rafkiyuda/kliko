"use client";

import * as React from "react";
import { 
  Flame, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  TrendingDown, 
  Hammer, 
  PackageCheck,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { MOCK_BUNDLINGS, MockBundling } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";
import { MidtransPaymentModal } from "@/components/payment/MidtransPaymentModal";

export default function BundlingPage() {
  const [selectedBundle, setSelectedBundle] = React.useState<MockBundling | null>(null);
  const [bookingAddress, setBookingAddress] = React.useState<string>("Jl. Wijaya Timur II No. 18, Kebayoran Baru");
  const [bookingDate, setBookingDate] = React.useState<string>("2026-09-03");
  const [orderSuccess, setOrderSuccess] = React.useState<boolean>(false);
  const [paymentModalOpen, setPaymentModalOpen] = React.useState<boolean>(false);

  const handleOpenBundle = (bundle: MockBundling) => {
    setSelectedBundle(bundle);
    setOrderSuccess(false);
  };

  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" className="text-xs px-3.5 py-1 font-bold">
            <Flame className="h-3.5 w-3.5 mr-1" />
            One-Stop Bundling Solution
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Paket Bundling: Material Surplus + Jasa Tukang
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Tak perlu repot hitung kebutuhan material atau tawar-menawar tukang. Paket hemat KLIKO menggabungkan <strong>material proyek berkualitas dengan ongkos tukang ahli</strong> dalam satu harga pasti yang jauh lebih murah.
          </p>
        </div>

        {/* 3 Why Bundling Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-2.5">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">Hemat s.d 35% Total Biaya</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Material diambil dari surplus proyek berkualitas harga diskon, dipaketkan dengan biaya tukang terstandar.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-2.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <PackageCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">Bebas Repot Belanja Sendiri</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Semua kebutuhan baut, perekat, hingga material utama sudah disiapkan dan diantarkan langsung ke lokasi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-2.5">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-foreground">Garansi & Foto Before-After</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pengerjaan terstruktur dengan masa garansi hingga 30 hari dan bukti foto pengerjaan transparan di aplikasi.
            </p>
          </div>
        </div>

        {/* Bundling Packages List */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {MOCK_BUNDLINGS.map((bundle) => {
            const savingsAmount = bundle.totalNormalPrice - bundle.bundlingPrice;

            return (
              <div
                key={bundle.id}
                className="bg-card rounded-3xl border border-border/90 overflow-hidden shadow-lg hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-0 relative group"
              >
                {/* Left Image & Badge */}
                <div className="lg:col-span-5 relative h-64 lg:h-auto bg-muted overflow-hidden">
                  <img
                    src={bundle.imageUrl}
                    alt={bundle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge variant="orange" className="text-xs font-black shadow-md">
                      {bundle.badgeText}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    <span>Estimasi Pengerjaan: {bundle.estimatedDays} Hari Kerja</span>
                  </div>
                </div>

                {/* Right Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                        {bundle.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-foreground mt-1">
                        {bundle.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                        {bundle.description}
                      </p>
                    </div>

                    {/* Scope & Material Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                      {/* Material Included */}
                      <div className="p-3.5 rounded-xl bg-muted/60 border border-border/60 space-y-1.5">
                        <span className="font-bold text-foreground block flex items-center gap-1">
                          📦 Material Termasuk:
                        </span>
                        {bundle.materialsIncluded.map((mat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-muted-foreground">
                            <Check className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-tight">{mat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Scope of Work */}
                      <div className="p-3.5 rounded-xl bg-muted/60 border border-border/60 space-y-1.5">
                        <span className="font-bold text-foreground block flex items-center gap-1">
                          🔨 Rencana Kerja Tukang:
                        </span>
                        {bundle.scopeList.map((sc, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-muted-foreground">
                            <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-tight">{sc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground line-through">
                          {formatRupiah(bundle.totalNormalPrice)}
                        </span>
                        <Badge variant="eco" className="text-[10px]">
                          Hemat {formatRupiah(savingsAmount)}
                        </Badge>
                      </div>
                      <div className="text-2xl font-black text-primary">
                        {formatRupiah(bundle.bundlingPrice)}
                        <span className="text-xs font-normal text-muted-foreground"> (All-In Paket)</span>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      onClick={() => handleOpenBundle(bundle)}
                      className="font-bold gap-2 shadow-lg shadow-orange-500/25 shrink-0"
                    >
                      <span>Pesan Paket Bundling</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Bundle Dialog */}
      <Dialog open={!!selectedBundle} onOpenChange={(open) => !open && setSelectedBundle(null)}>
        <DialogContent className="sm:max-w-lg">
          {orderSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-black text-foreground">
                  Paket Bundling Berhasil Dipesan!
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Order ID: <strong>#BND-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </DialogDescription>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Material sisa proyek sedang disiapkan untuk pengiriman ke alamat Anda, dan mitra tukang telah ditugaskan sesuai jadwal.
              </p>
              <div className="pt-4 flex gap-3 justify-center">
                <Button onClick={() => setSelectedBundle(null)} className="font-bold">
                  Selesai & Cek di Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span>Konfirmasi Pesanan Paket Bundling</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  {selectedBundle?.title}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Schedule Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Jadwal Mulai Pengerjaan
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
                    Alamat Proyek (Pengiriman Material & Tukang)
                  </label>
                  <textarea
                    rows={2}
                    value={bookingAddress}
                    onChange={(e) => setBookingAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-input bg-background text-xs font-medium resize-none"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-card border border-border space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Harga Beli Terpisah:</span>
                    <span className="line-through">{formatRupiah(selectedBundle?.totalNormalPrice || 0)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Diskon Bundling Spesial (33%):</span>
                    <span>- {formatRupiah((selectedBundle?.totalNormalPrice || 0) - (selectedBundle?.bundlingPrice || 0))}</span>
                  </div>
                  <div className="pt-2 border-t border-border flex justify-between items-baseline">
                    <span className="text-sm font-bold text-foreground">Total All-In:</span>
                    <span className="text-xl font-black text-primary">
                      {formatRupiah(selectedBundle?.bundlingPrice || 0)}
                    </span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedBundle(null)}>
                  Batal
                </Button>
                <Button onClick={() => setPaymentModalOpen(true)} className="font-bold gap-1.5 bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/25">
                  <span>Bayar via Midtrans ({formatRupiah(selectedBundle?.bundlingPrice || 0)})</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Midtrans Payment Modal for Bundling */}
      {selectedBundle && (
        <MidtransPaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          title={`Paket Bundling: ${selectedBundle.title}`}
          grossAmount={selectedBundle.bundlingPrice}
          customerName="Bpk. Aditya Pratama"
          items={[
            {
              id: selectedBundle.id,
              name: selectedBundle.title,
              price: selectedBundle.bundlingPrice,
              quantity: 1,
            },
          ]}
          onSuccess={(orderId) => {
            setPaymentModalOpen(false);
            setOrderSuccess(true);
          }}
        />
      )}
    </div>
  );
}
