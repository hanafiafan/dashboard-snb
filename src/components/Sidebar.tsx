"use client";

import React, { useState } from "react";
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
  BookOpen,
  Scale,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

const operationalNavItems = [
  { name: "Executive Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Penjualan Harian", href: "/penjualan", icon: TrendingUp },
  { name: "Katalog & HPP Produk", href: "/hpp", icon: Package },
  { name: "Buku Kas & Arus Kas", href: "/kas", icon: Wallet },
  { name: "Manajemen Keuangan", href: "/keuangan", icon: DollarSign },
];

const accountingNavItems = [
  { name: "Jurnal Umum & Ledger", href: "/jurnal", icon: BookOpen },
  { name: "Neraca & Bagan COA", href: "/neraca", icon: Scale },
  { name: "Faktur & Invoice Studio", href: "/faktur", icon: FileText },
  { name: "Laporan Laba Rugi (P&L)", href: "/laba-rugi", icon: BarChart3 },
];

const helpNavItems = [
  { name: "Panduan & Dokumentasi", href: "/panduan", icon: BookOpen, badge: "DOCS" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`glass-panel flex flex-col justify-between py-6 shrink-0 border-r border-slate-800/80 transition-all duration-300 relative z-20 overflow-y-auto bg-slate-950/95 print:hidden ${isCollapsed ? 'w-20 px-3 items-center' : 'w-72 px-6'}`}>
      <div className="w-full">
        {/* Brand Header */}
        <div className={`flex items-center mb-6 px-2 ${isCollapsed ? 'justify-center' : 'justify-between gap-3.5'}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 text-white font-bold text-xl shrink-0 transform hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-extrabold text-lg tracking-tight text-white leading-tight">
                  DASHBOARD SMB
                </h1>
                <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block shadow-sm shadow-emerald-400"></span>
                  Accurate ERP Suite
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center py-2 mb-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
          title={isCollapsed ? "Perbesar Sidebar" : "Perkecil Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>

        {/* Navigation links - Operasional Bisnis */}
        <div className="space-y-1 mb-6 w-full">
          {!isCollapsed && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2 flex items-center gap-1.5">
              <LayoutDashboard className="w-3 h-3 text-emerald-400" /> Operasional Bisnis
            </p>
          )}
          {operationalNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={item.name}
                className={`flex items-center justify-between py-2.5 rounded-xl font-semibold text-[13px] transition-all duration-200 group ${isCollapsed ? 'px-2' : 'px-3.5'} ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent text-emerald-400 border-l-4 border-emerald-500 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80"
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3'}`}>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      isActive
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                        : "bg-slate-900 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {!isCollapsed && <span>{item.name}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isActive
                        ? "text-emerald-400 translate-x-0.5"
                        : "text-slate-600 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Navigation links - Akuntansi & ERP Accurate Style */}
        <div className="space-y-1 mb-6 w-full">
          {!isCollapsed && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-3 mb-2 flex items-center gap-1.5">
              <Scale className="w-3 h-3 text-indigo-400" /> Akuntansi & ERP (Accurate)
            </p>
          )}
          {accountingNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.name}
                className={`flex items-center justify-between py-2.5 rounded-xl font-semibold text-[13px] transition-all duration-200 group ${isCollapsed ? 'px-2' : 'px-3.5'} ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 via-indigo-500/10 to-transparent text-indigo-400 border-l-4 border-indigo-500 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80"
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3'}`}>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      isActive
                        ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                        : "bg-slate-900 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {!isCollapsed && <span>{item.name}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isActive
                        ? "text-indigo-400 translate-x-0.5"
                        : "text-slate-600 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Navigation links - Bantuan & SOP */}
        <div className="space-y-1 w-full">
          {!isCollapsed && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-3 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3 text-amber-400" /> Pusat Bantuan & SOP
            </p>
          )}
          {helpNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.name}
                className={`flex items-center justify-between py-2.5 rounded-xl font-semibold text-[13px] transition-all duration-200 group ${isCollapsed ? 'px-2' : 'px-3.5'} ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-400 border-l-4 border-amber-500 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80"
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3'}`}>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      isActive
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30"
                        : "bg-slate-900 text-amber-400 group-hover:bg-slate-800 group-hover:text-amber-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {!isCollapsed && <span>{item.name}</span>}
                  {!isCollapsed && item.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isActive
                        ? "text-amber-400 translate-x-0.5"
                        : "text-slate-600 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom section & Status Footer */}
      <div className={`pt-6 border-t border-slate-800/80 space-y-3 w-full ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        {/* Supabase Status Indicator */}
        <div className={`py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-medium ${isCollapsed ? 'px-2 flex-col gap-2 justify-center w-full' : 'px-3.5'}`} title="Data Source: Excel Seed / Live">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
            {!isCollapsed && <span className="text-slate-300">Data Source</span>}
          </div>
          {!isCollapsed && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Excel Seed / Live
            </span>
          )}
        </div>

        {/* Dark Mode Focus Badge */}
        <div className={`w-full flex items-center justify-between py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900/90 border border-slate-800 shadow-inner ${isCollapsed ? 'px-2 justify-center' : 'px-3.5'}`} title="Tema Obsidian: Dark Only">
          <span className="flex items-center gap-2">
            <Moon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            {!isCollapsed && <span>Tema Obsidian</span>}
          </span>
          {!isCollapsed && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase shrink-0">
              Dark Only
            </span>
          )}
        </div>

        {!isCollapsed && (
          <div className="px-3 text-[11px] text-slate-500 text-center font-medium truncate">
            SMB Ops Dashboard v1.0 &copy; 2026
          </div>
        )}
      </div>
    </aside>
  );
}
