export default function IndexTable({ health, index, docs, storeSize }) {
  const pillColor = (h) => h === "GREEN" ? "#10b981" : h === "RED" ? "#ef4444" : "#f59e0b";
  return (
    <div style={{ border:"1px solid #e5e7eb", borderRadius:12, overflow:"hidden" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14 }}>
        <thead style={{ background:"#f8fafc" }}>
          <tr><th style={th}>Health</th><th style={th}>Index</th><th style={th}>Docs Count</th><th style={th}>Store Size (bytes)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}><span style={{ padding:"4px 10px", borderRadius:999, background:pillColor(health), color:"#fff", fontWeight:700 }}>{health.toLowerCase()}</span></td>
            <td style={td}>{index}</td>
            <td style={td}>{docs}</td>
            <td style={td}>{storeSize}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
const th = { textAlign:"left", padding:"10px 12px", borderBottom:"1px solid #e5e7eb" };
const td = { padding:"10px 12px", borderTop:"1px solid #f1f5f9" };
