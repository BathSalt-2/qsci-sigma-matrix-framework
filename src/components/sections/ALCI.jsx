import { useState } from 'react'
import {
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import Sidebar from '../Sidebar'

const trainData = Array.from({ length: 20 }, (_, i) => ({
  ep: `E${(i + 1) * 50}`,
  accuracy: Math.min(99.2, 54 + i * 2.4 + Math.random() * 1.4),
  val: Math.min(98, 51 + i * 2.2 + Math.random() * 1.8),
  loss: Math.max(0.004, 0.96 - i * 0.047 + Math.random() * 0.015),
}))

const domains = [
  { name: 'Quantum Physics', v: 91 }, { name: 'Mathematics', v: 96 },
  { name: 'Neuroscience', v: 87 }, { name: 'Ethics & Governance', v: 94 },
  { name: 'Philosophy', v: 89 }, { name: 'Computer Science', v: 98 },
  { name: 'Temporal Reasoning', v: 85 }, { name: 'Linguistics', v: 92 },
]

const ragLog = [
  { q: 'Quantum entanglement principles', docs: 12, rel: 94, ms: 340 },
  { q: 'Ethical AI governance frameworks', docs: 18, rel: 97, ms: 280 },
  { q: 'Temporal pattern recognition methods', docs: 9, rel: 91, ms: 410 },
  { q: 'Adaptive learning algorithms overview', docs: 15, rel: 96, ms: 310 },
  { q: 'Consciousness theories in AI systems', docs: 11, rel: 88, ms: 370 },
]

const QTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(13,17,23,.96)', border: '1px solid rgba(168,85,247,.28)', borderRadius: '8px', padding: '9px 13px', fontSize: '.76rem', color: '#94a3b8' }}>
      <div style={{ color: '#a855f7', marginBottom: '3px', fontFamily: 'Orbitron,monospace', fontSize: '.6rem' }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}</div>)}
    </div>
  )
}

