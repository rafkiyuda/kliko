export interface MockTukang {
  id: string;
  name: string;
  avatar: string;
  badge: "GOLD_MASTER" | "SILVER" | "BRONZE";
  specialties: string[];
  yearsExperience: number;
  completedJobs: number;
  rating: number;
  reviewCount: number;
  dailyRate: number;
  location: string;
  isVerified: boolean;
  bio: string;
}

export interface MockService {
  id: string;
  title: string;
  category: string;
  description: string;
  priceType: "per_m2" | "per_titik" | "per_hari" | "per_proyek";
  basePrice: number;
  unit: string;
  estimatedHours: number;
  icon: string;
  imageUrl: string;
  includedScope: string[];
  warrantyDays: number;
  popular?: boolean;
}

export interface MockMaterial {
  id: string;
  title: string;
  category: string;
  description: string;
  condition: "SURPLUS_BRAND_NEW" | "RECLAIMED_LIKE_NEW" | "UPCYCLED_RAW";
  originalPrice: number;
  discountedPrice: number;
  stock: number;
  unit: string;
  location: string;
  sellerName: string;
  sellerType: "Kontraktor" | "Renovator" | "Household" | "UMKM Daur Ulang";
  isGreenMaterial: boolean;
  carbonSavedKg: number;
  imageUrl: string;
  logisticsReady: boolean;
}

export interface MockBundling {
  id: string;
  title: string;
  category: string;
  description: string;
  totalNormalPrice: number;
  bundlingPrice: number;
  savingsPercent: number;
  estimatedDays: number;
  imageUrl: string;
  badgeText: string;
  scopeList: string[];
  materialsIncluded: string[];
  popular?: boolean;
}

export interface MockOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  serviceTitle: string;
  orderType: "SERVICE_ONLY" | "MATERIAL_ONLY" | "BUNDLING_PACKAGE";
  status: "SCHEDULED" | "IN_PROGRESS" | "UNDER_REVIEW" | "COMPLETED";
  totalAmount: number;
  scheduledDate: string;
  address: string;
  city: string;
  tukangName: string;
  tukangAvatar: string;
  tukangBadge: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  beforeNotes?: string;
  afterNotes?: string;
  progressPercent: number;
  scopeCompleted: { name: string; done: boolean }[];
  warrantyDaysRemaining: number;
}

export const MOCK_TUKANGS: MockTukang[] = [
  {
    id: "tukang-1",
    name: "Pak Budi Santoso",
    avatar: "/images/tukang-joko.jpg",
    badge: "GOLD_MASTER",
    specialties: ["Keramik & Granit", "Pasang Bata / Plester", "Renovasi Garasi"],
    yearsExperience: 15,
    completedJobs: 342,
    rating: 4.96,
    reviewCount: 289,
    dailyRate: 220000,
    location: "Jakarta Selatan (Kebayoran & Cilandak)",
    isVerified: true,
    bio: "Mandor berpengalaman 15 tahun spesialis lantai granit presisi, kamar mandi anti-bocor, dan struktur dinding kokoh.",
  },
  {
    id: "tukang-2",
    name: "Kang Asep Saepudin",
    avatar: "/images/tukang-asep.jpg",
    badge: "GOLD_MASTER",
    specialties: ["Baja Ringan & Kanopi", "Atap & Talang Bocor", "Plafon Gypsum"],
    yearsExperience: 12,
    completedJobs: 218,
    rating: 4.92,
    reviewCount: 174,
    dailyRate: 230000,
    location: "Tangerang, Depok & Jaksel",
    isVerified: true,
    bio: "Spesialis konstruksi rangka atap baja ringan bersertifikasi SNI, kanopi alderon, dan perbaikan talang air bocor.",
  },
  {
    id: "tukang-3",
    name: "Pak Slamet Riyadi",
    avatar: "/images/tukang-joko.jpg",
    badge: "SILVER",
    specialties: ["Cat Interior & Eksterior", "Waterproofing Dinding", "Finishing Kayu"],
    yearsExperience: 8,
    completedJobs: 154,
    rating: 4.88,
    reviewCount: 112,
    dailyRate: 195000,
    location: "Tangerang Selatan & Jakbar",
    isVerified: true,
    bio: "Tukang cat rapi dan teliti dengan teknik rol halus, pengelupasan cat lama, dan pelapisan anti-jamur.",
  },
  {
    id: "tukang-4",
    name: "Mas Hendra Wijaya",
    avatar: "/images/tukang-asep.jpg",
    badge: "SILVER",
    specialties: ["Plumbing & Pipa Mampet", "Instalasi Pompa & Toren", "Kran & Sanitary"],
    yearsExperience: 7,
    completedJobs: 189,
    rating: 4.85,
    reviewCount: 145,
    dailyRate: 190000,
    location: "Bekasi & Jakarta Pusat",
    isVerified: true,
    bio: "Ahli sanitasi dan instalasi pipa air bertekanan, deteksi kebocoran pipa tersembunyi, serta pasang water heater.",
  },
];

