import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "KLIKO — Klik Sekali, Semua Beres | Jasa Tukang & Material Sirkular",
  description:
    "Platform on-demand konstruksi dan renovasi no. 1 di Indonesia. Booking tukang fixed-price instan, tracking before-after transparan, marketplace material sisa proyek, dan paket bundling hemat.",
  keywords: [
    "Kliko",
    "Jasa Tukang",
    "Renovasi Rumah",
    "Tukang Bangunan",
    "Material Sisa Proyek",
    "Circular Economy Konstruksi",
    "Paket Bundling Garasi",
    "Tukang Fixed Price Jakarta",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-orange-500 selection:text-white flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
