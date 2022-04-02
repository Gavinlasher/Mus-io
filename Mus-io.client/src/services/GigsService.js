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
    async deleteGig(id) {
        await api.delete('api/gigs/' + id)
        // AppState.gigs.filter(g => g.id !== id) TODO HOW TO DELETE SOMETHING FROM AN OBJECT
    }
    async editGig(id, body) {
        const res = await api.put('api/gigs/' + id, body)
        // AppState.gigs.filter(g => g.id !== id) TODO HOW TO DELETE SOMETHING FROM AN OBJECT
        // AppState.gigs = res.data
    }
}



export const gigsService = new GigsService()