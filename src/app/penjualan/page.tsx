"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  Calculator,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { DailySale } from "@/types";

export default function PenjualanHarianPage() {
  const {
    brands,
    selectedBrandId,
    dailySales,
    addDailySale,
    updateDailySale,
    deleteDailySale,
  } = useDashboard();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<DailySale | null>(null);

  // Form state
  const [formBrandId, setFormBrandId] = useState("brand-antrasida");
  const [formDate, setFormDate] = useState("2026-07-16");
  const [formDayNumber, setFormDayNumber] = useState(16);
  const [formOmsetMarketing, setFormOmsetMarketing] = useState<number>(5000000);
  const [formOmsetFinance, setFormOmsetFinance] = useState<number>(4500000);
  const [formValidOrders, setFormValidOrders] = useState<number>(75);
  const [formPromotionCost, setFormPromotionCost] = useState<number>(0);
  const [formAdsSpend, setFormAdsSpend] = useState<number>(1500000);
  const [formNotes, setFormNotes] = useState("");

  // Live Auto-Calculation preview for form
  const previewCalculations = useMemo(() => {
    const selectedBrand = brands.find((b) => b.id === formBrandId) || brands[0];
    const admin_fee = formOmsetFinance * (selectedBrand?.default_admin_rate || 0.16);
    const processing_fee = formValidOrders * (selectedBrand?.default_processing_fee || 1250);
    const shipping_cost = formOmsetFinance * (selectedBrand?.default_shipping_rate || 0.0899);
    const affiliate_cost = formOmsetFinance * (selectedBrand?.default_affiliate_rate || 0.09);
    const hpp_cost = formOmsetFinance * (selectedBrand?.default_hpp_rate || 0.1682);

    const total_expense =
      admin_fee +
      processing_fee +
      Number(formPromotionCost || 0) +
      Number(formAdsSpend || 0) +
      shipping_cost +
      affiliate_cost +
      hpp_cost;

    const gross_margin = formOmsetFinance - total_expense;
    const gross_margin_pct = formOmsetFinance > 0 ? (gross_margin / formOmsetFinance) * 100 : 0;
    const roi = formAdsSpend > 0 ? (formOmsetFinance / formAdsSpend).toFixed(2) : "0.00";

    return {
      admin_fee,
      processing_fee,
      shipping_cost,
      affiliate_cost,
      hpp_cost,
      total_expense,
      gross_margin,
      gross_margin_pct,
      roi,
    };
  }, [formOmsetFinance, formValidOrders, formPromotionCost, formAdsSpend, formBrandId, brands]);

  // Filtered sales
  const filteredList = useMemo(() => {
    return dailySales
      .filter((s) => {
        if (selectedBrandId !== "all" && s.brand_id !== selectedBrandId) return false;
        if (searchQuery) {
          const matchDate = s.date.includes(searchQuery) || `tgl ${s.day_number}`.includes(searchQuery.toLowerCase());
          return matchDate;
        }
        return true;
      })
      .sort((a, b) => a.day_number - b.day_number);
  }, [dailySales, selectedBrandId, searchQuery]);

  // Summary calculation for filtered list
  const summary = useMemo(() => {
    return {
      totalOmsetMkg: filteredList.reduce((acc, c) => acc + c.omset_marketing, 0),
      totalOmsetFin: filteredList.reduce((acc, c) => acc + c.omset_finance, 0),
      totalOrders: filteredList.reduce((acc, c) => acc + c.valid_orders, 0),
      totalExpense: filteredList.reduce((acc, c) => acc + c.total_expense, 0),
      totalMargin: filteredList.reduce((acc, c) => acc + c.gross_margin, 0),
      totalAds: filteredList.reduce((acc, c) => acc + c.ads_spend, 0),
    };
  }, [filteredList]);

  const handleOpenAdd = () => {
    setEditingSale(null);
    setFormBrandId(selectedBrandId === "all" ? "brand-antrasida" : selectedBrandId);
    setFormDate(`2026-07-${filteredList.length + 1 > 9 ? filteredList.length + 1 : `0${filteredList.length + 1}`}`);
    setFormDayNumber(filteredList.length + 1);
    setFormOmsetMarketing(7500000);
    setFormOmsetFinance(6500000);
    setFormValidOrders(95);
    setFormPromotionCost(0);
    setFormAdsSpend(2200000);
    setFormNotes("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sale: DailySale) => {
    setEditingSale(sale);
    setFormBrandId(sale.brand_id);
    setFormDate(sale.date);
    setFormDayNumber(sale.day_number);
    setFormOmsetMarketing(sale.omset_marketing);
    setFormOmsetFinance(sale.omset_finance);
    setFormValidOrders(sale.valid_orders);
    setFormPromotionCost(sale.promotion_cost);
    setFormAdsSpend(sale.ads_spend);
    setFormNotes(sale.notes || "");
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSale) {
      updateDailySale(editingSale.id, {
        brand_id: formBrandId,
        date: formDate,
        day_number: Number(formDayNumber),
        omset_marketing: Number(formOmsetMarketing),
        omset_finance: Number(formOmsetFinance),
        valid_orders: Number(formValidOrders),
        admin_fee: previewCalculations.admin_fee,
        processing_fee: previewCalculations.processing_fee,
        promotion_cost: Number(formPromotionCost),
        ads_spend: Number(formAdsSpend),
        shipping_cost: previewCalculations.shipping_cost,
        affiliate_cost: previewCalculations.affiliate_cost,
        hpp_cost: previewCalculations.hpp_cost,
        notes: formNotes,
      });
    } else {
      addDailySale({
        brand_id: formBrandId,
        date: formDate,
        day_number: Number(formDayNumber),
        omset_marketing: Number(formOmsetMarketing),
        omset_finance: Number(formOmsetFinance),
        valid_orders: Number(formValidOrders),
        admin_fee: previewCalculations.admin_fee,
        processing_fee: previewCalculations.processing_fee,
        promotion_cost: Number(formPromotionCost),
        ads_spend: Number(formAdsSpend),
        shipping_cost: previewCalculations.shipping_cost,
        affiliate_cost: previewCalculations.affiliate_cost,
        hpp_cost: previewCalculations.hpp_cost,
        notes: formNotes,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
            <TrendingUp className="w-4 h-4" />
            <span>Modul Operasional Penjualan</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Penjualan Harian & Kalkulator Beban
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Data penjualan mengikuti format sheet <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">PENJUALAN HARIAN</code> lengkap dengan kalkulasi otomatis.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Transaksi Harian</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-emerald-500">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Omset Marketing</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            Rp {summary.totalOmsetMkg.toLocaleString("id-ID")}
          </div>
          <span className="text-xs text-emerald-500 font-semibold mt-1 block">
            {summary.totalOrders.toLocaleString("id-ID")} Pesanan Valid
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-indigo-500">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Omset Finance</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            Rp {summary.totalOmsetFin.toLocaleString("id-ID")}
          </div>
          <span className="text-xs text-indigo-400 font-semibold mt-1 block">
            Net yang masuk ke Finance
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-rose-500">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Beban & Biaya</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            Rp {summary.totalExpense.toLocaleString("id-ID")}
          </div>
          <span className="text-xs text-rose-400 font-semibold mt-1 block">
            Ads, Admin, Ongkir, Affiliasi, HPP
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-amber-500">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Margin Kotor</span>
          <div className="text-xl font-black text-emerald-500 mt-1">
            Rp {summary.totalMargin.toLocaleString("id-ID")}
          </div>
          <span className="text-xs text-amber-500 font-semibold mt-1 block">
            ROAS Rata-rata: {summary.totalAds > 0 ? (summary.totalOmsetFin / summary.totalAds).toFixed(2) : "0.00"}x
          </span>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80">
        <div className="p-5 border-b border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Tabel Rekap Penjualan Harian
            </h3>
            <span className="text-xs bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">
              {filteredList.length} Baris Data
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Tgl (mis: Tgl 5)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1300px]">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4">Tgl</th>
                <th className="py-3.5 px-3">Omset Mkg</th>
                <th className="py-3.5 px-3">Omset Fin</th>
                <th className="py-3.5 px-3">Orders</th>
                <th className="py-3.5 px-3 text-rose-500">Admin (16%)</th>
                <th className="py-3.5 px-3 text-rose-500">Proses</th>
                <th className="py-3.5 px-3 text-rose-500">Ads Spend</th>
                <th className="py-3.5 px-3 text-rose-500">Ongkir (8.9%)</th>
                <th className="py-3.5 px-3 text-rose-500">Aff (9%)</th>
                <th className="py-3.5 px-3 text-rose-500">HPP (16.8%)</th>
                <th className="py-3.5 px-3 font-black text-rose-600 dark:text-rose-400">Total Beban</th>
                <th className="py-3.5 px-3 font-black text-emerald-600 dark:text-emerald-400">Margin Kotor</th>
                <th className="py-3.5 px-3 text-center">Margin %</th>
                <th className="py-3.5 px-3 text-center">ROI</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60 text-xs font-semibold">
              {filteredList.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-black text-emerald-500">
                    Tgl {row.day_number}
                  </td>
                  <td className="py-3 px-3">Rp {row.omset_marketing.toLocaleString("id-ID")}</td>
                  <td className="py-3 px-3 text-indigo-500 font-bold">Rp {row.omset_finance.toLocaleString("id-ID")}</td>
                  <td className="py-3 px-3">{row.valid_orders}</td>
                  <td className="py-3 px-3 text-slate-500">Rp {row.admin_fee.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                  <td className="py-3 px-3 text-slate-500">Rp {row.processing_fee.toLocaleString("id-ID")}</td>
                  <td className="py-3 px-3 font-bold text-amber-500">Rp {row.ads_spend.toLocaleString("id-ID")}</td>
                  <td className="py-3 px-3 text-slate-500">Rp {row.shipping_cost.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                  <td className="py-3 px-3 text-slate-500">Rp {row.affiliate_cost.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                  <td className="py-3 px-3 text-slate-500">Rp {row.hpp_cost.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                  <td className="py-3 px-3 font-extrabold text-rose-500">
                    Rp {row.total_expense.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                  </td>
                  <td className={`py-3 px-3 font-extrabold ${row.gross_margin >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    Rp {row.gross_margin.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.gross_margin >= 0 ? "bg-emerald-500/15 text-emerald-500" : "bg-rose-500/15 text-rose-500"}`}>
                      {(row.gross_margin_percentage * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-extrabold text-sky-500">
                    {row.roi}x
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(row)}
                        className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-500 hover:text-white transition-colors"
                        title="Edit Data"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteDailySale(row.id)}
                        className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={15} className="py-12 text-center text-slate-400">
                    Belum ada data penjualan yang sesuai untuk filter ini.
                  </td>
                </tr>
              )}
            </tbody>
            {/* Total Row Footer */}
            {filteredList.length > 0 && (
              <tfoot>
                <tr className="bg-slate-100/90 dark:bg-slate-800/90 border-t-2 border-slate-300 dark:border-slate-700 font-black text-xs">
                  <td className="py-3.5 px-4 text-slate-900 dark:text-white uppercase">TOTAL</td>
                  <td className="py-3.5 px-3 text-emerald-500">Rp {summary.totalOmsetMkg.toLocaleString("id-ID")}</td>
                  <td className="py-3.5 px-3 text-indigo-500">Rp {summary.totalOmsetFin.toLocaleString("id-ID")}</td>
                  <td className="py-3.5 px-3">{summary.totalOrders}</td>
                  <td colSpan={6} className="py-3.5 px-3 text-right text-slate-400 font-normal italic">
                    (Kalkulasi Akumulasi Beban) 👉
                  </td>
                  <td className="py-3.5 px-3 text-rose-500">Rp {summary.totalExpense.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                  <td className="py-3.5 px-3 text-emerald-500">Rp {summary.totalMargin.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</td>
                  <td className="py-3.5 px-3 text-center text-emerald-500">
                    {summary.totalOmsetFin > 0 ? ((summary.totalMargin / summary.totalOmsetFin) * 100).toFixed(1) : 0}%
                  </td>
                  <td className="py-3.5 px-3 text-center text-sky-500">
                    {summary.totalAds > 0 ? (summary.totalOmsetFin / summary.totalAds).toFixed(2) : "0.00"}x
                  </td>
                  <td className="py-3.5 px-4"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* MODAL ADD / EDIT FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500 font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                    {editingSale ? "Edit Penjualan Harian" : "Catat Penjualan Harian Baru"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Semua komponen beban dihitung otomatis secara realtime!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Brand / Unit</label>
                  <select
                    value={formBrandId}
                    onChange={(e) => setFormBrandId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tanggal</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => {
                      setFormDate(e.target.value);
                      const day = new Date(e.target.value).getDate() || 1;
                      setFormDayNumber(day);
                    }}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Hari Ke- (1..31)</label>
                  <input
                    type="number"
                    value={formDayNumber}
                    onChange={(e) => setFormDayNumber(Number(e.target.value))}
                    min={1}
                    max={31}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Omset Marketing (Gross)</label>
                  <input
                    type="number"
                    value={formOmsetMarketing}
                    onChange={(e) => setFormOmsetMarketing(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-bold text-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Omset Finance (Net Masuk)</label>
                  <input
                    type="number"
                    value={formOmsetFinance}
                    onChange={(e) => setFormOmsetFinance(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-bold text-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Pesanan Valid (Orders)</label>
                  <input
                    type="number"
                    value={formValidOrders}
                    onChange={(e) => setFormValidOrders(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Ads Spend (Iklan)</label>
                  <input
                    type="number"
                    value={formAdsSpend}
                    onChange={(e) => setFormAdsSpend(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Biaya Promosi Lain</label>
                  <input
                    type="number"
                    value={formPromotionCost}
                    onChange={(e) => setFormPromotionCost(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
              </div>

              {/* LIVE AUTO-CALCULATION BOX */}
              <div className="bg-slate-100/90 dark:bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold text-emerald-500 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Preview Kalkulasi Otomatis (Sesuai Rumus Excel)
                  </span>
                  <span className="text-xs font-black text-sky-500">ROI: {previewCalculations.roi}x</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Biaya Admin (16%):</span>
                    <p className="font-bold text-rose-500 mt-0.5">Rp {previewCalculations.admin_fee.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Biaya Proses (1.250/ord):</span>
                    <p className="font-bold text-rose-500 mt-0.5">Rp {previewCalculations.processing_fee.toLocaleString("id-ID")}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Biaya Ongkir (8.99%):</span>
                    <p className="font-bold text-rose-500 mt-0.5">Rp {previewCalculations.shipping_cost.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Biaya Affiliasi (9%):</span>
                    <p className="font-bold text-rose-500 mt-0.5">Rp {previewCalculations.affiliate_cost.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Biaya HPP (16.82%):</span>
                    <p className="font-bold text-rose-500 mt-0.5">Rp {previewCalculations.hpp_cost.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Total Akumulasi Beban:</span>
                    <p className="font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">Rp {previewCalculations.total_expense.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between font-extrabold text-sm">
                  <span className="text-slate-700 dark:text-slate-300">Estimasi Margin Kotor:</span>
                  <span className={previewCalculations.gross_margin >= 0 ? "text-emerald-500" : "text-rose-500"}>
                    Rp {previewCalculations.gross_margin.toLocaleString("id-ID", { maximumFractionDigits: 0 })} ({previewCalculations.gross_margin_pct.toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Catatan Tambahan (Opsional)</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Keterangan transaksi hari ini..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all"
                >
                  {editingSale ? "Simpan Perubahan" : "Simpan Transaksi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
