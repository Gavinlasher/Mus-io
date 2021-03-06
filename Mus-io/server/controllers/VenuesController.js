import { Auth0Provider } from '@bcwdev/auth0provider'
import { gigsService } from '../services/GigsService'
import { offersService } from '../services/OffersService'
import { venuesService } from '../services/VenuesService'
import BaseController from '../utils/BaseController'

export class VenuesController extends BaseController {
  constructor() {
    super('api/venues')
    this.router
      .get('', this.getAllVenues)
      .get('/:id', this.getById)
      .get('/:id/gigs', this.getGigsByVenueId)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/offers', this.getOffersByVenueId)
      .post('', this.createVenue)
      .delete('/:id', this.deleteVenue)
      .put('/:id', this.editVenue)
  }

  async createVenue(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const venue = await venuesService.createVenue(req.body)
      res.send(venue)
    } catch (error) {
      next(error)
    }
  }

  async getAllVenues(req, res, next) {
    try {
      const venues = await venuesService.getAllVenues(req.query)
      res.send(venues)
    } catch (error) {
      next(error)
    }
  }

  async getGigsByVenueId(req, res, next) {
    try {
      const gig = await gigsService.getGigsByVenueId({ venueId: req.params.id })
      return res.send(gig)
    } catch (error) {
      next(error)
    }
  }

  async getOffersByVenueId(req, res, next) {
    try {
      let userId = req.userInfo.id
      const offers = await offersService.getOffersByVenueId(req.params.id, userId)
      res.send(offers)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      req.body.id = req.params.id
      const venue = await venuesService.getById(req.params.id)
      res.send(venue)
    } catch (error) {
      next(error)
    }
  }

  async deleteVenue(req, res, next) {
    try {
      const venueId = req.params.id
      const userId = req.userInfo.id
      const venue = await venuesService.deleteVenue(venueId, userId)
      res.send(venue)
    } catch (error) {
      next(error)
    }
  }

  async editVenue(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const venue = await venuesService.editVenue(req.body)
      res.send(venue)
    } catch (error) {
      next(error)
    }
  }
}
