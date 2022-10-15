import { useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import { queryClient } from '@client/shared/react-query'

export function useReactQuerySubscription(chatRoomId: number) {
  let socket: Socket
  async function initSocket() {
    socket = io('http://localhost:8080', {
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })

    socket.on('update-chat', msg => {
      const { chatRoomId: roomId } = msg
      if (roomId === chatRoomId) {
        queryClient.invalidateQueries(['chats', { roomId }])
      }
    })
  }

  useEffect(() => {
    initSocket()
  })

  const onSubmitHandler = () => {
    socket.emit('submit', { chatRoomId })
  }

  return {
    onSubmitHandler,
  }
}
