"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Layers,
  ArrowRightLeft,
  X,
  Trash2,
  FileText,
} from "lucide-react";
import * as XLSX from "xlsx";
import { useDashboard } from "@/context/DashboardContext";
import { JournalEntry, JournalItem } from "@/types";

export default function JurnalUmumPage() {
  const { journalEntries, accounts, selectedBrandId, addJournalEntry } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAccountCode, setSelectedAccountCode] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for Manual Journal Entry (Jurnal Memorial)
  const [formDate, setFormDate] = useState(new Date().toISOString().split("T")[0]);
  const [formDesc, setFormDesc] = useState("");
  const [formBrandId, setFormBrandId] = useState("brand-antrasida");
  const [formItems, setFormItems] = useState<JournalItem[]>([
    { account_code: "1101", account_name: "Kas Bank BCA", debit: 0, credit: 0 },
    { account_code: "4101", account_name: "Pendapatan Penjualan Antrasida", debit: 0, credit: 0 },
  ]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return journalEntries.filter((entry) => {
      // Brand filter
      if (selectedBrandId !== "all" && entry.brand_id && entry.brand_id !== selectedBrandId) {
        return false;
      }
      // Search query
      if (
        searchQuery &&
        !entry.transaction_code.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !entry.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Account code filter (Buku Besar view)
      if (selectedAccountCode !== "all") {
        const hasAccount = entry.items.some((item) => item.account_code === selectedAccountCode);
        if (!hasAccount) return false;
      }
      return true;
    });
  }, [journalEntries, selectedBrandId, searchQuery, selectedAccountCode]);

  // Calculate totals
  const totals = useMemo(() => {
    let debit = 0;
    let credit = 0;
    filteredEntries.forEach((entry) => {
      entry.items.forEach((item) => {
        if (selectedAccountCode === "all" || item.account_code === selectedAccountCode) {
          debit += item.debit;
          credit += item.credit;
        }
      });
    });
    return { debit, credit, isBalanced: Math.abs(debit - credit) < 0.01 || selectedAccountCode !== "all" };
  }, [filteredEntries, selectedAccountCode]);

  // Form total calculation
  const formTotals = useMemo(() => {
    const debit = formItems.reduce((acc, curr) => acc + (Number(curr.debit) || 0), 0);
    const credit = formItems.reduce((acc, curr) => acc + (Number(curr.credit) || 0), 0);
    return { debit, credit, isBalanced: Math.abs(debit - credit) < 0.01 && debit > 0 };
  }, [formItems]);

  const handleAddItem = () => {
    setFormItems([...formItems, { account_code: "1101", account_name: "Kas Bank BCA", debit: 0, credit: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (formItems.length <= 2) return;
    setFormItems(formItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof JournalItem, value: string | number) => {
    const updated = [...formItems];
    if (field === "account_code") {
      const acc = accounts.find((a) => a.code === value);
      updated[index] = {
        ...updated[index],
        account_code: String(value),
        account_name: acc ? acc.name : "Akun Tidak Dikenal",
      };
    } else {
      updated[index] = { ...updated[index], [field]: Number(value) || 0 };
    }
    setFormItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTotals.isBalanced) {
      alert("Total Debit dan Kredit harus sama (Seimbang / Balanced) dan lebih besar dari 0!");
      return;
    }
    addJournalEntry({
      date: formDate,
      description: formDesc || "Jurnal Memorial / Penyesuaian",
      brand_id: formBrandId,
      is_automated: false,
      items: formItems,
    });
    setIsModalOpen(false);
    setFormDesc("");
    setFormItems([
      { account_code: "1101", account_name: "Kas Bank BCA", debit: 0, credit: 0 },
      { account_code: "4101", account_name: "Pendapatan Penjualan Antrasida", debit: 0, credit: 0 },
    ]);
  };

  const handleExportExcel = () => {
    const data: any[] = [];
    filteredEntries.forEach((entry) => {
      entry.items.forEach((item) => {
        if (selectedAccountCode === "all" || item.account_code === selectedAccountCode) {
          data.push({
            "Kode Transaksi": entry.transaction_code,
            "Tanggal": entry.date,
            "Keterangan": entry.description,
            "Kode Akun": item.account_code,
            "Nama Akun": item.account_name,
            "Debit (IDR)": item.debit,
            "Kredit (IDR)": item.credit
          });
        }
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jurnal Umum");

    // Optional: Auto-adjust column width
    const colWidths = [
      { wch: 18 }, { wch: 12 }, { wch: 35 }, { wch: 12 }, { wch: 25 }, { wch: 15 }, { wch: 15 }
    ];
    worksheet["!cols"] = colWidths;

    XLSX.writeFile(workbook, `Jurnal_Umum_SMB_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-slate-900/40 to-emerald-500/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Jurnal Umum & Buku Besar (General Ledger)
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                Accurate ERP Suite
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
              Standar akuntansi berpasangan (Double-Entry) otomatis dari transaksi operasional & jurnal penyesuaian.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            Export Excel
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-emerald-500 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Catat Jurnal Manual
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Mutasi Debit
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
              Rp {totals.debit.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Sisi kiri akuntansi (Aset & Beban)
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Mutasi Kredit
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
              Rp {totals.credit.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              Sisi kanan akuntansi (Kewajiban, Ekuitas, Pendapatan)
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Status Keseimbangan (Audit)
            </p>
            <div className="flex items-center gap-2 mt-2">
              {totals.isBalanced ? (
                <>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    SEIMBANG (BALANCED)
                  </span>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </>
              ) : (
                <>
                  <span className="text-xl font-black text-rose-600 dark:text-rose-400">
                    TIDAK SEIMBANG
                  </span>
                  <AlertCircle className="w-6 h-6 text-rose-500" />
                </>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
              Selisih: Rp {Math.abs(totals.debit - totals.credit).toLocaleString("id-ID")}
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              totals.isBalanced
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
            }`}
          >
            <ArrowRightLeft className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="glass-card p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari no bukti / keterangan jurnal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <Filter className="w-4 h-4 text-indigo-500" />
            Filter Buku Besar (Ledger):
          </div>
          <select
            value={selectedAccountCode}
            onChange={(e) => setSelectedAccountCode(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Semua Akun (Jurnal Umum Gabungan)</option>
            {accounts.map((acc) => (
              <option key={acc.code} value={acc.code}>
                [{acc.code}] {acc.name} ({acc.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Journal Table Section */}
      <div className="glass-card rounded-2xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-900/70 text-slate-600 dark:text-slate-400 text-xs font-extrabold uppercase tracking-wider">
                <th className="p-4 w-40">No Bukti Jurnal</th>
                <th className="p-4 w-32">Tanggal</th>
                <th className="p-4">Keterangan / Transaksi</th>
                <th className="p-4 w-64">Nama & Kode Akun (COA)</th>
                <th className="p-4 text-right w-44">Debit (IDR)</th>
                <th className="p-4 text-right w-44">Kredit (IDR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40 text-sm">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                    Tidak ada transaksi jurnal yang cocok dengan filter Anda.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <React.Fragment key={entry.id}>
                    {/* Primary Row header for the transaction */}
                    <tr className="bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 align-top" rowSpan={entry.items.length || 1}>
                        <div className="flex flex-col gap-1">
                          <span>{entry.transaction_code}</span>
                          {entry.is_automated && (
                            <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 w-fit">
                              AUTO ERP
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 align-top text-xs" rowSpan={entry.items.length || 1}>
                        {entry.date}
                      </td>
                      <td className="p-4 font-bold text-slate-800 dark:text-slate-200 align-top" rowSpan={entry.items.length || 1}>
                        {entry.description}
                      </td>
                      {/* First item render */}
                      {entry.items.length > 0 && (
                        <>
                          <td className={`p-4 font-medium ${entry.items[0].credit > 0 ? "pl-10 text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-slate-100"}`}>
                            <span className="font-mono font-bold mr-2 text-xs text-indigo-500 dark:text-indigo-400">
                              [{entry.items[0].account_code}]
                            </span>
                            {entry.items[0].account_name}
                          </td>
                          <td className="p-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                            {entry.items[0].debit > 0 ? `Rp ${entry.items[0].debit.toLocaleString("id-ID")}` : "-"}
                          </td>
                          <td className="p-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                            {entry.items[0].credit > 0 ? `Rp ${entry.items[0].credit.toLocaleString("id-ID")}` : "-"}
                          </td>
                        </>
                      )}
                    </tr>
                    {/* Remaining items render */}
                    {entry.items.slice(1).map((item, idx) => (
                      <tr key={`${entry.id}-item-${idx}`} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className={`p-4 font-medium ${item.credit > 0 ? "pl-10 text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-slate-100"}`}>
                          <span className="font-mono font-bold mr-2 text-xs text-indigo-500 dark:text-indigo-400">
                            [{item.account_code}]
                          </span>
                          {item.account_name}
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                          {item.debit > 0 ? `Rp ${item.debit.toLocaleString("id-ID")}` : "-"}
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                          {item.credit > 0 ? `Rp ${item.credit.toLocaleString("id-ID")}` : "-"}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
            {/* Table Footer */}
            <tfoot className="bg-slate-100 dark:bg-slate-900 border-t-2 border-slate-300 dark:border-slate-700 font-black text-sm">
              <tr>
                <td colSpan={4} className="p-4 text-right uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Total Mutasi Jurnal {selectedAccountCode !== "all" ? `[${selectedAccountCode}]` : "Gabungan"}:
                </td>
                <td className="p-4 text-right font-mono text-emerald-600 dark:text-emerald-400">
                  Rp {totals.debit.toLocaleString("id-ID")}
                </td>
                <td className="p-4 text-right font-mono text-indigo-600 dark:text-indigo-400">
                  Rp {totals.credit.toLocaleString("id-ID")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Modal Catat Jurnal Manual */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/80 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Catat Jurnal Manual / Penyesuaian (Jurnal Memorial)
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Tanggal Jurnal
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Keterangan / Memo Jurnal
                  </label>
                  <input
                    type="text"
                    placeholder="Misal: Penyesuaian Beban Sewa Kantor / Koreksi Saldo Bank"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Baris Jurnal Akuntansi (Debit vs Kredit)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="flex items-center gap-1 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Baris Akun
                  </button>
                </div>

                <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80">
                  {formItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      <div className="md:col-span-5">
                        <select
                          value={item.account_code}
                          onChange={(e) => handleItemChange(index, "account_code", e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {accounts.map((acc) => (
                            <option key={acc.code} value={acc.code}>
                              [{acc.code}] {acc.name} ({acc.category})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-3">
                        <input
                          type="number"
                          placeholder="Debit (IDR)"
                          value={item.debit || ""}
                          onChange={(e) => handleItemChange(index, "debit", e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <input
                          type="number"
                          placeholder="Kredit (IDR)"
                          value={item.credit || ""}
                          onChange={(e) => handleItemChange(index, "credit", e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          disabled={formItems.length <= 2}
                          className="p-2 text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Balance Check display */}
                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-extrabold">
                    <div className="flex items-center gap-4">
                      <span>
                        Total Debit: <span className="font-mono text-emerald-600 dark:text-emerald-400">Rp {formTotals.debit.toLocaleString("id-ID")}</span>
                      </span>
                      <span>
                        Total Kredit: <span className="font-mono text-indigo-600 dark:text-indigo-400">Rp {formTotals.credit.toLocaleString("id-ID")}</span>
                      </span>
                    </div>
                    <div>
                      {formTotals.isBalanced ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Seimbang (Balanced)
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1.5 font-bold">
                          <AlertCircle className="w-4 h-4 text-rose-500" /> Selisih: Rp {Math.abs(formTotals.debit - formTotals.credit).toLocaleString("id-ID")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!formTotals.isBalanced}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-50 transition-all"
                >
                  Simpan Jurnal & Buku Besar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
