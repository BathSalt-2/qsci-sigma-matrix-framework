import {
  BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import Sidebar from '../Sidebar'

const principles = [
  { name: 'Fairness', score: 94, weight: 18, col: '#60a5fa' },
  { name: 'Transparency', score: 97, weight: 20, col: '#a855f7' },
  { name: 'Accountability', score: 91, weight: 18, col: '#06b6d4' },
  { name: 'Privacy', score: 96, weight: 22, col: '#10b981' },
  { name: 'Beneficence', score: 93, weight: 12, col: '#f59e0b' },
  { name: 'Non-maleficence', score: 98, weight: 10, col: '#8b5cf6' },
]

const decisions = [
  { id: 'D-2841', ctx: 'Data retrieval request', decision: 'Approved', conf: 98, ago: '2m' },
  { id: 'D-2840', ctx: 'Predictive modeling task', decision: 'Approved', conf: 95, ago: '5m' },
  { id: 'D-2839', ctx: 'Sensitive data query', decision: 'Redacted', conf: 99, ago: '8m' },
  { id: 'D-2838', ctx: 'Unauthorized profiling attempt', decision: 'Blocked', conf: 97, ago: '12m' },
  { id: 'D-2837', ctx: 'Cross-domain knowledge synthesis', decision: 'Approved', conf: 94, ago: '15m' },
]

const trend = Array.from({ length: 30 }, (_, i) => ({
  d: `D${i + 1}`,
  score: Math.min(100, 91 + Math.sin(i * 0.28) * 2.2 + Math.random() * 1.4),
}))

const QTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(13,17,23,.96)', border: '1px solid rgba(16,185,129,.28)', borderRadius: '8px', padding: '9px 13px', fontSize: '.76rem', color: '#94a3b8' }}>
      <div style={{ color: '#10b981', marginBottom: '3px', fontFamily: 'Orbitron,monospace', fontSize: '.6rem' }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</div>)}
    </div>
  )
}

export default function EOM({ navigate }) {
  const overall = principles.reduce((a, p) => a + p.score * p.weight / 100, 0).toFixed(1)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
      <Sidebar navigate={navigate} active="eom" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '26px' }}>

        <div style={{ marginBottom: '22px' }}>
          <button onClick={() => navigate('dashboard')} className="btn-ghost" style={{ marginBottom: '12px' }}>← Dashboard</button>
          <h1 style={{ margin: 0, fontFamily: 'Orbitron,monospace', fontSize: '1.28rem', color: '#10b981', textShadow: '0 0 20px rgba(16,185,129,.4)' }}>Ethical Oversight Module</h1>
          <p style={{ margin: '7px 0 0', color: 'rgba(148,163,184,.6)', fontSize: '.84rem' }}>DERE-powered real-time ethical compliance monitoring, audit logs, and transparency reporting.</p>
        </div>

        <div className="quantum-card" style={{ padding: '22px', marginBottom: '18px', background: 'rgba(16,185,129,.04)', border: '1px solid rgba(16,185,129,.18)', display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', minWidth: '110px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '2.8rem', fontWeight: 900, color: '#10b981', textShadow: '0 0 28px rgba(16,185,129,.5)' }}>{overall}</div>
            <div style={{ fontSize: '.62rem', color: 'rgba(16,185,129,.5)', fontFamily: 'Orbitron,monospace', textTransform: 'uppercase', letterSpacing: '.1em' }}>Compliance Score</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '.8rem', color: 'rgba(148,163,184,.7)', marginBottom: '7px' }}>DERE Assessment: <strong style={{ color: '#10b981' }}>All ethical guidelines satisfied</strong></div>
            <div style={{ fontSize: '.8rem', color: 'rgba(148,163,184,.7)', marginBottom: '10px' }}>Principles monitored: <strong style={{ color: 'rgba(148,163,184,.9)' }}>6/6</strong> · Last audit: <strong style={{ color: 'rgba(148,163,184,.9)' }}>2 minutes ago</strong></div>
            <div style={{ padding: '8px 13px', background: 'rgba(16,185,129,.07)', border: '1px solid rgba(16,185,129,.18)', borderRadius: '6px', fontSize: '.77rem', color: 'rgba(148,163,184,.58)' }}>
              Zero critical violations detected in the last 30 days. All outputs pass DERE real-time screening for fairness, privacy, and non-maleficence.
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '18px' }}>
          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#10b981', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Principle Compliance Scores</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={principles} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 8 }} />
                <YAxis domain={[85, 100]} tick={{ fontSize: 9 }} />
                <Tooltip content={<QTip />} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} name="score">
                  {principles.map((p, i) => <Cell key={i} fill={p.col} opacity={0.82} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#06b6d4', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Weight Distribution</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={principles} dataKey="weight" cx="50%" cy="50%" outerRadius={72} innerRadius={32} strokeWidth={0}>
                  {principles.map((p, i) => <Cell key={i} fill={p.col} opacity={0.82} />)}
                </Pie>
                <Tooltip formatter={(v, n, p) => [`${v}%`, p.payload.name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="quantum-card" style={{ padding: '18px', marginBottom: '18px' }}>
          <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#a855f7', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>30-Day Compliance Trend</div>
          <ResponsiveContainer width="100%" height={110}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="d" tick={{ fontSize: 8 }} interval={5} />
              <YAxis domain={[88, 100]} tick={{ fontSize: 9 }} />
              <Tooltip content={<QTip />} />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={false} name="overall" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="quantum-card" style={{ padding: '18px' }}>
          <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#60a5fa', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>DERE Decision Log</div>
          {decisions.map(d => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(96,165,250,.03)', borderRadius: '6px', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'Orbitron,monospace', fontSize: '.65rem', color: 'rgba(96,165,250,.45)', width: '58px', flexShrink: 0 }}>{d.id}</span>
              <span style={{ flex: 1, fontSize: '.78rem', color: '#94a3b8' }}>{d.ctx}</span>
              <span style={{ padding: '2px 9px', borderRadius: '999px', fontSize: '.66rem', fontFamily: 'Orbitron,monospace', background: d.decision === 'Approved' ? 'rgba(16,185,129,.1)' : d.decision === 'Blocked' ? 'rgba(239,68,68,.1)' : 'rgba(245,158,11,.1)', color: d.decision === 'Approved' ? '#10b981' : d.decision === 'Blocked' ? '#ef4444' : '#f59e0b', flexShrink: 0 }}>{d.decision}</span>
              <span style={{ fontSize: '.68rem', color: 'rgba(16,185,129,.5)', width: '28px', textAlign: 'right' }}>{d.conf}%</span>
              <span style={{ fontSize: '.65rem', color: 'rgba(96,165,250,.28)', width: '26px', textAlign: 'right' }}>{d.ago}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