export const MOCK_SERVICES: MockService[] = [
  {
    id: "srv-1",
    title: "Pasang Keramik & Granit 60x60 Presisi",
    category: "Lantai & Dinding",
    description: "Jasa pasang keramik lantai, dinding dapur/kamar mandi dengan leveling laser dan mortar semen instan khusus.",
    priceType: "per_m2",
    basePrice: 55000,
    unit: "m²",
    estimatedHours: 6,
    icon: "Layers",
    imageUrl: "/images/keramik-lantai.jpg",
    includedScope: ["Pemeriksaan kerataan lantai", "Pemasangan perekat mortar MU", "Pemasangan nat keramik anti-rembes", "Pembersihan area kerja"],
    warrantyDays: 14,
    popular: true,
  },
  {
    id: "srv-2",
    title: "Pemasangan Kanopi & Rangka Baja Ringan",
    category: "Atap & Kanopi",
    description: "Konstruksi kanopi carport baja ringan C75 berkualitas dengan atap spandek pasir/alderon tahan panas.",
    priceType: "per_m2",
    basePrice: 135000,
    unit: "m²",
    estimatedHours: 8,
    icon: "Hammer",
    imageUrl: "/images/kanopi-carport.jpg",
    includedScope: ["Pengukuran presisi rangka", "Pemasangan tiang & kaso baja ringan", "Pemasangan sekrup anti-karat", "Finishing list atap"],
    warrantyDays: 30,
    popular: true,
  },
  {
    id: "srv-3",
    title: "Pengecatan Dinding Rumah Interior & Eksterior",
    category: "Cat & Dinding",
    description: "Pengecatan dinding rumah 2 lapis merata dengan plamir sealer dan proteksi anti-jamur Dulux/Avian.",
    priceType: "per_m2",
    basePrice: 22000,
    unit: "m²",
    estimatedHours: 4,
    icon: "PaintBucket",
    imageUrl: "/images/cat-dinding.jpg",
    includedScope: ["Pembersihan kerak cat lama", "Plamir & amplas halus", "Aplikasi cat dasar sealer", "Aplikasi topcoat 2 lapis"],
    warrantyDays: 14,
  },
  {
    id: "srv-4",
    title: "Perbaikan Atap Genteng Bocor & Talang Air",
    category: "Atap & Kanopi",
    description: "Deteksi titik kebocoran atap genteng tanah liat/keramik, reparasi talang seng, dan pelapisan waterproofing fiber No Drop.",
    priceType: "per_titik",
    basePrice: 175000,
    unit: "titik",
    estimatedHours: 3,
    icon: "ShieldAlert",
    imageUrl: "/images/atap-bocor.jpg",
    includedScope: ["Investigasi jalur air hujan", "Penggantian genteng retak", "Waterproofing fiber 3 lapis", "Uji siram air anti-bocor"],
    warrantyDays: 21,
    popular: true,
  },
  {
    id: "srv-5",
    title: "Instalasi Plumbing & Pipa Air Bersih/Kotor",
    category: "Plumbing & Sanitari",
    description: "Pemasangan jalur pipa PVC Wavin/Rucika, perbaikan kran bocor, instalasi pompa pendorong & toren air.",
    priceType: "per_titik",
    basePrice: 85000,
    unit: "titik",
    estimatedHours: 3,
    icon: "Wrench",
    imageUrl: "/images/surplus-material.jpg",
    includedScope: ["Pemasangan sambungan fitting PVC", "Uji tekanan air", "Pemberian seal tape anti-rembes", "Garansi sambungan tidak bocor"],
    warrantyDays: 14,
  },
  {
    id: "srv-6",
    title: "Instalasi Kelistrikan & Tambah Titik Lampu",
    category: "Kelistrikan",
    description: "Pemasangan box MCB, penambahan saklar & stop kontak Broco, penarikan kabel grounding SNI Supreme tahan panas.",
    priceType: "per_titik",
    basePrice: 65000,
    unit: "titik",
    estimatedHours: 2,
    icon: "Zap",
    imageUrl: "/images/cat-dinding.jpg",
    includedScope: ["Kabel standar NYM Supreme SNI", "Pemasangan inbow box & isolasi aman", "Pengujian voltase tester", "Pembersihan area kerja"],
    warrantyDays: 14,
  },
];

