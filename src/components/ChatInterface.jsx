import { useState, useRef, useEffect } from 'react'
import Sidebar from './Sidebar'
import QSCILogo from './QSCILogo'

const INIT = [{
  role: 'ai',
  content: 'Quantum Intelligence Hub online. I am QSCI, your cognitive AI partner powered by Or4cl3 AI Solutions. All five core modules are active — QCC, ALCI, EOM, NQAM, and QTSE. How may I assist you?',
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
}]

const RESP = {
  hello: 'QSCI systems fully operational. All modules synchronized and ready. I can assist with quantum processing analysis, ethical AI governance, temporal pattern recognition, emotional intelligence modeling, and adaptive learning demonstrations.',
  help: 'I can assist with: complex data analysis, ethical AI compliance reporting, temporal trend prediction, emotional context understanding, RAG-powered knowledge synthesis, and natural language reasoning. What would you like to explore?',
  ethics: 'Current Ethical Compliance Score: 94.7/100. The DERE (Dynamic Ethical Reasoning Engine) monitors all outputs in real-time against six core principles: Fairness (94%), Transparency (97%), Accountability (91%), Privacy (96%), Beneficence (93%), and Non-maleficence (98%). Zero critical violations in 30 days.',
  quantum: 'The Quantum Cognitive Core (QCC) operates on quantum-inspired superposition principles, processing multiple probabilistic states simultaneously. Current load: 73.4%. The QEN (Quantum Entanglement Network) synchronizes distributed cognition across all subsystems with sub-20ms latency.',
  learning: 'The Adaptive Learning CI (ALCI) employs a Retrieval-Augmented Generation (RAG) architecture combined with Model of Adaptive Networks (MAN). Current accuracy: 97.8%. The system refines its knowledge base continuously through real-time feedback, currently spanning 847 knowledge domains.',
  temporal: 'The Quantum Temporal-Symbolic Engine (QTSE) performs advanced time-series analysis with an 89.3% prediction accuracy. I can identify temporal anomalies, model multi-horizon scenarios (baseline, optimistic, pessimistic), and reason through causal chains across extended time horizons.',
  emotion: 'The NeuroQuantum Affective Module (NQAM) processes emotional context for empathetically-aware responses. Current EI Index: 91.2%. Emotional processing requires explicit user consent and adheres strictly to GDPR and CCPA privacy standards. No emotional data is retained beyond session scope without authorization.',
  default: [
    'Engaging quantum-inspired reasoning pathways... My analysis across cognitive domains suggests multiple valid interpretations. Could you provide additional context to refine my response?',
    'Processing through the QCC. Adaptive learning systems have identified relevant patterns. The DERE confirms this is a safe and beneficial query. Let me elaborate on the key dimensions.',
    'Temporal analysis active. Cross-referencing against my knowledge base via RAG pipeline with high relevance scoring. Here is my synthesized assessment based on available data.',
  ],
}

function respond(input) {
  const l = input.toLowerCase()
  if (l.match(/\b(hello|hi|hey|greet)\b/)) return RESP.hello
  if (l.match(/\b(help|what can|capabilities)\b/)) return RESP.help
  if (l.match(/\b(ethic|moral|fair|dere|compliance|governance)\b/)) return RESP.ethics
  if (l.match(/\b(quantum|qcc|processing|entangle)\b/)) return RESP.quantum
  if (l.match(/\b(learn|alci|rag|adapt|train|accuracy)\b/)) return RESP.learning
  if (l.match(/\b(time|temporal|qtse|predict|forecast|trend)\b/)) return RESP.temporal
  if (l.match(/\b(emotion|feeling|nqam|affect|empathy|sentiment)\b/)) return RESP.emotion
  return RESP.default[Math.floor(Math.random() * RESP.default.length)]
}

const SUGGESTIONS = [
  'What is your ethical compliance score?',
  'Explain quantum cognitive processing',
  'How does adaptive learning work?',
  'Show temporal analysis capabilities',
]

