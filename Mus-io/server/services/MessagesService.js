import { dbContext } from "../db/DbContext"
import { socketProvider } from "../SocketProvider"

class MessagessService {

  async getMessages(id) {
    const messages = await dbContext.Messages.find({ offerId: id }).populate('creator').populate('offer')
    return messages
  }
  async createMessage(body) {
    const comment = await dbContext.Messages.create(body)
    await comment.populate('creator')
    await comment.populate('offer')
    socketProvider.messageRoom('offer-' + body.offerId, 'new:message', comment)
    const offerNotify = await dbContext.Offers.findById(body.offerId)
    socketProvider.messageUser(offerNotify.creatorId.toString(), 'new:notify', { message: `${comment.creator.name}} just messaged you`, offerNotify })
    return comment
  }
}
export const messagesService = new MessagessService()