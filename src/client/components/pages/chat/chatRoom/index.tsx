import Link from 'next/link'
import ChatRoomBody from './body'
import OpositeUserInfo from './oppositeUserInfo'
import ProfileImg from '@components/profileImg'
import { BsChevronLeft, BsInfoCircle, BsFillInfoCircleFill } from 'react-icons/bs'

import { useRef, useState, useEffect } from 'react'
import { useAccount } from '@client/hooks'

import classNames from 'classnames/bind'
import styles from '@components/pages/chat/style/Chat.module.css'
const cx = classNames.bind(styles)

export default function ChatRoom({ chatRoom, isMobile = false }) {
  const { me } = useAccount()
  const [showInfo, setShowInfo] = useState(false)
  const chatRoomId = chatRoom?.id
  const oppositeUser = chatRoom?.users?.find(user => user.id !== me?.id)

  return (
    <div id="chat-room" className={cx('chat-room')}>
      <div className={cx('header')}>
        <div className={cx('head')}>
          {isMobile && (
            <Link href="/chat/">
              <button className={cx('back-button')}>
                <BsChevronLeft size={20} />
              </button>
            </Link>
          )}
          <ProfileImg src={oppositeUser?.profileImg} size={30} />
          <div className={cx('username')}>{oppositeUser?.name}</div>
        </div>
        <div className={cx('tail')}>
          <button onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? <BsFillInfoCircleFill size={20} /> : <BsInfoCircle size={20} />}
          </button>
        </div>
      </div>
      {showInfo ? (
        <OpositeUserInfo oppositeUserId={oppositeUser?.id} />
      ) : (
        <ChatRoomBody {...{ oppositeUser, chatRoomId }} />
      )}
    </div>
  )
}
