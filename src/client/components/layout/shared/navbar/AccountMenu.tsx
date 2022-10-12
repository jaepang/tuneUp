import Link from 'next/link'
import { useAccount } from '@client/hooks'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'

import { PATHNAME } from '@client/consts'
import classNames from 'classnames/bind'
import styles from './style/NavBar.module.css'
const cx = classNames.bind(styles)

export default function AccountMenu() {
  const { isLoggedIn, logout, isMeLoading } = useAccount()

  function handleLogout() {
    logout()
  }

  return (
    <div className={cx('right-area')}>
      {isLoggedIn && !isMeLoading && (
        <>
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
          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}
      {!isLoggedIn && <Link href={PATHNAME.LOGIN}>로그인</Link>}
    </div>
  )
}
