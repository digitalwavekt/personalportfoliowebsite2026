import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import {
  LayoutDashboard, FolderOpen, MessageSquare, Star,
  Plus, Trash2, Edit2, Eye, EyeOff, LogOut, Save, X, Check
} from 'lucide-react'

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
const STACK_OPTIONS = ['React','React Native','Node.js','MongoDB','Python','Django','AWS','Firebase','Three.js','TypeScript','Socket.io','Supabase','Next.js','GraphQL','Redis','Express','PostgreSQL','Docker']

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = {
  bg: { minHeight: '100vh', background: '#02040B', color: '#EDE9E0', fontFamily: "'JetBrains Mono', monospace", display: 'flex' },
  sidebar: { width: 220, background: '#07091A', borderRight: '1px solid #1A2040', display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0, minHeight: '100vh' },
  logo: { padding: '0 20px 28px', borderBottom: '1px solid #1A2040', marginBottom: 12 },
  navBtn: (active) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '11px 20px', width: '100%',
    background: active ? 'rgba(255,107,43,0.1)' : 'none',
    border: 'none', borderLeft: active ? '2px solid #FF6B2B' : '2px solid transparent',
    color: active ? '#FF6B2B' : '#5A6480', fontSize: 12,
    letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s',
    textTransform: 'uppercase',
  }),
  main: { flex: 1, padding: 32, overflowY: 'auto' },
  card: { background: '#0D1120', border: '1px solid #1A2040', borderRadius: 12, padding: 24, marginBottom: 20 },
  input: { width: '100%', padding: '11px 14px', background: '#02040B', border: '1px solid #1A2040', borderRadius: 4, color: '#EDE9E0', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, outline: 'none', marginBottom: 12 },
  label: { display: 'block', fontSize: 10, letterSpacing: '0.15em', color: '#5A6480', textTransform: 'uppercase', marginBottom: 6 },
  btn: (variant='primary') => ({
    display: 'inline-flex', alignItems: 'center', gap: 7,
    padding: '9px 20px', borderRadius: 4, border: 'none', cursor: 'pointer',
    fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
    letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s',
    background: variant === 'primary' ? '#FF6B2B'
              : variant === 'danger'  ? 'rgba(220,38,38,0.1)'
              : variant === 'ghost'   ? 'transparent'
              : '#1A2040',
    color: variant === 'primary' ? '#fff'
         : variant === 'danger'  ? '#EF4444'
         : '#EDE9E0',
    border: variant === 'danger' ? '1px solid rgba(220,38,38,0.3)' : 'none',
  }),
}

// ─── Login ────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [pass, setPass] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (pass === ADMIN_PASS) { onLogin(); toast.success('Welcome back!') }
    else toast.error('Wrong password.')
  }
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#02040B', fontFamily:"'JetBrains Mono',monospace" }}>
      <Toaster position="top-right" toastOptions={{ style: { background:'#0D1120', color:'#EDE9E0', border:'1px solid #1A2040', fontFamily:"'JetBrains Mono',monospace", fontSize:13 } }} />
      <div style={{ width: 360, background:'#0D1120', border:'1px solid #1A2040', borderRadius:12, padding:40 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:48, height:48, background:'#FF6B2B', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:22, color:'#fff', margin:'0 auto 16px' }}>KT</div>
          <div style={{ fontSize:18, fontWeight:500 }}>Admin Panel</div>
          <div style={{ fontSize:11, color:'#5A6480', marginTop:4 }}>Enter password to continue</div>
        </div>
        <form onSubmit={submit}>
          <input
            type="password" value={pass} onChange={e=>setPass(e.target.value)}
            placeholder="Admin password"
            style={{ ...s.input, marginBottom:20 }}
            onFocus={e=>e.target.style.borderColor='#FF6B2B'}
            onBlur={e=>e.target.style.borderColor='#1A2040'}
          />
          <button type="submit" style={{ ...s.btn('primary'), width:'100%', justifyContent:'center' }}>Login</button>
        </form>
      </div>
    </div>
  )
}

