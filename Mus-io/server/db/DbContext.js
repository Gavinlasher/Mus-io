import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BandSchema } from '../models/Band'
import { OfferSchema } from '../models/Offer'
import { VenueSchema } from '../models/Venue'
import { GigSchema } from '../models/gig'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Bands = mongoose.model('Band', BandSchema)
  Venues = mongoose.model('Venue', VenueSchema)
  Offers = mongoose.model('Offer', OfferSchema)
  Gigs = mongoose.model('Gig', GigSchema)

}

export const dbContext = new DbContext()
