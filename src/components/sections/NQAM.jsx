import {
  AreaChart, Area, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import Sidebar from '../Sidebar'

const timeline = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  joy: Math.max(0, Math.floor(22 + Math.sin(i * 0.6) * 11 + Math.random() * 7)),
  neutral: Math.floor(34 + Math.cos(i * 0.4) * 7 + Math.random() * 5),
  curiosity: Math.max(0, Math.floor(24 + Math.sin(i * 0.5 + 1) * 9 + Math.random() * 6)),
  concern: Math.max(0, Math.floor(10 + Math.cos(i * 0.7) * 4 + Math.random() * 3)),
}))

const current = [
  { e: 'Joy', v: 28, col: '#f59e0b' },
  { e: 'Neutral', v: 38, col: '#60a5fa' },
  { e: 'Curiosity', v: 24, col: '#a855f7' },
  { e: 'Concern', v: 10, col: '#ef4444' },
]

const eiMetrics = [
  { l: 'Emotional Intelligence Index', v: 91.2, col: '#f59e0b' },
  { l: 'Empathy Resonance', v: 88.4, col: '#a855f7' },
  { l: 'Sentiment Accuracy', v: 94.7, col: '#60a5fa' },
  { l: 'Contextual Awareness', v: 92.1, col: '#10b981' },
]

const QTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(13,17,23,.96)', border: '1px solid rgba(245,158,11,.28)', borderRadius: '8px', padding: '9px 13px', fontSize: '.76rem', color: '#94a3b8' }}>
      <div style={{ color: '#f59e0b', marginBottom: '3px', fontFamily: 'Orbitron,monospace', fontSize: '.6rem' }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}%</div>)}
    </div>
  )
}

export default function NQAM({ navigate }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
      <Sidebar navigate={navigate} active="nqam" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '26px' }}>

        <div style={{ marginBottom: '22px' }}>
          <button onClick={() => navigate('dashboard')} className="btn-ghost" style={{ marginBottom: '12px' }}>← Dashboard</button>
          <h1 style={{ margin: 0, fontFamily: 'Orbitron,monospace', fontSize: '1.28rem', color: '#f59e0b', textShadow: '0 0 20px rgba(245,158,11,.4)' }}>NeuroQuantum Affective Module</h1>
          <p style={{ margin: '7px 0 0', color: 'rgba(148,163,184,.6)', fontSize: '.84rem' }}>Emotional intelligence analysis and affective state processing for human-centric AI interactions.</p>
          <div style={{ marginTop: '9px', padding: '7px 12px', background: 'rgba(245,158,11,.05)', border: '1px solid rgba(245,158,11,.18)', borderRadius: '6px', fontSize: '.73rem', color: 'rgba(245,158,11,.55)' }}>
            Privacy Notice: All emotional data is anonymized, aggregated, and session-scoped. Persistent processing requires explicit granular user consent per GDPR/CCPA.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '18px' }}>
          {current.map(s => (
            <div key={s.e} className="quantum-card" style={{ padding: '15px', textAlign: 'center', borderColor: `${s.col}22` }}>
              <div style={{ fontSize: '1.55rem', fontFamily: 'Orbitron,monospace', fontWeight: 700, color: s.col }}>{s.v}%</div>
              <div style={{ fontSize: '.65rem', color: 'rgba(148,163,184,.45)', marginTop: '4px', fontFamily: 'Orbitron,monospace', textTransform: 'uppercase', letterSpacing: '.08em' }}>{s.e}</div>
              <div style={{ marginTop: '7px', height: '3px', background: `${s.col}18`, borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${s.v}%`, height: '100%', background: s.col, borderRadius: '999px', opacity: .85 }} />
              </div>
            </div>
          ))}
        </div>

        <div className="quantum-card" style={{ padding: '18px', marginBottom: '18px' }}>
          <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#f59e0b', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Affective State Timeline — 24h</div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={timeline}>
              <defs>
                {[{ id: 'jG', c: '#f59e0b' }, { id: 'nG', c: '#60a5fa' }, { id: 'cG', c: '#a855f7' }, { id: 'conG', c: '#ef4444' }].map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.c} stopOpacity=".3" />
                    <stop offset="95%" stopColor={g.c} stopOpacity="0" />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" tick={{ fontSize: 9 }} interval={3} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip content={<QTip />} />
              <Area type="monotone" dataKey="joy" stroke="#f59e0b" fill="url(#jG)" strokeWidth={1.5} dot={false} name="joy" />
              <Area type="monotone" dataKey="neutral" stroke="#60a5fa" fill="url(#nG)" strokeWidth={1.5} dot={false} name="neutral" />
              <Area type="monotone" dataKey="curiosity" stroke="#a855f7" fill="url(#cG)" strokeWidth={1.5} dot={false} name="curiosity" />
              <Area type="monotone" dataKey="concern" stroke="#ef4444" fill="url(#conG)" strokeWidth={1} dot={false} name="concern" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#a855f7', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Current Distribution</div>
            <ResponsiveContainer width="100%" height={175}>
              <BarChart data={current} barSize={34}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="e" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 50]} tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="v" radius={[4, 4, 0, 0]} name="value">
                  {current.map((e, i) => <Cell key={i} fill={e.col} opacity={0.82} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#06b6d4', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>EI Index Metrics</div>
            {eiMetrics.map(m => (
              <div key={m.l} style={{ marginBottom: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.71rem', marginBottom: '4px' }}>
                  <span style={{ color: 'rgba(148,163,184,.58)' }}>{m.l}</span>
                  <span style={{ color: m.col, fontFamily: 'Orbitron,monospace' }}>{m.v}</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,.05)', borderRadius: '999px' }}>
                  <div style={{ width: `${m.v}%`, height: '100%', background: m.col, borderRadius: '999px', opacity: .82 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
