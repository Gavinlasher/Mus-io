import { Schema } from 'mongoose'

// NOTE MIGHT EVENTUALLY ADD A "SENDER_ID AND RECEIVER_ID"
export const OfferSchema = new Schema({
  venueId: { type: Schema.Types.ObjectId, required: true, ref: 'Venue' },
  bandId: { type: Schema.Types.ObjectId, required: true, ref: 'Band' },
  status: { type: String, enum: ['pending', 'accepted', 'declined', 'deleted'], required: true, default: 'pending' },
  body: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
  { timestamps: true, toJSON: { virtuals: true } }
)



OfferSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
OfferSchema.virtual('band', {
  localField: 'bandId',
  foreignField: '_id',
  justOne: true,
  ref: 'Band'
})
OfferSchema.virtual('venue', {
  localField: 'venueId',
  foreignField: '_id',
  justOne: true,
  ref: 'Venue'
})