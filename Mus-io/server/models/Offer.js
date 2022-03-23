import { Schema } from 'mongoose'

export const OfferSchema = new Schema({
  venueId: { type: Schema.Types.ObjectId, required: true, ref: 'Venue' },
  bandId: { type: Schema.Types.ObjectId, required: true, ref: 'Band' },
  isAccepted: { type: Boolean, required: true, default: false },
  status: { type: String, enum: ['pending', 'accepted', ''] }
})
