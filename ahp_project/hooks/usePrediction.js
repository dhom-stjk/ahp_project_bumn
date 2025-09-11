import { safeNum, boundByCrit } from "@/lib/format";
import { CRITERIA } from "@/lib/constants";

// linear regression y = a + b x
export function linRegPredict(xs, ys, xPred) {
  const n = xs.length;
  const sx = xs.reduce((a,b)=>a+b,0);
  const sy = ys.reduce((a,b)=>a+b,0);
  const sxx = xs.reduce((a,b)=>a+b*b,0);
  const sxy = xs.reduce((acc,xi,i)=>acc+xi*ys[i],0);
  const denom = n * sxx - sx * sx || 1;
  const b = (n * sxy - sx * sy) / denom;
  const a = (sy - b * sx) / n;
  return a + b * xPred;
}

// bangun prediksi 2025 utk daftar bank yg sedang tampil
export function buildPredictions(allData, banks) {
  const years = [2020, 2021, 2022, 2023, 2024];

  const byBankYear = {};
  banks.forEach((b) => (byBankYear[b] = {}));
  allData.forEach((r) => {
    const b = r.Nama_Bank || r.nama_bank;
    const Y = Number(r.Tahun);
    if (banks.includes(b)) byBankYear[b][Y] = r;
  });

  const preds = [];
  banks.forEach((b) => {
    const row = { Nama_Bank: b, Tahun: 2025 };
    CRITERIA.forEach((k) => {
      const xs = [], ys = [];
      years.forEach((Y) => {
        const rr = byBankYear[b][Y];
        if (rr && rr[k] != null) { xs.push(Y); ys.push(safeNum(rr[k])); }
      });
      const raw = xs.length >= 2 ? linRegPredict(xs, ys, 2025) : 0;
      row[k] = boundByCrit(k, raw);
    });
    preds.push(row);
  });

  return { preds, byBankYear };
}
