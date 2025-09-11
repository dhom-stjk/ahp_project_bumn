"use client";
import { CRITERIA } from "@/lib/constants";

export default function DataTable({ data, tahun, loading }) {
  return (
    <section className="w-full max-w-5xl">
      <h2 className="font-bold mb-2 text-black">
        Data Bank {tahun && `(Tahun ${tahun})`}
      </h2>
      <table className="w-full border border-gray-300 mb-2">
        <thead>
          <tr className="bg-blue-100">
            <th className="border px-3 py-2 text-black">Tahun</th>
            <th className="border px-3 py-2 text-black">Nama Bank</th>
            {CRITERIA.map((k) => <th key={k} className="border px-3 py-2 text-black">{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} className="text-center text-black">Loading...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={6} className="text-center text-black">Tidak ada data</td></tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-3 py-2 text-black">{row.Tahun}</td>
                <td className="border px-3 py-2 text-black">{row.Nama_Bank}</td>
                {CRITERIA.map((k) => (
                  <td key={k} className="border px-3 py-2 text-black">{row[k]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
