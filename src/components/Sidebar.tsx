"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Wallet,
  BarChart3,
  DollarSign,
  Sprout,
  ChevronRight,
  ShieldAlert,
  Moon,
  Sun,
  Database,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

const navItems = [
  { name: "Executive Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Penjualan Harian", href: "/penjualan", icon: TrendingUp },
  { name: "Katalog & HPP Produk", href: "/hpp", icon: Package },
  { name: "Buku Kas & Rekonsiliasi", href: "/kas", icon: Wallet },
  { name: "Laporan Laba Rugi (P&L)", href: "/laba-rugi", icon: BarChart3 },
  { name: "Manajemen Keuangan", href: "/keuangan", icon: DollarSign },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useDashboard();

  return (
    <aside className="w-72 glass-panel flex flex-col justify-between p-6 shrink-0 border-r border-slate-200/60 dark:border-slate-800/80 transition-all duration-300 relative z-20">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3.5 mb-8 px-2">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-xl shrink-0 transform hover:rotate-6 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight gradient-text leading-tight">
              DASHBOARD SNB
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Operational & Finance System
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
            Menu Operasional
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/15 to-indigo-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                        : "bg-slate-200/50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.name}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isActive
                      ? "text-emerald-500 translate-x-0.5"
                      : "text-slate-400 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom section & Theme Toggle */}
      <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/80 space-y-3">
        {/* Supabase Status Indicator */}
        <div className="px-3.5 py-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-slate-600 dark:text-slate-300">Data Source</span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Excel Seed / Live
          </span>
        </div>

        {/* Dark/Light mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-700/50"
        >
          <span className="flex items-center gap-2.5">
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-indigo-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
            <span>{isDarkMode ? "Mode Gelap (Dark)" : "Mode Terang (Light)"}</span>
          </span>
          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase">
            Toggle
          </span>
        </button>

        <div className="px-3 text-[11px] text-slate-400 dark:text-slate-500 text-center font-medium">
          SNB Ops Dashboard v1.0 &copy; 2026
        </div>
      </div>
    </aside>
  );
}
