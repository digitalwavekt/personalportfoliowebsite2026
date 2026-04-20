import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category:    { type: String, trim: true },
  stack:       [{ type: String }],
  liveUrl:     { type: String, trim: true },
  githubUrl:   { type: String, trim: true },
  thumbnail:   { type: String, trim: true },
  status:      { type: String, enum: ['Live','In Progress','Completed','Archived'], default: 'In Progress' },
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('Project', ProjectSchema)
