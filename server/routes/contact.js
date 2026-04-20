import express from 'express'
import Contact from '../models/Contact.js'

const router = express.Router()

// POST - submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message)
      return res.status(400).json({ error: 'Name, email and message are required.' })

    const contact = new Contact({ name, email, subject, message })
    await contact.save()
    res.status(201).json({ message: 'Message received!' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' })
  }
})

// GET all messages (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// PATCH mark as read (admin)
router.patch('/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    res.json(contact)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE message (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
