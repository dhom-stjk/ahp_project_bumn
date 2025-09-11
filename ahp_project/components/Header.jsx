"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-3 border-b bg-blue-500">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" style={{ height: 120, width: 120 }} />
      </div>
      <h1 className="text-2xl font-extrabold text-white text-center flex-1">
        <Link href="/" className="hover:underline text-white">Stock Decision</Link>
      </h1>
      <nav className="flex items-center gap-2">
        <Link href="/databank" className="text-white text-lg font-bold hover:underline px-4 py-2">Data Bank</Link>
        <Link href="/perhitungan_ahp" className="text-white text-lg font-bold hover:underline px-4 py-2">Perhitungan AHP</Link>
      </nav>
    </header>
  );
}
