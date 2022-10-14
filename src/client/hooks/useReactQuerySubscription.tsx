import { useEffect } from 'react'
import io from 'Socket.IO-client'
import { queryClient } from '@client/shared/react-query'

export function useReactQuerySubscription(chatRoomId: number) {
  let socket
  async function initSocket() {
    await fetch('/api/websocket')
    socket = io()

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
