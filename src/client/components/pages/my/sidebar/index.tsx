import Link from 'next/link'
import { BsChevronLeft } from 'react-icons/bs'

import { useRouter } from 'next/router'
import { useAccount, useWindowSize } from '@client/hooks'
import { MYPAGE_LINKS } from '@components/pages/my/consts'

import classNames from 'classnames/bind'
import styles from '../style/MyPage.module.css'
const cx = classNames.bind(styles)

export default function MyPageSidebar() {
  const router = useRouter()
  const { isLoggedIn, me, isMeLoading } = useAccount()
  const { width } = useWindowSize()
  const isMobile = width <= 767

  return (
    <div className={cx('sidebar')}>
      <div className={cx('header')}>
        {isMobile && (
          <Link href="/">
            <button className={cx('back-button')}>
              <BsChevronLeft size={20} />
            </button>
          </Link>
        )}
        <div className={cx('me-name')}>{me?.name}</div>
      </div>
      {MYPAGE_LINKS.map(link => (
        <Link key={link.pageName} href={link.href}>
          <div
            className={cx('section', {
              active: router.query.page === link.pageName,
            })}>
            <>
              <link.icon />
              <div className={cx('label')}>{link.label}</div>
            </>
          </div>
        </Link>
      ))}
    </div>
  )
}