export default function ALCI({ navigate }) {
  const [ragInput, setRagInput] = useState('')
  const [ragResult, setRagResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const runRAG = () => {
    if (!ragInput.trim() || loading) return
    setLoading(true)
    setRagResult(null)
    setTimeout(() => {
      const docs = Math.floor(Math.random() * 10 + 8)
      const rel = Math.floor(Math.random() * 8 + 89)
      setRagResult({
        query: ragInput,
        docs, rel,
        response: `Based on ${docs} retrieved knowledge fragments (${rel}% relevance): The query "${ragInput}" maps to QSCI's knowledge graph across quantum cognition, ethical AI, and symbolic reasoning domains. The RAG pipeline retrieves, ranks, and synthesizes the most contextually relevant information, ensuring grounded and transparent responses with full source attribution.`,
        sources: ['QCC Knowledge Base v2.1', 'Or4cl3 Semantic Index', 'ALCI Adaptive Archive'],
      })
      setLoading(false)
    }, 700)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
      <Sidebar navigate={navigate} active="alci" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '26px' }}>

        <div style={{ marginBottom: '22px' }}>
          <button onClick={() => navigate('dashboard')} className="btn-ghost" style={{ marginBottom: '12px' }}>← Dashboard</button>
          <h1 style={{ margin: 0, fontFamily: 'Orbitron,monospace', fontSize: '1.28rem', color: '#a855f7', textShadow: '0 0 20px rgba(168,85,247,.4)' }}>Adaptive Learning & Cognitive Interface</h1>
          <p style={{ margin: '7px 0 0', color: 'rgba(148,163,184,.6)', fontSize: '.84rem' }}>Visualize QSCI learning evolution, knowledge acquisition, and interactive RAG pipeline demonstration.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '18px' }}>
          {[{ l: 'Model Accuracy', v: '97.8%', c: '#a855f7' }, { l: 'Knowledge Domains', v: '847', c: '#60a5fa' }, { l: 'Training Epochs', v: '1,000', c: '#06b6d4' }, { l: 'RAG Recall', v: '96.2%', c: '#10b981' }].map(k => (
            <div key={k.l} className="quantum-card" style={{ padding: '15px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.45rem', fontFamily: 'Orbitron,monospace', fontWeight: 700, color: k.c }}>{k.v}</div>
              <div style={{ fontSize: '.65rem', color: 'rgba(148,163,184,.45)', marginTop: '4px', fontFamily: 'Orbitron,monospace', textTransform: 'uppercase', letterSpacing: '.08em' }}>{k.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '18px' }}>
          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#a855f7', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Training Accuracy vs Validation</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trainData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ep" tick={{ fontSize: 9 }} interval={3} />
                <YAxis tick={{ fontSize: 9 }} domain={[48, 100]} />
                <Tooltip content={<QTip />} />
                <Line type="monotone" dataKey="accuracy" stroke="#a855f7" strokeWidth={2} dot={false} name="accuracy" />
                <Line type="monotone" dataKey="val" stroke="#60a5fa" strokeWidth={1.5} dot={false} strokeDasharray="5 3" name="validation" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="quantum-card" style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#06b6d4', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Knowledge Mastery</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {domains.map(d => (
                <div key={d.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.7rem', color: 'rgba(148,163,184,.55)', marginBottom: '3px' }}>
                    <span>{d.name}</span><span style={{ color: '#a855f7' }}>{d.v}%</span>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(168,85,247,.1)', borderRadius: '999px' }}>
                    <div style={{ width: `${d.v}%`, height: '100%', background: 'linear-gradient(90deg,#a855f7,#60a5fa)', borderRadius: '999px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="quantum-card" style={{ padding: '18px', marginBottom: '18px', border: '1px solid rgba(16,185,129,.14)' }}>
          <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#10b981', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>RAG Pipeline — Interactive Demo</div>
          <div style={{ display: 'flex', gap: '9px', marginBottom: '14px' }}>
            <input value={ragInput} onChange={e => setRagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && runRAG()}
              placeholder="Enter a query to trigger RAG retrieval..."
              style={{ flex: 1, background: 'rgba(16,185,129,.05)', border: '1px solid rgba(16,185,129,.18)', borderRadius: '7px', padding: '9px 14px', color: '#e2e8f0', fontSize: '.84rem', outline: 'none', fontFamily: 'inherit' }} />
            <button onClick={runRAG} disabled={!ragInput.trim() || loading} className="btn-ghost" style={{ color: '#10b981', borderColor: 'rgba(16,185,129,.35)', whiteSpace: 'nowrap' }}>
              {loading ? '...' : '► Retrieve'}
            </button>
          </div>
          {ragResult && (
            <div style={{ background: 'rgba(16,185,129,.04)', border: '1px solid rgba(16,185,129,.18)', borderRadius: '8px', padding: '14px', animation: 'fadeInUp .3s ease' }}>
              <div style={{ display: 'flex', gap: '14px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '.73rem', color: 'rgba(148,163,184,.55)' }}>Retrieved: <strong style={{ color: '#10b981' }}>{ragResult.docs} fragments</strong></span>
                <span style={{ fontSize: '.73rem', color: 'rgba(148,163,184,.55)' }}>Relevance: <strong style={{ color: '#10b981' }}>{ragResult.rel}%</strong></span>
              </div>
              <p style={{ margin: '0 0 10px', fontSize: '.82rem', color: '#e2e8f0', lineHeight: 1.65 }}>{ragResult.response}</p>
              <div style={{ fontSize: '.68rem', color: 'rgba(148,163,184,.38)' }}>Sources: {ragResult.sources.join(' · ')}</div>
            </div>
          )}
        </div>

        <div className="quantum-card" style={{ padding: '18px' }}>
          <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '.72rem', color: '#60a5fa', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Recent Query Performance</div>
          {ragLog.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 10px', background: 'rgba(96,165,250,.03)', borderRadius: '6px', marginBottom: '6px', fontSize: '.77rem' }}>
              <span style={{ flex: 1, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.q}</span>
              <span style={{ color: 'rgba(96,165,250,.55)', whiteSpace: 'nowrap', fontSize: '.68rem' }}>{r.docs} docs</span>
              <span style={{ color: '#10b981', whiteSpace: 'nowrap', fontSize: '.68rem' }}>{r.rel}%</span>
              <span style={{ color: 'rgba(168,85,247,.55)', whiteSpace: 'nowrap', fontSize: '.65rem', fontFamily: 'Orbitron,monospace' }}>{r.ms}ms</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
