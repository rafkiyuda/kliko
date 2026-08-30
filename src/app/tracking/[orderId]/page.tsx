"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Hammer, 
  Star, 
  Layers, 
  ArrowLeft, 
  MessageSquare,
  AlertCircle,
  FileCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = (params?.orderId as string) || "ord-101";
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];

  const [activePhotoTab, setActivePhotoTab] = React.useState<"after" | "before" | "sidebyside">("sidebyside");

  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Kembali ke Dashboard</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                Status Pesanan: {order.orderNumber}
              </h1>
              <Badge variant={order.status === "COMPLETED" ? "verified" : "orange"} className="text-xs">
                {order.status === "COMPLETED" ? "✅ Selesai & Bergaransi" : "⚡ Sedang Dikerjakan"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Bantuan CS WhatsApp</span>
            </Button>
          </div>
        </div>

        {/* Progress Tracker Bar */}
        <div className="bg-card p-6 rounded-3xl border border-border shadow-xs space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-foreground">Progres Pengerjaan Lapangan</span>
            <span className="font-black text-primary text-sm">{order.progressPercent}% Selesai</span>
          </div>

          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${order.progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>1. Order Terjadwal</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>2. Foto Before Diunggah</span>
            </div>
            <div className={`flex items-center gap-2 font-bold ${order.progressPercent >= 75 ? "text-emerald-600" : "text-muted-foreground"}`}>
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>3. Pengerjaan Selesai</span>
            </div>
            <div className={`flex items-center gap-2 font-bold ${order.progressPercent === 100 ? "text-emerald-600" : "text-muted-foreground"}`}>
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>4. Garansi Aktif</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Before-After Verification on Left, Tukang & Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Before vs After Photo Logs */}
          <div className="lg:col-span-7 bg-card rounded-3xl p-6 border border-border shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  Verifikasi Mutu KLIKO
                </span>
                <h3 className="text-lg font-black text-foreground">
                  Dokumentasi Foto Lapangan (Before vs After)
                </h3>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setActivePhotoTab("sidebyside")}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activePhotoTab === "sidebyside" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
                  }`}
                >
                  Berdampingan
                </button>
                <button
                  onClick={() => setActivePhotoTab("before")}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activePhotoTab === "before" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setActivePhotoTab("after")}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activePhotoTab === "after" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
                  }`}
                >
                  After
                </button>
              </div>
            </div>

            {/* Photo Cards Display */}
            {activePhotoTab === "sidebyside" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Before Photo */}
                <div className="space-y-2">
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-muted border border-border">
                    <img
                      src={order.beforeImageUrl}
                      alt="Kondisi Before"
                      className="w-full h-full object-cover"
                    />
                    <Badge variant="amber" className="absolute top-3 left-3 text-[10px] shadow-md font-black">
                      ⚠️ SEBELUM (BEFORE)
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground italic bg-muted/60 p-2.5 rounded-xl border border-border/50">
                    "{order.beforeNotes}"
                  </p>
                </div>

                {/* After Photo */}
                <div className="space-y-2">
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-muted border border-border">
                    <img
                      src={order.afterImageUrl}
                      alt="Hasil After"
                      className="w-full h-full object-cover"
                    />
                    <Badge variant="verified" className="absolute top-3 left-3 text-[10px] shadow-md font-black">
                      ✨ SESUDAH (AFTER)
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground italic bg-muted/60 p-2.5 rounded-xl border border-border/50">
                    "{order.afterNotes}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-muted border border-border">
                  <img
                    src={activePhotoTab === "after" ? order.afterImageUrl : order.beforeImageUrl}
                    alt={activePhotoTab}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    variant={activePhotoTab === "after" ? "verified" : "amber"}
                    className="absolute top-4 left-4 text-xs shadow-md font-black"
                  >
                    {activePhotoTab === "after" ? "✨ HASIL SESUDAH (AFTER)" : "⚠️ KONDISI SEBELUM (BEFORE)"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground italic bg-muted/60 p-3 rounded-xl border border-border/50">
                  "{activePhotoTab === "after" ? order.afterNotes : order.beforeNotes}"
                </p>
              </div>
            )}

            {/* Scope of Work Checklist */}
            <div className="pt-4 border-t border-border space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Verifikasi Checklist Tahapan Kerja (Scope of Work):
              </span>
              <div className="space-y-2">
                {order.scopeCompleted.map((sc, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold ${
                      sc.done
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                        : "bg-muted border-border text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`h-4 w-4 ${sc.done ? "text-emerald-600" : "text-muted-foreground"}`}
                      />
                      <span>{sc.name}</span>
                    </div>
                    <span>{sc.done ? "Selesai" : "Dalam Proses"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Mitra Tukang Profile & Order Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mitra Tukang Info Card */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-xs space-y-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Mitra Tukang Ditugaskan
              </span>
              <div className="flex items-center gap-3.5">
                <img
                  src={order.tukangAvatar}
                  alt={order.tukangName}
                  className="h-14 w-14 rounded-2xl object-cover ring-2 ring-primary"
                />
                <div>
                  <h4 className="font-extrabold text-base text-foreground">{order.tukangName}</h4>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-0.5">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span>4.95 Rating</span>
                    <span className="text-muted-foreground font-normal">• 200+ Job Selesai</span>
                  </div>
                  <Badge variant="gold" className="text-[10px] mt-1">
                    👑 Gold Master Tukang
                  </Badge>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  <span>Hubungi Mitra</span>
                </Button>
              </div>
            </div>

            {/* Order Summary & Warranty Card */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-xs space-y-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Rincian Pesanan
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Layanan / Paket:</span>
                  <span className="font-bold text-foreground text-right">{order.serviceTitle}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Jadwal Pengerjaan:</span>
                  <span className="font-bold text-foreground">{order.scheduledDate}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Lokasi:</span>
                  <span className="font-bold text-foreground text-right">{order.address}, {order.city}</span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between items-baseline text-sm">
                  <span className="font-bold text-foreground">Total Tagihan (Fixed):</span>
                  <span className="text-xl font-black text-primary">
                    {formatRupiah(order.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Warranty Badge Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Garansi Resmi KLIKO Aktif</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Masa garansi tersisa <strong>{order.warrantyDaysRemaining} hari</strong>. Jika ada kendala hasil kerja, klik tombol klaim untuk perbaikan gratis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
