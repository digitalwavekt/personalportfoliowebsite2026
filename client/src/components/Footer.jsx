export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: '48px 0 32px',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', flexWrap: 'wrap', gap: 32,
          marginBottom: 40,
        }}>
          {/* Brand */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
            }}>
              <div style={{
                width: 32, height: 32, background: 'var(--accent)',
                borderRadius: 4, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: 'var(--font-d)',
                fontWeight: 700, fontSize: 16, color: '#fff',
              }}>KT</div>
              <span style={{
                fontFamily: 'var(--font-d)', fontSize: '1.2rem',
                fontWeight: 600, letterSpacing: '-0.02em',
              }}>Digital Wave IT Solutions</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 12, maxWidth: 280, lineHeight: 1.7 }}>
              Building intelligent systems, scalable apps, and agentic workflows
              that shape the future of software.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16 }}>Navigation</div>
              {['Home','About','Services','Projects','Contact'].map(l => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <button
                    onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 13, cursor: 'none', transition: 'color 0.2s', padding: 0 }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                  >{l}</button>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16 }}>Connect</div>
              {[
                { name: 'GitHub',   href: 'https://github.com/yourusername'      },
                { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
                { name: 'Twitter',  href: 'https://twitter.com/yourusername'     },
                { name: 'Instagram',href: 'https://instagram.com/yourusername'   },
              ].map(({ name, href }) => (
                <div key={name} style={{ marginBottom: 10 }}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--muted)', fontSize: 13, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                  >{name}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            © {year} KT — Digital Wave IT Solutions Pvt Ltd. All rights reserved.
          </span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Jaipur, Rajasthan, India
          </span>
        </div>
      </div>
    </footer>
  )
}
