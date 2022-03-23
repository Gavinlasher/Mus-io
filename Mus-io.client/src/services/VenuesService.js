import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class VenuesService {
    async getAll(query = "") {
        const res = await api.get('api/venues/' + query)
        AppState.venues = res.data

    }
    async createVenue(body) {
        const res = await api.post('api/venues', body)
        logger.log(res.data)
        AppState.activeVenue = res.data
        AppState.venues = [...AppState.venues, res.data]
    }
    async getVenueById(id) {
        const res = await api.get('api/venues/' + id)
        AppState.activeVenue = res.data

    }
    async deleteVenue(id) {
        const res = await api.delete('api/venues/' + id)
        AppState.venues = AppState.venues.filter(b => b.id !== id)
    }
    async editVenue(body, id) {
        const res = await api.put('api/venues/' + id, body)
    }
}


export const venuesService = new VenuesService()