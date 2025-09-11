"use client";
import { CRITERIA } from "@/lib/constants";
import { formatByCrit } from "@/lib/format";

export default function PrediksiTable({ bankName, tableByBank }) {
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  return (
    <section className="w-full max-w-5xl">
      <h2 className="font-bold text-black mb-2">Tabel Hasil Prediksi – {bankName}</h2>
      <table className="w-full border border-gray-300 mb-4">
        <thead>
          <tr className="bg-yellow-100">
            <th className="border px-3 py-2 text-black">Kriteria</th>
            {years.map((Y) => <th key={Y} className="border px-3 py-2 text-black">{Y}</th>)}
          </tr>
        </thead>
        <tbody>
          {CRITERIA.map((k) => (
            <tr key={k}>
              <td className="border px-3 py-2 text-black">{k}</td>
              {years.map((Y) => (
                <td key={Y} className="border px-3 py-2 text-black">
                  {formatByCrit(k, tableByBank?.[k]?.[Y] ?? 0)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
