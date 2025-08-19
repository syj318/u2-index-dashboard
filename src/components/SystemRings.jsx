// src/components/SystemGauges.jsx
import { Doughnut } from "react-chartjs-2";

const clamp01 = (v) => Math.max(0, Math.min(100, v));

function MiniGauge({
  title,
  valuePct,
  detail,
  color = "#22c55e",
  size = 140,
}) {
  const v = clamp01(valuePct);

  const data = {
    datasets: [
      {
        data: [v, 100 - v],
        backgroundColor: [color, "#e5e7eb"],
        borderWidth: 0,
        cutout: "75%",
        rotation: -90,
        circumference: 360,
        hoverOffset: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false },
      // chart.js에 등록해둔 CenterText 플러그인 사용
      centerText: { text: `${v.toFixed(2)}%`, font: "700 22px system-ui" },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <div style={{ width: size, height: size }}>
        <Doughnut data={data} options={options} />
      </div>
      <div style={{ marginTop: 8, fontWeight: 700 }}>{title}</div>
      {detail && (
        <div style={{ marginTop: 4, color: "#64748b", fontSize: 13 }}>
          {detail}
        </div>
      )}
    </div>
  );
}

export default function SystemGauges({ cpuPct, memUsedMB, memFreeMB }) {
  const total = Math.max(1, memUsedMB + memFreeMB);
  const usedPct = (memUsedMB / total) * 100;
  const freePct = (memFreeMB / total) * 100;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
      }}
    >
      <MiniGauge
        title="CPU 사용률"
        valuePct={cpuPct}
        detail={`원시값: ${cpuPct.toFixed(2)}%`}
        color="#f59e0b"
      />
      <MiniGauge
        title="메모리 사용률"
        valuePct={usedPct}
        detail={`${memUsedMB.toFixed(2)} MB / 총 ${total.toFixed(2)} MB`}
        color="#ef4444"
      />
      <MiniGauge
        title="메모리 여유율"
        valuePct={freePct}
        detail={`${memFreeMB.toFixed(2)} MB / 총 ${total.toFixed(2)} MB`}
        color="#10b981"
      />
    </div>
  );
}
