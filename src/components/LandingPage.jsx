import { useState } from 'react'
import ParticleBackground from './ParticleBackground'
import QSCILogo from './QSCILogo'

export default function LandingPage({ onEnter }) {
  const [entering, setEntering] = useState(false)

  const handleEnter = () => {
    if (entering) return
    setEntering(true)
    setTimeout(onEnter, 1300)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #04070d 0%, #0a0e1a 55%, #07091a 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <ParticleBackground converge={entering} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.55, zIndex: 1 }} />

      {/* Corner decorations */}
      {[['top:20px;left:20px', 'M0 60 L0 0 L60 0'], ['bottom:20px;right:20px', 'M60 0 L60 60 L0 60']].map(([pos, path], i) => (
        <div key={i} style={{ position: 'absolute', zIndex: 2, ...(Object.fromEntries(pos.split(';').map(p => p.split(':')))) }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d={path} stroke="rgba(96,165,250,0.22)" strokeWidth="1" fill="none" />
          </svg>
        </div>
      ))}

      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '28px',
        textAlign: 'center', padding: '40px 24px',
        animation: 'fadeInUp 0.8s ease forwards',
      }}>
        <div style={{
          fontFamily: 'Orbitron, monospace', fontSize: '0.62rem',
          letterSpacing: '0.35em', color: 'rgba(96,165,250,0.45)',
          textTransform: 'uppercase', marginBottom: '-14px',
        }}>
          Or4cl3 AI Solutions
        </div>

        <div className="logo-float">
          <QSCILogo
            size={164}
            spinClass={entering ? 'logo-spin-fast' : 'logo-spin-slow'}
            pulse={!entering}
          />
        </div>

        <div>
          <h1 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 900, margin: 0, lineHeight: 1.1,
            background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Unlock the Future
          </h1>
          <h1 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 900, margin: '4px 0 0', lineHeight: 1.1,
            color: 'rgba(226,232,240,0.88)',
            textShadow: '0 0 40px rgba(96,165,250,0.28)',
          }}>
            of Intelligence
          </h1>
        </div>

        <p style={{
          maxWidth: '480px', color: 'rgba(148,163,184,0.75)',
          lineHeight: 1.75, margin: 0, fontSize: '0.92rem',
        }}>
          Quantum-inspired cognition with ethical oversight, adaptive learning,
          emotional intelligence, and temporal reasoning — all unified.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Ethical', 'Powerful', 'Intelligent'].map(tag => (
            <span key={tag} style={{
              padding: '4px 16px',
              border: '1px solid rgba(96,165,250,0.28)',
              borderRadius: '999px', fontSize: '0.72rem',
              fontFamily: 'Orbitron, monospace',
              color: 'rgba(96,165,250,0.65)',
              letterSpacing: '0.1em',
            }}>{tag}</span>
          ))}
        </div>

        <button onClick={handleEnter} disabled={entering} className="btn-quantum" style={{ marginTop: '6px' }}>
          {entering ? '► Initializing...' : '► Enter the Quantum Realm'}
        </button>

        <div style={{
          fontFamily: 'Orbitron, monospace', fontSize: '0.58rem',
          color: 'rgba(96,165,250,0.28)', letterSpacing: '0.2em',
        }}>
          QSCI v2.1 — Quantum Intelligence Hub
        </div>
      </div>
    </div>
  )
}
