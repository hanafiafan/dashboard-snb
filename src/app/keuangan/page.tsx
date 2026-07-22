"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Box,
  TrendingDown,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  CreditCard,
  Building2,
  PieChart,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export default function ManajemenKeuanganPage() {
  const {
    revenueWithdrawals,
    addRevenueWithdrawal,
    deleteRevenueWithdrawal,
    inventoryExpenditures,
    addInventoryExpenditure,
    deleteInventoryExpenditure,
    expenseBudgets,
    updateExpenseBudget,
    accountsReceivable,
    addAccountReceivable,
    updateAccountReceivableStatus,
  } = useDashboard();

  const [activeTab, setActiveTab] = useState<"pendapatan" | "barang" | "anggaran" | "piutang">("pendapatan");

  // Modal forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"pendapatan" | "barang" | "piutang">("pendapatan");

  // Form states
  const [formDate, setFormDate] = useState("2026-07-16");
  const [formAmount, setFormAmount] = useState<number>(3500000);
  const [formNotes, setFormNotes] = useState("");
  const [formDebtor, setFormDebtor] = useState("");

  const handleOpenModal = (type: "pendapatan" | "barang" | "piutang") => {
    setModalType(type);
    setFormDate("2026-07-16");
    setFormAmount(type === "piutang" ? 1110000 : 4500000);
    setFormNotes("");
    setFormDebtor("Agrodelta (Pinjaman Top Up Ads)");
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "pendapatan") {
      addRevenueWithdrawal({
        brand_id: "brand-antrasida",
        date: formDate,
        amount: Number(formAmount),
        notes: formNotes || "Penarikan dari saldo marketplace",
      });
    } else if (modalType === "barang") {
      addInventoryExpenditure({
        brand_id: "brand-antrasida",
        date: formDate,
        amount: Number(formAmount),
        notes: formNotes || "Pengadaan bahan baku / kemasan",
      });
    } else if (modalType === "piutang") {
      addAccountReceivable({
        brand_id: "brand-antrasida",
        date: formDate,
        debtor_source: formDebtor,
        amount: Number(formAmount),
        status: "Pending",
        notes: formNotes || "Pinjaman dana top up akun iklan",
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
          <DollarSign className="w-4 h-4" />
          <span>Manajemen Finansial Terpadu</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          Buku Keuangan, Arus Barang, Anggaran & Piutang
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Mengonsolidasikan sheet <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">ANTRASIDA-PENDAPATAN</code>, <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">ARUS BARANG</code>, <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">PENGELUARAN</code>, & <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">PIUTANG</code>.
        </p>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("pendapatan")}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
            activeTab === "pendapatan"
              ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/20"
              : "glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>1. Penarikan Pendapatan</span>
          <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">{revenueWithdrawals.length}</span>
        </button>

        <button
          onClick={() => setActiveTab("barang")}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
            activeTab === "barang"
              ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/20"
              : "glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Box className="w-4 h-4" />
          <span>2. Pengeluaran Arus Barang</span>
          <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">{inventoryExpenditures.length}</span>
        </button>

        <button
          onClick={() => setActiveTab("anggaran")}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
            activeTab === "anggaran"
              ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/20"
              : "glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>3. Anggaran & Realisasi (PENGELUARAN)</span>
        </button>

        <button
          onClick={() => setActiveTab("piutang")}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
            activeTab === "piutang"
              ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/20"
              : "glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>4. Buku Piutang & Top Up</span>
          <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">{accountsReceivable.length}</span>
        </button>
      </div>

      {/* TAB 1: PENARIKAN PENDAPATAN */}
      {activeTab === "pendapatan" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                Daftar Penarikan Pendapatan (ANTRASIDA-PENDAPATAN)
              </h3>
              <p className="text-xs text-slate-500">
                Akumulasi Pencairan: <strong className="text-emerald-500">Rp {revenueWithdrawals.reduce((a, c) => a + c.amount, 0).toLocaleString("id-ID")}</strong>
              </p>
            </div>
            <button
              onClick={() => handleOpenModal("pendapatan")}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Catat Penarikan
            </button>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 font-extrabold uppercase text-slate-500">
                  <th className="py-3.5 px-6">Tanggal</th>
                  <th className="py-3.5 px-4">Brand / Unit</th>
                  <th className="py-3.5 px-4">Nominal Penarikan</th>
                  <th className="py-3.5 px-4">Keterangan / Sumber Saldo</th>
                  <th className="py-3.5 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60 font-semibold">
                {revenueWithdrawals.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-6 font-mono text-slate-500">{item.date}</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded font-extrabold bg-emerald-500/15 text-emerald-500">ANTRASIDA</span></td>
                    <td className="py-3 px-4 font-black text-emerald-500 text-sm">Rp {item.amount.toLocaleString("id-ID")}</td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.notes}</td>
                    <td className="py-3 px-6 text-center">
                      <button onClick={() => deleteRevenueWithdrawal(item.id)} className="p-1.5 rounded-lg hover:bg-rose-500 hover:text-white text-slate-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PENGELUARAN ARUS BARANG */}
      {activeTab === "barang" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                Buku Arus Barang & Pengadaan (ANTRASIDA-ARUS BARANG)
              </h3>
              <p className="text-xs text-slate-500">
                Total Belanja Stok/Kemasan: <strong className="text-rose-500">Rp {inventoryExpenditures.reduce((a, c) => a + c.amount, 0).toLocaleString("id-ID")}</strong>
              </p>
            </div>
            <button
              onClick={() => handleOpenModal("barang")}
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Catat Belanja Barang
            </button>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 font-extrabold uppercase text-slate-500">
                  <th className="py-3.5 px-6">Tanggal</th>
                  <th className="py-3.5 px-4">Brand / Unit</th>
                  <th className="py-3.5 px-4">Nominal Belanja (Rp)</th>
                  <th className="py-3.5 px-4">Keterangan Barang / Bahan Baku</th>
                  <th className="py-3.5 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60 font-semibold">
                {inventoryExpenditures.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-6 font-mono text-slate-500">{item.date}</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded font-extrabold bg-indigo-500/15 text-indigo-500">ANTRASIDA</span></td>
                    <td className="py-3 px-4 font-black text-rose-500 text-sm">Rp {item.amount.toLocaleString("id-ID")}</td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.notes}</td>
                    <td className="py-3 px-6 text-center">
                      <button onClick={() => deleteInventoryExpenditure(item.id)} className="p-1.5 rounded-lg hover:bg-rose-500 hover:text-white text-slate-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ANGGARAN & PENGELUARAN */}
      {activeTab === "anggaran" && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
              Anggaran Biaya & Pengeluaran (ANTRASIDA-PENGELUARAN)
            </h3>
            <p className="text-xs text-slate-500">
              Perbandingan pagu anggaran estimasi terhadap pengeluaran realisasi aktual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expenseBudgets.map((b) => {
              const pct = b.estimated_amount > 0 ? (b.realized_amount / b.estimated_amount) * 100 : 0;
              return (
                <div key={b.id} className="glass-card p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{b.category}</h4>
                    <span className="px-2.5 py-1 rounded text-xs font-bold bg-indigo-500/15 text-indigo-500">{b.period}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Estimasi Anggaran</span>
                      <div className="text-base font-black text-slate-800 dark:text-slate-200 mt-0.5">
                        Rp {b.estimated_amount.toLocaleString("id-ID")}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Realisasi Aktual</span>
                      <div className="text-base font-black text-rose-500 mt-0.5">
                        Rp {b.realized_amount.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500">Pemanfaatan Anggaran</span>
                      <span className={pct > 100 ? "text-rose-500" : "text-emerald-500"}>{pct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${pct > 100 ? "bg-rose-500" : "bg-gradient-to-r from-emerald-500 to-indigo-500"}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: PIUTANG & TOP UP */}
      {activeTab === "piutang" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                Buku Piutang & Pinjaman Top Up (ANTRASIDA-PIUTANG)
              </h3>
              <p className="text-xs text-slate-500">
                Total Piutang Belum Lunas: <strong className="text-amber-500">Rp {accountsReceivable.filter(a => a.status !== "Lunas").reduce((a, c) => a + c.amount, 0).toLocaleString("id-ID")}</strong>
              </p>
            </div>
            <button
              onClick={() => handleOpenModal("piutang")}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Catat Piutang Baru
            </button>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 font-extrabold uppercase text-slate-500">
                  <th className="py-3.5 px-6">Tanggal</th>
                  <th className="py-3.5 px-4">Debitur / Peminjam</th>
                  <th className="py-3.5 px-4">Nominal Piutang</th>
                  <th className="py-3.5 px-4">Keterangan</th>
                  <th className="py-3.5 px-4 text-center">Status Pembayaran</th>
                  <th className="py-3.5 px-6 text-center">Aksi Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/60 font-semibold">
                {accountsReceivable.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-6 font-mono text-slate-500">{item.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{item.debtor_source}</td>
                    <td className="py-3 px-4 font-black text-amber-500 text-sm">Rp {item.amount.toLocaleString("id-ID")}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{item.notes}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                        item.status === "Lunas" ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30" : "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                      }`}>
                        {item.status === "Lunas" ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>Lunas</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span>Pending</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {item.status !== "Lunas" ? (
                          <button
                            onClick={() => updateAccountReceivableStatus(item.id, "Lunas")}
                            className="px-2.5 py-1 rounded bg-emerald-500 text-white font-bold text-[10px] hover:bg-emerald-600"
                          >
                            Tandai Lunas
                          </button>
                        ) : (
                          <button
                            onClick={() => updateAccountReceivableStatus(item.id, "Pending")}
                            className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 font-bold text-[10px] hover:bg-slate-300"
                          >
                            Set Pending
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                {modalType === "pendapatan" && "Catat Penarikan Pendapatan"}
                {modalType === "barang" && "Catat Pengeluaran Arus Barang"}
                {modalType === "piutang" && "Catat Piutang / Pinjaman Top Up"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tanggal</label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                />
              </div>

              {modalType === "piutang" && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Debitur / Peminjam</label>
                  <input
                    type="text"
                    value={formDebtor}
                    onChange={(e) => setFormDebtor(e.target.value)}
                    required
                    placeholder="mis: Agrodelta / Nuexagro..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Nominal (Rupiah)</label>
                <input
                  type="number"
                  value={formAmount}
                  onChange={(e) => setFormAmount(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-base font-black text-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Keterangan / Notes</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold text-xs">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-lg">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
