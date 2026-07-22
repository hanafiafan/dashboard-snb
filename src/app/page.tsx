"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Wallet,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Percent,
  Plus,
  Zap,
  Activity,
  Award,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDashboard } from "@/context/DashboardContext";

const COLORS = ["#10b981", "#6366f1", "#38bdf8", "#f59e0b", "#ec4899", "#8b5cf6", "#14b8a6"];

export default function ExecutiveDashboard() {
  const {
    brands,
    selectedBrandId,
    dailySales,
    cashFlow,
    profitLossSummary,
    selectedPeriod,
  } = useDashboard();

  // Filter dailySales berdasarkan brand yang dipilih
  const filteredSales = useMemo(() => {
    if (selectedBrandId === "all") return dailySales;
    return dailySales.filter((s) => s.brand_id === selectedBrandId);
  }, [dailySales, selectedBrandId]);

  // Kalkulasi total KPI Omset & Beban
  const metrics = useMemo(() => {
    const omsetMarketing = filteredSales.reduce((acc, curr) => acc + curr.omset_marketing, 0);
    const omsetFinance = filteredSales.reduce((acc, curr) => acc + curr.omset_finance, 0);
    const validOrders = filteredSales.reduce((acc, curr) => acc + curr.valid_orders, 0);
    const totalExpense = filteredSales.reduce((acc, curr) => acc + curr.total_expense, 0);
    const adsSpend = filteredSales.reduce((acc, curr) => acc + curr.ads_spend, 0);
    const grossMargin = omsetFinance - totalExpense;
    const grossMarginPct = omsetFinance > 0 ? (grossMargin / omsetFinance) * 100 : 0;
    const avgRoi = adsSpend > 0 ? (omsetFinance / adsSpend).toFixed(2) : "0.00";

    const currentCashBalance =
      cashFlow.length > 0 ? cashFlow[cashFlow.length - 1].running_balance : 0;
    const totalCashIn = cashFlow.reduce((acc, curr) => acc + curr.cash_in, 0);
    const totalCashOut = cashFlow.reduce((acc, curr) => acc + curr.cash_out, 0);

    return {
      omsetMarketing,
      omsetFinance,
      validOrders,
      totalExpense,
      adsSpend,
      grossMargin,
      grossMarginPct,
      avgRoi,
      currentCashBalance,
      totalCashIn,
      totalCashOut,
    };
  }, [filteredSales, cashFlow]);

  // Data untuk Grafik Penjualan Harian
  const chartSalesData = useMemo(() => {
    return filteredSales.map((s) => ({
      date: `Tgl ${s.day_number}`,
      "Omset Marketing": s.omset_marketing,
      "Omset Finance": s.omset_finance,
      "Total Beban": s.total_expense,
      "Margin Kotor": s.gross_margin,
      orders: s.valid_orders,
    }));
  }, [filteredSales]);

  // Data untuk Grafik Pie Beban / Pengeluaran
  const expenseBreakdownData = useMemo(() => {
    const admin = filteredSales.reduce((acc, c) => acc + c.admin_fee, 0);
    const proc = filteredSales.reduce((acc, c) => acc + c.processing_fee, 0);
    const ads = filteredSales.reduce((acc, c) => acc + c.ads_spend, 0);
    const shipping = filteredSales.reduce((acc, c) => acc + c.shipping_cost, 0);
    const aff = filteredSales.reduce((acc, c) => acc + c.affiliate_cost, 0);
    const hpp = filteredSales.reduce((acc, c) => acc + c.hpp_cost, 0);

    return [
      { name: "Ads Spend", value: ads },
      { name: "HPP Bahan Baku", value: hpp },
      { name: "Biaya Affiliasi", value: aff },
      { name: "Biaya Ongkir", value: shipping },
      { name: "Biaya Admin", value: admin },
      { name: "Biaya Pemprosesan", value: proc },
    ].filter((item) => item.value > 0);
  }, [filteredSales]);

  // Data untuk grafik running balance
  const cashFlowChartData = useMemo(() => {
    return cashFlow.map((c) => ({
      date: c.date,
      balance: c.running_balance,
      in: c.cash_in,
      out: c.cash_out,
      desc: c.description,
    }));
  }, [cashFlow]);

  const activeBrandName =
    selectedBrandId === "all"
      ? "Semua Brand (Antrasida + Agrodelta)"
      : brands.find((b) => b.id === selectedBrandId)?.name || "Antrasida";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
            <Activity className="w-4 h-4" />
            <span>Dashboard Operasional & Keuangan</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Executive Summary <span className="text-slate-400 font-normal text-xl">— {activeBrandName}</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Pantau omset harian, beban biaya otomatis, saldo kas berjalan, dan performa ROI secara aktual.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/penjualan"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Penjualan Hari Ini</span>
          </Link>
          <Link
            href="/kas"
            className="px-4 py-2.5 rounded-xl glass-card text-slate-700 dark:text-slate-200 hover:text-emerald-500 font-bold text-sm flex items-center gap-2 transition-all"
          >
            <Wallet className="w-4 h-4 text-emerald-500" />
            <span>Rekonsiliasi Kas</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Omset Marketing vs Target */}
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Omset Marketing
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            Rp {metrics.omsetMarketing.toLocaleString("id-ID")}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Target P&L: Rp {(profitLossSummary.omset_marketing_target / 1000000).toFixed(0)}Jt
            </span>
            <span className="font-bold text-emerald-500 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {((metrics.omsetMarketing / profitLossSummary.omset_marketing_target) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full"
              style={{ width: `${Math.min((metrics.omsetMarketing / profitLossSummary.omset_marketing_target) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Card 2: Omset Finance */}
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Omset Finance (Net/Paid)
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-500">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            Rp {metrics.omsetFinance.toLocaleString("id-ID")}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              {metrics.validOrders.toLocaleString("id-ID")} Pesanan Valid
            </span>
            <span className="font-bold text-indigo-500 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              {((metrics.omsetFinance / profitLossSummary.omset_finance_target) * 100).toFixed(1)}% dari Target
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full"
              style={{ width: `${Math.min((metrics.omsetFinance / profitLossSummary.omset_finance_target) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Card 3: Saldo Kas Saat Ini */}
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group border-l-4 border-l-sky-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Saldo Kas Berjalan
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center text-sky-500">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            Rp {metrics.currentCashBalance.toLocaleString("id-ID")}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-emerald-500 font-semibold">
              +Rp {(metrics.totalCashIn / 1000000).toFixed(1)}Jt Masuk
            </span>
            <span className="text-rose-500 font-semibold">
              -Rp {(metrics.totalCashOut / 1000000).toFixed(1)}Jt Keluar
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full w-4/5 rounded-full" />
          </div>
        </div>

        {/* Card 4: ROI / ROAS & Margin Kotor */}
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Efektivitas & ROI Iklan
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {metrics.avgRoi}x
            </span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              ROAS Aktual
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Margin Kotor: {metrics.grossMarginPct.toFixed(1)}%
            </span>
            <span className="font-bold text-amber-500">
              Rp {(metrics.grossMargin / 1000000).toFixed(1)}Jt
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full w-full rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Charts Section (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart 1: Pergerakan Omset & Beban Harian (2 columns wide) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Pergerakan Omset & Total Beban Harian
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Data aktual harian tanggal 1 s/d {filteredSales.length} Juli 2026 (dalam Rupiah)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Omset Marketing
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500" /> Omset Finance
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" /> Total Beban
              </span>
            </div>
          </div>

          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartSalesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOmsetMkg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOmsetFin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}Jt`}
                />
                <Tooltip
                  formatter={(val: any) => [`Rp ${Number(val || 0).toLocaleString("id-ID")}`, ""]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: "rgba(51, 65, 85, 0.8)",
                    borderRadius: "12px",
                    color: "#f8fafc",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Omset Marketing"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorOmsetMkg)"
                />
                <Area
                  type="monotone"
                  dataKey="Omset Finance"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorOmsetFin)"
                />
                <Line
                  type="monotone"
                  dataKey="Total Beban"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Komposisi Beban Operasional (1 column wide) */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Komposisi Pengeluaran
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Breakdown biaya otomatis dari transaksi
            </p>
          </div>

          <div className="h-[250px] w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {expenseBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`Rp ${Number(val || 0).toLocaleString("id-ID")}`, ""]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: "rgba(51, 65, 85, 0.8)",
                    borderRadius: "12px",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {expenseBreakdownData.map((item, index) => {
              const totalExp = expenseBreakdownData.reduce((acc, c) => acc + c.value, 0);
              const pct = totalExp > 0 ? ((item.value / totalExp) * 100).toFixed(1) : "0";
              return (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate max-w-[130px]">{item.name}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Rp {(item.value / 1000000).toFixed(1)}Jt ({pct}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart 3 & P&L Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Running Cash Balance Trend */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Tren Saldo Kas Berjalan (Running Balance)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pergerakan kas masuk/keluar dari sheet ANTRASIDA-ARUS KAS
              </p>
            </div>
            <Link
              href="/kas"
              className="text-xs font-bold text-emerald-500 hover:text-emerald-600 flex items-center gap-1"
            >
              <span>Lihat Ledger</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}Jt`}
                />
                <Tooltip
                  formatter={(val: any) => [`Rp ${Number(val || 0).toLocaleString("id-ID")}`, "Saldo Running"]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: "rgba(51, 65, 85, 0.8)",
                    borderRadius: "12px",
                    color: "#f8fafc",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCash)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Realisasi vs Target P&L Card */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Perbandingan Laba Rugi (Target vs Aktual)
              </h3>
              <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-lg">
                Periode 25 Mei - 25 Jun / Juli
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Ikhtisar Laba Bersih (NPM) dari spreadsheet ANTRASIDA-LABA-RUGI
            </p>

            <div className="space-y-4">
              <div className="bg-slate-100/80 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">
                    Target Laba Bersih (NPM)
                  </span>
                  <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    Rp {profitLossSummary.npm_target.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">
                    Realisasi Aktual
                  </span>
                  <div className="text-lg font-black text-emerald-500 mt-0.5">
                    Rp {profitLossSummary.npm_realization.toLocaleString("id-ID")}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-slate-400 font-medium">Fixed Cost Realization</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Rp 3.000.000 <span className="text-emerald-500 font-semibold">(100%)</span>
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-slate-400 font-medium">Variable Cost Realization</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Rp {(profitLossSummary.total_cost_realization / 1000000).toFixed(1)}Jt{" "}
                    <span className="text-indigo-400 font-semibold">(51.7%)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/80 mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Ingin analisis detail per komponen biaya?
            </span>
            <Link
              href="/laba-rugi"
              className="text-xs font-extrabold text-indigo-500 hover:text-indigo-600 flex items-center gap-1 bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-all"
            >
              <span>Lihat Laporan P&L Lengkap</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icon
function CheckCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
