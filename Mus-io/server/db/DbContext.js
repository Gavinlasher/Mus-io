import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BandSchema } from '../models/Band';
import { ValueSchema } from '../models/Value'
import { VenueSchema } from '../models/Venue';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Bands = mongoose.model('Band', BandSchema)
  Venues = mongoose.model('Venue', VenueSchema)

  // NOTE COMMENT THIS BACK IN WHEN WE MAKE THE SCHEMA
  // Offers = mongoose.model('Offer', OfferSchema)
}

export const dbContext = new DbContext()
