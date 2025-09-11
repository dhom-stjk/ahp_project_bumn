"use client";
import { formatByCrit, safeNum } from "../../../../../lib/format";

export default function BarChart({ title, data, defaultCrit }) {
  const w = 420, h = 200, pad = 32;
  const vals = data.map((d)=>safeNum(d.value));
  const maxV = Math.max(...vals, 1);
  const minV = 0;
  const span = maxV - minV || 1;
  const bandW = (w - 2 * pad) / Math.max(data.length, 1);
  const barW = Math.max(8, bandW - 12);
  const ticksY = [minV, minV + span / 2, maxV];

  return (
    <div className="border rounded-xl p-3 shadow-sm bg-white">
      <div className="text-sm font-semibold mb-2 text-black">{title}</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#D1D5DB" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#D1D5DB" />
        {ticksY.map((tv, i) => {
          const yy = h - pad - ((tv - minV) * (h - 2 * pad)) / span;
          return (
            <g key={i}>
              <line x1={pad - 4} y1={yy} x2={w - pad} y2={yy} stroke="#F3F4F6" />
              <text x={6} y={yy + 4} fontSize="10" fill="#111827">
                {formatByCrit(defaultCrit, tv)}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const x = pad + i * bandW;
          const val = safeNum(d.value);
          const bh = ((val - minV) / span) * (h - 2 * pad) || 1;
          const topY = h - pad - bh;
          const crit = d.crit || defaultCrit;
          return (
            <g key={i}>
              <rect x={x + (bandW - barW)/2} y={topY} width={barW} height={bh} fill="#2563EB" />
              <text x={x + bandW/2} y={topY - 6} fontSize="10" textAnchor="middle" fill="#111827">
                {formatByCrit(crit, val)}
              </text>
              <text x={x + bandW/2} y={h - 8} fontSize="10" textAnchor="middle" fill="#111827">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
