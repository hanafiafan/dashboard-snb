import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { DashboardProvider } from "@/context/DashboardContext";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dashboard Operasional SNB — Antrasida & Agrodelta",
  description: "Sistem Manajemen Operasional Harian, Penjualan, HPP, Arus Kas, dan Laba Rugi SNB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fontSans.variable} dark h-full antialiased`}>
      <body className="min-h-screen flex bg-gradient-to-br from-slate-50 via-gray-100 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
        <DashboardProvider>
          <div className="flex w-full h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-8 relative z-0">
                {children}
              </main>
            </div>
          </div>
        </DashboardProvider>
      </body>
    </html>
  );
}
