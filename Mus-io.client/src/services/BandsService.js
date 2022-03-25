import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BandsService {
    async getAll(query = "") {
        const res = await api.get('api/bands/' + query)
        logger.log(res.data)
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

    async getOffersBand(band) {
        // logger.log("this is offersband", id)
        const res = await api.get('api/bands/' + band + '/offers')
        logger.log("getting offers for the band", res.data)
        // AppState.offers = res.data
    }

    setActive(band) {
        logger.log(band)
        // const res = await api.get('api/bands/' + band.id + '/offers')
        AppState.activeBand = band
    }

}


export const bandsService = new BandsService()