// ─── Projects Tab ─────────────────────────────────────────────────────────────
function ProjectsTab() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ title:'', description:'', category:'', stack:[], liveUrl:'', githubUrl:'', thumbnail:'', status:'In Progress' })
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => axios.get('/api/projects').then(r=>setProjects(r.data)).catch(()=>{})
  useEffect(() => { load() }, [])

  const toggleStack = (s) => setForm(f => ({
    ...f, stack: f.stack.includes(s) ? f.stack.filter(x=>x!==s) : [...f.stack, s]
  }))

  const save = async () => {
    try {
      if (editing) { await axios.put(`/api/projects/${editing}`, form); toast.success('Project updated!') }
      else { await axios.post('/api/projects', form); toast.success('Project added!') }
      setForm({ title:'', description:'', category:'', stack:[], liveUrl:'', githubUrl:'', thumbnail:'', status:'In Progress' })
      setEditing(null); setShowForm(false); load()
    } catch { toast.error('Error saving project.') }
  }

  const del = async (id) => {
    if (!confirm('Delete this project?')) return
    await axios.delete(`/api/projects/${id}`).catch(()=>{})
    toast.success('Deleted.'); load()
  }

  const edit = (p) => {
    setForm({ title:p.title, description:p.description, category:p.category||'', stack:p.stack||[], liveUrl:p.liveUrl||'', githubUrl:p.githubUrl||'', thumbnail:p.thumbnail||'', status:p.status||'In Progress' })
    setEditing(p._id); setShowForm(true)
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:600 }}>Projects</h2>
        <button style={s.btn('primary')} onClick={()=>{ setShowForm(true); setEditing(null); setForm({ title:'', description:'', category:'', stack:[], liveUrl:'', githubUrl:'', thumbnail:'', status:'In Progress' }) }}>
          <Plus size={14} /> Add Project
        </button>
      </div>

      {showForm && (
        <div style={s.card}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
            <span style={{ fontWeight:500 }}>{editing ? 'Edit Project' : 'New Project'}</span>
            <button style={{ ...s.btn('ghost'), padding:'4px 8px' }} onClick={()=>setShowForm(false)}><X size={16}/></button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <label style={s.label}>Title *</label>
              <input style={s.input} value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Project name"
                onFocus={e=>e.target.style.borderColor='#FF6B2B'} onBlur={e=>e.target.style.borderColor='#1A2040'} />
            </div>
            <div>
              <label style={s.label}>Category</label>
              <input style={s.input} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} placeholder="Web App, Mobile, AI..."
                onFocus={e=>e.target.style.borderColor='#FF6B2B'} onBlur={e=>e.target.style.borderColor='#1A2040'} />
            </div>
          </div>
          <label style={s.label}>Description *</label>
          <textarea style={{...s.input, resize:'vertical', minHeight:90}} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="Project description..."
            onFocus={e=>e.target.style.borderColor='#FF6B2B'} onBlur={e=>e.target.style.borderColor='#1A2040'} />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
            <div>
              <label style={s.label}>Live URL</label>
              <input style={s.input} value={form.liveUrl} onChange={e=>setForm(f=>({...f,liveUrl:e.target.value}))} placeholder="https://..."
                onFocus={e=>e.target.style.borderColor='#FF6B2B'} onBlur={e=>e.target.style.borderColor='#1A2040'} />
            </div>
            <div>
              <label style={s.label}>GitHub URL</label>
              <input style={s.input} value={form.githubUrl} onChange={e=>setForm(f=>({...f,githubUrl:e.target.value}))} placeholder="https://github.com/..."
                onFocus={e=>e.target.style.borderColor='#FF6B2B'} onBlur={e=>e.target.style.borderColor='#1A2040'} />
            </div>
            <div>
              <label style={s.label}>Status</label>
              <select style={{...s.input, cursor:'pointer'}} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
                {['Live','In Progress','Completed','Archived'].map(st=><option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>
          <label style={s.label}>Thumbnail URL</label>
          <input style={s.input} value={form.thumbnail} onChange={e=>setForm(f=>({...f,thumbnail:e.target.value}))} placeholder="https://image-url.com/..."
            onFocus={e=>e.target.style.borderColor='#FF6B2B'} onBlur={e=>e.target.style.borderColor='#1A2040'} />
          <label style={s.label}>Tech Stack</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
            {STACK_OPTIONS.map(st => (
              <button key={st} onClick={()=>toggleStack(st)} style={{
                padding:'4px 12px', borderRadius:2, border:'1px solid',
                borderColor: form.stack.includes(st) ? '#FF6B2B' : '#1A2040',
                background: form.stack.includes(st) ? 'rgba(255,107,43,0.12)' : 'transparent',
                color: form.stack.includes(st) ? '#FF6B2B' : '#5A6480',
                fontSize:11, cursor:'pointer', fontFamily:"'JetBrains Mono',monospace",
              }}>{st}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button style={s.btn('primary')} onClick={save}><Save size={14}/>{editing?'Update':'Save'}</button>
            <button style={s.btn('secondary')} onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display:'grid', gap:12 }}>
        {projects.map(p => (
          <div key={p._id} style={{ ...s.card, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', marginBottom:0 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                <span style={{ fontWeight:500 }}>{p.title}</span>
                {p.status && <span style={{ padding:'2px 8px', borderRadius:2, fontSize:10, background:'rgba(255,107,43,0.1)', color:'#FF6B2B', border:'1px solid rgba(255,107,43,0.2)' }}>{p.status}</span>}
              </div>
              <div style={{ fontSize:11, color:'#5A6480' }}>{p.category} • {(p.stack||[]).join(', ')}</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button style={{...s.btn('secondary'), padding:'7px 12px'}} onClick={()=>edit(p)}><Edit2 size={13}/></button>
              <button style={{...s.btn('danger'), padding:'7px 12px'}} onClick={()=>del(p._id)}><Trash2 size={13}/></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <div style={{ textAlign:'center', padding:40, color:'#5A6480', fontSize:13 }}>No projects yet. Add your first one above.</div>}
      </div>
    </div>
  )
}

// ─── Contacts Tab ─────────────────────────────────────────────────────────────
function ContactsTab() {
  const [contacts, setContacts] = useState([])
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    axios.get('/api/contact').then(r=>setContacts(r.data)).catch(()=>{})
  }, [])

  const del = async (id) => {
    if (!confirm('Delete this message?')) return
    await axios.delete(`/api/contact/${id}`).catch(()=>{})
    setContacts(c => c.filter(x=>x._id!==id))
    toast.success('Deleted.')
  }

  return (
    <div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:600, marginBottom:24 }}>
        Contact Messages <span style={{ fontSize:'1rem', color:'#5A6480' }}>({contacts.length})</span>
      </h2>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {contacts.map(c => (
          <div key={c._id} style={s.card}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ cursor:'pointer', flex:1 }} onClick={()=>setExpanded(expanded===c._id ? null : c._id)}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:4 }}>
                  <span style={{ fontWeight:500 }}>{c.name}</span>
                  <span style={{ fontSize:11, color:'#5A6480' }}>{c.email}</span>
                  {c.subject && <span style={{ fontSize:11, color:'#FF6B2B' }}>— {c.subject}</span>}
                </div>
                <div style={{ fontSize:11, color:'#5A6480' }}>{new Date(c.createdAt).toLocaleString()}</div>
              </div>
              <button style={{...s.btn('danger'), padding:'6px 10px'}} onClick={()=>del(c._id)}><Trash2 size={13}/></button>
            </div>
            {expanded===c._id && (
              <div style={{ marginTop:16, padding:16, background:'#02040B', borderRadius:6, fontSize:13, color:'#7A8499', lineHeight:1.8, whiteSpace:'pre-wrap' }}>
                {c.message}
              </div>
            )}
          </div>
        ))}
        {contacts.length===0 && <div style={{ textAlign:'center', padding:40, color:'#5A6480', fontSize:13 }}>No messages yet.</div>}
      </div>
    </div>
  )
}

