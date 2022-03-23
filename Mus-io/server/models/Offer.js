import { Schema } from 'mongoose'
import { BandSchema } from "./Band"
import { VenueSchema } from "./Venue"

export const OfferSchema = new Schema({
  venueId: { type: Schema.Types.ObjectId, required: true, ref: 'Venue' },
  bandId: { type: Schema.Types.ObjectId, required: true, ref: 'Band' },
  isAccepted: { type: Boolean, required: true, default: false },
  status: { type: String, enum: ['pending', 'accepted', 'declind', 'deleted'] },
  body: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}
{ timestamps: true, toJSON: { virtuals: true } }
)



OfferSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

BandSchema.virtual('band', {
  localField: 'bandId',
  foreignField: '_id',
  justOne: true,
  ref: 'Band'
})
VenueSchema.virtual('venue', {
  localField: 'venueId',
  foreignField: '_id',
  justOne: true,
  ref: 'Venue'
})