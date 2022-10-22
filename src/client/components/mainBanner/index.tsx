import { useWindowSize } from '@client/hooks'

import classNames from 'classnames/bind'
import styles from './style/MainBanner.module.css'
const cx = classNames.bind(styles)

export default function MainBanner() {
  const windowSize = useWindowSize()
  const isTablet = windowSize.width <= 1024
  const src = isTablet ? '/img/banner/mobile-banner.png' : '/img/banner/main-banner.png'

  return (
    <div className={cx('root')}>
      <div className={cx('img-wrapper')}>
        <img src={src} alt="연합 공연할 팀 모여라!" />
      </div>
      <h1>연합공연할 팀 모여라!</h1>
    </div>
  )
}
