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

  async deleteVenue(body) {
    const venue = await dbContext.Venues.findById(body.id)
    if (venue.creatorId.toString() !== body.creatorId) {
      throw new BadRequest('not your venue to update')
    }
    await dbContext.Venues.findByIdAndDelete(body.id)
    return 'deleted'
  }

  async getAllVenues(query = {}) {
    const venues = await dbContext.Venues.find(query)
    return venues
  }

  async createVenue(body) {
    const venue = await dbContext.Venues.create(body)
    return venue
  }

  async getById(id) {
    const venue = await dbContext.Venues.findById(id)
    return venue
  }
}

export const venuesService = new VenuesService()
