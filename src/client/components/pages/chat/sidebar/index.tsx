import { useRouter } from 'next/router'
import { useAccount } from '@client/hooks'

import classNames from 'classnames/bind'
import styles from '@components/pages/chat/style/Chat.module.css'
const cx = classNames.bind(styles)

export default function Sidebar({ chatRoomsLoading, chatRooms }) {
  const router = useRouter()
  const { me } = useAccount()
  const chatRoomId = parseInt(router.query.roomId as string)

  return (
    <div className={cx('sidebar')}>
      <div className={cx('me')}>
        <div className={cx('me-name')}>{me?.name}</div>
      </div>
      {!chatRoomsLoading && chatRooms?.length > 0 && (
        <>
          {chatRooms?.map(chatRoom => {
            const opositeUser = chatRoom.users.find(user => user.id !== me?.id)
            return (
              <div
                key={chatRoom.id}
                className={cx('section', {
                  active: chatRoom.id === chatRoomId,
                })}
                onClick={() => router.push(`/chat/${chatRoom.id}`)}>
                <div className={cx('profile-img-wrapper')}>
                  <img className={cx('profile-img')} src={opositeUser?.profileImg} />
                </div>
                <div className={cx('username')}>{opositeUser?.name}</div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
