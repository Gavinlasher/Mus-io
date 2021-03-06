import { Schema } from 'mongoose'

export const BandSchema = new Schema({
  name: { type: String, required: true },
  bannerImg: { type: String, required: true },
  bio: { type: String, required: true },
  soundCloud: { type: String, default: 'https://soundcloud.com/' },
  spotify: { type: String, default: 'https://www.spotify.com/us/' },
  spotifyPlaylist: { type: String, default: '37i9dQZF1DXcBWIGoYBM5M' },
  basePrice: { type: Number, min: 0, required: true },
  writer: { type: Array, required: true },
  genre: { type: String, enum: ['rock', 'country', 'pop', 'rap', 'electronic'], required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

BandSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
