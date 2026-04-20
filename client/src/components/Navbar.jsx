import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = ['Home','About','Services','Projects','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 2rem',
      background: scrolled ? 'rgba(2,4,11,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(26,32,64,0.8)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 70,
      }}>
        {/* Logo */}
        <div
          onClick={() => scrollTo('home')}
          style={{ cursor: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div style={{
            width: 32, height: 32, background: 'var(--accent)',
            borderRadius: 4, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontFamily: 'var(--font-d)',
            fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: '-0.05em',
          }}>KT</div>
          <span style={{
            fontFamily: 'var(--font-m)', fontSize: 12,
            letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase',
          }}>Portfolio</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: 'none', border: 'none', color: 'var(--muted)',
                fontFamily: 'var(--font-m)', fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', cursor: 'none',
                transition: 'color 0.2s', padding: '4px 0',
                position: 'relative',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{link}</button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="btn btn-primary"
            style={{ padding: '10px 24px', fontSize: 11 }}
          >Hire Me</button>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'none', display: 'none' }}
          className="burger"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, top: 70,
          background: 'rgba(2,4,11,0.98)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 40, zIndex: 99,
        }}>
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: 'none', border: 'none', cursor: 'none',
                fontFamily: 'var(--font-d)', fontSize: '2.5rem',
                fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em',
              }}
            >{link}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
