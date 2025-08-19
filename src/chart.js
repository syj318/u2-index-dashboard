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
  beforeDraw(chart, _args, pluginOptions) {
    const { ctx, chartArea } = chart || {};
    const text = pluginOptions && pluginOptions.text;
    if (!text || !chartArea) return;
    ctx.save();
    ctx.font = (pluginOptions && pluginOptions.font) || "700 18px system-ui, sans-serif";
    ctx.fillStyle = (pluginOptions && pluginOptions.color) || "#111";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      text,
      (chartArea.left + chartArea.right) / 2,
      (chartArea.top + chartArea.bottom) / 2
    );
    ctx.restore();
  },
};

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  CenterText // ← JS에서는 'as any' 같은 거 쓰면 에러 납니다
);

export default ChartJS;
