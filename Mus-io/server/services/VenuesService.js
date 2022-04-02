import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class VenuesService {
  async editVenue(update) {
    const original = await dbContext.Venues.findById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest('not your venue to update')
    }
    original.name = update.name ? update.name : original.name
    original.bannerImg = update.bannerImg ? update.bannerImg : original.bannerImg
    original.bio = update.bio ? update.bio : original.bio
    original.budget = update.budget ? update.budget : original.budget
    original.capacity = update.capacity ? update.capacity : original.capacity
    original.location = update.location ? update.location : original.location
    original.save()
    return original
  }

  async deleteVenue(v, userId) {
    const venue = await dbContext.Venues.findById(v)
    const allOffers = await dbContext.Offers.deleteMany({ venueId: v })
    const allGigs = await dbContext.Gigs.deleteMany({ venueId: v })
    const allMessages = await dbContext.Messages.deleteMany({ venueId: v })
    if (venue.creatorId.toString() !== userId) {
      throw new BadRequest('not your venue to update')
    }
    venue.delete()
    return 'deleted'
  }

  async getAllVenues(query = {}) {
    let searchReg = new RegExp(query.search, 'ig')
    const venues = await dbContext.Venues.find({ name: { $regex: searchReg } }).populate('creator')
    return venues
  }

  async createVenue(body) {
    const venue = await dbContext.Venues.create(body)
    await venue.populate('creator')
    return venue
  }

  async getById(id) {
    const venue = await dbContext.Venues.findById(id).populate('creator')
    return venue
  }
}

export const venuesService = new VenuesService()