// ─── Ratings Tab ─────────────────────────────────────────────────────────────
function RatingsTab() {
  const [ratings, setRatings] = useState([])
  const [form, setForm] = useState({ name:'', role:'', rating:5, text:'' })
  const [showForm, setShowForm] = useState(false)

  const load = () => axios.get('/api/ratings').then(r=>setRatings(r.data)).catch(()=>{})
  useEffect(()=>{ load() },[])

  const save = async () => {
    try {
      await axios.post('/api/ratings', form)
      toast.success('Review added!')
      setForm({ name:'', role:'', rating:5, text:'' })
      setShowForm(false); load()
    } catch { toast.error('Error adding review.') }
  }

  const del = async (id) => {
    await axios.delete(`/api/ratings/${id}`).catch(()=>{})
    toast.success('Deleted.'); load()
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:600 }}>Client Reviews</h2>
        <button style={s.btn('primary')} onClick={()=>setShowForm(true)}><Plus size={14}/> Add Review</button>
      </div>
      {showForm && (
        <div style={s.card}>
          <label style={s.label}>Client Name</label>
          <input style={s.input} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Name"
            onFocus={e=>e.target.style.borderColor='#FF6B2B'} onBlur={e=>e.target.style.borderColor='#1A2040'} />
          <label style={s.label}>Role / Company</label>
          <input style={s.input} value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} placeholder="Founder, CTO..."
            onFocus={e=>e.target.style.borderColor='#FF6B2B'} onBlur={e=>e.target.style.borderColor='#1A2040'} />
          <label style={s.label}>Rating (1–5)</label>
          <div style={{ display:'flex', gap:10, marginBottom:12 }}>
            {[1,2,3,4,5].map(n=>(
              <button key={n} onClick={()=>setForm(f=>({...f,rating:n}))} style={{
                padding:'6px 14px', borderRadius:2, border:'1px solid',
                borderColor: form.rating>=n ? '#FF6B2B' : '#1A2040',
                background: form.rating>=n ? 'rgba(255,107,43,0.1)' : 'transparent',
                color: form.rating>=n ? '#FF6B2B' : '#5A6480',
                cursor:'pointer', fontFamily:"'JetBrains Mono',monospace", fontSize:12,
              }}>{n}★</button>
            ))}
          </div>
          <label style={s.label}>Review Text</label>
          <textarea style={{...s.input,resize:'vertical',minHeight:80}} value={form.text} onChange={e=>setForm(f=>({...f,text:e.target.value}))} placeholder="What did the client say?"
            onFocus={e=>e.target.style.borderColor='#FF6B2B'} onBlur={e=>e.target.style.borderColor='#1A2040'} />
          <div style={{ display:'flex', gap:10 }}>
            <button style={s.btn('primary')} onClick={save}><Save size={14}/>Save</button>
            <button style={s.btn('secondary')} onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {ratings.map(r=>(
          <div key={r._id} style={{ ...s.card, display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'16px 20px', marginBottom:0 }}>
            <div>
              <div style={{ display:'flex', gap:2, marginBottom:6 }}>
                {[...Array(r.rating)].map((_,i)=><span key={i} style={{ color:'#FF6B2B' }}>★</span>)}
              </div>
              <div style={{ fontWeight:500, marginBottom:2 }}>{r.name} <span style={{ color:'#5A6480', fontWeight:400 }}>— {r.role}</span></div>
              <div style={{ fontSize:12, color:'#5A6480', maxWidth:500 }}>"{r.text}"</div>
            </div>
            <button style={{...s.btn('danger'), padding:'6px 10px'}} onClick={()=>del(r._id)}><Trash2 size={13}/></button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const [stats, setStats] = useState({ projects:0, contacts:0, ratings:0 })
  useEffect(()=>{
    Promise.all([
      axios.get('/api/projects').then(r=>r.data.length).catch(()=>0),
      axios.get('/api/contact').then(r=>r.data.length).catch(()=>0),
      axios.get('/api/ratings').then(r=>r.data.length).catch(()=>0),
    ]).then(([projects,contacts,ratings])=>setStats({projects,contacts,ratings}))
  },[])

  return (
    <div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:600, marginBottom:8 }}>Dashboard</h2>
      <p style={{ color:'#5A6480', marginBottom:32, fontSize:13 }}>Welcome back! Here's your portfolio at a glance.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {[
          { label:'Total Projects', value:stats.projects, icon:FolderOpen, color:'#FF6B2B' },
          { label:'Messages Received', value:stats.contacts, icon:MessageSquare, color:'#00D4FF' },
          { label:'Client Reviews', value:stats.ratings, icon:Star, color:'#22D36F' },
        ].map(({label,value,icon:Icon,color})=>(
          <div key={label} style={{ ...s.card, marginBottom:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
              <div style={{ width:44,height:44, background:`${color}15`, border:`1px solid ${color}30`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon size={20} color={color} />
              </div>
            </div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.5rem', fontWeight:600, color, lineHeight:1 }}>{value}</div>
            <div style={{ fontSize:11, color:'#5A6480', marginTop:6, letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...s.card, marginTop:20 }}>
        <div style={{ fontWeight:500, marginBottom:12 }}>Quick tips</div>
        <div style={{ fontSize:12, color:'#5A6480', lineHeight:2 }}>
          • Use <span style={{ color:'#FF6B2B' }}>Projects tab</span> to add/edit your portfolio items<br/>
          • Use <span style={{ color:'#00D4FF' }}>Messages tab</span> to read contact form submissions<br/>
          • Use <span style={{ color:'#22D36F' }}>Reviews tab</span> to manage client testimonials<br/>
          • All changes reflect live on the portfolio instantly
        </div>
      </div>
    </div>
  )
}

// ─── Main Admin ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('kt_admin') === '1')
  const [tab, setTab] = useState('dashboard')

  if (!authed) return <Login onLogin={()=>{ sessionStorage.setItem('kt_admin','1'); setAuthed(true) }} />

  const TABS = [
    { id:'dashboard', label:'Dashboard', icon:LayoutDashboard },
    { id:'projects',  label:'Projects',  icon:FolderOpen     },
    { id:'contacts',  label:'Messages',  icon:MessageSquare  },
    { id:'ratings',   label:'Reviews',   icon:Star           },
  ]

  return (
    <div style={s.bg}>
      <Toaster position="top-right" toastOptions={{ style:{ background:'#0D1120', color:'#EDE9E0', border:'1px solid #1A2040', fontFamily:"'JetBrains Mono',monospace", fontSize:13 } }} />
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.logo}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32,height:32,background:'#FF6B2B',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:16,color:'#fff' }}>KT</div>
            <div>
              <div style={{ fontSize:12, fontWeight:500 }}>Admin Panel</div>
              <div style={{ fontSize:10, color:'#5A6480' }}>Portfolio Manager</div>
            </div>
          </div>
        </div>
        {TABS.map(t=>(
          <button key={t.id} style={s.navBtn(tab===t.id)} onClick={()=>setTab(t.id)}>
            <t.icon size={15}/> {t.label}
          </button>
        ))}
        <div style={{ marginTop:'auto', padding:'0 20px' }}>
          <button
            style={{ ...s.navBtn(false), color:'#EF4444', width:'100%' }}
            onClick={()=>{ sessionStorage.removeItem('kt_admin'); setAuthed(false) }}
          >
            <LogOut size={15}/> Logout
          </button>
          <a href="/" style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 0', fontSize:11, color:'#5A6480', letterSpacing:'0.1em', textTransform:'uppercase' }}>
            <Eye size={14}/> View Site
          </a>
        </div>
      </div>

      {/* Main */}
      <div style={s.main}>
        {tab==='dashboard' && <Dashboard/>}
        {tab==='projects'  && <ProjectsTab/>}
        {tab==='contacts'  && <ContactsTab/>}
        {tab==='ratings'   && <RatingsTab/>}
      </div>
    </div>
  )
}
