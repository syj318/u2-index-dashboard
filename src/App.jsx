// src/App.jsx
import Gauge, { Counter } from "./components/Gauge.jsx";
import PipelineBars from "./components/PipelineBars.jsx";
import SystemRings from "./components/SystemRings.jsx";
import IndexTable from "./components/IndexTable.jsx";

export default function App() {
  const monitoring = { status: "YELLOW", nodes: 1, activeShards: 1 };
  const indexState = { health: "YELLOW", index: "product_index", docs: 2, storeBytes: 7658 };
  const pipelines  = { workers: 2, batchSize: 125, batchDelay: 50, autoReload: false };
  const system     = { cpuPct: -100.0, memUsedMB: 49.7, memFreeMB: 30.3 };


  
  const healthColor =
    monitoring.status === "GREEN" ? "#10b981" :
    monitoring.status === "RED"   ? "#ef4444" : "#f59e0b";

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif", color: "#111", background:"#f8fafc" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>U2-INDEX 관리 대시보드</h1>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:24 }}>
        <section style={card}>
          <h2 style={title}>인덱스 모니터링</h2>
          <div style={{ display:"flex", gap:28, alignItems:"center" }}>
            <div>
              <Gauge text={monitoring.status} color={healthColor} size={170}/>
              <div style={{ textAlign:"center", marginTop:8, color:"#555" }}>상태</div>
            </div>
            <Counter value={monitoring.nodes}        label="노드 수" />
            <Counter value={monitoring.activeShards} label="활성 샤드 수" />
          </div>
        </section>

        <section style={card}>
          <h2 style={title}>인덱스 상태</h2>
          <IndexTable
            health={indexState.health}
            index={indexState.index}
            docs={indexState.docs}
            storeSize={indexState.storeBytes}
          />
        </section>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
        <section style={card}>
  <h2 style={title}>파이프라인</h2>
  <PipelineBars
    delay={pipelines.batchDelay}
    batch={pipelines.batchSize}
    workers={pipelines.workers}
    xmax={150}
  />
</section>


        <section style={card}>
          <h2 style={title}>시스템 모니터</h2>
          <SystemRings cpuPct={system.cpuPct} memUsedMB={system.memUsedMB} memFreeMB={system.memFreeMB}/>
        </section>
      </div>
    </div>
  );
}
const card  = { background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, padding:18, boxShadow:"0 1px 2px rgba(0,0,0,.03)" };
const title = { fontSize:16, fontWeight:700, marginBottom:12 };
