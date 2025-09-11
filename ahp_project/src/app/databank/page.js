"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DataBankPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tahun, setTahun] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [showChart, setShowChart] = useState(false);

  // Fetch data tabel berdasarkan tahun
  const fetchData = async (selectedYear = "") => {
    setLoading(true);
    try {
      const url = selectedYear ? `/API?tahun=${selectedYear}` : "/API";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Gagal fetch data");
      const result = await res.json();
      console.log("Data hasil fetch:", result); 
      setData(result);
    } catch (error) {
      console.error(error);
      setData([]);
    }
    setLoading(false);
  };

  const handleTampilkan = () => {
    setIsShow(true);
    fetchData(tahun);
  };

  // Ambil tahun & bank dari data hasil filter (tabel)
  const tahunList = [...new Set(data.map(row => String(row.Tahun).trim()))].sort();
  const namaBankList = [...new Set(data.map(row => row.Nama_Bank?.trim()))];

  // Dataset untuk grafik (hanya sesuai data yang ditampilkan di tabel)
  const chartData = {
    labels: tahunList,
    datasets: namaBankList.map((bank, idx) => ({
      label: bank,
      data: tahunList.map(th => {
        const row = data.find(
          r =>
            r.Nama_Bank?.trim().toLowerCase() === bank.trim().toLowerCase() &&
            String(r.Tahun).trim() === String(th).trim()
        );
        return row?.Harga_saham ? Number(row.Harga_saham) : 0;
      }),
      borderColor: ["blue", "green", "orange", "purple", "red", "gray"][idx % 6],
      backgroundColor: ["blue", "green", "orange", "purple", "red", "gray"][idx % 6],
      fill: false,
      pointStyle: "rect",
      pointRadius: 6,
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 16,
          boxHeight: 8,
          padding: 12,
        },
      },
      title: {
        display: true,
        text: "Grafik Harga Saham Tahun Terpilih",
        font: { size: 22 },
        color: "#222",
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#222",
          callback: function (value) {
            return value
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })
              .replace("Rp", "");
          },
        },
        title: {
          display: true,
          text: "Harga Saham (Rupiah)",
          font: { size: 18 },
        },
      },
      x: {
        title: {
          display: true,
          text: "Tahun",
          font: { size: 18 },
        },
        ticks: {
          color: "#222",
        },
      },
    },
  };

  // Fungsi ekspor Excel (rapi: judul, header bold, auto width)
  const handleExportExcel = () => {
    if (data.length === 0) {
      alert("Tidak ada data untuk diekspor");
      return;
    }

    // Buat worksheet kosong
    const worksheet = XLSX.utils.aoa_to_sheet([[]]);

    // Tambahkan judul di baris pertama
    const judul = [["Data Bank Tahun " + tahun]];
    XLSX.utils.sheet_add_aoa(worksheet, judul, { origin: "A1" });

    // Tambahkan data mulai baris ke-3
    XLSX.utils.sheet_add_json(worksheet, data, { origin: "A3", skipHeader: false });

    // Buat workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Styling header (bold)
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 2, c: C }); 
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true },
          alignment: { horizontal: "center" },
        };
      }
    }

    // Atur lebar kolom otomatis
    const colWidths = Object.keys(data[0]).map(key => ({
      wch: Math.max(key.length, ...data.map(row => String(row[key]).length)) + 5,
    }));
    worksheet["!cols"] = colWidths;

    // Export ke file Excel
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array", cellStyles: true });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `DataBank_${tahun}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-3 border-b bg-blue-500">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" style={{ height: "110px", width: "110px" }} />
        </div>
        <h1 className="text-2xl font-extrabold text-white text-center flex-1">
          <Link href="/" className="hover:underline text-white">Stock Decision</Link>
        </h1>
        <nav className="flex items-center gap-2">
          <Link href="/databank" className="text-white text-lg font-bold hover:underline px-4 py-2">Data Bank</Link>
          <Link href="/perhitungan_ahp" className="text-white text-lg font-bold hover:underline px-4 py-2">Perhitungan AHP</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center mt-10 flex-1">
        <div className="flex items-center gap-4 mb-6">
          <select
            className="border rounded px-3 py-2 text-black"
            value={tahun}
            onChange={e => setTahun(e.target.value)}
          >
            <option value="">Pilih Tahun</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            onClick={handleTampilkan}
          >
            Tampilkan
          </button>
        </div>

        {/* Table */}
        <p className="text-black">
          *Data akan tampil ketika anda memilih tahun dan klik tombol tampil*
        </p>
        <table id="tabelData" className="min-w-[400px] border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2 text-black">Nama Bank</th>
              <th className="border px-4 py-2 text-black">Tahun</th>
              <th className="border px-4 py-2 text-black">Laba Bersih</th>
              <th className="border px-4 py-2 text-black">Aset</th>
              <th className="border px-4 py-2 text-black">Liabilitas</th>
              <th className="border px-4 py-2 text-black">Ekuitas</th>
              <th className="border px-4 py-2 text-black">Harga Saham</th>
            </tr>
          </thead>
          <tbody>
            {!isShow ? (
              <tr>
                <td colSpan={7} className="border px-4 py-2 text-center text-black">
                  Tidak ada data
                </td>
              </tr>
            ) : loading ? (
              <tr>
                <td colSpan={7} className="border px-4 py-2 text-center text-black">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="border px-4 py-2 text-center text-black">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2 text-black">{row.Nama_Bank}</td>
                  <td className="border px-4 py-2 text-black">{row.Tahun}</td>
                  <td className="border px-4 py-2 text-black">{row.Laba_bersih}</td>
                  <td className="border px-4 py-2 text-black">{row.Aset}</td>
                  <td className="border px-4 py-2 text-black">{row.Liabilitas}</td>
                  <td className="border px-4 py-2 text-black">{row.Ekuitas}</td>
                  <td className="border px-4 py-2 text-black">{row.Harga_saham}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center mt-4 gap-2">
          {/* Tombol Ekspor Excel */}
          <button
            onClick={handleExportExcel}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
          >
            <img src="/icon1.png" alt="Ekspor Excel" className="h-5 w-5 mr-2" />
            Ekspor ke Excel
          </button>
        </div>

        <p className="mt-6 text-black text-base font-semibold">Grafik Harga Saham</p>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 mt-2"
          onClick={() => setShowChart(true)}
        >
          Lihat Grafik
        </button>

        {showChart && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 relative w-full max-w-5xl">
              <button
                className="absolute top-4 right-4 text-black text-xl font-bold"
                onClick={() => setShowChart(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">
                Grafik Harga Saham Tahun {tahun}
              </h2>
              <Line data={chartData} options={chartOptions} height={200} />
            </div>
          </div>
        )}
      </main>

      {/* Footer Sumber */}
      <footer className="bg-gray-100 py-4 border-t w-full">
        <p className="text-center text-sm text-gray-600">
          Sumber data: Website resmi{" "}
          <a href="https://bri.co.id" target="_blank" className="underline">BRI</a>,{" "}
          <a href="https://bankmandiri.co.id" target="_blank" className="underline">Mandiri</a>,{" "}
          <a href="https://bni.co.id" target="_blank" className="underline">BNI</a>, dan{" "}
          <a href="https://bankbsi.co.id" target="_blank" className="underline">Bank Syariah Indonesia</a>.
        </p>
      </footer>
    </div>
  );
}
