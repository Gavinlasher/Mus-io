import { Auth0Provider } from "@bcwdev/auth0provider";
import { gigsService } from "../services/GigsService";
import BaseController from "../utils/BaseController";



export class GigsController extends BaseController {
    constructor() {
        super('api/gigs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:id', this.getGigById)
            .post('', this.createGig)
            .put('/:id', this.editGig)
            .delete('/:id', this.deleteGig)
    }

    async getGigById(req, res, next) {
        try {
            const gig = await gigsService.getGigById(req.params.id)
            return res.send(gig)
        } catch (error) {
            next(error)
        }


    }

    async createGig(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const gig = await gigsService.createGig(req.body)
            return res.send(gig)
        } catch (error) {
            next(error)
        }
    }

    async editGig(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const gig = await gigsService.editGig(req.body)
            return res.send(gig)
        } catch (error) {
            next(error)
        }
    }
    async deleteGig(req, res, next) {
        try {
            const doomedGig = await gigsService.deleteGig(req.params.id, req.userInfo.id)
            return res.send("Gig Deleted")
        } catch (error) {
            next(error)
        }
    }

}