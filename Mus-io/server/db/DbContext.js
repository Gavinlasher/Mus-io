import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Bands = mongoose.model('Band', BandSchema)
  Venues = mongoose.model('Venue', VenueSchema)
  Offers = mongoose.model('Offer', OfferSchema)
}

export const dbContext = new DbContext()
