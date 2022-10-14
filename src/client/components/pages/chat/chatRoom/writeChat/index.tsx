import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { createChatMutation } from '@client/shared/queries'
import { queryClient } from '@client/shared/react-query'

import classNames from 'classnames/bind'
import styles from '@components/pages/chat/style/Chat.module.css'
const cx = classNames.bind(styles)

export default function WriteChat({ oppositeUser, onSubmitHandler }) {
  const router = useRouter()
  const chatRoomId = parseInt(router.query.roomId as string)
  const [message, setMessage] = useState('')
  const { mutate } = useMutation(createChatMutation, {
    onSuccess: () => {
      setMessage('')
      if (chatRoomId) {
        onSubmitHandler()
        queryClient.invalidateQueries(['chats', { roomId: chatRoomId }])
      }
    },
    onError: () => {
      alert('메시지 전송에 실패했습니다.')
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({
      toUserId: oppositeUser?.id,
      message,
    })
    setMessage('')
  }

  return (
    <div className={cx('write-chat')}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button type="submit">전송</button>
      </form>
    </div>
  )
}
