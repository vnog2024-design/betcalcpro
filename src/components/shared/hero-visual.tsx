'use client'

import { useThemeColors } from '@/hooks/use-theme-colors'
import { useEffect, useRef, useState } from 'react'

/** Floating geometric shapes — dice, diamonds, circles */
function FloatingShapes({ neon, neonBlue }: { neon: string; neonBlue: string }) {
  return (
    <svg
      viewBox="0 0 500 400"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Animated chart line going up */}
      <polyline
        points="0,350 60,320 120,300 180,250 240,260 300,180 360,150 420,100 500,60"
        fill="none"
        stroke={neon}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
        className="hero-chart-line"
      />
      {/* Chart area fill */}
      <polygon
        points="0,350 60,320 120,300 180,250 240,260 300,180 360,150 420,100 500,60 500,400 0,400"
        fill={neon}
        opacity="0.04"
      />

      {/* Second chart line (blue) */}
      <polyline
        points="0,380 80,360 160,340 240,310 320,290 400,250 500,220"
        fill="none"
        stroke={neonBlue}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
        className="hero-chart-line-2"
      />

      {/* Glowing node dots on chart */}
      <circle cx="180" cy="250" r="3" fill={neon} opacity="0.8" className="hero-node-pulse" />
      <circle cx="300" cy="180" r="3" fill={neon} opacity="0.8" className="hero-node-pulse hero-node-delay-1" />
      <circle cx="420" cy="100" r="4" fill={neon} opacity="0.9" className="hero-node-pulse hero-node-delay-2" />
      <circle cx="240" cy="310" r="2.5" fill={neonBlue} opacity="0.7" className="hero-node-pulse hero-node-delay-3" />

      {/* Floating diamond shape */}
      <g className="hero-float-diamond">
        <polygon
          points="380,50 400,30 420,50 400,70"
          fill="none"
          stroke={neon}
          strokeWidth="1.5"
          opacity="0.4"
        />
      </g>

      {/* Floating hexagon */}
      <g className="hero-float-hexagon">
        <polygon
          points="100,80 120,68 140,80 140,104 120,116 100,104"
          fill="none"
          stroke={neonBlue}
          strokeWidth="1.5"
          opacity="0.35"
        />
      </g>

      {/* Dice shape */}
      <g className="hero-float-dice">
        <rect x="430" y="200" width="40" height="40" rx="6" fill="none" stroke={neon} strokeWidth="1.5" opacity="0.3" transform="rotate(15 450 220)" />
        <circle cx="443" cy="213" r="2.5" fill={neon} opacity="0.5" />
        <circle cx="457" cy="213" r="2.5" fill={neon} opacity="0.5" />
        <circle cx="443" cy="227" r="2.5" fill={neon} opacity="0.5" />
        <circle cx="457" cy="227" r="2.5" fill={neon} opacity="0.5" />
      </g>

      {/* Coin shape */}
      <g className="hero-float-coin">
        <circle cx="60" cy="200" r="18" fill="none" stroke={neonBlue} strokeWidth="1.5" opacity="0.3" />
        <text x="60" y="205" textAnchor="middle" fontSize="14" fill={neonBlue} opacity="0.4">$</text>
      </g>

      {/* Connecting lines (network) */}
      <line x1="180" y1="250" x2="300" y2="180" stroke={neon} strokeWidth="0.5" opacity="0.15" className="hero-connection-line" />
      <line x1="300" y1="180" x2="420" y2="100" stroke={neon} strokeWidth="0.5" opacity="0.15" className="hero-connection-line hero-conn-delay-1" />

      {/* Small cross marks */}
      <g className="hero-float-cross" opacity="0.3">
        <line x1="340" y1="280" x2="350" y2="290" stroke={neon} strokeWidth="1.5" />
        <line x1="350" y1="280" x2="340" y2="290" stroke={neon} strokeWidth="1.5" />
      </g>

      {/* Triangle */}
      <g className="hero-float-triangle">
        <polygon
          points="460,320 475,295 490,320"
          fill="none"
          stroke={neonBlue}
          strokeWidth="1.5"
          opacity="0.3"
        />
      </g>

      {/* Percentage circle */}
      <g className="hero-float-percent">
        <circle cx="200" cy="140" r="15" fill="none" stroke={neon} strokeWidth="1.5" opacity="0.25" />
        <circle cx="200" cy="140" r="15" fill="none" stroke={neon} strokeWidth="3" opacity="0.5" 
          strokeDasharray="70 100" strokeLinecap="round" className="hero-percent-ring" />
        <text x="200" y="144" textAnchor="middle" fontSize="9" fill={neon} opacity="0.5" fontWeight="bold">%</text>
      </g>
    </svg>
  )
}

/** Particle canvas for subtle floating dots */
function ParticleField({ neon }: { neon: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isDark } = useThemeColors()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    // Parse hex to RGB
    const hexToRgb = (hex: string) => {
      const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 0, g: 255, b: 136 }
    }

    // Create particles
    const count = 40
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      const rgb = hexToRgb(neon)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.offsetWidth
        if (p.x > canvas.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas.offsetHeight
        if (p.y > canvas.offsetHeight) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.alpha})`
        ctx.fill()
      })

      // Draw faint connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.08
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [neon])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isDark ? 0.7 : 0.4 }}
      aria-hidden="true"
    />
  )
}

/** Morphing glow blob that follows theme */
function GlowBlob({ neon, neonBlue }: { neon: string; neonBlue: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full hero-morph-blob-1"
        style={{
          background: `radial-gradient(circle, ${neon}15 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full hero-morph-blob-2"
        style={{
          background: `radial-gradient(circle, ${neonBlue}12 0%, transparent 70%)`,
        }}
      />
      {/* Central bright glow behind text */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full hero-morph-blob-3"
        style={{
          background: `radial-gradient(circle, ${neon}10 0%, transparent 60%)`,
        }}
      />
    </div>
  )
}

/** Animated scan line effect */
function ScanLines({ neon }: { neon: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-[1px] hero-scan-line"
        style={{
          background: `linear-gradient(90deg, transparent, ${neon}40, transparent)`,
        }}
      />
    </div>
  )
}

/** Main hero visual component */
export function HeroVisual() {
  const { neon, neonBlue, isDark } = useThemeColors()

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      {/* Base gradient */}
      <div
        className="absolute inset-0 hero-base-gradient"
        style={{
          background: isDark
            ? `linear-gradient(135deg, #0a0e17 0%, ${neon}08 30%, #0a0e17 60%, ${neonBlue}06 100%)`
            : `linear-gradient(135deg, #f8fafc 0%, ${neon}08 30%, #f8fafc 60%, ${neonBlue}06 100%)`,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Morphing glow blobs */}
      <GlowBlob neon={neon} neonBlue={neonBlue} />

      {/* Particle field */}
      <ParticleField neon={neon} />

      {/* SVG floating shapes */}
      <FloatingShapes neon={neon} neonBlue={neonBlue} />

      {/* Scan line */}
      <ScanLines neon={neon} />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 40%, rgba(10,14,23,0.6) 100%)'
            : 'radial-gradient(ellipse at center, transparent 40%, rgba(248,250,252,0.4) 100%)',
        }}
      />

      {/* Border glow effect */}
      <div
        className="absolute inset-0 rounded-2xl hero-border-glow"
        style={{
          boxShadow: `inset 0 0 60px ${neon}08, inset 0 0 120px ${neonBlue}05`,
        }}
      />
    </div>
  )
}
