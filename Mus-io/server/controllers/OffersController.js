import { dbContext } from "../db/DbContext";
import { offersService } from "../services/OffersService";
import BaseController from "../utils/BaseController";


export class OffersController extends BaseController {
    constructor() {
        super('api/offers')
        this.router
            .post('', this.createOffer)
            .put('/:id', this.editOffer)
            .delete('/:id', this.deleteOffer)
    }

    async createOffer(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const offer = await offersService.createOffer(req.body)
            res.send(offer)
        } catch (error) {
            next(error)
        }
    }

    async editOffer(req, res, next) {
        try {
            const offer = await offersService.editOffer(req.body)
            res.send(offer)
        } catch (error) {
            next(error)
        }
    }

    async deleteOffer(req, res, next) {
        try {
            const doomedOffer = await offersService.deleteOffer(req.params.id, req.userInfo.id)
            res.send(doomedOffer)
        } catch (error) {
            next(error)
        }
    }


}