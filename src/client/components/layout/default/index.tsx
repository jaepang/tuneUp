import NavBar from '@components/layout/shared/navbar'

import { useWindowSize } from '@client/hooks'

import classNames from 'classnames/bind'
import styles from './style/Layout.module.css'
const cx = classNames.bind(styles)

export default function Layout({ children, shouldHideNavBarOnMobile = false }) {
  const { width } = useWindowSize()
  const isMobile = width <= 767

  return (
    <div className={cx('layout')}>
      {!(isMobile && shouldHideNavBarOnMobile) && <NavBar />}
      <div className={cx('content-wrapper')}>{children}</div>
    </div>
  )
}
