import { dbContext } from "../db/DbContext"
import { Forbidden, NotFound } from "../utils/Errors"



class GigsService {

    async getGigById(id) {
        const gig = await dbContext.Gigs.findById(id).populate('creator').populate('band').populate('venue')
        return gig
    }
    async getGigsByBandId(id) {
        const gig = await dbContext.Gigs.find(id).populate('creator').populate('band').populate('venue')
        return gig
    }
    async getGigsByVenueId(id) {
        const gig = await dbContext.Gigs.find(id).populate('creator').populate('band').populate('venue')
        return gig
    }
    async createGig(body) {
        if (body.startDate < new Date()) {
            throw new Forbidden("You can't make a date in the past")
        }
        const gig = await dbContext.Gigs.create(body)
        await gig.populate('creator')
        await gig.populate('band')
        await gig.populate('venue')
        return gig
    }

    async editGig(update) {
        const original = await dbContext.Gigs.findById(update.id)
        if (!original) {
            throw new NotFound("There was no Gig at this id")
        }
        if (original.creatorId.toString() !== update.creatorId) {
            throw new Forbidden("You cannot update this Offer")
        }
        if (update.startDate < new Date()) {
            throw new Forbidden("You can't make a date in the past")
        }

        original.venueId = update.venueId ? update.venueId : original.venueId
        original.bandId = update.bandId ? update.bandId : original.bandId
        original.startDate = update.startDate ? update.startDate : original.startDate


        await original.save()
        return original
    }
    async deleteGig(id, userId) {
        const doomedGig = await dbContext.Gigs.findById(id)
        if (doomedGig.creatorId.toString() !== userId) {
            throw new Forbidden('You cannot delete this Gig')
        }
        doomedGig.delete()
        return "Delorted"
    }

    async getMyGigs(query) {
        const gigs = await dbContext.Gigs.find(query).populate('creator').populate('venue').populate('band')
        return gigs
    }

}

export const gigsService = new GigsService()