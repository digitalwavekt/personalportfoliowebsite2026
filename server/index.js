import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import projectRoutes from './routes/projects.js'
import contactRoutes from './routes/contact.js'
import ratingRoutes  from './routes/ratings.js'

process.on('uncaughtException', err => {
  console.error('UNCAUGHT:', err.message)
  process.exit(1)
})

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000
const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'https://newcreation-alpha.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))
app.options('*', cors())

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Rate limiter for contact form (prevent spam)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: { error: 'Too many messages sent. Try again later.' },
})

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/projects', projectRoutes)
app.use('/api/contact',  contactLimiter, contactRoutes)
app.use('/api/ratings',  ratingRoutes)

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }))

// ── Serve React build in production ──────────────────────────────────────────
/*if (process.env.NODE_ENV === 'production') {
  const clientDist = join(__dirname, '../client/dist')
  app.use(express.static(clientDist))
  app.get('*', (_, res) => res.sendFile(join(clientDist, 'index.html')))
}*/

// ── MongoDB connect ───────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB connected')
    app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('❌  MongoDB connection failed:', err.message)
    console.error('MONGO_URI set?', !!process.env.MONGO_URI)
    process.exit(1)
  })

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})
