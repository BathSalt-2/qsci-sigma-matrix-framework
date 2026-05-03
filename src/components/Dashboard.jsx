import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import Sidebar from './Sidebar'

const qccData = Array.from({ length: 24 }, (_, i) => ({
  h: `${i}:00`,
  load: Math.floor(52 + Math.sin(i * 0.5) * 16 + Math.random() * 7),
  throughput: Math.floor(68 + Math.cos(i * 0.4) * 12 + Math.random() * 6),
}))

const ethicsData = [
  { cat: 'Fairness', score: 94 },
  { cat: 'Transparency', score: 97 },
  { cat: 'Accountability', score: 91 },
  { cat: 'Privacy', score: 96 },
  { cat: 'Beneficence', score: 93 },
]

const learningData = Array.from({ length: 12 }, (_, i) => ({
  w: `W${i + 1}`,
  accuracy: Math.min(99, 58 + i * 3.3 + Math.random() * 1.5),
}))

const WIDGETS = [
  { id: 'qcc', title: 'Quantum Processing Load', value: '73.4%', trend: '+2.1%', pos: true, col: '#60a5fa', desc: 'Real-time QCC utilization' },
  { id: 'ethics', title: 'Ethical Compliance Score', value: '94.7', trend: '+0.3', pos: true, col: '#10b981', desc: 'DERE aggregate compliance' },
  { id: 'learning', title: 'Learning Accuracy', value: '97.8%', trend: '+1.2%', pos: true, col: '#a855f7', desc: 'ALCI adaptive performance' },
  { id: 'health', title: 'System Health', value: '99.9%', trend: 'Nominal', pos: true, col: '#06b6d4', desc: 'All subsystems operational' },
]

const SYSTEM = [
  { name: 'Quantum Cognitive Core', load: 73 },
  { name: 'Adaptive Learning CI', load: 45 },
  { name: 'Ethical Oversight Module', load: 22 },
  { name: 'NeuroQuantum Affective Module', load: 31 },
  { name: 'Temporal-Symbolic Engine', load: 58 },
  { name: 'QEN Network Bridge', load: 19 },
]

const QTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(13,17,23,.96)', border: '1px solid rgba(96,165,250,.28)', borderRadius: '8px', padding: '10px 14px', fontSize: '.77rem', color: '#94a3b8' }}>
      <div style={{ color: '#60a5fa', marginBottom: '4px', fontFamily: 'Orbitron,monospace', fontSize: '.62rem' }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</div>)}
    </div>
  )
}

