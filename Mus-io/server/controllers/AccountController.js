import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { offersService } from '../services/OffersService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/offers', this.getAll)
      .put('', this.editUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const account = await accountService.updateAccount(req.userInfo, req.body)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const offers = await offersService.getAllMyOffers({ creatorId: req.userInfo.id })
      res.send(offers)
    } catch (error) {
      next(error)
    }
  }
}
