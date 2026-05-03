export default function QSCILogo({ size = 120, spinClass = 'logo-spin-slow', showText = true, pulse = true }) {
  const r = size / 2

  const hex = (scale, offset = -30) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i + offset)
      return `${r + r * scale * Math.cos(a)},${r + r * scale * Math.sin(a)}`
    }).join(' ')

  const uid = `q${size}`

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <div style={{
        position: 'absolute', inset: -size * 0.13,
        border: '1px solid rgba(96,165,250,0.22)',
        borderRadius: '50%',
        animation: 'rotateRing 10s linear infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: -size * 0.06,
        border: '1px dashed rgba(168,85,247,0.22)',
        borderRadius: '50%',
        animation: 'rotateRingRev 16s linear infinite',
        pointerEvents: 'none',
      }} />

      <svg
        width={size} height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`${spinClass}${pulse ? ' logo-pulse' : ''}`}
      >
        <defs>
          <linearGradient id={`grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id={`glow-${uid}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <polygon points={hex(0.85)}
          fill="none" stroke={`url(#grad-${uid})`} strokeWidth="1.5"
          filter={`url(#glow-${uid})`} opacity="0.85" />

        <polygon points={hex(0.5)}
          fill="rgba(96,165,250,0.04)"
          stroke="rgba(168,85,247,0.5)" strokeWidth="1"
          filter={`url(#glow-${uid})`} />

        {[0, 60, 120].map(deg => {
          const a = deg * Math.PI / 180
          return <line key={deg}
            x1={r + r * 0.55 * Math.cos(a)} y1={r + r * 0.55 * Math.sin(a)}
            x2={r - r * 0.55 * Math.cos(a)} y2={r - r * 0.55 * Math.sin(a)}
            stroke="rgba(96,165,250,0.2)" strokeWidth="0.7" />
        })}

        <circle cx={r} cy={r} r={r * 0.17}
          fill="rgba(6,182,212,0.14)"
          stroke="rgba(6,182,212,0.75)" strokeWidth="1"
          filter={`url(#glow-${uid})`} />

        {showText && (
          <text x={r} y={r + size * 0.065} textAnchor="middle"
            fill={`url(#grad-${uid})`}
            fontSize={size * 0.115}
            fontFamily="Orbitron, monospace"
            fontWeight="700" letterSpacing="1.5"
            filter={`url(#glow-${uid})`}>
            QSCI
          </text>
        )}
      </svg>
    </div>
  )
}
