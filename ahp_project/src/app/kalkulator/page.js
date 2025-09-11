"use client";
import { useState } from "react";
import Link from "next/link";

export default function KalkulatorPage() {
  const [hargaBeli, setHargaBeli] = useState("");
  const [lot, setLot] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [hasil, setHasil] = useState(null);

  const formatRupiah = (value) => {
    if (!value) return "";
    return "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseNumber = (value) => {
    return value.replace(/[^0-9]/g, ""); 
  };

  const hitung = () => {
    const hb = parseFloat(parseNumber(hargaBeli));
    const l = parseInt(parseNumber(lot));
    const hj = hargaJual ? parseFloat(parseNumber(hargaJual)) : hb * 1.07; 

    if (isNaN(hb) || isNaN(l)) {
      alert("Masukkan angka yang valid");
      return;
    }

    const totalBeli = hb * l * 100;
    const totalJual = hj * l * 100;
    const profit = totalJual - totalBeli;

    setHasil({
      hargaJual: hj,
      totalBeli,
      totalJual,
      profit,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header
        className="flex items-center justify-between px-8 py-3 border-b bg-blue-700"
        style={{ minHeight: "70px" }}
      >
        <div className="flex items-center" style={{ height: "70px" }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "120px", width: "120px" }}
          />
        </div>
        <h1 className="text-2xl font-extrabold text-white text-center flex-1">
          <Link href="/" className="hover:underline text-white">
            Stock Decision
          </Link>
        </h1>
        <nav>
          <Link
            href="/databank"
            className="text-white text-lg font-bold hover:underline px-4 py-2"
          >
            Data Bank
          </Link>
          <Link
            href="/kalkulator"
            className="text-white text-lg font-bold hover:underline px-4 py-2"
          >
            Kalkulator Saham
          </Link>
        </nav>
      </header>

      {/* Body */}
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg w-full">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
          📈 Kalkulator Saham
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">
              Harga Beli per Saham
            </label>
            <input
              type="text"
              value={hargaBeli}
              onChange={(e) =>
                setHargaBeli(formatRupiah(parseNumber(e.target.value)))
              }
              className="w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black"
              placeholder="Rp 5.000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Jumlah Lot
            </label>
            <input
              type="number"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
              
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black"
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Harga Jual (opsional, kosong = naik 7%)
            </label>
            <input
              type="text"
              value={hargaJual}
              onChange={(e) =>
                setHargaJual(formatRupiah(parseNumber(e.target.value)))
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black"
              placeholder="Rp 5.000"
            />
          </div>
        </div>

        {/* Tombol Hitung */}
        <button
          onClick={hitung}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Hitung
        </button>

        {/* Hasil */}
        {hasil && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border space-y-2">
            <p className="text-black">
              <strong>Harga Jual:</strong> Rp {hasil.hargaJual.toLocaleString()}
            </p>
            <p className="text-black">
              <strong>Total Beli:</strong> Rp {hasil.totalBeli.toLocaleString()}
            </p>
            <p className="text-black">
              <strong>Total Jual:</strong> Rp {hasil.totalJual.toLocaleString()}
            </p>
            <p
              className={
                hasil.profit >= 0
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              <strong>{hasil.profit >= 0 ? "Profit" : "Rugi"}:</strong> Rp{" "}
              {hasil.profit.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
