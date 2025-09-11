"use client";
import { useCallback, useState } from "react";

export default function useKriteriaData() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);       // data tahun terpilih
  const [tahun, setTahun] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAll = useCallback(async () => {
    const res = await fetch("/API/kriteria", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal memuat data dari server");
    const result = await res.json();
    return Array.isArray(result) ? result : [];
  }, []);

  const fetchData = useCallback(async (selectedYear = "") => {
    setLoading(true);
    setErrorMsg("");
    try {
      const result = await fetchAll();
      setAllData(result);
      const filtered = selectedYear
        ? result.filter((d) => String(d.Tahun) === String(selectedYear))
        : result;
      setData(filtered);
    } catch (e) {
      setErrorMsg(e?.message || "Terjadi kesalahan saat mengambil data");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  return {
    allData, data, tahun, setTahun, loading, errorMsg, fetchData,
  };
}
