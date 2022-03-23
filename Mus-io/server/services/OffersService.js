import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class OffersService {

    async createOffer(body) {
        const offer = await dbContext.Offers.create(body)
        await offer.populate('creator').populate('band').populate('venue')
    }

    async editOffer(update) {
        const original = await dbContext.Offers.findById(update.id)
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
}

export const offersService = new OffersService()