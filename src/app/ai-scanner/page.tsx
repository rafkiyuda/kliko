"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Camera, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Hammer, 
  Recycle, 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  DollarSign, 
  Trash2,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DamageAnalysisResult } from "@/lib/gemini";
import { formatRupiah } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const DEMO_PRESETS = [
  {
    id: "wastafel",
    label: "💧 Wastafel Bocor / Mampet",
    category: "Plumbing",
    notes: "Pipa pembuangan wastafel di bawah kabinet bocor dan air merembes keluar saat mencuci tangan.",
  },
  {
    id: "ac",
    label: "❄️ AC Menetes & Kurang Dingin",
    category: "Elektronik & HVAC",
    notes: "AC split 1 PK meneteskan air dari sisi kanan unit indoor dan hembusan angin terasa kurang dingin.",
  },
  {
    id: "dinding",
    label: "🏚️ Dinding Retak & Cat Mengelupas",
    category: "Dinding & Finishing",
    notes: "Dinding ruang tamu ada retak rambut dan cat lama menggelembung karena rembesan air.",
  },
  {
    id: "atap",
    label: "🌧️ Atap Genteng Bocor",
    category: "Atap & Kanopi",
    notes: "Atap rumah rembes saat hujan deras di area talang dan genteng ada yang bergeser.",
  },
];

