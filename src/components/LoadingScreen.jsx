import { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import QSCILogo from './QSCILogo'

const MESSAGES = [
  'Initializing Quantum Cognitive Core...',
  'Loading Adaptive Learning Networks...',
  'Calibrating Ethical Oversight Module...',
  'Synchronizing NeuroQuantum Matrices...',
  'Activating Temporal-Symbolic Engine...',
  'Establishing Quantum Entanglement Channels...',
  'QSCI Hub Online.',
]

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const duration = 3600
    const interval = 38
    const step = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress(p => {
        const next = Math.min(100, p + step + Math.random() * 0.4)
        setMsgIdx(Math.min(
          Math.floor((next / 100) * (MESSAGES.length - 1)),
          MESSAGES.length - 1
        ))
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #04070d 0%, #0a0e1a 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <ParticleBackground />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, zIndex: 1 }} />

      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '30px',
        textAlign: 'center', padding: '40px',
        animation: 'fadeIn 0.5s ease forwards',
      }}>
        <QSCILogo size={144} spinClass="logo-spin-fast" pulse={false} />

        <div>
          <div style={{
            fontFamily: 'Orbitron, monospace', fontSize: '0.64rem',
            letterSpacing: '0.22em', color: 'rgba(96,165,250,0.45)',
            textTransform: 'uppercase', marginBottom: '10px',
          }}>
            Or4cl3 AI Solutions — QSCI v2.1
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.88rem', color: 'rgba(96,165,250,0.82)',
            minHeight: '22px',
          }}>
            {MESSAGES[msgIdx]}
            <span style={{ animation: 'blink 0.8s step-end infinite', color: '#60a5fa' }}>|</span>
          </div>
        </div>

        <div style={{ width: '320px', maxWidth: '88vw' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: '8px',
            fontFamily: 'Orbitron, monospace',
            fontSize: '0.62rem', color: 'rgba(96,165,250,0.45)',
          }}>
            <span>LOADING</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="progress-track" style={{ height: '4px' }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '320px', maxWidth: '88vw' }}>
          {MESSAGES.slice(0, -1).map((msg, i) => {
            const done = progress > (i / (MESSAGES.length - 2)) * 100
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace',
                color: done ? 'rgba(16,185,129,0.7)' : 'rgba(96,165,250,0.28)',
                transition: 'color 0.3s ease',
              }}>
                <span>{done ? '✓' : '○'}</span>
                <span>{msg.replace('...', '')}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
