"use client";

import * as React from "react";
import { 
  Recycle, 
  Leaf, 
  Building2, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Check,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { MOCK_MATERIALS, MockMaterial } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";
import { MidtransPaymentModal } from "@/components/payment/MidtransPaymentModal";

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Semua");
  const [selectedCondition, setSelectedCondition] = React.useState<string>("Semua");
  const [searchQuery, setSearchQuery] = React.useState<string>("" );
  const [selectedMaterial, setSelectedMaterial] = React.useState<MockMaterial | null>(null);
  const [orderQty, setOrderQty] = React.useState<number>(1);
  const [orderSuccess, setOrderSuccess] = React.useState<boolean>(false);
  const [paymentModalOpen, setPaymentModalOpen] = React.useState<boolean>(false);

  const categories = [
    "Semua",
    "Keramik & Granit",
    "Cat & Finishing",
    "Baja Ringan & Besi",
    "Puing & Agregat Daur Ulang",
    "Kayu Kusen",
    "Pipa & Sanitari",
  ];

  const filteredMaterials = MOCK_MATERIALS.filter((mat) => {
    const matchesCat = selectedCategory === "Semua" || mat.category === selectedCategory;
    const matchesCond = selectedCondition === "Semua" || mat.condition === selectedCondition;
    const matchesSearch = mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mat.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesCond && matchesSearch;
  });

  const getConditionLabel = (cond: string) => {
    switch (cond) {
      case "SURPLUS_BRAND_NEW":
        return { label: "✨ Surplus Brand New", variant: "verified" as const };
      case "RECLAIMED_LIKE_NEW":
        return { label: "♻️ Reclaimed Like-New", variant: "eco" as const };
      case "UPCYCLED_RAW":
        return { label: "🌱 Agregat Daur Ulang", variant: "amber" as const };
      default:
        return { label: cond, variant: "default" as const };
    }
  };

  const handleOpenOrder = (material: MockMaterial) => {
    setSelectedMaterial(material);
    setOrderQty(1);
    setOrderSuccess(false);
  };

  const calculateTotal = () => {
    if (!selectedMaterial) return 0;
    return selectedMaterial.discountedPrice * orderQty;
  };

  const calculateSavings = () => {
    if (!selectedMaterial) return 0;
    return (selectedMaterial.originalPrice - selectedMaterial.discountedPrice) * orderQty;
  };

  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-10">
        {/* Header Section */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="eco" className="text-xs px-3 py-1 font-bold">
            <Recycle className="h-3.5 w-3.5 mr-1" />
            Circular Construction Marketplace
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Marketplace Material Sisa Proyek & Daur Ulang
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Temukan material sisa proyek kontraktor, ubin surplus bermerek, dan agregat puing daur ulang dengan <strong>diskon hingga 45%</strong>. Semua barang telah lolos uji standar kualitas KLIKO.
          </p>
        </div>

        {/* Impact Bar */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Leaf className="h-5 w-5" />
            </div>
            <div className="text-xs sm:text-sm">
              <div className="font-bold text-foreground">
                Setiap Pembelian Material Sirkular Berkontribusi Menyelamatkan Lingkungan
              </div>
              <div className="text-muted-foreground">
                Kurangi emisi karbon dan penumpukan limbah sisa proyek konstruksi di perkotaan.
              </div>
            </div>
          </div>
          <Badge variant="eco" className="shrink-0 text-xs py-1">
            🌱 100% Circular Economy
          </Badge>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 bg-card p-5 rounded-2xl border border-border shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-2 border-t border-border/60">
            {/* Condition Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <span className="text-xs font-bold text-muted-foreground shrink-0">Kondisi:</span>
              <button
                onClick={() => setSelectedCondition("Semua")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedCondition === "Semua" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                Semua Kondisi
              </button>
              <button
                onClick={() => setSelectedCondition("SURPLUS_BRAND_NEW")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedCondition === "SURPLUS_BRAND_NEW" ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                Surplus Baru (Segel)
              </button>
              <button
                onClick={() => setSelectedCondition("RECLAIMED_LIKE_NEW")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedCondition === "RECLAIMED_LIKE_NEW" ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                Reclaimed Like-New
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari cat, ubin, baja..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-input bg-background text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => {
            const cond = getConditionLabel(material.condition);
            const discountPercent = Math.round(
              ((material.originalPrice - material.discountedPrice) / material.originalPrice) * 100
            );

            return (
              <div
                key={material.id}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={material.imageUrl}
                      alt={material.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <Badge variant={cond.variant} className="text-[10px] shadow-xs">
                        {cond.label}
                      </Badge>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">
                        Hemat {discountPercent}%
                      </span>
                    </div>

                    {material.isGreenMaterial && (
                      <div className="absolute bottom-3 right-3 bg-emerald-950/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Leaf className="h-3 w-3" />
                        <span>Hemat {material.carbonSavedKg} kg CO₂</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-primary">{material.category}</span>
                      <span className="font-bold text-foreground">Sisa Stok: {material.stock} {material.unit}</span>
                    </div>

                    <h3 className="font-bold text-base text-foreground leading-snug group-hover:text-emerald-600 transition-colors">
                      {material.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {material.description}
                    </p>

                    {/* Seller Tag */}
                    <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1 truncate">
                        <Building2 className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="truncate">{material.sellerName}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <MapPin className="h-3 w-3 text-primary shrink-0" />
                        <span>{material.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Price & Buy */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-muted-foreground line-through block">
                        {formatRupiah(material.originalPrice)}
                      </span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {formatRupiah(material.discountedPrice)}
                        <span className="text-xs font-normal text-muted-foreground">/{material.unit}</span>
                      </span>
                    </div>

                    <Button
                      variant="eco"
                      size="sm"
                      onClick={() => handleOpenOrder(material)}
                      className="font-bold gap-1 text-xs shadow-md shadow-emerald-500/20"
                    >
                      <span>Beli / Klaim</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Material Order Modal */}
      <Dialog open={!!selectedMaterial} onOpenChange={(open) => !open && setSelectedMaterial(null)}>
        <DialogContent className="sm:max-w-lg">
          {orderSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-black text-foreground">
                  Pesanan Material Dikonfirmasi!
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Order ID: <strong>#MAT-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </DialogDescription>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Material Anda telah direservasi di holding yard KLIKO. Mitra kurir logistik (Lalamove Flatbed) akan diinstruksikan untuk mengirim ke alamat Anda.
              </p>
              <div className="pt-4 flex gap-3 justify-center">
                <Button onClick={() => setSelectedMaterial(null)} variant="eco" className="font-bold">
                  Selesai & Tutup
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-emerald-600" />
                  <span>Beli Material Surplus: {selectedMaterial?.title}</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Dijual oleh: <strong>{selectedMaterial?.sellerName}</strong> ({selectedMaterial?.location})
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Quantity Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Jumlah Pesanan ({selectedMaterial?.unit})
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={selectedMaterial?.stock || 10}
                      value={orderQty}
                      onChange={(e) => setOrderQty(Math.max(1, Math.min(selectedMaterial?.stock || 10, Number(e.target.value))))}
                      className="w-full p-2.5 rounded-xl border border-input bg-background font-bold text-sm"
                    />
                    <span className="text-xs font-bold text-muted-foreground shrink-0">
                      Maks: {selectedMaterial?.stock} {selectedMaterial?.unit}
                    </span>
                  </div>
                </div>

                {/* Delivery Logistics */}
                <div className="p-3 rounded-xl bg-muted border border-border space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Pengiriman: Lalamove / Pickup Terpadu</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Material siap diambil atau diantarkan langsung ke lokasi proyek Anda hari ini.
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-card border border-border space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Harga Toko Normal:</span>
                    <span className="line-through">{formatRupiah((selectedMaterial?.originalPrice || 0) * orderQty)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Total Penghematan Anda:</span>
                    <span>- {formatRupiah(calculateSavings())}</span>
                  </div>
                  <div className="pt-2 border-t border-border flex justify-between items-baseline">
                    <span className="text-sm font-bold text-foreground">Total Bayar:</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                      {formatRupiah(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedMaterial(null)}>
                  Batal
                </Button>
                <Button onClick={() => setPaymentModalOpen(true)} variant="eco" className="font-bold gap-1.5 shadow-md shadow-emerald-500/20">
                  <span>Bayar via Midtrans ({formatRupiah(calculateTotal())})</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Midtrans Payment Modal for Marketplace */}
      {selectedMaterial && (
        <MidtransPaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          title={`Material: ${selectedMaterial.title}`}
          grossAmount={calculateTotal()}
          customerName="Bpk. Aditya Pratama"
          items={[
            {
              id: selectedMaterial.id,
              name: selectedMaterial.title,
              price: selectedMaterial.discountedPrice,
              quantity: orderQty,
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
