import classNames from 'classnames/bind'
import styles from '@components/CardFeed/style/CardFeed.module.css'
const cx = classNames.bind(styles)

export default function CardModal({ card }) {
  return (
    <div className={cx('modal')}>
      <div className={cx('header')}>
        <div className={cx('img-wrapper')}>
          <img className={cx('profile')} src={card?.profileImg} />
        </div>
        <div className={cx('info')}>
          <div className={cx('club-name')}>{card?.club?.name}</div>
          <div className={cx('place')}>{card?.place}</div>
          <div className={cx('date')}>희망 공연 날짜: {card?.date.slice(0, 10)}</div>
        </div>
      </div>
      <div className={cx('description')}>{card?.desc}</div>
      <div className={cx('footer')}>
        <button>연락 시작하기</button>
      </div>
    </div>
  )
}