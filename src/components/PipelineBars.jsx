import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

export default function PipelineBars({ delay, batch, workers, xmax }) {
  const [autoReload, setAutoReload] = useState(false);

  const data = {
    labels: ["Batch Delay", "Batch Size", "Workers"],
    datasets: [
      {
        label: "Pipeline",
        data: [delay, batch, workers],
        backgroundColor: ["#4ade80", "#ef4444", "#3b82f6"],
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "#111",
        anchor: "end",
        align: "end",
      },
    },
    scales: {
      x: { min: 0, max: xmax },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
      {/* 🔽 토글 스위치 */}
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontWeight: 600 }}>Config Auto Reload</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={autoReload}
            onChange={(e) => setAutoReload(e.target.checked)}
          />
          <span className="slider" />
        </label>
      </div>
    </div>
  );
}
