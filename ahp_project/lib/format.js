export const safeNum = (v) => {
  const n = Number(String(v).toString().replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};

const nfID = new Intl.NumberFormat("id-ID");

export function formatByCrit(crit, val) {
  const v = Number(val) || 0;
  if (crit === "ROE" || crit === "PER") return `${v.toFixed(2)}%`;
  if (crit === "EPS") return `Rp ${nfID.format(Math.round(v))}`;
  return v.toFixed(2); // DER: rasio
}

export function boundByCrit(crit, val) {
  let v = Number(val) || 0;
  if (crit === "ROE" || crit === "PER") v = Math.max(0, Math.min(100, v));
  else v = Math.max(0, v);
  return v;
}
