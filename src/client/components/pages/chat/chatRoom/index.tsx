import WriteChat from './writeChat'

import { useAccount, useReactQuerySubscription } from '@client/hooks'
import { useInfiniteQuery, useQuery } from 'react-query'
import { chatsQuery } from '@client/shared/queries'

import classNames from 'classnames/bind'
import styles from '@components/pages/chat/style/Chat.module.css'
const cx = classNames.bind(styles)

export default function ChatRoom({ chatRoom }) {
  const { me } = useAccount()
  const chatRoomId = chatRoom?.id
  const oppositeUser = chatRoom?.users.find(user => user.id !== me?.id)
  const { onSubmitHandler } = useReactQuerySubscription(chatRoomId)

  const { data: chatsData, isLoading: chatsLoading } = useQuery(['chats', { roomId: chatRoomId }], chatsQuery, {
    enabled: !!me && !!chatRoomId,
    staleTime: Infinity,
  })
  const chats = chatsData?.chats

  return (
    <div className={cx('chat-room')}>
      <div className={cx('header')}>
        <div className={cx('profile-img-wrapper')}>
          <img className={cx('profile-img')} src={oppositeUser?.profileImg} />
        </div>
        <div className={cx('username')}>{oppositeUser?.name}</div>
      </div>
      {!chatsLoading && chats?.length > 0 && (
        <div className={cx('chats-wrapper')}>
          <div className={cx('dummy')} />
          {chats?.map(chat => (
            <div key={chat.id} className={cx('chat')}>
              <div
                className={cx('message-wrapper', {
                  my: chat.user.id === me?.id,
                })}>
                <div className={cx('message')}>{chat.message}</div>
              </div>
            </div>
          ))}
          <div className={cx('dummy')} />
        </div>
      )}
      <WriteChat {...{ oppositeUser, onSubmitHandler }} />
    </div>
  )
}
