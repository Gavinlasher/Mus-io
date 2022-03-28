import { Schema } from 'mongoose'

export const GigSchema = new Schema({
    bandId: { type: Schema.Types.ObjectId, required: true, ref: 'Band' },
    venueId: { type: Schema.Types.ObjectId, required: true, ref: 'Venue' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    startDate: { type: Date, min: new Date(), required: true, }
},
    { timestamps: true, toJSON: { virtuals: true } }
)



GigSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
GigSchema.virtual('band', {
    localField: 'bandId',
    foreignField: '_id',
    justOne: true,
    ref: 'Band'
})
GigSchema.virtual('venue', {
    localField: 'venueId',
    foreignField: '_id',
    justOne: true,
    ref: 'Venue'
})