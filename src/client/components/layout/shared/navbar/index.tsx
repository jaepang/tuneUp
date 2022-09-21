import { useWindowSize } from '@client/hooks'
import Link from 'next/link'
import { PATHNAME } from '@client/consts'
import { getParameterizedPath } from '@client/utils'

import { IoChatbubblesOutline } from 'react-icons/io5'
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'

import classNames from 'classnames/bind'
import styles from '@styles/components/layout/shared/NavBar.module.css'
const cx = classNames.bind(styles)

export default function NavBar() {
  const windowSize = useWindowSize()
  const isMobile = windowSize.width <= 1024

  return (
    <div className={cx('navbar')}>
      <div className={cx('content-wrapper')}>
        <div className={cx('left-area')}>
          <Link href={PATHNAME.HOME}>logo</Link>
        </div>

        {/** TODO: SEARCH BAR */}
        {!isMobile && <div></div>}

        <div className={cx('right-area')}>
          <Link href={PATHNAME.DIRECT}>
            <div className={cx('icon-wrapper')}>
              <IoChatbubblesOutline size={25} />
            </div>
          </Link>
          <button>
            {/** TODO: implement heart notice */}
            <AiOutlineHeart size={25} />
          </button>
          <Link href={PATHNAME.MY}>
            <div className={cx('icon-wrapper')}>
              <AiOutlineUser size={25} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
