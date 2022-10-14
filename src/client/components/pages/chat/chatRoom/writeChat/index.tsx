import { useRouter } from 'next/router'
import React, { useState } from 'react'
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
  const [textareaRows, setTextareaRows] = useState(1)

  const { mutate } = useMutation(createChatMutation, {
    onSuccess: () => {
      setMessage('')
      setTextareaRows(1)
      if (chatRoomId) {
        onSubmitHandler()
        queryClient.invalidateQueries(['chats', { roomId: chatRoomId }])
      }
    },
    onError: () => {
      alert('메시지 전송에 실패했습니다.')
    },
  })

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target
    setMessage(value)
    setTextareaRows(Math.min(value.split('\n').length, 5))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      mutate({
        toUserId: oppositeUser?.id,
        message,
      })
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({
      toUserId: oppositeUser?.id,
      message,
    })
  }

  return (
    <form onSubmit={handleSubmit} className={cx('write-chat', { 'over-five-rows': textareaRows >= 5 })}>
      <textarea
        value={message}
        rows={textareaRows}
        className={cx('textarea', {
          rows5: textareaRows === 5,
        })}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요"
      />
      {message.length > 0 && <button type="submit">전송</button>}
    </form>
  )
}
