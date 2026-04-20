import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { ExternalLink, Github, Loader } from 'lucide-react'

const STACKS_COLORS = {
  'React': '#61DAFB', 'React Native': '#FF6B2B', 'Node.js': '#68A063',
  'MongoDB': '#4DB33D', 'Python': '#3776AB', 'Django': '#092E20',
  'AWS': '#FF9900', 'Firebase': '#FFCA28', 'Three.js': '#aaaaaa',
  'TypeScript': '#3178C6', 'Socket.io': '#888888', 'Supabase': '#3ECF8E',
  'Next.js': '#ffffff', 'GraphQL': '#E10098', 'Redis': '#DC382D',
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const ref = useRef(null)

  useEffect(() => {
    axios.get('/api/projects')
      .then(r => setProjects(r.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  // Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [projects])

  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="section grid-bg" ref={ref} style={{ background: 'var(--bg3)' }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <div className="section-label reveal">My Work</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
              Projects that<br /><em>move the needle.</em>
            </h2>
            {/* Filter tabs */}
            <div className="reveal" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', transitionDelay: '0.2s' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '7px 18px',
                    background: filter === cat ? 'var(--accent)' : 'transparent',
                    border: `1px solid ${filter === cat ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 2,
                    color: filter === cat ? '#fff' : 'var(--muted)',
                    fontFamily: 'var(--font-m)', fontSize: 11,
                    letterSpacing: '0.1em', cursor: 'none',
                    transition: 'all 0.2s',
                  }}
                >{cat}</button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
            <Loader size={24} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 0',
            color: 'var(--muted)', fontSize: 13,
          }}>
            No projects yet. Add them from the{' '}
            <a href="/admin" style={{ color: 'var(--accent)' }}>admin panel</a>.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 20,
          }}>
            {filtered.map((p, i) => (
              <div key={p._id} className="reveal card" style={{
                padding: 0, overflow: 'hidden',
                transitionDelay: `${i * 0.07}s`,
              }}>
                {/* Thumbnail */}
                <div style={{
                  width: '100%', height: 200,
                  background: 'var(--bg)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {p.thumbnail ? (
                    <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `linear-gradient(135deg, var(--bg3), var(--bg))`,
                    }}>
                      <span style={{ fontFamily: 'var(--font-d)', fontSize: '3rem', color: 'var(--border)' }}>
                        {p.title?.[0] || '?'}
                      </span>
                    </div>
                  )}
                  {/* Status badge */}
                  {p.status && (
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      padding: '3px 10px',
                      background: p.status === 'Live' ? 'rgba(34,211,111,0.15)' : 'rgba(255,107,43,0.15)',
                      border: `1px solid ${p.status === 'Live' ? 'rgba(34,211,111,0.4)' : 'rgba(255,107,43,0.4)'}`,
                      borderRadius: 2, fontSize: 10, letterSpacing: '0.12em',
                      color: p.status === 'Live' ? '#22D36F' : 'var(--accent)',
                    }}>{p.status}</div>
                  )}
                </div>

                <div style={{ padding: '24px 24px 20px' }}>
                  {p.category && (
                    <span style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                      {p.category}
                    </span>
                  )}
                  <h3 style={{
                    fontFamily: 'var(--font-d)', fontSize: '1.35rem',
                    fontWeight: 600, margin: '6px 0 10px',
                  }}>{p.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.8, marginBottom: 16 }}>
                    {p.description}
                  </p>

                  {/* Stack tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                    {(p.stack || []).map(s => (
                      <span key={s} style={{
                        padding: '2px 8px',
                        background: `${STACKS_COLORS[s] || '#ffffff'}10`,
                        border: `1px solid ${STACKS_COLORS[s] || '#ffffff'}25`,
                        borderRadius: 2, fontSize: 10,
                        color: STACKS_COLORS[s] || 'var(--muted)',
                        letterSpacing: '0.06em',
                      }}>{s}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div style={{ display: 'flex', gap: 12, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em',
                      }}>
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em',
                      }}>
                        <Github size={13} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