export default function AiScannerPage() {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [notes, setNotes] = React.useState<string>(DEMO_PRESETS[0].notes);
  const [isAnalyzing, setIsAnalyzing] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<DamageAnalysisResult | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSelectPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setNotes(preset.notes);
    setResult(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        setSelectedImage(base64String);
        setPreviewUrl(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/ai/scan-damage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          notes: notes,
          userId: user?.id,
        }),
      });
      const data = await res.json();
      if (data.data) {
        setResult(data.data);
      }
    } catch (err) {
      console.error("Error analyzing image:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-orange-500/15 via-amber-500/15 to-emerald-500/15 text-primary border border-orange-500/30 text-xs font-black shadow-xs">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span>FITUR CERDAS: GOOGLE GEMINI AI VISION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            AI Deteksi Kerusakan & Estimasi Biaya
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Foto barang rumah tangga atau bagian rumah yang rusak. Gemini AI akan langsung <strong>mendiagnosa kerusakan</strong>, menghitung <strong>estimasi biaya perbaikan fixed-price</strong>, dan mencarikan solusi tukang serta material sisa termurah.
          </p>
        </div>

        {/* Preset Quick Test Pills */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block text-center">
            Pilih Contoh Cepat untuk Simulasi Diagnosa:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                  notes === preset.notes
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-card text-foreground border-border hover:bg-muted"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Input & Scanner Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Upload & Form Input */}
          <div className="lg:col-span-6 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-md space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  1. Foto Bagian yang Rusak (Opsional)
                </span>
                {previewUrl && (
                  <button
                    onClick={handleClearImage}
                    className="text-xs text-destructive hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Hapus Foto</span>
                  </button>
                )}
              </div>

              {/* Clean Upload Box - No bizarre fake default image */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative rounded-2xl overflow-hidden border-2 border-dashed border-border hover:border-primary/60 transition-all cursor-pointer group bg-muted/30 p-6 flex flex-col items-center justify-center min-h-[220px] text-center"
              >
                {previewUrl ? (
                  <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden shadow-xs">
                    <img
                      src={previewUrl}
                      alt="Foto Kerusakan"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 p-4 text-center">
                      <Camera className="h-7 w-7" />
                      <span className="text-xs font-bold">Klik untuk ganti foto</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="h-14 w-14 rounded-2xl bg-orange-500/10 text-primary flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                      <Upload className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        Upload Foto Kerusakan atau Ambil dari Kamera
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Mendukung format JPG, PNG (Maks 10MB)
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs font-bold gap-1.5 pointer-events-none"
                    >
                      <Camera className="h-3.5 w-3.5" />
                      <span>Pilih Foto</span>
                    </Button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* User Notes Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                2. Gejala / Keluhan Tambahan
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Air merembes keluar dari pipa bawah wastafel sejak kemarin..."
                className="w-full p-3 rounded-xl border border-input bg-background text-xs sm:text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Scan Trigger Button */}
            <Button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full h-13 rounded-2xl text-sm font-extrabold gap-2 bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Gemini AI Sedang Menganalisis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Mulai Analisis Kerusakan dengan Gemini AI</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          {/* Right Column: AI Analysis Result Dashboard */}
          <div className="lg:col-span-6 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xl space-y-6 relative overflow-hidden">
            {!result ? (
              <div className="py-16 text-center space-y-4">
                <div className="h-16 w-16 bg-orange-500/10 text-primary rounded-2xl flex items-center justify-center mx-auto ring-8 ring-orange-500/5">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-foreground">
                    Menunggu Analisis AI
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Pilih salah satu contoh kerusakan di atas atau upload foto Anda, lalu klik tombol <strong>"Mulai Analisis Kerusakan"</strong> untuk melihat diagnosa cerdas.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in-50 duration-500">
                {/* Result Header & Severity Badge */}
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                      Hasil Diagnosa AI • {result.itemName}
                    </span>
                    <h2 className="text-xl font-black text-foreground mt-0.5">
                      {result.damageTitle}
                    </h2>
                  </div>

                  <Badge
                    variant={
                      result.severity === "Parah" ? "destructive" :
                      result.severity === "Sedang" ? "orange" : "eco"
                    }
                    className="text-xs font-black shrink-0 px-3 py-1 shadow-xs"
                  >
                    Tingkat: {result.severity}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {result.damageDescription}
                </p>

                {/* Price Estimation Range Box */}
                <div className="p-4 rounded-2xl bg-linear-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 border border-orange-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <DollarSign className="h-4 w-4" />
                    <span>Estimasi Biaya Perbaikan (Fixed Price):</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-2xl font-black text-foreground">
                      {formatRupiah(result.estimatedMinPrice)} - {formatRupiah(result.estimatedMaxPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Termasuk Garansi KLIKO
                    </span>
                  </div>
                </div>

                {/* Recommended Service CTA */}
                <div className="p-4 rounded-2xl bg-muted/70 border border-border space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <Hammer className="h-4 w-4 text-primary" />
                      <span>Rekomendasi Jasa Tukang:</span>
                    </span>
                    <span className="font-bold text-primary">
                      {formatRupiah(result.recommendedServicePrice)} / Titik
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-foreground">
                    {result.recommendedService}
                  </h4>
                  <Link
                    href={`/services?category=${encodeURIComponent(result.recommendedCategory || "Semua")}&serviceTitle=${encodeURIComponent(result.recommendedService)}&damageTitle=${encodeURIComponent(result.damageTitle)}&fromAi=true`}
                  >
                    <Button size="sm" className="w-full font-bold text-xs gap-1.5 shadow-md shadow-orange-500/20">
                      <span>Pesan Tukang Spesialis Ini Sekarang</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>

                {/* Recommended Circular Materials */}
                {result.recommendedMaterials?.length > 0 && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <span className="flex items-center gap-1.5">
                        <Recycle className="h-4 w-4 text-emerald-600" />
                        <span>Komponen Pengganti (Circular Marketplace):</span>
                      </span>
                      <Badge variant="eco" className="text-[9px]">Hemat 35%</Badge>
                    </div>

                    <div className="space-y-1.5">
                      {result.recommendedMaterials.map((mat, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs text-foreground bg-background/80 p-2 rounded-xl border border-emerald-500/20">
                          <span className="font-semibold">{mat.name}</span>
                          <span className="font-black text-emerald-600 dark:text-emerald-400">
                            {formatRupiah(mat.estimatedPrice)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emergency Tips Advice */}
                {result.urgencyAdvice && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-300">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <span className="font-bold block">Tips Darurat Pertolongan Pertama:</span>
                      <p className="text-[11px] leading-relaxed mt-0.5 opacity-90">
                        {result.urgencyAdvice}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step-by-step Technical Fix */}
                {result.suggestedSteps?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Rencana Teknis Perbaikan Tukang:
                    </span>
                    <div className="space-y-1.5">
                      {result.suggestedSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-tight">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
