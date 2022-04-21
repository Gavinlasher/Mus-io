import { AppState } from "../AppState"
import { api } from "./AxiosService"

class GigsService {
    async createGig(body) {
        const res = await api.post('api/gigs', body)
        let gigId = body.venueId !== undefined ? body.venueId : body.bandId
        AppState.gigs[gigId] = AppState.gigs[gigId] ? [...AppState.gigs[gigId], res.data,] : [res.data]
    }
    async getGigsByBand(id) {
        const res = await api.get('api/bands/' + id + '/gigs')
        AppState.gigs[id] = res.data
    }
    async getGigsByVenue(id) {
        const res = await api.get('api/venues/' + id + '/gigs')
        AppState.gigs[id] = res.data
    }
    async deleteGig(id, objId) {
        await api.delete('api/gigs/' + id)
        AppState.gigs[objId].filter(g => g.id !== id)
    }
    async editGig(id, objId, body) {
        const res = await api.put('api/gigs/' + id, body)
        AppState.gigs[objId] = AppState.gigs[objId].filter(g => g.id !== id)
        let gigId = body.venueId !== undefined ? body.venueId : body.bandId
        AppState.gigs[gigId] = AppState.gigs[gigId] ? [...AppState.gigs[gigId], res.data,] : [res.data]
    }
}



export const gigsService = new GigsService()