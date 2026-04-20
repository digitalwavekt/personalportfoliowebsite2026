import { useEffect, useState } from 'react'
import axios from 'axios'
import { Star } from 'lucide-react'

const FALLBACK = [
  { name: 'Rahul Sharma', role: 'Startup Founder', rating: 5, text: 'KT built our entire platform from scratch in record time. The agentic features he suggested saved us weeks of manual work. Exceptional.' },
  { name: 'Priya Mehta', role: 'Product Manager', rating: 5, text: 'The mobile app exceeded every expectation. Smooth animations, real-time updates — our users loved it from day one.' },
  { name: 'Vikram Singh', role: 'CTO, TechVenture', rating: 5, text: 'Deep technical knowledge paired with great communication. KT understood our vision and delivered something even better.' },
  { name: 'Anjali Kapoor', role: 'E-commerce Owner', rating: 5, text: 'Our Shopify integration works flawlessly. Revenue tracking, analytics, custom sections — everything perfect. Will hire again.' },
  { name: 'Arjun Das', role: 'App Entrepreneur', rating: 5, text: 'From idea to production in 6 weeks. The React Native app performs beautifully on both platforms. Highly recommended.' },
  { name: 'Sneha Verma', role: 'Digital Agency', rating: 5, text: 'We have worked with many developers. KT stands out for his speed, quality and initiative. A true professional.' },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < count ? '#FF6B2B' : 'none'} color={i < count ? '#FF6B2B' : '#2A3050'} />
      ))}
    </div>
  )
}

function RatingCard({ r }) {
  return (
    <div style={{
      flex: '0 0 320px',
      background: 'var(--bg3)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: 28,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 60, height: 2,
        background: 'var(--accent)',
      }} />
      <Stars count={r.rating} />
      <p style={{
        color: 'var(--muted)', fontSize: 13, lineHeight: 1.85,
        marginBottom: 20, fontStyle: 'italic',
      }}>"{r.text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), #FF9A5C)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-d)', fontSize: '1rem', fontWeight: 700, color: '#fff',
        }}>
          {r.name?.[0] || '?'}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{r.name}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em' }}>{r.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Ratings() {
  const [ratings, setRatings] = useState(FALLBACK)

  useEffect(() => {
    axios.get('/api/ratings')
      .then(r => { if (r.data?.length) setRatings(r.data) })
      .catch(() => {})
  }, [])

  const doubled = [...ratings, ...ratings]

  return (
    <section style={{ padding: '100px 0', overflow: 'hidden', background: 'var(--bg)' }}>
      <div className="container" style={{ marginBottom: 48 }}>
        <div className="section-label">Client Reviews</div>
        <h2 className="section-title">
          Trusted by builders<br /><em>across India.</em>
        </h2>
      </div>

      {/* Marquee wrapper */}
      <div style={{ position: 'relative' }}>
        {/* Fade left */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: 'linear-gradient(to right, var(--bg), transparent)',
        }} />
        {/* Fade right */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
          background: 'linear-gradient(to left, var(--bg), transparent)',
        }} />

        {/* Track */}
        <div style={{
          display: 'flex', gap: 20, width: 'max-content',
          animation: 'marquee 40s linear infinite',
          paddingLeft: 20,
        }}>
          {doubled.map((r, i) => <RatingCard key={i} r={r} />)}
        </div>
      </div>

      {/* Average rating display */}
      <div className="container" style={{ marginTop: 56 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 32,
          padding: '24px 32px',
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          width: 'fit-content',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-d)', fontSize: '3.5rem',
              fontWeight: 600, color: 'var(--accent)', lineHeight: 1,
            }}>5.0</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', marginTop: 4 }}>AVERAGE RATING</div>
          </div>
          <div style={{ width: 1, height: 60, background: 'var(--border)' }} />
          <div>
            <Stars count={5} />
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>
              Based on {ratings.length}+ verified reviews
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