export default function Dashboard({ navigate }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
      <Sidebar navigate={navigate} active="dashboard" />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{
          padding: '18px 26px',
          borderBottom: '1px solid rgba(96,165,250,0.09)',
          background: 'rgba(5,8,16,0.85)',
          backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: 'Orbitron,monospace', fontSize: '1.08rem', fontWeight: 700, color: '#e2e8f0' }}>
              Quantum Intelligence Hub
            </h1>
            <div style={{ fontSize: '0.72rem', color: 'rgba(96,165,250,0.45)', marginTop: '2px' }}>
              Real-time overview — Or4cl3 AI Solutions
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.72rem', color: 'rgba(148,163,184,0.55)' }}>
            <div className="status-active" />
            <span>All Systems Nominal</span>
          </div>
        </div>

        <div style={{ padding: '22px 26px' }}>

          {/* Widgets */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: '14px', marginBottom: '20px' }}>
            {WIDGETS.map(w => (
              <div key={w.id} className="quantum-card"
                style={{ padding: '18px', cursor: 'pointer' }}
                onClick={() => setExpanded(expanded === w.id ? null : w.id)}>
                <div style={{ fontSize: '0.67rem', color: 'rgba(148,163,184,0.45)', fontFamily: 'Orbitron,monospace', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '10px' }}>{w.title}</div>
                <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.75rem', fontWeight: 700, color: w.col, textShadow: `0 0 18px ${w.col}55`, marginBottom: '8px' }}>{w.value}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: w.pos ? '#10b981' : '#ef4444', background: w.pos ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: '999px' }}>{w.trend}</span>
                  <span style={{ fontSize: '0.68rem', color: 'rgba(148,163,184,0.38)' }}>{w.desc}</span>
                </div>
                {expanded === w.id && w.id === 'qcc' && (
                  <div style={{ marginTop: '14px', height: '70px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={qccData.slice(-10)}>
                        <Area type="monotone" dataKey="load" stroke={w.col} fill={`${w.col}22`} strokeWidth={1.5} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {expanded === w.id && w.id === 'learning' && (
                  <div style={{ marginTop: '14px', height: '70px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={learningData}>
                        <Line type="monotone" dataKey="accuracy" stroke={w.col} strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div className="quantum-card" style={{ padding: '18px' }}>
              <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '0.72rem', color: '#60a5fa', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>QCC — 24h Processing Load</div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={qccData}>
                  <defs>
                    <linearGradient id="aBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#60a5fa" stopOpacity=".28" /><stop offset="95%" stopColor="#60a5fa" stopOpacity="0" /></linearGradient>
                    <linearGradient id="aCyan" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity=".2" /><stop offset="95%" stopColor="#06b6d4" stopOpacity="0" /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="h" tick={{ fontSize: 9 }} interval={3} />
                  <YAxis tick={{ fontSize: 9 }} domain={[35, 100]} />
                  <Tooltip content={<QTip />} />
                  <Area type="monotone" dataKey="load" stroke="#60a5fa" fill="url(#aBlue)" strokeWidth={1.5} dot={false} name="load" />
                  <Area type="monotone" dataKey="throughput" stroke="#06b6d4" fill="url(#aCyan)" strokeWidth={1.5} dot={false} name="throughput" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="quantum-card" style={{ padding: '18px' }}>
              <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '0.72rem', color: '#10b981', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Ethical Compliance Breakdown</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ethicsData} barSize={26}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cat" tick={{ fontSize: 9 }} />
                  <YAxis domain={[85, 100]} tick={{ fontSize: 9 }} />
                  <Tooltip content={<QTip />} />
                  <Bar dataKey="score" fill="#10b981" opacity={0.8} radius={[4, 4, 0, 0]} name="score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* System status */}
          <div className="quantum-card" style={{ padding: '18px', marginBottom: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '0.72rem', color: '#a855f7', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em', display: 'flex', justifyContent: 'space-between' }}>
              <span>Subsystem Status</span>
              <span style={{ color: '#10b981' }}>● All Operational</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SYSTEM.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 10px', background: 'rgba(96,165,250,0.03)', borderRadius: '6px', border: '1px solid rgba(96,165,250,0.05)' }}>
                  <div className="status-active" style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: '0.8rem', color: '#94a3b8' }}>{s.name}</span>
                  <div style={{ width: '90px', height: '3px', background: 'rgba(96,165,250,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${s.load}%`, height: '100%', background: s.load > 75 ? '#f59e0b' : s.load > 55 ? '#60a5fa' : '#10b981', borderRadius: '999px' }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'Orbitron,monospace', color: s.load > 75 ? '#f59e0b' : '#60a5fa', width: '32px', textAlign: 'right' }}>{s.load}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick nav */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { label: 'Quantum Core', id: 'qcc', col: '#60a5fa' },
              { label: 'AI Assistant', id: 'chat', col: '#a855f7' },
              { label: 'Ethics Audit', id: 'eom', col: '#10b981' },
              { label: 'Temporal Analysis', id: 'qtse', col: '#06b6d4' },
            ].map(a => (
              <button key={a.id} onClick={() => navigate(a.id)} className="btn-ghost" style={{ color: a.col, borderColor: `${a.col}40` }}>► {a.label}</button>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
