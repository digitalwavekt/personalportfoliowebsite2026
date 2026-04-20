import mongoose from 'mongoose'

const RatingSchema = new mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  role:   { type: String, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  text:   { type: String, required: true },
  show:   { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Rating', RatingSchema)
