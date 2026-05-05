import { useEffect, useRef } from 'react'

const STATS = [
  { num: '5+',   label: 'Years Experience' },
  { num: '30+',  label: 'Projects Shipped' },
  { num: '10+',  label: 'Happy Clients'    },
  { num: '100%', label: 'Agentic Mindset'  },
]

const STACKS = [
  { name: 'React', color: '#61DAFB' },
  { name: 'React Native', color: '#FF6B2B' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'MongoDB', color: '#4DB33D' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Django', color: '#092E20' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Three.js', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Socket.io', color: '#010101' },
  { name: 'Supabase', color: '#3ECF8E' },
]

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section" ref={ref} style={{ background: 'var(--bg3)', position: 'relative' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div>
            <div className="section-label reveal">About Me</div>
            <h2 className="section-title reveal" style={{ marginBottom: '32px', transitionDelay: '0.1s' }}>
              An engineer who builds<br />
              <em>beyond the brief.</em>
            </h2>

            <p className="reveal" style={{
              color: 'var(--muted)', lineHeight: 1.9, marginBottom: '20px', transitionDelay: '0.2s'
            }}>
              I'm <strong style={{ color: 'var(--text)' }}>KT</strong>, founder of Digital Wave IT Solutions Pvt Ltd.
              I build agentic software systems, mobile apps, and scalable platforms
              that don't just execute tasks — they think, adapt, and deliver.
            </p>
            <p className="reveal" style={{
              color: 'var(--muted)', lineHeight: 1.9, marginBottom: '40px', transitionDelay: '0.3s'
            }}>
              From real-time ride-hailing platforms to AI-assisted workflows,
              my work lives at the intersection of autonomy and user experience.
              Based in Jaipur, India — building for the world.
            </p>

            {/* Stats */}
            <div className="reveal" style={{
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1px',
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius)', // Fixed: Added quotes
              overflow: 'hidden', 
              transitionDelay: '0.4s',
            }}>
              {STATS.map(({ num, label }, i) => (
                <div key={label} style={{
                  padding: '24px 20px',
                  background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg3)',
                  borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-d)', fontSize: '2.5rem',
                    fontWeight: 600, color: 'var(--accent)', lineHeight: 1,
                    marginBottom: '4px',
                  }}>{num}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            {/* Photo placeholder / visual */}
            <div className="reveal" style={{
              width: '100%', 
              aspectRatio: '4/5',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', // Fixed: Added quotes
              marginBottom: '32px',
              position: 'relative', 
              overflow: 'hidden',
              transitionDelay: '0.15s',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: 'var(--bg3)', border: '2px solid var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-d)', fontSize: '2rem',
                  fontWeight: 600, color: 'var(--accent)',
                }}>KT</div>
                <span style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: '0.15em' }}>
                  ADD YOUR PHOTO HERE
                </span>
              </div>
              {/* Orange corner accent */}
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: '120px', height: '120px',
                background: 'radial-gradient(circle at bottom right, rgba(255,107,43,0.15), transparent)',
              }} />
            </div>

            {/* Tech stack */}
            <div className="reveal" style={{ transitionDelay: '0.3s' }}>
              <div style={{
                fontFamily: 'var(--font-m)', fontSize: 11,
                letterSpacing: '0.2em', color: 'var(--muted)',
                textTransform: 'uppercase', marginBottom: '14px',
              }}>Tech Stack</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {STACKS.map(({ name, color }) => (
                  <div key={name} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: 12, color: 'var(--muted)',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = color
                      e.currentTarget.style.color = color
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--muted)'
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}