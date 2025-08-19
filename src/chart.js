// src/chart.js  (순수 JS)
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// 중앙 텍스트 플러그인 (JS 버전)
const CenterText = {
  id: "centerText",
  beforeDraw(chart, _args, pluginOptions) { //chart.js에서 제공하는 hook (훅) : 중간에서 걸리는 지점
    const { ctx, chartArea } = chart || {}; //ctx와 charArea를 구조분해 할당. chart가 없다면 오류를 막기위해 {}로 안전하게 처리.
    const text = pluginOptions && pluginOptions.text;
    if (!text || !chartArea) return; //text가 없거나 차트영역이 없으면 그냥 함수 종료(아무것도 안그림)
    ctx.save();
    ctx.font = (pluginOptions && pluginOptions.font) || "700 18px system-ui, sans-serif";
    ctx.fillStyle = (pluginOptions && pluginOptions.color) || "#111";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText( //정중앙 좌표 계산해서 텍스트 출력
      text,
      (chartArea.left + chartArea.right) / 2,
      (chartArea.top + chartArea.bottom) / 2
    );
    ctx.restore();
  },
};

ChartJS.register( //사용하는 요소만 등록
  ArcElement, //도넛형
  Tooltip, 
  Legend, //범례
  CategoryScale, //축
  LinearScale, //축
  BarElement, //막대형
  ChartDataLabels, //막대 끝 숫자
  CenterText //직접 만든 플러그인 (도넛형 그래프안 중앙에 텍스트 생성)
);

export default ChartJS;
