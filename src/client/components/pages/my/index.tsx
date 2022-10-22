import MyPageSidebar from './sidebar'
import MyPageBody from './body'

import { useRouter } from 'next/router'
import { useAccount, useWindowSize } from '@client/hooks'

import classNames from 'classnames/bind'
import styles from './style/MyPage.module.css'
const cx = classNames.bind(styles)

export default function MyPageComponent() {
  const router = useRouter()
  const { isLoggedIn, me, isMeLoading } = useAccount()
  const { width } = useWindowSize()
  const isMobile = width <= 767
  const isMobileMenu = isMobile && !router.query.page
  const isMobilePage = isMobile && router.query.page
  const page = router.query.page as string

  if (!isMeLoading && !isLoggedIn) {
    router.push('/login')
  }

  return (
    <div className={cx('root')}>
      <div className={cx('contents-wrapper')}>
        {(!isMobile || isMobileMenu) && <MyPageSidebar />}
        {page && (!isMobile || isMobilePage) && <MyPageBody />}
      </div>
    </div>
  )
}
