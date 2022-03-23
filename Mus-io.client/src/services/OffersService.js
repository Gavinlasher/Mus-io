import { api } from "./AxiosService"

class OffersService {
    async getMyOffers(){
        const res = await api.get('account/offers')
        AppState.offers = res.data
        
    }
    async createOffer(body){
        const res = await api.post('api/offers', body)
        AppState.activeOffer = res.data
        AppState.offers = [...AppState.offers, res.data]
    }
    async getOffersByVenueId(venueId){
        const res = await api.get('api/venues/'+ venueId + '/offers')
        AppState.offers = res.data
        
    }
    async getOffersByBandId(bandId){
        const res = await api.get('api/bands/'+ bandId + '/offers')
        AppState.offers = res.data
        
    }
    async deleteOffer(id){
        const res = await api.delete('api/offers/' + id)
        AppState.offers = AppState.offers.filter(o => o.id !== id)
    }
    async editOffer(body, id){
        const res = await api.put('api/offers/' + id, body)
    }
}


export const offersService = new OffersService()