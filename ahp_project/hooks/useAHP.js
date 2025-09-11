import { CRITERIA, FIXED } from "@/lib/constants";
import { safeNum } from "@/lib/format";

export function normalizePredictions(rows) {
  if (!rows?.length) return [];
  const valuesByK = {};
  for (const k of CRITERIA) valuesByK[k] = rows.map((r) => safeNum(r[k]));
  const maxVals = {}, minVals = {};
  for (const k of CRITERIA) {
    maxVals[k] = Math.max(...valuesByK[k], 0);
    const positives = valuesByK[k].filter((x) => x > 0);
    minVals[k] = positives.length ? Math.min(...positives) : 0;
  }
  return rows.map((r) => {
    const out = { Tahun: r.Tahun, Nama_Bank: r.Nama_Bank || r.nama_bank || "?" };
    for (const k of CRITERIA) {
      const raw = safeNum(r[k]);
      out[k] = (k === "DER")
        ? (raw > 0 && minVals[k] > 0 ? minVals[k] / raw : 0)
        : (maxVals[k] ? raw / maxVals[k] : 0);
    }
    return out;
  });
}

export function computePriority() {
  const colSums = Array(CRITERIA.length).fill(0);
  for (let j=0;j<CRITERIA.length;j++)
    for (let i=0;i<CRITERIA.length;i++) colSums[j] += safeNum(FIXED[i][j]);

  const norm = Array.from({ length: CRITERIA.length }, () => Array(CRITERIA.length).fill(0));
  for (let i=0;i<CRITERIA.length;i++)
    for (let j=0;j<CRITERIA.length;j++)
      norm[i][j] = safeNum(FIXED[i][j]) / (colSums[j] || 1);

  const weights = norm.map((row) => row.reduce((a,b)=>a+b,0) / row.length);
  return { colSums, norm, weights };
}

export function rankBanks(normalizedRows, weights) {
  const scored = normalizedRows.map((r) => {
    const score = ["ROE","EPS","DER","PER"].reduce(
      (acc, k, idx) => acc + (weights[idx] || 0) * (r[k] || 0), 0
    );
    return { Nama_Bank: r.Nama_Bank, Skor: Number(score.toFixed(5)) };
  });
  scored.sort((a,b)=>b.Skor - a.Skor);
  return scored.map((s, i) => ({ ...s, Ranking: i + 1 }));
}
