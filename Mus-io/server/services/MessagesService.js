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
    return comment
  }
}
export const messagesService = new MessagessService()