import Row from '@components/layout/shared/row'
import classNames from 'classnames/bind'
import styles from '@components/MainBanner/style/MainBanner.module.css'
const cx = classNames.bind(styles)

export default function MainBanner() {
  return (
    <div className={cx('root')}>
      <div className={cx('img-wrapper')}>
        <img src="/img/banner/main-banner.png" alt="연합 공연할 팀 모여라!" />
      </div>
      <h1>연합공연할 팀 모여라!</h1>
    </div>
  )
}
