"use client";
import { CRITERIA, FIXED } from "@/lib/constants";

export default function PairwiseTabel({ totals }) {
  return (
    <section className="w-full max-w-5xl">
      <h3 className="font-bold text-black mb-2">Tabel Perbandingan (K1/K1 … K4/K4)</h3>
      <table className="w-full border border-gray-300 mb-2">
        <thead>
          <tr className="bg-blue-100">
            <th className="border px-3 py-2 text-black">Kriteria</th>
            {CRITERIA.map((k) => <th key={k} className="border px-3 py-2 text-black">{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {FIXED.map((row, i) => (
            <tr key={i}>
              <td className="border px-3 py-2 text-black">{CRITERIA[i]}</td>
              {row.map((v, j) => (
                <td key={j} className="border px-3 py-2 text-black">{Number(v).toFixed(5)}</td>
              ))}
            </tr>
          ))}
          {totals && (
            <tr className="bg-gray-50 font-semibold">
              <td className="border px-3 py-2 text-black">TOTAL</td>
              {totals.map((v, j) => (
                <td key={j} className="border px-3 py-2 text-black">{v.toFixed(5)}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
