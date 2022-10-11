import classNames from 'classnames/bind'
import styles from '@components/Card/style/Card.module.css'
const cx = classNames.bind(styles)

export default function Card({ card }) {
  return (
    <div className={cx('root')}>
      <div className={cx('header')}>
        <div className={cx('profile-wrapper')}>
          <img className={cx('profile')} src={card?.profile} />
        </div>
        <div className={cx('place')}>{card?.place}</div>
      </div>
      <div className={cx('club-name')}>{card?.clubName}</div>
      <div className={cx('content')}>{card?.content}</div>
      <div className={cx('footer')}>
        <div className={cx('date')}>{card?.date}</div>
      </div>
    </div>
  )
}
