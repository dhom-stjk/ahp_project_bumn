"use client";
import { CRITERIA } from "@/lib/constants";

export default function PriorityMatrix({ normalizedMatrix }) {
  return (
    <section className="w-full max-w-5xl">
      <h3 className="font-bold text-black mt-6 mb-2">Tabel Bobot Prioritas (pembagian setiap kolom)</h3>
      <table className="w-full border border-gray-300 mb-4">
        <thead>
          <tr className="bg-green-100">
            <th className="border px-3 py-2 text-black">Kriteria</th>
            {CRITERIA.map((k) => <th key={k} className="border px-3 py-2 text-black">{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {normalizedMatrix.map((row, i) => (
            <tr key={i}>
              <td className="border px-3 py-2 text-black">{CRITERIA[i]}</td>
              {row.map((v, j) => (
                <td key={j} className="border px-3 py-2 text-black">{v.toFixed(5)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
