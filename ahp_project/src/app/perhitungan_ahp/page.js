"use client";
import React, { useMemo, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import useKriteriaData from "@/hooks/useKriteriaData";
import { buildPredictions } from "@/hooks/usePrediction";
import { normalizePredictions, computePriority, rankBanks } from "@/hooks/useAHP";
import { CRITERIA } from "@/lib/constants";

// UI parts
import YearPicker from "./components/controls/YearPicker";
import BankPicker from "./components/controls/BankPicker";
import DataTable from "./components/tables/DataTable";
import PrediksiTable from "./components/tables/PrediksiTable";
import NormalisasiTable from "./components/tables/NormalisasiTable";
import PairwiseTabel from "./components/tables/PairwiseTabel";
import PriorityMatrix from "./components/tables/PriorityMatrix";
import PrioritySummary from "./components/tables/PrioritySummary";
import RankingTable from "./components/tables/RankingTable";
import LineChart from "./components/charts/LineChart";
import BarChart from "./components/charts/BarChart";

export default function DataBankPage() {
  const { allData, data, tahun, setTahun, loading, errorMsg, fetchData } = useKriteriaData();

  // view states
  const [selectedBank, setSelectedBank] = useState("");
  const [showCharts, setShowCharts] = useState(false);

  const [predictedByBank, setPredictedByBank] = useState([]);
  const [predictedTableByBank, setPredictedTableByBank] = useState(null);
  const [predictedForSelectedBank, setPredictedForSelectedBank] = useState(null);
  const [showPredictedChart, setShowPredictedChart] = useState(false);
  const [showPredictedTable, setShowPredictedTable] = useState(false);

  const [normalizedData, setNormalizedData] = useState([]);
  const [showNormalized, setShowNormalized] = useState(false);
  const [pairwiseTotals, setPairwiseTotals] = useState(null);
  const [normalizedMatrix, setNormalizedMatrix] = useState(null);
  const [weights, setWeights] = useState(null);
  const [showPriority, setShowPriority] = useState(false);
  const [ranking, setRanking] = useState([]);

  const banks = useMemo(
    () => Array.from(new Set(data.map((r) => r.Nama_Bank || r.nama_bank))).filter(Boolean),
    [data]
  );

  // ⬇️ Auto-pilih bank pertama begitu data tahun tampil
  useEffect(() => {
    if (!selectedBank && data.length > 0) {
      const firstBank = Array.from(
        new Set(data.map((r) => r.Nama_Bank || r.nama_bank))
      ).filter(Boolean)[0];
      setSelectedBank(firstBank || "");
    }
  }, [data, selectedBank]);

  const seriesBySelectedBank = useMemo(() => {
    const out = { ROE: {}, EPS: {}, DER: {}, PER: {} };
    if (!selectedBank || !allData.length) return out;
    allData
      .filter((r) => (r.Nama_Bank || r.nama_bank) === selectedBank)
      .forEach((r) => {
        const Y = Number(r.Tahun);
        CRITERIA.forEach((k) => (out[k][Y] = Number(r[k]) || 0));
      });
    return out;
  }, [allData, selectedBank]);

  const handleTampilkan = async () => {
    await fetchData(tahun);
    // reset turunan
    setShowCharts(false);
    setPredictedByBank([]);
    setPredictedTableByBank(null);
    setPredictedForSelectedBank(null);
    setShowPredictedChart(false);
    setShowPredictedTable(false);
    setNormalizedData([]);
    setShowNormalized(false);
    setPairwiseTotals(null);
    setNormalizedMatrix(null);
    setWeights(null);
    setShowPriority(false);
    setRanking([]);
  };

  // ⬇️ Pastikan saat klik grafik sudah ada selectedBank
  const handleShowCharts = () => {
    if (!selectedBank && banks.length > 0) {
      setSelectedBank(banks[0]);
    }
    setShowCharts(true);
  };

  const handlePredict = () => {
    if (!data.length || !allData.length) return;
    const { preds, byBankYear } = buildPredictions(allData, banks);
    setPredictedByBank(preds);

    if (selectedBank) {
      const years = [2020, 2021, 2022, 2023, 2024];
      const tb = { ROE: {}, EPS: {}, DER: {}, PER: {} };
      years.forEach((Y) => {
        const r = byBankYear[selectedBank]?.[Y];
        if (r) CRITERIA.forEach((k) => (tb[k][Y] = Number(r[k]) || 0));
      });
      const predSel = preds.find((r) => r.Nama_Bank === selectedBank);
      if (predSel) {
        CRITERIA.forEach((k) => {
          tb[k][2025] = Number(predSel[k]) || 0;
        });
        setPredictedForSelectedBank({
          ROE: predSel.ROE,
          EPS: predSel.EPS,
          DER: predSel.DER,
          PER: predSel.PER,
        });
        setPredictedTableByBank(tb);
      }
    }
    setShowPredictedChart(true);
  };

  const handleShowPredictedTable = () => setShowPredictedTable(true);

  const handleNormalizePred = () => {
    const norm = normalizePredictions(predictedByBank);
    setNormalizedData(norm);
    setShowNormalized(true);
  };

  const handlePriority = () => {
    const { colSums, norm, weights } = computePriority();
    setPairwiseTotals(colSums);
    setNormalizedMatrix(norm);
    setWeights(weights);
    setShowPriority(true);
  };

  const handleRanking = () => {
    const r = rankBanks(normalizedData, weights || []);
    setRanking(r);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center mt-10 gap-8 pb-16 px-4">
        <div className="flex items-center gap-4 flex-wrap">
          <YearPicker tahun={tahun} setTahun={setTahun} onShow={handleTampilkan} />
          {data.length > 0 && (
            <BankPicker banks={banks} selected={selectedBank} onChange={setSelectedBank} />
          )}
        </div>

        {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}

        {/* Tabel data hasil Tahun */}
        <DataTable data={data} tahun={tahun} loading={loading} />

        {/* Grafik historis per bank */}
        {data.length > 0 && (
          <button
            onClick={handleShowCharts}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Grafik Kriteria (Per Bank)
          </button>
        )}

        {showCharts && selectedBank && (
          <section className="w-full max-w-5xl">
            <h2 className="font-bold text-black mb-2">
              Grafik Kriteria – {selectedBank}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <LineChart title="ROE" crit="ROE" dataMap={seriesBySelectedBank.ROE} />
              <LineChart title="EPS" crit="EPS" dataMap={seriesBySelectedBank.EPS} />
              <LineChart title="DER" crit="DER" dataMap={seriesBySelectedBank.DER} />
              <LineChart title="PER" crit="PER" dataMap={seriesBySelectedBank.PER} />
            </div>
            <button
              onClick={handlePredict}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Prediksi
            </button>
          </section>
        )}

        {showPredictedChart && predictedForSelectedBank && (
          <section className="w-full max-w-5xl">
            <h2 className="font-bold text-black mb-2">Prediksi 2025 – {selectedBank}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <BarChart
                title="Prediksi 2025 per Kriteria"
                defaultCrit="ROE"
                data={[
                  { label: "ROE", value: predictedForSelectedBank.ROE, crit: "ROE" },
                  { label: "EPS", value: predictedForSelectedBank.EPS, crit: "EPS" },
                  { label: "DER", value: predictedForSelectedBank.DER, crit: "DER" },
                  { label: "PER", value: predictedForSelectedBank.PER, crit: "PER" },
                ]}
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleShowPredictedTable}
                className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
              >
                Hasil Prediksi
              </button>
              <button
                onClick={handleNormalizePred}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Normalisasi (Hasil Prediksi)
              </button>
            </div>
          </section>
        )}

        {showPredictedTable && predictedTableByBank && (
          <PrediksiTable bankName={selectedBank} tableByBank={predictedTableByBank} />
        )}

        {showNormalized && (
          <>
            <NormalisasiTable normalized={normalizedData} />
            <PairwiseTabel totals={pairwiseTotals} />
            <button
              onClick={handlePriority}
              className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
            >
              Proses Bobot Prioritas
            </button>
          </>
        )}

        {showPriority && normalizedMatrix && weights && (
          <>
            <PriorityMatrix normalizedMatrix={normalizedMatrix} />
            <PrioritySummary normalizedMatrix={normalizedMatrix} weights={weights} />
            <button
              onClick={handleRanking}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Ranking
            </button>
          </>
        )}

        {ranking.length > 0 && (
          <section className="w-full max-w-5xl">
            <div className="flex items-start gap-6">
              {/* Tabel ranking */}
              <div className="flex-1">
                <RankingTable ranking={ranking} />
              </div>

              {/* Catatan samping */}
              <aside className="w-[320px] bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-black">
                <p className="font-semibold mb-2">Catatan:</p>
                <p className="leading-relaxed">
                  Ranking 1 adalah <b>{ranking[0].Nama_Bank}</b> dengan skor{" "}
                  <b>{Number(ranking[0].Skor).toFixed(5)}</b>. Nilai ini
                  menunjukkan bahwa bank tersebut <b>paling efisien dan unggul</b>{" "}
                  berdasarkan perhitungan kriteria <b>ROE, EPS, DER</b>, dan <b>PER</b>.
                </p>
              </aside>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
