import { useRef, useEffect } from 'react'
import { Zap, Smartphone, Globe, Bot, Database, Code2 } from 'lucide-react'

const SERVICES = [
  {
    icon: Bot,
    title: 'Agentic AI Systems',
    desc: 'Autonomous workflows, multi-agent pipelines, and LLM-powered apps that think and act independently.',
    tags: ['LangChain', 'OpenAI', 'AutoGen'],
    accent: '#FF6B2B',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Cross-platform React Native apps with native performance, real-time features, and polished UI.',
    tags: ['React Native', 'Expo', 'Firebase'],
    accent: '#00D4FF',
  },
  {
    icon: Globe,
    title: 'Full-Stack Web Apps',
    desc: 'End-to-end MERN/PERN applications — scalable backends, fast frontends, production-ready.',
    tags: ['React', 'Node.js', 'MongoDB'],
    accent: '#22D36F',
  },
  {
    icon: Zap,
    title: 'API & Microservices',
    desc: 'High-performance REST and WebSocket APIs. Third-party integrations, payment gateways, maps.',
    tags: ['Express', 'Socket.io', 'AWS'],
    accent: '#A855F7',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    desc: 'Schema design, optimization, and migration for MongoDB, PostgreSQL, and Supabase projects.',
    tags: ['MongoDB', 'PostgreSQL', 'Supabase'],
    accent: '#F59E0B',
  },
  {
    icon: Code2,
    title: 'Digital Marketing Tech',
    desc: 'Analytics integrations, CRO dashboards, SEO automation, and performance tracking systems.',
    tags: ['Shopify', 'Analytics', 'SEO'],
    accent: '#EC4899',
  },
]

function ServiceCard({ service, delay }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    card.style.transform = `perspective(800px) rotateY(${x * 0.04}deg) rotateX(${-y * 0.04}deg) translateY(-6px)`
  }
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)'
  }

  return (
    <div
      ref={cardRef}
      className="reveal card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: 32,
        transitionDelay: `${delay}s`,
        transitionProperty: 'opacity, transform, border-color, box-shadow',
        transitionDuration: '0.8s, 0.3s, 0.3s, 0.3s',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${service.accent}, transparent)`,
        opacity: 0.6,
      }} />

      {/* Icon */}
      <div style={{
        width: 48, height: 48,
        background: `${service.accent}15`,
        border: `1px solid ${service.accent}30`,
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
      }}>
        <service.icon size={22} color={service.accent} />
      </div>

      <h3 style={{
        fontFamily: 'var(--font-d)', fontSize: '1.4rem',
        fontWeight: 600, marginBottom: 12,
      }}>{service.title}</h3>

      <p style={{
        color: 'var(--muted)', fontSize: 13, lineHeight: 1.8,
        marginBottom: 20,
      }}>{service.desc}</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {service.tags.map(t => (
          <span key={t} style={{
            padding: '3px 10px',
            background: `${service.accent}10`,
            border: `1px solid ${service.accent}20`,
            borderRadius: 2,
            fontSize: 10, letterSpacing: '0.08em',
            color: service.accent,
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
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
    <section id="services" className="section" ref={ref}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label reveal">What I Do</div>
          <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
            Services built for<br /><em>real-world scale.</em>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 0.08} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #services .container > div:last-child { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          #services .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
