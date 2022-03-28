
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfilesService {
    async getProfile(id){
        const res = await api.get('api/profiles/'+id)
        logger.log(res.data)
        AppState.profile = res.data
    }
}

export const profilesService = new ProfilesService()