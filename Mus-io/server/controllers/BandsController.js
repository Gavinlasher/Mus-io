import { Auth0Provider } from "@bcwdev/auth0provider"
import { bandsService } from "../services/BandsService"
import { offersService } from "../services/OffersService"
import BaseController from "../utils/BaseController"



export class BandsController extends BaseController {
    constructor() {

        super('api/bands')
        this.router
            .get('', this.getAllBands)
            .get('/:id', this.getBandById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBand)
            .put('/:id', this.editBand)
            .delete('/:id', this.deleteBand)

    }

    async createBand(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const band = await bandsService.createBand(req.body)
            res.send(band)
        } catch (error) {
            next(error)
        }
    }
    async getAllBands(req, res, next) {
        try {
            const bands = await bandsService.getAllBands(req.query)
            res.send(bands)
        } catch (error) {
            next(error)
        }
    }
    async getBandById(req, res, next) {
        try {
            const band = await bandsService.getBandById(req.params.id)
            res.send(band)
        } catch (error) {
            next(error)
        }
    }

    async editBand(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const band = await bandsService.editBand(req.body)
            res.send(band)
        } catch (error) {
            next(error)
        }
    }

    async deleteBand(req, res, next) {
        try {
            const bandId = req.params.id
            const userId = req.userInfo.id
            const doomedBand = await bandsService.deleteBand(bandId, userId)
            res.send('Delorted')
        } catch (error) {
            next(error)
        }
    }
}