import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BandsService {
    async getAll(query = "") {
        logger.log(query)
        const res = await api.get('api/bands' + query)
        logger.log("Bands are...", res.data)
        AppState.bands = res.data

    }
    async createBand(body) {
        const res = await api.post('api/bands', body)
        logger.log(res.data)
        AppState.activeBand = res.data
        AppState.bands = [...AppState.bands, res.data]
    }
    async getBandById(id) {
        const res = await api.get('api/bands/' + id)
        logger.log(res.data)
        AppState.activeBand = res.data

    }
    async deleteBand(id) {
        const res = await api.delete('api/bands/' + id)
        AppState.bands = AppState.bands.filter(b => b.id !== id)
    }
    async editBand(body, id) {
        const res = await api.put('api/bands/' + id, body)
    }

    async getOffersBand(bandId) {
        // logger.log("this is offersband", id)
        const res = await api.get('api/bands/' + bandId + '/offers')
        logger.log("getting offers for the band", res.data)
        // AppState.offers = res.data
        AppState.recievedOffers[bandId] = res.data
        logger.log(AppState.recievedOffers, 'hell world this is offers')
        // AppState.recievedOffers.push(res.data)
    }

    async filter(genre) {
        logger.log("genre is...")
        const res = await api.get('api/bands?genre=' + genre)
        AppState.bands = res.data
    }

}


export const bandsService = new BandsService()