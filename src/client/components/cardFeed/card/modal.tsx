import ProfileImg from '@components/profileImg'
import { BsClock, BsMap, BsCashCoin } from 'react-icons/bs'

import { useRouter } from 'next/router'
import { useAccount } from '@client/hooks'
import { useMutation } from 'react-query'
import { createChatRoomMutation } from '@client/shared/queries'

import classNames from 'classnames/bind'
import styles from '@components/cardFeed/style/CardFeed.module.css'
const cx = classNames.bind(styles)

export default function CardModal({ card }) {
  const router = useRouter()
  const { me } = useAccount()
  const { mutate } = useMutation(createChatRoomMutation, {
    onSuccess: data => {
      const chatRoomId = data?.createChatRoom?.id
      router.push(`/chat/${chatRoomId}`)
    },
    onError: () => {
      console.log('채팅 생성에 실패했습니다.')
    },
  })

  function handleCreateChat() {
    if (me?.id !== card?.user?.id) {
      mutate({
        toUserId: card?.club?.id,
      })
    }
  }

  return (
    <div className={cx('modal')}>
      <div className={cx('header')}>
        <ProfileImg src={card?.club?.profileImg} size={75} />
        <div className={cx('info')}>
          <div className={cx('club-name')}>{card?.club?.name}</div>
          <div className={cx('item')}>
            <BsMap size={15} />
            {card?.place}
          </div>
          <div className={cx('item')}>
            <BsClock size={15} />
            {card?.date.slice(0, 10)}
          </div>
          <div className={cx('item')}>
            <BsCashCoin size={15} />
            예산: {card?.budget}만원
          </div>
        </div>
      </div>
      <div className={cx('description')}>{card?.desc}</div>
      <div className={cx('footer')}>
        <button onClick={handleCreateChat}>연락 시작하기</button>
      </div>
    </div>
  )
}
