import { useWindowSize } from '@client/hooks'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { PATHNAME } from '@client/consts'

import classNames from 'classnames/bind'
import styles from '@styles/components/layout/shared/NavBar.module.css'
const cx = classNames.bind(styles)
const AccountMenu = dynamic(() => import('./AccountMenu'), { ssr: false })

export default function NavBar() {
  const windowSize = useWindowSize()
  const isMobile = windowSize.width <= 1024

  return (
    <div className={cx('navbar')}>
      <div className={cx('content-wrapper')}>
        <div className={cx('left-area')}>
          <Link href={PATHNAME.HOME}>
            <a>logo</a>
          </Link>
        </div>

        {/** TODO: SEARCH BAR */}
        {!isMobile && <div></div>}

        <AccountMenu />
      </div>
    </div>
  )
}
