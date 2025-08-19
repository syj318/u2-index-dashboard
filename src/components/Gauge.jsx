import { Doughnut } from "react-chartjs-2"; //chart.js에서 doughnut 컴포넌트를 가져와서 원형 도넛 차트를 그림.

export default function Gauge({ text="YELLOW", color="#f59e0b", size=160 }) {
  const data = {
    datasets: [
      { data: [100], backgroundColor: [color], borderWidth: 0, cutout: "80%", rotation: -90 } //꽉찬 원 그린뒤(data:[100], 색상 상태에따라 지정, cutout: 도넛 가운데 구멍크기, rotation: 시작위치)
    ],
  };
 const options = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    datalabels: { display: false }, 
    centerText: { text } //사용할 기능만 표시 나머지는 false
  },
  maintainAspectRatio: false,
};
  return <div style={{ width: size, height: size }}><Doughnut data={data} options={options} /></div>;
}

export function Counter({ value=0, label="", size=140 }) { //value : 표시할숫자, label: 설명텍스트(상태,노드수,활성샤드수, size: 도넛크기)
  const data = { datasets: [{ data: [100], backgroundColor: ["#e5e7eb"], borderWidth: 0, cutout: "75%" }] };
  const options = {
    plugins: { legend: { display: false }, tooltip: { enabled: false }, centerText: { text: String(value), font: "700 24px system-ui" } }, //text:String(value): 전달된값 표시
    maintainAspectRatio: false,
  };
  return ( //도넛 아래 이름 라벨 출력, 회색 도넛안에 들어가는 숫자 표시
    <div style={{ display:"grid", placeItems:"center" }}> 
      <div style={{ width: size, height: size }}><Doughnut data={data} options={options} /></div>
      <div style={{ marginTop: 8, color:"#555" }}>{label}</div>
    </div>
  );
}
