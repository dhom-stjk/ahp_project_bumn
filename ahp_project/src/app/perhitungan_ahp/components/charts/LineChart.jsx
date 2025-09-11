"use client";
import { formatByCrit, safeNum } from "@/lib/format";

export default function LineChart({ title, crit, dataMap, h = 180 }) {
  const years = Object.keys(dataMap).map(Number).sort((a,b)=>a-b);
  const vals = years.map((y)=>safeNum(dataMap[y]));
  const w = 420, pad = 32;
  const minV = Math.min(...vals, 0);
  const maxV = Math.max(...vals, 1);
  const span = maxV - minV || 1;

  const points = years.map((y, i) => {
    const x = pad + (i * (w - 2 * pad)) / Math.max(years.length - 1, 1);
    const yv = h - pad - ((safeNum(dataMap[y]) - minV) * (h - 2 * pad)) / span;
    return { x, y: yv, year: y, val: safeNum(dataMap[y]) };
  });

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
                {formatByCrit(crit, tv)}
              </text>
            </g>
          );
        })}
        <polyline
          fill="none"
          stroke="#2563EB"
          strokeWidth="2"
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        />
        {points.map((p) => (
          <g key={p.year}>
            <circle cx={p.x} cy={p.y} r="3" fill="#111827" />
            <text x={p.x} y={p.y - 8} fontSize="10" textAnchor="middle" fill="#111827">
              {formatByCrit(crit, p.val)}
            </text>
          </g>
        ))}
        {points.map((p) => (
          <text key={`x-${p.year}`} x={p.x} y={h - 8} fontSize="10" textAnchor="middle" fill="#111827">
            {p.year}
          </text>
        ))}
      </svg>
    </div>
  );
}
