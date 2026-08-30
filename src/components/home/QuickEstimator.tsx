"use client";

import * as React from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Check, Sparkles, TrendingDown, Layers, Hammer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";

interface ServiceOption {
  id: string;
  name: string;
  unit: string;
  baseLaborPrice: number;
  newMaterialPrice: number;
  circularMaterialPrice: number;
  defaultQty: number;
  minQty: number;
  maxQty: number;
  step: number;
  daysDivisor: number;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "keramik",
    name: "Pasang Keramik / Granit",
    unit: "m²",
    baseLaborPrice: 55000,
    newMaterialPrice: 165000,
    circularMaterialPrice: 95000,
    defaultQty: 20,
    minQty: 5,
    maxQty: 100,
    step: 5,
    daysDivisor: 10,
  },
  {
    id: "kanopi",
    name: "Bangun Kanopi Baja Ringan",
    unit: "m²",
    baseLaborPrice: 85000,
    newMaterialPrice: 195000,
    circularMaterialPrice: 105000,
    defaultQty: 15,
    minQty: 6,
    maxQty: 50,
    step: 1,
    daysDivisor: 8,
  },
  {
    id: "cat",
    name: "Pengecatan Dinding (2 Lapis)",
    unit: "m²",
    baseLaborPrice: 22000,
    newMaterialPrice: 45000,
    circularMaterialPrice: 25000,
    defaultQty: 40,
    minQty: 10,
    maxQty: 200,
    step: 10,
    daysDivisor: 25,
  },
  {
    id: "atap",
    name: "Reparasi Atap & Waterproofing",
    unit: "titik",
    baseLaborPrice: 175000,
    newMaterialPrice: 95000,
    circularMaterialPrice: 45000,
    defaultQty: 3,
    minQty: 1,
    maxQty: 10,
    step: 1,
    daysDivisor: 3,
  },
  {
    id: "plumbing",
    name: "Instalasi Pipa & Sanitari",
    unit: "titik",
    baseLaborPrice: 85000,
    newMaterialPrice: 65000,
    circularMaterialPrice: 35000,
    defaultQty: 4,
    minQty: 1,
    maxQty: 12,
    step: 1,
    daysDivisor: 4,
  },
];

