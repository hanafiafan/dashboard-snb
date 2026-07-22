"use client";

import React from "react";
import { Filter, Calendar, Sprout, Layers, Bell, CheckCircle2 } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export function Header() {
  const {
    brands,
    selectedBrandId,
    setSelectedBrandId,
    selectedPeriod,
    setSelectedPeriod,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    isCustomPeriod,
    setIsCustomPeriod,
    toastMessage,
  } = useDashboard();

  return (
    <header className="h-20 glass-panel border-b border-slate-200/60 dark:border-slate-800/80 px-8 flex items-center justify-between shrink-0 relative z-10">
      {/* Brand Selector Tabs */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-sm">
          <Filter className="w-4 h-4 text-emerald-500" />
          <span>Filter Unit/Brand:</span>
        </div>
        <div className="flex bg-slate-200/60 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-300/50 dark:border-slate-700/60">
          <button
            onClick={() => setSelectedBrandId("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedBrandId === "all"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Semua Brand (Gabungan)</span>
          </button>
          {brands.map((brand) => {
            const isSelected = selectedBrandId === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => setSelectedBrandId(brand.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Sprout className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-emerald-500"}`} />
                <span>{brand.code}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Period Selector & Notifications */}
      <div className="flex items-center gap-3">
        {/* Period Dropdown */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-sm">
          <Calendar className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Periode:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedPeriod(val);
              if (val === "Custom Rentang Tanggal") {
                setIsCustomPeriod(true);
              } else {
                setIsCustomPeriod(false);
              }
            }}
            className="bg-transparent font-bold text-slate-800 dark:text-slate-100 text-xs focus:outline-none cursor-pointer"
          >
            <option value="Juli 2026" className="bg-slate-900 text-white">Juli 2026 (Aktual)</option>
            <option value="Juni 2026" className="bg-slate-900 text-white">Juni 2026</option>
            <option value="25 MEI - 25 JUN" className="bg-slate-900 text-white">25 MEI - 25 JUN (Forecast)</option>
            <option value="7 Hari Terakhir" className="bg-slate-900 text-white">7 Hari Terakhir</option>
            <option value="30 Hari Terakhir" className="bg-slate-900 text-white">30 Hari Terakhir</option>
            <option value="Semua Waktu" className="bg-slate-900 text-white">Semua Waktu</option>
            <option value="Custom Rentang Tanggal" className="bg-slate-900 text-white font-extrabold text-emerald-400">📅 Custom Rentang Tanggal</option>
          </select>
        </div>

        {/* Custom Date Picker Inputs when Custom Period selected */}
        {isCustomPeriod && (
          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-emerald-500/50 shadow-md text-xs animate-fadeIn">
            <span className="text-slate-400 font-semibold text-[11px]">Dari:</span>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="bg-slate-800 text-emerald-400 font-bold px-2 py-1 rounded border border-slate-700 focus:outline-none focus:border-emerald-500 text-[11px] cursor-pointer"
            />
            <span className="text-slate-400 font-semibold text-[11px]">s/d</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="bg-slate-800 text-emerald-400 font-bold px-2 py-1 rounded border border-slate-700 focus:outline-none focus:border-emerald-500 text-[11px] cursor-pointer"
            />
          </div>
        )}

        {/* Live Status indicator */}
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-sm shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Live Real-time Ops</span>
        </div>
      </div>

      {/* Toast Popup */}
      {toastMessage && (
        <div className="absolute top-24 right-8 z-50 animate-bounce bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 font-semibold text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </header>
  );
}
