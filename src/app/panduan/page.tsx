"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calculator,
  TrendingUp,
  Scale,
  FileText,
  Search,
  Sparkles,
  Layers,
  Calendar,
  ShieldCheck,
  PanelLeftClose,
  LayoutDashboard,
  UploadCloud,
  FileSpreadsheet,
  Database,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function PanduanSistemPage() {
  const [activeTab, setActiveTab] = useState<string>("workflow");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tabs = [
    { id: "workflow", label: "SOP & Alur Kerja", icon: TrendingUp },
    { id: "navigasi", label: "Navigasi & UI Cerdas", icon: LayoutDashboard },
    { id: "import", label: "Import Excel (Shopee)", icon: UploadCloud },
    { id: "akuntansi", label: "Auto-Journaling", icon: Scale },
    { id: "faq", label: "FAQ & Bantuan", icon: HelpCircle },
  ];

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-8">
        
        {/* Banner Utama */}
        <div className="glass-panel p-6 md:p-10 relative overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 shadow-2xl rounded-3xl mt-4">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 -top-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Pusat Dokumentasi Resmi (Update v2.0)</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Panduan Sistem ERP & Ops <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                  CV SURYA MITRA BERKAH
                </span>
              </h1>
              <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
                Buku panduan ini telah diperbarui untuk mencakup fitur-fitur terbaru seperti <strong>Auto-Journaling ganda</strong>, <strong>Dynamic UI</strong>, dan <strong>Sistem Import E-Commerce massal via Excel</strong>.
              </p>
            </div>

            <div className="w-full lg:w-80 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-4 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm border-b border-slate-700 pb-3">
                <ShieldCheck className="w-5 h-5" />
                <span>Standar Kepatuhan SOP</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Setiap Admin operasional wajib mengikuti urutan pencatatan harian yang ada di sistem ini agar seluruh pembukuan Jurnal dan Neraca terintegrasi dengan sempurna tanpa intervensi manual.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
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
                      ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/25 scale-105"
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
              placeholder="Cari dokumentasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium transition-colors"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="glass-panel p-6 md:p-8 border border-slate-800/80 bg-slate-900/60 shadow-xl min-h-[500px] rounded-3xl">
          
          {/* TAB 1: SOP ALUR KERJA */}
          {activeTab === "workflow" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <TrendingUp className="w-7 h-7 text-emerald-400" />
                  <span>SOP & Alur Kerja Harian Admin</span>
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Langkah-langkah baku (*Standard Operating Procedure*) untuk pencatatan transaksi masuk dan keluar. Sistem ini menggunakan arsitektur *Single Source of Truth*, artinya 1 aksi di depan akan merubah seluruh pembukuan di belakang.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-colors space-y-4">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-sm flex items-center justify-center shadow-lg">1</span>
                  <h3 className="font-extrabold text-white text-base">Pencatatan Penjualan</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Semua transaksi harian dimulai di menu <strong>Penjualan Harian</strong>. Anda memiliki 2 opsi: 
                    <br/><br/>
                    1. Klik <strong>Tambah Transaksi</strong> (Input Manual 1 per 1).
                    <br/>
                    2. Klik <strong>Import E-Commerce</strong> (Tarik massal data Shopee/Tokopedia).
                  </p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-colors space-y-4">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-black text-sm flex items-center justify-center shadow-lg">2</span>
                  <h3 className="font-extrabold text-white text-base">Validasi Jurnal Otomatis</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Sistem secara magis akan memecah 1 baris penjualan Anda menjadi puluhan Jurnal Memorial (Piutang, HPP, Ongkir, Admin, dsb). Buka menu <strong>Jurnal Umum & Ledger</strong> untuk memverifikasi bahwa total Debit = Kredit.
                  </p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-colors space-y-4">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-sm flex items-center justify-center shadow-lg">3</span>
                  <h3 className="font-extrabold text-white text-base">Rekonsiliasi Bank</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Ketika uang pencairan dari Shopee/Tokopedia benar-benar cair ke rekening Bank BCA, buka menu <strong>Buku Kas & Arus Kas</strong> dan catat penerimaan kas tersebut.
                  </p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-rose-500/50 transition-colors space-y-4">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white font-black text-sm flex items-center justify-center shadow-lg">4</span>
                  <h3 className="font-extrabold text-white text-base">Cek Neraca & Laba Rugi</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Pada sore hari sebelum pulang, eksekutif dapat langsung melihat <strong>Neraca Keuangan</strong> dan <strong>Laporan Laba Rugi</strong> yang tersusun presisi secara instan tanpa perlu repot menghitung ulang.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NAVIGASI & UI CERDAS */}
          {activeTab === "navigasi" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <LayoutDashboard className="w-7 h-7 text-emerald-400" />
                  <span>Navigasi & Antarmuka Cerdas (Smart UI)</span>
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Dashboard SMB dirancang adaptif untuk memaksimalkan area kerja Anda, persis seperti pengalaman menggunakan aplikasi *Desktop* (Accurate/Zahir).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
                  <div className="p-6 border-b border-slate-800 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                      <PanelLeftClose className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Collapsible Sidebar</h3>
                      <p className="text-slate-400 text-xs mt-1 font-medium">Panel Menu yang bisa dilipat</p>
                    </div>
                  </div>
                  <div className="p-6 text-sm text-slate-300 space-y-4 leading-relaxed font-medium">
                    <p>
                      Jika Anda membutuhkan layar yang lebih lebar untuk melihat tabel Jurnal atau Buku Kas yang panjang, klik <strong>ikon panah lipat</strong> di bagian atas Sidebar kiri.
                    </p>
                    <p>
                      Menu teks akan menghilang dan menyisakan ikon saja. Untuk mengembalikannya, cukup klik ikon panah itu kembali. Semua status seperti <em>Live Real-time Ops</em> juga akan menyesuaikan bentuk secara dinamis!
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
                  <div className="p-6 border-b border-slate-800 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                      <Filter className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Dynamic Header Filters</h3>
                      <p className="text-slate-400 text-xs mt-1 font-medium">Filter Tanggal & Brand Cerdas</p>
                    </div>
                  </div>
                  <div className="p-6 text-sm text-slate-300 space-y-4 leading-relaxed font-medium">
                    <p>
                      Di halaman utama (Executive Dashboard), Anda akan melihat filter <strong>Unit/Brand</strong> dan <strong>Filter Periode Tanggal</strong> (Bulan Ini, Semua Waktu, Custom).
                    </p>
                    <p>
                      Namun, di halaman <strong>Buku Kas</strong> atau <strong>Neraca</strong> yang bersifat akumulatif secara kronologis, sistem akan <strong>menyembunyikan panel filter tersebut secara cerdas</strong> (menghilang sepenuhnya) untuk memberi Anda ruang layar vertikal yang maksimal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IMPORT EXCEL */}
          {activeTab === "import" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <UploadCloud className="w-7 h-7 text-emerald-400" />
                  <span>Import Data E-Commerce (Shopee/Tokopedia)</span>
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Tinggalkan input manual satu-per-satu. Upload puluhan baris data penjualan E-Commerce Anda dan biarkan mesin pencatat bekerja untuk Anda dalam hitungan detik.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-500" /> Aturan Template Excel (.xlsx / .csv)
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      Sistem membaca data Anda berdasarkan <strong>Nama Kolom (Header)</strong> pada baris pertama Excel. Pastikan nama kolom Anda mengandung kata kunci berikut agar bisa terdeteksi:
                    </p>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-800/80 border-b border-slate-700 text-slate-400 uppercase">
                          <tr>
                            <th className="py-3 px-4 font-bold">Wajib Dibaca Sistem</th>
                            <th className="py-3 px-4 font-bold">Contoh Nama Kolom di Excel</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-medium">
                          <tr>
                            <td className="py-3 px-4 text-emerald-400">Tanggal</td>
                            <td className="py-3 px-4 font-mono text-[11px] bg-slate-900">Tanggal</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 text-emerald-400">Pilihan Brand</td>
                            <td className="py-3 px-4 font-mono text-[11px] bg-slate-900">Unit/Brand</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 text-emerald-400">Omset Total Transaksi</td>
                            <td className="py-3 px-4 font-mono text-[11px] bg-slate-900">Omset Marketing / Penjualan Kotor</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 text-emerald-400">Omset Masuk Akun</td>
                            <td className="py-3 px-4 font-mono text-[11px] bg-slate-900">Omset Finance / Penjualan Bersih</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3">
                  <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-amber-500 font-bold">
                      <AlertCircle className="w-5 h-5" />
                      <span>Warning: Auto-Journaling!</span>
                    </div>
                    <p className="text-xs text-amber-400/90 leading-relaxed font-medium">
                      Saat Anda meng-upload file Excel berisi 30 baris pesanan, tombol Import tidak hanya memindahkan data ke tabel Penjualan.
                    </p>
                    <p className="text-xs text-amber-400/90 leading-relaxed font-medium">
                      Di latar belakang, sistem secara rekursif akan <strong>Mengkalkulasi HPP, Ongkir, Admin Rate</strong>, lalu <strong>Menerbitkan 30x Jurnal Akuntansi Ganda</strong> langsung ke Buku Besar Anda. Pastikan data Excel Anda valid sebelum di-upload!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AKUNTANSI & ERP */}
          {activeTab === "akuntansi" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Scale className="w-7 h-7 text-emerald-400" />
                  <span>Modul ERP: Jurnal Umum & Neraca Otomatis</span>
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  CV Surya Mitra Berkah beroperasi layaknya korporat. Setiap nilai Rp 1 yang keluar masuk memiliki catatan asal usul (Double-Entry).
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-white font-bold text-lg">Contoh Pemecahan Auto-Journaling</h3>
                  <p className="text-sm text-slate-300 font-medium">Ketika Admin menginput Omset Penjualan sebesar <strong>Rp 10.000.000</strong>, sistem tidak hanya mencatat uang masuk. Sistem membuat Jurnal Memorial otomatis seperti ini:</p>
                  
                  <div className="overflow-x-auto border border-slate-700/80 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-800 border-b border-slate-700 text-slate-400 uppercase font-bold">
                        <tr>
                          <th className="py-2.5 px-4">Nama Akun (COA)</th>
                          <th className="py-2.5 px-4 text-right">Debit</th>
                          <th className="py-2.5 px-4 text-right">Kredit</th>
                        </tr>
                      </thead>
                      <tbody className="bg-slate-900 divide-y divide-slate-800/80 font-mono text-[11px]">
                        <tr>
                          <td className="py-2.5 px-4 text-slate-300">1103 - Piutang Marketplace (Tertahan)</td>
                          <td className="py-2.5 px-4 text-right text-emerald-400">10.000.000</td>
                          <td className="py-2.5 px-4 text-right text-slate-500">-</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-300">6101 - Biaya Admin & Pemprosesan</td>
                          <td className="py-2.5 px-4 text-right text-rose-400">1.600.000</td>
                          <td className="py-2.5 px-4 text-right text-slate-500">-</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-300">5101 - HPP Produk / Bahan Baku</td>
                          <td className="py-2.5 px-4 text-right text-rose-400">1.682.000</td>
                          <td className="py-2.5 px-4 text-right text-slate-500">-</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-300">4101 - Pendapatan Penjualan</td>
                          <td className="py-2.5 px-4 text-right text-slate-500">-</td>
                          <td className="py-2.5 px-4 text-right text-indigo-400">13.282.000</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 text-slate-300">1301 - Persediaan Bahan Baku (Keluar)</td>
                          <td className="py-2.5 px-4 text-right text-slate-500">-</td>
                          <td className="py-2.5 px-4 text-right text-indigo-400">1.682.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-emerald-400 font-bold text-center mt-2">TOTAL DEBIT = TOTAL KREDIT (BALANCED)</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === "faq" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <HelpCircle className="w-7 h-7 text-emerald-400" />
                  <span>Troubleshooting & FAQ</span>
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Apa bedanya Omset Marketing dan Omset Finance saat input manual?",
                    a: "Omset Marketing adalah harga jual kotor ke customer. Omset Finance adalah harga jual bersih yang dipotong diskon/voucher platform. Sistem selalu menggunakan Omset Finance untuk menghitung pajak dan fee Admin (sebesar 16% dll)."
                  },
                  {
                    q: "Kenapa filter tanggal tiba-tiba hilang di Neraca?",
                    a: "Ini adalah fitur Dynamic Header. Neraca (Balance Sheet) adalah laporan akumulasi dari awal perusahaan berdiri hingga hari ini, sehingga filter periode tanggal dinonaktifkan secara otomatis agar ruang kerja Anda lebih lebar."
                  },
                  {
                    q: "Saya salah upload Excel. Jurnal terlanjur terbuat. Bagaimana cara membatalkannya?",
                    a: "Buka menu Penjualan Harian. Cari transaksi yang salah lalu klik tombol Hapus (ikon Tong Sampah). Secara cerdas, sistem juga akan melacak ID transaksi tersebut dan menghapus Jurnal Akuntansi berpasangan yang terkait dengannya secara otomatis."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-900 p-5 rounded-2xl border border-slate-800/80">
                    <h3 className="font-bold text-white text-sm flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">Q:</span>
                      {faq.q}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2 pl-5 font-medium">
                      <span className="text-indigo-400 font-bold mr-2">A:</span>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
