"use client";

export default function BankPicker({ banks, selected, onChange }) {
  return (
    <select className="border rounded px-3 py-2 text-black" value={selected} onChange={(e)=>onChange(e.target.value)}>
      {banks.map((b) => (<option key={b} value={b}>{b}</option>))}
    </select>
  );
}
