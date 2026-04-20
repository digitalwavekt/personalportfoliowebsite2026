import express from 'express'
import Rating from '../models/Rating.js'

const router = express.Router()

// GET all visible ratings (public)
router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.find({ show: true }).sort({ createdAt: -1 })
    res.json(ratings)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// GET all ratings including hidden (admin)
router.get('/all', async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 })
    res.json(ratings)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST add rating (admin)
router.post('/', async (req, res) => {
  try {
    const rating = new Rating(req.body)
    await rating.save()
    res.status(201).json(rating)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PATCH toggle visibility (admin)
router.patch('/:id/toggle', async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id)
    if (!rating) return res.status(404).json({ error: 'Not found' })
    rating.show = !rating.show
    await rating.save()
    res.json(rating)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE rating (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
