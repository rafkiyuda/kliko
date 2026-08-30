"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth, UserRole } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/ai-scanner", label: "AI Scanner" },
    { href: "/services", label: "Jasa Tukang" },
    { href: "/marketplace", label: "Material Sisa" },
    { href: "/bundling", label: "Paket Bundling" },
    { href: "/tracking/ord-101", label: "Tracking" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const getRoleLabel = (role?: UserRole) => {
    switch (role) {
      case "TUKANG":
        return "Mitra Tukang";
      case "SELLER":
        return "Seller Material";
      case "ADMIN":
        return "Admin Ops";
      default:
        return "Customer";
    }
  };

  return (
    <div className="sticky top-3 z-50 w-full px-3 sm:px-6 transition-all duration-300">
      <header
        className={cn(
          "mx-auto max-w-6xl rounded-full border transition-all duration-300 flex items-center justify-between px-4 sm:px-6 h-15",
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-border/80 shadow-lg shadow-black/5"
            : "bg-background/75 backdrop-blur-md border-border/60 shadow-xs"
        )}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img
            src="/images/KLIKO-logo.png"
            alt="KLIKO Logo"
            className="h-8 w-8 object-contain rounded-lg group-hover:scale-105 transition-transform"
          />
          <span className="font-black text-xl tracking-tight text-foreground">
            KLIKO
          </span>
        </Link>

        {/* Desktop Navigation Links - Clean, Single Line, No Cluttered Badges */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 outline-none",
                  isActive
                    ? "text-primary bg-primary/10 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Area & Compact Role Switcher */}
        <div className="flex items-center gap-2 relative shrink-0">
          <ModeToggle />

          {/* User Role Pill Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 py-1 px-2.5 rounded-full border border-border bg-card hover:bg-muted transition-colors text-xs font-bold shadow-2xs cursor-pointer"
            >
              <img
                src={user?.avatar || "/images/tukang-joko.jpg"}
                alt={user?.name || "User"}
                className="h-6 w-6 rounded-full object-cover ring-1 ring-primary/40"
              />
              <span className="text-foreground text-[11px] font-bold">
                {getRoleLabel(user?.role)}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>

            {/* Role Switcher Menu Popup */}
            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-2.5 shadow-2xl space-y-1.5 z-50 animate-in fade-in-0 zoom-in-95">
                <div className="px-2 py-1 border-b border-border/70">
                  <div className="text-xs font-bold text-foreground truncate">{user?.name}</div>
                  <div className="text-[10px] text-muted-foreground">{user?.email}</div>
                </div>

                <div className="space-y-0.5 pt-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground px-2 block">
                    Ganti Peran:
                  </span>
                  
                  <button
                    onClick={() => { switchRole("CUSTOMER"); setRoleMenuOpen(false); router.push("/dashboard"); }}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer",
                      user?.role === "CUSTOMER" ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-foreground"
                    )}
                  >
                    <span>🏠 Customer</span>
                    {user?.role === "CUSTOMER" && <span className="text-[9px] font-bold text-primary">Aktif</span>}
                  </button>

                  <button
                    onClick={() => { switchRole("TUKANG"); setRoleMenuOpen(false); router.push("/dashboard"); }}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer",
                      user?.role === "TUKANG" ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-foreground"
                    )}
                  >
                    <span>🔨 Mitra Tukang</span>
                    {user?.role === "TUKANG" && <span className="text-[9px] font-bold text-primary">Aktif</span>}
                  </button>

                  <button
                    onClick={() => { switchRole("SELLER"); setRoleMenuOpen(false); router.push("/dashboard"); }}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer",
                      user?.role === "SELLER" ? "bg-emerald-500/10 text-emerald-600 font-bold" : "hover:bg-muted text-foreground"
                    )}
                  >
                    <span>📦 Seller Material</span>
                    {user?.role === "SELLER" && <span className="text-[9px] font-bold text-emerald-600">Aktif</span>}
                  </button>

                  <button
                    onClick={() => { switchRole("ADMIN"); setRoleMenuOpen(false); router.push("/dashboard"); }}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer",
                      user?.role === "ADMIN" ? "bg-blue-500/10 text-blue-600 font-bold" : "hover:bg-muted text-foreground"
                    )}
                  >
                    <span>🛡️ Admin Ops</span>
                    {user?.role === "ADMIN" && <span className="text-[9px] font-bold text-blue-600">Aktif</span>}
                  </button>
                </div>

                <div className="pt-1.5 border-t border-border/70">
                  <Link
                    href="/login"
                    onClick={() => setRoleMenuOpen(false)}
                    className="flex items-center gap-2 px-2 py-1 rounded-lg text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Halaman Login</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-foreground hover:bg-muted focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-6xl rounded-3xl border border-border/80 bg-background/95 backdrop-blur-xl p-4 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-xs font-semibold rounded-2xl transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
