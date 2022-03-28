import { Schema } from 'mongoose'

export const OfferSchema = new Schema({
  bandId: { type: Schema.Types.ObjectId, required: true, ref: 'Band' },
  status: { type: String, enum: ['pending', 'accepted', 'declined', 'deleted'], required: true, default: 'pending' },
  body: { type: String, required: true },
  recipientId: { type: Schema.Types.ObjectId, required: true, },
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