export const MOCK_MATERIALS: MockMaterial[] = [
  {
    id: "mat-1",
    title: "Granit Roman 60x60 dPortoro Black Matt (Sisa Proyek 28 Dus)",
    category: "Keramik & Granit",
    description: "Sisa proyek cluster perumahan di BSD. Kondisi 100% baru dalam kardus asli tersegel pabrik. Kualitas Granit Grade AAA.",
    condition: "SURPLUS_BRAND_NEW",
    originalPrice: 245000,
    discountedPrice: 145000,
    stock: 28,
    unit: "dus (1.44 m²)",
    location: "Jakarta Selatan",
    sellerName: "PT Graha Citra Konstruksi",
    sellerType: "Kontraktor",
    isGreenMaterial: true,
    carbonSavedKg: 112,
    imageUrl: "/images/material-granit-roman.jpg",
    logisticsReady: true,
  },
  {
    id: "mat-2",
    title: "Cat Dulux Weathershield Brilliant White 20L (Pail Segel Sisa Renovasi)",
    category: "Cat & Finishing",
    description: "Sisa renovasi ruko komersial. Pail 20 Liter tersegel rapat belum terbuka. Warna putih bersih tahan cuaca tropis.",
    condition: "SURPLUS_BRAND_NEW",
    originalPrice: 1650000,
    discountedPrice: 990000,
    stock: 4,
    unit: "pail (20 Liter)",
    location: "Tangerang Selatan",
    sellerName: "Renova Properti Mandiri",
    sellerType: "Renovator",
    isGreenMaterial: true,
    carbonSavedKg: 45,
    imageUrl: "/images/material-cat-dulux.jpg",
    logisticsReady: true,
  },
  {
    id: "mat-3",
    title: "Baja Ringan Kencana Truss C75.75 Standar SNI (Sisa 45 Batang)",
    category: "Baja Ringan & Besi",
    description: "Surplus proyek perumahan cluster di Serpong. Panjang 6 meter utuh, bebas karat, zinc-alum coating kualitas tinggi.",
    condition: "SURPLUS_BRAND_NEW",
    originalPrice: 115000,
    discountedPrice: 72000,
    stock: 45,
    unit: "batang (6m)",
    location: "Tangerang / BSD",
    sellerName: "Bumi Bangun Utama",
    sellerType: "Kontraktor",
    isGreenMaterial: true,
    carbonSavedKg: 180,
    imageUrl: "/images/material-baja-ringan.jpg",
    logisticsReady: true,
  },
  {
    id: "mat-4",
    title: "Paving Block Eco-Recycled dari Agregat Puing Beton (K-250)",
    category: "Puing & Agregat Daur Ulang",
    description: "Dihasilkan dari olahan daur ulang puing beton bongkaran gedung dengan mesin crusher. Sangat kokoh untuk carport & taman.",
    condition: "UPCYCLED_RAW",
    originalPrice: 95000,
    discountedPrice: 58000,
    stock: 120,
    unit: "m²",
    location: "Jakarta Timur",
    sellerName: "Bengkel Daur Ulang Puing Bersama",
    sellerType: "UMKM Daur Ulang",
    isGreenMaterial: true,
    carbonSavedKg: 320,
    imageUrl: "/images/material-paving-recycled.jpg",
    logisticsReady: true,
  },
  {
    id: "mat-5",
    title: "Kusen & Daun Pintu Kayu Kamper Samarinda Oven (Reclaimed Heritage)",
    category: "Kayu Kusen",
    description: "Hasil salvage pembongkaran rumah Menteng. Kayu solid padat tanpa rayap, sudah diamplas halus siap finishing politur.",
    condition: "RECLAIMED_LIKE_NEW",
    originalPrice: 1800000,
    discountedPrice: 850000,
    stock: 6,
    unit: "set (Kusen + Pintu)",
    location: "Jakarta Pusat",
    sellerName: "Salvage Heritage Wood",
    sellerType: "Household",
    isGreenMaterial: true,
    carbonSavedKg: 85,
    imageUrl: "/images/material-kusen-kayu.jpg",
    logisticsReady: true,
  },
  {
    id: "mat-6",
    title: "Pipa PVC Wavin D 3 Inch Sisa Proyek Saluran Air (18 Batang)",
    category: "Pipa & Sanitari",
    description: "Sisa proyek ruko baru di Kelapa Gading. Panjang 4 meter utuh masih plastikan, sambungan socket tebal.",
    condition: "SURPLUS_BRAND_NEW",
    originalPrice: 88000,
    discountedPrice: 48000,
    stock: 18,
    unit: "batang (4m)",
    location: "Jakarta Utara",
    sellerName: "Karya Mandiri Ruko",
    sellerType: "Kontraktor",
    isGreenMaterial: true,
    carbonSavedKg: 28,
    imageUrl: "/images/material-baja-ringan.jpg",
    logisticsReady: true,
  },
];

