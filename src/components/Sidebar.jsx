import QSCILogo from './QSCILogo'

const NAV = [
  { id: 'dashboard', icon: '⬡', label: 'Dashboard' },
  { id: 'qcc', icon: '◈', label: 'Quantum Core' },
  { id: 'alci', icon: '◎', label: 'Adaptive Learning' },
  { id: 'eom', icon: '◉', label: 'Ethics Oversight' },
  { id: 'nqam', icon: '◇', label: 'NeuroQuantum Affect.' },
  { id: 'qtse', icon: '◆', label: 'Temporal Engine' },
  { id: 'chat', icon: '▷', label: 'AI Assistant' },
]

export default function Sidebar({ navigate, active }) {
  return (
    <div className="sidebar" style={{
      width: '216px', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, position: 'sticky', top: 0, height: '100vh',
    }}>
      <div style={{
        padding: '18px 14px',
        borderBottom: '1px solid rgba(96,165,250,0.09)',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <QSCILogo size={34} spinClass="logo-spin-slow" pulse={false} showText={false} />
        <div>
          <div style={{
            fontFamily: 'Orbitron, monospace', fontSize: '0.74rem',
            fontWeight: 700, color: '#60a5fa', letterSpacing: '0.1em',
          }}>QSCI</div>
          <div style={{
            fontSize: '0.58rem', color: 'rgba(96,165,250,0.38)',
            fontFamily: 'Orbitron, monospace',
          }}>Or4cl3 AI v2.1</div>
        </div>
      </div>

      <div style={{
        padding: '8px 14px',
        borderBottom: '1px solid rgba(96,165,250,0.07)',
        display: 'flex', alignItems: 'center', gap: '7px',
        fontSize: '0.68rem', color: 'rgba(148,163,184,0.55)',
      }}>
        <div className="status-active" />
        <span>Systems Online</span>
      </div>

      <nav style={{ padding: '8px 0', flex: 1 }}>
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`sidebar-item${active === item.id ? ' active' : ''}`}
          >
            <span style={{ fontSize: '0.95rem', opacity: 0.75, flexShrink: 0 }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid rgba(96,165,250,0.07)',
        fontSize: '0.62rem',
        color: 'rgba(96,165,250,0.3)',
        fontFamily: 'Orbitron, monospace',
        letterSpacing: '0.05em',
      }}>
        <div>Ethics Score: <span style={{ color: 'rgba(16,185,129,0.65)' }}>94.7%</span></div>
        <div style={{ marginTop: '3px' }}>Uptime: <span style={{ color: 'rgba(96,165,250,0.6)' }}>99.97%</span></div>
      </div>
    </div>
  )
}
