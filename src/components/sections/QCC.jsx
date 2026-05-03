import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts'
import Sidebar from '../Sidebar'

const procData = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  load: Math.floor(50 + Math.sin(i * 0.5) * 20 + Math.random() * 7),
  throughput: Math.floor(64 + Math.cos(i * 0.35) * 14 + Math.random() * 6),
  latency: Math.floor(12 + Math.sin(i * 0.55) * 4 + Math.random() * 2),
}))

const radarData = [
  { s: 'Speed', v: 92 }, { s: 'Accuracy', v: 97 }, { s: 'Stability', v: 99 },
  { s: 'Efficiency', v: 88 }, { s: 'Throughput', v: 85 }, { s: 'Resilience', v: 94 },
]

const nodes = [
  { id: 'QN-01', active: 87, load: 71, status: 'nominal' },
  { id: 'QN-02', active: 76, load: 58, status: 'nominal' },
  { id: 'QN-03', active: 82, load: 66, status: 'nominal' },
  { id: 'QN-04', active: 91, load: 80, status: 'high' },
  { id: 'QN-05', active: 71, load: 52, status: 'nominal' },
  { id: 'QN-06', active: 84, load: 68, status: 'nominal' },
]

const QTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(13,17,23,.96)', border: '1px solid rgba(96,165,250,.28)', borderRadius: '8px', padding: '9px 13px', fontSize: '.76rem', color: '#94a3b8' }}>
      <div style={{ color: '#60a5fa', marginBottom: '3px', fontFamily: 'Orbitron,monospace', fontSize: '.6rem' }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</div>)}
    </div>
  )
}

export default function QCC({ navigate }) {
  const [active, setActive] = useState(null)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
      <Sidebar navigate={navigate} active="qcc" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '26px' }}>

        <div style={{ marginBottom: '22px' }}>
          <button onClick={() => navigate('dashboard')} className="btn-ghost" style={{ marginBottom: '12px' }}>← Dashboard</button>
          <h1 style={{ margin: 0, fontFamily: 'Orbitron,monospace', fontSize: '1.28rem', color: '#60a5fa', textShadow: '0 0 20px rgba(96,165,250,.4)' }}>Quantum Cognitive Core</h1>
          <p style={{ margin: '7px 0 0', color: 'rgba(148,163,184,.6)', fontSize: '.84rem' }}>Real-time QCC architecture visualization — processing nodes, data flows, and performance metrics.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '18px' }}>
          {[{ l: 'Active Nodes', v: '6/6', c: '#10b981' }, { l: 'Avg Load', v: '73.4%', c: '#60a5fa' }, { l: 'Throughput', v: '4.2 PB/s', c: '#a855f7' }, { l: 'Avg Latency', v: '14 ms', c: '#06b6d4' }].map(k => (
            <div key={k.l} className="quantum-card" style={{ padding: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.45rem', fontFamily: 'Orbitron,monospace', fontWeight: 700, color: k.c }}>{k.v}</div>
              <div style={{ fontSize: '.65rem', color: 'rgba(148,163,184,.45)', marginTop: '4px', fontFamily: 'Orbitron,monospace', textTransform: 'uppercase', letterSpacing: '.08em' }}>{k.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '18px' }}>
          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#60a5fa', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Processing Load & Throughput — 24h</div>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={procData}>
                <defs>
                  <linearGradient id="qBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#60a5fa" stopOpacity=".25" /><stop offset="95%" stopColor="#60a5fa" stopOpacity="0" /></linearGradient>
                  <linearGradient id="qPurple" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity=".2" /><stop offset="95%" stopColor="#a855f7" stopOpacity="0" /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" tick={{ fontSize: 9 }} interval={3} />
                <YAxis tick={{ fontSize: 9 }} domain={[30, 100]} />
                <Tooltip content={<QTip />} />
                <Area type="monotone" dataKey="load" stroke="#60a5fa" fill="url(#qBlue)" strokeWidth={1.5} dot={false} name="load" />
                <Area type="monotone" dataKey="throughput" stroke="#a855f7" fill="url(#qPurple)" strokeWidth={1.5} dot={false} name="throughput" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#06b6d4', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Performance Radar</div>
            <ResponsiveContainer width="100%" height={210}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(96,165,250,.18)" />
                <PolarAngleAxis dataKey="s" tick={{ fill: 'rgba(148,163,184,.6)', fontSize: 10 }} />
                <Radar dataKey="v" stroke="#06b6d4" fill="rgba(6,182,212,.14)" strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="quantum-card" style={{ padding: '18px' }}>
          <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#a855f7', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Quantum Node Status</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
            {nodes.map(n => (
              <div key={n.id} onClick={() => setActive(active === n.id ? null : n.id)}
                style={{ padding: '13px', background: active === n.id ? 'rgba(96,165,250,.09)' : 'rgba(96,165,250,.03)', border: `1px solid ${active === n.id ? 'rgba(96,165,250,.38)' : 'rgba(96,165,250,.09)'}`, borderRadius: '8px', cursor: 'pointer', transition: 'all .2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '7px' }}>
                  <div className={n.status === 'high' ? 'status-warning' : 'status-active'} />
                  <span style={{ fontFamily: 'Orbitron,monospace', fontSize: '.78rem', color: '#60a5fa' }}>{n.id}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(96,165,250,.09)', borderRadius: '999px', overflow: 'hidden', marginBottom: '5px' }}>
                  <div style={{ width: `${n.active}%`, height: '100%', background: n.status === 'high' ? '#f59e0b' : '#60a5fa', borderRadius: '999px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.68rem', color: 'rgba(148,163,184,.45)' }}>
                  <span>Active: {n.active}%</span>
                  <span>Load: {n.load}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
