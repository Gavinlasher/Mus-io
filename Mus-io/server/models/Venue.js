import { Schema } from 'mongoose'

export const VenueSchema = new Schema({
  name: { type: String, required: true },
  bannerImg: { type: String, default: 'https://images.unsplash.com/photo-1521334726092-b509a19597c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1501&q=80' },
  bio: { type: String, required: true },
  budget: { type: String, required: true },
  capacity: { type: Number, min: 0, max: 1000000, required: true },
  location: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

VenueSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
