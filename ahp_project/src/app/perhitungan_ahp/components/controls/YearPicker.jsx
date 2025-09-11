"use client";

export default function YearPicker({ tahun, setTahun, onShow }) {
  return (
    <div className="flex items-center gap-3">
      <select
        className="border rounded px-3 py-2 text-black"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
      >
        <option value="">Pilih Tahun</option>
        <option value="2020">2020</option><option value="2021">2021</option>
        <option value="2022">2022</option><option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
      <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800" onClick={onShow}>
        Tampilkan
      </button>
    </div>
  );
}
