import { Doughnut } from "react-chartjs-2";
const clamp01 = (v) => Math.max(0, Math.min(100, v));

export default function SystemRings({ cpuPct, memUsedMB, memFreeMB, showRaw=true }) {
  // CPU -100% 같은 이상치는 0~100으로 보정해서 차트 표시 (텍스트는 원값도 보여줄 수 있음)
  const cpu = clamp01(cpuPct);
  const total = Math.max(1, memUsedMB + memFreeMB);
  const usedPct = clamp01((memUsedMB / total) * 100);
  const freePct = clamp01((memFreeMB / total) * 100);

  const mkRing = (v, fg, bg, radius, cutout) => ({
    data: [v, 100 - v],
    backgroundColor: [fg, bg],
    borderWidth: 0,
    radius, cutout, rotation:-90, circumference:360, hoverOffset:0
  });

  const data = {
    datasets: [
      mkRing(cpu,     "#60a5fa", "#e5e7eb", "100%", "68%"), // CPU
      mkRing(usedPct, "#ef4444", "#e5e7eb", "84%",  "52%"), // Used
      mkRing(freePct, "#10b981", "#e5e7eb", "68%",  "36%"), // Free
    ],
  };
  const options = { plugins:{ legend:{ display:false } }, maintainAspectRatio:false };

  return (
    <div>
      <div style={{ height: 240 }}><Doughnut data={data} options={options} /></div>
      {showRaw && (
        <ul style={{ marginTop:10, fontSize:14, lineHeight:1.6 }}>
          <li>🟦 CPU Load: {cpuPct.toFixed(1)}% (chart: {cpu.toFixed(1)}%)</li>
          <li>🟥 Memory Used: {memUsedMB.toFixed(1)} MB ({usedPct.toFixed(1)}%)</li>
          <li>🟩 Memory Free: {memFreeMB.toFixed(1)} MB ({freePct.toFixed(1)}%)</li>
        </ul>
      )}
    </div>
  );
}
