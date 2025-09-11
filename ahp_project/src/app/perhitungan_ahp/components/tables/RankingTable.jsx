"use client";

export default function RankingTable({ ranking }) {
  return (
    <section className="w-full max-w-3xl">
      <h2 className="font-bold text-black mb-2">Hasil Ranking</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-yellow-100">
            <th className="border px-3 py-2 text-black">Nama Bank</th>
            <th className="border px-3 py-2 text-black">Ranking</th>
            <th className="border px-3 py-2 text-black">Skor</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r, idx) => (
            <tr key={idx}>
              <td className="border px-3 py-2 text-black">{r.Nama_Bank}</td>
              <td className="border px-3 py-2 text-black">{r.Ranking}</td>
              <td className="border px-3 py-2 text-black">{Number(r.Skor).toFixed(5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
