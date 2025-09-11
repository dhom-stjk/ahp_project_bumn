"use client";
import { CRITERIA } from "@/lib/constants";

export default function PrioritySummary({ normalizedMatrix, weights }) {
  return (
    <section className="w-full max-w-5xl">
      <h3 className="font-bold text-black mb-2">Tabel Rata-rata Baris & Bobot (total baris / 4)</h3>
      <table className="w-full border border-gray-300 mb-4">
        <thead>
          <tr className="bg-yellow-100">
            <th className="border px-3 py-2 text-black">Kriteria</th>
            {CRITERIA.map((k) => <th key={k} className="border px-3 py-2 text-black">{k}</th>)}
            <th className="border px-3 py-2 text-black">Total</th>
            <th className="border px-3 py-2 text-black">Bobot</th>
          </tr>
        </thead>
        <tbody>
          {normalizedMatrix.map((row, i) => {
            const total = row.reduce((a,b)=>a+b,0);
            const weight = total / CRITERIA.length;
            return (
              <tr key={i}>
                <td className="border px-3 py-2 text-black">{CRITERIA[i]}</td>
                {row.map((v, j) => (
                  <td key={j} className="border px-3 py-2 text-black">{v.toFixed(5)}</td>
                ))}
                <td className="border px-3 py-2 text-black">{total.toFixed(5)}</td>
                <td className="border px-3 py-2 text-black">{weight.toFixed(5)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
