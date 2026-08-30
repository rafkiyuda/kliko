"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Camera, 
  Upload, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Hammer, 
  Recycle, 
  ShieldAlert, 
  DollarSign, 
  Loader2,
  RefreshCw,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { formatRupiah } from "@/lib/utils";
import { DamageAnalysisResult } from "@/lib/gemini";

export default function AiScannerPage() {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [notes, setNotes] = React.useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<DamageAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        setSelectedImage(base64String);
        setPreviewUrl(reader.result as string);
        setResult(null);
        setErrorMessage(null);
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
    if (!selectedImage && (!notes || notes.trim().length === 0)) {
      setErrorMessage("Silakan upload foto kerusakan atau tuliskan deskripsi gejala kerusakan terlebih dahulu.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai/scan-damage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          notes: notes.trim() || undefined,
          userId: user?.id,
        }),
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menganalisis kerusakan dengan AI Gemini.");
      }

      if (data.data) {
        setResult(data.data);
      }
    } catch (err: any) {
      console.error("Error analyzing image:", err);
      setErrorMessage(err.message || "Terjadi kesalahan saat memproses diagnosa AI.");
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
            <span>GOOGLE GEMINI AI VISION & DAMAGE DETECTOR</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            AI Deteksi Kerusakan & Estimasi Biaya
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Foto barang rumah tangga atau bagian rumah yang rusak. Gemini AI akan langsung <strong>mendiagnosa kerusakan</strong>, menghitung <strong>estimasi biaya perbaikan fixed-price</strong>, dan mencarikan solusi tukang serta material termurah.
          </p>
        </div>

        {/* Main Input & Scanner Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Upload & Form Input */}
          <div className="lg:col-span-6 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-md space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  1. Foto Bagian yang Rusak
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

              {/* Clean Upload Dropzone */}
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

            {/* User Symptom Notes Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                2. Gejala / Catatan Kerusakan
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: AC kamar tidur tidak dingin dan meneteskan air dari bagian indoor, atau pipa wastafel bocor pada sambungan leher angsa..."
                className="w-full p-3.5 rounded-2xl border border-input bg-background text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary resize-none leading-relaxed"
              />
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs space-y-1.5 animate-in fade-in-50">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Gagal Memproses Diagnosa AI:</span>
                </div>
                <p className="leading-relaxed font-mono text-[11px] break-words bg-background/50 p-2.5 rounded-xl border border-destructive/20">
                  {errorMessage}
                </p>
                <p className="text-[11px] text-muted-foreground pt-0.5">
                  Pastikan variabel environment <strong>GEMINI_API_KEY</strong> terisi dengan benar di Vercel.
                </p>
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full py-6 rounded-2xl text-sm font-black gap-2 shadow-lg shadow-orange-500/25 bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Gemini AI Sedang Menganalisis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Mulai Analisis Kerusakan</span>
                </>
              )}
            </Button>
          </div>

          {/* Right Column: AI Analysis Result Display */}
          <div className="lg:col-span-6">
            {result ? (
              <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-md space-y-6 animate-in fade-in-50">
                {/* Result Title & Severity */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
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
                        <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-xl bg-background/60 border border-emerald-500/20">
                          <span className="font-medium text-foreground">{mat.name}</span>
                          <span className="font-bold text-emerald-600">{formatRupiah(mat.estimatedPrice)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emergency Advice */}
                {result.urgencyAdvice && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
                    <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Langkah Darurat Saat Ini:</strong>
                      <p className="mt-0.5 leading-relaxed">{result.urgencyAdvice}</p>
                    </div>
                  </div>
                )}

                {/* Technical Suggested Steps */}
                {result.suggestedSteps?.length > 0 && (
                  <div className="space-y-2 text-xs">
                    <span className="font-bold uppercase tracking-wider text-muted-foreground block">
                      Rencana Kerja Teknis:
                    </span>
                    <div className="space-y-1.5">
                      {result.suggestedSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-card/50 rounded-3xl p-10 border-2 border-dashed border-border flex flex-col items-center justify-center text-center min-h-[420px] space-y-4">
                <div className="h-16 w-16 rounded-3xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="font-bold text-base text-foreground">
                    Menunggu Foto & Diagnosa
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Upload foto atau tuliskan deskripsi kerusakan di sebelah kiri, lalu tekan tombol <strong>Mulai Analisis Kerusakan</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
