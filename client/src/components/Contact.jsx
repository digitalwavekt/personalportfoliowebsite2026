import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'

const SOCIALS = [
  { icon: Github,    href: 'https://github.com/yourusername',      label: 'GitHub'    },
  { icon: Linkedin,  href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn'  },
  { icon: Twitter,   href: 'https://twitter.com/yourusername',     label: 'Twitter'   },
  { icon: Instagram, href: 'https://instagram.com/yourusername',   label: 'Instagram' },
  { icon: Youtube,   href: 'https://youtube.com/@yourusername',    label: 'YouTube'   },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return toast.error('Please fill all required fields.')
    setLoading(true)
    try {
      await axios.post('/api/contact', form)
      toast.success('Message sent! I\'ll get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 4, color: 'var(--text)',
    fontFamily: 'var(--font-m)', fontSize: 13,
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg3)', position: 'relative', overflow: 'hidden' }}>
      {/* BG decoration */}
      <div style={{
        position: 'absolute', right: -200, top: -200, width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,43,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">
            Let's build something<br /><em>extraordinary.</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>
          {/* Left info */}
          <div>
            <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: 40, fontSize: 14 }}>
              Have a project in mind? A system to automate? An app to ship?
              I'm open to freelance projects, full-time opportunities, and
              interesting collaborations.
            </p>

            {/* Contact details */}
            {[
              { icon: Mail,    text: 'kt@digitalwave.in',   href: 'mailto:kt@digitalwave.in' },
              { icon: Phone,   text: '+91 98765 XXXXX',      href: 'tel:+919876500000'         },
              { icon: MapPin,  text: 'Jaipur, Rajasthan, India', href: null                   },
            ].map(({ icon: Icon, text, href }) => (
              <div key={text} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                marginBottom: 20, color: 'var(--muted)',
              }}>
                <div style={{
                  width: 38, height: 38,
                  background: 'rgba(255,107,43,0.08)',
                  border: '1px solid rgba(255,107,43,0.15)',
                  borderRadius: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={15} color="var(--accent)" />
                </div>
                {href
                  ? <a href={href} style={{ fontSize: 13, color: 'var(--muted)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                    >{text}</a>
                  : <span style={{ fontSize: 13 }}>{text}</span>
                }
              </div>
            ))}

            <div style={{ height: 1, background: 'var(--border)', margin: '32px 0' }} />

            {/* Social links */}
            <div style={{ fontFamily: 'var(--font-m)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16 }}>
              Follow my work
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  title={label}
                  style={{
                    width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 4, color: 'var(--muted)',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={onSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                  Name *
                </label>
                <input
                  name="name" value={form.name} onChange={onChange}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                  Email *
                </label>
                <input
                  name="email" value={form.email} onChange={onChange}
                  type="email" placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                Subject
              </label>
              <input
                name="subject" value={form.subject} onChange={onChange}
                placeholder="Project brief, collaboration, etc."
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                Message *
              </label>
              <textarea
                name="message" value={form.message} onChange={onChange}
                rows={6} placeholder="Tell me about your project..."
                style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
            >
              <Send size={15} />
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div:last-child { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
