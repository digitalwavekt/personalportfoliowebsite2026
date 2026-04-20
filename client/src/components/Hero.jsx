import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Github, Linkedin, Twitter, Instagram, ChevronDown } from 'lucide-react'

const SOCIAL = [
  { icon: Github,    href: 'https://github.com/yourusername',    label: 'GitHub'    },
  { icon: Linkedin,  href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter,   href: 'https://twitter.com/yourusername',   label: 'Twitter'   },
  { icon: Instagram, href: 'https://instagram.com/yourusername', label: 'Instagram' },
]

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
    camera.position.z = 4

    // Neural network nodes
    const nodeCount = 80
    const nodes = []
    const nodeGeo = new THREE.SphereGeometry(0.025, 8, 8)
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xFF6B2B })
    const dimMat  = new THREE.MeshBasicMaterial({ color: 0x1A2040 })

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, Math.random() > 0.3 ? dimMat : nodeMat)
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      )
      mesh.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.001
      )
      scene.add(mesh)
      nodes.push(mesh)
    }

    // Connections
    const lineMat = new THREE.LineBasicMaterial({ color: 0x1A2040, transparent: true, opacity: 0.4 })
    const accentLineMat = new THREE.LineBasicMaterial({ color: 0xFF6B2B, transparent: true, opacity: 0.15 })
    const lines = []

    const updateLines = () => {
      lines.forEach(l => scene.remove(l))
      lines.length = 0
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position)
          if (dist < 1.8) {
            const geo = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position])
            const mat = dist < 1.0 ? accentLineMat : lineMat
            const line = new THREE.Line(geo, mat)
            scene.add(line)
            lines.push(line)
          }
        }
      }
    }

    // Mouse parallax
    let mx = 0, my = 0
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.5
      my = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', onMouse)

    // Resize
    const onResize = () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }
    window.addEventListener('resize', onResize)

    let frame = 0
    const animate = () => {
      const id = requestAnimationFrame(animate)
      frame++

      nodes.forEach(n => {
        n.position.add(n.userData.velocity)
        if (Math.abs(n.position.x) > 4) n.userData.velocity.x *= -1
        if (Math.abs(n.position.y) > 3) n.userData.velocity.y *= -1
        if (Math.abs(n.position.z) > 2) n.userData.velocity.z *= -1
      })

      if (frame % 3 === 0) updateLines()

      camera.position.x += (mx - camera.position.x) * 0.05
      camera.position.y += (-my - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <section id="home" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* 3D canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 0,
      }} />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(255,107,43,0.04) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, zIndex: 1,
        background: 'linear-gradient(to top, var(--bg), transparent)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120, zIndex: 1,
        background: 'linear-gradient(to bottom, var(--bg), transparent)',
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 120 }}>
        <div style={{ maxWidth: 760 }}>

          {/* Available badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', marginBottom: 32,
            background: 'rgba(255,107,43,0.08)',
            border: '1px solid rgba(255,107,43,0.2)',
            borderRadius: 2,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#22D36F',
              boxShadow: '0 0 8px #22D36F',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{ fontFamily: 'var(--font-m)', fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent2)' }}>
              AVAILABLE FOR PROJECTS
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontFamily: 'var(--font-d)',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            marginBottom: 8,
          }}>
            I Build Systems
          </h1>
          <h1 style={{
            fontFamily: 'var(--font-d)',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 600,
            fontStyle: 'italic',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            marginBottom: 32,
            color: 'var(--accent)',
          }}>
            That Think.
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: 15,
            color: 'var(--muted)',
            maxWidth: 500,
            lineHeight: 1.8,
            marginBottom: 48,
            fontFamily: 'var(--font-m)',
          }}>
            Agentic software & app developer. I craft autonomous systems,
            intelligent mobile apps, and full-stack platforms that operate
            beyond simple automation.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >View My Work</button>
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >Let's Talk</button>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-m)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              Find me on
            </span>
            <div style={{ width: 30, height: 1, background: 'var(--border)' }} />
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label} href={href} target="_blank" rel="noopener noreferrer"
                title={label}
                style={{
                  width: 38, height: 38, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', border: '1px solid var(--border)',
                  borderRadius: 4, color: 'var(--muted)', transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--accent)'
                  e.currentTarget.style.boxShadow = 'var(--glow)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--muted)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'float 2s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: 'var(--font-m)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--muted)' }}>SCROLL</span>
        <ChevronDown size={16} color="var(--muted)" />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes float { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-6px)} }
      `}</style>
    </section>
  )
}
