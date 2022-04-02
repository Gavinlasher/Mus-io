import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class GigsService {
    async createGig(body) {
        const res = await api.post('api/gigs', body)
        logger.log(res.data)
        AppState.gigs = [...AppState.gigs, res.data]
    }
    async getGigsByBand(id) {
        const res = await api.get('api/bands/' + id + '/gigs')
        logger.log("gigs for this band...", res.data)
        AppState.gigs[id] = res.data
    }
    async getGigsByVenue(id) {
        const res = await api.get('api/venues/' + id + '/gigs')
        logger.log("gigs for this band...", res.data)
        AppState.gigs[id] = res.data
    }
    async deleteGig(id, objId) {
        await api.delete('api/gigs/' + id)
        AppState.gigs[objId].filter(g => g.id !== id)
    }
    async editGig(id, objId, body) {
        logger.log("id is...", id)
        logger.log('objId is...', objId)
        logger.log('body is...', body)
        const res = await api.put('api/gigs/' + id, body)
        AppState.gigs[objId] = AppState.gigs[objId].filter(g => g.id !== id)
        let gigId = body.venueId !== undefined ? body.venueId : body.bandId
        AppState.gigs[gigId] = AppState.gigs[gigId] ? [...AppState.gigs[gigId], res.data,] : [res.data]
        logger.log("edited gig...", res.data)
    }
}



export const gigsService = new GigsService()