import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('joined:room', this.joinedRoom)
      .on('new:message', this.newMessage)
      .on('new:notify', this.notification)
  }

  // OUTS
  joinRoom(roomName = 'general') {
    this.emit('join:room', { roomName })
    logger.log('this is emit', roomName)
  }
  //INS
  joinedRoom(payload) {
    logger.log('you have joined the room', payload.roomName)
  }

  newMessage(payload) {
    logger.log('[newMessage]', payload)
    AppState.messages.push(payload)
  }

  notification(payload) {
    logger.log('[notify]', payload)
    Pop.toast(`${payload.message}. <a href="/#/offers/${payload.offer.id}">Go check it out</a>`, 'info', 'top-end', 9000)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

}

export const socketService = new SocketService()
