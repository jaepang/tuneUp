import { useWindowSize } from '@client/hooks'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { PATHNAME } from '@client/consts'

import classNames from 'classnames/bind'
import styles from './style/NavBar.module.css'
const cx = classNames.bind(styles)
const AccountMenu = dynamic(() => import('./AccountMenu'), { ssr: false })

export default function NavBar() {
  const windowSize = useWindowSize()
  const isMobile = windowSize.width <= 767

  return (
    <div className={cx('navbar')}>
      <div className={cx('content-wrapper')}>
        <div className={cx('left-area')}>
          <Link href={PATHNAME.HOME}>
            <a className={cx('logo-wrapper')}>
              <img src="/img/logo/logo.png" alt="HOME" height={30} />
            </a>
          </Link>
        </div>

        {/** TODO: SEARCH BAR */}
        {!isMobile && <div></div>}

        <AccountMenu />
      </div>
    </div>
  )
}
