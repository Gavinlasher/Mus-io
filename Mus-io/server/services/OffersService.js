import { dbContext } from "../db/DbContext"
import { Forbidden, NotFound } from "../utils/Errors"


class OffersService {

    async createOffer(body) {
        const offer = await dbContext.Offers.create(body)
        await offer.populate('creator')
        await offer.populate('band')
        await offer.populate('venue')
        return offer
    }

    async getOfferById(id) {
        const offer = await dbContext.Offers.findById(id)
        if (!offer) {
            throw new NotFound("There is no offer with this id")
        }
        return offer
    }

    async editOffer(update) {
        const original = await dbContext.Offers.findById(update.id)
        if (!original) {
            throw new NotFound("There was no Offer at this id")
        }
        if (original.creatorId.toString() !== update.creatorId) {
            throw new Forbidden("You cannot update this Offer")
        }

        original.body = update.body ? update.body : original.body
        original.status = update.status ? update.status : original.status

        await original.save()
        return original
    }

    async deleteOffer(offerId, userId) {
        const doomedOffer = await dbContext.Offers.findById(offerId)
        if (doomedOffer.creatorId.toString() !== userId) {
            throw new Forbidden('You cannot delete this Offer')
        }
        doomedOffer.delete()
        return "Delorted"
    }

    async getAllMyOffers(query) {
        const offers = await dbContext.Offers.find(query).populate('creator').populate('venue').populate('band')
        return offers
    }
}
export const offersService = new OffersService()