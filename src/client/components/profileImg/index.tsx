import classNames from 'classnames/bind'
import styles from './style/ProfileImg.module.css'
const cx = classNames.bind(styles)

export default function ProgileImg({ src, size = 40 }) {
  return (
    <div style={{ minWidth: `${size}px`, minHeight: `${size}px` }} className={cx('profile-img-wrapper')}>
      <img className={cx('profile-img')} src={src} />
    </div>
  )
}
