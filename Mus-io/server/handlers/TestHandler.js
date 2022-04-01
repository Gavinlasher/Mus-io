import { SocketHandler } from '../utils/SocketHandler'
import { logger } from '../utils/Logger'

export class TestHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('SOCKET_TEST', this.testEvent)
      .on('join:room', this.joinRoom)
  }

  async testEvent(payload) {
    this.socket.emit('IS_TESTED', payload)
  }

  async joinRoom(payload) {
    logger.log('joined room from backend:', payload.roomName)
    this.socket.join(payload.roomName)
    this.socket.emit('joined room', payload)
  }
}
