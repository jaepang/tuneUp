import Sidebar from './sidebar'
import ChatRoom from './chatRoom'

import { useRouter } from 'next/router'
import { useAccount } from '@client/hooks'
import { useQuery } from 'react-query'
import { chatRoomsQuery } from '@client/shared/queries'
import { useWindowSize } from '@client/hooks'

import classNames from 'classnames/bind'
import styles from './style/Chat.module.css'
const cx = classNames.bind(styles)

export default function ChatRoomsComponent() {
  const router = useRouter()
  const { me } = useAccount()
  const chatRoomId = parseInt(router.query.roomId as string)

  const { width } = useWindowSize()
  const isMobile = width <= 767
  const isMobileMenu = isMobile && !chatRoomId
  const isMobileChat = isMobile && chatRoomId

  const { data: chatRoomsData, isLoading: chatRoomsLoading } = useQuery('chatRooms', chatRoomsQuery, {
    enabled: !!me,
  })
  const chatRooms = chatRoomsData?.chatRooms
  const currentChatRoom = chatRooms?.find(chatRoom => chatRoom.id === chatRoomId)

  return (
    <div className={cx('root')}>
      <div className={cx('contents-wrapper')}>
        {(!isMobile || isMobileMenu) && <Sidebar {...{ chatRoomsLoading, chatRooms }} />}
        {!isNaN(chatRoomId) && (!isMobile || isMobileChat) && (
          <ChatRoom isMobile={isMobile} chatRoom={currentChatRoom} />
        )}
      </div>
    </div>
  )
}
