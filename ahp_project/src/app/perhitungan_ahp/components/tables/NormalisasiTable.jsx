"use client";

export default function NormalisasiTable({ normalized }) {
  return (
    <section className="w-full max-w-5xl">
      <h2 className="font-bold text-black mb-2">Normalisasi (Prediksi 2025 – Semua Bank)</h2>
      <table className="w-full border border-gray-300 mb-4">
        <thead>
          <tr className="bg-green-100">
            <th className="border px-3 py-2 text-black">Nama Bank</th>
            <th className="border px-3 py-2 text-black">ROE</th>
            <th className="border px-3 py-2 text-black">EPS</th>
            <th className="border px-3 py-2 text-black">PER</th>
            <th className="border px-3 py-2 text-black">DER</th>
          </tr>
        </thead>
        <tbody>
          {normalized.map((r, i) => (
            <tr key={i}>
              <td className="border px-3 py-2 text-black">{r.Nama_Bank}</td>
              <td className="border px-3 py-2 text-black">{Number(r.ROE).toFixed(5)}</td>
              <td className="border px-3 py-2 text-black">{Number(r.EPS).toFixed(5)}</td>
              <td className="border px-3 py-2 text-black">{Number(r.PER).toFixed(5)}</td>
              <td className="border px-3 py-2 text-black">{Number(r.DER).toFixed(5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