export const MOCK_BUNDLINGS: MockBundling[] = [
  {
    id: "bnd-1",
    title: "Paket Bangun Kanopi & Garasi Hemat 15m²",
    category: "Garasi & Carport",
    description: "Kombinasi material baja ringan surplus C75 + atap Spandek kualitas Brand New + Jasa pasang tukang spesialis bersertifikasi. Total biaya jauh lebih hemat daripada beli material satuan.",
    totalNormalPrice: 4250000,
    bundlingPrice: 2850000,
    savingsPercent: 33,
    estimatedDays: 2,
    imageUrl: "/images/kanopi-carport.jpg",
    badgeText: "HEMAT Rp 1.400.000 (33% OFF)",
    scopeList: [
      "Pemasangan rangka ganda baja ringan C75.75 (15 m²)",
      "Pemasangan atap spandek lapis peredam panas",
      "Tiang penyangga kokoh dynabolt 12mm",
      "Pembersihan puing sisa perakitan & garansi 30 hari",
    ],
    materialsIncluded: [
      "12 Batang Baja Ringan C75.75 SNI (Surplus Grade A)",
      "6 Lembar Atap Spandek Pasir 3m",
      "1 Set Baut Roofing & Sealant Anti Bocor",
      "Jasa Tukang Ahli 2 Orang (2 Hari Kerja)",
    ],
    popular: true,
  },
  {
    id: "bnd-2",
    title: "Paket Upgrade Lantai Granit Ruang Tamu 20m²",
    category: "Lantai & Dinding",
    description: "Transformasi lantai rumah Anda dengan Granit 60x60 dPortoro surplus proyek mewah + Semen Mortar MU-400 + Jasa tukang spesialis leveling presisi.",
    totalNormalPrice: 5800000,
    bundlingPrice: 3900000,
    savingsPercent: 32,
    estimatedDays: 3,
    imageUrl: "/images/keramik-lantai.jpg",
    badgeText: "HEMAT Rp 1.900.000 (32% OFF)",
    scopeList: [
      "Bongkar keramik lama jika diperlukan",
      "Pemasangan Granit 60x60 dengan sistem laser leveling",
      "Aplikasi nat epoxy anti-noda & anti-lumut",
      "Poles permukaan & garansi pengerjaan 14 hari",
    ],
    materialsIncluded: [
      "15 Dus Granit Roman 60x60 Surplus Grade AAA",
      "4 Sak Semen Mortar Perekat Granit Instant",
      "2 Pack Nat Granit Waterproofing",
      "Jasa Tukang Master Keramik (3 Hari Kerja)",
    ],
    popular: true,
  },
  {
    id: "bnd-3",
    title: "Paket Pengecatan Total Interior Rumah 36m²",
    category: "Cat & Finishing",
    description: "Paket cat dinding interior lengkap menggunakan cat Dulux/Avian surplus segel pabrik + plamir + pengerjaan 2 tukang cat berpengalaman.",
    totalNormalPrice: 2900000,
    bundlingPrice: 1950000,
    savingsPercent: 33,
    estimatedDays: 2,
    imageUrl: "/images/cat-dinding.jpg",
    badgeText: "HEMAT Rp 950.000 (33% OFF)",
    scopeList: [
      "Scraping cat lama yang mengelupas",
      "Plamir & amplas halus hingga rata",
      "Aplikasi cat dasar alkali killer sealer",
      "Aplikasi 2 lapis cat finishing merata & bersih",
    ],
    materialsIncluded: [
      "1 Pail Cat Interior Dulux/Jotun 20L (Surplus Segel)",
      "1 Pail Cat Dasar Sealer 10L",
      "Perlengkapan rol, kuas, lakban pelindung furniture",
      "Jasa Tukang Cat Rapi 2 Orang (2 Hari Kerja)",
    ],
  },
];

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord-101",
    orderNumber: "KLK-20260830-001",
    customerName: "Bpk. Aditya Pratama",
    customerPhone: "0812-3456-7890",
    serviceTitle: "Paket Bangun Kanopi & Garasi Hemat 15m²",
    orderType: "BUNDLING_PACKAGE",
    status: "IN_PROGRESS",
    totalAmount: 2850000,
    scheduledDate: "30 Agu 2026, 08:30 WIB",
    address: "Jl. Tebet Barat Raya No. 45, Tebet",
    city: "Jakarta Selatan",
    tukangName: "Kang Asep Saepudin",
    tukangAvatar: "/images/tukang-asep.jpg",
    tukangBadge: "GOLD_MASTER",
    beforeImageUrl: "/images/before-renovasi.jpg",
    afterImageUrl: "/images/kanopi-carport.jpg",
    beforeNotes: "Area carport sebelumnya belum memiliki kanopi, lantai semen lama retak berlumut dan cat dinding kusam.",
    afterNotes: "Pemasangan kanopi carport baja ringan dan atap modern selesai dengan rapi, lantai paving terpasang presisi.",
    progressPercent: 75,
    scopeCompleted: [
      { name: "Pembersihan & perataan dasar tiang", done: true },
      { name: "Perakitan rangka baja ringan C75 utama", done: true },
      { name: "Pemasangan lembar atap spandek & alderon", done: true },
      { name: "Finishing seal karet & uji siram air hujan", done: false },
    ],
    warrantyDaysRemaining: 30,
  },
  {
    id: "ord-102",
    orderNumber: "KLK-20260828-089",
    customerName: "Ibu Maya Safitri",
    customerPhone: "0813-8899-1122",
    serviceTitle: "Pasang Keramik & Granit Presisi (18 m²)",
    orderType: "SERVICE_ONLY",
    status: "COMPLETED",
    totalAmount: 990000,
    scheduledDate: "28 Agu 2026, 09:00 WIB",
    address: "Cluster Lavender No. 12, Serpong",
    city: "Tangerang Selatan",
    tukangName: "Pak Budi Santoso",
    tukangAvatar: "/images/tukang-joko.jpg",
    tukangBadge: "GOLD_MASTER",
    beforeImageUrl: "/images/before-renovasi.jpg",
    afterImageUrl: "/images/keramik-lantai.jpg",
    beforeNotes: "Lantai keramik lama 30x30 bergelombang dan nat terkelupas.",
    afterNotes: "Pemasangan granit 60x60 selesai dengan leveling laser 100% rata. Nat anti-noda rapi dan mengkilap.",
    progressPercent: 100,
    scopeCompleted: [
      { name: "Pemeriksaan kerataan lantai dasar", done: true },
      { name: "Aplikasi mortar leveling", done: true },
      { name: "Pemasangan granit presisi", done: true },
      { name: "Aplikasi nat anti-rembes & pembersihan", done: true },
    ],
    warrantyDaysRemaining: 12,
  },
];
