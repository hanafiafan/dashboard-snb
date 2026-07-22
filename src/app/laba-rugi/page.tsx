"use client";

import React, { useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Award,
  Calendar,
  FileText,
  Percent,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDashboard } from "@/context/DashboardContext";

export default function LabaRugiPage() {
  const { profitLossSummary } = useDashboard();

  // Chart data comparison
  const costChartData = useMemo(() => {
    const fixed = profitLossSummary.fixed_costs.map((c) => ({
      name: c.name,
      Target: c.target,
      Realisasi: c.realization,
      type: "Fixed",
    }));
    const variable = profitLossSummary.variable_costs.map((c) => ({
      name: c.name,
      Target: c.target,
      Realisasi: c.realization,
      type: "Variable",
    }));
    return [...fixed, ...variable];
  }, [profitLossSummary]);

  const omsetAchievementPct =
    (profitLossSummary.omset_finance_realization / profitLossSummary.omset_finance_target) * 100;
  const costEfficiencyPct =
    (profitLossSummary.total_cost_realization / profitLossSummary.total_cost_target) * 100;
  const npmAchievementPct =
    (profitLossSummary.npm_realization / profitLossSummary.npm_target) * 100;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" />
            <span>Laporan Keuangan Eksekutif</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Laporan Laba Rugi (P&L Summary)
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Perbandingan anggaran forecast vs realisasi aktual berdasarkan sheet <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">ANTRASIDA-LABA-RUGI</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 font-bold text-xs">
          <Calendar className="w-4 h-4" />
          <span>Periode: {profitLossSummary.period}</span>
        </div>
      </div>

      {/* Top 3 P&L KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-indigo-500 relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase">Omset Finance (Net Masuk)</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            Rp {profitLossSummary.omset_finance_realization.toLocaleString("id-ID")}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400">Target: Rp {(profitLossSummary.omset_finance_target / 1000000).toFixed(0)}Jt</span>
            <span className="font-bold text-indigo-500">{omsetAchievementPct.toFixed(1)}% Tercapai</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full"
              style={{ width: `${Math.min(omsetAchievementPct, 100)}%` }}
            />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-rose-500 relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Beban Operasional & HPP</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            Rp {profitLossSummary.total_cost_realization.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400">Target Maks: Rp {(profitLossSummary.total_cost_target / 1000000).toFixed(1)}Jt</span>
            <span className="font-bold text-rose-500">{costEfficiencyPct.toFixed(1)}% Terpakai</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full"
              style={{ width: `${Math.min(costEfficiencyPct, 100)}%` }}
            />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-emerald-500 relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase">Net Profit Margin (Laba Bersih)</span>
          <div className="text-2xl font-black text-emerald-500 mt-2">
            Rp {profitLossSummary.npm_realization.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400">Target NPM: Rp {(profitLossSummary.npm_target / 1000000).toFixed(1)}Jt</span>
            <span className="font-bold text-emerald-500">{npmAchievementPct.toFixed(1)}% Target</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
              style={{ width: `${Math.min(npmAchievementPct, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Perbandingan Biaya: Target Forecast vs Realisasi Aktual
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Analisis efisiensi biaya per kategori (dalam Rupiah)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-400" /> Target Forecast
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" /> Realisasi Aktual
            </span>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                angle={-15}
                textAnchor="end"
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}Jt`}
              />
              <Tooltip
                formatter={(val: any) => [`Rp ${Number(val || 0).toLocaleString("id-ID", { maximumFractionDigits: 0 })}`, ""]}
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  borderColor: "rgba(51, 65, 85, 0.8)",
                  borderRadius: "12px",
                  color: "#f8fafc",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              />
              <Bar dataKey="Target" fill="#94a3b8" opacity={0.6} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Realisasi" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DETAILED P&L TABLE */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80">
        <div className="p-5 border-b border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Rincian Laba Rugi (Profit & Loss Statement)
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase">Format Laporan Standar</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-6">Komponen Laporan</th>
                <th className="py-3.5 px-4 text-right">Target Forecast (Rp)</th>
                <th className="py-3.5 px-4 text-right text-emerald-600 dark:text-emerald-400">Realisasi Aktual (Rp)</th>
                <th className="py-3.5 px-4 text-center">Pencapaian %</th>
                <th className="py-3.5 px-6 text-right">Selisih Varian (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60 text-xs font-semibold">
              {/* PENDAPATAN */}
              <tr className="bg-slate-100/40 dark:bg-slate-800/20 font-black text-slate-800 dark:text-slate-200">
                <td colSpan={5} className="py-2.5 px-6 uppercase tracking-wider">A. Pendapatan (Omset)</td>
              </tr>
              <tr>
                <td className="py-3 px-6 pl-10 text-slate-700 dark:text-slate-300">1. Omset Marketing (Gross)</td>
                <td className="py-3 px-4 text-right">Rp {profitLossSummary.omset_marketing_target.toLocaleString("id-ID")}</td>
                <td className="py-3 px-4 text-right font-bold text-emerald-500">Rp {profitLossSummary.omset_marketing_realization.toLocaleString("id-ID")}</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-[10px] font-bold">
                    {((profitLossSummary.omset_marketing_realization / profitLossSummary.omset_marketing_target) * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="py-3 px-6 text-right text-slate-500">
                  Rp {(profitLossSummary.omset_marketing_realization - profitLossSummary.omset_marketing_target).toLocaleString("id-ID")}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-6 pl-10 text-slate-700 dark:text-slate-300">2. Omset Finance (Net Masuk)</td>
                <td className="py-3 px-4 text-right">Rp {profitLossSummary.omset_finance_target.toLocaleString("id-ID")}</td>
                <td className="py-3 px-4 text-right font-bold text-indigo-500">Rp {profitLossSummary.omset_finance_realization.toLocaleString("id-ID")}</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-500 text-[10px] font-bold">
                    {omsetAchievementPct.toFixed(1)}%
                  </span>
                </td>
                <td className="py-3 px-6 text-right text-slate-500">
                  Rp {(profitLossSummary.omset_finance_realization - profitLossSummary.omset_finance_target).toLocaleString("id-ID")}
                </td>
              </tr>

              {/* FIXED COSTS */}
              <tr className="bg-slate-100/40 dark:bg-slate-800/20 font-black text-slate-800 dark:text-slate-200">
                <td colSpan={5} className="py-2.5 px-6 uppercase tracking-wider">B. Beban Tetap (Fixed Costs)</td>
              </tr>
              {profitLossSummary.fixed_costs.map((c) => {
                const pct = c.target > 0 ? (c.realization / c.target) * 100 : 0;
                return (
                  <tr key={c.name}>
                    <td className="py-3 px-6 pl-10 text-slate-700 dark:text-slate-300">{c.name}</td>
                    <td className="py-3 px-4 text-right">Rp {c.target.toLocaleString("id-ID")}</td>
                    <td className="py-3 px-4 text-right font-bold text-rose-500">Rp {c.realization.toLocaleString("id-ID")}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                        {pct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right text-slate-500">
                      Rp {(c.realization - c.target).toLocaleString("id-ID")}
                    </td>
                  </tr>
                );
              })}

              {/* VARIABLE COSTS */}
              <tr className="bg-slate-100/40 dark:bg-slate-800/20 font-black text-slate-800 dark:text-slate-200">
                <td colSpan={5} className="py-2.5 px-6 uppercase tracking-wider">C. Beban Variabel & Operasional (Variable Costs)</td>
              </tr>
              {profitLossSummary.variable_costs.map((c) => {
                const pct = c.target > 0 ? (c.realization / c.target) * 100 : 0;
                return (
                  <tr key={c.name}>
                    <td className="py-3 px-6 pl-10 text-slate-700 dark:text-slate-300">{c.name}</td>
                    <td className="py-3 px-4 text-right">Rp {c.target.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                    <td className="py-3 px-4 text-right font-bold text-rose-500">Rp {c.realization.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-500 text-[10px] font-bold">
                        {pct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right text-slate-500">
                      Rp {(c.realization - c.target).toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                );
              })}

              {/* SUBSIDI ADS */}
              <tr>
                <td className="py-3 px-6 pl-10 text-emerald-500 font-bold">(-) Subsidi Iklan (Ads Subsidy)</td>
                <td className="py-3 px-4 text-right">-</td>
                <td className="py-3 px-4 text-right font-bold text-emerald-500">-Rp {profitLossSummary.subsidi_ads.toLocaleString("id-ID")}</td>
                <td className="py-3 px-4 text-center">-</td>
                <td className="py-3 px-6 text-right text-emerald-500 font-bold">+Rp {profitLossSummary.subsidi_ads.toLocaleString("id-ID")}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-100/90 dark:bg-slate-800/90 border-t-2 border-slate-300 dark:border-slate-700 font-black text-xs">
                <td className="py-3.5 px-6 uppercase text-slate-900 dark:text-white">TOTAL PENGELUARAN (TOTAL COSTS)</td>
                <td className="py-3.5 px-4 text-right text-slate-700 dark:text-slate-300">Rp {profitLossSummary.total_cost_target.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                <td className="py-3.5 px-4 text-right text-rose-500">Rp {profitLossSummary.total_cost_realization.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                <td className="py-3.5 px-4 text-center text-rose-500">{costEfficiencyPct.toFixed(1)}%</td>
                <td className="py-3.5 px-6 text-right text-emerald-500 font-bold">Efisiensi: Rp {(profitLossSummary.total_cost_target - profitLossSummary.total_cost_realization).toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
              </tr>
              <tr className="bg-emerald-500/15 border-t border-emerald-500/30 font-black text-sm text-slate-900 dark:text-white">
                <td className="py-4 px-6 uppercase tracking-wider text-emerald-600 dark:text-emerald-400">LABA BERSIH (NET PROFIT MARGIN - NPM)</td>
                <td className="py-4 px-4 text-right text-slate-800 dark:text-slate-200">Rp {profitLossSummary.npm_target.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                <td className="py-4 px-4 text-right text-emerald-600 dark:text-emerald-400 text-base">Rp {profitLossSummary.npm_realization.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                <td className="py-4 px-4 text-center text-emerald-600 dark:text-emerald-400 font-extrabold">{npmAchievementPct.toFixed(1)}%</td>
                <td className="py-4 px-6 text-right text-slate-600 dark:text-slate-300">Margin: {((profitLossSummary.npm_realization / profitLossSummary.omset_finance_realization) * 100).toFixed(1)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
