import { Doughnut } from "react-chartjs-2";

export default function Gauge({ text="YELLOW", color="#f59e0b", size=160 }) {
  const data = {
    datasets: [
      { data: [100], backgroundColor: [color], borderWidth: 0, cutout: "80%", rotation: -90 }
    ],
  };
 const options = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    datalabels: { display: false }, 
    centerText: { text }
  },
  maintainAspectRatio: false,
};
  return <div style={{ width: size, height: size }}><Doughnut data={data} options={options} /></div>;
}

export function Counter({ value=0, label="", size=140 }) {
  const data = { datasets: [{ data: [100], backgroundColor: ["#e5e7eb"], borderWidth: 0, cutout: "75%" }] };
  const options = {
    plugins: { legend: { display: false }, tooltip: { enabled: false }, centerText: { text: String(value), font: "700 24px system-ui" } },
    maintainAspectRatio: false,
  };
  return (
    <div style={{ display:"grid", placeItems:"center" }}>
      <div style={{ width: size, height: size }}><Doughnut data={data} options={options} /></div>
      <div style={{ marginTop: 8, color:"#555" }}>{label}</div>
    </div>
  );
}
