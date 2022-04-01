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
  }

  // OUTS
  joinRoom(roomName = 'general') {
    this.emit('join:room', { roomName })
  }
  //INS
  joinedRoom(payload) {
    logger.log('you have joined the room', payload.roomName)
  }

  newMessage(payload) {
    logger.log('[newMessage]', payload)
    AppState.messages.push(payload)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

}

export const socketService = new SocketService()
