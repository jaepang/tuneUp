import Link from 'next/link'
import Modal from '@components/modal'
import ExploreModal from './modal'
import { BsChevronLeft, BsPencilSquare } from 'react-icons/bs'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAccount } from '@client/hooks'
import { useWindowSize } from '@client/hooks'

import classNames from 'classnames/bind'
import styles from '@components/pages/chat/style/Chat.module.css'
const cx = classNames.bind(styles)

export default function Sidebar({ chatRoomsLoading, chatRooms }) {
  const router = useRouter()
  const { me } = useAccount()
  const chatRoomId = parseInt(router.query.roomId as string)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { width } = useWindowSize()
  const isMobile = width <= 767

  return (
    <div className={cx('sidebar')}>
      <div className={cx('header')}>
        {isMobile && (
          <Link href="/">
            <button className={cx('back-button')}>
              <BsChevronLeft size={20} />
            </button>
          </Link>
        )}
        <div className={cx('me-name')}>{me?.name}</div>
        <div className={cx('new-chat')}>
          <button onClick={() => setIsModalOpen(!isModalOpen)}>
            <BsPencilSquare size={20} />
          </button>
          <Modal onClose={() => setIsModalOpen(false)}>{isModalOpen && <ExploreModal />}</Modal>
        </div>
      </div>
      {!chatRoomsLoading && chatRooms?.length > 0 && (
        <>
          {chatRooms?.map(chatRoom => {
            const oppositeUser = chatRoom.users.find(user => user.id !== me?.id)
            const unread = chatRoom.chats.length > 0
            return (
              <Link key={chatRoom.id} href={`/chat/${chatRoom.id}`}>
                <div
                  className={cx('section', {
                    active: chatRoom.id === chatRoomId,
                    unread,
                  })}>
                  <div className={cx('profile-img-wrapper')}>
                    <img className={cx('profile-img')} src={oppositeUser?.profileImg} />
                  </div>
                  <div className={cx('username')}>{oppositeUser?.name}</div>
                  {unread && <div className={cx('unread-dot')} />}
                </div>
              </Link>
            )
          })}
        </>
      )}
    </div>
  )
}