export function QuickEstimator() {
  const [selectedService, setSelectedService] = React.useState<ServiceOption>(SERVICE_OPTIONS[0]);
  const [quantity, setQuantity] = React.useState<number>(SERVICE_OPTIONS[0].defaultQty);
  const [packageType, setPackageType] = React.useState<"bundling_circular" | "jasa_only" | "full_new">("bundling_circular");

  // Calculations
  const laborTotal = selectedService.baseLaborPrice * quantity;
  
  let materialTotal = 0;
  if (packageType === "bundling_circular") {
    materialTotal = selectedService.circularMaterialPrice * quantity;
  } else if (packageType === "full_new") {
    materialTotal = selectedService.newMaterialPrice * quantity;
  }

  // Bundling discount 10% on top if circular bundle selected
  const subtotal = laborTotal + materialTotal;
  const finalTotal = packageType === "bundling_circular" ? Math.round(subtotal * 0.9) : subtotal;

  const traditionalOfflineCost = Math.round((selectedService.baseLaborPrice * 1.35 + selectedService.newMaterialPrice * 1.15) * quantity);
  const totalSavings = Math.max(0, traditionalOfflineCost - finalTotal);
  const estimatedDays = Math.max(1, Math.ceil(quantity / selectedService.daysDivisor));

  const handleServiceChange = (service: ServiceOption) => {
    setSelectedService(service);
    setQuantity(service.defaultQty);
  };

  return (
    <section className="py-12 md:py-16 bg-muted/40 border-y border-border/70">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <Badge variant="orange" className="text-xs px-3 py-1 font-bold">
            <Calculator className="h-3.5 w-3.5 mr-1" />
            Transparansi Biaya Fixed Price
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Kalkulator Estimasi Cepat Biaya Renovasi
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Hitung sendiri estimasi biaya pengerjaan tanpa perlu khawatir biaya bengkak. Semua harga terstandarisasi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-md space-y-6">
            {/* Step 1: Select Service */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                1. Pilih Kategori Pekerjaan
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICE_OPTIONS.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => handleServiceChange(srv)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all flex flex-col justify-between h-20 cursor-pointer ${
                      selectedService.id === srv.id
                        ? "bg-primary/10 border-primary text-primary shadow-xs ring-1 ring-primary"
                        : "bg-background border-border hover:bg-muted/60 text-foreground"
                    }`}
                  >
                    <span>{srv.name}</span>
                    <span className="text-[11px] font-normal text-muted-foreground">
                      Rp {srv.baseLaborPrice.toLocaleString("id-ID")}/{srv.unit}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Slider Quantity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  2. Tentukan Volume Pekerjaan ({selectedService.unit})
                </label>
                <span className="text-base font-black text-primary px-3 py-1 bg-primary/10 rounded-lg">
                  {quantity} {selectedService.unit}
                </span>
              </div>
              <input
                type="range"
                min={selectedService.minQty}
                max={selectedService.maxQty}
                step={selectedService.step}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Min: {selectedService.minQty} {selectedService.unit}</span>
                <span>Max: {selectedService.maxQty} {selectedService.unit}</span>
              </div>
            </div>

            {/* Step 3: Package Mode */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                3. Pilih Opsi Paket Pembelian
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => setPackageType("bundling_circular")}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                    packageType === "bundling_circular"
                      ? "bg-emerald-500/10 border-emerald-500 text-foreground ring-1 ring-emerald-500 shadow-sm"
                      : "bg-background border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="absolute -top-2 -right-2 text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                    HEMAT 35%
                  </span>
                  <div className="font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-400">
                    Bundling Sirkular
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Jasa Tukang + Material Sisa Proyek Like-New
                  </div>
                </button>

                <button
                  onClick={() => setPackageType("jasa_only")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    packageType === "jasa_only"
                      ? "bg-primary/10 border-primary text-foreground ring-1 ring-primary shadow-sm"
                      : "bg-background border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-foreground">
                    Hanya Jasa Tukang
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Material disiapkan sendiri oleh Anda
                  </div>
                </button>

                <button
                  onClick={() => setPackageType("full_new")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    packageType === "full_new"
                      ? "bg-primary/10 border-primary text-foreground ring-1 ring-primary shadow-sm"
                      : "bg-background border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-foreground">
                    Jasa + Material Baru
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Material 100% dari toko bangunan mitra
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xl space-y-6 relative overflow-hidden">
            {packageType === "bundling_circular" && (
              <div className="absolute top-0 right-0 bg-linear-to-l from-emerald-500 to-emerald-600 text-white text-[11px] font-black px-4 py-1 rounded-bl-xl shadow-md">
                PILIHAN PALING HEMAT 🌱
              </div>
            )}

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Ringkasan Estimasi Biaya
              </span>
              <h3 className="text-xl font-bold text-foreground mt-1">
                {selectedService.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                Estimasi pengerjaan: <strong>{estimatedDays} hari kerja</strong>
              </p>
            </div>

            {/* Breakdown Table */}
            <div className="space-y-2.5 py-4 border-y border-border text-sm">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Jasa Tukang ({quantity} {selectedService.unit}):</span>
                <span className="font-semibold text-foreground">{formatRupiah(laborTotal)}</span>
              </div>

              {packageType !== "jasa_only" && (
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>
                    Material {packageType === "bundling_circular" ? "Sirkular (Diskon):" : "Baru:"}
                  </span>
                  <span className="font-semibold text-foreground">{formatRupiah(materialTotal)}</span>
                </div>
              )}

              {packageType === "bundling_circular" && (
                <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                  <span>Diskon Tambahan Paket Bundling (10%):</span>
                  <span>- {formatRupiah(Math.round(subtotal * 0.1))}</span>
                </div>
              )}

              <div className="pt-2 flex justify-between items-baseline">
                <span className="text-base font-bold text-foreground">Total Biaya KLIKO:</span>
                <span className="text-2xl font-black text-primary">
                  {formatRupiah(finalTotal)}
                </span>
              </div>
            </div>

            {/* Savings Comparison Box */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <TrendingDown className="h-4 w-4" />
                <span>Penghematan Dibanding Tukang Konvensional:</span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs text-muted-foreground line-through">
                  Biaya Offline: {formatRupiah(traditionalOfflineCost)}
                </span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  Hemat ~{formatRupiah(totalSavings)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link href="/services">
                <Button className="w-full justify-center gap-2 h-12 text-sm font-bold shadow-lg shadow-orange-500/25">
                  <span>Booking Layanan Ini Sekarang</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Termasuk Garansi Pekerjaan 14-30 Hari & Foto Before-After</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
