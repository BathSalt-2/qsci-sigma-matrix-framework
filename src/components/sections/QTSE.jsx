import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from 'recharts'
import Sidebar from '../Sidebar'

const temporal = Array.from({ length: 40 }, (_, i) => ({
  t: `T${i + 1}`,
  actual: 50 + Math.sin(i * 0.4) * 22 + Math.cos(i * 0.22) * 10 + Math.random() * 5,
  predicted: 50 + Math.sin((i + 2) * 0.4) * 22 + Math.cos((i + 2) * 0.22) * 10 + Math.random() * 3,
  confidence: 70 + Math.cos(i * 0.32) * 14 + Math.random() * 4,
}))

const scenarios = [
  { s: 'Baseline', t5: 52, t10: 58, t20: 65, t50: 72 },
  { s: 'Optimistic', t5: 61, t10: 71, t20: 82, t50: 90 },
  { s: 'Pessimistic', t5: 44, t10: 38, t20: 31, t50: 27 },
]

const anomalies = [
  { id: 'A-041', ts: 'T-18', type: 'Trend Shift', sev: 'Medium', conf: 91, st: 'Resolved' },
  { id: 'A-040', ts: 'T-24', type: 'Periodicity Break', sev: 'Low', conf: 87, st: 'Resolved' },
  { id: 'A-039', ts: 'T-31', type: 'Volatility Spike', sev: 'High', conf: 96, st: 'Flagged' },
  { id: 'A-038', ts: 'T-35', type: 'Pattern Anomaly', sev: 'Low', conf: 83, st: 'Resolved' },
]

const QTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(13,17,23,.96)', border: '1px solid rgba(6,182,212,.28)', borderRadius: '8px', padding: '9px 13px', fontSize: '.76rem', color: '#94a3b8' }}>
      <div style={{ color: '#06b6d4', marginBottom: '3px', fontFamily: 'Orbitron,monospace', fontSize: '.6rem' }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</div>)}
    </div>
  )
}

export default function QTSE({ navigate }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
      <Sidebar navigate={navigate} active="qtse" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '26px' }}>

        <div style={{ marginBottom: '22px' }}>
          <button onClick={() => navigate('dashboard')} className="btn-ghost" style={{ marginBottom: '12px' }}>← Dashboard</button>
          <h1 style={{ margin: 0, fontFamily: 'Orbitron,monospace', fontSize: '1.28rem', color: '#06b6d4', textShadow: '0 0 20px rgba(6,182,212,.4)' }}>Quantum Temporal-Symbolic Engine</h1>
          <p style={{ margin: '7px 0 0', color: 'rgba(148,163,184,.6)', fontSize: '.84rem' }}>Advanced temporal reasoning, time-series analysis, anomaly detection, and predictive scenario modeling.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '18px' }}>
          {[{ l: 'Temporal Depth', v: 'T-500', c: '#06b6d4' }, { l: 'Prediction Accuracy', v: '89.3%', c: '#60a5fa' }, { l: 'Anomalies (30d)', v: '4', c: '#f59e0b' }, { l: 'Forecast Horizon', v: 'T+50', c: '#a855f7' }].map(k => (
            <div key={k.l} className="quantum-card" style={{ padding: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.45rem', fontFamily: 'Orbitron,monospace', fontWeight: 700, color: k.c }}>{k.v}</div>
              <div style={{ fontSize: '.65rem', color: 'rgba(148,163,184,.45)', marginTop: '4px', fontFamily: 'Orbitron,monospace', textTransform: 'uppercase', letterSpacing: '.08em' }}>{k.l}</div>
            </div>
          ))}
        </div>

        <div className="quantum-card" style={{ padding: '18px', marginBottom: '18px' }}>
          <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#06b6d4', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Temporal Pattern — Actual vs Predicted</div>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={temporal}>
              <defs>
                <linearGradient id="confG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity=".14" />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" tick={{ fontSize: 9 }} interval={4} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip content={<QTip />} />
              <Line type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={2} dot={false} name="actual" />
              <Line type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={1.5} dot={false} strokeDasharray="6 3" name="predicted" />
              <Line type="monotone" dataKey="confidence" stroke="rgba(96,165,250,.4)" strokeWidth={1} dot={false} strokeDasharray="2 5" name="confidence" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#a855f7', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Scenario Projections</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={scenarios} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="s" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="t5" fill="#60a5fa" opacity={0.8} radius={[3, 3, 0, 0]} name="T+5" />
                <Bar dataKey="t10" fill="#a855f7" opacity={0.8} radius={[3, 3, 0, 0]} name="T+10" />
                <Bar dataKey="t20" fill="#06b6d4" opacity={0.8} radius={[3, 3, 0, 0]} name="T+20" />
                <Bar dataKey="t50" fill="#10b981" opacity={0.8} radius={[3, 3, 0, 0]} name="T+50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#f59e0b', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Anomaly Detection Log</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {anomalies.map(a => (
                <div key={a.id} style={{ padding: '9px 12px', background: 'rgba(245,158,11,.04)', borderRadius: '6px', border: `1px solid ${a.sev === 'High' ? 'rgba(239,68,68,.22)' : 'rgba(245,158,11,.1)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'Orbitron,monospace', fontSize: '.65rem', color: 'rgba(6,182,212,.55)' }}>{a.id} · {a.ts}</span>
                    <span style={{ fontSize: '.63rem', padding: '1px 8px', borderRadius: '999px', background: a.st === 'Flagged' ? 'rgba(239,68,68,.1)' : 'rgba(16,185,129,.1)', color: a.st === 'Flagged' ? '#ef4444' : '#10b981' }}>{a.st}</span>
                  </div>
                  <div style={{ fontSize: '.76rem', color: '#94a3b8' }}>{a.type}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '3px', fontSize: '.66rem' }}>
                    <span style={{ color: a.sev === 'High' ? '#ef4444' : a.sev === 'Medium' ? '#f59e0b' : '#10b981' }}>{a.sev}</span>
                    <span style={{ color: 'rgba(148,163,184,.4)' }}>Confidence: {a.conf}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
