"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calculator,
  TrendingUp,
  BookMarked,
  Scale,
  FileText,
  Search,
  ChevronRight,
  Sparkles,
  Layers,
  Sprout,
  ShieldCheck,
  Calendar,
  ArrowRight,
} from "lucide-react";
export default function PanduanSistemPage() {
  const [activeTab, setActiveTab] = useState<string>("workflow");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tabs = [
    { id: "workflow", label: "Alur Kerja Harian Admin", icon: TrendingUp },
    { id: "penjualan", label: "Penjualan & Kalkulator Beban", icon: Calculator },
    { id: "akuntansi", label: "Akuntansi ERP (Jurnal & Neraca)", icon: Scale },
    { id: "faktur", label: "Faktur Studio & Cetak Dokumen", icon: FileText },
    { id: "hpp_keuangan", label: "Katalog HPP & Keuangan", icon: Layers },
    { id: "custom_period", label: "Filter Tanggal Custom", icon: Calendar },
    { id: "faq", label: "Troubleshooting & FAQ", icon: HelpCircle },
  ];

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">

      <div className="px-8 max-w-7xl mx-auto space-y-8">
        {/* Banner Utama */}
        <div className="glass-panel p-8 relative overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/80 shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/4 -top-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Pusat Dokumentasi & Buku Panduan Resmi SMB</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Panduan Operasional & ERP Akuntansi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                  CV SURYA MITRA BERKAH (SMB)
                </span>
              </h1>
              <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed">
                Dokumentasi ini dirancang secara rinci, visual, dan mudah dipahami oleh Admin Operasional dan Finance agar proses penginputan transaksi harian, kalkulasi beban otomatis, pembukuan *Double-Entry*, dan pencetakan faktur berjalan akurat tanpa hambatan.
              </p>
            </div>

            <div className="w-full md:w-80 bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-xl space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Standar Kepatuhan SOP</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Setiap Admin wajib mengikuti urutan penginputan transaksi mulai dari Modul Penjualan Harian hingga pemeriksaan saldo akhir di Neraca Keuangan.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-md">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 scale-102"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-emerald-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari kata kunci (mis. HPP, PPN, Admin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="glass-panel p-8 border border-slate-800/80 bg-slate-900/60 shadow-xl min-h-[500px]">
          {/* TAB 1: WORKFLOW HARIAN ADMIN */}
          {activeTab === "workflow" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <TrendingUp className="w-7 h-7 text-emerald-400" />
                  <span>Alur Kerja Harian Admin Operasional & Keuangan SMB</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Ikuti 5 langkah SOP operasional harian di bawah ini agar seluruh laporan keuangan, neraca, dan arus kas selalu presisi *real-time*.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 relative space-y-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-black text-xs flex items-center justify-center">
                    01
                  </span>
                  <h3 className="font-bold text-white text-base">Pilih Rentang Tanggal & Brand</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Di Header atas, tentukan filter unit **Antrasida / Agrodelta** atau **Gabungan**, dan gunakan opsi **Custom Rentang Tanggal** jika ingin melihat periode spesifik.
                  </p>
                </div>

                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 relative space-y-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-400 font-black text-xs flex items-center justify-center">
                    02
                  </span>
                  <h3 className="font-bold text-white text-base">Input Penjualan Harian</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Buka menu **Penjualan Harian**. Klik **+ Catat Penjualan**. Masukkan angka *Omset Marketing*, *Omset Finance*, dan *Valid Orders*. Sistem otomatis menghitung potongan 5 beban.
                  </p>
                </div>

                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 relative space-y-3">
                  <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 font-black text-xs flex items-center justify-center">
                    03
                  </span>
                  <h3 className="font-bold text-white text-base">Periksa Jurnal Otomatis</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Setiap penjualan otomatis mencetak pembukuan *Double-Entry* di menu **Jurnal Umum**. Cek apakah indikator menunjukkan status **SEIMBANG (Balanced)**.
                  </p>
                </div>

                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 relative space-y-3">
                  <span className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500 text-sky-400 font-black text-xs flex items-center justify-center">
                    04
                  </span>
                  <h3 className="font-bold text-white text-base">Buat Faktur / Invoice</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Jika ada pemesanan partai besar dari distributor atau pembelian bahan baku ke supplier, buat dokumen di **Faktur Studio** dan cetak resmi (`window.print()`).
                  </p>
                </div>

                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 relative space-y-3">
                  <span className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 text-purple-400 font-black text-xs flex items-center justify-center">
                    05
                  </span>
                  <h3 className="font-bold text-white text-base">Rekonsiliasi Kas & Neraca</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sore hari sebelum tutup buku, buka **Buku Kas & Arus Kas** serta **Neraca Keuangan** untuk memastikan *Running Balance* cocok dengan mutasi bank aktual.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Penting untuk Admin Baru:</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Anda tidak perlu menghitung manual persentase potongan biaya admin marketplace atau HPP bahan baku menggunakan kalkulator luar. Seluruh rumus standar CV SURYA MITRA BERKAH sudah ditanam langsung ke dalam *engine* aplikasi. Tugas Anda cukup menginput angka omset dasar dengan ketelitian tinggi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PENJUALAN & KALKULATOR BEBAN */}
          {activeTab === "penjualan" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Calculator className="w-7 h-7 text-emerald-400" />
                  <span>Panduan Modul Penjualan Harian & Kalkulator Beban Otomatis</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Penjelasan rumus otomatis, persentase potongan, dan cara kerja kalkulasi margin kotor (*Gross Margin*).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-emerald-400">Cara Menginput Transaksi Penjualan Baru</h3>
                  <ol className="space-y-3 text-sm text-slate-300 list-decimal list-inside leading-relaxed font-normal">
                    <li>Buka halaman **Penjualan Harian (`/penjualan`)**.</li>
                    <li>Klik tombol hijau **+ Catat Penjualan Hari Ini** di pojok kanan atas tabel.</li>
                    <li>Pilih tanggal transaksi dan pilih unit bisnis (**Antrasida** atau **Agrodelta**).</li>
                    <li>Masukkan **Omset Marketing (IDR)** — yaitu total nilai kotor pesanan dari dasbor marketplace (Shopee / Tokopedia / TikTok Shop).</li>
                    <li>Masukkan **Omset Finance (IDR)** — yaitu estimasi pencairan bersih atau omset finansial yang masuk ke pertanggungjawaban.</li>
                    <li>Masukkan **Valid Orders** — yaitu jumlah pesanan fisik yang berhasil dikemas dan dikirim (tanpa batal/retur).</li>
                    <li>Masukkan **Promotion Cost** (Voucher / Diskon toko) dan **Ads Spend** (Biaya iklan berbayar harian).</li>
                    <li>Klik tombol **Simpan Transaksi & Kalkulasi**.</li>
                  </ol>
                </div>

                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    <span>Rumus Matematika Standar SMB yang Diterapkan:</span>
                  </h3>
                  <div className="space-y-2.5 font-mono text-xs text-emerald-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                    <p>• <span className="text-white">Admin Fee (16%)</span> = Omset Finance × 16%</p>
                    <p>• <span className="text-white">Processing Fee</span> = Valid Orders × Rp 1.250</p>
                    <p>• <span className="text-white">Shipping Cost (8.99%)</span> = Omset Finance × 8.99%</p>
                    <p>• <span className="text-white">Affiliate Cost (9%)</span> = Omset Finance × 9%</p>
                    <p>• <span className="text-white">HPP Bahan Baku (16.82%)</span> = Omset Finance × 16.82%</p>
                    <div className="border-t border-slate-800 my-2 pt-2 text-amber-300">
                      <p>• <span className="text-white">Total Expense</span> = Admin + Processing + Promotion + Ads + Shipping + Affiliate + HPP</p>
                      <p>• <span className="text-white font-bold">Gross Margin</span> = Omset Finance - Total Expense</p>
                      <p>• <span className="text-white font-bold">ROI Iklan</span> = Omset Finance ÷ Ads Spend</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">
                    **Catatan Koreksi**: Jika Anda salah memasukkan angka, klik ikon **Edit (Pensil)** pada baris tabel bersangkutan. Seluruh angka beban otomatis dihitung ulang secara akurat saat Anda memperbarui data.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AKUNTANSI ERP */}
          {activeTab === "akuntansi" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Scale className="w-7 h-7 text-indigo-400" />
                  <span>Panduan Akuntansi ERP Bergaya Accurate Online (Double-Entry)</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Cara kerja Buku Besar (*General Ledger*), Bagan Akun (*COA*), dan Laporan Neraca Keuangan (*Balance Sheet*).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-3">
                  <h3 className="font-bold text-emerald-400 text-base">1. Buku Besar & Jurnal Umum</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Setiap transaksi operasional secara otomatis menghasilkan **Jurnal Akuntansi Berpasangan**. Posisi Debit dan Kredit ditampilkan bertingkat.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
                    <p className="text-emerald-400">Debit: Piutang Marketplace [1103]</p>
                    <p className="text-rose-400 pl-4">Kredit: Pendapatan Penjualan [4101]</p>
                  </div>
                </div>

                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-3">
                  <h3 className="font-bold text-indigo-400 text-base">2. Filter Buku Besar per COA</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Di halaman **Jurnal Umum**, gunakan *Dropdown Filter COA* untuk menyeleksi hanya mutasi yang melibatkan akun tertentu (*misal: khusus melihat mutasi Kas Bank BCA `1101` atau khusus Beban Iklan `6103`*).
                  </p>
                </div>

                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-3">
                  <h3 className="font-bold text-amber-400 text-base">3. Validasi Neraca Seimbang</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Di halaman **Neraca (`/neraca`)**, sistem melakukan pemeriksaan otomatis kesesuaian hukum akuntansi:
                  </p>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-center text-xs">
                    Total Aset = Kewajiban + Ekuitas
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Cara Mencatat Jurnal Memorial Manual (Penyesuaian):</h3>
                <p className="text-xs text-slate-400">
                  Jika Admin Finance perlu mencatat penyusutan aset, koreksi saldo, atau transfer antar kas bank yang tidak masuk ke transaksi penjualan/pembelian biasa:
                </p>
                <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside font-medium bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
                  <li>Buka menu **Jurnal Umum & Ledger (`/jurnal`)**. Klik tombol **+ Catat Jurnal Manual**.</li>
                  <li>Masukkan deskripsi transaksi (*misal: Biaya Servis Laptop Kantor*).</li>
                  <li>Pada baris pertama, pilih Akun COA Debit (*misal `6104 Gaji & Servis`*) dan masukkan angka di kolom Debit.</li>
                  <li>Pada baris kedua, pilih Akun COA Kredit (*misal `1101 Kas Bank BCA`*) dan masukkan angka yang sama di kolom Kredit.</li>
                  <li>Pastikan indikator bawah menunjukkan **SEIMBANG (Balanced)** sebelum mengklik tombol **Simpan Jurnal & Perbarui Saldo**.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 4: FAKTUR & PRINT STUDIO */}
          {activeTab === "faktur" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <FileText className="w-7 h-7 text-emerald-400" />
                  <span>Panduan Faktur Komersial & Invoice Print Studio</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Cara membuat faktur penjualan distributor, pembelian ke supplier, dan pencetakan dokumen PDF resmi atas nama CV SURYA MITRA BERKAH (SMB).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white">Langkah Pembuatan Faktur Baru:</h3>
                  <ol className="space-y-3 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                    <li>Buka menu **Faktur & Invoice Studio (`/faktur`)**.</li>
                    <li>Klik tombol hijau **+ Buat Faktur Baru**.</li>
                    <li>Tentukan **Tipe Faktur** (`PENJUALAN` untuk customer/distributor, atau `PEMBELIAN` untuk supplier/vendor).</li>
                    <li>Masukkan nama distributor atau supplier pada kolom **Pelanggan / Pemasok**.</li>
                    <li>Pilih produk dari **Katalog SKU** (*mis. Busuk Akar 1 Liter atau Kardus Master Box*), tentukan **Jumlah (Qty)** dan **Harga Satuan**. Klik **+ Tambah Baris** jika ada lebih dari 1 produk.</li>
                    <li>Tentukan apakah transaksi dikenai **PPN 11%** dan apakah ada **Potongan Diskon (IDR)**.</li>
                    <li>Klik **Simpan Faktur**. Faktur baru akan muncul dengan nomor otomatis `INV/SMB/2026/xxx`.</li>
                  </ol>
                </div>

                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                  <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Fitur Unggulan: Invoice Print Studio</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Setiap faktur dilengkapi dokumen siap cetak yang memenuhi standar hukum dan akuntansi komersial. Untuk mencetak atau menyimpan sebagai file PDF:
                  </p>
                  <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">1</span>
                      <span>Klik tombol **Lihat & Cetak** pada baris faktur yang ingin dicetak.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">2</span>
                      <span>Pada pop-up studio pratinjau, klik tombol biru **Cetak / Save PDF**.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">3</span>
                      <span>Pada dialog cetak browser, pilih tujuan **Save as PDF** atau pilih printer fisik Anda.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KATALOG HPP & KEUANGAN */}
          {activeTab === "hpp_keuangan" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Layers className="w-7 h-7 text-teal-400" />
                  <span>Katalog HPP Produk & Manajemen Finansial Terpadu</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Mengelola 18 SKU Antrasida/Agrodelta, simulasi margin produk, serta 4 tab operasional keuangan harian.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 space-y-3">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400 inline" /> Katalog & HPP Produk (`/hpp`)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Halaman ini memuat daftar produk resmi (*Busuk Akar, Anti Semut, Pembasmi Nyamuk Tanam, dll.*) berserta Harga Jual dan Harga Pokok Penjualan (HPP). Anda dapat memanfaatkan **Simulasi Kalkulator Margin Produk** di bagian atas untuk menguji berapa laba bersih yang didapat jika memberikan diskon tertentu saat promosi *Live Streaming*.
                  </p>
                </div>

                <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 space-y-3">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-indigo-400 inline" /> Manajemen Keuangan (`/keuangan`)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Terdiri dari 4 tab penting yang diangkat dari sheet Excel SMB:
                  </p>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside font-medium">
                    <li>**Penarikan Pendapatan (`PENDAPATAN`)**: Mencatat pencairan saldo dari Shopee/Tokopedia ke rekening bank perusahaan.</li>
                    <li>**Arus Barang (`ARUS BARANG`)**: Mencatat pembelian persediaan bahan baku maupun botol/kemasan.</li>
                    <li>**Pagu Anggaran (`PENGELUARAN`)**: Pemantauan realisasi anggaran pengeluaran bulanan.</li>
                    <li>**Piutang & Peminjaman Top Up (`PIUTANG`)**: Buku kendali peminjaman saldo top-up ads marketing.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOM PERIOD & MULTI-BRAND */}
          {activeTab === "custom_period" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-amber-400" />
                  <span>Panduan Pemilihan Periode Tanggal Custom & Multi-Brand</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Cara menggunakan fitur rentang tanggal fleksibel dan filter pemisahan data Antrasida vs Agrodelta.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                  <h3 className="text-base font-bold text-emerald-400">Cara Mengaktifkan Filter Tanggal Custom:</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pada Header atas navigasi (di halaman mana pun Anda berada), terdapat *Dropdown Periode*. Secara default, sistem menyediakan pilihan cepat seperti `Juli 2026 (Aktual)`, `Juni 2026`, `7 Hari Terakhir`, hingga `Semua Waktu`.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Jika Anda ingin menyeleksi rentang hari tertentu (*misalnya dari tanggal 10 Juli sampai 18 Juli*):
                  </p>
                  <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside font-semibold bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <li>Klik dropdown **Periode:** di pojok kanan atas Header.</li>
                    <li>Pilih opsi paling bawah berlabel hijau **Custom Rentang Tanggal**.</li>
                    <li>Secara otomatis akan muncul dua kolom input kalender: **Dari [YYYY-MM-DD]** dan **s/d [YYYY-MM-DD]**.</li>
                    <li>Pilih tanggal mulai dan tanggal akhir yang Anda inginkan. Seluruh laporan langsung menyesuaikan!</li>
                  </ol>
                </div>

                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
                  <h3 className="text-base font-bold text-white">Filter Unit Bisnis (Antrasida vs Agrodelta):</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    CV SURYA MITRA BERKAH menaungi dua brand unggulan. Untuk mencegah tercampurnya analisis data penjualan:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="font-bold text-indigo-400 text-xs block mb-1">Semua Brand (Gabungan)</span>
                      <p className="text-[11px] text-slate-400">Menampilkan konsolidasi total omset, beban, dan kas dari kedua brand secara bersamaan.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="font-bold text-emerald-400 text-xs block mb-1">ANTRASIDA</span>
                      <p className="text-[11px] text-slate-400">Menyaring khusus transaksi, HPP produk pertanian/pestisida, dan jurnal brand Antrasida.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="font-bold text-teal-400 text-xs block mb-1">AGRODELTA</span>
                      <p className="text-[11px] text-slate-400">Menyaring khusus produk dan transaksi dari divisi solusi agro Agrodelta.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FAQ & TROUBLESHOOTING */}
          {activeTab === "faq" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <HelpCircle className="w-7 h-7 text-rose-400" />
                  <span>Pertanyaan Sering Diajukan (FAQ) & Solusi Kendala Admin</span>
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Daftar jawaban atas kendala atau kebingungan yang paling sering dihadapi oleh staf operasional saat menjalankan sistem.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2 text-emerald-400">
                    <ArrowRight className="w-4 h-4" />
                    <span>Q: Mengapa saya tidak bisa mengganti tema ke Mode Terang (Light Mode)?</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    **Jawaban**: Sesuai instruksi manajemen CV SURYA MITRA BERKAH (*"buat fokus temanya ke gelap saja"*), antarmuka aplikasi telah dikunci pada **Mode Gelap Obsidian (Dark Theme Only)**. Mode ini dipilih untuk kenyamanan mata admin (*eye-comfort*) saat menatap layar berjam-jam dan menonjolkan estetika *Glassmorphism Premium*.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2 text-emerald-400">
                    <ArrowRight className="w-4 h-4" />
                    <span>Q: Bagaimana jika nilai potongan biaya admin marketplace aktual berbeda tipis dengan rumus 16%?</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    **Jawaban**: Rumus otomatis 16% adalah standar estimasi cepat operasional harian. Jika pada akhir bulan terdapat selisih pembulatan saat rekonsiliasi dengan rekening koran bank, Admin Finance dapat langsung membuat **Jurnal Memorial Penyesuaian** di menu `Jurnal Umum` untuk menyeimbangkan selisih sen/rupiah tersebut secara sempurna.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2 text-emerald-400">
                    <ArrowRight className="w-4 h-4" />
                    <span>Q: Apakah data yang saya input di lokal ini otomatis tersimpan ke database Supabase live?</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    **Jawaban**: Jika Anda sudah mengonfigurasi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` pada file `.env.local`, sistem akan otomatis membaca dan menyimpan ke database live cloud. Jika belum dikonfigurasi, sistem berjalan lancar menggunakan memori lokal berkecepatan tinggi berbasis *Excel Seed*.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2 text-emerald-400">
                    <ArrowRight className="w-4 h-4" />
                    <span>Q: Saat mencetak faktur PDF, mengapa warna latar/gradien tidak muncul di kertas cetak?</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    **Jawaban**: Pada jendela dialog cetak browser (*Print Preview window*), pastikan Anda mencentang opsi **"Background graphics"** atau **"Grafis Latar Belakang"** di menu pengaturan tambahan (*More settings*). Sistem telah dilengkapi kelas CSS khusus `print:bg-white` agar hasil cetak di kertas tetap rapi, profesional, dan hemat tinta.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
