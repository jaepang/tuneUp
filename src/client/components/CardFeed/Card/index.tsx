import Modal from '@components/modal'
import CardModal from './modal'

import { useState } from 'react'

import classNames from 'classnames/bind'
import styles from '@components/CardFeed/style/CardFeed.module.css'
const cx = classNames.bind(styles)

export default function Card({ card }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={cx('card')} onClick={() => setIsModalOpen(true)}>
      <div className={cx('header')}>
        <div className={cx('profile-section')}>
          <div className={cx('img-wrapper')}>
            <img className={cx('profile')} src={card?.profileImg} />
          </div>
          <div className={cx('club-name')}>{card?.club?.name}</div>
        </div>
        <div className={cx('place')}>{card?.place}</div>
      </div>
      <div className={cx('description')}>{card?.desc}</div>
      <div className={cx('footer')}>
        <div className={cx('date')}>희망 공연 날짜: {card?.date.slice(0, 10)}</div>
      </div>
      <Modal onClose={() => setIsModalOpen(false)}>{isModalOpen && <CardModal {...{ card }} />}</Modal>
    </div>
  )
}
