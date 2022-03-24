import { Schema } from 'mongoose'
import { BandSchema } from "./Band"
import { VenueSchema } from "./Venue"

export const OfferSchema = new Schema({
  venueId: { type: Schema.Types.ObjectId, required: true, ref: 'Venue' },
  bandId: { type: Schema.Types.ObjectId, required: true, ref: 'Band' },
  status: { type: String, enum: ['pending', 'accepted', 'declind', 'deleted'], required: true, default: 'pending' },
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