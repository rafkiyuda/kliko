"use client";

import * as React from "react";

export type UserRole = "CUSTOMER" | "TUKANG" | "SELLER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  badge?: string;
  title?: string;
  location?: string;
  balance?: number;
  points?: number;
}

export const PRESET_USERS: Record<UserRole, AuthUser> = {
  CUSTOMER: {
    id: "usr-cust-01",
    name: "Bpk. Aditya Pratama",
    email: "aditya.pratama@gmail.com",
    phone: "0812-3456-7890",
    role: "CUSTOMER",
    avatar: "/images/tukang-joko.jpg",
    title: "Pemilik Rumah (Customer)",
    location: "Jakarta Selatan",
    points: 250,
  },
  TUKANG: {
    id: "usr-tkng-02",
    name: "Kang Asep Saepudin",
    email: "asep.tukang@kliko.id",
    phone: "0813-9876-5432",
    role: "TUKANG",
    avatar: "/images/tukang-asep.jpg",
    badge: "GOLD_MASTER",
    title: "Spesialis Rangka Baja & Kanopi",
    location: "Tangerang & Jakarta Selatan",
    balance: 4850000,
  },
  SELLER: {
    id: "usr-sell-03",
    name: "Bpk. Rudi (PT Graha Citra Konstruksi)",
    email: "kontraktor.gck@gmail.com",
    phone: "0811-2233-4455",
    role: "SELLER",
    avatar: "/images/surplus-material.jpg",
    title: "Kontraktor & Supplier Surplus",
    location: "Jakarta Barat & BSD",
    balance: 12800000,
  },
  ADMIN: {
    id: "usr-adm-04",
    name: "Nadine & Kenneth (Tim Admin KLIKO)",
    email: "admin.ops@kliko.id",
    phone: "0812-9988-5545",
    role: "ADMIN",
    avatar: "/images/KLIKO-logo.png",
    title: "Head of Operations & Verifikasi",
    location: "KLIKO HQ Jakarta",
  },
};

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);

  React.useEffect(() => {
    // Load from localStorage or default to CUSTOMER
    const savedRole = localStorage.getItem("kliko_simulated_role") as UserRole | null;
    if (savedRole && PRESET_USERS[savedRole]) {
      setUser(PRESET_USERS[savedRole]);
    } else {
      setUser(PRESET_USERS.CUSTOMER);
    }
  }, []);

  const login = (role: UserRole) => {
    const selected = PRESET_USERS[role] || PRESET_USERS.CUSTOMER;
    setUser(selected);
    localStorage.setItem("kliko_simulated_role", role);
  };

  const switchRole = (role: UserRole) => {
    login(role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kliko_simulated_role");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
