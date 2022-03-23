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
            const offer = await offersService.createOffer(req.body)
            res.send(offer)
        } catch (error) {
            next(error)
        }
    }

    async editOffer(req, res, next) {
        try {
            const offer = await offersService.editOffer(req.body, req.userInfo.id)
            res.send(offer)
        } catch (error) {
            next(error)
        }
    }


}