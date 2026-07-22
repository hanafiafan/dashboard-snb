"use client";

import React, { useState, useMemo } from "react";
import {
  Scale,
  Download,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Layers,
  Search,
  Filter,
  DollarSign,
  Briefcase,
  Database,
  PieChart,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export default function NeracaPage() {
  const { accounts } = useDashboard();
  const [activeTab, setActiveTab] = useState<"balance-sheet" | "trial-balance">("balance-sheet");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filtered COA for Trial Balance tab
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      if (selectedCategory !== "all" && acc.category !== selectedCategory) return false;
      if (
        searchQuery &&
        !acc.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !acc.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [accounts, searchQuery, selectedCategory]);

  // Balance sheet groupings
  const balanceSheet = useMemo(() => {
    const currentAssets = accounts.filter((a) => a.category === "Aset Lancar");
    const fixedAssets = accounts.filter((a) => a.category === "Aset Tetap");
    const liabilities = accounts.filter((a) => a.category === "Kewajiban");
    const equities = accounts.filter((a) => a.category === "Ekuitas");

    const totalCurrentAssets = currentAssets.reduce((s, a) => s + a.balance, 0);
    const totalFixedAssets = fixedAssets.reduce((s, a) => s + a.balance, 0);
    const totalAssets = totalCurrentAssets + totalFixedAssets;

    const totalLiabilities = liabilities.reduce((s, a) => s + a.balance, 0);
    const totalEquities = equities.reduce((s, a) => s + a.balance, 0);
    const totalLiabilitiesAndEquities = totalLiabilities + totalEquities;

    const difference = Math.abs(totalAssets - totalLiabilitiesAndEquities);
    const isBalanced = difference < 0.01;

    return {
      currentAssets,
      fixedAssets,
      liabilities,
      equities,
      totalCurrentAssets,
      totalFixedAssets,
      totalAssets,
      totalLiabilities,
      totalEquities,
      totalLiabilitiesAndEquities,
      difference,
      isBalanced,
    };
  }, [accounts]);

  // Trial Balance totals
  const trialTotals = useMemo(() => {
    let debit = 0;
    let credit = 0;
    accounts.forEach((acc) => {
      if (acc.normal_balance === "Debit") {
        debit += acc.balance;
      } else {
        credit += acc.balance;
      }
    });
    return { debit, credit, isBalanced: Math.abs(debit - credit) < 0.01 };
  }, [accounts]);

  const handleExportCSV = () => {
    if (activeTab === "balance-sheet") {
      let csv = "Kategori,Kode Akun,Nama Akun,Nilai Saldo (IDR)\n";
      csv += "=== ASET LANCAR ===\n";
      balanceSheet.currentAssets.forEach((a) => {
        csv += `"${a.category}","${a.code}","${a.name}",${a.balance}\n`;
      });
      csv += `"",,"TOTAL ASET LANCAR",${balanceSheet.totalCurrentAssets}\n`;
      csv += "=== ASET TETAP ===\n";
      balanceSheet.fixedAssets.forEach((a) => {
        csv += `"${a.category}","${a.code}","${a.name}",${a.balance}\n`;
      });
      csv += `"",,"TOTAL ASET TETAP",${balanceSheet.totalFixedAssets}\n`;
      csv += `"",,"TOTAL SELURUH ASET",${balanceSheet.totalAssets}\n\n`;
      csv += "=== KEWAJIBAN ===\n";
      balanceSheet.liabilities.forEach((a) => {
        csv += `"${a.category}","${a.code}","${a.name}",${a.balance}\n`;
      });
      csv += `"",,"TOTAL KEWAJIBAN",${balanceSheet.totalLiabilities}\n`;
      csv += "=== EKUITAS ===\n";
      balanceSheet.equities.forEach((a) => {
        csv += `"${a.category}","${a.code}","${a.name}",${a.balance}\n`;
      });
      csv += `"",,"TOTAL EKUITAS",${balanceSheet.totalEquities}\n`;
      csv += `"",,"TOTAL KEWAJIBAN & EKUITAS",${balanceSheet.totalLiabilitiesAndEquities}\n`;

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Neraca_Balance_Sheet_SMB_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      let csv = "Kode Akun,Nama Akun,Kategori,Saldo Normal,Saldo Akhir (IDR)\n";
      filteredAccounts.forEach((a) => {
        csv += `"${a.code}","${a.name}","${a.category}","${a.normal_balance}",${a.balance}\n`;
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Neraca_Saldo_COA_SMB_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-slate-900/40 to-emerald-500/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
            <Scale className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Neraca Keuangan & Bagan Akun (COA)
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                Accurate ERP Suite
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
              Laporan Posisi Keuangan (Balance Sheet: Aset = Kewajiban + Ekuitas) & Trial Balance COA.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:from-emerald-500 hover:to-teal-500 transition-all transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            Export Laporan ({activeTab === "balance-sheet" ? "Neraca" : "COA"})
          </button>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex border-b border-slate-200/60 dark:border-slate-800/80 gap-2">
        <button
          onClick={() => setActiveTab("balance-sheet")}
          className={`flex items-center gap-2.5 py-3.5 px-6 font-extrabold text-sm border-b-2 transition-all ${
            activeTab === "balance-sheet"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-t-xl"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Scale className="w-4 h-4" />
          Neraca Keuangan (Balance Sheet)
        </button>
        <button
          onClick={() => setActiveTab("trial-balance")}
          className={`flex items-center gap-2.5 py-3.5 px-6 font-extrabold text-sm border-b-2 transition-all ${
            activeTab === "trial-balance"
              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-t-xl"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          Neraca Saldo & Chart of Accounts (COA)
        </button>
      </div>

      {/* TAB 1: BALANCE SHEET VIEW */}
      {activeTab === "balance-sheet" ? (
        <div className="space-y-6">
          {/* Audit Check Badge Banner */}
          <div
            className={`p-5 rounded-2xl border flex items-center justify-between ${
              balanceSheet.isBalanced
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200"
                : "bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {balanceSheet.isBalanced ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="w-7 h-7 text-rose-500 shrink-0" />
              )}
              <div>
                <h4 className="font-extrabold text-base">
                  {balanceSheet.isBalanced
                    ? "Validasi Keseimbangan Akuntansi: SEIMBANG (BALANCED ✅)"
                    : "Validasi Keseimbangan Akuntansi: TIDAK SEIMBANG ❌"}
                </h4>
                <p className="text-xs mt-0.5 opacity-90">
                  Total Aset (Rp {balanceSheet.totalAssets.toLocaleString("id-ID")}) = Total Kewajiban & Ekuitas (Rp{" "}
                  {balanceSheet.totalLiabilitiesAndEquities.toLocaleString("id-ID")})
                </p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-75 block">
                Selisih Pembukuan
              </span>
              <span className="text-lg font-mono font-black">
                Rp {balanceSheet.difference.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Two Column Accounting Comparison Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* LEFT SIDE: ASET */}
            <div className="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">ASET (ASSETS)</h3>
                </div>
                <span className="font-mono font-black text-lg text-emerald-600 dark:text-emerald-400">
                  Rp {balanceSheet.totalAssets.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Aset Lancar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <span>Aset Lancar (Current Assets)</span>
                  <span>Rp {balanceSheet.totalCurrentAssets.toLocaleString("id-ID")}</span>
                </div>
                <div className="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                  {balanceSheet.currentAssets.map((acc) => (
                    <div key={acc.code} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-200/20 dark:border-slate-800/20 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                          {acc.code}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{acc.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        Rp {acc.balance.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aset Tetap */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <span>Aset Tetap (Fixed Assets)</span>
                  <span>Rp {balanceSheet.totalFixedAssets.toLocaleString("id-ID")}</span>
                </div>
                <div className="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                  {balanceSheet.fixedAssets.map((acc) => (
                    <div key={acc.code} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-200/20 dark:border-slate-800/20 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                          {acc.code}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{acc.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        Rp {acc.balance.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-slate-300 dark:border-slate-700 flex items-center justify-between font-black text-base text-slate-900 dark:text-white">
                <span>TOTAL ASET</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  Rp {balanceSheet.totalAssets.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* RIGHT SIDE: KEWAJIBAN & EKUITAS */}
            <div className="glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">KEWAJIBAN & EKUITAS</h3>
                </div>
                <span className="font-mono font-black text-lg text-indigo-600 dark:text-indigo-400">
                  Rp {balanceSheet.totalLiabilitiesAndEquities.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Kewajiban */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <span>Kewajiban / Hutang (Liabilities)</span>
                  <span>Rp {balanceSheet.totalLiabilities.toLocaleString("id-ID")}</span>
                </div>
                <div className="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                  {balanceSheet.liabilities.map((acc) => (
                    <div key={acc.code} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-200/20 dark:border-slate-800/20 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                          {acc.code}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{acc.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        Rp {acc.balance.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ekuitas */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <span>Ekuitas & Modal (Equity)</span>
                  <span>Rp {balanceSheet.totalEquities.toLocaleString("id-ID")}</span>
                </div>
                <div className="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
                  {balanceSheet.equities.map((acc) => (
                    <div key={acc.code} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-200/20 dark:border-slate-800/20 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                          {acc.code}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{acc.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        Rp {acc.balance.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-slate-300 dark:border-slate-700 flex items-center justify-between font-black text-base text-slate-900 dark:text-white">
                <span>TOTAL KEWAJIBAN & EKUITAS</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">
                  Rp {balanceSheet.totalLiabilitiesAndEquities.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: TRIAL BALANCE & COA TABLE VIEW */
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="glass-card p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kode / nama akun..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <Filter className="w-4 h-4 text-indigo-500" />
                Kategori Akun:
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">📁 Semua Kategori</option>
                <option value="Aset Lancar">Aset Lancar</option>
                <option value="Aset Tetap">Aset Tetap</option>
                <option value="Kewajiban">Kewajiban</option>
                <option value="Ekuitas">Ekuitas</option>
                <option value="Pendapatan">Pendapatan</option>
                <option value="HPP">HPP (Bahan Baku)</option>
                <option value="Beban Operasional">Beban Operasional</option>
              </select>
            </div>
          </div>

          {/* Table COA */}
          <div className="glass-card rounded-2xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-900/70 text-slate-600 dark:text-slate-400 text-xs font-extrabold uppercase tracking-wider">
                    <th className="p-4 w-28">Kode Akun</th>
                    <th className="p-4">Nama Akun Akuntansi</th>
                    <th className="p-4 w-44">Kategori Akun</th>
                    <th className="p-4 w-36">Saldo Normal</th>
                    <th className="p-4 text-right w-48">Saldo Akhir (IDR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40 text-sm">
                  {filteredAccounts.map((acc) => (
                    <tr key={acc.code} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        [{acc.code}]
                      </td>
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100">{acc.name}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                          {acc.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 text-xs font-extrabold rounded-lg ${
                            acc.normal_balance === "Debit"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30"
                          }`}
                        >
                          {acc.normal_balance}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono font-black text-slate-900 dark:text-white">
                        Rp {acc.balance.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
