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
Analisis laporan/gambar kerusakan rumah berikut ini dan berikan diagnosa komprehensif dalam format JSON murni (tanpa backticks markdown atau penjelasan tambahan di luar JSON).

Deskripsi / Gejala Kerusakan: "${userNotes || "Analisis kerusakan ini dan berikan estimasi biaya perbaikan standar tukang profesional di Indonesia"}"

Format JSON yang wajib Anda kembalikan (pastikan valid JSON):
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
    } catch (modelErr) {
      console.warn(`Model ${modelName} failed or unavailable, trying next model:`, modelErr);
    }
  }

  // Fallback if all API models fail
  console.warn("Using intelligent offline fallback analysis for:", userNotes);
  return getFallbackDamageAnalysis(userNotes);
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

export function getFallbackDamageAnalysis(notes?: string): DamageAnalysisResult {
  const lower = (notes || "").toLowerCase();
  
  if (lower.includes("ac") || lower.includes("dingin") || lower.includes("freon")) {
    return {
      itemName: "Unit Indoor AC Split (1 PK)",
      damageTitle: "Talang Pembuangan Air AC Tersumbat & Freon Berkurang",
      damageDescription: "Air menetes dari unit indoor akibat saluran pembuangan kondensasi tersumbat lumut dan filter udara kotor, menyebabkan pendinginan tidak optimal.",
      severity: "Sedang",
      estimatedMinPrice: 85000,
      estimatedMaxPrice: 220000,
      recommendedCategory: "Elektronik & AC",
      recommendedService: "Service, Cuci & Reparasi AC Menetes / Tidak Dingin",
      recommendedServicePrice: 85000,
      recommendedMaterials: [
        {
          name: "Selang Pembuangan Fleksibel AC 2 Meter",
          estimatedPrice: 35000,
          isCircular: true,
        },
        {
          name: "Freon R32 / R410A Refill",
          estimatedPrice: 95000,
          isCircular: false,
        },
      ],
      urgencyAdvice: "Matikan unit AC sementara waktu dan letakkan kain atau wadah di bawah tetesan untuk mencegah kerusakan plafon atau lantai.",
      suggestedSteps: [
        "Pembersihan evaporator dan blower indoor dengan steam washer",
        "Flushing pipa pembuangan air kondensasi hingga lancar",
        "Pemeriksaan tekanan gas freon dan amper kompresor outdoor",
      ],
    };
  }

  if (lower.includes("dinding") || lower.includes("retak") || lower.includes("cat") || lower.includes("tembok")) {
    return {
      itemName: "Dinding Plesteran Interior",
      damageTitle: "Retak Rambut Dinding & Pengelupasan Lapisan Cat",
      damageDescription: "Terjadi penyusutan plesteran semen dan kelembaban rembesan air hujan yang menyebabkan lapisan cat menggelembung dan retak.",
      severity: "Ringan",
      estimatedMinPrice: 120000,
      estimatedMaxPrice: 350000,
      recommendedCategory: "Cat & Dinding",
      recommendedService: "Pengecatan Dinding Rumah Interior & Eksterior",
      recommendedServicePrice: 22000,
      recommendedMaterials: [
        {
          name: "Plamir Mortar Semen Instan Anti-Retak (Surplus Sak)",
          estimatedPrice: 45000,
          isCircular: true,
        },
        {
          name: "Cat Dasar Sealer Alkali Killer Dulux/Avian",
          estimatedPrice: 85000,
          isCircular: true,
        },
      ],
      urgencyAdvice: "Hindari mengikis paksa retakan sebelum peralatan plamir dan sealer siap agar debu semen tidak menyebar ke furniture.",
      suggestedSteps: [
        "Pengikisan cat lama yang menggelembung dan pembersihan retakan",
        "Aplikasi semen instan fleksibel pengisi retak rambut",
        "Pelapisan cat dasar tahan alkali dan 2 lapis cat finishing merata",
      ],
    };
  }

  if (lower.includes("atap") || lower.includes("genteng") || lower.includes("talang") || lower.includes("kanopi")) {
    return {
      itemName: "Atap Genteng & Talang Rumah",
      damageTitle: "Kebocoran Titik Sambungan Talang & Genteng Bergeser",
      damageDescription: "Sambungan talang air seng mengalami korosi dan posisi beberapa genteng tanah liat bergeser akibat terpaan angin kencang sehingga air merembes ke plafon.",
      severity: "Sedang",
      estimatedMinPrice: 175000,
      estimatedMaxPrice: 380000,
      recommendedCategory: "Atap & Kanopi",
      recommendedService: "Perbaikan Atap Genteng Bocor & Talang Air",
      recommendedServicePrice: 175000,
      recommendedMaterials: [
        {
          name: "Waterproofing Fiber Serat No Drop 1kg",
          estimatedPrice: 65000,
          isCircular: true,
        },
      ],
      urgencyAdvice: "Tandai area plafon yang basah dengan pensil dan letakkan ember penampung air di bawahnya.",
      suggestedSteps: [
        "Pengembalian posisi genteng presisi",
        "Pelapisan serat fiber waterproofing 3 lapis",
        "Uji siram air untuk memastikan bebas bocor",
      ],
    };
  }

  // Default Wastafel / Plumbing
  return {
    itemName: "Wastafel Cuci Piring / Kamar Mandi",
    damageTitle: "Kebocoran Pipa Siphon & Sumbatan Saluran Pembuangan",
    damageDescription: "Sambungan pipa leher angsa (siphon trap) mengalami keausan gasket karet dan penumpukan endapan lemak sehingga air merembes ke bawah kabinet.",
    severity: "Sedang",
    estimatedMinPrice: 85000,
    estimatedMaxPrice: 195000,
    recommendedCategory: "Plumbing & Sanitari",
    recommendedService: "Instalasi Plumbing & Pipa Air Bersih/Kotor",
    recommendedServicePrice: 85000,
    recommendedMaterials: [
      {
        name: "Set Siphon P-Trap Wastafel PVC Anti-Karat",
        estimatedPrice: 55000,
        isCircular: true,
      },
      {
        name: "Seal Tape Karet Tebal & Klem Pipa",
        estimatedPrice: 15000,
        isCircular: false,
      },
    ],
    urgencyAdvice: "Putar searah jarum jam stop kran di bawah wastafel untuk menghentikan aliran air sementara waktu dan letakkan baskom kecil.",
    suggestedSteps: [
      "Pelepasan pipa siphon lama dan pembersihan drat saluran utama",
      "Pemasangan gasket karet baru dan penguncian mur ulir presisi",
      "Uji alir air bertekanan selama 3 menit untuk memastikan nol kebocoran",
    ],
  };
}
