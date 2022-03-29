import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class VenuesService {
    async getAll(query = "") {
        const res = await api.get('api/venues/' + query)
        logger.log(res.data)
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
        logger.log(res.data)
        AppState.activeVenue = res.data

    }
    async deleteVenue(id) {
        const res = await api.delete('api/venues/' + id)
        AppState.venues = AppState.venues.filter(b => b.id !== id)
    }
    async editVenue(body, id) {
        const res = await api.put('api/venues/' + id, body)
    }

    async getOffersVenue(venueId) {
        const res = await api.get('api/venues/' + venueId + '/offers')
        logger.log('this is getoffersvenue', res.data)
        AppState.recievedOffers[venueId] = res.data
        logger.log(AppState.recievedOffers, 'this is venue offers')
    }
}


export const venuesService = new VenuesService()