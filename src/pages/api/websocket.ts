import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server, {
      transports: ['websocket'],
    })
    res.socket.server.io = io
    io.on('connection', socket => {
      socket.on('submit', msg => {
        socket.broadcast.emit('update-chat', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler
