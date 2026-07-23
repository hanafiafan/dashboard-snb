"use client";

import React from "react";
import { Filter, Calendar, Sprout, Layers, Bell, CheckCircle2 } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();
  const showBrandFilter = ["/", "/penjualan", "/jurnal", "/faktur"].includes(pathname);
  const showPeriodFilter = ["/"].includes(pathname);

  return (
    <header className="min-h-[5rem] py-3.5 glass-panel border-b border-slate-800/80 px-8 flex flex-wrap items-center justify-between gap-4 shrink-0 relative z-10 bg-slate-950/95 backdrop-blur-xl shadow-lg print:hidden">
      {/* Brand Selector Tabs */}
      <div className="flex items-center flex-wrap gap-3">
        {showBrandFilter && (
          <>
            <div className="flex items-center gap-2 text-slate-400 font-medium text-xs uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              <span>Unit / Brand:</span>
            </div>
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedBrandId("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedBrandId === "all"
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
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
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Sprout className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-emerald-400"}`} />
                    <span>{brand.code}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Spacer for empty brand filters to push right elements */}
        {!showBrandFilter && <div className="flex-1" />}
      </div>

      {/* Period Selector & Notifications */}
      <div className="flex items-center flex-wrap gap-3">
        {/* Period Dropdown */}
        {showPeriodFilter && (
          <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 shadow-sm text-xs">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold text-slate-400">Periode:</span>
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
            className="bg-transparent font-bold text-slate-100 text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="Juli 2026" className="bg-slate-900 text-white font-semibold">Juli 2026 (Aktual)</option>
            <option value="Juni 2026" className="bg-slate-900 text-white font-semibold">Juni 2026</option>
            <option value="25 MEI - 25 JUN" className="bg-slate-900 text-white font-semibold">25 MEI - 25 JUN (Forecast)</option>
            <option value="7 Hari Terakhir" className="bg-slate-900 text-white font-semibold">7 Hari Terakhir</option>
            <option value="30 Hari Terakhir" className="bg-slate-900 text-white font-semibold">30 Hari Terakhir</option>
            <option value="Semua Waktu" className="bg-slate-900 text-white font-semibold">Semua Waktu</option>
            <option value="Custom Rentang Tanggal" className="bg-slate-900 text-emerald-400 font-extrabold">Custom Rentang Tanggal</option>
          </select>
          </div>
        )}

        {/* Custom Date Picker Inputs when Custom Period selected */}
        {showPeriodFilter && isCustomPeriod && (
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-emerald-500/50 shadow-md text-xs animate-fadeIn">
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


      </div>

      {/* Toast Popup */}
      {toastMessage && (
        <div className="absolute top-20 right-8 z-50 animate-bounce bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 font-semibold text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </header>
  );
}
