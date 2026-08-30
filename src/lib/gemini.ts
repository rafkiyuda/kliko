import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export const genAI = new GoogleGenerativeAI(apiKey);

export interface DamageAnalysisResult {
  itemName: string;
  damageTitle: string;
  damageDescription: string;
  severity: "Ringan" | "Sedang" | "Parah";
  estimatedMinPrice: number;
  estimatedMaxPrice: number;
  recommendedCategory: string; // e.g. "Elektronik & AC", "Plumbing & Sanitari", "Cat & Dinding", "Atap & Kanopi", "Lantai & Dinding", "Kelistrikan"
  recommendedService: string;
  recommendedServicePrice: number;
  recommendedMaterials: {
    name: string;
    estimatedPrice: number;
    isCircular: boolean;
  }[];
  urgencyAdvice: string;
  suggestedSteps: string[];
}

export async function analyzeDamageWithGemini(
  imageBase64?: string | null,
  mimeType?: string | null,
  userNotes?: string
): Promise<DamageAnalysisResult> {
  const modelNames = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-2.5-flash"];

  const prompt = `
Anda adalah konsultan teknis ahli konstruksi, renovasi, dan perbaikan rumah tangga dari platform "KLIKO" Indonesia.
Analisis laporan/gambar kerusakan rumah berikut ini dan berikan diagnosa komprehensif dalam format JSON murni (tanpa backticks markdown atau teks di luar JSON).

Deskripsi / Gejala Kerusakan: "${userNotes || "Analisis kerusakan ini dan berikan estimasi biaya perbaikan standar tukang profesional di Indonesia"}"

Format JSON yang wajib Anda kembalikan:
{
  "itemName": "Nama spesifik benda/bagian rumah (misal: Unit AC Split 1 PK, Wastafel Kamar Mandi, Dinding Plesteran, Atap Genteng & Talang, Pipa Air Bersih)",
  "damageTitle": "Judul singkat diagnosa kerusakan (misal: Talang Pembuangan Air AC Tersumbat & Freon Berkurang)",
  "damageDescription": "Penjelasan detail penyebab kerusakan dan dampaknya jika tidak segera diperbaiki (2-3 kalimat berbahasa Indonesia yang jelas)",
  "severity": "Ringan" | "Sedang" | "Parah",
  "estimatedMinPrice": (angka estimasi biaya minimum jasa + material dalam Rupiah, misal: 85000),
  "estimatedMaxPrice": (angka estimasi biaya maksimum jasa + material dalam Rupiah, misal: 250000),
  "recommendedCategory": "Pilih persis salah satu: 'Elektronik & AC' | 'Plumbing & Sanitari' | 'Cat & Dinding' | 'Atap & Kanopi' | 'Lantai & Dinding' | 'Kelistrikan'",
  "recommendedService": "Nama layanan jasa tukang KLIKO yang tepat (misal: Service, Cuci & Reparasi AC Menetes / Tidak Dingin)",
  "recommendedServicePrice": (angka tarif dasar jasa tukang dalam Rupiah, misal: 85000),
  "recommendedMaterials": [
    {
      "name": "Nama komponen/material pengganti (misal: Selang Pembuangan Fleksibel 2 Meter)",
      "estimatedPrice": (angka harga material dalam Rupiah, misal: 35000),
      "isCircular": true
    }
  ],
  "urgencyAdvice": "Tips darurat penanganan awal yang aman sebelum tukang datang",
  "suggestedSteps": [
    "Langkah 1 teknis perbaikan",
    "Langkah 2 teknis perbaikan",
    "Langkah 3 uji coba dan pengetesan"
  ]
}
`;

  let lastError: any = null;

  // Try available models sequentially
  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      let result;

      if (imageBase64 && imageBase64.length > 20) {
        const imagePart = {
          inlineData: {
            data: imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64,
            mimeType: mimeType || "image/jpeg",
          },
        };
        result = await model.generateContent([prompt, imagePart]);
      } else {
        result = await model.generateContent(prompt);
      }

      const responseText = result.response.text().trim();
      
      // Clean potential ```json ... ``` markdown wraps
      const cleanedJson = responseText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();

      const parsed = JSON.parse(cleanedJson);
      
      if (!parsed.recommendedCategory || parsed.recommendedCategory === "Semua") {
        parsed.recommendedCategory = mapToKlikoCategory(
          (parsed.itemName || "") + " " + (parsed.damageTitle || "") + " " + (parsed.recommendedService || "") + " " + (userNotes || "")
        );
      }

      if (!parsed.recommendedServicePrice) {
        parsed.recommendedServicePrice = parsed.estimatedMinPrice || 85000;
      }

      return parsed as DamageAnalysisResult;
    } catch (modelErr: any) {
      lastError = modelErr;
      console.warn(`Model ${modelName} error:`, modelErr);
    }
  }

  // Throw transparent error if API fails
  if (lastError) {
    const errorMsg = lastError.message || lastError.toString();
    throw new Error(`Google Gemini Error: ${errorMsg}`);
  }

  throw new Error("Gagal terhubung ke Google Gemini AI API.");
}

export function mapToKlikoCategory(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("ac") || lower.includes("dingin") || lower.includes("hvac") || lower.includes("freon") || lower.includes("pendingin")) {
    return "Elektronik & AC";
  }
  if (lower.includes("plumbing") || lower.includes("pipa") || lower.includes("wastafel") || lower.includes("kran") || lower.includes("wc") || lower.includes("toilet") || lower.includes("toren") || lower.includes("siphon")) {
    return "Plumbing & Sanitari";
  }
  if (lower.includes("cat") || lower.includes("dinding") || lower.includes("plamir") || lower.includes("tembok") || lower.includes("plester")) {
    return "Cat & Dinding";
  }
  if (lower.includes("atap") || lower.includes("genteng") || lower.includes("kanopi") || lower.includes("talang") || lower.includes("baja ringan") || lower.includes("spandek")) {
    return "Atap & Kanopi";
  }
  if (lower.includes("keramik") || lower.includes("granit") || lower.includes("lantai") || lower.includes("ubin") || lower.includes("marmer")) {
    return "Lantai & Dinding";
  }
  if (lower.includes("listrik") || lower.includes("lampu") || lower.includes("mcb") || lower.includes("saklar") || lower.includes("kabel")) {
    return "Kelistrikan";
  }
  return "Elektronik & AC";
}
