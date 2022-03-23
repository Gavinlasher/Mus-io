import { AppState } from "../AppState"
import { api } from "./AxiosService"

class BandsService {
    async getAll(query = ""){
        const res = await api.get('api/bands/' + query)
        AppState.bands = res.data
        
    }
    async createBand(body){
        const res = await api.post('api/bands', body)
        AppState.activeBand = res.data
        AppState.bands = [...AppState.bands, res.data]
    }
    async getBandById(id){
        const res = await api.get('api/bands/'+id)
        AppState.activeBand = res.data
        
    }
    async deleteBand(id){
        const res = await api.delete('api/bands/' + id)
        AppState.bands = AppState.bands.filter(b => b.id !== id)
    }
    async editBand(body, id){
        const res = await api.put('api/bands/' + id, body)
    }

}


export const bandsService = new BandsService()