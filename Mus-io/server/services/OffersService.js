import { dbContext } from '../db/DbContext'

class OffersService {
  async getAllMyOffers(query) {
    const offers = await dbContext.Offers.find(query).populate('creator').populate('venue').populate('band')
    return offers
  }
}

export const offersService = new OffersService()