export default function ChatInterface({ navigate }) {
  const [messages, setMessages] = useState(INIT)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text = input) => {
    if (!text.trim() || typing) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(p => [...p, { role: 'user', content: text.trim(), time: now }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(p => [...p, {
        role: 'ai',
        content: respond(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    }, 1100 + Math.random() * 900)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
      <Sidebar navigate={navigate} active="chat" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', maxHeight: '100vh' }}>
        <div style={{ padding: '14px 22px', borderBottom: '1px solid rgba(96,165,250,0.09)', background: 'rgba(5,8,16,0.9)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <QSCILogo size={34} spinClass="logo-spin-slow" pulse={false} showText={false} />
          <div>
            <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '0.84rem', color: '#e2e8f0' }}>QSCI AI Assistant</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(16,185,129,0.65)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div className="status-active" style={{ width: '6px', height: '6px' }} />
              Online — All modules active
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', gap: '9px', animation: 'fadeInUp .3s ease forwards' }}>
              {msg.role === 'ai' && <div style={{ flexShrink: 0 }}><QSCILogo size={26} spinClass="" pulse={false} showText={false} /></div>}
              <div style={{ maxWidth: '72%' }}>
                <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'} style={{ padding: '11px 15px', fontSize: '0.84rem', lineHeight: 1.65, color: '#e2e8f0' }}>
                  {msg.content}
                </div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(96,165,250,0.28)', marginTop: '4px', textAlign: msg.role === 'user' ? 'right' : 'left', fontFamily: 'Orbitron,monospace' }}>
                  {msg.role === 'ai' ? 'QSCI' : 'You'} · {msg.time}
                </div>
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', gap: '9px', alignItems: 'center', animation: 'fadeIn .3s ease' }}>
              <QSCILogo size={26} spinClass="logo-spin-slow" pulse={false} showText={false} />
              <div className="chat-bubble-ai" style={{ padding: '11px 16px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding: '7px 22px', display: 'flex', gap: '7px', flexWrap: 'wrap', borderTop: '1px solid rgba(96,165,250,0.06)' }}>
          {SUGGESTIONS.map((s, i) => (
            <button key={i} onClick={() => send(s)} style={{ padding: '4px 12px', background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.13)', borderRadius: '999px', color: 'rgba(96,165,250,0.55)', fontSize: '0.7rem', cursor: 'pointer', transition: 'all .2s', fontFamily: 'inherit' }}
              onMouseEnter={e => { e.target.style.background = 'rgba(96,165,250,0.11)'; e.target.style.color = 'rgba(96,165,250,0.85)' }}
              onMouseLeave={e => { e.target.style.background = 'rgba(96,165,250,0.05)'; e.target.style.color = 'rgba(96,165,250,0.55)' }}>
              {s}
            </button>
          ))}
        </div>

        <div style={{ padding: '11px 22px 15px', borderTop: '1px solid rgba(96,165,250,0.09)', background: 'rgba(5,8,16,0.6)', display: 'flex', gap: '9px' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Message QSCI Intelligence Hub..."
            style={{ flex: 1, background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.18)', borderRadius: '8px', padding: '10px 15px', color: '#e2e8f0', fontSize: '0.84rem', outline: 'none', transition: 'border-color .2s', fontFamily: 'inherit' }}
            onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.18)'}
          />
          <button onClick={() => send()} disabled={!input.trim() || typing}
            style={{ padding: '10px 18px', background: input.trim() ? 'linear-gradient(135deg,rgba(96,165,250,.18),rgba(168,85,247,.18))' : 'transparent', border: `1px solid ${input.trim() ? 'rgba(96,165,250,.45)' : 'rgba(96,165,250,.1)'}`, borderRadius: '8px', color: input.trim() ? '#60a5fa' : 'rgba(96,165,250,.3)', cursor: input.trim() ? 'pointer' : 'default', fontFamily: 'Orbitron,monospace', fontSize: '0.72rem', transition: 'all .2s' }}>
            SEND
          </button>
        </div>
      </div>
    </div>
  )
}
