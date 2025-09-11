"use client";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center px-8 py-3 border-t bg-blue-500">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" style={{ height: "110px", width: "110px" }} />
        </div>
        <h1 className="text-2xl font-extrabold text-white text-center flex-1">
          <Link href="/" className="hover:underline text-white">Stock Decision</Link>
        </h1>
        <nav className="flex items-center gap-2">
          <Link href="/databank" className="text-white text-lg font-bold hover:underline px-4 py-2">
            Data Bank
          </Link>
          <Link href="/perhitungan_ahp" className="text-white text-lg font-bold hover:underline px-4 py-2">
            Perhitungan AHP
          </Link>
        </nav>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center mt-10 gap-8 pb-16 px-4">
        {/* 1) Pengertian saham + gambar */}
        <section className="w-full max-w-5xl grid md:grid-cols-2 gap-6 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-extrabold text-black mb-3">Pengertian Saham</h2>
            <p className="text-black/80 leading-relaxed">
              Saham adalah bukti kepemilikan atas sebagian nilai sebuah perusahaan. Dengan memiliki saham,
              investor berhak atas potensi <em>capital gain</em> (kenaikan harga) dan <em>dividen</em> (pembagian laba),
              sekaligus menanggung risiko penurunan nilai ketika kinerja atau sentimen pasar melemah. Harga saham
              dipengaruhi oleh fundamental (laba, utang, arus kas), prospek pertumbuhan, suku bunga,
              serta dinamika permintaan-penawaran di pasar.
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src="/OIP.jpeg"
              alt="Ilustrasi Saham"
              className="w-full max-w-md rounded-2xl shadow"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
        </section>

        {/* 2) Kriteria + sebutan saat naik/turun */}
        <section className="w-full max-w-5xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-extrabold text-black">Kriteria Penilaian Utama</h2>
            <span className="text-sm text-black/60">Fokus pada ROE, EPS, DER, dan PER</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* ROE */}
            <article className="border rounded-2xl p-4 shadow-sm bg-white">
              <h3 className="text-lg font-bold text-blue-800">ROE (Return on Equity)</h3>
              <p className="text-black/80 mt-1">
                Mengukur laba bersih yang dihasilkan dari ekuitas pemegang saham.
                <span className="font-semibold"> Formula:</span> ROE = Laba Bersih / Ekuitas.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="text-xs uppercase tracking-wide text-green-700 mb-1">Jika Naik</div>
                  <div className="text-sm text-black/80">Perbaikan profitabilitas.</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="text-xs uppercase tracking-wide text-red-700 mb-1">Jika Turun</div>
                  <div className="text-sm text-black/80">Penurunan profitabilitas.</div>
                </div>
              </div>
            </article>

            {/* EPS */}
            <article className="border rounded-2xl p-4 shadow-sm bg-white">
              <h3 className="text-lg font-bold text-blue-800">EPS (Earnings per Share)</h3>
              <p className="text-black/80 mt-1">
                Laba bersih per lembar saham.
                <span className="font-semibold"> Formula:</span> EPS = (Laba Bersih − Dividen Preferen) / Saham Beredar.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="text-xs uppercase tracking-wide text-green-700 mb-1">Jika Naik</div>
                  <div className="text-sm text-black/80">Pertumbuhan EPS.</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="text-xs uppercase tracking-wide text-red-700 mb-1">Jika Turun</div>
                  <div className="text-sm text-black/80">Penyusutan EPS.</div>
                </div>
              </div>
            </article>

            {/* DER */}
            <article className="border rounded-2xl p-4 shadow-sm bg-white">
              <h3 className="text-lg font-bold text-blue-800">DER (Debt to Equity Ratio)</h3>
              <p className="text-black/80 mt-1">
                Rasio utang terhadap ekuitas (leverage).
                <span className="font-semibold"> Formula:</span> DER = Total Utang / Ekuitas.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="text-xs uppercase tracking-wide text-red-700 mb-1">Jika Naik</div>
                  <div className="text-sm text-black/80">Leverage meningkat (risiko finansial naik).</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="text-xs uppercase tracking-wide text-green-700 mb-1">Jika Turun</div>
                  <div className="text-sm text-black/80">Deleveraging; struktur permodalan makin sehat.</div>
                </div>
              </div>
            </article>

            {/* PER */}
            <article className="border rounded-2xl p-4 shadow-sm bg-white">
              <h3 className="text-lg font-bold text-blue-800">PER (Price to Earnings Ratio)</h3>
              <p className="text-black/80 mt-1">
                Rasio harga saham terhadap laba per saham (valuasi).
                <span className="font-semibold"> Formula:</span> PER = Harga Saham / EPS.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="text-xs uppercase tracking-wide text-green-700 mb-1">Jika Naik</div>
                  <div className="text-sm text-black/80">Ekspansi multiple (valuasi mengembang).</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="text-xs uppercase tracking-wide text-red-700 mb-1">Jika Turun</div>
                  <div className="text-sm text-black/80">Kontraksi multiple (valuasi menyempit).</div>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-6 text-sm text-black/60">
            Catatan: DER cenderung <em>cost</em> (lebih rendah lebih baik). ROE & EPS umumnya <em>benefit</em>.
            PER dipengaruhi ekspektasi pertumbuhan; bandingkan antar-perusahaan di sektor yang sama.
          </div>
        </section>

        {/* CTA ke Perhitungan AHP */}
        <section className="w-full max-w-5xl mt-2">
          <div className="border rounded-2xl p-4 bg-blue-50">
            <h3 className="font-bold text-blue-900 mb-1">Siap mencoba melakukan perhitungan?</h3>
            <p className="text-black/75 mb-3">
              Setelah paham definisi, lanjut ke modul <strong>Perhitungan AHP</strong> untuk simulasi bobot kriteria.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Buka Perhitungan AHP
            </button>
          </div>
        </section>
      </main>

      {/* Modal konfirmasi */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
            {/* Close X */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Tutup"
              title="Tutup"
            >
              ✕
            </button>

            <h2 className="text-black font-bold text-center mb-4">
              Siap mencoba melakukan perhitungan?
            </h2>
            <div className="flex justify-center gap-3">
              <Link
                href="/perhitungan_ahp"
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Ya
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
