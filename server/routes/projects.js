import express from 'express'
import Project from '../models/Project.js'

const router = express.Router()

// GET all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Not found' })
    res.json(project)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST create project (admin)
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT update project (admin)
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!project) return res.status(404).json({ error: 'Not found' })
    res.json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE project (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted successfully' })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
