import { useEffect, useRef } from 'react'

export default function ParticleBackground({ converge = false }) {
  const ref = useRef(null)
  const state = useRef({ converge, anim: null })

  useEffect(() => { state.current.converge = converge }, [converge])

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let particles = []

    const init = () => {
      c.width = window.innerWidth
      c.height = window.innerHeight
      particles = Array.from({ length: 75 }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.3,
        a: Math.random() * 0.45 + 0.1,
        col: ['#60a5fa', '#a855f7', '#06b6d4', '#60a5fa', '#60a5fa'][Math.floor(Math.random() * 5)],
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      const cx = c.width / 2, cy = c.height / 2

      particles.forEach(p => {
        if (state.current.converge) {
          p.vx += (cx - p.x) * 0.0012
          p.vy += (cy - p.y) * 0.0012
          p.vx *= 0.97; p.vy *= 0.97
        }
        p.x += p.vx; p.y += p.vy
        if (!state.current.converge) {
          if (p.x < 0) p.vx = Math.abs(p.vx)
          if (p.x > c.width) p.vx = -Math.abs(p.vx)
          if (p.y < 0) p.vy = Math.abs(p.vy)
          if (p.y > c.height) p.vy = -Math.abs(p.vy)
        }
        ctx.save()
        ctx.globalAlpha = p.a
        ctx.fillStyle = p.col
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          const max = state.current.converge ? 190 : 125
          if (d < max) {
            ctx.save()
            ctx.globalAlpha = 0.13 * (1 - d / max)
            ctx.strokeStyle = '#60a5fa'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      state.current.anim = requestAnimationFrame(draw)
    }

    init(); draw()
    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(state.current.anim)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas ref={ref} style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, opacity: 0.72,
    }} />
  )
}
