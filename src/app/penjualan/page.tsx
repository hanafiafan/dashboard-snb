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
  FileSpreadsheet,
  ArrowRight,
  X,
  UploadCloud,
  FileSpreadsheet as FileSpreadsheetIcon,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import * as XLSX from "xlsx";
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
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json<any>(ws);

        if (data && data.length > 0) {
          let successCount = 0;
          data.forEach((row, index) => {
            // Mapping default template (can be adjusted)
            const dateVal = row["Tanggal"] || `2026-07-${String(index + 1).padStart(2, "0")}`;
            const brandCode = row["Unit/Brand"] || "Antrasida";
            const brand_id = brandCode.toLowerCase().includes("agro") ? "brand-agrodelta" : "brand-antrasida";
            
            const omset_marketing = Number(row["Omset Marketing"] || row["Penjualan Kotor"] || 5000000);
            const omset_finance = Number(row["Omset Finance"] || row["Penjualan Bersih"] || omset_marketing * 0.9);
            const valid_orders = Number(row["Valid Orders"] || row["Pesanan"] || 50);
            const promotion_cost = Number(row["Biaya Promosi"] || 0);
            const ads_spend = Number(row["Ads Spend"] || row["Beban Iklan"] || 0);
            
            // Re-calculate automatic rates based on brand to ensure matching auto-journaling
            const selectedBrand = brands.find((b) => b.id === brand_id) || brands[0];
            const admin_fee = omset_finance * (selectedBrand?.default_admin_rate || 0.16);
            const processing_fee = valid_orders * (selectedBrand?.default_processing_fee || 1250);
            const shipping_cost = omset_finance * (selectedBrand?.default_shipping_rate || 0.0899);
            const affiliate_cost = omset_finance * (selectedBrand?.default_affiliate_rate || 0.09);
            const hpp_cost = omset_finance * (selectedBrand?.default_hpp_rate || 0.1682);

            addDailySale({
              brand_id,
              date: dateVal,
              day_number: Number(dateVal.split("-")[2] || index + 1),
              omset_marketing,
              omset_finance,
              valid_orders,
              admin_fee,
              processing_fee,
              promotion_cost,
              ads_spend,
              shipping_cost,
              affiliate_cost,
              hpp_cost,
              notes: "Import E-Commerce (Shopee/Tokped)",
            });
            successCount++;
          });
          
          alert(`Sukses! ${successCount} baris data berhasil diimpor dan Auto-Journaling berhasil dieksekusi.`);
          setIsImportModalOpen(false);
        }
      } catch (err) {
        console.error("Error parsing file", err);
        alert("Gagal membaca file Excel. Pastikan formatnya benar.");
      }
    };
    reader.readAsBinaryString(file);
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

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2 transition-all"
          >
            <UploadCloud className="w-4 h-4 text-emerald-500" />
            <span>Import E-Commerce</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Transaksi</span>
          </button>
        </div>
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
                    <div className="flex items-center justify-end gap-1.5">
                      <span>(Kalkulasi Akumulasi Beban)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
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
      {/* IMPORT MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 md:p-8 border border-slate-800/80 shadow-2xl relative">
            <button
              onClick={() => setIsImportModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Import Data E-Commerce</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Upload file Excel/CSV dari Shopee, Tokopedia, dll.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-100 dark:bg-slate-900/80 p-5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-4">
                <FileSpreadsheetIcon className="w-10 h-10 text-emerald-500 mx-auto opacity-80" />
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Pilih file .xlsx atau .csv</p>
                  <p className="text-[11px] text-slate-500 mt-1">Sistem akan secara otomatis membaca baris, mengkalkulasi margin, dan melakukan Auto-Journaling ke Buku Besar.</p>
                </div>
                <input 
                  type="file" 
                  accept=".xlsx, .xls, .csv" 
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-500 hover:file:bg-emerald-500/20 cursor-pointer"
                />
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <strong>Peringatan Auto-Journaling:</strong>
                  <p className="mt-1">Untuk setiap baris transaksi yang diimpor, sistem akan mencatat Jurnal Memorial ganda untuk Piutang, HPP, Ongkir, dan Penjualan secara otomatis ke Buku Besar.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
