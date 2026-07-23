"use client";

import React, { useState, useMemo } from "react";
import {
  Wallet,
  Plus,
  Trash2,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Building2,
  FileSpreadsheet,
  Link as LinkIcon,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboard } from "@/context/DashboardContext";
import { CashFlowItem } from "@/types";

export default function BukuKasPage() {
  const { cashFlow, addCashFlow, deleteCashFlow } = useDashboard();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formDate, setFormDate] = useState("2026-07-16");
  const [formDesc, setFormDesc] = useState("");
  const [formChannel, setFormChannel] = useState("Marketplace");
  const [formAccount, setFormAccount] = useState("Kas BCA");
  const [formType, setFormType] = useState<"IN" | "OUT">("IN");
  const [formAmount, setFormAmount] = useState<number>(5000000);
  const [formProofLink, setFormProofLink] = useState<string>("");

  // Filter list
  const filteredList = useMemo(() => {
    return cashFlow.filter((item) => {
      const channel = item.channel || "Marketplace";
      if (selectedChannel !== "all" && channel !== selectedChannel) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.description.toLowerCase().includes(query) ||
          channel.toLowerCase().includes(query) ||
          (item.account || "Kas BCA").toLowerCase().includes(query) ||
          item.date.includes(query)
        );
      }
      return true;
    });
  }, [cashFlow, selectedChannel, searchQuery]);

  // Summary calculation
  const summary = useMemo(() => {
    const currentBalance = cashFlow.length > 0 ? cashFlow[cashFlow.length - 1].running_balance : 0;
    const totalIn = filteredList.reduce((acc, c) => acc + c.cash_in, 0);
    const totalOut = filteredList.reduce((acc, c) => acc + c.cash_out, 0);
    return { currentBalance, totalIn, totalOut, count: filteredList.length };
  }, [cashFlow, filteredList]);

  // Unique channels
  const channels = useMemo(() => {
    const set = new Set(cashFlow.map((c) => c.channel || "Marketplace"));
    return Array.from(set);
  }, [cashFlow]);

  // Chart data
  const chartData = useMemo(() => {
    return filteredList.map((c) => ({
      date: c.date,
      "Kas Masuk": c.cash_in,
      "Kas Keluar": c.cash_out,
      "Saldo Running": c.running_balance,
      desc: c.description,
    }));
  }, [filteredList]);

  const handleOpenAdd = () => {
    setFormDate(`2026-07-${cashFlow.length + 1 > 9 ? cashFlow.length + 1 : `0${cashFlow.length + 1}`}`);
    setFormDesc("");
    setFormChannel("Marketplace");
    setFormAccount("Kas BCA");
    setFormType("IN");
    setFormAmount(3500000);
    setFormProofLink("");
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCashFlow({
      date: formDate,
      description: formDesc,
      channel: formChannel,
      account: formAccount,
      cash_in: formType === "IN" ? Number(formAmount) : 0,
      cash_out: formType === "OUT" ? Number(formAmount) : 0,
      receipt_url: formProofLink || null,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
            <Wallet className="w-4 h-4" />
            <span>Modul Rekonsiliasi Kas</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Buku Kas & Ledger Arus Kas (ANTRASIDA-ARUS KAS)
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Pencatatan keluar masuk kas secara kronologis dengan penghitungan <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">Running Balance</code> otomatis.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Transaksi Kas Baru</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-sky-500 relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase">Saldo Kas Akhir (Running Balance)</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            Rp {summary.currentBalance.toLocaleString("id-ID")}
          </div>
          <span className="text-xs text-sky-400 font-semibold mt-2 block">
            Posisi kas terupdate di {cashFlow[cashFlow.length - 1]?.account || "Kas BCA"}
          </span>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-emerald-500 relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Akumulasi Kas Masuk
          </span>
          <div className="text-2xl font-black text-emerald-500 mt-2">
            Rp {summary.totalIn.toLocaleString("id-ID")}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-2 block">
            Pencairan marketplace & top up dana
          </span>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-rose-500 relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
            <ArrowDownRight className="w-4 h-4 text-rose-500" /> Akumulasi Kas Keluar
          </span>
          <div className="text-2xl font-black text-rose-500 mt-2">
            Rp {summary.totalOut.toLocaleString("id-ID")}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-2 block">
            Bayar hutang, servis, KOL & ongkir manual
          </span>
        </div>
      </div>

      {/* Chart Kas Masuk vs Kas Keluar */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Perbandingan Kas Masuk vs Kas Keluar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Visualisasi transaksi harian dari buku kas (dalam Rupiah)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" /> Kas Masuk
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" /> Kas Keluar
            </span>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              <Bar dataKey="Kas Masuk" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Kas Keluar" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80">
        <div className="p-5 border-b border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-5 h-5 text-sky-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Daftar Transaksi Arus Kas
            </h3>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedChannel("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors shrink-0 ${selectedChannel === "all" ? "bg-sky-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
              >
                Semua Saluran
              </button>
              {channels.map((ch) => (
                <button
                  key={ch}
                  onClick={() => setSelectedChannel(ch)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors shrink-0 ${selectedChannel === ch ? "bg-sky-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari keterangan / akun..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-6">Tanggal</th>
                <th className="py-3.5 px-4">Keterangan Transaksi</th>
                <th className="py-3.5 px-4">Saluran / Channel</th>
                <th className="py-3.5 px-4">Akun Rekening</th>
                <th className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">Kas Masuk (In)</th>
                <th className="py-3.5 px-4 text-rose-600 dark:text-rose-400">Kas Keluar (Out)</th>
                <th className="py-3.5 px-4 font-black text-sky-500">Saldo Running Balance</th>
                <th className="py-3.5 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60 text-xs font-semibold">
              {filteredList.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-6 font-mono text-slate-500 dark:text-slate-400">{item.date}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    <div className="flex flex-col gap-1">
                      <span>{item.description}</span>
                      {item.receipt_url && (
                        <a href={item.receipt_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-sky-500 hover:text-sky-600 transition-colors bg-sky-500/10 w-max px-2 py-0.5 rounded">
                          <LinkIcon className="w-3 h-3" /> Lihat Nota / Bukti
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {item.channel || "Marketplace"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-indigo-500 font-bold">{item.account || "Kas BCA"}</td>
                  <td className="py-3 px-4 font-black text-emerald-500">
                    {item.cash_in > 0 ? `+Rp ${item.cash_in.toLocaleString("id-ID")}` : "-"}
                  </td>
                  <td className="py-3 px-4 font-black text-rose-500">
                    {item.cash_out > 0 ? `-Rp ${item.cash_out.toLocaleString("id-ID")}` : "-"}
                  </td>
                  <td className="py-3 px-4 font-black text-sky-500">
                    Rp {item.running_balance.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => deleteCashFlow(item.id)}
                      className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors"
                      title="Hapus Transaksi Kas"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Belum ada transaksi kas yang sesuai filter.
                  </td>
                </tr>
              )}
            </tbody>
            {filteredList.length > 0 && (
              <tfoot>
                <tr className="bg-slate-100/90 dark:bg-slate-800/90 border-t-2 border-slate-300 dark:border-slate-700 font-black text-xs">
                  <td colSpan={4} className="py-3.5 px-6 uppercase text-slate-900 dark:text-white">TOTAL REKAP PERIODE INI</td>
                  <td className="py-3.5 px-4 text-emerald-500">+Rp {summary.totalIn.toLocaleString("id-ID")}</td>
                  <td className="py-3.5 px-4 text-rose-500">-Rp {summary.totalOut.toLocaleString("id-ID")}</td>
                  <td className="py-3.5 px-4 text-sky-500">Saldo Akhir: Rp {summary.currentBalance.toLocaleString("id-ID")}</td>
                  <td className="py-3.5 px-6"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* MODAL ADD FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center text-sky-500 font-bold">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                    Catat Transaksi Kas Baru
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Running balance akan langsung dihitung & diurutkan.
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

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Jenis Transaksi</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormType("IN")}
                      className={`py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${formType === "IN" ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                    >
                      <ArrowUpRight className="w-4 h-4" /> Masuk (In)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormType("OUT")}
                      className={`py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${formType === "OUT" ? "bg-rose-500 text-white shadow-md shadow-rose-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                    >
                      <ArrowDownRight className="w-4 h-4" /> Keluar (Out)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tanggal Transaksi</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Keterangan Transaksi</label>
                <input
                  type="text"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  required
                  placeholder="mis: Tarik dana dari TikTok Shop / Bayar servis..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Saluran / Channel</label>
                  <input
                    type="text"
                    value={formChannel}
                    onChange={(e) => setFormChannel(e.target.value)}
                    required
                    placeholder="mis: Marketplace / Dana Antrasida"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Akun Rekening</label>
                  <input
                    type="text"
                    value={formAccount}
                    onChange={(e) => setFormAccount(e.target.value)}
                    required
                    placeholder="mis: Kas BCA / Akun Iklan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Nominal (Rupiah)</label>
                <input
                  type="number"
                  value={formAmount}
                  onChange={(e) => setFormAmount(Number(e.target.value))}
                  required
                  min={1}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-base font-black text-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 flex items-center gap-1">
                  Link Bukti / Nota (Opsional) <LinkIcon className="w-3 h-3 text-slate-400" />
                </label>
                <input
                  type="url"
                  value={formProofLink}
                  onChange={(e) => setFormProofLink(e.target.value)}
                  placeholder="Paste link Google Drive disini..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition-all"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
