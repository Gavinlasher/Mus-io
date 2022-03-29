
import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BandsService {
    async createBand(body) {
        const str = body.spotifyPlaylist
        const index = str.indexOf('/playlist/')
        const pId = str.slice(index + 10, index + 32)
        if (pId.length <= 22) {
            body.spotifyPlaylist = pId
        } else {
            body.spotifyPlaylist = '37i9dQZF1DXcBWIGoYBM5M'
            // throw new BadRequest('This is not a valid link, please check..')
        }
        const band = await dbContext.Bands.create(body)
        await band.populate('creator')
        return band
    }

    async getAllBands(query = {}) {
        const bands = await dbContext.Bands.find(query).populate('creator')
        return bands
    }

    async getBandById(id) {
        const band = await dbContext.Bands.findById(id).populate('creator')
        if (!band) {
            throw new BadRequest('No Band found at that ID')
        }
        return band
    }

    async editBand(update) {
        const original = await dbContext.Bands.findById(update.id)
        if (original.creatorId.toString() !== update.creatorId) {
            throw new Forbidden('You cannot edit this band')
        }
        original.name = update.name ? update.name : original.name
        original.bannerImg = update.bannerImg ? update.bannerImg : original.bannerImg
        original.bio = update.bio ? update.bio : original.bio
        original.spotify = update.spotify ? update.spotify : original.spotify
        original.basePrice = update.basePrice ? update.basePrice : original.basePrice
        original.genre = update.genre ? update.genre : original.genre
        original.writer = update.writer ? update.writer : original.writer
        original.spotifyPlaylist = update.spotifyPlaylist ? update.spotifyPlaylist : original.spotifyPlaylist

        await original.save()
        return original
    }

    async deleteBand(bandId, userId) {
        const doomedBand = await dbContext.Bands.findById(bandId)
        if (doomedBand.creatorId.toString() !== userId) {
            throw new Forbidden('You cannot delete this Band')
        }
        doomedBand.delete()
        return 'Delorted'
    }
}

export const bandsService = new BandsService()
